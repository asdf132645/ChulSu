import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { navigationRef } from '../../navigation/RootNavigation';
import { COLORS } from '../../constants/theme';

const Footer = () => {
    // 현재 활성화된 라우트 이름 저장
    const [currentRoute, setCurrentRoute] = useState('Home');

    // 내비게이션 상태 변경 감지 리스너
    useEffect(() => {
        const unsubscribe = navigationRef.addListener('state', () => {
            const route = navigationRef.getCurrentRoute();
            if (route) {
                setCurrentRoute(route.name);
            }
        });
        return unsubscribe;
    }, []);

    // 탭 활성화 여부 체크 함수 (서브 화면까지 포함하여 처리 가능)
    const isActive = (tabName: string) => {
        // 예: 'ChatGuide' 탭은 'ChatRoom' 화면에서도 불이 들어오게 처리 가능
        if (tabName === 'EstimateType') {
            return ['EstimateType', 'Booking', 'GeneralEstimate'].includes(currentRoute);
        }
        if (tabName === 'ChatGuide') {
            return ['ChatGuide', 'ChatRoom'].includes(currentRoute);
        }
        return currentRoute === tabName;
    };

    // 활성화 색상 반환 (활성: 주황색 / 비활성: 회색)
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

            {/* 2. 견적신청 탭 (견적 관련 화면 진입 시에도 주황불 유지) */}
            <TouchableOpacity style={styles.tab} onPress={() => navigationRef.navigate('EstimateType')}>
                <Icon
                    name={isActive('EstimateType') ? "add-circle" : "add-circle-outline"}
                    size={28}
                    color={getColor('EstimateType')}
                />
                <Text style={[styles.tabText, { color: getColor('EstimateType') }]}>견적신청</Text>
            </TouchableOpacity>

            {/* 3. 메시지 탭 (채팅방 안에서도 주황불 유지) */}
            <TouchableOpacity style={styles.tab} onPress={() => navigationRef.navigate('ChatGuide')}>
                <Icon
                    name={isActive('ChatGuide') ? "chatbubble" : "chatbubble-outline"}
                    size={22}
                    color={getColor('ChatGuide')}
                />
                <Text style={[styles.tabText, { color: getColor('ChatGuide') }]}>메시지</Text>
            </TouchableOpacity>

            {/* 4. 마이철수 탭 */}
            <TouchableOpacity style={styles.tab} onPress={() => console.log("마이페이지 이동")}>
                <Icon
                    name={isActive('MyPage') ? "person" : "person-outline"}
                    size={22}
                    color={getColor('MyPage')}
                />
                <Text style={[styles.tabText, { color: getColor('MyPage') }]}>마이철수</Text>
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