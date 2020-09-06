registerAnimator(
  "parallax",
  class {
    animate(currentTime, effect) {
      effect.localTime = currentTime;
    }
  }
);
