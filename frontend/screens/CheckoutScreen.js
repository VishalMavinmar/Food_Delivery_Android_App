import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { API } from "../api/api";
import colors from "../constants/colors";

export default function CheckoutScreen({ navigation }) {
  const { cart, clearCart } = useCart();

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0
  );

  const placeOrder = async () => {
    if (!phone || !address) {
      alert("Phone and address are required");
      return;
    }

    setLoading(true);

    try {
      await API.post("/api/orders/", {
        phone,
        address,
        notes,
        items: cart.map(item => ({
          food: item.id,
          quantity: item.quantity || 1,
        })),
      });

      clearCart();
      alert("Order placed successfully!");
      navigation.navigate("Tabs", { screen: "Home" });
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.error || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Checkout</Text>

      {/* ITEMS */}
      {cart.map(item => (
        <View
          key={item.id}
          style={{
            backgroundColor: "#fff",
            padding: 12,
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <Text style={{ fontWeight: "600" }}>
            {item.name} x {item.quantity || 1}
          </Text>
          <Text>₹{item.price}</Text>
        </View>
      ))}

      {/* TOTAL */}
      <View
        style={{
          marginTop: 20,
          padding: 15,
          backgroundColor: "#f3ecff",
          borderRadius: 12,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "700" }}>
          Total Bill: ₹{total}
        </Text>
      </View>

      {/* DETAILS */}
      <TextInput
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        style={{ borderBottomWidth: 1, marginTop: 20 }}
      />

      <TextInput
        placeholder="Delivery Address"
        value={address}
        onChangeText={setAddress}
        style={{ borderBottomWidth: 1, marginTop: 20 }}
      />

      <TextInput
        placeholder="Notes (optional)"
        value={notes}
        onChangeText={setNotes}
        style={{ borderBottomWidth: 1, marginTop: 20 }}
      />

      <TouchableOpacity
        onPress={placeOrder}
        disabled={loading}
        style={{
          backgroundColor: colors.primary,
          padding: 16,
          borderRadius: 14,
          marginTop: 30,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontSize: 16 }}>
          {loading ? "Placing Order..." : "Confirm Order"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
