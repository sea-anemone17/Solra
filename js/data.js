export const subjectTabs = [
  "국어",
  "수학",
  "영어",
  "사회탐구",
  "과학탐구",
  "기타"
];

export const commissionTypesBySubject = {
  국어: ["비문학 구조 정리", "문학 해석", "서술형 답안 구성", "개념 암기 정리"],
  수학: ["문제 풀이", "오답 정리", "개념 설명", "유형 분류"],
  영어: ["해석", "단어 정리", "구문 분석", "서술형 대비"],
  사회탐구: ["개념 비교", "흐름 정리", "사례 연결", "암기 포인트 정리"],
  과학탐구: ["개념 이해", "문제 적용", "실수 포인트 정리", "암기형 정리"],
  기타: ["자유 요청", "프로젝트형 정리", "혼합형 작업", "자율 공부 의뢰"]
};

export const requestTagPool = [
  "고1",
  "고2",
  "고3",
  "내신",
  "모의고사",
  "수행평가",
  "시험 직전",
  "벼락치기",
  "개념형",
  "암기형",
  "서술형",
  "오답정리"
];

export const clientsBySubject = {
  국어: [
    "문장흐름이답답한학생",
    "비문학막힘형",
    "문학해석불안형"
  ],
  수학: [
    "수학공포학생",
    "유형분류필요형",
    "개념부터잡고싶은학생"
  ],
  영어: [
    "해석막힘형",
    "단어벼락치기형",
    "구문이복잡한학생"
  ],
  사회탐구: [
    "개념비교필요형",
    "암기정리원함형",
    "흐름연결학생"
  ],
  과학탐구: [
    "적용막힘형",
    "실수많은학생",
    "개념정리우선형"
  ],
  기타: [
    "자유형의뢰자",
    "프로젝트정리형",
    "혼합형작업학생"
  ]
};

export const achievements = [
  {
    id: "first-clear",
    title: "첫 해결",
    description: "첫 작업물을 제출했습니다.",
    check: (state) => state.completeCount >= 1
  },
  {
    id: "three-clears",
    title: "꾸준한 Solver",
    description: "작업물을 3회 제출했습니다.",
    check: (state) => state.completeCount >= 3
  },
  {
    id: "five-clears",
    title: "신뢰 축적",
    description: "작업물을 5회 제출했습니다.",
    check: (state) => state.completeCount >= 5
  }
];
