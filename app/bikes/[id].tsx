import {Ionicons} from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
import {useLocalSearchParams, useRouter} from 'expo-router';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
    Animated,
    Dimensions,
    ImageBackground,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

type TabKey = 'description' | 'specification';

const bikes = {
    'Road Bike': {
        title: 'PEUGEOT - LR01',
        price: 1999.99,
        image: require('../../assets/images/bike1.png'),
        description:
            'The LR01 uses the same design as the most iconic bikes from PEUGEOT Cycles’ 130-year history and combines it with agile, dynamic performance for city riding. The lugged steel frame and iconic PEUGEOT black-and-white chequer design pair with a 16-speed Shimano Claris drivetrain.',
        specifications: {
            Frame: 'Lugged steel, city geometry',
            Drivetrain: 'Shimano Claris 2x8',
            Wheels: '700x25c city slicks',
            Brakes: 'Dual-pivot caliper',
            Weight: '9.4 kg',
        },
    },
    'Road Bike 1': {
        title: 'PEUGEOT - LR02',
        price: 2149.0,
        image: require('../../assets/images/bike2.png'),
        description:
            'Built for fast commutes and weekend spins, the LR02 mixes a light alloy frame with a carbon fork to keep steering precise while soaking up road buzz.',
        specifications: {
            Frame: '6061 alloy with carbon fork',
            Drivetrain: 'Shimano Tiagra 2x10',
            Wheels: '700x28c all-road',
            Brakes: 'Hydraulic disc',
            Weight: '9.1 kg',
        },
    },
    'Road Bike 2': {
        title: 'PEUGEOT - LR03',
        price: 1899.5,
        image: require('../../assets/images/mask1.png'),
        description:
            'A versatile daily rider with confident handling, wide tire clearance, and relaxed endurance fit for long days out.',
        specifications: {
            Frame: 'Endurance alloy, tapered head tube',
            Drivetrain: 'Shimano Sora 2x9',
            Wheels: '700x30c endurance',
            Brakes: 'Mechanical disc',
            Weight: '9.9 kg',
        },
    },
} as const;

const BikeDetail = () => {
    const router = useRouter();
    const {id} = useLocalSearchParams<{ id?: string }>();
    const [activeTab, setActiveTab] = useState<TabKey>('description');
    const [modalVisible, setModalVisible] = useState(false);

    const translateY = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(1)).current;

    const bike = useMemo(() => {
        if (!id) return null;
        return bikes[id as keyof typeof bikes] ?? null;
    }, [id]);

    useEffect(() => {
        if (modalVisible) {
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: -80,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(scale, {
                    toValue: 0.7,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(scale, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [modalVisible]);

    const handleOpen = (tab: TabKey) => {
        setActiveTab(tab);
        setModalVisible(true);
    };

    if (!bike) {
        return (
            <SafeAreaView className="flex-1 bg-black items-center justify-center">
                <Text className="text-white text-lg font-semibold">
                    Không tìm thấy thông tin xe.
                </Text>
                <TouchableOpacity
                    className="mt-4"
                    onPress={() => router.back()}
                    accessibilityRole="button"
                >
                    <Text className="text-blue-400">Quay lại</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-transparent" edges={['top', 'left', 'right']}>
            <ImageBackground source={require('../../assets/images/bg.png')} className="h-full">
                <View
                    style={styles.styleView}
                >
                    <View style={styles.header}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => router.back()}
                            style={styles.roundButton}
                            accessibilityLabel="Quay lại"
                        >
                            <Ionicons name="chevron-back" size={22} color="#c9d8ff"/>
                        </TouchableOpacity>
                        <Text style={styles.title}>{bike.title}</Text>
                        <View>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => router.back()}
                                style={styles.roundButton}
                                accessibilityLabel="Quay lại"
                            >
                                <Ionicons name="cart" size={22} color="#c9d8ff"/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.heroContainer}>
                        <Animated.Image
                            source={bike.image}
                            style={[
                                styles.bikeImage,
                                {
                                    transform: [
                                        {translateY: translateY},
                                        {scale: scale}
                                    ]
                                }
                            ]}
                            resizeMode="contain"
                        />
                    </View>

                    <View style={styles.dots}>
                        <View style={[styles.dot, styles.dotActive]}/>
                        <View style={styles.dot}/>
                        <View style={styles.dot}/>
                    </View>
                </View>

                <LinearGradient
                    colors={['#353F54', '#222834']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={styles.bottomBar}>
                    <TouchableOpacity
                        style={styles.bottomButton}
                        onPress={() => handleOpen('description')}
                        accessibilityRole="button"
                    >
                        <LinearGradient
                            colors={['rgba(0,0,0,0.3)', 'transparent', 'transparent']}
                            start={{x: 0, y: 0}}
                            end={{x: 0, y: 1}}
                            style={styles.insetShadow}
                        />
                        <Text style={styles.bottomButtonText}>
                            Description
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.bottomButton}
                        onPress={() => handleOpen('specification')}
                        accessibilityRole="button"
                    >
                        <LinearGradient
                            colors={['rgba(0,0,0,0.3)', 'transparent', 'transparent']}
                            start={{x: 0, y: 0}}
                            end={{x: 0, y: 1}}
                            style={styles.insetShadow}
                        />
                        <Text style={styles.bottomButtonText}>Specification</Text>
                    </TouchableOpacity>
                </LinearGradient>

                <Modal
                    visible={modalVisible}
                    transparent
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalBackdrop}>
                        <View style={styles.modalCard}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>
                                    {activeTab === 'description' ? 'Mô tả' : 'Thông số kỹ thuật'}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => setModalVisible(false)}
                                    accessibilityRole="button"
                                >
                                    <Ionicons name="close" size={22} color="#c9d8ff"/>
                                </TouchableOpacity>
                            </View>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={styles.modalContent}
                            >
                                {activeTab === 'description' ? (
                                    <Text style={styles.descriptionText}>{bike.description}</Text>
                                ) : (
                                    Object.entries(bike.specifications).map(([key, value]) => (
                                        <View key={key} style={styles.specRow}>
                                            <Text style={styles.specKey}>{key}</Text>
                                            <Text style={styles.specValue}>{value}</Text>
                                        </View>
                                    ))
                                )}
                            </ScrollView>
                            <View style={styles.modalFooter}>
                                <View>
                                    <Text style={styles.priceValue}>$ {bike.price.toFixed(2)}</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.ctaButton}
                                    accessibilityRole="button"
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.ctaText}>Add to Cart</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default BikeDetail;

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    styleView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
    },
    roundButton: {
        height: 38,
        width: 38,
        borderRadius: 12,
        backgroundColor: '#142143',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#1f2b52',
    },
    title: {
        color: '#f4f7ff',
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    heroContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    diagonal: {
        position: 'absolute',
        width: width * 0.85,
        height: width * 0.85,
        transform: [{skewY: '-12deg'}],
        borderRadius: 24,
        opacity: 0.9,
    },
    bikeImage: {
        width: width,
        height: width,
    },
    dots: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 12,
    },
    dot: {
        height: 6,
        width: 6,
        borderRadius: 3,
        backgroundColor: '#1c2b4f',
    },
    dotActive: {
        width: 24,
        backgroundColor: '#2f8fed',
    },
    bottomBar: {
        backgroundColor: '#353F54',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        flexDirection: 'row',
        paddingHorizontal: 30,
        paddingVertical: 30,
        gap: 12,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.9,
        shadowRadius: 10,
    },
    bottomButton: {
        flex: 1,
        backgroundColor: '#28303F',
        borderRadius: 20,
        paddingVertical: 18,
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    insetShadow: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 20,
    },
    bottomButtonText: {
        color: '#7f8fb6',
        fontWeight: '600',
    },
    bottomButtonActive: {
        color: '#3ca2ff',
    },
    modalBackdrop: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalCard: {
        backgroundColor: '#353F54',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        // padding: 20,
        maxHeight: '78%',
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.7,
        shadowRadius: 10,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        padding: 20
    },
    modalTitle: {
        color: '#e8edff',
        fontSize: 18,
        fontWeight: '700',
    },
    modalContent: {
        paddingBottom: 12,
        gap: 10,
        paddingHorizontal: 20
    },
    descriptionText: {
        color: '#c3cde7',
        fontSize: 15,
        lineHeight: 22,
    },
    specRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#1b2746',
    },
    specKey: {
        color: '#8fa5d7',
        fontWeight: '600',
        flex: 1,
    },
    specValue: {
        color: '#d8e2ff',
        flex: 1,
        textAlign: 'right',
    },
    modalFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
        gap: 12,
        backgroundColor: '#262E3D',
        paddingVertical: 20,
        paddingHorizontal: 16,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    priceLabel: {
        color: '#7f8fb6',
        fontSize: 12,
    },
    priceValue: {
        color: '#3ca2ff',
        fontSize: 20,
        fontWeight: '700',
        marginTop: 2,
    },
    ctaButton: {
        flex: 1,
        backgroundColor: '#3b8cf5',
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
    },
    ctaText: {
        color: '#f6fbff',
        fontSize: 16,
        fontWeight: '700',
    },
});