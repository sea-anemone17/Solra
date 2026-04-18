export const SUBJECTS = [
  "국어",
  "수학",
  "영어",
  "사회탐구",
  "과학탐구",
  "한국사",
  "제2외국어",
  "기타"
];

export const TASK_TYPES = {
  국어: ["비문학 구조 정리", "문학 해석", "서술형 답안 구성"],
  수학: ["문제 풀이", "오답 정리", "개념 설명"],
  영어: ["해석", "단어 정리", "구문 분석"],
  사회탐구: ["개념 비교", "흐름 정리", "사례 연결"],
  과학탐구: ["개념 이해", "문제 적용", "암기형 정리"],
  한국사: ["사건 흐름 정리", "개념 비교", "암기 포인트 정리"],
  제2외국어: ["문장 해석", "어휘 정리", "표현 암기"],
  기타: ["자유 요청", "혼합형 작업"]
};

export const TAG_POOL = [
  "고1", "고2", "고3",
  "내신", "모의고사", "수행평가", "시험 직전",
  "개념형", "암기형", "서술형", "오답정리"
];

export const DEFAULT_TASK_TYPES = [
  {
    id: "math-problem-1",
    subject: "수학",
    name: "문제 풀이형",
    description: "문제 풀이 과정을 단계별로 정리합니다.",
    tags: ["고2", "내신", "오답정리"],
    status: "open"
  },
  {
    id: "eng-parse-1",
    subject: "영어",
    name: "구문 분석형",
    description: "문장 구조를 해체해서 해석 흐름을 잡습니다.",
    tags: ["고2", "모의고사", "구문분석"],
    status: "open"
  },
  {
    id: "history-flow-1",
    subject: "한국사",
    name: "사건 흐름 정리형",
    description: "사건 전개를 순서대로 정리합니다.",
    tags: ["고2", "내신", "암기형"],
    status: "open"
  },
  {
    id: "foreign-vocab-1",
    subject: "제2외국어",
    name: "어휘 정리형",
    description: "핵심 어휘와 표현을 묶어서 정리합니다.",
    tags: ["고2", "암기형"],
    status: "open"
  }
];

export const CLIENT_NAMES = {
  국어: ["비문학막힘형", "문학해석어려움형"],
  수학: ["수학공포학생", "유형분류필요형"],
  영어: ["해석막힘형", "단어벼락치기형"],
  사회탐구: ["개념비교필요형", "흐름연결학생"],
  과학탐구: ["적용막힘형", "실수많은학생"],
  한국사: ["사건흐름막힘형", "암기정리필요형"],
  제2외국어: ["문장해석막힘형", "어휘암기형"],
  기타: ["자유형의뢰자"]
};

export const REVIEW_TEMPLATES = {
  common: [
    "작업물이 정리되어 보여서 훨씬 이해가 쉬워졌어요.",
    "핵심이 잘 보여서 다시 보기 편했어요."
  ],
  수학: [
    "풀이 흐름이 보여서 훨씬 손대기 쉬웠어요.",
    "어디서 막히는지 알게 됐어요."
  ],
  영어: [
    "문장 구조가 보여서 해석이 덜 막혔어요.",
    "정리 방식이 깔끔해서 기억에 남아요."
  ],
  한국사: [
    "사건 흐름이 정리돼서 외우기 쉬워졌어요."
  ],
  제2외국어: [
    "표현이 묶여 있어서 더 잘 기억됐어요."
  ]
};

export const NOTIFICATION_MESSAGES = {
  taskCreated: "새 Task가 DM으로 도착했습니다.",
  workSaved: "작업물이 임시 저장되었습니다.",
  workDelivered: "작업물이 전달되었습니다.",
  reviewArrived: "후기가 도착했습니다."
};

export const MOCK_SOLVERS = [
  {
    id: "solver-math-1",
    name: "정리의정석",
    subject: "수학",
    bio: "막막한 유형을 구조적으로 정리합니다.",
    achievementLine: "다온여고 전교 1등 · 수학 내신 특화",
    tags: ["고2", "수학", "오답정리"],
    reviewCount: 24,
    taskTypes: [
      {
        name: "문제 풀이형",
        description: "풀이 흐름을 단계별로 정리합니다."
      },
      {
        name: "오답 정리형",
        description: "헷갈린 포인트를 다시 묶어 줍니다."
      }
    ],
    sampleReviews: [
      "풀이가 끊기지 않게 보여서 좋았어요.",
      "어디서 막히는지 바로 보였습니다."
    ]
  },
  {
    id: "solver-math-2",
    name: "유형추적자",
    subject: "수학",
    bio: "실수 포인트와 오답 패턴을 빠르게 잡아냅니다.",
    achievementLine: "세린고 이과 상위권 · 오답 분석 강점",
    tags: ["고2", "수학", "개념형"],
    reviewCount: 18,
    taskTypes: [
      {
        name: "유형 분류형",
        description: "유형을 나눠서 접근법을 정리합니다."
      }
    ],
    sampleReviews: [
      "어디서 실수하는지 보여서 훨씬 편했어요."
    ]
  },
  {
    id: "solver-eng-1",
    name: "구문해부실",
    subject: "영어",
    bio: "문장을 해체해서 흐름이 보이게 만듭니다.",
    achievementLine: "연서고 1학년 대표 · 영어 해석 강점",
    tags: ["고2", "영어", "구문분석"],
    reviewCount: 18,
    taskTypes: [
      {
        name: "구문 분석형",
        description: "문장 구조를 끊어서 해석합니다."
      }
    ],
    sampleReviews: [
      "구조가 보이니까 해석이 덜 막혔어요."
    ]
  },
  {
    id: "solver-kor-1",
    name: "문장연구소",
    subject: "국어",
    bio: "비문학 흐름과 핵심 문장을 구조적으로 정리합니다.",
    achievementLine: "가온여고 국어 상위권 · 비문학 특화",
    tags: ["고2", "국어", "구조화"],
    reviewCount: 15,
    taskTypes: [
      {
        name: "비문학 구조 정리형",
        description: "문단 흐름과 핵심 논지를 잡아 줍니다."
      }
    ],
    sampleReviews: [
      "지문 구조가 눈에 들어와서 덜 막혔어요."
    ]
  },
  {
    id: "solver-history-1",
    name: "연표공방",
    subject: "한국사",
    bio: "사건 흐름과 연표를 묶어서 암기를 돕습니다.",
    achievementLine: "교내 한국사 경시 우수 · 사건 흐름 특화",
    tags: ["고2", "한국사", "암기형"],
    reviewCount: 12,
    taskTypes: [
      {
        name: "사건 흐름 정리형",
        description: "사건 전개를 순서대로 정리합니다."
      }
    ],
    sampleReviews: [
      "흐름으로 보니까 암기가 쉬워졌어요."
    ]
  },
  {
    id: "solver-foreign-1",
    name: "표현연구소",
    subject: "제2외국어",
    bio: "표현과 어휘를 묶어서 기억하기 쉽게 정리합니다.",
    achievementLine: "제2외국어 수행평가 상위권 · 표현 암기 강점",
    tags: ["고2", "제2외국어", "암기형"],
    reviewCount: 9,
    taskTypes: [
      {
        name: "표현 암기형",
        description: "표현을 묶어서 자연스럽게 암기합니다."
      }
    ],
    sampleReviews: [
      "표현이 묶여 있어서 훨씬 잘 외워졌어요."
    ]
  }
];
