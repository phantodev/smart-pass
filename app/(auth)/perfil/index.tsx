import { createStyles } from "@/assets/css/global";
import { useRouter } from "expo-router";
import React from "react";
import { View, Text, useColorScheme, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Perfil() {
  const colorScheme = useColorScheme() ?? "light";
  const styles = createStyles(colorScheme);
  const router = useRouter();
  const [displayName, setDisplayName] = React.useState("");

  const handleLogout = () => {
    // Lógica de logout aqui
    router.replace("/");
    getData("user").then((user) => {
      if (user) {
        console.tron.log(user);
      }
    });
  };

  async function getData(key: string) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error("Erro ao recuperar dados", e);
    }
  }

  React.useEffect(() => {
    getData("user").then((user) => {
      if (user) {
        setDisplayName(user.displayName);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Perfil</Text>
      <Text style={styles.text}>{displayName}</Text>
      <Pressable style={styles.button} onPress={handleLogout}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
}
