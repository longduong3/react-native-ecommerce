import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React from 'react';
import {Tabs} from 'expo-router';
import PolygonIcon from '../../components/polygonIcon';
import {icons} from "@/constants/icons";

const _layout = () => {
    return (
        <ImageBackground source={require('../../assets/images/bg.png')} style={{width: '100%', height: '100%'}}>
            <Tabs screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#363E51',
                    opacity: 0.9
                },
                sceneStyle: {
                    backgroundColor: 'transparent',
                },
            }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        headerShown: false,
                        tabBarIcon: ({focused}) => (
                            <PolygonIcon focused={focused} icon={'bicycle'}/>
                        )
                    }}
                />
                <Tabs.Screen
                    name="cart"
                    options={{
                        title: 'Cart',
                        headerShown: false,
                        tabBarIcon: ({focused}) => (
                            <PolygonIcon focused={focused} icon={'cart'}/>
                        )
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Profiles',
                        headerShown: false,
                        tabBarIcon: ({focused}) => (
                            <PolygonIcon focused={focused} icon={'person'}/>
                        )
                    }}
                />
            </Tabs>
        </ImageBackground>
    )
}

export default _layout

const styles = StyleSheet.create({})