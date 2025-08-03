import type { Metadata } from 'next'
import DrawingCompetitionForm from '@/components/drawing-competition-form';

export const metadata: Metadata = {
    title: 'Drawing Competition Registration - Madhyanchal Sarbajanin Durga Puja Samity',
    description: 'Register for the drawing competition organized by Madhyanchal Sarbajanin Durga Puja Samity. Open to all age groups with exciting prizes.',
    alternates: {
        canonical: '/drawing-competition',
    },
    openGraph: {
        title: 'Drawing Competition Registration',
        description: 'Register for the drawing competition organized by Madhyanchal Sarbajanin Durga Puja Samity',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Drawing Competition Registration',
        description: 'Register for the drawing competition organized by Madhyanchal Sarbajanin Durga Puja Samity',
    },
}

export default function Page() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
            <DrawingCompetitionForm />
        </div>
    )
}