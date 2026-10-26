import Link from 'next/link';

interface GetStartedCtaProps {
  className?: string;
  onClick?: () => void;
  size?: 'default' | 'lg' | 'hero';
}

const SIZE_CLASSES: Record<NonNullable<GetStartedCtaProps['size']>, string> = {
  default: 'px-4 py-2 text-sm',
  lg: 'px-4 py-[10px] text-sm',
  hero: 'px-3 py-1 text-xs sm:px-7 sm:py-1.5 sm:text-base',
};

export function GetStartedCta({ className = '', onClick, size = 'default' }: GetStartedCtaProps) {
  return (
    <Link
      href="/docs"
      onClick={onClick}
      className={`home-get-started-cta relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold ${SIZE_CLASSES[size]} ${className}`}
      style={{ background: 'var(--home-foreground-strong)', boxShadow: 'inset 0 0 0 1px var(--home-border)' }}
    >
      <span>Get Started</span>
    </Link>
  );
}
