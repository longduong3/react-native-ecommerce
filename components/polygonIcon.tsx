import React from 'react';
import { View, StyleSheet, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Ionicons} from "@expo/vector-icons";

const PolygonIcon = ({focused, icon}: any) => {
    if (focused) {
        return (
            <View style={styles.wrapper}>
                <LinearGradient
                    colors={['#4EC7FF', '#4256FF']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.card}
                >
                    <View style={styles.content}>
                        <Ionicons name={icon} size={30} color="#ffff" style={styles.focusedIcon}/>
                    </View>
                </LinearGradient>
            </View>
        );
    } else {
        return (
            <View style={styles.wrapper}>
                <Ionicons name={icon} size={20} color="#ffff" style={styles.unFocusedIcon}/>
            </View>
        )
    }
};

const CARD_WIDTH = 80;
const CARD_HEIGHT = 60;
const SKEW_DEG = '-14deg';

const styles = StyleSheet.create({
    wrapper: {
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ rotate: '-15deg' }],
        shadowColor: '#10141C',
        shadowOpacity: 0.35,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        elevation: 8,
    },

    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 15,
        transform: [{ skewX: SKEW_DEG }],
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#34C8E8',
    },

    content: {
        transform: [{ rotate: '15deg' }],
    },

    focusedIcon: {
        // height: 20,
        // width: 30,
        transform: [{ skewX: '14deg' }],
    },

    unFocusedIcon: {
        transform: [{ rotate: '15deg' }],
        height: 18,
        width: 20,
    }
});

export default PolygonIcon;
