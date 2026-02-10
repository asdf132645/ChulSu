import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { navigationRef } from '../../navigation/RootNavigation';
import { COLORS } from '../../constants/theme';
import { useUser } from '../../context/UserContext';

const Footer = () => {
    const { isPartnerMode } = useUser();
    // 🔥 [수정 1] 초기값을 'Splash'로 변경 (앱 켜자마자 푸터가 보이면 안 되니까요!)
    const [currentRoute, setCurrentRoute] = useState('Splash');

    useEffect(() => {
        const unsubscribe = navigationRef.addListener('state', () => {
            const route = navigationRef.getCurrentRoute();
            if (route) {
                setCurrentRoute(route.name);
            }
        });
        return unsubscribe;
    }, []);

    // 🔥 [수정 2] 푸터를 숨길 화면들의 이름 목록
    // 여기에 'Splash', 'Login', 'ChatRoom' 등을 추가하면 그 화면에선 푸터가 사라집니다.
    const HIDDEN_SCREENS = ['Splash', 'Login', 'Register'];

    // 현재 화면이 숨김 목록에 있다면 -> 아무것도 그리지 않음 (return null)
    if (HIDDEN_SCREENS.includes(currentRoute)) {
        return null;
    }

    // --- 기존 로직 유지 ---
    const isActive = (tabName: string) => {
        if (tabName === 'ActionTab') {
            return isPartnerMode
                ? ['JobList', 'JobDetail'].includes(currentRoute)
                : ['EstimateType', 'Booking', 'GeneralEstimate'].includes(currentRoute);
        }
        if (tabName === 'ChatGuide') {
            return ['ChatGuide', 'ChatRoom'].includes(currentRoute);
        }
        return currentRoute === tabName;
    };

    const getColor = (tabName: string) => isActive(tabName) ? COLORS.secondary : COLORS.textSecondary;

    return (
        <View style={styles.footer}>
            {/* 1. 홈 탭 */}
            <TouchableOpacity style={styles.tab} onPress={() => navigationRef.navigate('Home')}>
                <Icon
                    name={isActive('Home') ? "home" : "home-outline"}
                    size={22}
                    color={getColor('Home')}
                />
                <Text style={[styles.tabText, { color: getColor('Home') }]}>홈</Text>
            </TouchableOpacity>

            {/* 2. 가변 탭 (일감찾기 / 견적신청) */}
            <TouchableOpacity
                style={styles.tab}
                onPress={() => {
                    if (isPartnerMode) {
                        navigationRef.navigate('JobList');
                    } else {
                        navigationRef.navigate('EstimateType');
                    }
                }}
            >
                <Icon
                    name={isPartnerMode
                        ? (isActive('ActionTab') ? "search" : "search-outline")
                        : (isActive('ActionTab') ? "add-circle" : "add-circle-outline")
                    }
                    size={28}
                    color={getColor('ActionTab')}
                />
                <Text style={[styles.tabText, { color: getColor('ActionTab') }]}>
                    {isPartnerMode ? "일감찾기" : "견적신청"}
                </Text>
            </TouchableOpacity>

            {/* 3. 메시지 탭 */}
            <TouchableOpacity style={styles.tab} onPress={() => navigationRef.navigate('ChatGuide')}>
                <Icon
                    name={isActive('ChatGuide') ? "chatbubble" : "chatbubble-outline"}
                    size={22}
                    color={getColor('ChatGuide')}
                />
                <Text style={[styles.tabText, { color: getColor('ChatGuide') }]}>메시지</Text>
            </TouchableOpacity>

            {/* 4. 마이페이지 탭 */}
            <TouchableOpacity style={styles.tab} onPress={() => console.log("마이페이지 이동")}>
                <Icon
                    name={isActive('MyPage') ? "person" : "person-outline"}
                    size={22}
                    color={getColor('MyPage')}
                />
                <Text style={[styles.tabText, { color: getColor('MyPage') }]}>
                    {isPartnerMode ? "파트너홈" : "마이철수"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        height: 65,
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 50
    },
    tabText: {
        fontSize: 11,
        marginTop: 4,
        fontWeight: '500'
    }
});

export default Footer;