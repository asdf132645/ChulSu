import React, { useEffect } from 'react';
import { View, Image, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
    const navigation = useNavigation<any>();

    useEffect(() => {
        const timer = setTimeout(() => {
            // 🔥 [수정 완료] 개발자님 코드에 있는 "Home"으로 정확히 연결했습니다.
            navigation.replace('Home');
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <Image
                source={require('../assets/images/splash.png')}
                style={styles.image}
                resizeMode="contain"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: width * 0.9,
        height: height * 0.8,
    },
});

export default SplashScreen;