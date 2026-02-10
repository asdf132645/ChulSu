import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface ManualNotificationProps {
    visible: boolean;
    onClose: () => void;
}

// 더미 알림 데이터
const NOTIFICATIONS = [
    { id: '1', title: '견적 도착', desc: '강남구 역삼동 현장 견적이 도착했습니다.', time: '방금 전', read: false },
    { id: '2', title: '결제 완료', desc: '안심 결제 예치금이 입금되었습니다.', time: '1시간 전', read: true },
    { id: '3', title: '공지사항', desc: '설 연휴 고객센터 운영 안내', time: '어제', read: true },
];

const ManualNotification = ({ visible, onClose }: ManualNotificationProps) => {
    return (
        <Modal
            animationType="slide"
            transparent={true} // 뒤에 배경 비치게
            visible={visible}
            onRequestClose={onClose}
        >
            <SafeAreaView style={styles.container}>
                {/* 헤더 */}
                <View style={styles.header}>
                    <Text style={styles.title}>알림함</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Icon name="close" size={28} color="#111" />
                    </TouchableOpacity>
                </View>

                {/* 알림 리스트 */}
                <View style={styles.content}>
                    <FlatList
                        data={NOTIFICATIONS}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={[styles.notiItem, !item.read && styles.unreadItem]}>
                                <View style={styles.iconBox}>
                                    <Icon name="notifications" size={20} color={item.read ? "#999" : "#3B82F6"} />
                                </View>
                                <View style={styles.textBox}>
                                    <Text style={styles.notiTitle}>{item.title}</Text>
                                    <Text style={styles.notiDesc}>{item.desc}</Text>
                                    <Text style={styles.notiTime}>{item.time}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA', // 전체 화면 덮음
    },
    header: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111',
    },
    content: {
        flex: 1,
    },
    notiItem: {
        flexDirection: 'row',
        padding: 20,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    unreadItem: {
        backgroundColor: '#F0F9FF', // 읽지 않은 알림 배경색
    },
    iconBox: {
        marginRight: 16,
        justifyContent: 'flex-start',
        paddingTop: 2,
    },
    textBox: {
        flex: 1,
    },
    notiTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    notiDesc: {
        fontSize: 14,
        color: '#555',
        marginBottom: 8,
        lineHeight: 20,
    },
    notiTime: {
        fontSize: 12,
        color: '#999',
    }
});

export default ManualNotification;