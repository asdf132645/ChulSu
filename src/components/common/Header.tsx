import React, { useState } from 'react'; // useState 추가
import { View, Text, TouchableOpacity, StyleSheet, Image, Switch, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { SPACING } from '../../constants/theme';
import { useUser } from '../../context/UserContext';

// 🔥 수동 컴포넌트 import
import ManualMenu from './ManualMenu';
import ManualNotification from './ManualNotification';

const LogoImage = require('../../assets/images/app-logo.png');

interface HeaderProps {
    title?: string;
    showBackButton?: boolean;
    showBorder?: boolean;
    rightIcon?: string;
    onRightPress?: () => void;
    showModeToggle?: boolean;
}

const Header = ({
                    title,
                    showBackButton = false,
                    showBorder = true,
                    rightIcon,
                    onRightPress,
                    showModeToggle = false
                }: HeaderProps) => {
    const navigation = useNavigation<any>();
    const { isPartnerMode, toggleUserMode } = useUser();

    // 🔥 [핵심] 메뉴와 알림창을 열고 닫는 상태값 (순정 기능)
    const [menuVisible, setMenuVisible] = useState(false);
    const [notiVisible, setNotiVisible] = useState(false);

    // 1. 왼쪽 영역
    const renderLeft = () => {
        if (title || showBackButton) {
            return (
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
                    <Icon name="arrow-back" size={24} color="#111" />
                </TouchableOpacity>
            );
        } else {
            // 🔥 메뉴 버튼 클릭 시 상태 변경
            return (
                <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.iconBtn}>
                    <Icon name="menu-outline" size={28} color="#111" />
                </TouchableOpacity>
            );
        }
    };

    // 2. 오른쪽 영역
    const renderRight = () => {
        if (rightIcon) {
            return (
                <TouchableOpacity onPress={onRightPress} style={styles.iconBtn}>
                    <Icon name={rightIcon} size={24} color="#111" />
                </TouchableOpacity>
            );
        } else if (!title) {
            // 🔥 알림 버튼 클릭 시 상태 변경
            return (
                <TouchableOpacity onPress={() => setNotiVisible(true)} style={styles.iconBtn}>
                    <Icon name="notifications-outline" size={24} color="#111" />
                </TouchableOpacity>
            );
        } else {
            return <View style={styles.placeholder} />;
        }
    };

    return (
        <>
            <View style={styles.wrapper}>
                <View style={[styles.headerContainer, (showBorder && !showModeToggle) && styles.borderBottom]}>
                    <View style={styles.leftContainer}>{renderLeft()}</View>
                    <View style={styles.centerContainer}>
                        {title ? (
                            <Text style={styles.title}>{title}</Text>
                        ) : (
                            <Image source={LogoImage} style={styles.logo} resizeMode="contain" />
                        )}
                    </View>
                    <View style={styles.rightContainer}>{renderRight()}</View>
                </View>

                {showModeToggle && (
                    <View style={styles.modeBar}>
                        <View style={styles.modeContent}>
                            <Icon name={isPartnerMode ? "briefcase" : "person"} size={16} color="#FFF" style={{ marginRight: 6 }} />
                            <Text style={styles.modeText}>
                                {isPartnerMode ? '파트너(작업자) 모드' : '고객(사용자) 모드'}
                            </Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={isPartnerMode ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleUserMode}
                                value={isPartnerMode}
                                style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }], marginLeft: 10 }}
                            />
                        </View>
                    </View>
                )}
            </View>

            {/* 🔥 [핵심] 여기에 수동 팝업 컴포넌트 배치 */}
            <ManualMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
            <ManualNotification visible={notiVisible} onClose={() => setNotiVisible(false)} />
        </>
    );
};

const styles = StyleSheet.create({
    wrapper: { backgroundColor: '#FFF', zIndex: 100 },
    headerContainer: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING?.m || 16,
        backgroundColor: '#FFF',
    },
    borderBottom: { borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
    leftContainer: { width: 40, alignItems: 'flex-start' },
    centerContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    rightContainer: { width: 40, alignItems: 'flex-end' },
    title: { fontSize: 18, fontWeight: 'bold', color: '#111' },
    logo: { width: 90, height: 28 },
    iconBtn: { padding: 4 },
    placeholder: { width: 32 },
    modeBar: {
        backgroundColor: '#333333',
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modeContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modeText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 4,
    }
});

export default Header;