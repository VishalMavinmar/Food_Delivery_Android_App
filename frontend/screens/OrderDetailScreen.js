import { View, Text, SafeAreaView } from "react-native";

export default function OrderDetailScreen() {
  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 32, fontWeight: "bold" }}>
        Order Details
      </Text>
    </SafeAreaView>
  );
}
