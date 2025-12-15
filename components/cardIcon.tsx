import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';

const data = ['All', 'Battery', 'Road', 'Hill', 'Helmet'];

export default function CardIcon() {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        style={styles.menuFunc}
        contentContainerStyle={styles.scrollContent}
        showsHorizontalScrollIndicator={false}
      >
        {data.map((item, index) => (
            <View
            key={index}
            style={[
            { transform: [{ translateY: -index * 10 }] }
            ]}
            >
                <LinearGradient colors={['#353F54', '#222834']} style={styles.cardIcon}>
                    <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
                    {/* <Text style={{color: 'white'}}>{item}</Text> */}
                    
                    <Image source={require('../assets/images/battery.png')} style={{width: 30, height: 30}} />
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