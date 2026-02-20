import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import '@/app/globals.css';

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

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' className='scroll-smooth'>
            <body className={`${ubuntu.className}  antialiased bg-[#003147] text-white`}>
                {children}
                <ToastContainer />
            </body>
        </html>
    );
}
