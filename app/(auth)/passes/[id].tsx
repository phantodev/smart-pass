import { View, Text, useColorScheme } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { createStyles } from "@/assets/css/global";
import React from "react";
import { getTicketById } from "@/actions/tickets";
import { ITicket } from "@/types/tickets";

export default function Passes() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme() ?? "light";
  const styles = createStyles(colorScheme);
  const [ticket, setTicket] = React.useState<ITicket[]>();

  React.useEffect(() => {
    async function handleGetTicketById() {
      const ticket = await getTicketById(id!);
      setTicket(ticket);
    }
    handleGetTicketById();
  }, []);

  //   React.useEffect(() => {
  //     if (ticket) {
  //       console.tron.log(ticket[0]?.airport?.name);
  //     }
  //   }, [ticket]);

  return (
    <View>
      <Text style={styles.text}>Details of ticket {id} </Text>
      <Text style={styles.text}>
        Nome do Aeroporto {ticket && ticket[0]?.airport.name}
      </Text>
    </View>
  );
}
