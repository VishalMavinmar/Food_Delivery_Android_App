import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useCart } from "../context/CartContext";
import colors from "../constants/colors";

export default function CartScreen({ navigation }) {
  const { cart, removeFromCart } = useCart();

  if (cart.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No items in cart</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={cart}
        // keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#fff",
              padding: 12,
              borderRadius: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 16 }}>{item.name}</Text>
            <Text>₹{item.price}</Text>

            <TouchableOpacity
              onPress={() => removeFromCart(item.id)}
              style={{ marginTop: 6 }}
            >
              <Text style={{ color: "red" }}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate("Checkout")}
        style={{
          backgroundColor: colors.primary,
          padding: 16,
          borderRadius: 12,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          Place Order
        </Text>
      </TouchableOpacity>
    </View>
  );
}
