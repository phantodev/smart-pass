import { styles } from "@/assets/css/global";
import { Image } from "expo-image";
import { View, Text } from "react-native";

export default function HomeAuth() {
  return (
    <View style={styles.backgroundImageContainer}>
      <Image
        style={styles.image}
        contentFit="cover"
        contentPosition="top"
        source={require("../../assets/images/home.jpg")}
      />
    </View>
  );
}
