import {Text, View, ImageBackground, ScrollView, StyleSheet} from "react-native";
import CardCross from '../../components/cardCross';
import CardIcon from '../../components/cardIcon';
import {SafeAreaView} from 'react-native-safe-area-context';
import {icons} from "@/constants/icons";
import PolygonCard from "@/components/polygonCard";
import React from "react";

export default function Index() {
    return (
        <SafeAreaView>
            <ImageBackground source={require('../../assets/images/bg.png')} style={{width: '100%', height: '100%'}}>
                <View className="">
                    <ScrollView style={styles.bodyStyle}>
                        <CardCross imageSource={require('../../assets/images/bike1.png')} titleCard={'30% OFF'}/>
                        <CardIcon/>
                        <View className="flex-row">
                            <PolygonCard imageCard={require('../../assets/images/bike2.png')} cardHeight={200} cardWidth={190} paddingTop={80}/>
                            <PolygonCard imageCard={require('../../assets/images/mask1.png')} cardHeight={200} cardWidth={190} paddingTop={0}/>
                        </View>

                    </ScrollView>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )

}
const styles = StyleSheet.create({
    headerSection: {
        flexDirection: 'row',
        padding: 20,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    container: {},
    headerText: {
        fontSize: 18,
        color: 'white'
    },
    input: {
        height: 40,
        width: 100,
        borderColor: 'gray',
        borderWidth: 1
    },
    bodyStyle: {
        marginTop: 0,
        height: '100%',
        paddingLeft: 30,
        paddingRight: 30
    },
    menuFunc: {},
    cardIcon: {
        padding: 20,
        marginTop: 20,
        marginRight: 20,
        backgroundColor: 'gray',
        borderRadius: 10,
        opacity: 0.8
    }
});
