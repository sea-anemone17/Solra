function renderProfileSummary(profile, reviews) {
  const recentReviews = reviews.slice(0, 3);

  return `
    <section class="panel profile-card">
      <div class="profile-head">
        <div class="avatar-circle">
          ${(profile.solverName || "S").slice(0, 1).toUpperCase()}
        </div>

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
          <span class="stat-box__label">완료</span>
          <strong class="stat-box__value">${profile.completeCount}</strong>
        </div>

        <div class="stat-box">
          <span class="stat-box__label">후기 수</span>
          <strong class="stat-box__value">${profile.reviewCount}</strong>
        </div>
      </div>

      <div class="chip-list">
        ${(profile.tags || []).map((tag) => `<span class="chip">#${tag}</span>`).join("")}
      </div>

      <div class="button-row">
        <button class="btn btn--secondary" data-action="open-profile-editor" type="button">
          프로필 수정
        </button>
      </div>

      ${
        recentReviews.length
          ? `
            <div class="detail-card">
              <h3>최근 후기</h3>
              ${recentReviews
                .map(
                  (review) => `
                    <div class="card">
                      <p class="muted">${review.body}</p>
                    </div>
                  `
                )
                .join("")}
            </div>
          `
          : ""
      }
    </section>
  `;
}

function renderProfileEditor(profileEditor) {
  if (!profileEditor?.isOpen) return "";

  return `
    <section class="panel">
      <div class="panel-header">
        <div class="panel-header__text">
          <p class="section-eyebrow">PROFILE EDIT</p>
          <h2 class="panel-title">프로필 수정</h2>
          <p class="panel-subtitle">솔버 이름, 소개, 태그를 수정합니다.</p>
        </div>
      </div>

      <div class="detail-card">
        <div class="field-group">
          <label class="field-label" for="profile-name-input">이름</label>
          <input
            id="profile-name-input"
            class="input"
            data-action="update-profile-name"
            type="text"
            value="${profileEditor.nameDraft || ""}"
            placeholder="예: Hazel"
          />
        </div>

        <div class="field-group">
          <label class="field-label" for="profile-bio-input">소개</label>
          <textarea
            id="profile-bio-input"
            class="textarea"
            data-action="update-profile-bio"
            placeholder="예: 이해가 되는 설명을 지향합니다."
          >${profileEditor.bioDraft || ""}</textarea>
        </div>

        <div class="field-group">
          <label class="field-label" for="profile-tags-input">태그 (쉼표로 구분)</label>
          <input
            id="profile-tags-input"
            class="input"
            data-action="update-profile-tags"
            type="text"
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
      </div>
    </section>
  `;
}

function renderTaskTypeEditor(taskTypeEditor) {
  return `
    <section class="panel">
      <div class="panel-header">
        <div class="panel-header__text">
          <p class="section-eyebrow">TASK TYPE</p>
          <h2 class="panel-title">새 Type 열기</h2>
          <p class="panel-subtitle">내가 받을 수 있는 Task Type을 직접 추가합니다.</p>
        </div>
      </div>

      <div class="detail-card">
        <div class="field-group">
          <label class="field-label" for="type-subject-input">과목</label>
          <select
            id="type-subject-input"
            class="input"
            data-action="update-type-subject"
          >
            ${[
              "국어",
              "수학",
              "영어",
              "사회탐구",
              "과학탐구",
              "한국사",
              "제2외국어",
              "기타"
            ]
              .map(
                (subject) => `
                  <option value="${subject}" ${taskTypeEditor.subjectDraft === subject ? "selected" : ""}>
                    ${subject}
                  </option>
                `
              )
              .join("")}
          </select>
        </div>

        <div class="field-group">
          <label class="field-label" for="type-name-input">Type 이름</label>
          <input
            id="type-name-input"
            class="input"
            data-action="update-type-name"
            type="text"
            value="${taskTypeEditor.nameDraft || ""}"
            placeholder="예: 준킬러 해설형"
          />
        </div>

        <div class="field-group">
          <label class="field-label" for="type-description-input">설명</label>
          <textarea
            id="type-description-input"
            class="textarea"
            data-action="update-type-description"
            placeholder="예: 막히는 문제 풀이 흐름을 단계별로 정리합니다."
          >${taskTypeEditor.descriptionDraft || ""}</textarea>
        </div>

        <div class="field-group">
          <label class="field-label" for="type-tags-input">태그 (쉼표로 구분)</label>
          <input
            id="type-tags-input"
            class="input"
            data-action="update-type-tags"
            type="text"
            value="${taskTypeEditor.tagsDraft || ""}"
            placeholder="예: 고2, 내신, 오답정리"
          />
        </div>

        <div class="button-row">
          <button class="btn btn--primary" data-action="create-task-type" type="button">
            Type 열기
          </button>
        </div>
      </div>
    </section>
  `;
}

function renderTaskTypeList(taskTypes) {
  return `
    <section class="panel">
      <div class="panel-header">
        <div class="panel-header__text">
          <p class="section-eyebrow">OPEN TYPES</p>
          <h2 class="panel-title">열린 Type</h2>
          <p class="panel-subtitle">현재 솔버가 열어 둔 Task Type 목록입니다.</p>
        </div>
      </div>

      <div class="detail-card">
        ${
          taskTypes.length
            ? taskTypes
                .map(
                  (type) => `
                    <div class="card">
                      <div class="list-item__title">
                        <strong>${type.name}</strong>
                        <span class="status-badge">${type.status}</span>
                      </div>

                      <p class="muted">${type.subject}</p>
                      <p class="muted">${type.description || "설명이 없습니다."}</p>

                      <div class="chip-list">
                        ${(type.tags || []).map((tag) => `<span class="chip">#${tag}</span>`).join("")}
                      </div>
                    </div>
                  `
                )
                .join("")
            : `
              <div class="empty-state">
                <p class="empty-state__title">아직 열린 Type이 없습니다</p>
                <p class="empty-state__text">위 폼에서 첫 Type을 열어 보세요.</p>
              </div>
            `
        }
      </div>
    </section>
  `;
}

export function renderProfile({
  profile,
  reviews,
  taskTypes,
  profileEditor,
  taskTypeEditor
}) {
  return `
    ${renderProfileSummary(profile, reviews)}
    ${renderProfileEditor(profileEditor)}
    ${renderTaskTypeEditor(taskTypeEditor)}
    ${renderTaskTypeList(taskTypes)}
  `;
}
