import { View, StyleSheet, Image, ImageSourcePropType, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from "expo-blur";
import React from "react";

type PolygonCardProps = {
    imageCard: ImageSourcePropType,
    cardHeight?: number,
    cardWidth?: number,
}

const CARD_WIDTH = 170;
const CARD_HEIGHT = 180;
const SKEW_DEG = '-16deg';

const PolygonCard = ({ imageCard, cardWidth, cardHeight }: PolygonCardProps) => {
    const width = cardWidth || CARD_WIDTH;
    const height = cardHeight || CARD_HEIGHT;

    return (
        <View style={[styles.wrapper]}>
            <View
                style={[
                    styles.cardContainer,
                    {
                        width: width,
                        height: height,
                        transform: [{ skewX: SKEW_DEG }]
                    }
                ]}
            >
                <LinearGradient
                    colors={['#353F54', '#222834']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[
                        StyleSheet.absoluteFill,
                        { opacity: 0.7 }
                    ]}
                />

                <BlurView
                    intensity={20}
                    tint="dark"
                    style={StyleSheet.absoluteFill}
                />

                <View style={styles.content}>
                    <Image source={imageCard} style={styles.imgStyle} />
                    <View style={styles.textStyle}>
                        <Text className="text-gray-400 text-sm">Road Bike</Text>
                        <Text className="text-white">SMITH - Trade</Text>
                        <Text className="text-gray-400 text-sm">$ 1,999.99</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        // padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ rotate: '-15deg' }],
        elevation: 8,
    },

    cardContainer: {
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },

    content: {
        transform: [{ rotate: '15deg' }],
        zIndex: 10,
    },

    imgStyle: {
        height: 90,
        width: 120,
        transform: [{ skewX: '14deg' }],
    },

    textStyle: {
        transform: [{ skewX: '14deg' }],
        padding: 10
    }
});

export default PolygonCard;