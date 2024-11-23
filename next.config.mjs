/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: process.env.API_URL,
        API_KEY: process.env.API_KEY,
        WEB3_FORM_API_KEY: process.env.WEB3_FORM_ACCESS_KEY,
        GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY,
        RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
        RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
    },
    images: {
        formats: ['image/webp'],
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.madhyanchalsarbajanin.co.in',
            },
        ],
    },
    async redirects() {
        return [
            {
                source: '/payment.php',
                destination: '/payment/membership',
                permanent: true,
            },
        ]
    },
}
export default nextConfig;
