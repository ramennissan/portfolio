// Prevent elastic overscroll on top/bottom by blocking wheel/touch gestures
// that would move past the document bounds. Keeps the background from
// showing through when users keep scrolling at the page edges.
export default function preventOverscroll() {
  // Lock to swallow momentum after hitting bounds; only swallow events in the same direction
  let lockUntil = 0;
  let lastLockDirection = 0;

  // Wheel handler (desktop)
  const onWheel = (e: WheelEvent) => {
    const delta = e.deltaY;
    const dir = Math.sign(delta);
    const atTop = window.scrollY <= 0;
    const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 1;
    const now = Date.now();

    // If trying to scroll beyond bounds, prevent and lock in that direction
    if ((atTop && delta < 0) || (atBottom && delta > 0)) {
      e.preventDefault();
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (atTop) window.scrollTo(0, 0);
      if (atBottom) window.scrollTo(0, maxScroll);
        lockUntil = Date.now() + 350;
        lastLockDirection = dir;
        // actively clamp for the lock duration to prevent visual overshoot on touchpad
        startActiveClamp(lockUntil - Date.now());
      return;
    }

    // While locked, swallow further momentum only if it's in the same direction
    if (now < lockUntil && dir === lastLockDirection && dir !== 0) {
      e.preventDefault();
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (atTop) window.scrollTo(0, 0);
      if (atBottom) window.scrollTo(0, maxScroll);
    }
  };

  // Touch handlers (mobile)
  let startY = 0;
  const onTouchStart = (e: TouchEvent) => {
    startY = e.touches?.[0]?.clientY ?? 0;
  };

  const onTouchMove = (e: TouchEvent) => {
    const currentY = e.touches?.[0]?.clientY ?? 0;
    const delta = startY - currentY;
    const dir = Math.sign(delta);
    const atTop = window.scrollY <= 0;
    const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 1;

    // If trying to scroll beyond bounds, prevent and lock in that direction
    if ((atTop && delta < 0) || (atBottom && delta > 0)) {
      e.preventDefault();
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (atTop) window.scrollTo(0, 0);
      if (atBottom) window.scrollTo(0, maxScroll);
      lockUntil = Date.now() + 350;
      lastLockDirection = dir;
      // actively clamp for the lock duration to prevent visual overshoot on touchpad
      startActiveClamp(lockUntil - Date.now());
      return;
    }

    // While locked, swallow further momentum only if it's in the same direction
    if (Date.now() < lockUntil && dir === lastLockDirection && dir !== 0) {
      e.preventDefault();
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (atTop) window.scrollTo(0, 0);
      if (atBottom) window.scrollTo(0, maxScroll);
    }
  };

  window.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchmove', onTouchMove, { passive: false });

  // (lockUntil already declared above)

  // Clamp scroll position during momentum to avoid brief overscroll beyond bounds
  let rafId: number | null = null;
  let activeClampId: number | null = null;
  const startActiveClamp = (duration = 350) => {
    const end = Date.now() + duration;
    if (activeClampId != null) cancelAnimationFrame(activeClampId);

    const clampStep = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY < 0) window.scrollTo(0, 0);
      if (window.scrollY > maxScroll) window.scrollTo(0, maxScroll);
      if (Date.now() < end) {
        activeClampId = requestAnimationFrame(clampStep);
      } else {
        activeClampId = null;
      }
    };

    activeClampId = requestAnimationFrame(clampStep);
  };
  const onScroll = () => {
    if (rafId != null) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      // small epsilon to allow normal behavior
      if (window.scrollY < 0) {
        window.scrollTo(0, 0);
      } else if (window.scrollY > maxScroll) {
        window.scrollTo(0, maxScroll);
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  // make sure any active clamp is cleared on cleanup

  return () => {
    window.removeEventListener('wheel', onWheel);
    window.removeEventListener('touchstart', onTouchStart);
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('scroll', onScroll);
    if (activeClampId != null) cancelAnimationFrame(activeClampId);
  };
}
