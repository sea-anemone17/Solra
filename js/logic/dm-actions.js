export function addDm(dmRequests, task) {
  return [task, ...dmRequests];
}

export function saveWork(dmRequests, dmId, text) {
  return dmRequests.map((dm) => {
    if (dm.id !== dmId) return dm;

    return {
      ...dm,
      savedWork: text,
      status: dm.status === "completed" ? "completed" : "delivering"
    };
  });
}

export function deliverWork(dmRequests, dmId, text) {
  return dmRequests.map((dm) => {
    if (dm.id !== dmId) return dm;

    if (dm.status === "completed") {
      return dm;
    }

    return {
      ...dm,
      savedWork: text,
      deliveredWork: text,
      status: "completed",
      deliveredAt: new Date().toISOString()
    };
  });
}
