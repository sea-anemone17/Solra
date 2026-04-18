import { generateRequest } from "./request-generator.js";
import { generateReview } from "./review-generator.js";
import { getUnlockedAchievements } from "./achievements.js";
import {
  marketClients,
  marketTrends,
  socialLogTemplates
} from "./data.js";
import {
  renderRequest,
  renderReview,
  renderStatus,
  renderProfile,
  fillProfileEditor,
  setProfileEditorVisible,
  renderAchievements,
  renderLatestReview,
  renderMarketPreview,
  resetRequestCard,
  resetReviewCard
} from "./ui.js";

const questInput = document.getElementById("questInput");
const generateBtn = document.getElementById("generateBtn");
const completeBtn = document.getElementById("completeBtn");
const resetBtn = document.getElementById("resetBtn");

const editProfileBtn = document.getElementById("editProfileBtn");
const saveProfileBtn = document.getElementById("saveProfileBtn");
const cancelProfileBtn = document.getElementById("cancelProfileBtn");

const solverNameInput = document.getElementById("solverNameInput");
const solverBioInput = document.getElementById("solverBioInput");
const solverTagsInput = document.getElementById("solverTagsInput");

const state = {
  solverName: "Hazel",
  solverBio: "이해가 되는 설명을 지향합니다.",
  strongTags: ["개념 정리", "구조화", "시험 대비"],
  currentRequest: null,
  xp: 0,
  level: 1,
  completeCount: 0,
  metClientIds: new Set(),
  unlockedAchievementIds: new Set(),
  unlockedAchievements: [],
  recentReviews: [],
  socialLogs: [],
  isProfileEditing: false
};

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function pickRandomUnique(array, count) {
  const copied = [...array];
  const selected = [];

  while (copied.length > 0 && selected.length < count) {
    const randomIndex = Math.floor(Math.random() * copied.length);
    selected.push(copied.splice(randomIndex, 1)[0]);
  }

  return selected;
}

function updateLevel() {
  state.level = Math.floor(state.xp / 30) + 1;
}

function applyNewAchievements() {
  const newAchievements = getUnlockedAchievements(state);

  if (!newAchievements.length) return;

  newAchievements.forEach((achievement) => {
    state.unlockedAchievementIds.add(achievement.id);
    state.unlockedAchievements.push(achievement);
  });

  renderAchievements(state.unlockedAchievements);
}

function createSocialLog() {
  const template = pickRandom(socialLogTemplates);
  const log = template.replaceAll("{name}", state.solverName);
  state.socialLogs.unshift(log);

  if (state.socialLogs.length > 3) {
    state.socialLogs.pop();
  }
}

function refreshMarketPreview() {
  const selectedClients = pickRandomUnique(marketClients, 3);
  const selectedTrend = pickRandom(marketTrends);

  renderMarketPreview(selectedClients, selectedTrend, state.socialLogs);
}

function updateAllUI() {
  renderProfile(state);
  renderStatus(state);
  renderAchievements(state.unlockedAchievements);
  renderLatestReview(state.recentReviews[0] || "");
  refreshMarketPreview();
  setProfileEditorVisible(state.isProfileEditing);

  if (state.isProfileEditing) {
    fillProfileEditor(state);
  }
}

function openProfileEditor() {
  state.isProfileEditing = true;
  updateAllUI();
}

function closeProfileEditor() {
  state.isProfileEditing = false;
  updateAllUI();
}

function parseTags(inputText) {
  return inputText
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 3);
}

function saveProfile() {
  const nextName = solverNameInput.value.trim();
  const nextBio = solverBioInput.value.trim();
  const nextTags = parseTags(solverTagsInput.value.trim());

  if (!nextName) {
    alert("Solver 이름을 입력해 주세요.");
    return;
  }

  state.solverName = nextName;
  state.solverBio = nextBio || "소개가 아직 없습니다.";
  state.strongTags = nextTags.length ? nextTags : ["태그없음"];

  closeProfileEditor();
}

function resetAll() {
  state.solverName = "Hazel";
  state.solverBio = "이해가 되는 설명을 지향합니다.";
  state.strongTags = ["개념 정리", "구조화", "시험 대비"];
  state.currentRequest = null;
  state.xp = 0;
  state.level = 1;
  state.completeCount = 0;
  state.metClientIds = new Set();
  state.unlockedAchievementIds = new Set();
  state.unlockedAchievements = [];
  state.recentReviews = [];
  state.socialLogs = [];
  state.isProfileEditing = false;

  questInput.value = "";
  completeBtn.disabled = true;

  resetRequestCard();
  resetReviewCard();
  updateAllUI();
}

generateBtn.addEventListener("click", () => {
  const taskText = questInput.value.trim();

  if (!taskText) {
    alert("작업을 입력해 주세요.");
    return;
  }

  const request = generateRequest(taskText);
  state.currentRequest = request;
  state.metClientIds.add(request.clientId);

  renderRequest(request);
  renderStatus(state);
  completeBtn.disabled = false;
});

completeBtn.addEventListener("click", () => {
  if (!state.currentRequest) return;

  const review = generateReview(state.currentRequest.clientId);

  state.xp += review.xpGain;
  state.completeCount += 1;
  state.recentReviews.unshift(review.text);

  if (state.recentReviews.length > 3) {
    state.recentReviews.pop();
  }

  updateLevel();
  renderReview(review);
  applyNewAchievements();
  createSocialLog();

  state.currentRequest = null;
  completeBtn.disabled = true;

  updateAllUI();
});

resetBtn.addEventListener("click", () => {
  resetAll();
});

editProfileBtn.addEventListener("click", () => {
  openProfileEditor();
});

saveProfileBtn.addEventListener("click", () => {
  saveProfile();
});

cancelProfileBtn.addEventListener("click", () => {
  closeProfileEditor();
});

resetRequestCard();
resetReviewCard();
updateAllUI();
