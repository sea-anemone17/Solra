import { state } from "./state.js";

import {
  SUBJECTS,
  TAG_POOL,
  REVIEW_TEMPLATES,
  NOTIFICATION_MESSAGES,
  DEFAULT_TASK_TYPES,
  MOCK_SOLVERS
} from "./data.js";

import { getAchievements } from "./logic/achievements.js";
import { loadProfile } from "./sync.js";

import {
  refreshAuthUser,
  handleSignUp,
  handleSignIn,
  handleSignOut
} from "./controllers/auth-controller.js";

import {
  getAvailableTaskTypes,
  getSelectedTaskType,
  handleChangeSubject,
  handleToggleTag,
  handleCreateTask
} from "./controllers/home-controller.js";

import {
  openProfileEditor,
  cancelProfileEdit,
  handleSaveProfile
} from "./controllers/profile-controller.js";

import {
  createAttachmentId,
  handleRemoveAttachment,
  handleSaveWork,
  handleDeliverWork
} from "./controllers/dm-controller.js";

import {
  resetTaskTypeEditor,
  handleEditTaskType,
  handleToggleTaskTypeStatus,
  handleDeleteTaskType,
  handleCreateTaskType
} from "./controllers/task-type-controller.js";

import { renderLayout } from "./ui/layout.js";
import { renderHome } from "./ui/home.js";
import { renderDm } from "./ui/dm.js";
import { renderProfile } from "./ui/profile.js";
import { renderNotifications } from "./ui/notifications.js";
import { renderAuthPanel } from "./ui/auth-panel.js";

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

function renderCurrentPage() {
  if (state.currentPage === "home") {
    const availableTaskTypes = getAvailableTaskTypes(state);
    const selectedTaskType = getSelectedTaskType(state, availableTaskTypes);

    if (!state.selectedTaskTypeId && selectedTaskType) {
      state.selectedTaskTypeId = selectedTaskType.id;
    }

    const marketSolvers = MOCK_SOLVERS.filter(
      (solver) => solver.subject === state.currentSubject
    );

    const selectedMarketSolver =
      marketSolvers.find((solver) => solver.id === state.selectedMarketSolverId) ||
      marketSolvers[0] ||
      null;

    const authHtml = renderAuthPanel({
      auth: state.auth
    });

    const homeHtml = renderHome({
      subjects: SUBJECTS,
      currentSubject: state.currentSubject,
      availableTaskTypes,
      selectedTaskType,
      tagPool: TAG_POOL,
      selectedTags: state.selectedTags,
      draftInput: state.draftInput,
      marketSolvers,
      selectedMarketSolver
    });

    return `
      ${authHtml}
      ${homeHtml}
    `;
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
      profileEditor: state.profileEditor,
      taskTypeEditor: state.taskTypeEditor
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
    mainHtml,
    auth: state.auth
  });
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

  if (action === "sign-up") {
    handleSignUp(state).then(() => renderApp());
    return;
  }

  if (action === "sign-in") {
    handleSignIn(state).then(() => renderApp());
    return;
  }

  if (action === "sign-out") {
    handleSignOut(state).then(() => renderApp());
    return;
  }

  if (action === "select-market-solver") {
    state.selectedMarketSolverId = target.dataset.solverId;
    renderApp();
    return;
  }

  if (action === "select-task-type-card") {
    state.selectedTaskTypeId = target.dataset.typeId;
    renderApp();
    return;
  }

  if (action === "remove-attachment") {
    handleRemoveAttachment(
      state,
      target.dataset.dmId,
      target.dataset.attachmentId
    );
    renderApp();
    return;
  }

  if (action === "change-subject") {
    handleChangeSubject(state, target.dataset.subject, MOCK_SOLVERS);
    renderApp();
    return;
  }

  if (action === "toggle-tag") {
    handleToggleTag(state, target.dataset.tag);
    renderApp();
    return;
  }

  if (action === "create-task") {
    handleCreateTask(
      state,
      pushNotification,
      NOTIFICATION_MESSAGES.taskCreated
    );
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
    handleSaveWork(
      state,
      target.dataset.dmId,
      pushNotification,
      NOTIFICATION_MESSAGES.workSaved
    );
    renderApp();
    return;
  }

  if (action === "deliver-work") {
    handleDeliverWork(
      state,
      target.dataset.dmId,
      pushNotification,
      refreshProfileState,
      REVIEW_TEMPLATES,
      NOTIFICATION_MESSAGES
    );
    renderApp();
    return;
  }

  if (action === "open-profile-editor") {
    openProfileEditor(state);
    renderApp();
    return;
  }

  if (action === "cancel-profile-edit") {
    cancelProfileEdit(state);
    renderApp();
    return;
  }

  if (action === "save-profile") {
    handleSaveProfile(state).then(() => renderApp());
    return;
  }

  if (action === "create-task-type") {
    handleCreateTaskType(state);
    renderApp();
    return;
  }

  if (action === "edit-task-type") {
    handleEditTaskType(state, target.dataset.typeId);
    renderApp();
    return;
  }

  if (action === "cancel-task-type-edit") {
    resetTaskTypeEditor(state);
    renderApp();
    return;
  }

  if (action === "toggle-task-type-status") {
    handleToggleTaskTypeStatus(state, target.dataset.typeId);
    renderApp();
    return;
  }

  if (action === "delete-task-type") {
    const confirmed = window.confirm("이 Type을 삭제하시겠습니까?");
    if (!confirmed) return;

    handleDeleteTaskType(state, target.dataset.typeId);
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

  if (target.dataset.action === "update-type-subject") {
    state.taskTypeEditor.subjectDraft = target.value;
    return;
  }

  if (target.dataset.action === "update-type-name") {
    state.taskTypeEditor.nameDraft = target.value;
    return;
  }

  if (target.dataset.action === "update-type-description") {
    state.taskTypeEditor.descriptionDraft = target.value;
    return;
  }

  if (target.dataset.action === "update-type-tags") {
    state.taskTypeEditor.tagsDraft = target.value;
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

  if (target.dataset.action === "update-auth-email") {
    state.auth.emailDraft = target.value;
    return;
  }

  if (target.dataset.action === "update-auth-password") {
    state.auth.passwordDraft = target.value;
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

        const nextAttachments = Array.isArray(dm.attachments)
          ? [...dm.attachments]
          : [];

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

      target.value = "";
      renderApp();
    };

    reader.readAsDataURL(file);
    return;
  }
}

async function init() {
  const app = document.getElementById("app");

  app.addEventListener("click", handleClick);
  app.addEventListener("input", handleInput);

  if (state.taskTypes.length === 0) {
    state.taskTypes = [...DEFAULT_TASK_TYPES];
  }

  if (!state.selectedMarketSolverId) {
    const initialMarketSolvers = MOCK_SOLVERS.filter(
      (solver) => solver.subject === state.currentSubject
    );
    state.selectedMarketSolverId = initialMarketSolvers[0]?.id || null;
  }

  const initialAvailableTaskTypes = getAvailableTaskTypes(state);
  if (!state.selectedTaskTypeId) {
    state.selectedTaskTypeId = initialAvailableTaskTypes[0]?.id || null;
  }

  refreshProfileState();
  renderApp();

  await refreshAuthUser(state);

  if (state.auth.user) {
    const { data: profileData, error: profileError } = await loadProfile(
      state.auth.user.id
    );

    if (profileError) {
      state.auth.statusMessage = `프로필 로드 실패: ${profileError.message}`;
    } else if (profileData) {
      state.profile.solverName =
        profileData.solver_name ?? state.profile.solverName;
      state.profile.bio = profileData.bio ?? state.profile.bio;
      state.profile.tags = profileData.tags ?? state.profile.tags;
      state.profile.avatarUrl =
        profileData.avatar_path ?? state.profile.avatarUrl;
      state.profile.level = profileData.level ?? state.profile.level;
      state.profile.xp = profileData.xp ?? state.profile.xp;
      state.profile.completeCount =
        profileData.complete_count ?? state.profile.completeCount;
      state.profile.reviewCount =
        profileData.review_count ?? state.profile.reviewCount;
    }
  }

  refreshProfileState();
  renderApp();
}

init();
