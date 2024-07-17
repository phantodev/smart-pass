import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";
import { styles } from "@/assets/css/global";
import HomeBackground from "../../assets/images/home.jpg";
import { Link, useRouter } from "expo-router";

export default function SearchScreen() {
  const router = useRouter();
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <ImageBackground
          source={HomeBackground}
          style={styles2.image}
          resizeMode="cover"
          imageStyle={styles2.backgroundImage}>
          <Link href="/choose-airport" asChild>
            <Pressable style={styles2.button}>
              <Text>Ir para a próxima rota</Text>
            </Pressable>
          </Link>
        </ImageBackground>
      </View>
    </SafeAreaProvider>
  );
}

const styles2 = StyleSheet.create({
  button: {
    backgroundColor: "white",
    color: "black",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  image: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    resizeMode: "cover", // Faz com que a imagem cubra o contêiner
    top: 0, // Posiciona a imagem no topo
  },
});
