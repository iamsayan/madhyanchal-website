import type { Metadata } from 'next'
import DrawingCompetitionForm from '@/components/drawing-competition-form';

export const metadata: Metadata = {
    title: {
        absolute: 'Drawing Competition Registration',
    },
    description: 'Register for the drawing competition organized by Madhyanchal Sarbajanin Durga Puja Samity. Open to all age groups with exciting prizes.',
    alternates: {
        canonical: '/durgapuja/drawing-competition',
    },
    openGraph: {
        siteName: 'Madhyanchal Sarbajanin Durga Puja Samity',
        locale: 'en_US',
        type: 'website',
        url: '/durgapuja/drawing-competition'
    },
    keywords: ['durga puja', 'chandannagar', 'madhyanchal'],
    publisher: 'Madhyanchal Sarbajanin Durga Puja Samity',
    robots: {
        index: false,
        follow: false,
        googleBot: {
            index: false,
            follow: false,
        },
    },
}

export default function Page() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
            <DrawingCompetitionForm />
        </div>
    )
}