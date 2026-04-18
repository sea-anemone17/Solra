import { getUnlockedAchievements } from "./achievements.js";
import {
  subjectTabs,
  commissionTypesBySubject,
  requestTagPool,
  clientsBySubject
} from "./data.js";
import {
  renderProfile,
  renderSubjectTabs,
  renderCommissionTypes,
  renderRequestTags,
  renderDmList,
  renderDmDetail,
  renderNotifications,
  renderAchievements,
  renderLatestReview,
  setSideTab
} from "./ui.js";

const generateBtn = document.getElementById("generateBtn");
const resetBtn = document.getElementById("resetBtn");
const workInput = document.getElementById("workInput");
const saveWorkBtn = document.getElementById("saveWorkBtn");
const submitWorkBtn = document.getElementById("submitWorkBtn");
const dmTabBtn = document.getElementById("dmTabBtn");
const notificationTabBtn = document.getElementById("notificationTabBtn");
const questInput = document.getElementById("questInput");

const state = {
  solverName: "Hazel",
  solverBio: "이해가 되는 설명을 지향합니다.",
  strongTags: ["고2 대상", "구조화", "시험 대비"],
  xp: 0,
  level: 1,
  completeCount: 0,
  unlockedAchievementIds: new Set(),
  unlockedAchievements: [],
  currentSubject: "수학",
  currentCommissionType: "문제 풀이",
  selectedTags: ["고2"],
  dmRequests: [],
  selectedDmId: null,
  notifications: [],
  recentReviews: [],
  sideMode: "dm"
};

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function createId() {
  return `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

function updateLevel() {
  state.level = Math.floor(state.xp / 30) + 1;
}

function pushNotification(title, body) {
  state.notifications.unshift({ title, body });

  if (state.notifications.length > 8) {
    state.notifications.pop();
  }
}

function createRequestMessage(subject, type, taskText) {
  return `${subject} 탭에서 '${type}' 유형 요청이 도착했습니다.\n${taskText} 작업을 부탁드릴게요.`;
}

function createClientName(subject) {
  return pickRandom(clientsBySubject[subject]);
}

function getSelectedDm() {
  return state.dmRequests.find((dm) => dm.id === state.selectedDmId) || null;
}

function applyNewAchievements() {
  const newAchievements = getUnlockedAchievements(state);

  if (!newAchievements.length) return;

  newAchievements.forEach((achievement) => {
    state.unlockedAchievementIds.add(achievement.id);
    state.unlockedAchievements.push(achievement);
    pushNotification("업적 해금", `${achievement.title} 업적이 해금되었습니다.`);
  });
}

function updateAllUI() {
  renderProfile(state);
  renderSubjectTabs(subjectTabs, state.currentSubject);
  renderCommissionTypes(
    commissionTypesBySubject[state.currentSubject],
    state.currentCommissionType
  );
  renderRequestTags(requestTagPool, state.selectedTags);
  renderDmList(state.dmRequests, state.selectedDmId);
  renderDmDetail(getSelectedDm());
  renderNotifications(state.notifications);
  renderAchievements(state.unlockedAchievements);
  renderLatestReview(state.recentReviews[0] || "");
  setSideTab(state.sideMode);
}

generateBtn.addEventListener("click", () => {
  const taskText = questInput.value.trim();

  if (!taskText) {
    alert("작업을 입력해 주세요.");
    return;
  }

  const newDm = {
    id: createId(),
    subject: state.currentSubject,
    commissionType: state.currentCommissionType,
    tags: [...state.selectedTags],
    clientName: createClientName(state.currentSubject),
    message: createRequestMessage(state.currentSubject, state.currentCommissionType, taskText),
    savedWork: "",
    isSubmitted: false
  };

  state.dmRequests.unshift(newDm);
  state.selectedDmId = newDm.id;

  pushNotification(
    "새 요청 도착",
    `${state.currentSubject} 탭에 새로운 DM 요청이 도착했습니다.`
  );

  questInput.value = "";
  state.sideMode = "dm";
  updateAllUI();
});

resetBtn.addEventListener("click", () => {
  state.currentSubject = "수학";
  state.currentCommissionType = commissionTypesBySubject["수학"][0];
  state.selectedTags = ["고2"];
  state.dmRequests = [];
  state.selectedDmId = null;
  state.notifications = [];
  state.recentReviews = [];
  state.xp = 0;
  state.level = 1;
  state.completeCount = 0;
  state.unlockedAchievementIds = new Set();
  state.unlockedAchievements = [];
  state.sideMode = "dm";
  questInput.value = "";
  workInput.value = "";
  updateAllUI();
});

saveWorkBtn.addEventListener("click", () => {
  const selectedDm = getSelectedDm();
  if (!selectedDm) return;

  selectedDm.savedWork = workInput.value.trim();

  pushNotification(
    "작업물 저장",
    `${selectedDm.subject} 요청의 작업물이 임시 저장되었습니다.`
  );

  updateAllUI();
});

submitWorkBtn.addEventListener("click", () => {
  const selectedDm = getSelectedDm();
  if (!selectedDm) return;

  const submittedText = workInput.value.trim();

  if (!submittedText) {
    alert("제출할 작업물을 입력해 주세요.");
    return;
  }

  selectedDm.savedWork = submittedText;
  selectedDm.isSubmitted = true;

  state.xp += 10;
  state.completeCount += 1;
  updateLevel();

  const reviewText = `작업물이 제출되었습니다.\n${selectedDm.subject} · ${selectedDm.commissionType} 요청에 대해 Client가 긍정적인 반응을 보였습니다.`;
  state.recentReviews.unshift(reviewText);

  if (state.recentReviews.length > 3) {
    state.recentReviews.pop();
  }

  pushNotification(
    "후기 도착",
    `${selectedDm.clientName} 님이 작업물에 대한 반응을 남겼습니다.`
  );

  applyNewAchievements();
  updateAllUI();
});

dmTabBtn.addEventListener("click", () => {
  state.sideMode = "dm";
  updateAllUI();
});

notificationTabBtn.addEventListener("click", () => {
  state.sideMode = "notification";
  updateAllUI();
});

document.addEventListener("click", (event) => {
  const subjectBtn = event.target.closest("[data-subject]");
  if (subjectBtn) {
    state.currentSubject = subjectBtn.dataset.subject;
    state.currentCommissionType = commissionTypesBySubject[state.currentSubject][0];
    updateAllUI();
    return;
  }

  const typeBtn = event.target.closest("[data-type]");
  if (typeBtn) {
    state.currentCommissionType = typeBtn.dataset.type;
    updateAllUI();
    return;
  }

  const tagBtn = event.target.closest("[data-tag]");
  if (tagBtn) {
    const tag = tagBtn.dataset.tag;

    if (state.selectedTags.includes(tag)) {
      state.selectedTags = state.selectedTags.filter((item) => item !== tag);
    } else {
      state.selectedTags = [...state.selectedTags, tag];
    }

    updateAllUI();
    return;
  }

  const dmItem = event.target.closest("[data-dm-id]");
  if (dmItem) {
    state.selectedDmId = dmItem.dataset.dmId;
    updateAllUI();
  }
});

workInput.addEventListener("input", () => {
  const selectedDm = getSelectedDm();
  if (!selectedDm) return;
  selectedDm.savedWork = workInput.value;
});

state.currentCommissionType = commissionTypesBySubject[state.currentSubject][0];
updateAllUI();
