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
      "{task}를 그냥 외우는 게 아니라 이해하고 싶어요.\n구조적으로 정리해 주실 수 있나요?"
    ],
    reviewTemplates: {
      success: [
        "이제야 구조가 보이네요.\n왜 그런지 이해됐어요."
      ]
    }
  }
];
