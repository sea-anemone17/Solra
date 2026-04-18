import { clients } from "./data.js";

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateReview(clientId) {
  const client = clients.find((c) => c.id === clientId);
  const review = pickRandom(client.reviewTemplates.success);

  return {
    text: review,
    xpGain: 10
  };
}
