import axios from "axios";

export default async function getAllTickets() {
  const response = await axios.get("http://192.168.100.7:3000/tickets");
  return response.data;
}

export async function createTicket(name: string, email: string) {
  const payload = {
    voucher: {
      id: "1",
      code: "VOUCHER123",
      used: false,
    },
    id: "ticket1",
    status: "verified",
    payment_status: "approved",
    payment_card: "1234-5678-9101-1121",
    payment_plan: "Plano A",
    payment_plan_id: "plan1",
    passenger: {
      birth_date: "1990-01-01",
      name: name,
      cpf: "123.456.789-00",
      email: email,
    },
    airport_id: "GRU",
    airport: {
      id: "GRU",
      name: "Aeroporto Internacional de São Paulo/Guarulhos",
      iata: "GRU",
      picture: "https://example.com/gru.jpg",
      address: {
        address: "Rodovia Hélio Smidt, s/n",
        country: "Brasil",
        state: "SP",
        city: "Guarulhos",
        cep: "07190-100",
      },
    },
  };
  const response = await axios.post(
    "http://192.168.100.7:3000/tickets",
    payload
  );
  return response.data;
}

export async function getTicketById(id: string | string[]) {
  const response = await axios.get(
    "http://192.168.100.7:3000/tickets?id=" + id
  );
  return response.data;
}
