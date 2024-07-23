import { createStyles } from "@/assets/css/global";
import { useRouter } from "expo-router";
import React from "react";
import { View, Text, useColorScheme, Pressable, TextInput } from "react-native";
import { useForm, useWatch, Controller } from "react-hook-form";
import { Colors } from "@/constants/Colors";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTicket } from "@/actions/tickets";
import Toast from "react-native-toast-message";
import { useQueryClient } from "@tanstack/react-query";

const schema = z.object({
  name: z.string({ message: "Campo obrigatório" }),
  email: z
    .string({ message: "Campo obrigatório" })
    .email({ message: "Digite um e-mail válido" }),
});

type FormData = z.infer<typeof schema>;

export default function Ticket() {
  const queryClient = useQueryClient();
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

  async function handleCreateTicket() {
    try {
      const name = formValues.name;
      const email = formValues.email;
      if (name && email) {
        await createTicket(name, email);
        Toast.show({
          type: "success",
          text1: "Ticket",
          text2: "Ticket cadastrado com sucesso!",
        });
        queryClient.fetchQuery({ queryKey: ["/tickets"] });
      }
    } catch (error) {
      console.tron.log(error);
      Toast.show({
        type: "error",
        text1: "Ticket",
        text2: "Problemas ao cadastrar ticket",
      });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Ticket</Text>
      <View style={styles.form}>
        <View style={styles.containerInputs}>
          <Text style={styles.labelInputs}>Nome</Text>
          <Controller
            control={control}
            name="name"
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
          {errors.name && (
            <Text style={styles.errorText}>{errors.name.message}</Text>
          )}
        </View>
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
      <Pressable style={styles.button} onPress={handleCreateTicket}>
        <Text>Cadastrar Ticket</Text>
      </Pressable>
    </View>
  );
}
