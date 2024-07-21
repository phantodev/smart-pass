export type TTicket = {
  voucher: TVoucher;
  id: string;
  status: "verified" | "unverified";
  payment_status: "approved" | "pending" | "denied";
  payment_card: string;
  payment_date: Date;
  payment_plan: string;
  payment_plan_id: string;
  date: Date;
  due_date: Date;
  passenger: TPassenger;
  airport_id: string;
  airport: TAirport;
};

type TVoucher = {
  id: string;
  code: string;
  used: boolean;
  used_date?: string;
};

export type TPassenger = {
  birth_date: string;
  name: string;
  cpf: string;
  email: string;
};

type TAirport = {
  id: string;
  name: string;
  iata: string;
  picture: string;
  address: {
    address: string;
    country: string;
    state: string;
    city: string;
    cep: string;
  };
};
