import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useThemeColors } from "@/hooks/useThemeColor";

export default function AuthLayout() {
  const colors = useThemeColors();
  return (
    <Tabs
      sceneContainerStyle={{
        backgroundColor: "transparent",
      }}
      screenOptions={{
        tabBarStyle: {
          height: 80, // Ajuste este valor para a altura desejada
          paddingBottom: 5, // Adicione um pouco de padding na parte inferior se necessário
          paddingTop: 5, // Adicione um pouco de padding na parte superior se necessário
        },
        tabBarItemStyle: {
          padding: 5, // Ajuste o padding dos itens da tab se necessário
        },
        tabBarLabelStyle: {
          fontSize: 12, // Ajuste este valor para o tamanho de fonte desejado
          fontWeight: "bold", // Opcional: se quiser o texto em negrito
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="busca"
        options={{
          href: "busca",
          tabBarLabel: "Busca",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <AntDesign
              name="search1"
              size={32}
              color={focused ? colors.tabIconSelected : colors.tabIconDefault}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="passes"
        options={{
          tabBarLabel: "Passes",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="ticket-confirmation-outline"
              size={32}
              color={focused ? colors.tabIconSelected : colors.tabIconDefault}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          tabBarLabel: "Meu Perfil",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <AntDesign
              name="user"
              size={32}
              color={focused ? colors.tabIconSelected : colors.tabIconDefault}
            />
          ),
        }}
      />
    </Tabs>
  );
}
