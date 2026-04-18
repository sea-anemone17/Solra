import { clients } from "./data.js";

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateReview(clientId) {
  const client = clients.find((c) => c.id === clientId);

  if (!client) {
    return {
      text: "작업은 완료됐지만 후기를 불러오지 못했어요.",
      xpGain: 5
    };
  }

  const review = pickRandom(client.reviewTemplates.success);

  return {
    text: review,
    xpGain: 10
  };
}
