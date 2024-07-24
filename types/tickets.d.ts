interface IVoucher {
  id: string;
  code: string;
  used: boolean;
  day_to_use: string;
}

interface IPayment {
  card: string;
  plan: string;
  plan_id: string;
  status: string;
}

interface IPassenger {
  birth_date: string;
  name: string;
  cpf: string;
  email: string;
}

interface IAddress {
  address: string;
  country: string;
  state: string;
  city: string;
  cep: string;
}

interface IAirport {
  id: string;
  name: string;
  iata: string;
  picture: string;
  address: IAddress;
}

export interface ITicket {
  voucher: IVoucher;
  id: string;
  status: string;
  payment_status: string;
  payment: IPayment;
  passenger: IPassenger;
  airport_id: string;
  airport: IAirport;
}
