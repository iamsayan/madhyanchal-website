import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Madhyanchal Sarbajanin Jagadhatri Puja Samity',
        short_name: 'Madhyanchal Sarbajanin',
        description: `${new Date().getFullYear() - 1971 + 1} Years of Tradition, Unity, and Celebration since 1971!`,
        start_url: '/',
        display: 'standalone',
        background_color: '#eab308',
        theme_color: '#eab308',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}