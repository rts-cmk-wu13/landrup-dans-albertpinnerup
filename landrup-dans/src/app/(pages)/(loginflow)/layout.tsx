import LoginFlowLayout from '@/layouts/LoginFlowLayout';

export default function AuthPagesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <LoginFlowLayout>{children}</LoginFlowLayout>;
}
