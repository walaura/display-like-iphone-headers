registerAnimator(
  "parallax",
  class {
    animate(currentTime, effect) {
      effect.localTime = currentTime;
    }
  }
);

/*
 Math.pow(currentTime, 1.3);
*/
