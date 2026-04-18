function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function buildTask({ subject, taskType, tags, userInput, clientPool }) {
  return {
    id: `${Date.now()}-${Math.floor(Math.random() * 100000)}`,
    subject,
    taskType,
    tags,
    clientName: randomPick(clientPool),
    requestText: `${subject} · ${taskType} Task가 도착했습니다.\n${userInput}`,
    savedWork: "",
    deliveredWork: "",
    status: "new",
    createdAt: new Date().toISOString()
  };
}
