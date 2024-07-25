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
import { Image } from "expo-image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";
import { useQueryClient } from "@tanstack/react-query";
import getAllTickets from "@/actions/tickets";
// import getAllTickets from "@/actions/tickets";

const schema = z.object({
  email: z
    .string({ message: "Campo obrigatório" })
    .email({ message: "Digite um e-mail válido" }),
  password: z
    .string({ message: "Campo obrigatório" })
    .min(6, { message: "Mínimo de 6 caracteres" }),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const styles = createStyles(colorScheme);
  const placeholderColor = Colors[colorScheme].text.replace("1)", "0.5)");
  const [isLoaded, setIsLoaded] = React.useState(false);

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const formValues = useWatch({ control });

  React.useEffect(() => {
    console.tron.log(formValues); // Loga o estado do formulário no console a cada mudança
  }, [formValues]);

  React.useEffect(() => {
    console.tron.log(errors); // Mostra os erros do Hook Forms no Reactotron
  }, [errors]);

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
        queryClient.prefetchQuery({
          queryKey: ["/tickets"],
          queryFn: getAllTickets,
        });
        console.tron.log(userCredential);
        await AsyncStorage.setItem("user", JSON.stringify(userCredential));
        router.replace("(auth)");
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Login inválido",
        text2: "Verifique seus dados 🤬",
      });
      setIsLoaded(false);
      setError("email", {
        type: "manual",
        message: "Credênciais inválidas",
      });
      setError("password", {
        type: "manual",
        message: "Credênciais inválidas",
      });
    }
  }

  async function getData(key: string) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error("Erro ao recuperar dados", e);
    }
  }

  React.useLayoutEffect(() => {
    getData("user").then((user) => {
      if (user) {
        router.push("(auth)");
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        contentFit="contain"
        source={require("../assets/images/smartpass-logo-light.svg")}
        transition={1000}
      />
      <Text style={styles.title}>Tela de Login</Text>
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
                inputMode="email"
              />
            )}
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}
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
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}
        </View>
      </View>
      <Pressable
        style={styles.buttonGhost}
        onPress={() => router.push("/forgot")}>
        <Text style={styles.textGhost}>Esqueci minha senha</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleSubmit(handleLogin)}>
        {isLoaded ? <ActivityIndicator color="#000000" /> : <Text>Entrar</Text>}
      </Pressable>
      <Pressable
        style={styles.buttonGhost}
        onPress={() => router.push("/signup")}>
        <Text style={styles.textGhost}>Quero me cadastrar</Text>
      </Pressable>
    </View>
  );
}
