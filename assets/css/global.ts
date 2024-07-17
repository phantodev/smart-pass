import { Platform, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export const createStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Colors[theme].background,
    },
    text: {
      color: Colors[theme].text,
      fontSize: 18,
    },
    image: {
      flex: 1,
      width: "100%",
      backgroundColor: "#0553",
    },
  });
