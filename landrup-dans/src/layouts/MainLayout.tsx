import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import '@/app/globals.css';
import NavBar from '@/components/Menu';
import { checkAuthentication } from '@/lib/auth';

const ubuntu = Ubuntu({
    weight: ['300', '400', '500', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Landrup Dans',
    description:
        'Landrup Dans er en danseforening i Landrup, Danmark. Vi tilbyder dans for alle aldre og niveauer, fra begyndere til erfarne dansere. Vores mål er at skabe et sjovt og inkluderende miljø, hvor alle kan nyde dansen og udvikle deres færdigheder.',
};

export default async function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const isAuthenticated = await checkAuthentication();

    return (
        <html lang='en' className='scroll-smooth'>
            <body
                className={`${ubuntu.className}  antialiased bg-[#003147] text-white ${isAuthenticated ? 'pb-16' : ''}`}
            >
                {children}
                <ToastContainer />
                {isAuthenticated && (
                    <div className='fixed bottom-0 w-full'>
                        <NavBar />
                    </div>
                )}
            </body>
        </html>
    );
}
