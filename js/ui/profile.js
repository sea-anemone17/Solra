export function renderProfile({ profile, reviews, taskTypes, profileEditor }) {
  const reviewCount = profile.reviewCount || reviews.length;

  const achievementsHtml = profile.achievements.length
    ? profile.achievements
        .map((achievement) => `<span class="chip">#${achievement}</span>`)
        .join("")
    : `<span class="chip">#업적 없음</span>`;

  const tagsHtml = profile.tags.length
    ? profile.tags.map((tag) => `<span class="chip">#${tag}</span>`).join("")
    : `<span class="chip">#태그 없음</span>`;

  const taskTypesHtml = taskTypes.length
    ? taskTypes
        .map(
          (taskType) => `
            <div class="card">
              <strong>${taskType.name}</strong>
              <p class="muted">${taskType.subject} · ${taskType.status}</p>
              <p class="muted">${taskType.description}</p>
            </div>
          `
        )
        .join("")
    : `
      <div class="empty-state">
        <p class="empty-state__title">열린 Task Type이 없습니다</p>
        <p class="empty-state__text">다음 단계에서 Task Type을 열 수 있습니다.</p>
      </div>
    `;

  const editorHtml = profileEditor.isOpen
    ? `
      <section class="panel">
        <div class="panel-header">
          <div class="panel-header__text">
            <p class="section-eyebrow">EDIT PROFILE</p>
            <h2 class="panel-title">프로필 수정</h2>
            <p class="panel-subtitle">이름, 소개, 대표 태그를 수정하세요.</p>
          </div>
        </div>

        <div class="field-group">
          <label class="field-label" for="profile-name-input">이름</label>
          <input
            id="profile-name-input"
            class="input"
            data-action="update-profile-name"
            value="${profileEditor.nameDraft || ""}"
            placeholder="Solver 이름"
          />
        </div>

        <div class="field-group">
          <label class="field-label" for="profile-bio-input">소개</label>
          <textarea
            id="profile-bio-input"
            class="textarea"
            data-action="update-profile-bio"
            placeholder="한 줄 소개"
          >${profileEditor.bioDraft || ""}</textarea>
        </div>

        <div class="field-group">
          <label class="field-label" for="profile-tags-input">대표 태그</label>
          <input
            id="profile-tags-input"
            class="input"
            data-action="update-profile-tags"
            value="${profileEditor.tagsDraft || ""}"
            placeholder="예: 고2 대상, 구조화, 시험 대비"
          />
        </div>

        <div class="button-row">
          <button class="btn btn--primary" data-action="save-profile" type="button">
            저장
          </button>
          <button class="btn btn--ghost" data-action="cancel-profile-edit" type="button">
            취소
          </button>
        </div>
      </section>
    `
    : `
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
              <span class="stat-box__label">총 후기 수</span>
              <strong class="stat-box__value">${reviewCount}</strong>
            </div>
          </div>

          <div class="field-group">
            <label class="field-label">대표 태그</label>
            <div class="chip-list">
              ${tagsHtml}
            </div>
          </div>

          <div class="field-group">
            <label class="field-label">업적</label>
            <div class="chip-list">
              ${achievementsHtml}
            </div>
          </div>

          <div class="button-row">
            <button class="btn btn--secondary" data-action="open-profile-editor" type="button">
              프로필 수정
            </button>
          </div>
        </div>
      </section>
    `;

  return `
    ${editorHtml}

    <section class="panel">
      <div class="panel-header">
        <div class="panel-header__text">
          <p class="section-eyebrow">TASK TYPES</p>
          <h2 class="panel-title">내 Task Type</h2>
          <p class="panel-subtitle">현재 열어 둔 작업 타입입니다.</p>
        </div>
      </div>

      <div class="list-block">
        ${taskTypesHtml}
      </div>
    </section>
  `;
}
