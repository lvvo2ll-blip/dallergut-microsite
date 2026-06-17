'use client';

import React from 'react';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import { dreamBoxData } from '@/constants/dreamBoxData';
import { useDreamToggle } from '@/hooks/useDreamToggle';

export default function DreamBoxPage() {
  const { toggleBox, isBoxActive } = useDreamToggle();

  const topBoxes = dreamBoxData.slice(0, 4);
  const bottomBoxes = dreamBoxData.slice(4, 8);

  return (
    <div
      className="flex-grow w-full min-h-[calc(100vh-89px)] relative overflow-hidden bg-[#031133] flex flex-col items-center justify-center p-6 md:p-12"
      style={{
        backgroundImage: "linear-gradient(rgba(3, 17, 51, 0.35), rgba(3, 17, 51, 0.35)), url('/dallergut-microsite/Dream Box 배경.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* 타이틀 및 지시문 */}
      <div className="absolute top-16 text-center z-10">
        <h1 className="font-glegoo text-[#031133] text-3xl md:text-4xl tracking-widest lowercase select-none">
          Dream Box
        </h1>
        <p className="font-gowun text-[#031133]/70 text-[16px] mt-1">상자를 클릭하면 신비로운 꿈의 이름이 밝혀집니다.</p>
      </div>

      {/* 중앙 선반 레이아웃 컨테이너 (위/아래 2단 선반 배치) */}
      <div className="w-full max-w-5xl flex flex-col gap-16 md:gap-20 mt-16 md:mt-24 z-10 px-4">
        
        {/* 1. 선반 위쪽 라인 (1~4번 상자) */}
        <div className="relative">
          {/* 선반 바닥 가로 기준선 구조 (일러스트 위치에 가상으로 대칭을 맞추는 가이드 보더) */}
          <div className="absolute -bottom-[26px] left-0 w-full h-[30px] bg-[#C8C8C8] rounded-md shadow-[0_4px_8px_rgba(0,0,0,0.3)]" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 justify-items-center">
            {topBoxes.map((item) => {
              const isActive = isBoxActive(item.id);
              return (
                <div key={item.id} className="flex flex-col items-center relative w-[95px] sm:w-[115px] h-[140px] justify-end">
                  
                  {/* 클릭 시 부드럽게 등장하는 텍(Tag) 레이어 */}
                  {isActive && (
                    <div
                      className="absolute top-[-30px] z-20 w-[110px] h-[50px] flex items-center justify-center animate-tag-appear"
                      style={{
                        transform: `rotate(${item.rotation})`,
                        transformOrigin: 'center center',
                      }}
                    >
                      {/* 텍 뒤편 연노랑 그라데이션 광채 효과 */}
                      <div className="absolute inset-0 bg-[#FFFACA] rounded-lg blur-md opacity-60 z-[-1] animate-pulse" />
                      
                      {/* 텍 이미지 플레이스홀더 */}
                      <div className="absolute inset-0 z-0">
                        <ImagePlaceholder alt={item.tagImage} width="100%" height="100%" />
                      </div>

                      {/* 텍 내부 텍스트 */}
                      <span className="relative z-10 text-[#031133] font-gowun text-[11px] font-bold text-center px-2 leading-tight select-none select-text">
                        {item.text}
                      </span>
                    </div>
                  )}

                  {/* 상자 이미지 버튼 (호버 시 선반 바닥을 축으로 위쪽으로 scale) */}
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

        {/* 2. 선반 아래쪽 라인 (5~8번 상자) */}
        <div className="relative">
          {/* 선반 바닥 가로 기준선 구조 */}
          <div className="absolute -bottom-[26px] left-0 w-full h-[30px] bg-[#C8C8C8] rounded-md shadow-[0_4px_8px_rgba(0,0,0,0.3)]" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 justify-items-center">
            {bottomBoxes.map((item) => {
              const isActive = isBoxActive(item.id);
              return (
                <div key={item.id} className="flex flex-col items-center relative w-[95px] sm:w-[115px] h-[140px] justify-end">
                  
                  {/* 클릭 시 부드럽게 등장하는 텍(Tag) 레이어 */}
                  {isActive && (
                    <div
                      className="absolute top-[-30px] z-20 w-[110px] h-[50px] flex items-center justify-center animate-tag-appear"
                      style={{
                        transform: `rotate(${item.rotation})`,
                        transformOrigin: 'center center',
                      }}
                    >
                      {/* 텍 뒤편 연노랑 그라데이션 광채 효과 */}
                      <div className="absolute inset-0 bg-[#FFFACA] rounded-lg blur-md opacity-60 z-[-1] animate-pulse" />

                      {/* 텍 이미지 플레이스홀더 */}
                      <div className="absolute inset-0 z-0">
                        <ImagePlaceholder alt={item.tagImage} width="100%" height="100%" />
                      </div>

                      {/* 텍 내부 텍스트 */}
                      <span className="relative z-10 text-[#031133] font-gowun text-[11px] font-bold text-center px-2 leading-tight select-none select-text">
                        {item.text}
                      </span>
                    </div>
                  )}

                  {/* 상자 이미지 버튼 (호버 시 선반 바닥을 축으로 위쪽으로 scale) */}
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
  );
}
