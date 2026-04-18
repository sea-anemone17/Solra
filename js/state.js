export const state = {
  currentPage: "home",

  currentSubject: "수학",
  currentTaskType: "문제 풀이",
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
    achievements: []
  }
};
