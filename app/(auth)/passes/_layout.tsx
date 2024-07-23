import { Stack } from "expo-router";
// import { QueryClientProvider } from "react-query";
// import { queryClient } from "../../../configs/queryClient";

export default function BuscaLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Passes" }} />
    </Stack>
  );
}
