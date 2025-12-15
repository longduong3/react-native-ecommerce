import { View, StyleSheet, Image, ImageSourcePropType, Text} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {BlurView} from "expo-blur";
import React from "react";

type PolygonCardProps = {
    imageCard: ImageSourcePropType,
    cardHeight?: number,
    cardWidth?: number,
    paddingTop?: number,
}

const CARD_WIDTH = 80;
const CARD_HEIGHT = 60;
const SKEW_DEG = '-14deg';

const PolygonCard = ({imageCard, cardWidth, cardHeight, paddingTop}: PolygonCardProps) => {
    return (
        <View style={[styles.wrapper, {marginTop: paddingTop}]}>
            <LinearGradient
                colors={['#353F54', '#222834']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                    styles.baseCardStyle, // Các style tĩnh
                    {
                        width: cardWidth,
                        height: cardHeight,
                        transform: [{ skewX: SKEW_DEG }]
                    }
                ]}
            >
                <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
                <View style={styles.content}>
                    <Image source={imageCard} style={styles.imgStyle}/>
                    <View style={styles.textStyle}>
                        <Text className="text-white">Road Bike</Text>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ rotate: '-15deg' }],
        elevation: 8,
    },

    baseCardStyle: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 15,
        transform: [{ skewX: SKEW_DEG }],
        justifyContent: 'center',
        alignItems: 'center',
        // opacity: 0.8,
    },

    content: {
        transform: [{ rotate: '15deg' }],
    },

    imgStyle: {
        height: 60,
        width: 90,
        transform: [{ skewX: '14deg' }],
    },

    textStyle: {
        transform: [{ skewX: '14deg' }],
        padding: 20
    }
});

export default PolygonCard;
