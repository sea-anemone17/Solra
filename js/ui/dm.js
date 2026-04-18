function renderDmList(dmRequests, selectedDmId) {
  if (!dmRequests.length) {
    return `
      <div class="empty-state">
        <p class="empty-state__title">아직 들어온 Task가 없습니다</p>
        <p class="empty-state__text">홈에서 공부 내용을 입력하고 Task를 생성해 보세요.</p>
      </div>
    `;
  }

  const itemsHtml = dmRequests
    .map((dm) => {
      const tagText = dm.tags.map((tag) => `#${tag}`).join(" ");

      return `
        <li
          class="list-item ${dm.id === selectedDmId ? "is-selected" : ""}"
          data-action="select-dm"
          data-dm-id="${dm.id}"
        >
          <div class="list-item__title">
            <strong>${dm.clientName}</strong>
            <span class="status-badge">${dm.status}</span>
          </div>
          <p>${dm.subject} · ${dm.taskType}</p>
          <p>${tagText}</p>
        </li>
      `;
    })
    .join("");

  return `<ul class="list">${itemsHtml}</ul>`;
}

function renderDmDetail(selectedDm) {
  if (!selectedDm) {
    return `
      <div class="empty-state">
        <p class="empty-state__title">선택된 DM이 없습니다</p>
        <p class="empty-state__text">왼쪽 목록에서 Task를 선택해 주세요.</p>
      </div>
    `;
  }

  const tagText = selectedDm.tags.map((tag) => `#${tag}`).join(" ");

  return `
    <div class="detail-card">
      <div class="message-card">
        <div class="message-meta">Client · ${selectedDm.clientName}</div>
        <div><strong>${selectedDm.subject}</strong> · ${selectedDm.taskType}</div>
        <div>${tagText}</div>
        <br />
        <div>${selectedDm.requestText}</div>
      </div>

      <div class="field-group">
        <label class="field-label" for="work-input">작업물</label>
        <textarea
          id="work-input"
          class="textarea"
          data-action="update-work"
          data-dm-id="${selectedDm.id}"
          placeholder="풀이 메모, 설명 정리, 인증 내용을 입력해 주세요."
        >${selectedDm.savedWork || ""}</textarea>
      </div>

      <div class="button-row">
        <button
          class="btn btn--secondary"
          data-action="save-work"
          data-dm-id="${selectedDm.id}"
          type="button"
        >
          임시 저장
        </button>
        <button
          class="btn btn--primary"
          data-action="deliver-work"
          data-dm-id="${selectedDm.id}"
          type="button"
        >
          작업물 전달
        </button>
      </div>
    </div>
  `;
}

export function renderDm({ dmRequests, selectedDmId, selectedDm }) {
  return `
    <section class="panel">
      <div class="panel-header">
        <div class="panel-header__text">
          <p class="section-eyebrow">DM</p>
          <h2 class="panel-title">Task Inbox</h2>
          <p class="panel-subtitle">Client가 보낸 Task를 확인하고 작업물을 전달하세요.</p>
        </div>
      </div>

      <div class="dm-shell">
        <div class="list-block">
          ${renderDmList(dmRequests, selectedDmId)}
        </div>
        <div>
          ${renderDmDetail(selectedDm)}
        </div>
      </div>
    </section>
  `;
}
