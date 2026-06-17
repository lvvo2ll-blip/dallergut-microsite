'use client';

import React from 'react';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import { characterData } from '@/constants/characterData';

export default function CharacterPage() {
  return (
    <div
      className="flex-grow w-full min-h-[calc(100vh-89px)] relative overflow-hidden bg-[#031133] flex flex-col justify-between p-6 md:p-12"
      style={{
        backgroundImage: "linear-gradient(rgba(3, 17, 51, 0.45), rgba(3, 17, 51, 0.45)), url('/character_배경.png')",
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

      {/* 하단 빈 여백 조절용 플레이트 */}
      <div className="h-6 hidden md:block" />
    </div>
  );
}
