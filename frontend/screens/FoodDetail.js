import { View, Text, Image, TouchableOpacity } from "react-native";
import { useCart } from "../context/CartContext";
import colors from "../constants/colors";

export default function FoodDetail({ route, navigation }) {
  const { food } = route.params;
  const { addToCart } = useCart();

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={{ uri: food.image }}
        style={{ width: "100%", height: 280 }}
      />

      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "800" }}>
          {food.name}
        </Text>

        <Text style={{ marginTop: 10, color: "#666" }}>
          {food.description}
        </Text>
      </View>

      {/* ADD TO CART */}
      <TouchableOpacity
        onPress={() => {
          addToCart(food);
          navigation.navigate("Tabs", {
          screen: "Cart",
          });
        }}
        style={{
          backgroundColor: colors.primary,
          padding: 18,
          alignItems: "center",
          margin: 20,
          borderRadius: 14,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>
          Add to Cart · ₹{food.price}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
