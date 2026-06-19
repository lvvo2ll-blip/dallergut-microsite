'use client';

import React from 'react';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import { characterData } from '@/constants/characterData';

export default function CharacterPage() {
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div
      className="flex-grow w-full min-h-[calc(100vh-89px)] relative overflow-hidden bg-[#031133] flex flex-col justify-between p-6 md:p-12"
      style={{
        backgroundImage: `linear-gradient(rgba(3, 17, 51, 0.45), rgba(3, 17, 51, 0.45)), url('${encodeURI('/character_배경.png')}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* 1. 상단 타이틀 영역 및 지시문 */}
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-2 mt-4 relative z-10">
        <div className="text-center">
          <h1 className="font-glegoo text-[#FFF8B9] text-3xl md:text-4xl tracking-widest lowercase select-none">
            Character
          </h1>
        </div>
        <div className="text-right">
          <span className="font-gowun text-[#F5F5F5]/70 text-xs md:text-sm italic tracking-wide select-none">
            * 각 캐릭터의 상상도입니다.
          </span>
        </div>
      </div>

      {/* 2. 중앙 2분할 캐릭터 카드 영역 */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center justify-center relative z-10 my-auto py-8">
        {characterData.map((char) => (
          <div
            key={char.id}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-[#031133]/65 backdrop-blur-md p-6 rounded-2xl border border-[#FFF8B9]/10 shadow-2xl"
          >
            
            {/* [좌측 - 아치형 이미지 플레이스홀더] */}
            <div className="flex-shrink-0 relative group">
              <div
                className="w-[140px] h-[190px] overflow-hidden border-[4px] border-[#9B9B98]/50 bg-[#031133]/40 shadow-lg transition-all duration-300 ease-out transform group-hover:scale-[1.03] group-hover:border-[#FFF8B9]"
                style={{
                  borderRadius: '200px 200px 0 0',
                }}
              >
                <ImagePlaceholder
                  alt={char.imageAlt}
                  width="100%"
                  height="100%"
                  className="object-cover w-full h-full"
                  style={{ borderRadius: '194px 194px 0 0' }}
                />
              </div>
            </div>

            {/* [우측 - 텍스트 설명 영역] */}
            <div className="flex-grow flex flex-col gap-4 text-left font-gowun w-full">
              
              {/* 이름 */}
              <div className="flex items-baseline gap-2 border-b border-[#FFF8B9]/20 pb-2.5">
                <h2 className="text-[#FFF8B9] text-xl font-bold tracking-wide">
                  {char.name}
                </h2>
                <span className="text-xs text-[#F5F5F5]/50 tracking-wider font-glegoo">
                  {char.engName}
                </span>
              </div>

              {/* 상세 설명 (리스트 형태) */}
              <ul className="flex flex-col gap-2.5 text-xs md:text-sm text-[#F5F5F5]/90 pl-1 list-none">
                {char.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-[#FFF8B9] flex-shrink-0 select-none">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

            </div>

          </div>
        ))}
      </div>

      {/* 3. 새로운 크레딧 (Footer) 영역 */}
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
    </div>
  );
}
