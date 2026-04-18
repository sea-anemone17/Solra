export const state = {
  currentPage: "home",

  currentSubject: "수학",
  currentTaskTypeId: null,
  selectedTags: ["고2"],

  draftInput: "",

  dmRequests: [],
  selectedDmId: null,

  notifications: [],
  reviews: [],

  profile: {
    solverName: "Hazel",
    bio: "이해가 되는 설명을 지향합니다.",
    tags: ["고2 대상", "구조화", "시험 대비"],
    level: 1,
    xp: 0,
    completeCount: 0,
    reviewCount: 0,
    achievements: []
  },

  taskTypes: [
    // 기본 예시
    // {
    //   id: "math-problem-1",
    //   subject: "수학",
    //   name: "문제 풀이형",
    //   description: "문제 풀이 과정을 단계별로 정리합니다.",
    //   tags: ["고2", "내신", "오답정리"],
    //   status: "open"
    // }
  ]
};
