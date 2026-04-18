export function createTaskTypeId() {
  return `task-type-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

export function resetTaskTypeEditor(state) {
  state.taskTypeEditor.mode = "create";
  state.taskTypeEditor.editingId = null;
  state.taskTypeEditor.subjectDraft = state.currentSubject;
  state.taskTypeEditor.nameDraft = "";
  state.taskTypeEditor.descriptionDraft = "";
  state.taskTypeEditor.tagsDraft = "";
}

export function handleEditTaskType(state, typeId) {
  const targetType = state.taskTypes.find((type) => type.id === typeId);

  if (!targetType) return;

  state.taskTypeEditor.mode = "edit";
  state.taskTypeEditor.editingId = targetType.id;
  state.taskTypeEditor.subjectDraft = targetType.subject;
  state.taskTypeEditor.nameDraft = targetType.name;
  state.taskTypeEditor.descriptionDraft = targetType.description || "";
  state.taskTypeEditor.tagsDraft = (targetType.tags || []).join(", ");
}

export function handleToggleTaskTypeStatus(state, typeId) {
  state.taskTypes = state.taskTypes.map((type) => {
    if (type.id !== typeId) return type;

    return {
      ...type,
      status: type.status === "open" ? "closed" : "open"
    };
  });

  if (state.taskTypeEditor.editingId === typeId) {
    const updatedType = state.taskTypes.find((type) => type.id === typeId);

    if (updatedType) {
      state.taskTypeEditor.subjectDraft = updatedType.subject;
      state.taskTypeEditor.nameDraft = updatedType.name;
      state.taskTypeEditor.descriptionDraft = updatedType.description || "";
      state.taskTypeEditor.tagsDraft = (updatedType.tags || []).join(", ");
    }
  }
}

export function handleDeleteTaskType(state, typeId) {
  const isEditingCurrent = state.taskTypeEditor.editingId === typeId;

  state.taskTypes = state.taskTypes.filter((type) => type.id !== typeId);

  if (isEditingCurrent) {
    resetTaskTypeEditor(state);
  }
}

export function handleCreateTaskType(state) {
  const subject = state.taskTypeEditor.subjectDraft;
  const name = state.taskTypeEditor.nameDraft.trim();
  const description = state.taskTypeEditor.descriptionDraft.trim();
  const tags = state.taskTypeEditor.tagsDraft
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  if (!name) {
    alert("Type 이름을 입력해 주세요.");
    return;
  }

  if (state.taskTypeEditor.mode === "edit" && state.taskTypeEditor.editingId) {
    state.taskTypes = state.taskTypes.map((type) => {
      if (type.id !== state.taskTypeEditor.editingId) return type;

      return {
        ...type,
        subject,
        name,
        description,
        tags
      };
    });

    resetTaskTypeEditor(state);
    return;
  }

  const newType = {
    id: createTaskTypeId(),
    subject,
    name,
    description,
    tags,
    status: "open"
  };

  state.taskTypes = [newType, ...state.taskTypes];
  resetTaskTypeEditor(state);
}
