import { View, Text, useColorScheme } from "react-native";
import { Image } from "expo-image";
import { createStyles } from "@/assets/css/global";

export default function HomeAuth() {
  const colorScheme = useColorScheme() ?? "light";
  const styles = createStyles(colorScheme);
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/images/home.jpg")}
        contentFit="cover"
        contentPosition="top"
        transition={1000}
      />
    </View>
  );
}
