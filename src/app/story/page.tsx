'use client';

import React from 'react';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';

export default function StoryPage() {
  return (
    <div
      className="flex-grow w-full min-h-[calc(100vh-89px)] relative overflow-hidden bg-[#031133] flex flex-col items-center justify-between p-8 md:p-16"
      style={{
        backgroundImage: "linear-gradient(rgba(3, 17, 51, 0.45), rgba(3, 17, 51, 0.45)), url('/Story_배경.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* 본문 콘텐츠 감싸기 */}
      <div className="w-full max-w-4xl flex flex-col items-center gap-10 mt-4">

        {/* 1. 중앙 타이틀 'story' */}
        <div className="text-center">
          <h1 className="font-glegoo text-[#FFF8B9] text-3xl md:text-4xl tracking-widest lowercase select-none">
            story
          </h1>
        </div>

        {/* 2. 인용구 구름 카드 영역 (플레이스홀더) */}
        <div className="relative w-full max-w-[650px] min-h-[200px] flex items-center justify-center">
          {/* 구름 플레이스홀더 배경 */}
          <div className="w-full absolute inset-0 flex items-center justify-center z-0">
            <ImagePlaceholder
              alt="구름.png"
              width="100%"
              height={220}
              className="opacity-90 object-fill"
            />
          </div>

          <div className="relative z-10 px-6 pt-14 pb-4 text-center select-text font-gowun text-sm md:text-base leading-loose max-w-[85%]">
            <p className="text-[#0a1835] text-center font-semibold">
              {"네가 생각하는 대단한 미래는 여기에 없단다."}
              <br />
              {"즐거운 현재 오늘밤의 꿈들이 있을 뿐이지. -122p-"}
            </p>
          </div>
        </div>

        {/* 3. 하단 2단 소개 콘텐츠 영역 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full mt-6">

          {/* [좌측 컬럼] */}
          <div className="bg-[#031133]/50 backdrop-blur-md p-6 rounded-xl border border-[#FFF8B9]/10 shadow-lg flex flex-col gap-4 text-left font-gowun">
            <h3 className="text-base md:text-lg text-[#FFF8B9] font-bold leading-snug">
              &ldquo;여기는 잠들어야만 입장할 수 있는 &lsquo;달러구트 꿈 백화점&rsquo;입니다.&rdquo;
            </h3>
            <p className="text-xs md:text-sm text-[#F5F5F5]/85 leading-relaxed">
              주인공 '페니'가 꿈 백화점에 취직해 다양한 꿈 제작자, 손님들과 겪는 에피소드를 통해
              일상과 감정의 소중함을 깨닫는 과정을 담고 있습니다.
            </p>
          </div>

          {/* [우측 컬럼] */}
          <div className="bg-[#031133]/50 backdrop-blur-md p-6 rounded-xl border border-[#FFF8B9]/10 shadow-lg flex flex-col gap-4 text-left font-gowun">
            {/* 별점 이미지 플레이스홀더 */}
            <div className="w-[140px] h-[28px] overflow-hidden">
              <ImagePlaceholder alt="별점.png" width={140} height={28} />
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-[21px] md:text-[23px] text-[#FFF8B9] font-bold leading-snug">
                &ldquo;평점 4.8점, 베스트셀러<br />1위로 증명된 따뜻한 이야기&rdquo;
              </h3>
              <p className="text-xs md:text-sm text-[#F5F5F5]/85 leading-relaxed">
                텀블벅 펀딩 1812%에 달성한 작품으로, 따뜻한 위로와 깊은 여운을 선사하며
                성인과 청소년 모두에게 사랑받았다.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* 4. 우측 최하단 하이퍼링크 버튼 영역 */}
      <div className="w-full max-w-4xl flex justify-end gap-6 mt-10 md:mt-0">
        <a
          href="https://youtu.be/_c0bZARwvaE"
          target="_blank"
          rel="noopener noreferrer"
          className="font-gowun text-xs md:text-sm text-[#FFF8B9] hover:text-[#FFF8B9]/80 underline decoration-[#FFF8B9]/45 hover:opacity-75 transition-all duration-300 font-semibold tracking-wider"
        >
          북트레일러
        </a>
        <a
          href="https://product.kyobobook.co.kr/detail/S000001743283"
          target="_blank"
          rel="noopener noreferrer"
          className="font-gowun text-xs md:text-sm text-[#FFF8B9] hover:text-[#FFF8B9]/80 underline decoration-[#FFF8B9]/45 hover:opacity-75 transition-all duration-300 font-semibold tracking-wider"
        >
          사러가기
        </a>
      </div>

    </div>
  );
}
