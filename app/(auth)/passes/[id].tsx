import { View, Text, useColorScheme } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { createStyles } from "@/assets/css/global";
import React from "react";
import { getTicketById } from "@/actions/tickets";
import { ITicket, ITicket2 } from "@/types/tickets";
import { TStatus } from "@/types/global";
import LottieView from "lottie-react-native";
import QRCode from "react-native-qrcode-svg";

export default function Passes() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme() ?? "light";
  const styles = createStyles(colorScheme);
  // const [ticket2, setTicket2] = React.useState<ITicket2>(
  //   {
  //     status: "loading",
  //     data: []
  //   }
  // );
  const [ticket, setTicket] = React.useState<ITicket[] | null>(null);
  const [status, setStatus] = React.useState<TStatus>("idle");

  React.useEffect(() => {
    async function handleGetTicketById() {
      try {
        setStatus("loading");
        const ticket = await getTicketById(id!);
        setTicket(ticket);
        setStatus("idle");
      } catch (error) {
        setStatus("error");
      }
    }
    handleGetTicketById();
  }, []);

  //   React.useEffect(() => {
  //     if (ticket) {
  //       console.tron.log(ticket[0]?.airport?.name);
  //     }
  //   }, [ticket]);

  return (
    <View style={styles.container}>
      {status === "loading" && (
        <LottieView
          style={{ width: "100%", height: "100%" }}
          autoPlay
          loop
          source={require("../../../assets/lottieLoading.json")}
        />
      )}
      {status === "error" && (
        <Text style={styles.text}>Problemas com API chame o suporte</Text>
      )}
      {status === "idle" && ticket !== null && (
        <>
          <QRCode value={ticket[0].voucher.code} size={200}></QRCode>
          <Text style={styles.textVoucher}>{ticket[0].voucher.code}</Text>
          <Text style={styles.text}>Nome do Aeroporto</Text>
          <Text style={styles.airportName}>
            {ticket && ticket[0]?.airport.name}
          </Text>
        </>
      )}
    </View>
  );
}
