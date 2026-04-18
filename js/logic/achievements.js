export function getAchievements(completeCount) {
  const list = [];

  if (completeCount >= 1) {
    list.push("첫 해결");
  }

  if (completeCount >= 3) {
    list.push("꾸준한 Solver");
  }

  if (completeCount >= 5) {
    list.push("신뢰 축적");
  }

  return list;
}
