import PolygonCard from "@/components/polygonCard";
import React from "react";
import {ImageBackground, ScrollView, StyleSheet, View, Text, Image, Button} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import CardCross from '../../components/cardCross';
import CardIcon from '../../components/cardIcon';
import {Link} from "expo-router";

export default function Index() {
    const products = [
        {id: 1, name: 'Road Bike', imageCard: require('../../assets/images/bike2.png')},
        {id: 2, name: 'Road Bike 1', imageCard: require('../../assets/images/mask1.png')},
        {id: 3, name: 'Road Bike 2', imageCard: require('../../assets/images/bike2.png')},
        {id: 4, name: 'Road Bike 3', imageCard: require('../../assets/images/mask1.png')},
        {id: 5, name: 'Road Bike 4', imageCard: require('../../assets/images/bike2.png')},
        {id: 6, name: 'Road Bike 5', imageCard: require('../../assets/images/mask1.png')},
    ];

    return (
        <SafeAreaView className="flex-1 bg-transparent" edges={['top']} >
            <View className="h-full flex-1 bg-transparent">
                <View className="pl-8 pr-8 flex-row justify-between items-center bg-transparent">
                    <Text className="text-2xl font-bold text-white">Choose your bike</Text>
                    <View className="bg-blue-400 p-3 rounded-lg">
                        <Image className="h-5 w-5" source={require('../../assets/images/icon-search.png')}></Image>
                    </View>
                </View>
                <ScrollView
                    className="flex-1 mt-0 pl-8 pr-8 bg-transparent"
                    showsVerticalScrollIndicator={false}
                >
                    <CardCross imageSource={require('../../assets/images/bike1.png')} titleCard={'30% OFF'}/>
                    <CardIcon/>
                    <View style={styles.cardGrid}>
                        {products.map((item, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.cardItem,
                                    index % 2 === 0 ? styles.cardItemLeft : styles.cardItemRight,
                                ]}
                            >
                                <Link href={`/bikes/${item.name}`}>
                                    <PolygonCard imageCard={item.imageCard} cardWidth={150}/>
                                </Link>
                            </View>
                        ))}
                    </View>

                </ScrollView>
            </View>
        </SafeAreaView>
    )

}
const styles = StyleSheet.create({
    menuFunc: {},
    cardIcon: {
        padding: 20,
        marginTop: 20,
        marginRight: 20,
        backgroundColor: 'gray',
        borderRadius: 10,
        opacity: 0.8
    },
    cardGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 20
    },
    cardItem: {
        width: '48%',
        marginBottom: 20,
        alignItems: 'center'
    },
    cardItemLeft: {
        marginTop: 40,
    },
    cardItemRight: {
        marginTop: 0,
    }
});
