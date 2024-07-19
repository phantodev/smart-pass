import { StyleSheet } from "react-native";
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
    button: {
      backgroundColor: Colors[theme].tint,
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      width: "50%",
      display: "flex",
      alignItems: "center",
    },
    containerInputs: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
    },
    labelInputs: {
      color: Colors[theme].text,
      fontSize: 16,
      marginBottom: 5,
    },
    input: {
      backgroundColor: Colors[theme].backgroundInput,
      color: Colors[theme].text,
      paddingHorizontal: 10,
      width: "100%",
      height: 48,
      borderRadius: 10,
      borderBlockColor: Colors[theme].border,
      borderColor: Colors[theme].border,
      borderWidth: 1,
    },
    form: {
      width: "100%",
      paddingVertical: 40,
      paddingHorizontal: 20,
    },
  });
