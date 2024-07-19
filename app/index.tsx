import {
  View,
  Text,
  useColorScheme,
  Pressable,
  Alert,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { createStyles } from "@/assets/css/global";
import { auth } from "../configs/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "../reactotron";
import { Colors } from "@/constants/Colors";
import { useForm, useWatch, Controller } from "react-hook-form";
import React from "react";

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const colorScheme = useColorScheme() ?? "light";
  const styles = createStyles(colorScheme);
  const placeholderColor = Colors[colorScheme].text.replace("1)", "0.5)");
  const [isLoaded, setIsLoaded] = React.useState(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const formValues = useWatch({ control });

  React.useEffect(() => {
    console.tron.log(formValues); // Loga o estado do formulário no console a cada mudança
  }, [formValues]);

  const router = useRouter();

  async function handleLogin() {
    try {
      const email = formValues.email;
      const password = formValues.password;
      if (email !== undefined && password !== undefined) {
        setIsLoaded(true);
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.tron.log(userCredential);
        await AsyncStorage.setItem("user", JSON.stringify(userCredential));
        router.replace("(auth)");
      }
    } catch (error) {
      setIsLoaded(false);
      Alert.alert("Erro", "Não deu boa!");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Login</Text>
      <View style={styles.form}>
        <View style={styles.containerInputs}>
          <Text style={styles.labelInputs}>Email</Text>
          <Controller
            control={control}
            name="email"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Digite o seu e-mail"
                style={styles.input}
                placeholderTextColor={placeholderColor}
                selectionColor={Colors[colorScheme].text}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
        <View style={styles.containerInputs}>
          <Text style={styles.labelInputs}>Senha</Text>
          <Controller
            control={control}
            name="password"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Digite o seu password"
                style={styles.input}
                secureTextEntry={true}
                placeholderTextColor={placeholderColor}
                selectionColor={Colors[colorScheme].text}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
      </View>
      <Pressable style={styles.button} onPress={handleLogin}>
        {isLoaded ? <ActivityIndicator color="#000000" /> : <Text>Entrar</Text>}
      </Pressable>
    </View>
  );
}
