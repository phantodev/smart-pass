import axios from "axios";

export default async function getAllTickets() {
  const response = await axios.get("http://192.168.100.7:3000/tickets");
  return response.data;
}
