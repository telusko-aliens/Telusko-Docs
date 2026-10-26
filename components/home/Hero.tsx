import Image from 'next/image';
import { GetStartedCta } from './GetStartedCta';
import { HeroGlow } from './HeroGlow';
import { HeroReveal } from './HeroReveal';
import { HeroSearchTrigger } from './HeroSearchTrigger';

export function Hero() {
  return (
    <section
      id="home-hero"
      className="relative flex min-h-[560px] items-start justify-center overflow-hidden px-6 pb-16 pt-14 sm:min-h-[720px] sm:items-center sm:py-24"
    >
      <HeroGlow />

      <div className="relative z-10 mx-auto mt-10 flex w-full flex-col items-center gap-7 text-center sm:mt-0 sm:max-w-4xl">
        <p
          className="home-hero-reveal font-mono-home text-sm uppercase tracking-[0.3em]"
          style={{ color: 'var(--home-foreground)' }}
        >
          Welcome to Telusko Docs
        </p>

        <h1 className="home-hero-reveal text-[34px] font-medium leading-[1.3] max-[380px]:text-[28px] sm:text-6xl sm:leading-[1.12] lg:text-7xl">
          Your Comprehensive Guide to{' '}
          <Image
            src="/assets/home/hero-floating.png"
            alt=""
            width={401}
            height={313}
            className="inline-block h-11 w-auto align-middle -mx-2 max-[380px]:h-9 max-[380px]:-mx-1.5 sm:-mx-4 sm:h-20 lg:h-24"
          />{' '}
          <span style={{ color: 'var(--home-lime-text)' }}>Learning Technology</span>
        </h1>

        <p
          className="home-hero-reveal font-mono-home max-w-2xl text-base sm:text-lg lg:text-xl"
          style={{ color: 'var(--home-foreground-subtle)' }}
        >
          Clear explanations, practical examples, and real code, for beginners and experienced developers alike.
        </p>

        <div className="home-hero-reveal relative flex w-full max-w-2xl items-stretch gap-2 sm:gap-3">
          <div
            className="home-hero-search-bar relative flex min-w-0 flex-1 items-center rounded-2xl border p-1 backdrop-blur-md"
            style={{ background: 'var(--home-surface)' }}
          >
            <span
              aria-hidden="true"
              className="home-hero-search-ambient-glow pointer-events-none absolute left-1/2 top-1/2 h-24 w-[90%] -translate-x-1/2 -translate-y-1/2 sm:h-32"
            />
            <HeroSearchTrigger />
          </div>
          <GetStartedCta size="hero" className="shrink-0" />
        </div>
      </div>

      <HeroReveal />
    </section>
  );
}
