import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../context/UserContext';

interface ManualMenuProps {
    visible: boolean;
    onClose: () => void;
}

const ManualMenu = ({ visible, onClose }: ManualMenuProps) => {
    const navigation = useNavigation<any>();
    const { isPartnerMode } = useUser();

    const navigateTo = (screen: string) => {
        onClose(); // 메뉴 닫고 이동
        navigation.navigate(screen);
    };

    return (
        <Modal
            animationType="fade" // "slide"는 아래에서 올라오므로 fade 후 수동 배치
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            {/* 1. 배경 (클릭 시 닫힘) */}
            <View style={styles.overlay}>
                <TouchableOpacity style={styles.overlayTouch} onPress={onClose} />

                {/* 2. 실제 메뉴 영역 (왼쪽) */}
                <View style={styles.menuContainer}>
                    <SafeAreaView style={{ flex: 1 }}>
                        {/* 상단 프로필 영역 */}
                        <View style={styles.profileSection}>
                            <Icon name="person-circle" size={60} color="#ccc" />
                            <View style={{ marginLeft: 12 }}>
                                <Text style={styles.userName}>김철수 님</Text>
                                <Text style={styles.userMode}>
                                    {isPartnerMode ? '👷 파트너 모드' : '👤 고객 모드'}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                                <Icon name="close" size={28} color="#000" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.divider} />

                        {/* 메뉴 리스트 */}
                        <ScrollView style={styles.menuList}>
                            <MenuItem icon="home-outline" text="홈으로" onPress={() => navigateTo('Home')} />
                            <MenuItem icon="document-text-outline" text="견적 내역" onPress={() => navigateTo('Schedule')} />
                            {isPartnerMode && (
                                <MenuItem icon="construct-outline" text="일감 찾기" onPress={() => navigateTo('JobList')} />
                            )}
                            <MenuItem icon="chatbubbles-outline" text="채팅 상담" onPress={() => navigateTo('ChatGuide')} />
                            <MenuItem icon="information-circle-outline" text="이용 가이드" onPress={() => navigateTo('Guide')} />

                            <View style={styles.divider} />

                            <MenuItem icon="settings-outline" text="설정" onPress={() => console.log('설정')} />
                            <MenuItem icon="log-out-outline" text="로그아웃" onPress={() => console.log('로그아웃')} />
                        </ScrollView>
                    </SafeAreaView>
                </View>
            </View>
        </Modal>
    );
};

// 메뉴 아이템 컴포넌트
const MenuItem = ({ icon, text, onPress }: { icon: string, text: string, onPress: () => void }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
        <Icon name={icon} size={24} color="#333" />
        <Text style={styles.menuText}>{text}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)', // 반투명 배경
        flexDirection: 'row',
    },
    overlayTouch: {
        flex: 1,
    },
    menuContainer: {
        width: '80%', // 화면의 80% 차지
        backgroundColor: '#FFF',
        height: '100%',
        position: 'absolute',
        left: 0,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111',
    },
    userMode: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    closeBtn: {
        position: 'absolute',
        right: 0,
        top: 0,
    },
    divider: {
        height: 1,
        backgroundColor: '#EEE',
        marginVertical: 10,
    },
    menuList: {
        flex: 1,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
    },
    menuText: {
        fontSize: 18,
        marginLeft: 16,
        color: '#333',
    }
});

export default ManualMenu;