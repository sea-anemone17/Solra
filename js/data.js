export const clients = [
  {
    id: "crammer",
    name: "벼락치기형 학생",
    requestTemplates: [
      "시험이 얼마 안 남아서요...\n{task} 좀 부탁드릴 수 있을까요?",
      "오늘 안에 {task}를 끝내야 해서요.\n핵심만 딱 보이게 도와주세요!"
    ],
    reviewTemplates: {
      success: [
        "덕분에 급한 불 껐어요!\n짧은데 핵심이 잘 보여서 좋았어요.",
        "이해가 훨씬 잘 됐어요.\n시험 전에 다시 보기 좋네요."
      ]
    }
  },
  {
    id: "concept",
    name: "개념 집착형 학생",
    requestTemplates: [
      "{task}를 그냥 외우는 게 아니라 이해하고 싶어요.\n구조적으로 정리해 주실 수 있나요?",
      "{task}가 자꾸 헷갈려요.\n왜 그런지도 같이 보이게 정리 부탁드려요."
    ],
    reviewTemplates: {
      success: [
        "이제야 구조가 보이네요.\n왜 그런지 이해됐어요.",
        "단순 암기가 아니라 흐름이 잡혀서 좋았어요."
      ]
    }
  },
  {
    id: "perfectionist",
    name: "완벽주의형 학생",
    requestTemplates: [
      "{task}에서 조건을 자꾸 놓쳐요.\n정확하게 정리해 주실 수 있나요?",
      "실수 없이 다시 보고 싶어요.\n{task}를 깔끔하게 정리 부탁드려요."
    ],
    reviewTemplates: {
      success: [
        "정리가 깔끔해서 다시 보기 좋았어요.\n정확성이 마음에 들었습니다.",
        "헷갈리던 조건이 분리돼 보여서 훨씬 편했어요."
      ]
    }
  },
  {
    id: "memory",
    name: "기억형 학생",
    requestTemplates: [
      "{task}가 너무 딱딱해서 머리에 안 들어와요.\n기억에 남게 정리해 주실 수 있나요?",
      "{task}를 오래 기억하고 싶어요.\n조금 더 인상적으로 정리 부탁드려요."
    ],
    reviewTemplates: {
      success: [
        "표현이 좋아서 기억에 남아요.\n다시 볼 때도 생각날 것 같아요.",
        "이번엔 이상하게 잘 외워질 것 같아요.\n훨씬 덜 딱딱했어요."
      ]
    }
  },
  {
    id: "regular",
    name: "조용한 단골 학생",
    requestTemplates: [
      "이번에도 {task} 부탁드릴게요.\n늘 하시던 방식이 좋아요.",
      "{task} 다시 부탁드려요.\n믿고 맡길 수 있어서 편해요."
    ],
    reviewTemplates: {
      success: [
        "이번에도 만족했어요.\n역시 믿고 맡길 만하네요.",
        "설명이 차분해서 좋았어요.\n다음에도 부탁드릴게요."
      ]
    }
  },
  {
    id: "writing",
    name: "서술형 불안 학생",
    requestTemplates: [
      "{task}를 서술형으로 정리해야 하는데 방향이 안 보여요.\n흐름을 잡아 주실 수 있나요?",
      "답은 알겠는데 글로 쓰려면 막혀요.\n{task}를 문장 흐름 중심으로 부탁드려요."
    ],
    reviewTemplates: {
      success: [
        "이제 어떻게 써야 할지 감이 와요.\n답을 문장으로 옮기기 쉬워졌어요.",
        "흐름이 생겨서 훨씬 덜 막막해졌어요."
      ]
    }
  },
  {
    id: "mathfear",
    name: "수학 공포 학생",
    requestTemplates: [
      "{task}만 보면 머리가 하얘져요...\n정말 기초부터 보여 주실 수 있을까요?",
      "수학은 시작이 제일 무서워요.\n{task}에서 어디부터 봐야 할지 도와주세요."
    ],
    reviewTemplates: {
      success: [
        "생각보다 덜 무서웠어요.\n어디서 시작해야 하는지 보여서 좋았어요.",
        "막막함이 줄었어요.\n이제 한 번은 손대 볼 수 있을 것 같아요."
      ]
    }
  }
];

export const achievements = [
  {
    id: "first-clear",
    title: "첫 해결",
    description: "의뢰를 1회 완료했습니다.",
    check: (state) => state.completeCount >= 1
  },
  {
    id: "three-clears",
    title: "꾸준한 Solver",
    description: "의뢰를 3회 완료했습니다.",
    check: (state) => state.completeCount >= 3
  },
  {
    id: "varied-clients",
    title: "평판의 시작",
    description: "서로 다른 Client 3명을 만났습니다.",
    check: (state) => state.metClientIds.size >= 3
  },
  {
    id: "five-clears",
    title: "신뢰 축적",
    description: "의뢰를 5회 완료했습니다.",
    check: (state) => state.completeCount >= 5
  }
];

export const marketClients = [
  {
    name: "새벽형 벼락치기",
    bio: "시험 직전 압축 정리를 선호해요. 빠르게 핵심만 보는 스타일을 좋아합니다."
  },
  {
    name: "개념파먹기",
    bio: "왜 그런지 설명해 주는 Solver를 자주 찾습니다. 구조화 설명 선호."
  },
  {
    name: "서술형공포증",
    bio: "답은 아는데 쓰질 못하겠어요. 문장 흐름을 잡아주는 타입을 찾고 있어요."
  },
  {
    name: "수학싫어하지만해야함",
    bio: "수학은 무섭지만 해야 해요. 시작점을 보여주는 Solver가 필요합니다."
  },
  {
    name: "오래기억하고싶다",
    bio: "외우는 것보다 기억에 남는 표현을 좋아해요. 감각적인 정리를 선호합니다."
  }
];

export const marketTrends = [
  "요즘은 개념 정리형 Solver를 찾는 Client가 많습니다.",
  "시험 기간이 가까워지며 벼락치기형 요청이 늘고 있습니다.",
  "서술형 흐름 정리를 잘해 주는 Solver가 주목받고 있습니다.",
  "수학 공포형 Client 사이에서 시작점을 잡아주는 설명이 인기를 얻고 있습니다."
];

export const socialLogTemplates = [
  "{name} 님의 후기에서 '핵심이 잘 보인다'는 반응이 늘고 있습니다.",
  "최근 시장에서 {name} 님 같은 구조화 설명형 Solver가 주목받고 있습니다.",
  "{name} 님의 작업이 Client 사이에서 안정적이라는 평가를 받고 있습니다.",
  "벼락치기형 Client 사이에서 {name} 님의 압축 정리 스타일이 언급되고 있습니다."
];
