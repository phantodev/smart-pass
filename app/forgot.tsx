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
import { sendPasswordResetEmail } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "../reactotron";
import { Colors } from "@/constants/Colors";
import { useForm, useWatch, Controller } from "react-hook-form";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";

const schema = z.object({
  email: z
    .string({ message: "Campo obrigatório" })
    .email({ message: "Digite um e-mail válido" }),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const colorScheme = useColorScheme() ?? "light";
  const styles = createStyles(colorScheme);
  const placeholderColor = Colors[colorScheme].text.replace("1)", "0.5)");
  const [isLoaded, setIsLoaded] = React.useState(false);

  const {
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

  const router = useRouter();

  async function handleForgotPassword() {
    try {
      const email = formValues.email;
      if (email !== undefined) {
        setIsLoaded(true);
        try {
          const response = await sendPasswordResetEmail(auth, email);
          console.tron.log(response);
        } catch (firebaseError) {
          console.tron.log("Firebase error:", firebaseError);
          throw firebaseError; // Re-lança o erro para ser capturado pelo catch externo
        }
        Toast.show({
          type: "success",
          text1: "E-mail enviado",
          text2: "Olhe o seu e-mail 😍",
        });
        setTimeout(() => {
          router.replace("/");
        }, 4000);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "E-mail inválido",
        text2: "Verifique seus dados 🤬",
      });
      setIsLoaded(false);
      setError("email", {
        type: "manual",
        message: "E-mail inexistente",
      });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Esqueceu a sua senha?</Text>
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
      </View>
      <Pressable
        style={styles.button}
        onPress={handleSubmit(handleForgotPassword)}>
        {isLoaded ? (
          <ActivityIndicator color="#000000" />
        ) : (
          <Text>Recuperar senha</Text>
        )}
      </Pressable>
      <Pressable style={styles.buttonGhost} onPress={() => router.push("/")}>
        <Text style={styles.textGhost}>Lembrei minha senha</Text>
      </Pressable>
    </View>
  );
}
