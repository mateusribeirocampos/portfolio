import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Panel - Portfolio',
  description: 'Administrative panel for portfolio management',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      {children}
    </div>
  );
}