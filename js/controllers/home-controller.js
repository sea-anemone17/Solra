import { buildTask } from "../logic/task-builder.js";
import { addDm } from "../logic/dm-actions.js";
import { CLIENT_NAMES } from "../data.js";

export function getAvailableTaskTypes(state) {
  return state.taskTypes.filter(
    (type) => type.subject === state.currentSubject && type.status === "open"
  );
}

export function getSelectedTaskType(state, availableTaskTypes) {
  return (
    availableTaskTypes.find((type) => type.id === state.selectedTaskTypeId) ||
    availableTaskTypes[0] ||
    null
  );
}

export function handleChangeSubject(state, nextSubject, mockSolvers) {
  state.currentSubject = nextSubject;

  const nextAvailableTaskTypes = state.taskTypes.filter(
    (type) => type.subject === nextSubject && type.status === "open"
  );
  state.selectedTaskTypeId = nextAvailableTaskTypes[0]?.id || null;

  const nextMarketSolvers = mockSolvers.filter(
    (solver) => solver.subject === nextSubject
  );
  state.selectedMarketSolverId = nextMarketSolvers[0]?.id || null;
}

export function handleToggleTag(state, tag) {
  if (state.selectedTags.includes(tag)) {
    state.selectedTags = state.selectedTags.filter((item) => item !== tag);
  } else {
    state.selectedTags = [...state.selectedTags, tag];
  }
}

export function handleCreateTask(state, pushNotification, taskCreatedMessage) {
  const text = state.draftInput.trim();

  if (!text) {
    alert("공부 내용을 입력해 주세요.");
    return;
  }

  const selectedTaskType = state.taskTypes.find(
    (type) => type.id === state.selectedTaskTypeId && type.status === "open"
  );

  if (!selectedTaskType) {
    alert("먼저 열린 Type을 선택해 주세요.");
    return;
  }

  const mergedTags = Array.from(
    new Set([...(selectedTaskType.tags || []), ...state.selectedTags])
  );

  const newTask = buildTask({
    subject: state.currentSubject,
    taskType: selectedTaskType.name,
    tags: mergedTags,
    userInput: text,
    clientPool: CLIENT_NAMES[state.currentSubject]
  });

  newTask.taskTypeId = selectedTaskType.id;
  newTask.taskTypeDescription = selectedTaskType.description || "";

  state.dmRequests = addDm(state.dmRequests, newTask);
  state.selectedDmId = newTask.id;
  state.selectedClientName = newTask.clientName;
  state.draftInput = "";
  state.currentPage = "dm";

  pushNotification("새 Task 도착", taskCreatedMessage);
}
