import api from "./api";

export async function sendContactMessage(data) {
  const response = await api.post("/contact", data);
  return response.data;
}

export async function getMyMessages() {
  const response = await api.get("/contact/my-messages");
  return response.data;
}