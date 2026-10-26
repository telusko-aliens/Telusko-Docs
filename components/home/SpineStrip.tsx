'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { DESKTOP_MEDIA_QUERY, isDesktopViewport } from '@/lib/breakpoints';
import type { SpineLink } from '@/lib/topics';

const REST_FLEX = 1;
const HOVER_FLEX = 3.4;
const DESCRIPTION_MAX_HEIGHT = 180;
const EASE = 'power2.out';

export function SpineStrip({ spine }: { spine: SpineLink }) {
  const columnRef = useRef<HTMLAnchorElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const desktopArrowRef = useRef<HTMLDivElement>(null);
  const mobileArrowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(DESKTOP_MEDIA_QUERY, () => {
        gsap.set(columnRef.current, { flexGrow: REST_FLEX });
        gsap.set(contentRef.current, { xPercent: -50, yPercent: -50, rotate: -90 });
        gsap.set(desktopArrowRef.current, { rotate: 0 });
        gsap.set(descriptionRef.current, { autoAlpha: 0, maxHeight: 0, overflow: 'hidden' });

        return () => {
          gsap.set(columnRef.current, { clearProps: 'transform,opacity,visibility,flexGrow' });
          gsap.set([contentRef.current, desktopArrowRef.current], { clearProps: 'transform,opacity,visibility' });
          gsap.set(descriptionRef.current, { clearProps: 'all' });
        };
      });
    },
    { scope: columnRef },
  );

  function onEnter() {
    if (isDesktopViewport()) {
      gsap.to(columnRef.current, { flexGrow: HOVER_FLEX, duration: 0.5, ease: EASE, overwrite: 'auto' });
      gsap.to(desktopArrowRef.current, { rotate: 45, duration: 0.4, ease: EASE, overwrite: true });
      if (spine.description) {
        gsap.to(descriptionRef.current, {
          autoAlpha: 1,
          maxHeight: DESCRIPTION_MAX_HEIGHT,
          duration: 0.4,
          delay: 0.2,
          ease: EASE,
          overwrite: true,
        });
      }
      return;
    }
    gsap.to(mobileArrowRef.current, { rotate: -45, duration: 0.4, ease: EASE, overwrite: true });
  }

  function onLeave() {
    if (isDesktopViewport()) {
      gsap.to(columnRef.current, { flexGrow: REST_FLEX, duration: 0.5, ease: EASE, overwrite: 'auto' });
      gsap.to(desktopArrowRef.current, { rotate: 0, duration: 0.4, ease: EASE, overwrite: true });
      gsap.to(descriptionRef.current, {
        autoAlpha: 0,
        maxHeight: 0,
        duration: 0.3,
        ease: EASE,
        overwrite: true,
      });
      return;
    }
    gsap.to(mobileArrowRef.current, { rotate: 0, duration: 0.4, ease: EASE, overwrite: true });
  }

  return (
    <Link
      ref={columnRef}
      href={spine.href}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="home-spine relative flex items-center justify-between overflow-hidden py-5 pl-6 pr-8 sm:py-8 lg:flex-1 lg:px-0 lg:py-12"
      style={{ background: spine.color }}
    >
      <span className="whitespace-nowrap text-xl font-medium text-[#0E0E0E] sm:text-2xl lg:hidden">
        {spine.label}
      </span>
      <div
        ref={mobileArrowRef}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full lg:hidden"
        style={{ background: 'rgba(14,14,14,0.1)' }}
      >
        <ArrowRight className="h-4 w-4 text-[#0E0E0E]" />
      </div>

      <div
        ref={contentRef}
        className="hidden lg:absolute lg:left-1/2 lg:top-1/2 lg:flex lg:w-[400px] lg:flex-col lg:items-start lg:gap-3"
      >
        <div className="flex w-full items-center justify-between gap-3">
          <span className="whitespace-nowrap text-start text-2xl font-medium text-[#0E0E0E]">
            {spine.label}
          </span>
          <div
            ref={desktopArrowRef}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
            style={{ background: 'rgba(14,14,14,0.1)' }}
          >
            <ArrowRight className="h-3.5 w-3.5 text-[#0E0E0E]" />
          </div>
        </div>
        {spine.description ? (
          <p ref={descriptionRef} className="max-w-[320px] text-start text-sm font-medium text-[#0E0E0E]/70">
            {spine.description}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
