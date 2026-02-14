import { View, FlatList, Text } from "react-native";
import { useFavorites } from "../context/FavoritesContext";
import FoodRow from "../components/FoodRow";

export default function FavoritesScreen({ navigation }) {
  const { favorites } = useFavorites();

  if (!favorites.length) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No favorites yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 20 }}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      renderItem={({ item }) => (
        <FoodRow
          item={item}
          onPress={() =>
            navigation.navigate("FoodDetail", { food: item })
          }
        />
      )}
    />
  );
}
