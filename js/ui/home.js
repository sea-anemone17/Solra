export function renderHome({
  subjects,
  currentSubject,
  taskTypes,
  currentTaskType,
  tagPool,
  selectedTags,
  draftInput
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
        >${draftInput}</textarea>
      </div>

      <div class="button-row">
        <button class="btn btn--primary" data-action="create-task" type="button">
          Task 생성
        </button>
      </div>
    </section>
  `;
}
