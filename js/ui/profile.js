export function renderProfile({ profile, reviews }) {
  const reviewCount = reviews.length;

  const achievementsHtml = profile.achievements.length
    ? profile.achievements
        .map((achievement) => `<span class="chip">#${achievement}</span>`)
        .join("")
    : `<span class="chip">#업적 없음</span>`;

  return `
    <section class="panel">
      <div class="profile-card">
        <div class="profile-head">
          <div class="avatar-circle">${profile.solverName.charAt(0).toUpperCase()}</div>
          <div>
            <h2 class="profile-name">${profile.solverName}</h2>
            <p class="profile-bio">${profile.bio}</p>
          </div>
        </div>

        <div class="profile-stats">
          <div class="stat-box">
            <span class="stat-box__label">레벨</span>
            <strong class="stat-box__value">${profile.level}</strong>
          </div>
          <div class="stat-box">
            <span class="stat-box__label">XP</span>
            <strong class="stat-box__value">${profile.xp}</strong>
          </div>
          <div class="stat-box">
            <span class="stat-box__label">완료 수</span>
            <strong class="stat-box__value">${profile.completeCount}</strong>
          </div>
          <div class="stat-box">
            <span class="stat-box__label">후기 수</span>
            <strong class="stat-box__value">${reviewCount}</strong>
          </div>
        </div>

        <div class="field-group">
          <label class="field-label">대표 태그</label>
          <div class="chip-list">
            ${profile.tags.map((tag) => `<span class="chip">#${tag}</span>`).join("")}
          </div>
        </div>

        <div class="field-group">
          <label class="field-label">업적</label>
          <div class="chip-list">
            ${achievementsHtml}
          </div>
        </div>
      </div>
    </section>
  `;
}
