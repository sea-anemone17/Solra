function renderNotificationList(notifications) {
  if (!notifications.length) {
    return `
      <div class="empty-state">
        <p class="empty-state__title">아직 알림이 없습니다</p>
        <p class="empty-state__text">Task를 만들고 작업을 진행하면 알림이 쌓입니다.</p>
      </div>
    `;
  }

  const itemsHtml = notifications
    .map(
      (notice) => `
        <li class="notice-item">
          <strong>${notice.title}</strong>
          <p>${notice.body}</p>
        </li>
      `
    )
    .join("");

  return `<ul class="notice-list">${itemsHtml}</ul>`;
}

function renderRecentReviews(reviews) {
  if (!reviews.length) {
    return `
      <div class="empty-state">
        <p class="empty-state__title">아직 후기가 없습니다</p>
        <p class="empty-state__text">작업물을 전달하면 후기가 생성됩니다.</p>
      </div>
    `;
  }

  const itemsHtml = reviews
    .slice(0, 3)
    .map(
      (review) => `
        <li class="review-item">
          <strong>${review.title}</strong>
          <p>${review.body}</p>
        </li>
      `
    )
    .join("");

  return `<ul class="review-list">${itemsHtml}</ul>`;
}

export function renderNotifications({ notifications, reviews }) {
  return `
    <section class="panel">
      <div class="panel-header">
        <div class="panel-header__text">
          <p class="section-eyebrow">NOTIFICATIONS</p>
          <h2 class="panel-title">알림</h2>
          <p class="panel-subtitle">Task 상태 변화와 시스템 알림이 모입니다.</p>
        </div>
      </div>

      ${renderNotificationList(notifications)}
    </section>

    <section class="panel">
      <div class="panel-header">
        <div class="panel-header__text">
          <p class="section-eyebrow">REVIEWS</p>
          <h2 class="panel-title">최근 후기</h2>
          <p class="panel-subtitle">전달된 작업물에 대한 최근 반응입니다.</p>
        </div>
      </div>

      ${renderRecentReviews(reviews)}
    </section>
  `;
}
