import { LayoutClient } from '../../components/layout-client';

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  // Unwrap params properly
  const lang = params.lang;

  return (
    <LayoutClient lang={lang}>
      {children}
    </LayoutClient>
  );
}