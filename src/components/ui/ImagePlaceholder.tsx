'use client';

import React, { useState, useEffect } from 'react';

interface ImagePlaceholderProps {
  alt: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

export default function ImagePlaceholder({
  alt,
  width,
  height,
  className = '',
  style = {},
}: ImagePlaceholderProps) {
  const [hasError, setHasError] = useState(false);

  // 사용자 업로드 예상 경로 (예: alt가 "구름1.png" 또는 "구름1" 이라면 "/구름1.png" 호출)
  const srcPath = alt.endsWith('.png') ? `/dallergut-microsite/${alt}` : `/dallergut-microsite/${alt}.png`;

  useEffect(() => {
    // alt가 바뀔 때 에러 상태 초기화
    setHasError(false);
  }, [alt]);

  if (!hasError) {
    return (
      <img
        src={srcPath}
        alt={alt}
        className={className}
        style={{
          width: typeof width === 'number' ? `${width}px` : width ?? '100%',
          height: typeof height === 'number' ? `${height}px` : height ?? '100%',
          objectFit: 'contain',
          ...style,
        }}
        onError={() => setHasError(true)}
      />
    );
  }

  return (
    <div
      className={`flex items-center justify-center bg-[#FFF8B9]/10 border border-[#FFF8B9]/30 text-[#FFF8B9] text-xs font-gowun text-center p-1 rounded overflow-hidden select-none ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width ?? '100%',
        height: typeof height === 'number' ? `${height}px` : height ?? '100%',
        ...style,
      }}
    >
      <div className="flex flex-col items-center justify-center gap-0.5 max-w-full">
        <span className="font-semibold text-[11px] truncate max-w-full px-1">{alt}</span>
        <span className="text-[9px] opacity-50 tracking-wider">미업로드</span>
      </div>
    </div>
  );
}
