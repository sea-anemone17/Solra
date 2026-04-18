import { state } from "./state.js";

import {
  SUBJECTS,
  TASK_TYPES,
  TAG_POOL,
  CLIENT_NAMES,
  REVIEW_TEMPLATES,
  NOTIFICATION_MESSAGES,
  DEFAULT_TASK_TYPES,
  MOCK_SOLVERS
} from "./data.js";

import { buildTask } from "./logic/task-builder.js";
import { addDm, saveWork, deliverWork } from "./logic/dm-actions.js";
import { makeReview } from "./logic/reviews.js";
import { getAchievements } from "./logic/achievements.js";

import { renderLayout } from "./ui/layout.js";
import { renderHome } from "./ui/home.js";
import { renderDm } from "./ui/dm.js";
import { renderProfile } from "./ui/profile.js";
import { renderNotifications } from "./ui/notifications.js";

function getSelectedDm() {
  return state.dmRequests.find((dm) => dm.id === state.selectedDmId) || null;
}

function pushNotification(title, body) {
  state.notifications.unshift({ title, body });

  if (state.notifications.length > 8) {
    state.notifications.pop();
  }
}

function createAttachmentId() {
  return `attachment-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

function refreshProfileState() {
  state.profile.level = Math.floor(state.profile.xp / 30) + 1;
  state.profile.achievements = getAchievements(state.profile.completeCount);
}

function getReviewTemplatePool(subject) {
  if (REVIEW_TEMPLATES[subject]) {
    return [...REVIEW_TEMPLATES[subject], ...REVIEW_TEMPLATES.common];
  }
  return REVIEW_TEMPLATES.common;
}

function renderCurrentPage() {
  if (state.currentPage === "home") {
    const taskTypes = TASK_TYPES[state.currentSubject] || [];
    const marketSolvers = MOCK_SOLVERS.filter(
      (solver) => solver.subject === state.currentSubject
    );

    const selectedMarketSolver =
      marketSolvers.find((solver) => solver.id === state.selectedMarketSolverId) ||
      marketSolvers[0] ||
      null;

    return renderHome({
      subjects: SUBJECTS,
      currentSubject: state.currentSubject,
      taskTypes,
      currentTaskType: state.currentTaskType,
      tagPool: TAG_POOL,
      selectedTags: state.selectedTags,
      draftInput: state.draftInput,
      marketSolvers,
      selectedMarketSolver
    });
  }

  if (state.currentPage === "dm") {
    return renderDm({
      dmRequests: state.dmRequests,
      selectedClientName: state.selectedClientName,
      reviews: state.reviews
    });
  }

  if (state.currentPage === "profile") {
    return renderProfile({
      profile: state.profile,
      reviews: state.reviews,
      taskTypes: state.taskTypes,
      profileEditor: state.profileEditor
    });
  }

  if (state.currentPage === "notifications") {
    return renderNotifications({
      notifications: state.notifications,
      reviews: state.reviews
    });
  }

  return `
    <section class="panel">
      <div class="empty-state">
        <p class="empty-state__title">페이지를 찾을 수 없습니다</p>
        <p class="empty-state__text">홈으로 돌아가 주세요.</p>
      </div>
    </section>
  `;
}

function renderApp() {
  const app = document.getElementById("app");

  const mainHtml = renderCurrentPage();

  app.innerHTML = renderLayout({
    currentPage: state.currentPage,
    mainHtml
  });
}

function handleCreateTask() {
  const text = state.draftInput.trim();

  if (!text) {
    alert("공부 내용을 입력해 주세요.");
    return;
  }

  const newTask = buildTask({
    subject: state.currentSubject,
    taskType: state.currentTaskType,
    tags: state.selectedTags,
    userInput: text,
    clientPool: CLIENT_NAMES[state.currentSubject]
  });

  state.dmRequests = addDm(state.dmRequests, newTask);
  state.selectedDmId = newTask.id;
  state.selectedClientName = newTask.clientName;
  state.draftInput = "";
  state.currentPage = "dm";

  pushNotification("새 Task 도착", NOTIFICATION_MESSAGES.taskCreated);
}

function handleSaveWork(dmId) {
  const dm = state.dmRequests.find((item) => item.id === dmId);

  if (!dm) return;

  state.dmRequests = saveWork(state.dmRequests, dmId, dm.savedWork || "");
  pushNotification("작업물 저장", NOTIFICATION_MESSAGES.workSaved);
}

function handleDeliverWork(dmId) {
  const dm = state.dmRequests.find((item) => item.id === dmId);

  if (!dm) return;
  if (dm.status === "completed") return;

  const alreadyReviewed = state.reviews.some((review) => review.taskId === dmId);
  if (alreadyReviewed) return;

  const workText = (dm.savedWork || "").trim();

  if (!workText) {
    alert("전달할 작업물을 입력해 주세요.");
    return;
  }

  state.dmRequests = deliverWork(state.dmRequests, dmId, workText);

  const deliveredDm = state.dmRequests.find((item) => item.id === dmId);
  const reviewTemplatePool = getReviewTemplatePool(deliveredDm.subject);
  const review = makeReview(deliveredDm, reviewTemplatePool);

  state.reviews.unshift(review);
  if (state.reviews.length > 10) {
    state.reviews.pop();
  }

  state.profile.reviewCount += 1;
  state.profile.xp += 10;
  state.profile.completeCount += 1;

  refreshProfileState();

  pushNotification("작업물 전달", NOTIFICATION_MESSAGES.workDelivered);
  pushNotification("후기 도착", NOTIFICATION_MESSAGES.reviewArrived);
}

function handleClick(event) {
  const target = event.target.closest("[data-action]");

  if (!target) return;

  const action = target.dataset.action;

  if (action === "go-page") {
    state.currentPage = target.dataset.page;
    renderApp();
    return;
  }

  if (action === "select-market-solver") {
    state.selectedMarketSolverId = target.dataset.solverId;
    renderApp();
    return;
  }

  if (action === "remove-attachment") {
    const dmId = target.dataset.dmId;
    const attachmentId = target.dataset.attachmentId;

    state.dmRequests = state.dmRequests.map((dm) => {
      if (dm.id !== dmId) return dm;

      return {
        ...dm,
        attachments: (dm.attachments || []).filter(
          (file) => file.id !== attachmentId
        )
      };
    });

    renderApp();
    return;
  }

  if (action === "change-subject") {
    const nextSubject = target.dataset.subject;
    state.currentSubject = nextSubject;
    state.currentTaskType = TASK_TYPES[nextSubject][0];

    const nextMarketSolvers = MOCK_SOLVERS.filter(
      (solver) => solver.subject === nextSubject
    );
    state.selectedMarketSolverId = nextMarketSolvers[0]?.id || null;

    renderApp();
    return;
  }

  if (action === "change-task-type") {
    state.currentTaskType = target.dataset.taskType;
    renderApp();
    return;
  }

  if (action === "toggle-tag") {
    const tag = target.dataset.tag;

    if (state.selectedTags.includes(tag)) {
      state.selectedTags = state.selectedTags.filter((item) => item !== tag);
    } else {
      state.selectedTags = [...state.selectedTags, tag];
    }

    renderApp();
    return;
  }

  if (action === "create-task") {
    handleCreateTask();
    renderApp();
    return;
  }

  if (action === "select-dm") {
    state.selectedDmId = target.dataset.dmId;
    renderApp();
    return;
  }

  if (action === "select-client") {
    state.selectedClientName = target.dataset.clientName;
    renderApp();
    return;
  }

  if (action === "save-work") {
    const dmId = target.dataset.dmId;
    handleSaveWork(dmId);
    renderApp();
    return;
  }

  if (action === "deliver-work") {
    const dmId = target.dataset.dmId;
    handleDeliverWork(dmId);
    renderApp();
    return;
  }

  if (action === "open-profile-editor") {
    state.profileEditor.isOpen = true;
    state.profileEditor.nameDraft = state.profile.solverName;
    state.profileEditor.bioDraft = state.profile.bio;
    state.profileEditor.tagsDraft = state.profile.tags.join(", ");
    renderApp();
    return;
  }

  if (action === "cancel-profile-edit") {
    state.profileEditor.isOpen = false;
    renderApp();
    return;
  }

  if (action === "save-profile") {
    const name = state.profileEditor.nameDraft.trim();
    const bio = state.profileEditor.bioDraft.trim();
    const tags = state.profileEditor.tagsDraft
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (!name) {
      alert("이름을 입력해 주세요.");
      return;
    }

    state.profile.solverName = name;
    state.profile.bio = bio || "소개가 없습니다.";
    state.profile.tags = tags;

    state.profileEditor.isOpen = false;
    renderApp();
    return;
  }
}

function handleInput(event) {
  const target = event.target;

  if (target.dataset.action === "update-draft") {
    state.draftInput = target.value;
    return;
  }

  if (target.dataset.action === "update-work") {
    const dmId = target.dataset.dmId;

    state.dmRequests = state.dmRequests.map((dm) => {
      if (dm.id !== dmId) return dm;

      return {
        ...dm,
        savedWork: target.value
      };
    });
    return;
  }

  if (target.dataset.action === "update-profile-name") {
    state.profileEditor.nameDraft = target.value;
    return;
  }

  if (target.dataset.action === "update-profile-bio") {
    state.profileEditor.bioDraft = target.value;
    return;
  }

  if (target.dataset.action === "update-profile-tags") {
    state.profileEditor.tagsDraft = target.value;
    return;
  }

  if (target.dataset.action === "upload-work-image") {
    const dmId = target.dataset.dmId;
    const file = target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      state.dmRequests = state.dmRequests.map((dm) => {
        if (dm.id !== dmId) return dm;

        const nextAttachments = Array.isArray(dm.attachments) ? [...dm.attachments] : [];

        nextAttachments.push({
          id: createAttachmentId(),
          name: file.name,
          url: reader.result
        });

        return {
          ...dm,
          attachments: nextAttachments
        };
      });

      renderApp();
    };

    reader.readAsDataURL(file);
  }
}

function init() {
  const app = document.getElementById("app");

  app.addEventListener("click", handleClick);
  app.addEventListener("input", handleInput);

  if (state.taskTypes.length === 0) {
    state.taskTypes = [...DEFAULT_TASK_TYPES];
  }

  if (!state.currentTaskType) {
    state.currentTaskType = TASK_TYPES[state.currentSubject][0];
  }

  if (!state.selectedMarketSolverId) {
    const initialMarketSolvers = MOCK_SOLVERS.filter(
      (solver) => solver.subject === state.currentSubject
    );
    state.selectedMarketSolverId = initialMarketSolvers[0]?.id || null;
  }

  refreshProfileState();
  renderApp();
}

init();
