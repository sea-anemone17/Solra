import { achievements } from "./data.js";

export function getUnlockedAchievements(state) {
  return achievements.filter((achievement) => {
    return !state.unlockedAchievementIds.has(achievement.id) && achievement.check(state);
  });
}
