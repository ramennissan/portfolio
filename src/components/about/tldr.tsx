import type { MouseEvent } from 'react';

export default function TLDR() 
{
    const handleEducationClick = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();

        const target = document.getElementById('education');
        if (!target) return;

        const container = document.querySelector('.app-scroll') as HTMLElement | null;

        const getStartY = () => (container ? container.scrollTop : window.scrollY);

        const targetRect = target.getBoundingClientRect();
        const containerRect = container ? container.getBoundingClientRect() : { top: 0 };

        const targetY = container
            ? targetRect.top - containerRect.top + container.scrollTop
            : targetRect.top + window.scrollY;

        const startY = getStartY();
        const distance = targetY - startY;
        const duration = 450;
        let startTime: number | null = null;

        window.history.pushState(null, '', '#education');

        const easeInOutQuad = (t: number) =>
            t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

        const step = (timestamp: number) => {
            if (startTime === null) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeInOutQuad(progress);

            const next = startY + distance * eased;

            if (container) {
                container.scrollTop = next;
            } else {
                window.scrollTo({ top: next });
            }

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    };

    return (
        <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
            <h2 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2 text-center">TL;DR</h2>
            <p className="text-blue-800 dark:text-blue-200">
                <strong>Currently, I am...</strong>
            </p>
            <p className="text-blue-800 dark:text-blue-200">
                studying <a className="font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-100 dark:hover:text-blue-50 hover:underline" href="#education" onClick={handleEducationClick}>computer engineering at TMU</a>, building <a className="font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-100 dark:hover:text-blue-50 hover:underline" href="/projects#projects">full-stack applications</a>, and <a className="font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-100 dark:hover:text-blue-50 hover:underline" href="/bookshelf#bookshelf">reading</a>.
            </p>
        </div>
    );
}
