export interface CharacterInfo {
  id: string;
  name: string;
  engName: string;
  imageAlt: string;
  role: 'protagonist' | 'staff' | 'maker' | 'noctiluca';
  details: string[];
}

export const characterData: CharacterInfo[] = [
  {
    id: 'penny',
    name: '페니',
    engName: 'Penny',
    imageAlt: '페니.png',
    role: 'protagonist',
    details: [
      '달러구트 꿈 백화점 신입사원',
      '웨더 아주머니와 함께 1층 프런트를 담당함',
    ],
  },
  {
    id: 'dallergut',
    name: '달러구트',
    engName: 'DallerGut',
    imageAlt: '달러구트.png',
    role: 'staff',
    details: [
      '달러구트 꿈 백화점의 사장',
      '잠든 시간을 다스리는 시간 신의 후손',
    ],
  },
  {
    id: 'weather',
    name: '웨더',
    engName: 'Weather',
    imageAlt: '웨더.png',
    role: 'staff',
    details: [
      '백화점 1층의 베테랑 매니저',
      '페니를 친절하게 가르쳐 주는 선배',
    ],
  },
  {
    id: 'vigo',
    name: '비고 마이어스',
    engName: 'Vigo Myers',
    imageAlt: '비고 마이어스.png',
    role: 'staff',
    details: [
      '백화점 2층 매니저',
      '프리미엄 꿈을 꼼꼼하게 관리함',
    ],
  },
  {
    id: 'agasom',
    name: '아가솜',
    engName: 'Agasom',
    imageAlt: '아가솜.png',
    role: 'maker',
    details: [
      '꿈 제작의 전설적인 거장',
      '아련하고 따뜻한 위로의 꿈을 만듦',
    ],
  },
  {
    id: 'noctiluca',
    name: '녹틸루카',
    engName: 'Noctiluca',
    imageAlt: '녹틸루카.png',
    role: 'noctiluca',
    details: [
      '숲속에 서식하는 신비한 존재들',
      '꿈의 대가로 지불되는 감정을 수집함',
    ],
  },
];
