import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import GSAPSplitText from 'gsap/SplitText';
import './split.css'

// Register plugins defensively — if the plugins aren't available the code will fall back to animating immediately
let splitPluginAvailable = false;
let scrollTriggerAvailable = false;
try {
  gsap.registerPlugin(ScrollTrigger, GSAPSplitText);
  splitPluginAvailable = !!GSAPSplitText;
  scrollTriggerAvailable = !!ScrollTrigger;
} catch (e) {
  // plugin may not be available in every environment — guard usages later
  splitPluginAvailable = !!GSAPSplitText;
  scrollTriggerAvailable = !!ScrollTrigger;
}

const SplitText = ({
  text,
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'h1',
  className = 'h1text',

  onLetterAnimationComplete
}) => {
  const ref = useRef(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Keep callback ref updated
  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (document?.fonts?.status === 'loaded') {
      setFontsLoaded(true);
    } else if (document?.fonts) {
      document.fonts.ready.then(() => setFontsLoaded(true));
    } else {
      // Fallback if `document.fonts` isn't available
      setFontsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!ref.current || !text || !fontsLoaded) return;
    if (animationCompletedRef.current) return;

    const el = ref.current;

    if (el._rbsplitInstance) {
      try {
        el._rbsplitInstance.revert();
      } catch (_) {
        /* noop */
      }
      el._rbsplitInstance = null;
    }

    const startPct = (1 - threshold) * 100;
    const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
    const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
    const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
    const sign =
      marginValue === 0
        ? ''
        : marginValue < 0
        ? `-=${Math.abs(marginValue)}${marginUnit}`
        : `+=${marginValue}${marginUnit}`;
    const start = `top ${startPct}%${sign}`;

    let targets;
    const assignTargets = self => {
      if (splitType.includes('chars') && self.chars.length) targets = self.chars;
      if (!targets && splitType.includes('words') && self.words.length) targets = self.words;
      if (!targets && splitType.includes('lines') && self.lines.length) targets = self.lines;
      if (!targets) targets = self.chars || self.words || self.lines;
    };

    // Prefer using SplitText plugin if available; otherwise fall back to a simple tween on the element
    try {
      if (splitPluginAvailable && typeof GSAPSplitText !== 'undefined' && GSAPSplitText) {
        const splitInstance = new GSAPSplitText(el, {
          type: splitType,
          smartWrap: true,
          autoSplit: splitType === 'lines',
          linesClass: 'split-line',
          wordsClass: 'split-word',
          charsClass: 'split-char',
          reduceWhiteSpace: false,
          onSplit: self => {
            assignTargets(self);
            const tweenConfig = {
              ...to,
              duration,
              ease,
              stagger: delay / 1000,
              onComplete: () => {
                animationCompletedRef.current = true;
                onCompleteRef.current?.();
              },
              willChange: 'transform, opacity',
              force3D: true
            };

            // Attempt to register ScrollTrigger now — only add scrollTrigger if registration succeeds
            let pluginRegistered = false;
            try {
              if (typeof ScrollTrigger !== 'undefined' && ScrollTrigger) {
                gsap.registerPlugin(ScrollTrigger);
                pluginRegistered = true;
              }
            } catch (e) {
              pluginRegistered = false;
            }

            if (pluginRegistered) {
              tweenConfig.scrollTrigger = {
                trigger: el,
                start,
                once: true,
                fastScrollEnd: true,
                anticipatePin: 0.4
              };
            }

            const tween = gsap.fromTo(targets, { ...from }, tweenConfig);
            return tween;
          }
        });

        el._rbsplitInstance = splitInstance;

        return () => {
          try {
            if (scrollTriggerAvailable) {
              try { ScrollTrigger.getAll().forEach(st => { if (st.trigger === el) st.kill(); }); } catch (_) {}
            }
          } catch (_) {}
          try {
            splitInstance.revert();
          } catch (_) {
            /* noop */
          }
          el._rbsplitInstance = null;
        };
      }
    } catch (err) {
      /* Split plugin failed, fallback below */
    }

    // Fallback: no Split plugin available — animate the whole element
    const fallbackTween = gsap.fromTo(
      el,
      { ...from, opacity: 0 },
      {
        ...to,
        opacity: 1,
        duration,
        ease,
        onComplete: () => {
          animationCompletedRef.current = true;
          onCompleteRef.current?.();
        }
      }
    );

    return () => {
      try { fallbackTween.kill(); } catch (_) {}
    };
  }, [
    text,
    delay,
    duration,
    ease,
    splitType,
    JSON.stringify(from),
    JSON.stringify(to),
    threshold,
    rootMargin,
    fontsLoaded,
    onLetterAnimationComplete
  ]);

  const renderTag = () => {
    const style = {
      textAlign,
      overflow: 'hidden',
      display: 'inline-block',
      whiteSpace: 'normal',
      wordWrap: 'break-word',
      willChange: 'transform, opacity'
    };
    const classes = `split-parent ${className}`;
    switch (tag) {
      case 'h1':
        return (
          <h1 ref={ref} style={style} className={classes}>
            {text}
          </h1>
        );
      case 'h2':
        return (
          <h2 ref={ref} style={style} className={classes}>
            {text}
          </h2>
        );
      case 'h3':
        return (
          <h3 ref={ref} style={style} className={classes}>
            {text}
          </h3>
        );
      case 'h4':
        return (
          <h4 ref={ref} style={style} className={classes}>
            {text}
          </h4>
        );
      case 'h5':
        return (
          <h5 ref={ref} style={style} className={classes}>
            {text}
          </h5>
        );
      case 'h6':
        return (
          <h6 ref={ref} style={style} className={classes}>
            {text}
          </h6>
        );
      default:
        return (
          <p ref={ref} style={style} className={classes}>
            {text}
          </p>
        );
    }
  };
  return renderTag();
};

export default SplitText;
