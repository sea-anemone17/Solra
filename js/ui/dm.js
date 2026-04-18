function sortByLatestDesc(items) {
  return [...items].sort((a, b) => {
    const aTime = new Date(a.deliveredAt || a.createdAt).getTime();
    const bTime = new Date(b.deliveredAt || b.createdAt).getTime();
    return bTime - aTime;
  });
}

function sortByCreatedAsc(items) {
  return [...items].sort((a, b) => {
    const aTime = new Date(a.createdAt).getTime();
    const bTime = new Date(b.createdAt).getTime();
    return aTime - bTime;
  });
}

function groupByClient(dmRequests) {
  const map = new Map();

  dmRequests.forEach((dm) => {
    if (!map.has(dm.clientName)) {
      map.set(dm.clientName, []);
    }
    map.get(dm.clientName).push(dm);
  });

  return Array.from(map.entries())
    .map(([clientName, tasks]) => {
      const sortedTasks = sortByLatestDesc(tasks);
      const latestTask = sortedTasks[0];

      let latestPreview = latestTask.requestText || "신청 메시지";
      if (latestTask.status === "completed") {
        latestPreview = "작업 완료";
      } else if (latestTask.savedWork) {
        latestPreview = "작업 중";
      }

      return {
        clientName,
        tasks: sortedTasks,
        latestTask,
        latestPreview,
        latestTime: latestTask.deliveredAt || latestTask.createdAt
      };
    })
    .sort((a, b) => {
      const aTime = new Date(a.latestTime).getTime();
      const bTime = new Date(b.latestTime).getTime();
      return bTime - aTime;
    });
}

function truncateText(text, maxLength = 34) {
  if (!text) return "";
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

function renderClientList(clientThreads, selectedClientName) {
  if (!clientThreads.length) {
    return `
      <div class="empty-state">
        <p class="empty-state__title">아직 대화방이 없습니다</p>
        <p class="empty-state__text">홈에서 Task를 생성하면 클라이언트 대화방이 생깁니다.</p>
      </div>
    `;
  }

  const itemsHtml = clientThreads
    .map((thread) => `
      <li
        class="list-item ${thread.clientName === selectedClientName ? "is-selected" : ""}"
        data-action="select-client"
        data-client-name="${thread.clientName}"
      >
        <div class="list-item__title">
          <strong>${thread.clientName}</strong>
          <span class="status-badge">${thread.latestTask.status}</span>
        </div>
        <p>${thread.latestTask.subject} · ${thread.latestTask.taskTypeName || thread.latestTask.taskType}</p>
        <p>${truncateText(thread.latestPreview)}</p>
      </li>
    `)
    .join("");

  return `<ul class="list">${itemsHtml}</ul>`;
}

function renderMessageBubble(type, title, body) {
  return `
    <div class="dm-message dm-message--${type}">
      <div class="dm-message__meta">${title}</div>
      <div class="dm-message__body">${body}</div>
    </div>
  `;
}

function renderAttachmentPreview(attachments) {
  if (!attachments || !attachments.length) return "";

  return `
    <div class="dm-attachments">
      ${attachments
        .map(
          (file) => `
            <img
              class="dm-attachment-image"
              src="${file.url}"
              alt="${file.name || "첨부 이미지"}"
            />
          `
        )
        .join("")}
    </div>
  `;
}

function renderThread(tasks, reviews) {
  if (!tasks.length) {
    return `
      <div class="empty-state">
        <p class="empty-state__title">선택된 대화가 없습니다</p>
        <p class="empty-state__text">왼쪽에서 클라이언트를 선택해 주세요.</p>
      </div>
    `;
  }

  const orderedTasks = sortByCreatedAsc(tasks);

  const messageHtml = orderedTasks
    .map((task) => {
      const taskTypeLabel = task.taskTypeName || task.taskType;
      const blocks = [];

      blocks.push(
        renderMessageBubble(
          "client",
          `Client · ${task.clientName}`,
          `<strong>${task.subject}</strong> · ${taskTypeLabel}<br><br>${task.requestText}`
        )
      );

      if (task.status === "completed") {
        blocks.push(
          renderMessageBubble(
            "solver",
            "Solver",
            `
              ${
                task.deliveredWork
                  ? `작업물을 전달했습니다.<br><br>${task.deliveredWork}`
                  : "작업물을 전달했습니다."
              }
              ${renderAttachmentPreview(task.attachments)}
            `
          )
        );

        const review = reviews.find((item) => item.taskId === task.id);
        if (review) {
          blocks.push(
            renderMessageBubble(
              "system",
              "후기 도착",
              review.body
            )
          );
        }
      }

      return `<div class="dm-thread-block">${blocks.join("")}</div>`;
    })
    .join("");

  return `<div class="dm-thread">${messageHtml}</div>`;
}

function getCurrentEditableTask(tasks) {
  const activeTasks = sortByLatestDesc(
    tasks.filter((task) => task.status !== "completed")
  );

  return activeTasks[0] || null;
}

function renderComposer(currentEditableTask) {
  if (!currentEditableTask) {
    return `
      <div class="empty-state">
        <p class="empty-state__title">진행 중인 Task가 없습니다</p>
        <p class="empty-state__text">이 대화방의 진행 중 Task를 모두 완료했습니다.</p>
      </div>
    `;
  }

  const attachmentPreviewHtml =
    currentEditableTask.attachments && currentEditableTask.attachments.length
      ? `
        <div class="dm-attachments">
          ${currentEditableTask.attachments
            .map(
              (file) => `
                <div class="dm-attachment-card">
                  <img
                    class="dm-attachment-image"
                    src="${file.url}"
                    alt="${file.name || "첨부 이미지"}"
                  />
                  <button
                    class="btn btn--ghost"
                    data-action="remove-attachment"
                    data-dm-id="${currentEditableTask.id}"
                    data-attachment-id="${file.id}"
                    type="button"
                  >
                    삭제
                  </button>
                </div>
              `
            )
            .join("")}
        </div>
      `
      : "";

  return `
    <section class="dm-composer">
      <div class="field-group">
        <label class="field-label" for="work-input">작업물 작성</label>
        <textarea
          id="work-input"
          class="textarea"
          data-action="update-work"
          data-dm-id="${currentEditableTask.id}"
          placeholder="풀이 메모, 설명 정리, 인증 내용을 입력해 주세요."
        >${currentEditableTask.savedWork || ""}</textarea>
      </div>

      <div class="field-group dm-upload-row">
        <label class="field-label" for="work-image-input">작업물 이미지</label>
        <input
          id="work-image-input"
          class="input"
          data-action="upload-work-image"
          data-dm-id="${currentEditableTask.id}"
          type="file"
          accept="image/*"
        />
      </div>

      ${
        attachmentPreviewHtml
          ? `
            <div class="field-group">
              <label class="field-label">첨부 미리보기</label>
              ${attachmentPreviewHtml}
            </div>
          `
          : ""
      }

      <div class="button-row">
        <button
          class="btn btn--secondary"
          data-action="save-work"
          data-dm-id="${currentEditableTask.id}"
          type="button"
        >
          임시 저장
        </button>
        <button
          class="btn btn--primary"
          data-action="deliver-work"
          data-dm-id="${currentEditableTask.id}"
          type="button"
        >
          작업물 전달
        </button>
      </div>
    </section>
  `;
}

export function renderDm({ dmRequests, selectedClientName, reviews }) {
  const clientThreads = groupByClient(dmRequests);

  const selectedThread =
    clientThreads.find((thread) => thread.clientName === selectedClientName) ||
    clientThreads[0] ||
    null;

  const selectedTasks = selectedThread ? selectedThread.tasks : [];
  const currentEditableTask = getCurrentEditableTask(selectedTasks);

  return `
    <section class="panel">
      <div class="panel-header">
        <div class="panel-header__text">
          <p class="section-eyebrow">DM</p>
          <h2 class="panel-title">Messages</h2>
          <p class="panel-subtitle">클라이언트별 대화방에서 Task를 확인하고 작업물을 전달하세요.</p>
        </div>
      </div>

      <div class="dm-shell">
        <div class="list-block">
          ${renderClientList(clientThreads, selectedThread?.clientName || null)}
        </div>

        <div class="detail-card">
          ${renderThread(selectedTasks, reviews)}
          ${renderComposer(currentEditableTask)}
        </div>
      </div>
    </section>
  `;
}
