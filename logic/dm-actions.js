export function addDm(dmRequests, task) {
  return [task, ...dmRequests];
}

export function saveWork(dmRequests, dmId, text) {
  return dmRequests.map((dm) =>
    dm.id === dmId ? { ...dm, savedWork: text, status: "delivering" } : dm
  );
}

export function deliverWork(dmRequests, dmId, text) {
  return dmRequests.map((dm) =>
    dm.id === dmId
      ? {
          ...dm,
          savedWork: text,
          deliveredWork: text,
          status: "completed",
          deliveredAt: new Date().toISOString()
        }
      : dm
  );
}
