function renderMarketCards(marketSolvers, selectedMarketSolver) {
  if (!marketSolvers.length) {
    return `
      <div class="empty-state">
        <p class="empty-state__title">해당 과목의 Solver가 없습니다</p>
        <p class="empty-state__text">다른 과목 탭을 눌러 보세요.</p>
      </div>
    `;
  }

  return `
    <div class="list-block">
      ${marketSolvers
        .map(
          (solver) => `
            <button
              class="card market-card ${selectedMarketSolver?.id === solver.id ? "is-selected" : ""}"
              data-action="select-market-solver"
              data-solver-id="${solver.id}"
              type="button"
            >
              <strong>${solver.name}</strong>
              <p class="muted">${solver.achievementLine}</p>
              <p class="muted">${solver.bio}</p>
              <div class="chip-list">
                ${solver.tags.map((tag) => `<span class="chip">#${tag}</span>`).join("")}
              </div>
              <p class="muted">후기 ${solver.reviewCount}개</p>
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function renderMarketDetail(selectedMarketSolver) {
  if (!selectedMarketSolver) {
    return `
      <div class="empty-state">
        <p class="empty-state__title">선택된 Solver가 없습니다</p>
        <p class="empty-state__text">왼쪽 카드에서 Solver를 선택해 주세요.</p>
      </div>
    `;
  }

  const taskTypeHtml = selectedMarketSolver.taskTypes
    .map(
      (taskType) => `
        <div class="card">
          <strong>${taskType.name}</strong>
          <p class="muted">${taskType.description}</p>
        </div>
      `
    )
    .join("");

  const reviewHtml = selectedMarketSolver.sampleReviews
    .map((review) => `<div class="card"><p class="muted">${review}</p></div>`)
    .join("");

  return `
    <div class="detail-card">
      <div class="card">
        <strong>${selectedMarketSolver.name}</strong>
        <p class="muted">${selectedMarketSolver.achievementLine}</p>
        <p class="muted">${selectedMarketSolver.bio}</p>

        <div class="chip-list">
          ${selectedMarketSolver.tags.map((tag) => `<span class="chip">#${tag}</span>`).join("")}
        </div>

        <p class="muted">총 후기 수 ${selectedMarketSolver.reviewCount}</p>
      </div>

      <div class="field-group">
        <label class="field-label">열린 Task Type</label>
        <div class="list-block">
          ${taskTypeHtml}
        </div>
      </div>

      <div class="field-group">
        <label class="field-label">샘플 후기</label>
        <div class="list-block">
          ${reviewHtml}
        </div>
      </div>
    </div>
  `;
}

export function renderHome({
  subjects,
  currentSubject,
  taskTypes,
  currentTaskType,
  tagPool,
  selectedTags,
  draftInput,
  marketSolvers,
  selectedMarketSolver
}) {
  const subjectTabsHtml = subjects
    .map(
      (subject) => `
        <button
          class="subject-tab ${subject === currentSubject ? "is-active" : ""}"
          data-action="change-subject"
          data-subject="${subject}"
          type="button"
        >
          ${subject}
        </button>
      `
    )
    .join("");

  const taskTypesHtml = taskTypes
    .map(
      (taskType) => `
        <button
          class="chip ${taskType === currentTaskType ? "is-active" : ""}"
          data-action="change-task-type"
          data-task-type="${taskType}"
          type="button"
        >
          ${taskType}
        </button>
      `
    )
    .join("");

  const tagsHtml = tagPool
    .map(
      (tag) => `
        <button
          class="chip ${selectedTags.includes(tag) ? "is-active" : ""}"
          data-action="toggle-tag"
          data-tag="${tag}"
          type="button"
        >
          #${tag}
        </button>
      `
    )
    .join("");

  return `
    <section class="panel">
      <div class="panel-header">
        <div class="panel-header__text">
          <p class="section-eyebrow">TASK BUILDER</p>
          <h2 class="panel-title">Task 만들기</h2>
          <p class="panel-subtitle">실제로 해야 할 공부를 입력하면 Client Task로 변환됩니다.</p>
        </div>
      </div>

      <div class="field-group">
        <label class="field-label">과목</label>
        <div class="subject-tabs">
          ${subjectTabsHtml}
        </div>
      </div>

      <div class="field-group">
        <label class="field-label">Task Type</label>
        <div class="chip-list">
          ${taskTypesHtml}
        </div>
      </div>

      <div class="field-group">
        <label class="field-label">태그</label>
        <div class="chip-list">
          ${tagsHtml}
        </div>
      </div>

      <div class="field-group">
        <label class="field-label" for="task-input">공부 내용</label>
        <textarea
          id="task-input"
          class="textarea"
          data-action="update-draft"
          placeholder="예: 수열 3문제 풀기 / 영단어 20개 외우기 / 개념 비교 정리"
        >${draftInput || ""}</textarea>
      </div>

      <div class="button-row">
        <button
          class="btn btn--primary"
          data-action="create-task"
          type="button"
        >
          Task 생성
        </button>
      </div>
    </section>

    <section class="panel">
      <div class="panel-header">
        <div class="panel-header__text">
          <p class="section-eyebrow">SOLVER MARKET</p>
          <h2 class="panel-title">${currentSubject} Solver들</h2>
          <p class="panel-subtitle">현재 과목에서 활동 중인 Solver들을 둘러보세요.</p>
        </div>
      </div>

      <div class="dm-shell">
        <div class="list-block">
          ${renderMarketCards(marketSolvers, selectedMarketSolver)}
        </div>

        <div>
          ${renderMarketDetail(selectedMarketSolver)}
        </div>
      </div>
    </section>
  `;
}
