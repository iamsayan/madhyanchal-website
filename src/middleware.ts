import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Get the origin and referer headers
    const origin = request.headers.get('origin')
    //const referer = request.headers.get('referer')

    // Add your website's URL here
    const allowedOrigins = [
        process.env.NEXT_PUBLIC_SITE_URL,
    ]

    // Check if the request is for the API route
    if (request.nextUrl.pathname.startsWith('/api')) {
        // Verify origin
        if (!origin || !allowedOrigins.includes(origin)) {
            return new NextResponse(
                JSON.stringify({ error: 'Unauthorized' }),
                {
                    status: 401,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
        }
    }

    return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
    matcher: '/api/:path*'
} 