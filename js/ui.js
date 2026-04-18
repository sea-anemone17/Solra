export function renderProfile(state) {
  document.getElementById("solverNameText").textContent = state.solverName;
  document.getElementById("solverBioText").textContent = state.solverBio;
  document.getElementById("avatarInitial").textContent = state.solverName.charAt(0).toUpperCase();

  document.getElementById("levelText").textContent = state.level;
  document.getElementById("xpText").textContent = state.xp;
  document.getElementById("completeCountText").textContent = state.completeCount;
  document.getElementById("achievementCountText").textContent = state.unlockedAchievements.length;

  const strongTagList = document.getElementById("strongTagList");
  strongTagList.innerHTML = state.strongTags
    .map((tag) => `<span class="tag-chip">#${tag}</span>`)
    .join("");
}

export function renderSubjectTabs(subjectTabs, currentSubject) {
  const tabBar = document.getElementById("subjectTabBar");

  tabBar.innerHTML = subjectTabs
    .map(
      (subject) => `
        <button
          class="subject-tab-btn ${subject === currentSubject ? "active" : ""}"
          data-subject="${subject}"
          type="button"
        >
          ${subject}
        </button>
      `
    )
    .join("");

  document.getElementById("currentSubjectTitle").textContent = `${currentSubject} 요청 만들기`;
}

export function renderCommissionTypes(types, selectedType) {
  const list = document.getElementById("commissionTypeList");

  list.innerHTML = types
    .map(
      (type) => `
        <button
          class="chip-btn ${type === selectedType ? "active" : ""}"
          data-type="${type}"
          type="button"
        >
          ${type}
        </button>
      `
    )
    .join("");
}

export function renderRequestTags(tagPool, selectedTags) {
  const list = document.getElementById("requestTagList");

  list.innerHTML = tagPool
    .map(
      (tag) => `
        <button
          class="chip-btn ${selectedTags.includes(tag) ? "active" : ""}"
          data-tag="${tag}"
          type="button"
        >
          #${tag}
        </button>
      `
    )
    .join("");
}

export function renderDmList(dmRequests, selectedDmId) {
  const dmList = document.getElementById("dmList");

  if (!dmRequests.length) {
    dmList.innerHTML = `<li class="side-list-item empty">아직 요청이 없습니다.</li>`;
    return;
  }

  dmList.innerHTML = dmRequests
    .map((dm) => {
      const tags = dm.tags.map((tag) => `#${tag}`).join(" ");
      return `
        <li class="side-list-item ${dm.id === selectedDmId ? "selected" : ""}" data-dm-id="${dm.id}">
          <div class="dm-item-title">
            <strong>${dm.clientName}</strong>
            ${dm.isSubmitted ? `<span class="dm-badge">제출완료</span>` : `<span class="dm-badge">새 요청</span>`}
          </div>
          <p>${dm.subject} · ${dm.commissionType}</p>
          <p>${tags}</p>
        </li>
      `;
    })
    .join("");
}

export function renderDmDetail(selectedDm) {
  const card = document.getElementById("dmDetailCard");
  const workInput = document.getElementById("workInput");
  const saveBtn = document.getElementById("saveWorkBtn");
  const submitBtn = document.getElementById("submitWorkBtn");

  if (!selectedDm) {
    card.className = "message-card empty";
    card.textContent = "아직 선택된 요청이 없습니다.";
    workInput.value = "";
    workInput.disabled = true;
    saveBtn.disabled = true;
    submitBtn.disabled = true;
    return;
  }

  const tagText = selectedDm.tags.map((tag) => `#${tag}`).join(" ");

  card.className = "message-card";
  card.innerHTML = `
    <span class="message-header">Client · ${selectedDm.clientName}</span>
    <div><strong>${selectedDm.subject}</strong> · ${selectedDm.commissionType}</div>
    <div>${tagText}</div>
    <br />
    <div>${selectedDm.message.replaceAll("\n", "<br>")}</div>
  `;

  workInput.disabled = false;
  workInput.value = selectedDm.savedWork || "";
  saveBtn.disabled = false;
  submitBtn.disabled = false;
}

export function renderNotifications(notifications) {
  const list = document.getElementById("notificationList");
  const badge = document.getElementById("notificationCount");

  badge.textContent = notifications.length;

  if (!notifications.length) {
    list.innerHTML = `<li class="side-list-item empty">아직 알림이 없습니다.</li>`;
    return;
  }

  list.innerHTML = notifications
    .map(
      (notification) => `
        <li class="side-list-item">
          <strong>${notification.title}</strong>
          <p>${notification.body}</p>
        </li>
      `
    )
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

export function setSideTab(mode) {
  const dmPanel = document.getElementById("dmPanel");
  const notificationPanel = document.getElementById("notificationPanel");
  const dmBtn = document.getElementById("dmTabBtn");
  const notificationBtn = document.getElementById("notificationTabBtn");

  const isDm = mode === "dm";

  dmPanel.classList.toggle("hidden-panel", !isDm);
  dmPanel.classList.toggle("active-panel", isDm);

  notificationPanel.classList.toggle("hidden-panel", isDm);
  notificationPanel.classList.toggle("active-panel", !isDm);

  dmBtn.classList.toggle("active", isDm);
  notificationBtn.classList.toggle("active", !isDm);
}

export function renderCreatorCards(creators, selectedCreatorId) {
  const list = document.getElementById("creatorCardList");

  if (!creators.length) {
    list.innerHTML = `<div class="creator-card empty">아직 표시할 커미션주가 없습니다.</div>`;
    return;
  }

  list.innerHTML = creators
    .map(
      (creator) => `
        <div class="creator-card ${creator.id === selectedCreatorId ? "selected" : ""}" data-creator-id="${creator.id}">
          <div class="creator-name-row">
            <strong>${creator.name}</strong>
            <span class="bump-badge">${creator.bump}</span>
          </div>
          <p>${creator.bio}</p>
          <div class="chip-list">
            ${creator.tags.map((tag) => `<span class="tag-chip">#${tag}</span>`).join("")}
          </div>
          <div class="creator-meta">${creator.record}</div>
        </div>
      `
    )
    .join("");
}

export function renderCreatorDetail(creator) {
  const detail = document.getElementById("creatorProfileDetail");

  if (!creator) {
    detail.className = "creator-profile-detail empty";
    detail.textContent = "아직 선택된 커미션주가 없습니다.";
    return;
  }

  detail.className = "creator-profile-detail";
  detail.innerHTML = `
    <div class="detail-title">
      <strong>${creator.name}</strong>
      <span class="bump-badge">${creator.bump}</span>
    </div>
    <div>${creator.bio}</div>

    <div class="detail-block">
      <span class="detail-label">대표 태그</span>
      <div class="detail-chips">
        ${creator.tags.map((tag) => `<span class="tag-chip">#${tag}</span>`).join("")}
      </div>
    </div>

    <div class="detail-block">
      <span class="detail-label">대표 커미션 타입</span>
      <div>${creator.specialty}</div>
    </div>

    <div class="detail-block">
      <span class="detail-label">이력</span>
      <div>${creator.record}</div>
    </div>

    <div class="detail-block">
      <span class="detail-label">최근 활동</span>
      <div>${creator.recent}</div>
    </div>

    <div class="detail-block">
      <span class="detail-label">후기 분위기</span>
      <div>${creator.review}</div>
    </div>
  `;
}
