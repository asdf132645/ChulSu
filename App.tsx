// App.tsx
import 'react-native-gesture-handler';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { navigationRef } from './src/navigation/RootNavigation'; // Ref 추가
import Header from './src/components/common/Header';
import Footer from './src/components/common/Footer';
import { COLORS } from './src/constants/theme';

const App = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer ref={navigationRef}>
                <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
                    {/* 이제 Header 내부에서 navigationRef를 쓰기 때문에 에러가 안 납니다. */}
                    <Header />
                    <View style={styles.main}>
                        <AppNavigator />
                    </View>
                    <Footer />
                </SafeAreaView>
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: COLORS.white },
    main: { flex: 1, backgroundColor: COLORS.background },
});

export default App;