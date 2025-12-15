import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Tabs} from 'expo-router';
import PolygonIcon from '../../components/polygonIcon';
import {icons} from "@/constants/icons";

const _layout = () => {
    return (
        <Tabs screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: '#363E51',
                opacity: 0.9
            }
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <PolygonIcon focused={focused} icon={icons.bicycle} />
                    )
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: 'Cart',
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <PolygonIcon focused={focused} icon={icons.cart} />
                    )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profiles',
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <PolygonIcon focused={focused} icon={icons.person} />
                    )
                }}
            />
        </Tabs>
    )
}

export default _layout

const styles = StyleSheet.create({})