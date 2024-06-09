export const PRODUCT_CATEGORIES = [
    {
        label: 'Women',
        value: 'women' as const,
        featured: [
            {
            name: 'New Arrivals',
            href: '#',
            imageSrc: '/vercel.svg'
            },
            {
                name: 'Our bestsellers',
                href: '#',
                imageSrc: '/girls.jpg'
            }

        ]
    },
    {
        label: 'Men',
        value: 'Men' as const,
        featured: [
            {
            name: 'New Arrivals',
            href: '#',
            imageSrc: '/vercel.svg'
            },
            {
                name: 'Our bestsellers',
                href: '#',
                imageSrc: '/suitntie.jpg'
            }

        ]
    }
]