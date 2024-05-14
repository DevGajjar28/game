import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const FlyComponent = () => {
  const worldRef = useRef(null);
  const flyRef = useRef(null);
  const guyRef = useRef(null);
  const leftIrisRef = useRef(null);
  const rightIrisRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    tl.fromTo(
      flyRef.current.querySelector('.bigwings'),
      0.1,
      { rotationZ: "-25deg", transformOrigin: "50% 100%" },
      { rotationZ: "5deg" },
      0
    );
    tl.fromTo(
      flyRef.current.querySelector('.smallwings'),
      0.1,
      { rotationZ: "25deg", transformOrigin: "50% 100%" },
      { rotationZ: "35deg" },
      0
    );
    tl.fromTo(
      flyRef.current.querySelector('.middlewings'),
      0.1,
      { rotationZ: "-15deg", transformOrigin: "50% 100%" },
      { rotationZ: "-40deg" },
      0
    );

    const eyeTl = gsap.timeline({ yoyo: true });
    eyeTl.add(gsap.to([leftIrisRef.current, rightIrisRef.current], 0.2, { borderTopWidth: 20 }));
    eyeTl.add(
      gsap.to([leftIrisRef.current, rightIrisRef.current], 0.2, {
        borderTopWidth: 2,
        onComplete: function() {
          gsap.delayedCall(Math.random() * 3, function() {
            eyeTl.play(0);
          });
        }
      })
    );

    return () => {
      tl.kill();
      eyeTl.kill();
    };
  }, []);

  return (
    <div>
      <div className="world" ref={worldRef}>
        <div className="fly" ref={flyRef}>
          <div className="flybody"></div>
          <div className="bigwings"></div>
          <div className="middlewings"></div>
          <div className="smallwings"></div>
          <div className="fly_eye left" ref={leftIrisRef}></div>
          <div className="fly_eye right" ref={rightIrisRef}></div>
        </div>
        <div className="guy" ref={guyRef}>
          <div className="eyebrow_left"></div>
          <div className="eye" id="left"><div className="iris" id="left_iris"></div></div>
          <div className="eyebrow_right"></div>
          <div className="eye" id="right"><div className="iris" id="right_iris"></div></div>
          <div className="nose"></div>
        </div>
      </div>
      <style jsx>{`
        .world {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .fly, .guy {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        /* Rest of the CSS styles here */
      `}</style>
    </div>
  );
};

export default FlyComponent;
