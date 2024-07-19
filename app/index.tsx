import {
  View,
  Text,
  useColorScheme,
  Pressable,
  Alert,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { createStyles } from "@/assets/css/global";
import { auth } from "../configs/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "../reactotron";
import { Colors } from "@/constants/Colors";

export default function Login() {
  const colorScheme = useColorScheme() ?? "light";
  const styles = createStyles(colorScheme);
  const placeholderColor = Colors[colorScheme].text.replace("1)", "0.5)");

  const router = useRouter();

  async function handleLogin() {
    try {
      const email = "dudu@dudu.com";
      const password = "123456";
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.tron.log(userCredential);
      await AsyncStorage.setItem("user", JSON.stringify(userCredential));
      router.replace("(auth)");
    } catch (error) {
      Alert.alert("Erro", "Não deu boa!");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Login</Text>
      <View style={styles.form}>
        <View style={styles.containerInputs}>
          <Text style={styles.labelInputs}>Email</Text>
          <TextInput
            placeholder="Digite o seu e-mail"
            style={styles.input}
            placeholderTextColor={placeholderColor}
            selectionColor={Colors[colorScheme].text}
          />
        </View>
      </View>
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text>Entrar</Text>
      </Pressable>
    </View>
  );
}
