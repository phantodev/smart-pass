import { View, Text, Button, StyleSheet, useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import { createStyles } from "@/assets/css/global";

export default function Login() {
  const colorScheme = useColorScheme() ?? "light";
  const styles = createStyles(colorScheme);

  const router = useRouter();

  const handleLogin = () => {
    // Lógica de login aqui
    router.replace("(auth)");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Login</Text>
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}
