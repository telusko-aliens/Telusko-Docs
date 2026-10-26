export interface FooterLink {
  label: string;
  href: string;
}

export const FOOTER_LEARN_LINKS: FooterLink[] = [
  { label: 'Courses', href: 'https://learn.telusko.com/allcourses' },
  { label: 'Webinars', href: 'https://learn.telusko.com/webinar' },
  { label: 'AI Alien Coach', href: 'https://aliencoach.com/' },
];

export const FOOTER_COMPANY_LINKS: FooterLink[] = [
  { label: 'Career', href: 'https://telusko.com/career' },
  { label: 'Contact Us', href: 'https://telusko.com/contact-us' },
  { label: 'Leave a Testimonial', href: 'https://www.telusko.com/testimonials' },
];

export const FOOTER_LEGAL_LINKS: FooterLink[] = [
  { label: 'Privacy Policy', href: 'https://telusko.com/privacy-policy' },
  { label: 'Terms of Service', href: 'https://telusko.com/terms-of-service' },
  { label: 'Refund Policy', href: 'https://www.telusko.com/refund-policy' },
];

export const FOOTER_SOCIAL_LINKS: FooterLink[] = [
  { label: 'YouTube', href: 'https://www.youtube.com/@Telusko' },
  { label: 'Instagram', href: 'https://www.instagram.com/telusko_edutech' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/telusko' },
  { label: 'Discord', href: 'https://discord.gg/D8hWe9BqfF' },
];

export interface FooterStoreLink {
  label: string;
  topLine: string;
  bottomLine: string;
  href: string;
}

export const FOOTER_STORE_LINKS: FooterStoreLink[] = [
  {
    label: 'App Store',
    topLine: 'Download on the',
    bottomLine: 'App Store',
    href: 'https://apps.apple.com/in/app/telusko/id6776657207',
  },
  {
    label: 'Google Play',
    topLine: 'Get It On',
    bottomLine: 'Google Play',
    href: 'https://play.google.com/store/apps/details?id=com.telusko.lms',
  },
];
