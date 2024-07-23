import getAllTickets from "@/actions/tickets";
import { createStyles } from "@/assets/css/global";
import Item from "@/components/Item";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React from "react";
// import { queryClient } from "../../../configs/queryClient";
import { View, Text, useColorScheme, FlatList } from "react-native";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28bb",
    title: "4 Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f65",
    title: "6 Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d74",
    title: "7 Item",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28bu",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f6u",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d7u",
    title: "Third Item",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28br",
    title: "4 Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f696",
    title: "6 Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d75",
    title: "7 Item",
  },
];

// const queryClient = new QueryClient();

export default function Passes() {
  // const queryClient = useQueryClient();
  const colorScheme = useColorScheme() ?? "light";
  const styles = createStyles(colorScheme);

  const { isLoading, error, data } = useQuery({
    queryKey: ["/tickets"],
    queryFn: getAllTickets,
  });

  console.tron.log("DATA", data);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Item title={item.passenger.name} />}
        keyExtractor={(item) => item.voucher.id}
      />
    </View>
  );
}
