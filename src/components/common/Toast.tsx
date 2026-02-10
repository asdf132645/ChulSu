import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/theme';

// 토스트 타입 정의 (성공/에러/정보)
type ToastType = 'success' | 'error' | 'info';

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// ✅ 어디서든 쓸 수 있는 Hook
export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within a ToastProvider');
    return context;
};

// ✅ 토스트 Provider (App.tsx 감싸는 용도)
export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState<ToastType>('success');

    // 애니메이션 값 (아래에서 위로 올라오기)
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(50)).current;

    const showToast = (msg: string, t: ToastType = 'success') => {
        setMessage(msg);
        setType(t);
        setVisible(true);

        // 등장 애니메이션
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
            Animated.timing(translateY, { toValue: 0, duration: 300, useNativeDriver: true })
        ]).start();

        // 2.5초 뒤 자동 사라짐
        setTimeout(hideToast, 2500);
    };

    const hideToast = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
            Animated.timing(translateY, { toValue: 50, duration: 300, useNativeDriver: true })
        ]).start(() => setVisible(false));
    };

    // 타입별 아이콘 & 색상 설정
    const getToastConfig = () => {
        switch (type) {
            case 'success': return { icon: 'checkmark-circle', color: '#4CAF50', bg: '#E8F5E9' };
            case 'error':   return { icon: 'alert-circle', color: '#FF5252', bg: '#FFEBEE' };
            default:        return { icon: 'information-circle', color: COLORS.primary, bg: '#E3F2FD' };
        }
    };

    const config = getToastConfig();

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {visible && (
                <Animated.View style={[
                    styles.toastContainer,
                    { opacity: fadeAnim, transform: [{ translateY }] },
                    { backgroundColor: '#333' } // 다크 모드 스타일 (고급짐)
                ]}>
                    <View style={styles.contentRow}>
                        {/* 아이콘 */}
                        <Icon name={config.icon} size={24} color={config.color} style={{ marginRight: 10 }} />
                        {/* 메시지 */}
                        <Text style={styles.messageText}>{message}</Text>
                    </View>
                </Animated.View>
            )}
        </ToastContext.Provider>
    );
};

const styles = StyleSheet.create({
    toastContainer: {
        position: 'absolute',
        bottom: 100, // 하단 탭바 위에 뜨도록 위치 조정
        alignSelf: 'center',
        width: '90%',
        backgroundColor: '#333', // 짙은 회색 배경
        borderRadius: 50, // 둥근 알약 모양
        paddingVertical: 14,
        paddingHorizontal: 24,

        // 그림자 효과 (입체감)
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
        zIndex: 9999, // 최상위 노출
    },
    contentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // 중앙 정렬
    },
    messageText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
        flexShrink: 1,
    }
});