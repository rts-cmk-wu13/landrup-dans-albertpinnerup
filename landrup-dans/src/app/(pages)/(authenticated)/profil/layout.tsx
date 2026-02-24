import ProfilLayout from '@/layouts/ProfilLayout';

export default function ProfilePagesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <ProfilLayout>{children}</ProfilLayout>;
}
