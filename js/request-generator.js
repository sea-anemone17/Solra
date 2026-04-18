import { clients } from "./data.js";

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateRequest(taskText) {
  const client = pickRandom(clients);
  const template = pickRandom(client.requestTemplates);
  const message = template.replace("{task}", taskText);

  return {
    clientId: client.id,
    clientName: client.name,
    message
  };
}
