import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import NoiseOverlay from '@/components/NoiseOverlay';
import { TabProvider } from '@/context/TabContext';

export const metadata: Metadata = {
  title: '달러구트 꿈 백화점',
  description: '잠들어야만 들어갈 수 있는 신비로운 꿈 백화점 마이크로사이트',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="relative min-h-screen bg-[#031133] antialiased">
        <TabProvider>
          {/* 전체 화면 노이즈 오버레이 */}
          <NoiseOverlay />

          {/* 메인 콘텐츠 영역 */}
          <div className="flex flex-col min-h-screen relative z-10">
            <Navbar />
            <main className="flex-grow flex flex-col">
              {children}
            </main>
          </div>
        </TabProvider>
      </body>
    </html>
  );
}
