// La vraie racine (<html lang>) est app/[locale]/layout.tsx. Ce layout existe
// seulement parce que app/not-found.tsx (404.html de l'export) vit hors de
// [locale] ; il se contente de passer les enfants.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
