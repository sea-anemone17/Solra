function randomPick(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function createTaskId() {
  return `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

export function buildTask({ subject, taskType, tags, userInput, clientPool }) {
  const clientName = randomPick(clientPool);

  return {
    id: createTaskId(),
    subject,
    taskType,
    tags,
    clientName,
    requestText: `${subject} · ${taskType} Task가 도착했습니다.\n${userInput}`,
    savedWork: "",
    deliveredWork: "",
    status: "new",
    createdAt: new Date().toISOString(),
    deliveredAt: null
  };
}
