import { Stack } from "expo-router";

export default function TicketsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Lista de Tickets",
        }}
      />
    </Stack>
  );
}
