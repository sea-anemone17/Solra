export function renderRequest(request) {
  const requestCard = document.getElementById("requestCard");

  requestCard.className = "message-card request";
  requestCard.innerHTML = `
    <span class="message-header">Client · ${request.clientName}</span>
    <div>${request.message.replaceAll("\n", "<br>")}</div>
  `;
}

export function renderReview(review) {
  const reviewCard = document.getElementById("reviewCard");

  reviewCard.className = "message-card review";
  reviewCard.innerHTML = `
    <span class="message-header">Review</span>
    <div>${review.text.replaceAll("\n", "<br>")}</div>
    <span class="review-bonus">+${review.xpGain} XP</span>
  `;
}

export function renderStatus(state) {
  document.getElementById("levelText").textContent = state.level;
  document.getElementById("xpText").textContent = state.xp;
  document.getElementById("completeCountText").textContent = state.completeCount;
  document.getElementById("metClientCountText").textContent = state.metClientIds.size;
  document.getElementById("achievementCountText").textContent = state.unlockedAchievements.length;

  document.getElementById("activityCompleteText").textContent = state.completeCount;
  document.getElementById("activityClientText").textContent = `${state.metClientIds.size}명`;
}

export function renderProfile(state) {
  document.getElementById("solverNameText").textContent = state.solverName;
  document.getElementById("solverBioText").textContent = state.solverBio;
  document.getElementById("avatarInitial").textContent = state.solverName.charAt(0).toUpperCase();

  const strongTagList = document.getElementById("strongTagList");
  strongTagList.innerHTML = state.strongTags
    .map((tag) => `<span class="tag-chip">#${tag}</span>`)
    .join("");
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

export function renderLatestReview(reviewText) {
  const latestReviewPreview = document.getElementById("latestReviewPreview");

  if (!reviewText) {
    latestReviewPreview.className = "preview-card empty";
    latestReviewPreview.textContent = "아직 대표 후기가 없습니다.";
    return;
  }

  latestReviewPreview.className = "preview-card";
  latestReviewPreview.innerHTML = reviewText.replaceAll("\n", "<br>");
}

export function renderMarketPreview(marketClients, trendText, socialLogs) {
  const marketClientList = document.getElementById("marketClientList");
  const marketTrendCard = document.getElementById("marketTrendCard");
  const socialLogList = document.getElementById("socialLogList");

  marketClientList.innerHTML = marketClients
    .map(
      (client) => `
        <div class="market-client-card">
          <strong>${client.name}</strong>
          <p>${client.bio}</p>
        </div>
      `
    )
    .join("");

  marketTrendCard.textContent = trendText;

  if (!socialLogs.length) {
    socialLogList.innerHTML = `<li class="social-log-item empty">아직 로그가 없습니다.</li>`;
    return;
  }

  socialLogList.innerHTML = socialLogs
    .map((log) => `<li class="social-log-item">${log}</li>`)
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
