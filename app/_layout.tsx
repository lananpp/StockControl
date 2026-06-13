import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "StockControl",
        }}
      />

      <Stack.Screen
        name="produtos"
        options={{
          title: "Produtos",
        }}
      />

      <Stack.Screen
        name="cadastrar"
        options={{
          title: "Cadastrar Produto",
        }}
      />

      <Stack.Screen
        name="editar"
        options={{
          title: "Editar Produto",
        }}
      />
    </Stack>
  );
}