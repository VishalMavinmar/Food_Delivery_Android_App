import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import colors from "../constants/colors";
import { login } from "../utils/auth";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      await login(email, password);
      navigation.reset({
        index: 0,
        routes: [{ name: "Tabs" }],
      });
    } catch {
      alert("Invalid email or password");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Image
        source={require("../assets/login1.png")}
        style={styles.image}
        resizeMode="contain"
      /> */}

      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back 👋</Text>
        <Text style={styles.subtitle}>Login to continue</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        {/* FORGOT PASSWORD */}
        <TouchableOpacity
          onPress={() => alert("Forgot password coming soon")}
          style={{ alignSelf: "flex-end" }}
        >
          <Text style={styles.forgot}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.link}>
            Don’t have an account? <Text style={{ fontWeight: "700" }}>Signup</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: "center",
    padding: 20,
  },
  image: {
    height: 220,
    alignSelf: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: colors.gray,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    marginTop: 14,
  },
  forgot: {
    color: colors.primary,
    marginTop: 10,
    fontSize: 13,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 14,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
  link: {
    textAlign: "center",
    marginTop: 20,
    color: colors.primary,
  },
});
