import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, ScrollView, StyleSheet, View, Text} from 'react-native';

const iconData = [
    {id: 1, name: 'All', img: ''},
    {id: 2, name: 'Battery', img: require('../assets/images/battery.png')},
    {id: 3, name: 'Road', img: require('../assets/images/road.png')},
    {id: 3, name: 'Mountain', img: require('../assets/images/mountain.png')},
    {id: 4, name: 'Hemet', img: require('../assets/images/hemet.png')},
]
export default function CardIcon() {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        style={styles.menuFunc}
        contentContainerStyle={styles.scrollContent}
        showsHorizontalScrollIndicator={false}
      >
        {iconData.map((item, index) => (
            <View
            key={index}
            style={[
            { transform: [{ translateY: -index * 10 }] }
            ]}
            >
                <LinearGradient colors={['#353F54', '#222834']} style={styles.cardIcon}>
                    <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
                    {item.img ?
                        <Image source={item.img} style={{width: 25, height: 25}} />
                        :
                        <Text className="text-white text-xl font-bold">{item.name}</Text>
                    }
                </LinearGradient>
                </View>
            ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  menuFunc: {
    maxHeight: 150,
    flexGrow: 0,
  },
  scrollContent: {
    paddingHorizontal: 1,
    paddingTop: 40,
    alignItems: 'flex-end',
  },
  cardIcon: {
    width: 53,
    height: 55,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    opacity: 0.9,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});