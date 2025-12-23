import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectIsAuthenticated, selectUserError, selectUserLoading } from "@/store/selectors";
import { login, setError, setLoading } from "@/store/slices/userSlice";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:4000";

export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const loading = useAppSelector(selectUserLoading);
  const error = useAppSelector(selectUserError);

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(tabs)");
    }
  }, [isAuthenticated]);

  const handleSubmit = async () => {
    if (isRegister && !name) {
      dispatch(setError("Vui lòng nhập họ tên"));
      return;
    }
    if (!email || !password) {
      dispatch(setError("Vui lòng nhập email và mật khẩu"));
      return;
    }

    dispatch(setLoading(true));
    try {
      const url = `${API_BASE_URL}/api/auth/${isRegister ? "register" : "login"}`;
      const body = isRegister ? { name, email, password } : { email, password };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) {
        dispatch(setError(data?.message || `${isRegister ? "Đăng ký" : "Đăng nhập"} thất bại`));
        dispatch(setLoading(false));
        return;
      }

      dispatch(
        login({
          user: data.user,
          token: data.token,
        })
      );
      dispatch(setLoading(false));
      dispatch(setError(null));
      router.replace("/(tabs)");
    } catch (error) {
      dispatch(setError("Không thể kết nối server"));
      dispatch(setLoading(false));
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/bg.png")}
      style={{ flex: 1, width: "100%", height: "100%" }}
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1 px-6 justify-center">
        <View className="bg-[#1f2937cc] p-6 rounded-2xl">
          <Text className="text-white text-3xl font-bold mb-6 text-center">
            {isRegister ? "Đăng ký" : "Đăng nhập"}
          </Text>

          {isRegister && (
            <>
              <Text className="text-gray-200 mb-2">Họ tên</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Nguyễn Văn A"
                placeholderTextColor="#9ca3af"
                className="bg-[#111827] text-white px-4 py-3 rounded-xl mb-4"
              />
            </>
          )}

          <Text className="text-gray-200 mb-2">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            placeholderTextColor="#9ca3af"
            autoCapitalize="none"
            keyboardType="email-address"
            className="bg-[#111827] text-white px-4 py-3 rounded-xl mb-4"
          />

          <Text className="text-gray-200 mb-2">Mật khẩu</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="********"
            placeholderTextColor="#9ca3af"
            secureTextEntry
            className="bg-[#111827] text-white px-4 py-3 rounded-xl mb-4"
          />

          {error ? <Text className="text-red-400 mb-3">{error}</Text> : null}

          <TouchableOpacity
            onPress={handleSubmit}
            disabled={loading}
            className={`py-4 rounded-xl ${loading ? "bg-gray-500" : "bg-blue-500"}`}
          >
            <Text className="text-white text-center text-lg font-semibold">
              {loading ? "Đang xử lý..." : isRegister ? "Đăng ký" : "Đăng nhập"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              dispatch(setError(null));
              setIsRegister((prev) => !prev);
            }}
            className="mt-4"
            disabled={loading}
          >
            <Text className="text-blue-300 text-center">
              {isRegister ? "Đã có tài khoản? Đăng nhập" : "Chưa có tài khoản? Đăng ký"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
