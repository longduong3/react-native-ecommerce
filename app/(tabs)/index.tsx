import { Text, View } from "react-native";
import {Link} from "expo-router";

export default function Index() {
  return (
      <View className="flex-1 items-center justify-center bg-white">
          <Text className="text-xl font-bold text-blue-600">Hello Tailwind</Text>
          {/*<Link href="/bikes/xsr155">C1 Bike</Link>*/}
      </View>
  )
}
