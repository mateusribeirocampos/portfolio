import { Providers } from '@/providers';

export default function PortugueseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers lang="pt-BR">
      {children}
    </Providers>
  );
}