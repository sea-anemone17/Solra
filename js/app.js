import {
  SUBJECTS,
  TASK_TYPES,
  TAG_POOL,
  CLIENT_NAMES,
  REVIEW_TEMPLATES,
  NOTIFICATION_MESSAGES,
  DEFAULT_TASK_TYPES
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

function refreshProfileState() {
  state.profile.level = Math.floor(state.profile.xp / 30) + 1;
  state.profile.achievements = getAchievements(state.profile.completeCount);
}

function renderApp() {
  const taskTypes = TASK_TYPES[state.currentSubject] || [];
  const selectedDm = getSelectedDm();

  const homeHtml = renderHome({
    subjects: SUBJECTS,
    currentSubject: state.currentSubject,
    taskTypes,
    currentTaskType: state.currentTaskType,
    tagPool: TAG_POOL,
    selectedTags: state.selectedTags,
    draftInput: state.draftInput
  });

  const dmHtml = renderDm({
    dmRequests: state.dmRequests,
    selectedDmId: state.selectedDmId,
    selectedDm
  });

  const profileHtml = renderProfile({
    profile: state.profile,
    reviews: state.reviews
  });

  const notificationsHtml = renderNotifications({
    notifications: state.notifications,
    reviews: state.reviews
  });

  const app = document.getElementById("app");
  app.innerHTML = renderLayout({
    profileHtml,
    homeHtml,
    dmHtml,
    notificationsHtml
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
  state.draftInput = "";

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

  const workText = (dm.savedWork || "").trim();

  if (!workText) {
    alert("전달할 작업물을 입력해 주세요.");
    return;
  }

  state.dmRequests = deliverWork(state.dmRequests, dmId, workText);

  const deliveredDm = state.dmRequests.find((item) => item.id === dmId);
  const review = makeReview(deliveredDm, REVIEW_TEMPLATES);

  state.reviews.unshift(review);
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

  if (action === "change-subject") {
    const nextSubject = target.dataset.subject;
    state.currentSubject = nextSubject;
    state.currentTaskType = TASK_TYPES[nextSubject][0];
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
  }
}

function showError(err) {
  const app = document.getElementById("app");
  app.innerHTML = `
    <pre style="padding:16px; color:#b00020; white-space:pre-wrap; font-size:14px; line-height:1.5;">
${err && err.stack ? err.stack : err}
    </pre>
  `;
}

try {
  init();
} catch (err) {
  showError(err);
}
