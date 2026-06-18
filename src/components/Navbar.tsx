'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import ImagePlaceholder from './ui/ImagePlaceholder';
import { useTab } from '@/context/TabContext';

// ─── 스크롤 기반 메뉴 ───
const SCROLL_ITEMS = [
  { label: 'Book Overview', sectionId: 'book-overview' },
  { label: 'Author',        sectionId: 'author' },
  { label: 'Story',         sectionId: 'story' },
  { label: 'Character',     sectionId: 'character' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router   = useRouter();
  const { activeTab, setActiveTab, setIsScrollLocked } = useTab();

  // 메인 페이지 여부
  const isMainPage = pathname === '/';

  // 스크롤 감지로 활성 섹션 추적 (메인 페이지에서만 의미 있음)
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    if (!isMainPage) return; // 서브 페이지에선 옵저버 불필요

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-40% 0px -55% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    SCROLL_ITEMS.forEach(({ sectionId }) => {
      const el = document.getElementById(sectionId);
      if (el) observer.observe(el);
    });

    const homeEl = document.getElementById('home');
    if (homeEl) observer.observe(homeEl);

    return () => observer.disconnect();
  }, [isMainPage]);

  // 스크롤 메뉴 클릭: 메인 페이지면 잠금 풀고 스무스 스크롤, 다른 페이지면 메인으로 이동 후 해당 섹션으로
  const handleScrollNavClick = useCallback(
    (e: React.MouseEvent, sectionId: string) => {
      e.preventDefault();
      
      // 1) 스크롤 락 풀기
      setIsScrollLocked(false);
      
      // 2) 잠금이 풀린 직후 스무스 스크롤 이동 (스타일 업데이트 반영 대기 50ms)
      setTimeout(() => {
        if (isMainPage) {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveSection(sectionId);
          }
        } else {
          router.push(`/#${sectionId}`);
        }
      }, 50);
    },
    [isMainPage, router, setIsScrollLocked]
  );

  // 로고 클릭: 메인 최상단(Home)으로 스크롤하고 탭은 Outside로 초기화
  const handleLogoClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setActiveTab('outside');
      setIsScrollLocked(true);
      if (isMainPage) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveSection('home');
      } else {
        router.push('/');
      }
    },
    [isMainPage, router, setActiveTab, setIsScrollLocked]
  );

  // DREAM WORLD 타이틀 또는 탭 클릭 핸들러 (최상단 스크롤 + 잠금 복구)
  const handleDreamWorldAction = useCallback(
    (tab?: 'outside' | 'inside') => {
      if (tab) {
        setActiveTab(tab);
      }
      setIsScrollLocked(true);
      if (isMainPage) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveSection('home');
      } else {
        router.push('/');
      }
    },
    [isMainPage, router, setActiveTab, setIsScrollLocked]
  );

  // 각 스크롤 메뉴의 active 여부
  const isScrollActive = (sectionId: string) =>
    isMainPage && activeSection === sectionId;

  return (
    <nav 
      className="w-full flex items-center justify-between py-4 px-8 border-b border-[#FFF8B9]/15 bg-[#031133]/85 backdrop-blur-md fixed top-0 left-0 z-[99999]"
      style={{ transform: 'translate3d(0, 0, 0)', WebkitTransform: 'translate3d(0, 0, 0)' }}
    >

      {/* 좌측 영역: 로고 */}
      <div className="flex-shrink-0 relative z-20">
        <a
          href="/"
          onClick={handleLogoClick}
          className="cursor-pointer hover:opacity-85 transition-opacity block"
        >
          <ImagePlaceholder
            alt="달러구트 꿈 백화점.png"
            width={240}
            height={56}
            className="rounded"
          />
        </a>
      </div>

      {/* 정중앙 영역: DREAM WORLD 세그먼트 컨트롤 UI (Outside/Inside 토글) */}
      <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10">
        <button
          onClick={() => handleDreamWorldAction()}
          className="font-glegoo text-[11px] tracking-widest text-[#FFF8B9]/60 hover:text-[#FFF8B9] font-extrabold uppercase select-none cursor-pointer pb-0.5 transition-colors duration-200"
        >
          DREAM WORLD
        </button>
        <div className="flex items-center bg-[#031133]/65 border border-[#FFF8B9]/20 p-0.5 rounded-full text-[11px] font-glegoo shadow-inner backdrop-blur-sm">
          <button
            onClick={() => handleDreamWorldAction('outside')}
            className={`px-5 py-1.5 rounded-full transition-all duration-300 font-bold tracking-wider cursor-pointer ${
              activeTab === 'outside'
                ? 'bg-[#FFF8B9] text-[#031133] shadow-md'
                : 'text-[#F5F5F5]/80 hover:text-[#FFF8B9] hover:bg-[#FFF8B9]/5'
            }`}
          >
            Outside
          </button>
          <button
            onClick={() => handleDreamWorldAction('inside')}
            className={`px-5 py-1.5 rounded-full transition-all duration-300 font-bold tracking-wider cursor-pointer ${
              activeTab === 'inside'
                ? 'bg-[#FFF8B9] text-[#031133] shadow-md'
                : 'text-[#F5F5F5]/80 hover:text-[#FFF8B9] hover:bg-[#FFF8B9]/5'
            }`}
          >
            Inside
          </button>
        </div>
      </div>

      {/* 우측 영역: 메뉴 (4개의 서사 메뉴만 배치) */}
      <div className="ml-auto flex items-center gap-8 font-glegoo text-sm tracking-wide text-[#F5F5F5] relative z-20">

        {/* 스크롤 메뉴 4개 */}
        {SCROLL_ITEMS.map(({ label, sectionId }) => {
          const isActive = isScrollActive(sectionId);
          return (
            <a
              key={sectionId}
              href={`#${sectionId}`}
              onClick={(e) => handleScrollNavClick(e, sectionId)}
              className={`relative pb-1 transition-colors duration-200 ${
                isActive
                  ? 'text-[#FFF8B9]'
                  : 'text-[#F5F5F5] hover:text-[#FFF8B9]'
              }`}
            >
              {label}
              {/* 활성 언더라인 */}
              <span
                className={`absolute bottom-0 left-0 w-full h-[1.5px] rounded-full bg-[#FFF8B9] transition-all duration-300 origin-left ${
                  isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                }`}
              />
            </a>
          );
        })}

      </div>

    </nav>
  );
}
