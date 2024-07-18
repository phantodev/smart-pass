import { Platform, StyleSheet } from "react-native";
import { blue } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? 0 : 28,
    paddingHorizontal: 20,
  },
  backgroundImageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: "100%",
  },
  button: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "blue",
    borderRadius: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
  },
});
