import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../store/store";
import './globals.css';

export default function RootLayout() {
    return (
        <Provider store={store}>
            <Stack initialRouteName="login">
                <Stack.Screen name="login" options={{headerShown: false}}/>
                <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                <Stack.Screen name="bikes/[id]" options={{headerShown: false}}/>
            </Stack>
        </Provider>
    );
}
