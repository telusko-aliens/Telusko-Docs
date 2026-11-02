'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { DESKTOP_MEDIA_QUERY } from '@/lib/breakpoints';
import { TeluskoLearnCta } from './TeluskoLearnCta';
import { ThemeToggleBox } from './ThemeToggleBox';
import { GithubIconButton } from './GithubIconButton';
import type { TopicLink } from '@/lib/topics';

interface MobileNavPanelProps {
  open: boolean;
  navTopics: TopicLink[];
  onClose: () => void;
}

export function MobileNavPanel({ open, navTopics, onClose }: MobileNavPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!panelRef.current || !backdropRef.current) return;
      const links = gsap.utils.toArray<HTMLElement>(panelRef.current.querySelectorAll('.home-mobile-link'));

      if (open) {
        gsap.set([panelRef.current, backdropRef.current], { display: 'block' });
        gsap.fromTo(
          panelRef.current,
          { height: 0, autoAlpha: 0 },
          { height: 'auto', autoAlpha: 1, duration: 0.4, ease: 'power3.out' },
        );
        gsap.fromTo(backdropRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 });
        gsap.fromTo(
          links,
          { y: -8, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.3, stagger: 0.04, delay: 0.1, ease: 'power3.out' },
        );
      } else {
        gsap.to(panelRef.current, {
          height: 0,
          autoAlpha: 0,
          duration: 0.3,
          ease: 'power2.inOut',
          onComplete: () => gsap.set(panelRef.current, { display: 'none' }),
        });
        gsap.to(backdropRef.current, {
          autoAlpha: 0,
          duration: 0.25,
          onComplete: () => gsap.set(backdropRef.current, { display: 'none' }),
        });
      }
    },
    { dependencies: [open] },
  );

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    const desktopQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
    function onViewportChange(e: MediaQueryListEvent) {
      if (e.matches) onClose();
    }

    document.addEventListener('keydown', onKeyDown);
    desktopQuery.addEventListener('change', onViewportChange);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      desktopQuery.removeEventListener('change', onViewportChange);
    };
  }, [open, onClose]);

  return (
    <>
      <div
        ref={backdropRef}
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 z-30 bg-black/40"
        style={{ display: 'none' }}
      />
      <div
        ref={panelRef}
        className="absolute inset-x-0 top-full z-40 overflow-hidden rounded-b-xl border-x border-b"
        style={{ display: 'none', borderColor: 'var(--home-border)', background: 'var(--home-bg)' }}
      >
        <div className="flex flex-col gap-1 px-4 py-4">
          {navTopics.map((topic) => (
            <Link
              key={topic.slug}
              href={topic.href}
              onClick={onClose}
              className="home-mobile-link rounded-lg px-3 py-2.5 text-base font-semibold"
              style={{ color: 'var(--home-foreground)' }}
            >
              {topic.title}
            </Link>
          ))}

          <div
            className="home-mobile-link mt-2 flex items-center justify-between gap-3 border-t pt-3"
            style={{ borderColor: 'var(--home-border)' }}
          >
            <ThemeToggleBox />
            <GithubIconButton className="h-10 w-10 rounded-xl border" iconClassName="h-5 w-5" />
          </div>

          <TeluskoLearnCta className="home-mobile-link mt-2 flex w-full justify-center" />
        </div>
      </div>
    </>
  );
}
