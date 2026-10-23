import './globals.css';
import { AppProvider } from '@/context/AppContext';
import AppLayoutWrapper from '@/components/AppLayoutWrapper';

export const metadata = {
  title: 'OLX Neo Admin - Boshqaruv Tizimi',
  description: 'OLX O\'zbekiston zamonaviy Neo boshqaruv va moderatsiya paneli',
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body className="antialiased selection:bg-[#00DF81]/30 selection:text-[#0b2620]">
        <AppProvider>
          <AppLayoutWrapper>{children}</AppLayoutWrapper>
        </AppProvider>
      </body>
    </html>
  );
}
