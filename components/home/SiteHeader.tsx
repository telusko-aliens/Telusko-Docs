'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { Search, Menu, X } from 'lucide-react';
import type * as PageTree from 'fumadocs-core/page-tree';
import { useSearchContext } from 'fumadocs-ui/contexts/search';
import { useSidebar } from 'fumadocs-ui/contexts/sidebar';
import { gsap } from '@/lib/gsap';
import { useInView } from '@/lib/useInView';
import { GetStartedCta } from './GetStartedCta';
import { TeluskoLearnCta } from './TeluskoLearnCta';
import { ThemeToggleBox } from './ThemeToggleBox';
import { GithubIconButton } from './GithubIconButton';
import { DocsMobileSidebar } from './DocsMobileSidebar';
import type { TopicLink } from '@/lib/topics';

interface SiteHeaderProps {
  navTopics: TopicLink[];
  tree: PageTree.Root;
  promoSlot: ReactNode;
}

export function SiteHeader({ navTopics, tree, promoSlot }: SiteHeaderProps) {
  const promoRowRef = useRef<HTMLDivElement>(null);
  const navRowRef = useRef<HTMLElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const searchTriggerRef = useRef<HTMLDivElement>(null);
  const { setOpenSearch } = useSearchContext();
  const { open: menuOpen, setOpen: setMenuOpen } = useSidebar();

  const heroInView = useInView('home-hero');

  useGSAP(
    () => {
      gsap
        .timeline({ defaults: { ease: 'power3.out', duration: 0.6 } })
        .fromTo(promoRowRef.current, { y: -20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, clearProps: 'transform' })
        .fromTo(
          navRowRef.current,
          { y: -20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, clearProps: 'transform' },
          '-=0.35',
        );
    },
  );

  useGSAP(
    () => {
      if (!searchTriggerRef.current) return;
      gsap.to(searchTriggerRef.current, {
        autoAlpha: heroInView ? 0 : 1,
        y: heroInView ? -8 : 0,
        duration: 0.4,
        ease: 'power2.out',
      });
    },
    { dependencies: [heroInView] },
  );

  const PILL_HEIGHT = 40;

  function movePill(target: HTMLElement) {
    if (!pillRef.current || !navLinksRef.current) return;
    const containerRect = navLinksRef.current.getBoundingClientRect();
    const rect = target.getBoundingClientRect();
    gsap.to(pillRef.current, {
      x: rect.left - containerRect.left,
      y: rect.top - containerRect.top + (rect.height - PILL_HEIGHT) / 2,
      width: rect.width,
      height: PILL_HEIGHT,
      autoAlpha: 1,
      duration: 0.3,
      ease: 'power3.out',
      overwrite: true,
    });
  }

  function hidePill() {
    if (!pillRef.current) return;
    gsap.to(pillRef.current, { autoAlpha: 0, duration: 0.2, overwrite: true });
  }

  return (
    <>
      <div
        ref={promoRowRef}
        className="border-b py-3"
        style={{ borderColor: 'var(--home-border)', background: 'var(--home-surface)' }}
      >
        <div className="mx-auto flex max-w-[1920px] items-center gap-4 px-4 sm:gap-6 sm:px-10 lg:px-20">
          <div className="min-w-0 flex-1">{promoSlot}</div>
          <TeluskoLearnCta className="hidden shrink-0 lg:inline-flex" />
        </div>
      </div>

      <nav
        ref={navRowRef}
        className="sticky top-0 z-40 border-b-2 py-3"
        style={{ borderColor: 'var(--home-border)', background: 'var(--home-bg)' }}
      >
        <div className="mx-auto flex max-w-[1920px] items-center justify-between gap-4 px-4 sm:px-10 lg:px-20">
          <div className="flex items-center gap-10">
            <Link href="/" className="shrink-0">
              <Image src="/logo.png" alt="Telusko" width={100} height={42} className="h-8 w-auto" />
            </Link>

            <div ref={navLinksRef} className="relative hidden items-center gap-2 lg:flex" onMouseLeave={hidePill}>
              <span
                ref={pillRef}
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 -z-10 rounded-xl opacity-0"
                style={{ background: 'var(--home-surface-strong)' }}
              />
              {navTopics.map((topic) => (
                <Link
                  key={topic.slug}
                  href={topic.href}
                  onMouseEnter={(e) => movePill(e.currentTarget)}
                  onMouseLeave={hidePill}
                  className="shrink-0 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold"
                  style={{ color: 'var(--home-foreground)' }}
                >
                  {topic.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div ref={searchTriggerRef} style={{ opacity: 0, visibility: 'hidden' }}>
              <button
                type="button"
                onClick={() => setOpenSearch(true)}
                className="hidden items-center gap-3 rounded-xl border px-3 py-2 text-sm lg:flex lg:w-[295px] lg:justify-between lg:border-2"
                style={{ borderColor: 'var(--home-border)', color: 'var(--home-foreground-faint)' }}
              >
                Search for topics...
                <kbd
                  className="rounded-md border px-1.5 py-0.5 text-xs"
                  style={{ borderColor: 'var(--home-lime-text)', color: 'var(--home-lime-text)' }}
                >
                  ⌘K
                </kbd>
              </button>
              <button
                type="button"
                onClick={() => setOpenSearch(true)}
                aria-label="Search"
                className="flex h-11 w-11 items-center justify-center rounded-xl border lg:hidden"
                style={{ borderColor: 'var(--home-border)', color: 'var(--home-foreground-muted)' }}
              >
                <Search className="h-4 w-4" />
              </button>
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <ThemeToggleBox />
              <GithubIconButton className="rounded-xl border-2 px-3 py-2" iconClassName="h-5 w-5" />
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="relative flex h-11 w-11 items-center justify-center rounded-xl border lg:hidden"
              style={{ borderColor: 'var(--home-border)', color: 'var(--home-foreground)' }}
            >
              <Menu
                className={`absolute h-4 w-4 transition-all duration-300 ${menuOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
              />
              <X
                className={`absolute h-4 w-4 transition-all duration-300 ${menuOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
              />
            </button>
          </div>
        </div>

        <DocsMobileSidebar tree={tree} />
      </nav>
    </>
  );
}
