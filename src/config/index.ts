export const PRODUCT_CATEGORIES = [
  {
    label: 'Books',
    value: 'ui_kits' as const,
    featured: [
      {
        name: 'Editor picks',
        href: `/products?category=Books`,
        imageSrc: '/nav/ui-kits/mixed.jpg',
      },
      {
        name: 'New Arrivals',
        href: '/products?category=Books&sort=desc',
        imageSrc: '/nav/ui-kits/blue.jpg',
      },
      {
        name: 'Bestsellers',
        href: '/products?category=Books',
        imageSrc: '/nav/ui-kits/purple.jpg',
      },
    ],
  },
  {
    label: 'Novels',
    value: 'icons' as const,
    featured: [
      {
        name: 'Favorite Icon Picks',
        href: `/products?category=Novels`,
        imageSrc: '/nav/novels/picks.jpg',
      },
      {
        name: 'New Arrivals',
        href: '/products?category=Novels&sort=desc',
        imageSrc: '/nav/novels/new.jpg',
      },
      {
        name: 'Bestselling Icons',
        href: '/products?category=Novels',
        imageSrc: '/nav/novels/elhol.jpg',
      },
    ],
  },
]