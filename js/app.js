import { generateRequest } from "./request-generator.js";
import { generateReview } from "./review-generator.js";
import { renderRequest, renderReview, renderStatus } from "./ui.js";

const questInput = document.getElementById("questInput");
const generateBtn = document.getElementById("generateBtn");
const completeBtn = document.getElementById("completeBtn");

const state = {
  currentRequest: null,
  xp: 0,
  level: 1
};

function updateLevel() {
  state.level = Math.floor(state.xp / 30) + 1;
}

generateBtn.addEventListener("click", () => {
  const taskText = questInput.value.trim();

  if (!taskText) {
    alert("작업을 입력해 주세요.");
    return;
  }

  const request = generateRequest(taskText);
  state.currentRequest = request;

  renderRequest(request);
  completeBtn.disabled = false;
});

completeBtn.addEventListener("click", () => {
  if (!state.currentRequest) return;

  const review = generateReview(state.currentRequest.clientId);
  state.xp += review.xpGain;
  updateLevel();

  renderReview(review);
  renderStatus(state);

  state.currentRequest = null;
  completeBtn.disabled = true;
});

renderStatus(state);
