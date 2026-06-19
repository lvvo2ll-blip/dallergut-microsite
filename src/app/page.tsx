'use client';

import React, { useState, useEffect, useRef } from 'react';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import { floorData } from '@/constants/floorData';
import { characterData } from '@/constants/characterData';
import { dreamBoxData } from '@/constants/dreamBoxData';
import { useDreamToggle } from '@/hooks/useDreamToggle';
import { useTab } from '@/context/TabContext';

// ───────────────────────────────────────────────
// FLOORTUOLTIP 컴포넌트 (X 버튼 포함)
// ───────────────────────────────────────────────
function FloorTooltip({
  floor,
  activeFloor,
  onClose,
}: {
  floor: number;
  activeFloor: number | null;
  onClose: () => void;
}) {
  const item = floorData.find((f) => f.floor === floor);
  return (
    <div
      className={`absolute left-[105px] top-1/2 -translate-y-1/2 z-20 w-max max-w-[260px] sm:max-w-[320px] bg-[#FFF8B9] text-[#031133] rounded-lg shadow-xl border border-[#FFF8B9] font-gowun text-xs leading-relaxed transition-all duration-300 ${activeFloor === floor
        ? 'opacity-100 translate-x-0 scale-100 pointer-events-auto'
        : 'opacity-0 -translate-x-2 scale-95 pointer-events-none'
        }`}
    >
      {/* 말꼬리 화살표 */}
      <div className="absolute -left-[18px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-[#FFF8B9] border-b-8 border-b-transparent" />
      {/* 툴팁 본문 + X 버튼 */}
      <div className="relative p-3 pr-7">
        <p className="whitespace-normal break-keep">{item?.text}</p>
        {/* X 닫기 버튼 */}
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute top-1.5 right-1.5 w-5 h-5 flex items-center justify-center text-[#031133]/60 hover:text-[#031133] hover:bg-[#031133]/10 rounded-full transition-all duration-150 font-glegoo text-[10px] font-bold leading-none cursor-pointer"
          aria-label={`${floor}층 안내창 닫기`}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────
// HOME 섹션 (Outside / Inside 토글 구조)
// ───────────────────────────────────────────────
function HomeSection() {
  const { activeTab } = useTab();
  const [activeFloor, setActiveFloor] = useState<number | null>(null);
  const [isIntroduceOpen, setIsIntroduceOpen] = useState(true);
  const { toggleBox, isBoxActive } = useDreamToggle();

  const handleFloorClick = (floor: number) => {
    setActiveFloor(activeFloor === floor ? null : floor);
  };

  const handleClose = () => setActiveFloor(null);

  const topBoxes = dreamBoxData.slice(0, 4);
  const bottomBoxes = dreamBoxData.slice(4, 8);

  return (
    <section
      id="home"
      className="w-full h-screen min-h-screen relative bg-[#031133] overflow-hidden"
    >
      {/* ── 1) OUTSIDE 탭 콘텐츠 (백화점 외부 층별 안내) ── */}
      <div
        className={`absolute inset-0 pt-[88px] transition-opacity duration-700 ease-in-out flex items-center justify-center overflow-hidden ${activeTab === 'outside'
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
          }`}
      >


        {/* 좌측: 지시문 텍스트 */}
        <div
          className="absolute bottom-24 z-20 text-left bg-[#FFF8B9]/10 backdrop-blur-[3px] border border-[#FFF8B9]/15 rounded-2xl p-5 shadow-[0_0_35px_15px_rgba(255,248,185,0.18)]"
          style={{ left: '3%', maxWidth: '460px' }}
        >
          <h2 className="text-[#FFF8B9] font-glegoo font-bold text-base md:text-lg tracking-wide leading-snug mb-3">
            층별 표지판을 클릭해 보세요!
          </h2>
          <p className="text-[#0a1835] font-gowun text-[14px] md:text-[15px] leading-relaxed">
            이곳은 잠든 사람만 입장할 수 있는 신비로운 공간, 꿈 백화점.<br />
            각 층은 저마다 다른 매력을 가지고 있으며, 개성에 맞는 매니저가 운영하고 있습니다. 어떤 꿈이 판매되고 있는지 궁금한가요? 층별 표지판을 클릭해 꿈 백화점의 비밀을 확인해 보세요!
          </p>
        </div>

        {/* 건물 + 별 손잡이 relative 부모 컨테이너 */}
        <div className="relative w-full h-full flex items-end justify-center">
          <div className="absolute min-w-full min-h-full aspect-[1920/1080] shrink-0 bottom-0">
            <img
              src={encodeURI('/Home_배경.png')}
              alt="백화점 건물"
              className="w-full h-full object-bottom select-none pointer-events-none"
            />

            {/* 구름 1 (좌측, 건물 기준 정렬) */}
            <div className="absolute top-[36.5%] left-[8%] w-[180px] h-[100px] sm:w-[260px] sm:h-[150px] lg:w-[320px] lg:h-[180px] z-[5] animate-cloud-1">
              <ImagePlaceholder alt="구름1.png" className="opacity-80" />
            </div>

            {/* 구름 2 (우측, 건물 기준 정렬) */}
            <div className="absolute top-[12%] right-[10%] w-[200px] h-[110px] sm:w-[300px] sm:h-[170px] lg:w-[360px] lg:h-[200px] z-[5] animate-cloud-2">
              <ImagePlaceholder alt="구름1.png" className="opacity-80" />
            </div>

            {/* 5F — 건물 5층 창문 라인 */}
            <div className="absolute z-10" style={{ bottom: '61.6%', left: '63%' }}>
              <div className="flex items-center gap-3 relative">
                <button
                  onClick={() => handleFloorClick(5)}
                  className="w-[60px] h-[34px] glow-effect focus:outline-none flex-shrink-0 cursor-pointer"
                  aria-label="5층 표지판"
                >
                  <ImagePlaceholder alt="별 손잡이.png" width={60} height={34} />
                </button>
                <span className="font-glegoo text-xs text-[#FFF8B9]/80 font-bold select-none w-6 text-center">5F</span>
                <FloorTooltip floor={5} activeFloor={activeFloor} onClose={handleClose} />
              </div>
            </div>

            {/* 4F — 건물 4층 창문 라인 */}
            <div className="absolute z-10" style={{ bottom: '49.7%', left: '63%' }}>
              <div className="flex items-center gap-3 relative">
                <button
                  onClick={() => handleFloorClick(4)}
                  className="w-[60px] h-[34px] glow-effect focus:outline-none flex-shrink-0 cursor-pointer"
                  aria-label="4층 표지판"
                >
                  <ImagePlaceholder alt="별 손잡이.png" width={60} height={34} />
                </button>
                <span className="font-glegoo text-xs text-[#FFF8B9]/80 font-bold select-none w-6 text-center">4F</span>
                <FloorTooltip floor={4} activeFloor={activeFloor} onClose={handleClose} />
              </div>
            </div>

            {/* 3F — 건물 3층 창문 라인 */}
            <div className="absolute z-10" style={{ bottom: '36.9%', left: '63%' }}>
              <div className="flex items-center gap-3 relative">
                <button
                  onClick={() => handleFloorClick(3)}
                  className="w-[60px] h-[34px] glow-effect focus:outline-none flex-shrink-0 cursor-pointer"
                  aria-label="3층 표지판"
                >
                  <ImagePlaceholder alt="별 손잡이.png" width={60} height={34} />
                </button>
                <span className="font-glegoo text-xs text-[#FFF8B9]/80 font-bold select-none w-6 text-center">3F</span>
                <FloorTooltip floor={3} activeFloor={activeFloor} onClose={handleClose} />
              </div>
            </div>

            {/* 2F — 건물 2층 창문 라인 */}
            <div className="absolute z-10" style={{ bottom: '24.2%', left: '63%' }}>
              <div className="flex items-center gap-3 relative">
                <button
                  onClick={() => handleFloorClick(2)}
                  className="w-[60px] h-[34px] glow-effect focus:outline-none flex-shrink-0 cursor-pointer"
                  aria-label="2층 표지판"
                >
                  <ImagePlaceholder alt="별 손잡이.png" width={60} height={34} />
                </button>
                <span className="font-glegoo text-xs text-[#FFF8B9]/80 font-bold select-none w-6 text-center">2F</span>
                <FloorTooltip floor={2} activeFloor={activeFloor} onClose={handleClose} />
              </div>
            </div>

            {/* 1F — 건물 1층 창문 라인 */}
            <div className="absolute z-10" style={{ bottom: '11.4%', left: '63%' }}>
              <div className="flex items-center gap-3 relative">
                <button
                  onClick={() => handleFloorClick(1)}
                  className="w-[60px] h-[34px] glow-effect focus:outline-none flex-shrink-0 cursor-pointer"
                  aria-label="1층 표지판"
                >
                  <ImagePlaceholder alt="별 손잡이.png" width={60} height={34} />
                </button>
                <span className="font-glegoo text-xs text-[#FFF8B9]/80 font-bold select-none w-6 text-center">1F</span>
                <FloorTooltip floor={1} activeFloor={activeFloor} onClose={handleClose} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2) INSIDE 탭 콘텐츠 (Dream Box 체험 코너) ── */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center pt-[88px] pb-6 px-6 md:px-12 transition-opacity duration-700 ease-in-out ${activeTab === 'inside'
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
          }`}
        style={{
          backgroundImage: `url('${encodeURI('/Dream Box 배경.png')}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'bottom center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* 타이틀 및 지시문 */}
        <div className="absolute top-36 text-center z-10">
          <h1 className="font-glegoo text-[#031133] text-3xl md:text-4xl tracking-widest lowercase select-none">
            Dream Box
          </h1>
          <p className="font-gowun text-[#031133]/70 text-[16px] mt-1.5">
            상자를 클릭하면 신비로운 꿈의 이름이 밝혀집니다.
          </p>
        </div>

        {/* 중앙 선반 레이아웃 컨테이너 */}
        <div className="w-full max-w-4xl flex flex-col gap-16 md:gap-20 mt-20 z-10 px-4">

          {/* 1. 선반 위쪽 라인 */}
          <div className="relative">
            <div className="absolute -bottom-[26px] left-0 w-full h-[30px] bg-[#C8C8C8] rounded-md shadow-[0_4px_8px_rgba(0,0,0,0.3)]" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 justify-items-center">
              {topBoxes.map((item) => {
                const isActive = isBoxActive(item.id);
                return (
                  <div key={item.id} className="flex flex-col items-center relative w-[95px] sm:w-[115px] h-[140px] justify-end">

                    {/* 가변형 CSS 연노랑 광채 말풍선 */}
                    {isActive && (
                      <div
                        className="absolute bottom-[95px] z-20 w-max max-w-[170px] bg-[#FFF8B9] text-[#031133] rounded-lg shadow-[0_0_12px_rgba(255,248,185,0.65)] border border-[#FFF8B9] font-gowun text-[11px] font-bold text-center px-3 py-2 animate-tag-appear"
                        style={{
                          transform: `rotate(${item.rotation})`,
                          transformOrigin: 'center center',
                        }}
                      >
                        {/* 말풍선 꼬리 */}
                        <div className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-0 h-0 border-t-[5px] border-t-[#FFF8B9] border-x-[5px] border-x-transparent" />

                        {/* 텍스트 내용 */}
                        <span className="relative z-10 select-text leading-tight whitespace-nowrap">
                          {item.text}
                        </span>
                      </div>
                    )}

                    <button
                      onClick={() => toggleBox(item.id)}
                      className="w-[85px] h-[85px] flex items-end justify-center origin-bottom hover:scale-[1.08] transition-transform duration-300 focus:outline-none cursor-pointer z-10"
                      aria-label={`꿈 상자 ${item.id}번`}
                    >
                      <ImagePlaceholder alt={item.boxImage} width={85} height={85} className="object-bottom" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. 선반 아래쪽 라인 */}
          <div className="relative">
            <div className="absolute -bottom-[26px] left-0 w-full h-[30px] bg-[#C8C8C8] rounded-md shadow-[0_4px_8px_rgba(0,0,0,0.3)]" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 justify-items-center">
              {bottomBoxes.map((item) => {
                const isActive = isBoxActive(item.id);
                return (
                  <div key={item.id} className="flex flex-col items-center relative w-[95px] sm:w-[115px] h-[140px] justify-end">

                    {/* 가변형 CSS 연노랑 광채 말풍선 */}
                    {isActive && (
                      <div
                        className="absolute bottom-[95px] z-20 w-max max-w-[170px] bg-[#FFF8B9] text-[#031133] rounded-lg shadow-[0_0_12px_rgba(255,248,185,0.65)] border border-[#FFF8B9] font-gowun text-[11px] font-bold text-center px-3 py-2 animate-tag-appear"
                        style={{
                          transform: `rotate(${item.rotation})`,
                          transformOrigin: 'center center',
                        }}
                      >
                        {/* 말풍선 꼬리 */}
                        <div className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-0 h-0 border-t-[5px] border-t-[#FFF8B9] border-x-[5px] border-x-transparent" />

                        <span className="relative z-10 select-text leading-tight whitespace-nowrap">
                          {item.text}
                        </span>
                      </div>
                    )}

                    <button
                      onClick={() => toggleBox(item.id)}
                      className="w-[85px] h-[85px] flex items-end justify-center origin-bottom hover:scale-[1.08] transition-transform duration-300 focus:outline-none cursor-pointer z-10"
                      aria-label={`꿈 상자 ${item.id}번`}
                    >
                      <ImagePlaceholder alt={item.boxImage} width={85} height={85} className="object-bottom" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
      {/* 메인 컨테이너 최하단 소프트 노이즈 레이어 분리 구현 */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.02]"
        style={{
          backgroundColor: '#FFFFFF',
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          mixBlendMode: 'overlay',
          filter: 'brightness(1.1) contrast(1.25)',
        }}
      />
      {/* ── 3) Introduce 상시 팝업 레이아웃 ── */}
      {isIntroduceOpen ? (
        <div className="fixed right-6 top-24 z-50 w-[calc(100vw-48px)] sm:max-w-sm bg-[#0a1835]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl text-[#FAFAFA] font-gowun flex flex-col gap-4 transition-all duration-300">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h3 className="font-glegoo font-bold text-lg text-[#FFF8B9] tracking-wide">Introduce</h3>
            <button
              onClick={() => setIsIntroduceOpen(false)}
              className="text-[#FFF8B9] hover:text-white transition-colors cursor-pointer text-sm w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10 focus:outline-none"
              aria-label="안내창 닫기"
            >
              ✕
            </button>
          </div>
          <div className="flex flex-col gap-3 text-[15px] leading-relaxed max-h-[320px] overflow-y-auto pr-1 sharp-text">
            <p className="whitespace-pre-line break-keep text-[#FAFAFA]/90">
              《달러구트 꿈 백화점》은 꿈 백화점이라는 신비로운 공간을 통해 환상과 따뜻한 일상을 그려낸 판타지 소설이다. 잠들어야만 입장할 수 있는 신비로운 꿈 상점가 마을을 배경으로, 꿈을 사고파는 사람들의 다양한 이야기를 담고 있다. 이 작품은 현실에 지친 현대인의 소망에서 출발해, 독자에게 따뜻한 판타지와 위로의 경험을 선사한다. 또한 단순히 판타지 속 치유로 끝나는 것이 아니라, 꿈과 삶에 대한 질문을 던지며 독자가 자신의 현재를 돌아보게 한다는 점에서 의미가 있다.
            </p>
            <p className="whitespace-pre-line break-keep text-[#FAFAFA]/90">
              이 사이트는 판타지 소설 《달러구트 꿈 백화점》을 간단히 소개하고, 사용자가 작품 속 신비로운 세계관을 직접 체험할 수 있도록 제작한 마이크로사이트이다. 책 속 꿈 백화점의 분위기를 전달하기 위해 백화점 건물 일러스트를 중심으로 몽환적인 밤하늘과 따뜻한 백화점 조명을 컨셉으로 디자인하였다. 특히 백화점 층별 안내와 꿈 상자 선택 체험 기능은 사용자가 달러구트 꿈 백화점의 세계관을 간접적으로 경험할 수 있도록 구성한 요소이다. 이 사이트를 통해 사용자가 작품에 대한 흥미를 느끼고, 책이 가진 따뜻한 판타지적 매력을 발견하는 것을 목표로 한다.
            </p>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsIntroduceOpen(true)}
          className="fixed right-6 top-24 z-50 w-12 h-12 rounded-full bg-[#FFF8B9]/20 border border-[#FFF8B9]/40 flex items-center justify-center text-lg text-[#FFF8B9] animate-pulse cursor-pointer hover:bg-[#FFF8B9]/30 transition-all shadow-lg hover:scale-105 focus:outline-none"
          aria-label="안내창 열기"
        >
          🌙
        </button>
      )}
    </section>
  );
}

// ───────────────────────────────────────────────
// BOOK OVERVIEW 섹션
// ───────────────────────────────────────────────
function BookOverviewSection() {
  return (
    <section
      id="book-overview"
      className="w-full min-h-screen relative overflow-hidden bg-[#031133] flex flex-col items-center justify-center p-6 sm:p-12 md:p-16"
      style={{
        backgroundImage: `url('${encodeURI('/Story_배경.png')}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="w-full max-w-6xl flex flex-col gap-12 z-10 mt-28 mb-28">
        {/* [상단 타이틀 및 소개글] */}
        <div className="text-center flex flex-col items-center gap-3 relative w-full">
          {/* 타이틀 뒷배경 몽환적인 조명 광채 (블러 크기를 축소하여 선명도 유지) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-[#FFF8B9]/10 to-[#D6C4FF]/10 rounded-full blur-2xl pointer-events-none -z-10" />
          <h2 className="font-glegoo text-[#FFF8B9] text-3xl md:text-4xl tracking-widest lowercase select-none">
            Book Overview
          </h2>
          <div className="h-[1.5px] w-24 md:w-32 bg-gradient-to-r from-transparent via-[#FFF8B9]/60 to-transparent mx-auto mb-10" />
          <p className="font-gowun text-[#FAFAFA] text-sm md:text-base leading-loose max-w-3xl text-center select-text mt-2 whitespace-normal break-keep sharp-text">
            여기는 잠들어야만 입장할 수 있는 ‘달러구트 꿈 백화점’입니다.
            주인공 &apos;페니&apos;가 꿈 백화점에 취직해 다양한 꿈 제작자, 손님들과 겪는 에피소드를 통해 일상과 감정의 소중함을 깨닫는 과정을 담고 있습니다.
          </p>
          <span className="font-gowun text-[#FFF8B9]/70 text-[14px] md:text-[15px] tracking-wider select-none mt-1">
            -자세한 내용은 story 메뉴를 통해 읽어주세요-
          </span>
        </div>

        {/* 작품 소개 소제목 - 좌측 그리드 정렬 */}
        <h3 className="font-gowun text-[#FFF8B9] text-base md:text-lg font-bold border-b border-[#FFF8B9]/20 pb-1 w-fit -mt-4">
          작품 소개
        </h3>

        {/* [중단: 2컬럼 구조 - 책 표지 & 정보 카드] */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-stretch w-full md:h-[400px]">
          {/* [왼쪽 컬럼]: 책 표지 */}
          <div className="flex justify-center items-center relative group w-full h-full">
            <img
              src="/책표지.jpg"
              alt="달러구트 꿈 백화점 책 표지"
              className="relative h-full md:h-[400px] w-auto rounded-lg shadow-2xl border border-[#FFF8B9]/15 object-contain transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>

          {/* [오른쪽 컬럼]: 정보 카드 패널 */}
          <div className="w-full h-full">
            <div className="relative bg-[#0a1e56]/65 backdrop-blur-md p-6 rounded-2xl border border-[#FFF8B9]/15 shadow-2xl font-gowun flex flex-col gap-4 text-[#FAFAFA] overflow-hidden h-full justify-between">
              <div>
                <h4 className="text-lg font-bold text-[#FFF8B9] tracking-wide leading-tight">
                  《달러구트 꿈 백화점》
                </h4>
                <span className="text-[14px] md:text-[15px] text-[#FFF8B9]/70 mt-1 block">
                  부제: 주문하신 꿈은 매진입니다
                </span>
              </div>
              <div className="flex flex-col gap-2 text-[14px] md:text-[15px] border-t border-[#FFF8B9]/10 pt-3 opacity-95 sharp-text">
                <p><strong className="text-[#FFF8B9] font-bold">저자:</strong> 이미예</p>
                <p><strong className="text-[#FFF8B9] font-bold">출판사:</strong> 팩토리나인</p>
                <p><strong className="text-[#FFF8B9] font-bold">출간일:</strong> 2020년 4월 21일</p>
                <p><strong className="text-[#FFF8B9] font-bold">장르:</strong> 판타지 · 힐링 소설</p>
                <p><strong className="text-[#FFF8B9] font-bold">키워드:</strong> 꿈 · 위로 · 성장 · 추억</p>
              </div>
              <div className="border-t border-[#FFF8B9]/10 pt-3 text-[14px] md:text-[15px] leading-relaxed italic sharp-text">
                &ldquo;잠든 사람만 입장할 수 있는 꿈 백화점에서 펼쳐지는 따뜻한 이야기.&rdquo;
              </div>
              {/* 교보문고 바로가기 버튼 */}
              <div className="mt-2">
                <a
                  href="https://product.kyobobook.co.kr/detail/S000001835614"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full bg-[#FFF8B9] hover:bg-[#FFFACA] text-[#031133] font-bold text-xs py-2.5 px-4 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  교보문고 바로가기
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* [하단: 2컬럼 구조 - 작품 리뷰 & 독자 찬사] */}
        <div className="flex flex-col gap-4 w-full mt-32 pb-10">
          {/* 작품 리뷰 소제목 - 좌측 그리드 정렬 */}
          <h3 className="font-gowun text-[#FFF8B9] text-base md:text-lg font-bold border-b border-[#FFF8B9]/20 pb-1 w-fit mb-6">
            작품 리뷰
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {/* [왼쪽 컬럼]: 펀딩 성과 요약 */}
            <div className="w-full">
              <div className="relative font-gowun flex flex-col gap-4 justify-center text-[#FAFAFA] h-full border-l border-white/20 pl-6">
                <img src={encodeURI('/별점.png')} alt="별점" className="w-32 mb-4 object-contain" />
                <h4 className="text-[27px] font-bold text-[#FFF8B9] leading-relaxed">
                  &ldquo;평점 4.8점, 베스트셀러<br />1위로 증명된 따뜻한 이야기&rdquo;
                </h4>
                <p className="text-[17px] md:text-[18px] leading-loose sharp-text">
                  텀블벅 펀딩 1812%에 달성한 작품으로, 따뜻한 위로와 깊은 여운을 선사하며 성인과 청소년 모두에게 사랑받았습니다.
                </p>
              </div>
            </div>

            {/* [오른쪽 컬럼]: 독자들의 찬사 */}
            <div className="flex flex-col gap-4">
              {/* 리뷰 1 */}
              <div className="bg-[#0a1e56]/65 backdrop-blur-md p-4 rounded-xl border border-[#D6C4FF]/10 shadow-lg font-gowun text-[14px] md:text-[15px] leading-relaxed sharp-text overflow-hidden">
                <p>&ldquo;참 따뜻한 이야기의 책입니다. 처음부터 끝까지 마음을 몽글몽글 하게 만들어요. 읽는 내내 위로 받는 느낌이었습니다. 추운 겨울밤에 잘 어울리는 책 이라고 생각이 드네요. -qa*****&rdquo;</p>
              </div>
              {/* 리뷰 2 */}
              <div className="bg-[#0a1e56]/65 backdrop-blur-md p-4 rounded-xl border border-[#D6C4FF]/10 shadow-lg font-gowun text-[14px] md:text-[15px] leading-relaxed sharp-text overflow-hidden">
                <p>&ldquo;해리포터같은 파타지를 좋아하는데.. 만족스럽네요^^ 감동적인 이야기 속에 세상을 사는 지혜를 주네요. 사놓고 미루다가.. 언택트 명절을 맞아 3시간 집중해서 읽었네요... 후속 이야기 나오면 좋겠어요.. -pu******&rdquo;</p>
              </div>
              {/* 리뷰 3 */}
              <div className="bg-[#0a1e56]/65 backdrop-blur-md p-4 rounded-xl border border-[#D6C4FF]/10 shadow-lg font-gowun text-[14px] md:text-[15px] leading-relaxed sharp-text overflow-hidden">
                <p>&ldquo;오랜만에 아주 마음에 드는 세계관을 만났습니다. 다음 권이 꼭 나왔으면 합니다 영화나 드라마나 소재로도 아주 좋을거 같아요 -mi*****&rdquo;</p>
              </div>
            </div>
          </div>
        </div>

        {/* [최하단: 북트레일러 영역] */}
        <div className="flex flex-col gap-6 w-full mt-32 pb-10">
          {/* 북트레일러 소제목 - 좌측 그리드 정렬 */}
          <h3 className="font-gowun text-[#FFF8B9] text-base md:text-lg font-bold border-b border-[#FFF8B9]/20 pb-1 w-fit mb-6">
            북트레일러
          </h3>
          <div className="flex flex-col items-center gap-6 w-full">
            {/* 16:9 비율 비디오 컨테이너 */}
            <div className="w-full aspect-video max-w-2xl relative">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/_c0bZARwvaE?si=MdpCKUKOSI-sOYw_"
                title="달러구트 꿈 백화점 북트레일러"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="relative rounded-xl shadow-2xl border border-[#FFF8B9]/15"
              ></iframe>
            </div>
            <p className="font-gowun text-center text-[14px] md:text-[15px] max-w-xl leading-relaxed whitespace-normal break-keep mt-2 sharp-text">
              《달러구트 꿈 백화점》의 이야기를 시각적·청각적으로 경험할 수 있는 북트레일러입니다. 책 속 신비로운 꿈의 세계를 미리 만나보세요.
            </p>
          </div>
        </div>

        {/* 추가 구매 버튼 */}
        <div className="flex justify-center mt-16">
          <a
            href="https://product.kyobobook.co.kr/detail/S000001835614"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#FFF8B9] hover:bg-[#FFFACA] text-[#031133] font-gowun font-bold text-sm py-3 px-8 rounded-full shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(255,248,185,0.35)]"
          >
            교보문고에서 책 사러가기
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────
// AUTHOR 섹션
// ───────────────────────────────────────────────
function AuthorSection() {
  return (
    <section
      id="author"
      className="w-full min-h-screen relative bg-[#031133] flex flex-col items-center p-8 md:p-16 pt-32 pb-32"
      style={{
        backgroundImage: `url('${encodeURI('/Author_배경.png')}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* 타이틀 */}
      <div className="text-center z-10 mb-16 relative w-full flex flex-col items-center gap-3">
        {/* 타이틀 뒷배경 몽환적인 조명 광채 (선명도를 위해 조절) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-[#FFF8B9]/10 to-[#D6C4FF]/10 rounded-full blur-2xl pointer-events-none -z-10" />
        <h2 className="font-glegoo text-[#FFF8B9] text-3xl md:text-4xl tracking-widest lowercase select-none">
          Author
        </h2>
        <div className="h-[1.5px] w-24 md:w-32 bg-gradient-to-r from-transparent via-[#FFF8B9]/60 to-transparent mx-auto mb-10" />
      </div>

      <div className="w-full max-w-6xl mx-auto flex flex-col relative z-10 gap-24">

        {/* 1. 작가 소개 영역 (3단 그리드 구조) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch w-full">
          {/* [1단 (좌측)]: 기존의 작가 프로필 사진 */}
          <div className="w-full max-w-[260px] mx-auto lg:mx-0 lg:translate-x-12">
            <div className="relative flex flex-col items-center justify-center gap-5 w-full h-full p-6 text-center">
              <div className="relative group">
                <div className="w-[176px] h-[242px] overflow-hidden bg-[#031133]/40 shadow-2xl transition-all duration-500 ease-out transform group-hover:scale-[1.03] rounded-xl">
                  <ImagePlaceholder
                    alt="이미예 작가.png"
                    width="100%"
                    height="100%"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="text-center font-gowun">
                <h3 className="text-[#FFF8B9] text-2xl font-bold tracking-wide">이미예 작가</h3>
                <span className="block text-[10px] text-[#FAFAFA]/60 tracking-widest font-glegoo mt-1">Lee Mi Ye</span>
              </div>
            </div>
          </div>

          {/* [2단 (중앙)]: 기존의 이미예 작가 소개 글 */}
          <div className="flex-grow border-l border-white/20 pl-6 flex flex-col justify-center">
            <div className="relative font-gowun flex flex-col gap-6 text-[#FAFAFA] items-start w-full">
              <div className="flex flex-col gap-2.5 text-[14px] md:text-[15px] font-gowun leading-relaxed select-text text-[#FAFAFA] sharp-text">
                <p className="font-bold text-[#FFF8B9] text-base md:text-lg mb-2">이미예 작가</p>
                <p>출생: 1990년</p>
                <p>출생지: 부산광역시</p>
                <p>국적: 대한민국</p>
                <p>학력: 부산대학교 공과대학(재료공학부 / 학사)</p>
                <p>직업: 소설가, 반도체 엔지니어</p>
                <p>대표작: 달러구트 꿈 백화점</p>
              </div>
              <div className="border-t border-[#FFF8B9]/10 pt-4 w-fit">
                <p className="text-[14px] md:text-[15px] text-[#FFFDF0] leading-relaxed font-gowun sharp-text">
                  &ldquo;작가로서의 목표는 쉽게 읽히고 장점이 또렷한<br />책을 꾸준히 만드는 거다.&rdquo; <span className="text-[12px] md:text-[13px] text-[#FFFDF0]/70">주간동아 인터뷰 중</span>
                </p>
              </div>
            </div>
          </div>

          {/* [3단 (우측)]: 신규 추가할 '여담' 카드 영역 */}
          <div className="flex-grow border-l border-white/20 pl-6 flex flex-col justify-start w-full">
            <h3 className="font-gowun text-base md:text-lg font-bold text-[#FFF8B9] border-b border-[#FFF8B9]/20 pb-2 w-fit mb-6">
              여담
            </h3>
            <p className="font-gowun text-[14px] md:text-[15px] leading-loose whitespace-normal break-keep select-text text-[#FFF8B9]/80 sharp-text">
              평소 잠을 자면 기억에 남는 꿈을 자주 꾸는 편이라는 작가는, “좋아하는 것은 8시간 푹 자고 일하기, 싫어하는 것은 잠도 못 자고 밤새워 일하기”라고 말하며 꿈과 잠에 대한 자신의 관심을 보여주었습니다. 이러한 경험과 상상력이 더해져 많은 사람들에게 따뜻한 위로를 전하는 《달러구트 꿈 백화점》이 탄생했습니다.
            </p>
          </div>
        </div>

        {/* 2. 후속작 영역 */}
        <div className="flex flex-col gap-6 mt-32 pb-10">
          <h3 className="font-gowun text-base md:text-lg font-bold text-[#FFF8B9] border-b border-[#FFF8B9]/20 pb-2 w-fit mb-10">
            후속작
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 좌측 컬럼 - 달러구트 꿈 백화점 2 */}
            <div className="w-full">
              <div className="relative bg-[#0a1e56]/65 backdrop-blur-md p-6 rounded-2xl border border-[#FFF8B9]/15 shadow-2xl flex flex-col sm:flex-row gap-5 items-start h-full overflow-hidden">
                <img
                  src="/달러구트2.jpeg"
                  alt="달러구트 꿈 백화점 2 책 표지"
                  className="w-[90px] md:w-[105px] h-auto rounded-lg shadow-lg border border-[#FFF8B9]/10 object-contain mx-auto sm:mx-0 flex-shrink-0 transition-transform duration-300 hover:scale-[1.02]"
                />
                <div className="flex-grow flex flex-col justify-between font-gowun text-[#FAFAFA] min-h-[160px] h-full">
                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm md:text-base font-bold text-[#FFF8B9] tracking-wide">달러구트 꿈 백화점 2</h4>
                    <p className="text-[14px] md:text-[15px] leading-loose text-[#FAFAFA]/95 whitespace-normal break-keep select-text sharp-text">
                      페니는 달러구트 꿈 백화점에서 일하며 다양한 업무에 익숙해진다. 이후 컴퍼니 구역의 민원관리국에서 일하게 된다. 페니는 “꿈을 뺏어간다”는 민원을 남긴 792번 손님의 문제를 맡는다. 과연 페니는 단골손님의 마음을 이해하고 다시 돌아오게 할 수 있을까?
                    </p>
                  </div>
                  <div className="mt-4">
                    <a
                      href="https://product.kyobobook.co.kr/detail/S000001835707"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 bg-[#FFF8B9] hover:bg-[#FFFACA] text-[#031133] font-bold text-[11px] py-1.5 px-4 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      바로가기
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 우측 컬럼 - 탕비실 */}
            <div className="w-full">
              <div className="relative bg-[#0a1e56]/65 backdrop-blur-md p-6 rounded-2xl border border-[#FFF8B9]/15 shadow-2xl flex flex-col sm:flex-row gap-5 items-start h-full overflow-hidden">
                <img
                  src="/탕비실.jpg"
                  alt="탕비실 책 표지"
                  className="w-[90px] md:w-[105px] h-auto rounded-lg shadow-lg border border-[#FFF8B9]/10 object-contain mx-auto sm:mx-0 flex-shrink-0 transition-transform duration-300 hover:scale-[1.02]"
                />
                <div className="flex-grow flex flex-col justify-between font-gowun text-[#FAFAFA] min-h-[160px] h-full">
                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm md:text-base font-bold text-[#FFF8B9] tracking-wide">탕비실</h4>
                    <p className="text-[14px] md:text-[15px] leading-loose text-[#FAFAFA]/95 whitespace-normal break-keep select-text sharp-text">
                      여러 직장에서 ‘탕비실 빌런’으로 꼽힌 사람들을 한데 모은 7일간의 리얼리티 쇼를 배경으로 한 이 작품은 쇼의 재미는 물론 인간 심리를 깊이 있게 분석해 두 마리 토끼를 잡았다. 작가는 일상 속 작은 공간에서 일어나는 일들을 출연자들의 행동과 심경 변화로 생생하게 그려내며, 독자들에게 공감, 재미와 기묘한 불쾌함 등 다양한 감정을 선사한다.
                    </p>
                  </div>
                  <div className="mt-4">
                    <a
                      href="https://product.kyobobook.co.kr/detail/S000213641247"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 bg-[#FFF8B9] hover:bg-[#FFFACA] text-[#031133] font-bold text-[11px] py-1.5 px-4 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      바로가기
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. 작가 인터뷰 영역 */}
        <div className="flex flex-col gap-6 mt-32 pb-10">
          <h3 className="font-gowun text-base md:text-lg font-bold text-[#FFF8B9] border-b border-[#FFF8B9]/20 pb-2 w-fit mb-10">
            작가 인터뷰
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* 좌측 컬럼 - 소개글 */}
            <div className="w-full">
              <div className="relative font-gowun text-[#FAFAFA] flex flex-col justify-center h-full border-l border-white/20 pl-6 gap-5">
                <div className="flex flex-col gap-2">
                  <p className="text-[19px] md:text-[20px] font-bold text-[#FAFAFA]">
                    Q. 공대 전공에도 불구하고 작가의 길을 간 이유는?
                  </p>
                  <p className="text-[21px] md:text-[23px] font-semibold text-[#FFF8B9] leading-relaxed">
                    &ldquo;나이가 들어서 시작해도 늦지않는<br />
                    유일한 직업, 그래서 계속 품고 살 수 있었어요&rdquo;
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-white/50 font-sans block select-none">
                    - 스토리움 인터뷰 中 -
                  </span>
                  <p className="text-[14px] md:text-[15px] leading-relaxed whitespace-normal break-keep select-text font-gowun text-[#FFFDF0]/80 sharp-text">
                    소설 《달러구트 꿈 백화점》의 이미예 작가님 인터뷰입니다. 유튜버 스토리움이 작가가 된 계기부터 출판 과정, 작품 속 꿈의 영감까지 다양한 질문을 통해 이미예 작가님의 이야기를 담았습니다.
                  </p>
                </div>
              </div>
            </div>

            {/* 우측 컬럼 - 인터뷰 영상 */}
            <div className="w-full aspect-video relative">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/pNOTZ-YXewE"
                title="이미예 작가 인터뷰 영상"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="relative rounded-xl shadow-2xl border border-[#FFF8B9]/15 w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// ───────────────────────────────────────────────
// STORY 섹션
// ───────────────────────────────────────────────
function StorySection() {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const chapters = [
    {
      id: 1,
      chapter: 1,
      title: '가게 대성황의 날',
      content: '취업을 준비하던 페니는 꿈의 직장이라 불리는 달러구트 꿈 백화점에 입사하고 싶어 한다. 카페에서 공부하던 중 아쌈을 만나 면접에서는 특별한 질문을 한다는 이야기를 듣고, <시간의 신과 세 제자 이야기>라는 동화책을 받게 된다. 이야기 속 시간의 신은 세 제자에게 각각 미래, 과거, 잠자는 시간을 유산으로 남긴다. 미래만을 좇던 첫째와 과거에 머문 둘째는 중요한 것을 잃게 되고, 신은 현재를 통해 그들이 꿈속에서 추억과 실수를 돌아보며 성장할 수 있도록 한다. 면접에서 달러구트는 페니에게 꿈에 대한 생각을 묻는다. 페니는 꿈은 사람들의 내일을 만들어 주지만 삶 자체를 대신해서는 안 된다고 말하고, 달러구트는 그녀의 생각을 인정하며 입사를 허락한다.'
    },
    {
      id: 2,
      chapter: 2,
      title: '한밤의 연애지침서',
      content: '꿈 백화점의 각 층은 서로 다른 꿈을 판매한다. 1층은 귀하거나 예약된 꿈, 2층은 일상적인 꿈, 3층은 특별하고 활동적인 꿈, 4층은 짧고 편안한 꿈을 주로 다룬다. 5층에는 유통기한이 얼마 남지 않은 꿈들이 모여 있다. 견학 중 페니는 위고 아주머니와 달러구트의 부탁으로 프런트에서 일하게 된다. 꿈값은 잠에서 깨어난 뒤 느낀 감정으로 지불하는 후불제이며, 그 감정은 모여 화폐처럼 사용된다. 일을 시작한 페니는 은행에서 ‘설렘’ 감정을 도둑맞는 사건을 겪는다. 한편 반복되는 일상에 지친 아영은 꿈속에서 좋아하는 사람이 등장하는 꿈을 꾸게 된다. 페니는 꿈이 현실의 사랑으로 이어질 수 있을지 걱정하지만, 달러구트는 꿈이 사람의 마음을 변화시키는 계기가 될 수 있다고 말한다. 이후 한 손님은 꿈에서 느낀 설렘을 통해 새로운 관계를 시작하게 된다.'
    },
    {
      id: 3,
      chapter: 3,
      title: '예지몽',
      content: '꿈 백화점은 예지몽을 준비하기 위해 내부를 꾸미고 있었다. 태몽을 만드는 아가냅 코코가 꿈의 자투리인 예지몽을 판매하기 위해 방문했기 때문이다. 예지몽이 들어왔다는 소식에 많은 손님이 몰리지만, 달러구트는 꼭 필요한 사람에게만 꿈을 판매한다. 영화관에서 일하며 사람들의 이야기를 수집하는 시나리오 작가 지망생 나림은 새로운 소재를 찾던 중 꿈 백화점을 방문한다. 달러구트에게 예지몽을 받은 나림은 잠에서 깬 뒤 꿈속 경험을 떠올리고, 이를 바탕으로 새로운 시나리오를 완성한다.'
    },
    {
      id: 4,
      chapter: 4,
      title: '트라우마 환불요청',
      content: '꿈 백화점에는 악몽 제작자 막심과 달러구트가 계약했다는 소문이 퍼지며 불안감이 커진다. 직원들은 악몽으로 인해 손님이 줄어들 것을 걱정한다. 한 남자는 재입대와 관련된 악몽을, 한 여자는 시험에 대한 불안이 담긴 악몽을 꾸게 된다. 이후 악몽을 꾼 손님들이 백화점에 찾아와 항의하지만, 달러구트는 악몽이 단순한 고통이 아니라 자신이 가진 두려움과 마주하기 위한 과정이라고 설명한다. 일부 손님은 꿈을 환불하지만, 다른 손님들은 악몽을 통해 자신의 한계를 깨닫고 앞으로 나아갈 힘을 얻는다. 결국 꿈값이 지불되고, 달러구트는 페니와 함께 막심에게 대금을 전달하러 간다.'
    },
    {
      id: 5,
      chapter: 5,
      title: '꿈 제작자 정기총회',
      content: '달러구트와 페니는 꿈 제작자들의 정기총회에 참석하기 위해 만년설산으로 향한다. 그곳에서 크리스마스 꿈을 만드는 유명한 꿈 제작자 니콜라스를 만나고, 여러 전설적인 제작자들과 함께 회의에 참여한다. 이번 총회의 주요 안건은 꿈을 예약했지만 나타나지 않아 꿈값을 받지 못하는 ‘노쇼’ 문제였다. 제작자들은 해결 방법을 논의하지만 쉽게 결론을 내리지 못한다. 이에 달러구트는 단순히 보상을 요구하기보다 사람들이 꼭 꾸고 싶어지는 의미 있는 꿈을 만드는 것이 중요하다고 말한다.'
    },
    {
      id: 6,
      chapter: 6,
      title: '이달의 베스트셀러',
      content: '12월의 꿈 백화점은 크리스마스와 연말 시상식 준비로 활기를 띤다. 아이들은 니콜라스의 꿈을 찾기 위해 몰려오고, 직원들은 한 해를 마무리하는 시상식을 기다린다. 올해 베스트셀러 상은 15년 연속 수상하던 니콜라스가 아닌 동물의 꿈을 만드는 애니모라 반쵸가 차지한다. 반쵸의 꿈을 꾸는 늙은 개 레오는 꿈속에서 가족과 함께 산책하며 행복한 시간을 보내고, 잠에서 깬 순간 눈앞에 있는 가족들을 마주한다. 이어진 연말 시상식의 최고상인 그랑프리는 킥 슬럼버의 ‘독수리가 되어 날아가는 꿈’이 수상한다. 직원들은 결과를 맞히며 즐거운 분위기 속에서 한 해를 마무리한다.'
    },
    {
      id: 7,
      chapter: 7,
      title: 'Yesterday와 벤젠고리',
      content: '가수가 되기 위해 노력하는 29살의 남자는 원하는 결과를 얻지 못한 채 계속 작업을 이어가고 있었다. 새로운 영감을 찾던 그는 자료를 찾다 잠들어 꿈 백화점에 도착한다. 남자는 영감을 얻는 꿈을 원했지만 그런 상품은 없었다. 달러구트는 그의 이야기를 듣고 숙면 캔디를 건네고 그를 돌려보낸다. 잠에서 깬 남자는 스스로 새로운 악상을 떠올려 곡을 완성한다. 다시 백화점을 찾은 남자에게 달러구트는 영감은 자신이 준 것이 아니라 스스로 찾아낸 것이라고 말한다. 그리고 그의 삶 자체를 꿈으로 만들고 싶다며 꿈 제작자가 될 것을 제안한다.'
    },
    {
      id: 8,
      chapter: 8,
      title: '체험판 출시: 타인의 삶',
      content: '페니는 달러구트의 부탁으로 꿈 제작자 오트라를 찾아간다. 오트라는 다른 사람과 자신의 삶을 비교하는 사람들을 위한 새로운 꿈 ‘타인의 삶’을 만들어 페니에게 전달한다. 한 남자는 안정적이지만 반복되는 자신의 삶에 지루함을 느끼던 중 꿈 백화점을 방문한다. 그는 오트라의 꿈을 통해 성공한 가수의 삶을 잠시 경험하고, 다른 사람의 삶을 바라보며 자신이 원하는 삶에 대해 생각하게 된다. 페니 역시 남의 삶과 자신을 비교했던 모습을 돌아보게 된다. 이에 달러구트는 자신의 삶을 사랑하는 방법은 더 나은 삶을 위해 노력하거나, 현재의 자신을 있는 그대로 받아르는 두 가지 방법이 있다고 말한다.'
    },
    {
      id: 9,
      chapter: 9,
      title: '익명의 손님께서 당신에게 보낸 꿈',
      content: '달러구트의 부탁으로 페니는 예약 꿈을 신청하는 손님들의 이야기를 기록하게 된다. 한 중년 여성은 가족들에게 남길 꿈을 예약하기 위해 백화점을 찾아온다. 예약된 꿈은 정해진 날짜에 수신자에게 전달되며, 페니가 처음 백화점을 방문했을 때 보았던 수많은 상자들도 모두 이러한 꿈들이었다. 한 남자는 카페에서 어린 시절 자신을 돌봐준 할머니와의 추억이 담긴 카라멜마키아토를 떠올린다. 이후 자신에게 도착한 예약 꿈 속에서 그는 할머니와 다시 만나 이야기를 나누고, 이것이 꿈이라는 사실을 깨닫고 눈물을 흘린다.'
    }
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll, { passive: true });
      // Initial check
      handleScroll();
      window.addEventListener('resize', handleScroll);
    }
    return () => {
      if (el) el.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const firstCard = scrollRef.current.firstElementChild as HTMLElement;
      const cardWidth = firstCard?.clientWidth || 400;
      const offset = direction === 'left' ? -(cardWidth + 24) : (cardWidth + 24);
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="story"
      className="w-full min-h-screen relative bg-[#031133] flex flex-col items-center justify-between p-8 md:p-16 pt-32 pb-32"
      style={{
        backgroundImage: `url('${encodeURI('/Story_배경.png')}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="w-full max-w-6xl flex flex-col items-center mt-4 z-10">
        {/* 타이틀 */}
        <div className="text-center relative w-full flex flex-col items-center gap-3 py-4 mb-16">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-[#FFF8B9]/10 to-[#D6C4FF]/10 rounded-full blur-2xl pointer-events-none -z-10" />
          <h2 className="font-glegoo text-[#FFF8B9] text-3xl md:text-4xl tracking-widest lowercase select-none">
            story
          </h2>
          <div className="h-[1.5px] w-24 md:w-32 bg-gradient-to-r from-transparent via-[#FFF8B9]/60 to-transparent mx-auto mb-10" />
        </div>

        {/* 1.5 전체 줄거리 요약 문단 */}
        <div className="w-full max-w-5xl px-6 md:px-12 mx-auto flex flex-col gap-5 text-center py-4 relative z-10">
          <div className="flex flex-col gap-5 font-gowun text-[#FAFAFA]/90 text-[15px] md:text-[16px] leading-loose select-text sharp-text whitespace-normal break-keep max-w-4xl mx-auto">
            <p>
              {"잠든 사람들만 방문할 수 있는 신비로운 도시에는 특별한 백화점이 있습니다. 바로 달러구트 꿈 백화점입니다. 이곳에서는 평범한 꿈부터 아름다운 꿈, 미래를 엿보는 특별한 꿈까지 다양한 꿈을 판매합니다. 주인공 ‘페니’는 꿈을 파는 백화점에 신입사원으로 들어가 사장 ‘달러구트’와 함께 일하며 이곳의 비밀을 알아갑니다. 손님들은 자신에게 필요한 꿈을 고르고, 꿈에서 느낀 감정은 나중에 후불로 지불하는 특별한 방식으로 운영됩니다."}
            </p>
            <p>
              {"백화점에는 새로운 삶을 꿈꾸는 사람, 위로가 필요한 사람, 자신의 마음을 돌아보고 싶은 사람 등 다양한 손님들이 찾아옵니다. 페니는 그들의 이야기를 통해 꿈이 단순한 상상이 아니라 사람들에게 용기와 위로를 주는 소중한 존재라는 것을 깨닫게 됩니다. 《달러구트 꿈 백화점》은 신비로운 꿈의 세계 속에서 다양한 사람들의 이야기를 보여주며, 지친 마음을 따뜻하게 위로해주는 판타지 소설입니다. 읽는 동안 “나에게 필요한 꿈은 무엇일까?”라는 생각을 하게 만드는 작품입니다."}
            </p>
          </div>
        </div>

        {/* 1. 인상 깊은 구절 */}
        <div className="w-full flex flex-col items-center gap-4 mt-32 pb-10">
          <div
            className="w-full max-w-[620px] aspect-[749/381] flex items-center justify-center px-12 sm:px-16 md:px-20 text-center select-text transition-all duration-300"
            style={{
              backgroundImage: `url('${encodeURI('/구름.png')}')`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <p className="font-gowun text-[12px] sm:text-[16px] md:text-[19px] lg:text-[21px] font-semibold leading-relaxed text-[#0a1835] whitespace-normal break-keep pt-3">
              {"네가 생각하는 대단한 미래는 여기에 없단다."}
              <br />
              {"즐거운 현재 오늘밤의 꿈들이 있을 뿐이지. -122p-"}
            </p>
          </div>
        </div>

        {/* 2. 미리보기 가로 슬라이더 */}
        <div className="w-full flex flex-col gap-6 relative mt-32 pb-10">
          <div className="flex justify-between items-end border-b border-[#FFF8B9]/20 pb-1.5 mb-10">
            <h3 className="font-gowun text-[19px] md:text-[21px] font-bold text-[#FFF8B9] w-fit">
              미리보기
            </h3>
            {/* 좌우 화살표 */}
            <div className="flex gap-2">
              <button
                onClick={() => scroll('left')}
                disabled={!showLeftArrow}
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${showLeftArrow
                  ? 'border-[#FFF8B9] text-[#FFF8B9] hover:bg-[#FFF8B9]/10 active:scale-95 cursor-pointer'
                  : 'border-[#FFF8B9]/20 text-[#FFF8B9]/20 cursor-not-allowed'
                  }`}
                aria-label="이전 챕터 보기"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!showRightArrow}
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${showRightArrow
                  ? 'border-[#FFF8B9] text-[#FFF8B9] hover:bg-[#FFF8B9]/10 active:scale-95 cursor-pointer'
                  : 'border-[#FFF8B9]/20 text-[#FFF8B9]/20 cursor-not-allowed'
                  }`}
                aria-label="다음 챕터 보기"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* 슬라이더 카드 컨테이너 */}
          <div
            ref={scrollRef}
            className="w-full flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 scroll-smooth no-scrollbar"
            style={{
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {chapters.map((ch) => (
              <div
                key={ch.id}
                className="w-[320px] sm:w-[380px] md:w-[420px] flex-shrink-0 snap-center"
              >
                <div className="bg-[#0a1e56]/65 backdrop-blur-md p-6 rounded-2xl border border-[#FFF8B9]/15 shadow-2xl font-gowun flex flex-col gap-4 text-[#FAFAFA] h-[400px] justify-between overflow-hidden">
                  <div className="flex flex-col gap-3">
                    {/* 챕터 배지 및 타이틀 */}
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 flex items-center justify-center bg-[#FFF8B9] text-[#031133] rounded-full text-[15px] font-bold font-glegoo flex-shrink-0 select-none">
                        {ch.chapter}
                      </span>
                      <h4 className="text-[17px] md:text-[19px] font-bold text-[#FFF8B9] tracking-wide truncate">
                        {ch.title}
                      </h4>
                    </div>
                    {/* 챕터 줄거리 설명 */}
                    <div className="h-[270px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#FFF8B9]/10 scrollbar-track-transparent">
                      <p className="text-[14px] md:text-[15px] leading-relaxed text-[#FAFAFA]/95 whitespace-normal break-keep select-text sharp-text">
                        {ch.content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────
// CHARACTER 섹션
// ───────────────────────────────────────────────
function CharacterSection() {
  const staffFiltered = characterData.filter((c) => c.role === 'staff' && c.id !== 'dallergut');
  const maker = characterData.filter((c) => c.role === 'maker');
  const noctiluca = characterData.filter((c) => c.role === 'noctiluca');

  const categories = [
    { title: '직원', items: staffFiltered },
    { title: '꿈 제작자', items: maker },
    { title: '녹틸루카', items: noctiluca },
  ];

  return (
    <section
      id="character"
      className="w-full min-h-screen relative overflow-hidden bg-[#031133] flex flex-col justify-between p-6 md:p-12 pt-32 pb-32"
      style={{
        backgroundImage: `url('${encodeURI('/character_배경.png')}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* 상단 타이틀 */}
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-2 mt-4 mb-16 relative z-10">
        <div className="text-center relative py-4 flex flex-col items-center gap-3">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-[#FFF8B9]/15 to-[#D6C4FF]/15 rounded-full blur-3xl pointer-events-none -z-10" />
          <h2 className="font-glegoo text-[#FFF8B9] text-3xl md:text-4xl tracking-widest lowercase select-none">
            Character
          </h2>
          <div className="h-[1.5px] w-24 md:w-32 bg-gradient-to-r from-transparent via-[#FFF8B9]/60 to-transparent mx-auto mb-10" />
        </div>
        <div className="text-right">
          <span className="font-gowun text-[#F5F5F5]/70 text-[14px] md:text-[15px] italic tracking-wide select-none">
            * 각 캐릭터의 상상도입니다.
          </span>
        </div>
      </div>

      {/* 1. 주인공 영역 (페니 & 달러구트 2컬럼 배치) */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 py-6 px-4">
        {/* 주인공 1: 페니 */}
        <div className="relative group bg-[#0a1e56]/65 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-[#FFF8B9]/15 shadow-2xl flex flex-col sm:flex-row gap-6 items-center sm:items-stretch overflow-hidden">
          {/* 아치형 창문틀 이미지 프레임 */}
          <div
            className="w-[150px] h-[210px] sm:w-[160px] sm:h-[220px] overflow-hidden border-[4px] border-[#D9D9D9] bg-[#031133]/40 shadow-2xl transition-all duration-500 ease-out transform group-hover:scale-[1.03] group-hover:border-[#FFF8B9] flex-shrink-0"
            style={{ borderRadius: '200px 200px 0 0' }}
          >
            <img
              src={encodeURI('/페니.png')}
              alt="페니"
              className="object-cover w-full h-full"
              style={{ borderRadius: '194px 194px 0 0' }}
            />
          </div>
          {/* 캐릭터 상세설명 */}
          <div className="flex-grow flex flex-col justify-between gap-3 text-left font-gowun text-[#FAFAFA]">
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline gap-2 border-b border-[#FFF8B9]/15 pb-1.5">
                <h3 className="text-[#FFF8B9] text-xl sm:text-2xl font-bold tracking-wide">페니</h3>
                <span className="text-[12px] sm:text-sm text-[#FAFAFA]/60 tracking-wider font-glegoo">Penny</span>
              </div>
              <div className="text-[10px] sm:text-[11px] text-[#FFF8B9] font-semibold tracking-wide">
                KEYWORD: 신입 직원 &middot; 성장 &middot; 공감 &middot; 성실함 &middot; 도전
              </div>
              <p className="text-[14px] sm:text-[15px] leading-loose text-[#FAFAFA]/95 whitespace-normal break-keep select-text sharp-text">
                {'달러구트 꿈 백화점 신입사원 / 곱슬단발머리 / 웨더 아주머니와 함께 1층 프런트를 담당함. 페니는 달러구트 꿈 백화점에 입사한 신입 직원으로, 밝고 성실한 성격을 가진 인물이다. 처음에는 실수도 많지만 다양한 손님과 사건을 겪으며 점점 성장한다. 꿈을 사고파는 일을 통해 사람들의 마음을 이해하게 되고, 따뜻한 시선으로 문제를 해결하려 노력한다.'}
              </p>
            </div>
          </div>
        </div>

        {/* 주인공 2: 달러구트 */}
        <div className="relative group bg-[#0a1e56]/65 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-[#FFF8B9]/15 shadow-2xl flex flex-col sm:flex-row gap-6 items-center sm:items-stretch overflow-hidden">
          {/* 아치형 창문틀 이미지 프레임 */}
          <div
            className="w-[150px] h-[210px] sm:w-[160px] sm:h-[220px] overflow-hidden border-[4px] border-[#D9D9D9] bg-[#031133]/40 shadow-2xl transition-all duration-500 ease-out transform group-hover:scale-[1.03] group-hover:border-[#FFF8B9] flex-shrink-0"
            style={{ borderRadius: '200px 200px 0 0' }}
          >
            <img
              src={encodeURI('/달러구트.png')}
              alt="달러구트"
              className="object-cover w-full h-full"
              style={{ borderRadius: '194px 194px 0 0' }}
            />
          </div>
          {/* 캐릭터 상세설명 */}
          <div className="flex-grow flex flex-col justify-between gap-3 text-left font-gowun text-[#FAFAFA]">
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline gap-2 border-b border-[#FFF8B9]/15 pb-1.5">
                <h3 className="text-[#FFF8B9] text-xl sm:text-2xl font-bold tracking-wide">달러구트</h3>
                <span className="text-[12px] sm:text-sm text-[#FAFAFA]/60 tracking-wider font-glegoo">DallerGut</span>
              </div>
              <div className="text-[10px] sm:text-[11px] text-[#FFF8B9] font-semibold tracking-wide">
                KEYWORD: 백화점 주인 &middot; 리더 &middot; 지혜 &middot; 배려 &middot; 신뢰
              </div>
              <p className="text-[14px] sm:text-[15px] leading-loose text-[#FAFAFA]/95 whitespace-normal break-keep select-text sharp-text">
                {'달러구트 꿈 백화점의 사장 / 잠든시간을 다스리는 “시간 신의 3번째 제자" 후손 - 키가 크고 말랐지만 기품있음. 달러구트는 꿈을 백화점을 운영하는 주인이다. 차분하고 여유로운 성격으로 직원들을 이끌며, 손님들에게 필요한 꿈을 제공하는 것을 중요하게 생각한다. 뛰어난 통찰력과 따뜻한 배려로 백화점의 중심 역할을 하는 인물이다.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 달러구트 꿈 백화점 직원 영역 */}
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 relative z-10 py-6 px-4 mt-32 pb-10">
        <h3 className="font-gowun text-lg sm:text-xl font-bold text-[#FFF8B9] border-b border-[#FFF8B9]/20 pb-2 w-fit mb-10">
          달러구트 꿈 백화점 직원
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 직원 1: 웨더 */}
          <div className="relative bg-[#0a1e56]/65 backdrop-blur-md p-6 rounded-2xl border border-[#FFF8B9]/15 shadow-2xl flex flex-col gap-3 font-gowun text-[#FAFAFA] overflow-hidden">
            <div className="flex items-baseline gap-2 border-b border-[#FFF8B9]/15 pb-1.5">
              <h4 className="text-[#FFF8B9] text-base sm:text-lg font-bold tracking-wide">웨더</h4>
            </div>
            <div className="text-[10px] sm:text-[11px] text-[#FFF8B9] font-semibold tracking-wide">
              [키워드: 1층 프런트 관리자 &middot; 책임감 &middot; 완벽주의 &middot; 냉철함]
            </div>
            <p className="text-[14px] sm:text-[15px] leading-loose text-[#FAFAFA]/95 whitespace-normal break-keep select-text sharp-text">
              {'웨더는 꿈 백화점의 직원으로, 업무를 꼼꼼하게 처리하며 책임감이 강한 인물이다. 때로는 냉정해 보이지만 백화점과 동료들을 생각하는 마음이 깊다.'}
            </p>
          </div>

          {/* 직원 2: 비고 마이어스 */}
          <div className="relative bg-[#0a1e56]/65 backdrop-blur-md p-6 rounded-2xl border border-[#FFF8B9]/15 shadow-2xl flex flex-col gap-3 font-gowun text-[#FAFAFA] overflow-hidden">
            <div className="flex items-baseline gap-2 border-b border-[#FFF8B9]/15 pb-1.5">
              <h4 className="text-[#FFF8B9] text-base sm:text-lg font-bold tracking-wide">비고 마이어스</h4>
            </div>
            <div className="text-[10px] sm:text-[11px] text-[#FFF8B9] font-semibold tracking-wide">
              [키워드: 회계 &middot; 현실적 &middot; 원칙주의 &middot; 꼼꼼함]
            </div>
            <p className="text-[14px] sm:text-[15px] leading-loose text-[#FAFAFA]/95 whitespace-normal break-keep select-text sharp-text">
              {'비고 마이어스는 꿈 백화점의 2층의 매니저이다. 숫자와 원칙을 중요하게 여기며 냉철한 판단력을 가진 인물이다. 하지만 속으로는 백화점과 사람들을 아끼는 따뜻한 마음을 가지고 있다.'}
            </p>
          </div>

          {/* 직원 3: 모그베리 */}
          <div className="relative bg-[#0a1e56]/65 backdrop-blur-md p-6 rounded-2xl border border-[#FFF8B9]/15 shadow-2xl flex flex-col gap-3 font-gowun text-[#FAFAFA] overflow-hidden">
            <div className="flex items-baseline gap-2 border-b border-[#FFF8B9]/15 pb-1.5">
              <h4 className="text-[#FFF8B9] text-base sm:text-lg font-bold tracking-wide">모그베리</h4>
            </div>
            <div className="text-[10px] sm:text-[11px] text-[#FFF8B9] font-semibold tracking-wide">
              [키워드: 감정 &middot; 활발함 &middot; 공감]
            </div>
            <p className="text-[14px] sm:text-[15px] leading-loose text-[#FAFAFA]/95 whitespace-normal break-keep select-text sharp-text">
              {'모그베리는 sf와 히어로물을 판매하는 꿈 백화점 3층의 매니저이다. 사람들의 마음을 이해하는 능력이 뛰어나며, 따뜻하고 쾌활한 성격을 갖고있다.'}
            </p>
          </div>

          {/* 직원 4: 스피도 */}
          <div className="relative bg-[#0a1e56]/65 backdrop-blur-md p-6 rounded-2xl border border-[#FFF8B9]/15 shadow-2xl flex flex-col gap-3 font-gowun text-[#FAFAFA] overflow-hidden">
            <div className="flex items-baseline gap-2 border-b border-[#FFF8B9]/15 pb-1.5">
              <h4 className="text-[#FFF8B9] text-base sm:text-lg font-bold tracking-wide">스피도</h4>
            </div>
            <div className="text-[10px] sm:text-[11px] text-[#FFF8B9] font-semibold tracking-wide">
              [키워드: 빠른 업무 처리 &middot; 활발함 &middot; 재치 &middot; 에너지]
            </div>
            <p className="text-[14px] sm:text-[15px] leading-loose text-[#FAFAFA]/95 whitespace-normal break-keep select-text sharp-text">
              {'스피도는 낮잠용 꿈을 파는 4층의 매니저 이다. 이름처럼 빠르고 능숙하게 일을 처리하는 직원이다. 밝고 활발하지만 성급한 성격으로 가끔 백화점의 분위기를 싸하게 만들곤한다.'}
            </p>
          </div>

          {/* 직원 5: 모태일 */}
          <div className="relative bg-[#0a1e56]/65 backdrop-blur-md p-6 rounded-2xl border border-[#FFF8B9]/15 shadow-2xl flex flex-col gap-3 font-gowun text-[#FAFAFA] overflow-hidden">
            <div className="flex items-baseline gap-2 border-b border-[#FFF8B9]/15 pb-1.5">
              <h4 className="text-[#FFF8B9] text-base sm:text-lg font-bold tracking-wide">모태일</h4>
            </div>
            <div className="text-[10px] sm:text-[11px] text-[#FFF8B9] font-semibold tracking-wide">
              [키워드: 5층 &middot; 손님 응대 &middot; 친절함 &middot; 책임감]
            </div>
            <p className="text-[14px] sm:text-[15px] leading-loose text-[#FAFAFA]/95 whitespace-normal break-keep select-text sharp-text">
              {'모태일은 백화점 5층 상설 할인 매장에서 손님들을 직접 맞이하는 역할을 한다. 북적한 매장에서 우렁찬 목소리로 손님을 응대한다.'}
            </p>
          </div>
        </div>
      </div>

      {/* 3. 꿈 제작자 영역 */}
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 relative z-10 py-6 px-4 mt-32 pb-10">
        <h3 className="font-gowun text-lg sm:text-xl font-bold text-[#FFF8B9] border-b border-[#FFF8B9]/20 pb-2 w-fit mb-10">
          꿈 제작자
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 제작자 1: 킥 슬럼버 */}
          <div className="relative bg-[#0a1e56]/45 backdrop-blur-md p-5 rounded-xl border border-[#D6C4FF]/10 shadow-md flex flex-col gap-1.5 font-gowun text-[#FAFAFA] overflow-hidden">
            <h4 className="text-[#FFF8B9] text-sm sm:text-base font-bold tracking-wide border-b border-[#FFF8B9]/15 pb-1">킥 슬럼버</h4>
            <div className="text-[10px] sm:text-[11px] text-[#FFF8B9]/90 font-medium tracking-wide">
              [키워드: 동물 꿈 &middot; 유쾌함 &middot; 상상력]
            </div>
          </div>

          {/* 제작자 2: 와와 슬립랜드 */}
          <div className="relative bg-[#0a1e56]/45 backdrop-blur-md p-5 rounded-xl border border-[#D6C4FF]/10 shadow-md flex flex-col gap-1.5 font-gowun text-[#FAFAFA] overflow-hidden">
            <h4 className="text-[#FFF8B9] text-sm sm:text-base font-bold tracking-wide border-b border-[#FFF8B9]/15 pb-1">와와 슬립랜드</h4>
            <div className="text-[10px] sm:text-[11px] text-[#FFF8B9]/90 font-medium tracking-wide">
              [키워드: 인기 꿈 &middot; 즐거움 &middot; 특별한 경험]
            </div>
          </div>

          {/* 제작자 3: 아가냅 코코 */}
          <div className="relative bg-[#0a1e56]/45 backdrop-blur-md p-5 rounded-xl border border-[#D6C4FF]/10 shadow-md flex flex-col gap-1.5 font-gowun text-[#FAFAFA] overflow-hidden">
            <h4 className="text-[#FFF8B9] text-sm sm:text-base font-bold tracking-wide border-b border-[#FFF8B9]/15 pb-1">아가냅 코코</h4>
            <div className="text-[10px] sm:text-[11px] text-[#FFF8B9]/90 font-medium tracking-wide">
              [키워드: 어린 시절 &middot; 추억 &middot; 따뜻함]
            </div>
          </div>

          {/* 제작자 4: 야스누스 오트라 */}
          <div className="relative bg-[#0a1e56]/45 backdrop-blur-md p-5 rounded-xl border border-[#D6C4FF]/10 shadow-md flex flex-col gap-1.5 font-gowun text-[#FAFAFA] overflow-hidden">
            <h4 className="text-[#FFF8B9] text-sm sm:text-base font-bold tracking-wide border-b border-[#FFF8B9]/15 pb-1">야스누스 오트라</h4>
            <div className="text-[10px] sm:text-[11px] text-[#FFF8B9]/90 font-medium tracking-wide">
              [키워드: 특별한 꿈 &middot; 개성 &middot; 창작력]
            </div>
          </div>

          {/* 제작자 5: 막심 */}
          <div className="relative bg-[#0a1e56]/45 backdrop-blur-md p-5 rounded-xl border border-[#D6C4FF]/10 shadow-md flex flex-col gap-1.5 font-gowun text-[#FAFAFA] overflow-hidden">
            <h4 className="text-[#FFF8B9] text-sm sm:text-base font-bold tracking-wide border-b border-[#FFF8B9]/15 pb-1">막심</h4>
            <div className="text-[10px] sm:text-[11px] text-[#FFF8B9]/90 font-medium tracking-wide">
              [키워드: 꿈 제작 &middot; 실력자 &middot; 전문성]
            </div>
          </div>

          {/* 제작자 6: 니콜라스 */}
          <div className="relative bg-[#0a1e56]/45 backdrop-blur-md p-5 rounded-xl border border-[#D6C4FF]/10 shadow-md flex flex-col gap-1.5 font-gowun text-[#FAFAFA] overflow-hidden">
            <h4 className="text-[#FFF8B9] text-sm sm:text-base font-bold tracking-wide border-b border-[#FFF8B9]/15 pb-1">니콜라스</h4>
            <div className="text-[10px] sm:text-[11px] text-[#FFF8B9]/90 font-medium tracking-wide">
              [키워드: 현실적인 꿈 &middot; 섬세함 &middot; 관찰력]
            </div>
          </div>

          {/* 제작자 7: 애니모라 반쵸 */}
          <div className="relative bg-[#0a1e56]/45 backdrop-blur-md p-5 rounded-xl border border-[#D6C4FF]/10 shadow-md flex flex-col gap-1.5 font-gowun text-[#FAFAFA] overflow-hidden">
            <h4 className="text-[#FFF8B9] text-sm sm:text-base font-bold tracking-wide border-b border-[#FFF8B9]/15 pb-1">애니모라 반쵸</h4>
            <div className="text-[10px] sm:text-[11px] text-[#FFF8B9]/90 font-medium tracking-wide">
              [키워드: 동물 관련 꿈 &middot; 생동감 &middot; 창의성]
            </div>
          </div>

          {/* 제작자 8: 도제 */}
          <div className="relative bg-[#0a1e56]/45 backdrop-blur-md p-5 rounded-xl border border-[#D6C4FF]/10 shadow-md flex flex-col gap-1.5 font-gowun text-[#FAFAFA] overflow-hidden">
            <h4 className="text-[#FFF8B9] text-sm sm:text-base font-bold tracking-wide border-b border-[#FFF8B9]/15 pb-1">도제</h4>
            <div className="text-[10px] sm:text-[11px] text-[#FFF8B9]/90 font-medium tracking-wide">
              [키워드: 신입 제작자 &middot; 성장 &middot; 노력]
            </div>
          </div>

          {/* 제작자 9: 녹틸루카 아쌈 */}
          <div className="relative bg-[#0a1e56]/45 backdrop-blur-md p-5 rounded-xl border border-[#D6C4FF]/10 shadow-md flex flex-col gap-1.5 font-gowun text-[#FAFAFA] overflow-hidden md:col-span-2 lg:col-span-3">
            <h4 className="text-[#FFF8B9] text-sm sm:text-base font-bold tracking-wide border-b border-[#FFF8B9]/15 pb-1">녹틸루카 아쌈</h4>
            <div className="text-[10px] sm:text-[11px] text-[#FFF8B9]/90 font-medium tracking-wide">
              [키워드: 직원 &middot; 친절함 &middot; 조력자 &middot; 따뜻함]
            </div>
            <p className="text-[14px] sm:text-[15px] leading-loose text-[#FAFAFA]/95 whitespace-normal break-keep select-text sharp-text mt-2 border-t border-[#FFF8B9]/10 pt-2">
              {'아쌈은 꿈 상점가에서 일하는 직원으로, 주변 사람들을 돕고 편안한 분위기를 만드는 인물이다. 페니가 적응하는 과정에서도 도움을 주는 든든한 존재이다.'}
            </p>
          </div>
        </div>
      </div>

      <div className="h-6 hidden md:block" />
    </section>
  );
}

// ───────────────────────────────────────────────
// 메인 페이지 (싱글 스크롤 조합 및 스크롤 격리 기능)
// ───────────────────────────────────────────────
export default function HomePage() {
  const { isScrollLocked, setIsScrollLocked } = useTab();
  const lastUnlockedTime = useRef<number>(0);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 1) 스크롤 격리 로직: isScrollLocked가 true이면 최상단 고정 (overflow: hidden)
  useEffect(() => {
    if (isScrollLocked) {
      window.scrollTo(0, 0); // 스크롤 락 발동 전 윈도우 스크롤 위치를 y=0으로 강제 리셋
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      lastUnlockedTime.current = Date.now();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isScrollLocked]);

  // 2) 스크롤 감시: 락이 풀려 내려갔다가 다시 수동으로 맨 위(y <= 5)로 돌아오면 자동 잠금
  useEffect(() => {
    const handleScroll = () => {
      if (!isScrollLocked && window.scrollY <= 5) {
        // 잠금이 막 풀린 지 1초 이내라면 (스크롤 애니메이션 진행 중일 수 있음) 자동 재잠금을 방지
        if (Date.now() - lastUnlockedTime.current < 1000) {
          return;
        }
        setIsScrollLocked(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrollLocked, setIsScrollLocked]);

  return (
    <>
      <HomeSection />
      <BookOverviewSection />
      <AuthorSection />
      <StorySection />
      <CharacterSection />
      <footer className="flex flex-col md:flex-row justify-between items-end w-full max-w-6xl mx-auto px-8 pt-6 pb-16 mt-10 gap-8 select-none">
        {/* 좌측 구역: 제작 및 카피라이트 정보 */}
        <div className="flex flex-col gap-1 text-left self-end text-xs text-white/50 tracking-wider font-gowun">
          <span>{isMounted ? "2025910050 신예은 제작" : "2025910050 Yeeun Shin (Production)"}</span>
          <span>© Dalggut Dream Department Store Web site</span>
        </div>

        {/* 우측 구역: Contents & AI Tools (가로 병렬 배치) */}
        <div className="flex flex-row gap-16 text-left font-gowun">
          {/* Contents 뭉탱이 */}
          <div className="flex flex-col">
            <span className="text-[#FFF8B9]/70 text-xs font-bold tracking-widest uppercase mb-2">
              CONTENTS
            </span>
            <div className="flex flex-col gap-1 text-white/40 text-xs tracking-wide">
              <span>- Kyobo Book Centre</span>
              <span>- Naver Blog (Smart Lover)</span>
            </div>
          </div>

          {/* AI-Assisted Tools 뭉탱이 */}
          <div className="flex flex-col">
            <span className="text-[#FFF8B9]/70 text-xs font-bold tracking-widest uppercase mb-2">
              AI-ASSISTED TOOLS
            </span>
            <div className="flex flex-col gap-1 text-white/40 text-xs tracking-wide">
              <span>- Google Gemini</span>
              <span>- AI Antigravity</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
