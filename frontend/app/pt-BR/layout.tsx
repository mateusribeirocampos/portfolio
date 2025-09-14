import { LayoutClient } from '@/components/layout-client';

export default function PortugueseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutClient lang="pt-BR">
      {children}
    </LayoutClient>
  );
}