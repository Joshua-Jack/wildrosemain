export type NavLink = { label: string; href: string; external?: boolean };

export const NAV_LINKS: NavLink[] = [
  { label: 'Athletes', href: '/athletes' },
  { label: 'Shop', href: '/shop' },
  { label: 'Tournaments', href: '/#tournaments' },
  { label: 'Story', href: '/#story' },
];
