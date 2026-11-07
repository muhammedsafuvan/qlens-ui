
"use client";

import { useEffect, useRef } from "react";

const lines = [
  "Spend less time guessing what happened.",
  "Spend more time building what comes next.",
];

export function TaglineReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const words = container.querySelectorAll<HTMLElement>(
      "[data-tagline-word]",
    );

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (reducedMotion.matches) {
      words.forEach((word) => {
        word.dataset.visible = "true";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.visible = "true";
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.8,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    words.forEach((word) => observer.observe(word));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      <p className="sr-only">{lines.join(" ")}</p>

      <div aria-hidden="true" className="space-y-2">
        {lines.map((line) => (
          <p key={line} className="tagline-line">
            {line.split(" ").map((word, index) => (
              <span
                key={`${word}-${index}`}
                data-tagline-word
                className="tagline-word"
              >
                {word}{" "}
              </span>
            ))}
          </p>
        ))}
      </div>
    </div>
  );
}
