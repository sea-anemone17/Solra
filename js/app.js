import { state } from "./state.js";
import { SUBJECTS, TASK_TYPES, TAG_POOL, CLIENT_NAMES } from "./data.js";
import { buildTask } from "./logic/task-builder.js";
import { addDm, saveWork, deliverWork } from "./logic/dm-actions.js";
import { makeReview } from "./logic/reviews.js";
import { getAchievements } from "./logic/achievements.js";

import { renderLayout } from "./ui/layout.js";
import { renderHome } from "./ui/home.js";
import { renderDm } from "./ui/dm.js";
import { renderProfile } from "./ui/profile.js";
import { renderNotifications } from "./ui/notifications.js";

function getSelectedDm() { ... }

function pushNotification(title, body) { ... }

function refreshDerivedState() { ... }

function renderApp() {
  const homeHtml = renderHome(...);
  const dmHtml = renderDm(...);
  const profileHtml = renderProfile(...);
  const notificationsHtml = renderNotifications(...);

  document.getElementById("app").innerHTML = renderLayout({
    homeHtml,
    dmHtml,
    profileHtml,
    notificationsHtml
  });
}

function handleClick(event) { ... }

function handleInput(event) { ... }

function init() {
  const app = document.getElementById("app");
  app.addEventListener("click", handleClick);
  app.addEventListener("input", handleInput);
  renderApp();
}

init();
