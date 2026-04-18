export function renderRequest(request) {
  const requestCard = document.getElementById("requestCard");

  requestCard.classList.remove("empty", "review");
  requestCard.classList.add("request");

  requestCard.innerHTML = `
    <span class="message-header">Client · ${request.clientName}</span>
    <div>${request.message.replaceAll("\n", "<br>")}</div>
  `;
}

export function renderReview(review) {
  const reviewCard = document.getElementById("reviewCard");

  reviewCard.classList.remove("empty", "request");
  reviewCard.classList.add("review");

  reviewCard.innerHTML = `
    <span class="message-header">Review</span>
    <div>${review.text.replaceAll("\n", "<br>")}</div>
    <span class="review-bonus">+${review.xpGain} XP</span>
  `;
}

export function renderStatus(state) {
  document.getElementById("xpText").textContent = state.xp;
  document.getElementById("levelText").textContent = state.level;
  document.getElementById("completeCountText").textContent = state.completeCount;
}

export function renderAchievements(unlockedAchievements) {
  const list = document.getElementById("achievementList");

  if (!unlockedAchievements.length) {
    list.innerHTML = `<li class="achievement-item locked">아직 해금된 업적이 없습니다.</li>`;
    return;
  }

  list.innerHTML = unlockedAchievements
    .map(
      (achievement) => `
        <li class="achievement-item unlocked">
          <strong>${achievement.title}</strong>
          <span>${achievement.description}</span>
        </li>
      `
    )
    .join("");
}

export function resetRequestCard() {
  const requestCard = document.getElementById("requestCard");
  requestCard.className = "message-card empty";
  requestCard.textContent = "아직 도착한 의뢰가 없습니다.";
}

export function resetReviewCard() {
  const reviewCard = document.getElementById("reviewCard");
  reviewCard.className = "message-card empty";
  reviewCard.textContent = "아직 후기가 없습니다.";
}
