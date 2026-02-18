// Prevent elastic overscroll on top/bottom by blocking wheel/touch gestures
// that would move past the document bounds. Keeps the background from
// showing through when users keep scrolling at the page edges.
export default function preventOverscroll(container?: HTMLElement | Window) {
  // Lock to swallow momentum after hitting bounds; only swallow events in the same direction
  let lockUntil = 0;
  let lastLockDirection = 0;
  
  // Determine target container and helper getters
  const target = container ?? window;
  const isWindow = target === window;

  const getScrollTop = () => isWindow ? window.scrollY : (target as HTMLElement).scrollTop;
  const getClientHeight = () => isWindow ? window.innerHeight : (target as HTMLElement).clientHeight;
  const getScrollHeight = () => isWindow ? document.documentElement.scrollHeight : (target as HTMLElement).scrollHeight;

  // Wheel handler (desktop)
  const onWheel = (e: Event) => {
    // Skip blocking for elements inside .github-calendar-wrapper to allow pinch-zoom and horizontal pan
    const target = e.target as HTMLElement;
    if (target?.closest('.github-calendar-wrapper')) return;

    const we = e as WheelEvent;
    const delta = we.deltaY;
    const dir = Math.sign(delta);
    const scrollTop = getScrollTop();
    const clientH = getClientHeight();
    const scrollH = getScrollHeight();
    // If the content doesn't overflow the container, don't block wheel events.
    if (scrollH <= clientH) return;
    const atTop = scrollTop <= 0;
    const atBottom = clientH + scrollTop >= scrollH - 1;
    const now = Date.now();

    // If trying to scroll beyond bounds, prevent and lock in that direction
    if ((atTop && delta < 0) || (atBottom && delta > 0)) {
      e.preventDefault();
      const maxScroll = scrollH - clientH;
      if (atTop) {
        if (isWindow) window.scrollTo(0, 0); else (target as HTMLElement).scrollTop = 0;
      }
      if (atBottom) {
        if (isWindow) window.scrollTo(0, maxScroll); else (target as HTMLElement).scrollTop = maxScroll;
      }
      lockUntil = Date.now() + 350;
      lastLockDirection = dir;
      startActiveClamp(lockUntil - Date.now());
      return;
    }

    // While locked, swallow further momentum only if it's in the same direction
    if (now < lockUntil && dir === lastLockDirection && dir !== 0) {
      e.preventDefault();
      const maxScroll = scrollH - clientH;
      if (atTop) { if (isWindow) window.scrollTo(0, 0); else (target as HTMLElement).scrollTop = 0; }
      if (atBottom) { if (isWindow) window.scrollTo(0, maxScroll); else (target as HTMLElement).scrollTop = maxScroll; }
    }
  };

  // Touch handlers (mobile)
  let startY = 0;
  const onTouchStart = (e: Event) => {
    const te = e as TouchEvent;
    startY = te.touches?.[0]?.clientY ?? 0;
  };

  const onTouchMove = (e: Event) => {
    // Skip blocking for elements inside .github-calendar-wrapper to allow pinch-zoom and horizontal pan
    const target = e.target as HTMLElement;
    if (target?.closest('.github-calendar-wrapper')) return;

    const te = e as TouchEvent;
    const currentY = te.touches?.[0]?.clientY ?? 0;
    const delta = startY - currentY;
    const dir = Math.sign(delta);
    const scrollTop = getScrollTop();
    const clientH = getClientHeight();
    const scrollH = getScrollHeight();
    // If the content doesn't overflow the container, don't block touch moves.
    if (scrollH <= clientH) return;
    const atTop = scrollTop <= 0;
    const atBottom = clientH + scrollTop >= scrollH - 1;

    // If trying to scroll beyond bounds, prevent and lock in that direction
    if ((atTop && delta < 0) || (atBottom && delta > 0)) {
      e.preventDefault();
      const maxScroll = scrollH - clientH;
      if (atTop) { if (isWindow) window.scrollTo(0, 0); else (target as HTMLElement).scrollTop = 0; }
      if (atBottom) { if (isWindow) window.scrollTo(0, maxScroll); else (target as HTMLElement).scrollTop = maxScroll; }
      lockUntil = Date.now() + 350;
      lastLockDirection = dir;
      startActiveClamp(lockUntil - Date.now());
      return;
    }

    // While locked, swallow further momentum only if it's in the same direction
    if (Date.now() < lockUntil && dir === lastLockDirection && dir !== 0) {
      e.preventDefault();
      const maxScroll = scrollH - clientH;
      if (atTop) { if (isWindow) window.scrollTo(0, 0); else (target as HTMLElement).scrollTop = 0; }
      if (atBottom) { if (isWindow) window.scrollTo(0, maxScroll); else (target as HTMLElement).scrollTop = maxScroll; }
    }
  };

  const addListener = (name: string, fn: EventListenerOrEventListenerObject, opts?: AddEventListenerOptions) => {
    if (isWindow) window.addEventListener(name, fn as any, opts);
    else (target as HTMLElement).addEventListener(name, fn as any, opts);
  };
  const removeListener = (name: string, fn: EventListenerOrEventListenerObject, opts?: EventListenerOptions) => {
    if (isWindow) window.removeEventListener(name, fn as any, opts);
    else (target as HTMLElement).removeEventListener(name, fn as any, opts);
  };

  addListener('wheel', onWheel, { passive: false });
  addListener('touchstart', onTouchStart, { passive: true });
  addListener('touchmove', onTouchMove, { passive: false });

  // (lockUntil already declared above)

  // Clamp scroll position during momentum to avoid brief overscroll beyond bounds
  let rafId: number | null = null;
  let activeClampId: number | null = null;
  const startActiveClamp = (duration = 350) => {
    const end = Date.now() + duration;
    if (activeClampId != null) cancelAnimationFrame(activeClampId);

    const clampStep = () => {
      const maxScroll = getScrollHeight() - getClientHeight();
      const cur = getScrollTop();
      if (cur < 0) {
        if (isWindow) window.scrollTo(0, 0);
        else (target as HTMLElement).scrollTop = 0;
      }
      if (cur > maxScroll) {
        if (isWindow) window.scrollTo(0, maxScroll);
        else (target as HTMLElement).scrollTop = maxScroll;
      }
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
      const maxScroll = getScrollHeight() - getClientHeight();
      const cur = getScrollTop();
      if (cur < 0) {
        if (isWindow) window.scrollTo(0, 0);
        else (target as HTMLElement).scrollTop = 0;
      } else if (cur > maxScroll) {
        if (isWindow) window.scrollTo(0, maxScroll);
        else (target as HTMLElement).scrollTop = maxScroll;
      }
    });
  };

  addListener('scroll', onScroll, { passive: true });

  // make sure any active clamp is cleared on cleanup

  return () => {
    removeListener('wheel', onWheel as any);
    removeListener('touchstart', onTouchStart as any);
    removeListener('touchmove', onTouchMove as any);
    removeListener('scroll', onScroll as any);
    if (activeClampId != null) cancelAnimationFrame(activeClampId);
  };
}
