import { generateRequest } from "./request-generator.js";
import { generateReview } from "./review-generator.js";
import {
  renderRequest,
  renderReview,
  renderStatus,
  renderAchievements,
  resetRequestCard,
  resetReviewCard
} from "./ui.js";
import { getUnlockedAchievements } from "./achievements.js";

const questInput = document.getElementById("questInput");
const generateBtn = document.getElementById("generateBtn");
const completeBtn = document.getElementById("completeBtn");
const resetBtn = document.getElementById("resetBtn");

const state = {
  currentRequest: null,
  xp: 0,
  level: 1,
  completeCount: 0,
  metClientIds: new Set(),
  unlockedAchievementIds: new Set(),
  unlockedAchievements: []
};

function updateLevel() {
  state.level = Math.floor(state.xp / 30) + 1;
}

function applyNewAchievements() {
  const newAchievements = getUnlockedAchievements(state);

  if (!newAchievements.length) {
    return;
  }

  newAchievements.forEach((achievement) => {
    state.unlockedAchievementIds.add(achievement.id);
    state.unlockedAchievements.push(achievement);
  });

  renderAchievements(state.unlockedAchievements);
}

function resetAll() {
  state.currentRequest = null;
  state.xp = 0;
  state.level = 1;
  state.completeCount = 0;
  state.metClientIds = new Set();
  state.unlockedAchievementIds = new Set();
  state.unlockedAchievements = [];

  questInput.value = "";
  completeBtn.disabled = true;

  resetRequestCard();
  resetReviewCard();
  renderStatus(state);
  renderAchievements(state.unlockedAchievements);
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
  completeBtn.disabled = false;
});

completeBtn.addEventListener("click", () => {
  if (!state.currentRequest) return;

  const review = generateReview(state.currentRequest.clientId);

  state.xp += review.xpGain;
  state.completeCount += 1;

  updateLevel();
  renderReview(review);
  renderStatus(state);

  applyNewAchievements();

  state.currentRequest = null;
  completeBtn.disabled = true;
});

resetBtn.addEventListener("click", () => {
  resetAll();
});

renderStatus(state);
renderAchievements(state.unlockedAchievements);
