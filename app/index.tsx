import { styles } from "@/assets/css/global";
import { useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import HomeBackground from "../assets/images/home.jpg";

export default function LoginScreen() {
  const router = useRouter();
  function handleLogin() {
    router.replace("(auth)");
  }
  return (
    <View style={styles.container}>
      {/* <Image style={styles.image} contentFit="cover" source={HomeBackground} /> */}
      <Text>Página de Login</Text>
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
}
