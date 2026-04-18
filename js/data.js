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
  }
];
