export function makeReview(dm) {
  return {
    id: `${Date.now()}-${Math.floor(Math.random() * 100000)}`,
    taskId: dm.id,
    title: `${dm.subject} · ${dm.taskType}`,
    body: "작업물이 정리되어 보여서 훨씬 이해가 쉬워졌어요.",
    clientLabel: dm.clientName,
    date: new Date().toISOString()
  };
}
