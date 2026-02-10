import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalStyles } from '../../../styles/globalStyles';
import { COLORS, SPACING } from '../../../constants/theme';
import Header from "../../../components/common/Header.tsx";

// 1. 상담 요청 목록 (기존 데이터)
const REQUEST_DATA = [
    {
        id: '1',
        partnerName: '안심철거 본사팀',
        type: 'premium',
        location: '서울 강남구 역삼동',
        distance: '2.3km',
        rating: 4.9,
        reviewCount: 234,
        status: 'visit_req',
        statusText: '방문 견적 필수',
        time: '10분 전'
    },
    {
        id: '2',
        partnerName: '빠른복구',
        type: 'basic',
        location: '서울 서초구',
        distance: '5.1km',
        rating: 4.7,
        reviewCount: 156,
        status: 'chatting',
        statusText: '채팅 상담 중',
        time: '1시간 전'
    }
];

// 2. [NEW] 진행 중인 공사 목록 (새로 추가됨)
const ONGOING_DATA = [
    {
        id: '101',
        partnerName: '프로철거',
        type: 'basic',
        projectName: '송파구 아파트 내부 철거',
        period: '2026.02.15 ~ 2026.02.18',
        progress: '시공 진행 중', // 현재 상태
        price: '280만원',
        dDay: 'D-5'
    },
    {
        id: '102',
        partnerName: '서울폐기물',
        type: 'premium',
        projectName: '강동구 상가 원상복구',
        period: '2026.02.20 (1일 소요)',
        progress: '예약 확정',
        price: '일반 견적',
        dDay: 'D-10'
    }
];

const ChatListScreen = ({ navigation }: any) => {
    const [activeTab, setActiveTab] = useState<'request' | 'ongoing'>('request');

    // 상담 요청 리스트 아이템
    const renderRequestItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('ChatRoom', { partnerName: item.partnerName, type: item.type })}
        >
            <View style={styles.cardHeader}>
                <View style={styles.partnerRow}>
                    <Text style={styles.partnerName}>{item.partnerName}</Text>
                    {item.type === 'premium' && <View style={styles.badge}><Text style={styles.badgeText}>안심</Text></View>}
                </View>
                <Text style={styles.timeText}>{item.time}</Text>
            </View>
            <Text style={styles.subText}>{item.location} ({item.distance})</Text>
            <View style={styles.statusRow}>
                <View style={styles.statusChip}>
                    <Text style={styles.statusChipText}>{item.statusText}</Text>
                </View>
                <TouchableOpacity style={styles.chatBtn}>
                    <Text style={styles.chatBtnText}>대화하기</Text>
                    <Icon name="chevron-forward" size={14} color={COLORS.textSecondary} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    // [NEW] 진행 중 공사 리스트 아이템
    const renderOngoingItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.ongoingCard}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('ChatRoom', { partnerName: item.partnerName, type: item.type })}
        >
            <View style={styles.ongoingHeader}>
                <Text style={styles.ongoingState}>{item.progress}</Text>
                <Text style={styles.dDay}>{item.dDay}</Text>
            </View>
            <Text style={styles.projectName}>{item.projectName}</Text>
            <Text style={styles.periodText}>📅 공사 기간: {item.period}</Text>
            <View style={styles.divider} />
            <View style={styles.ongoingFooter}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Icon name="person-circle" size={20} color="#888" />
                    <Text style={styles.footerPartner}>{item.partnerName}</Text>
                </View>
                <Text style={styles.footerPrice}>{item.price}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={globalStyles.container}>
            <Header title="견적 상담" />

            {/* 탭 버튼 */}
            <View style={styles.tabContainer}>
                <TouchableOpacity style={[styles.tab, activeTab === 'request' && styles.activeTab]} onPress={() => setActiveTab('request')}>
                    <Text style={[styles.tabText, activeTab === 'request' && styles.activeTabText]}>상담 요청 <Text style={{color: COLORS.primary}}>2</Text></Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tab, activeTab === 'ongoing' && styles.activeTab]} onPress={() => setActiveTab('ongoing')}>
                    <Text style={[styles.tabText, activeTab === 'ongoing' && styles.activeTabText]}>진행 중인 공사</Text>
                </TouchableOpacity>
            </View>

            {/* 리스트 영역 */}
            <View style={styles.listContainer}>
                {activeTab === 'request' ? (
                    <FlatList
                        data={REQUEST_DATA}
                        renderItem={renderRequestItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    />
                ) : (
                    <FlatList
                        data={ONGOING_DATA} // 진행 중 데이터 연결
                        renderItem={renderOngoingItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        ListEmptyComponent={
                            <View style={styles.emptyState}>
                                <Icon name="construct-outline" size={48} color="#DDD" />
                                <Text style={styles.emptyText}>진행 중인 공사가 없습니다.</Text>
                            </View>
                        }
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    tabContainer: { flexDirection: 'row', backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#EEE' },
    tab: { flex: 1, paddingVertical: 16, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
    activeTab: { borderBottomColor: COLORS.primary },
    tabText: { fontSize: 16, color: COLORS.textSecondary, fontWeight: 'bold' },
    activeTabText: { color: COLORS.textPrimary },

    listContainer: { flex: 1, padding: SPACING.m, backgroundColor: '#F5F7FA' },

    // 상담 요청 카드 스타일
    card: { backgroundColor: '#FFF', borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#EEE' },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
    partnerRow: { flexDirection: 'row', alignItems: 'center' },
    partnerName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    badge: { backgroundColor: COLORS.secondary, paddingHorizontal: 4, borderRadius: 4, marginLeft: 6 },
    badgeText: { color: '#FFF', fontSize: 10 },
    timeText: { fontSize: 12, color: '#AAA' },
    subText: { fontSize: 13, color: '#666', marginBottom: 12 },
    statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    statusChip: { backgroundColor: '#F0F0F0', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
    statusChipText: { fontSize: 12, color: '#555' },
    chatBtn: { flexDirection: 'row', alignItems: 'center' },
    chatBtnText: { fontSize: 14, fontWeight: 'bold', marginRight: 2 },

    // 진행 중 공사 카드 스타일
    ongoingCard: { backgroundColor: '#FFF', borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: COLORS.primary, elevation: 2 },
    ongoingHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    ongoingState: { fontSize: 12, fontWeight: 'bold', color: COLORS.primary, backgroundColor: '#E3F2FD', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
    dDay: { fontSize: 12, fontWeight: 'bold', color: '#E91E63' },
    projectName: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 4 },
    periodText: { fontSize: 13, color: '#666' },
    divider: { height: 1, backgroundColor: '#EEE', marginVertical: 12 },
    ongoingFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    footerPartner: { fontSize: 13, color: '#333', marginLeft: 4, fontWeight: '500' },
    footerPrice: { fontSize: 16, fontWeight: 'bold', color: '#333' },

    emptyState: { alignItems: 'center', marginTop: 50 },
    emptyText: { color: '#AAA', marginTop: 10 }
});

export default ChatListScreen;