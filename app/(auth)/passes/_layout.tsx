import { Stack } from "expo-router";

export default function BuscaLayout() {
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
        animationDuration: 4000,
      }}>
      <Stack.Screen name="index" options={{ title: "Passes" }} />
      <Stack.Screen name="[id]" options={{ title: "Detalhe do passe" }} />
    </Stack>
  );
}
