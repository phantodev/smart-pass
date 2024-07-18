import { createStyles } from "@/assets/css/global";
import React from "react";
import { View, Text, useColorScheme, Pressable } from "react-native";

export default function Perfil() {
  const colorScheme = useColorScheme() ?? "light";
  const styles = createStyles(colorScheme);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Perfil</Text>
      <Pressable>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
}
