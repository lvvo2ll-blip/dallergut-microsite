export interface DreamBoxItem {
  id: number;
  boxImage: string;
  tagImage: string;
  text: string;
  rotation: string;
}

export const dreamBoxData: DreamBoxItem[] = [
  {
    id: 1,
    boxImage: '상자1.png',
    tagImage: '텍1.png',
    text: '하늘을 나는 꿈',
    rotation: '-3deg',
  },
  {
    id: 2,
    boxImage: '상자2.png',
    tagImage: '텍2.png',
    text: '범고래가 되는 꿈',
    rotation: '4deg',
  },
  {
    id: 3,
    boxImage: '상자3.png',
    tagImage: '텍3.png',
    text: '타인으로 살아보는 꿈',
    rotation: '-2deg',
  },
  {
    id: 4,
    boxImage: '상자4.png',
    tagImage: '텍4.png',
    text: '그리운 사람을 만나는 꿈',
    rotation: '5deg',
  },
  {
    id: 5,
    boxImage: '상자5.png',
    tagImage: '텍5.png',
    text: '악몽',
    rotation: '-4deg',
  },
  {
    id: 6,
    boxImage: '상자6.png',
    tagImage: '텍6.png',
    text: '예지몽',
    rotation: '3deg',
  },
  {
    id: 7,
    boxImage: '상자7.png',
    tagImage: '텍7.png',
    text: '친구를 만나는 꿈',
    rotation: '-1.5deg',
  },
  {
    id: 8,
    boxImage: '상자8.png',
    tagImage: '텍8.png',
    text: '소소한 여행',
    rotation: '6deg',
  },
];
