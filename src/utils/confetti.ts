import confetti from 'canvas-confetti';

export function fireSuccessConfetti() {
  try {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#10b981', '#06b6d4', '#3b82f6', '#f59e0b'],
    });
  } catch (e) {
    // Ignore if canvas-confetti is not supported
  }
}

export function fireMilestoneConfetti() {
  try {
    const end = Date.now() + 1.2 * 1000;
    const colors = ['#10b981', '#6366f1', '#ec4899', '#f59e0b'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  } catch (e) {
    // Ignore
  }
}
