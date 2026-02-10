// App.tsx
import 'react-native-gesture-handler';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { navigationRef } from './src/navigation/RootNavigation';
import { ToastProvider } from './src/components/common/Toast';
import Footer from './src/components/common/Footer';
import { UserProvider } from './src/context/UserContext';
import { COLORS } from './src/constants/theme';

const App = () => {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <ToastProvider>
          <NavigationContainer ref={navigationRef}>
            <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
              {/* 🚨 여기 있던 <Header />를 지웁니다! */}
              {/* 헤더는 이제 각 화면(Screen) 안에서 <Header />를 불러와서 씁니다. */}

              <View style={styles.main}>
                <AppNavigator />
              </View>

              {/* 푸터는 전역으로 유지 (원하시는 대로) */}
              <Footer />
            </SafeAreaView>
          </NavigationContainer>
        </ToastProvider>
      </UserProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.white },
  main: { flex: 1, backgroundColor: COLORS.background },
});

export default App;
