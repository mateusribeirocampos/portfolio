import { LayoutClient } from '../../components/layout-client';

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  // Await params in Next.js 15
  const { lang } = await params;

  return (
    <LayoutClient lang={lang}>
      {children}
    </LayoutClient>
  );
}