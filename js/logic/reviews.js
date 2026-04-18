function randomPick(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function createReviewId() {
  return `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

export function makeReview(dm, templates) {
  return {
    id: createReviewId(),
    taskId: dm.id,
    title: `${dm.subject} · ${dm.taskType}`,
    body: randomPick(templates),
    clientLabel: dm.clientName,
    date: new Date().toISOString()
  };
}
