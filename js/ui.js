export function renderRequest(request) {
  const requestCard = document.getElementById("requestCard");
  requestCard.textContent = `[Client: ${request.clientName}]\n\n${request.message}`;
}

export function renderReview(review) {
  const reviewCard = document.getElementById("reviewCard");
  reviewCard.textContent = `${review.text}\n\n+${review.xpGain} XP`;
}

export function renderStatus(state) {
  document.getElementById("xpText").textContent = state.xp;
  document.getElementById("levelText").textContent = state.level;
}
