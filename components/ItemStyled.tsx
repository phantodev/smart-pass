import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { formatDate, formatDateTicketCard } from "@/utils/utils";
import { Link } from "expo-router";

const Container = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 240px;
  padding: 20px;
`;

const ContainerTicketInfos = styled.View`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;
  padding: 15px;
  background-color: #c3c3c3;
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;
`;

const ContainerTicketDate = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30%;
  height: 100%;
  padding: 10px;
  background-color: #a1a1aa;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
`;

const LabelText = styled.Text`
  font-size: 12px;
  color: #27272a;
  font-weight: bold;
`;

const NormalText = styled.Text`
  font-size: 14px;
  color: #27272a;
  margin-bottom: 5px;
`;

const DayText = styled.Text`
  font-size: 40px;
  font-weight: bold;
  color: #27272a;
`;

const MonthText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #713f12;
`;

const YearText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #713f12;
`;

const DetailsButton = styled.View`
  display: flex;
  gap: 5px;
  flex-direction: row;
  align-items: center;
  width: 70%;
  height: 40px;
  border-radius: 10px;
`;

const TextDetailsButton = styled.Text`
  font-size: 14px;
  color: #713f12;
`;

interface ItemProps {
  idTicket: string;
  namePassenger: string;
  nameAirport: string;
  dateOrder: string;
  dayToUse: string;
}

export default function Item(props: ItemProps) {
  const [month, day, year] = formatDateTicketCard(props.dayToUse);
  return (
    <Container>
      <ContainerTicketInfos>
        <LabelText>Nome do Aeroporto</LabelText>
        <NormalText>{props.nameAirport}</NormalText>
        <LabelText>Data da compra</LabelText>
        <NormalText>{formatDate(props.dateOrder)}</NormalText>
        <LabelText>Nome do passageiro</LabelText>
        <NormalText>{props.namePassenger}</NormalText>
        <Link
          href={{
            pathname: "/passes/[id]",
            params: { id: props.idTicket },
          }}>
          <DetailsButton>
            <Feather name="eye" size={20} color="#713f12" />
            <TextDetailsButton>Ver detalhes</TextDetailsButton>
          </DetailsButton>
        </Link>
      </ContainerTicketInfos>
      <ContainerTicketDate>
        <MonthText>{month}</MonthText>
        <DayText>{day}</DayText>
        <YearText>{year}</YearText>
      </ContainerTicketDate>
    </Container>
  );
}
