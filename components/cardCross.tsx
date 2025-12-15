import MaskedView from '@react-native-masked-view/masked-view';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Dimensions, ImageSourcePropType, StyleSheet, View } from 'react-native';
import Svg, {
  Defs,
  G,
  Image as ImageSVG,
  LinearGradient,
  Path,
  Stop,
  Text as TextSVG
} from 'react-native-svg';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 30;
const CARD_HEIGHT = 300;
const RADIUS = 20;

const getRoundedShape = (w: number, h: number): string => {
  const h_left = h;
  const h_right = h * 0.85;
  return `
    M 0, ${RADIUS}
    Q 0,0 ${RADIUS},0 
    L ${w - RADIUS}, 0 
    Q ${w},0 ${w},${RADIUS} 
    L ${w}, ${h_right - RADIUS} 
    Q ${w},${h_right} ${w - RADIUS},${h_right + (RADIUS * 0.15)} 
    L ${RADIUS}, ${h_left} 
    Q 0,${h_left} 0,${h_left - RADIUS} 
    Z
  `;
};

interface CardCrossProps {
  titleCard?: string;
  imageSource?: ImageSourcePropType;
}

export default function CardCross({titleCard, imageSource} : CardCrossProps) {
  const pathShape = getRoundedShape(CARD_WIDTH, CARD_HEIGHT);

  return (
    <View style={styles.container}>
      
      <MaskedView
        style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
        maskElement={
          <View style={{ backgroundColor: 'transparent', flex: 1 }}>
            <Svg width={CARD_WIDTH} height={CARD_HEIGHT}>
              <Path d={pathShape} fill="black" />
            </Svg>
          </View>
        }
      >
        <BlurView 
            intensity={30} 
            tint="dark" 
            style={StyleSheet.absoluteFill} 
        />

        <Svg width={CARD_WIDTH} height={CARD_HEIGHT} style={StyleSheet.absoluteFill}>
          <Defs>
            <LinearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor="#353F54" stopOpacity="0.6" />
              <Stop offset="1" stopColor="#222834" stopOpacity="0.8" />
            </LinearGradient>
          </Defs>

          <Path d={pathShape} fill="url(#glassGrad)" />

          <G>
            <ImageSVG
              x="5%"
              y="10%"
              width="90%"
              height="70%"
              preserveAspectRatio="xMidYMid meet"
              href={imageSource} 
            />
            <TextSVG
              x="25"
              y={CARD_HEIGHT - 40}
              fill="white"
              fontSize="28"
              fontWeight="bold"
            >
              {titleCard}
            </TextSVG>
          </G>
        </Svg>
      </MaskedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginTop: 20,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    backgroundColor: 'transparent'
  },
});