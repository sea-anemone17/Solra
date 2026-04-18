function createTaskTypeId() {
  return `task-type-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

// Task Type 추가
export function addTaskType(taskTypes, newTaskType) {
  const taskType = {
    ...newTaskType,
    id: createTaskTypeId()
  };

  return [taskType, ...taskTypes];
}

// 상태 토글 (open ↔ closed)
export function toggleTaskTypeStatus(taskTypes, taskTypeId) {
  return taskTypes.map((type) => {
    if (type.id !== taskTypeId) return type;

    return {
      ...type,
      status: type.status === "open" ? "closed" : "open"
    };
  });
}

// 삭제 (선택 기능)
export function removeTaskType(taskTypes, taskTypeId) {
  return taskTypes.filter((type) => type.id !== taskTypeId);
}
