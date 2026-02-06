import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalStyles } from '../../../styles/globalStyles';
import { COLORS, SPACING } from '../../../constants/theme';

// 기획서 9P 기반 더미 데이터 [cite: 360-382]
const ESTIMATE_DATA = [
    {
        id: '1',
        type: 'premium', // 안심 견적
        partnerName: '안심철거 본사팀',
        rating: 4.9,
        reviewCount: 234,
        price: '320만',
        distance: '2.3km',
        time: '30분 이내 방문 가능',
        status: '견적 도착',
        badge: '안심 견적',
    },
    {
        id: '2',
        type: 'basic', // 일반 견적
        partnerName: '빠른복구',
        rating: 4.7,
        reviewCount: 156,
        price: '350만',
        distance: '5.1km',
        time: '2시간 이내',
        status: '견적 도착',
        badge: null,
    },
    {
        id: '3',
        type: 'basic',
        partnerName: '프로철거',
        rating: 4.8,
        reviewCount: 189,
        price: '310만',
        distance: '3.7km',
        time: '1시간 이내',
        status: '견적 도착',
        badge: null,
    }
];

const ChatListScreen = ({ navigation }: any) => {
    const [activeTab, setActiveTab] = useState<'arrived' | 'ongoing'>('arrived');

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('ChatRoom', { partnerName: item.partnerName, type: item.type })}
        >
            <View style={styles.cardHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {item.type === 'premium' && (
                        <View style={styles.premiumBadge}>
                            <Text style={styles.premiumText}>안심 견적</Text>
                        </View>
                    )}
                    <Text style={styles.partnerName}>{item.partnerName}</Text>
                </View>
                <Text style={styles.price}>{item.price}원 <Text style={styles.vatText}>(VAT별도)</Text></Text>
            </View>

            <View style={styles.ratingRow}>
                <Icon name="star" size={14} color="#FFC107" />
                <Text style={styles.ratingText}>{item.rating} ({item.reviewCount})</Text>
                <Text style={styles.divider}>|</Text>
                <Text style={styles.metaText}>{item.distance}</Text>
                <Text style={styles.divider}>|</Text>
                <Text style={styles.metaText}>{item.time}</Text>
            </View>

            <View style={styles.actionRow}>
                <TouchableOpacity
                    style={styles.chatButton}
                    onPress={() => navigation.navigate('ChatRoom', { partnerName: item.partnerName, type: item.type })}
                >
                    <Icon name="chatbubble-ellipses-outline" size={16} color={COLORS.textSecondary} />
                    <Text style={styles.chatButtonText}>채팅하기</Text>
                </TouchableOpacity>

                {/* 안심 견적일 경우 결제 버튼 노출 [cite: 370] */}
                {item.type === 'premium' && (
                    <TouchableOpacity style={styles.payButton}>
                        <Icon name="card-outline" size={16} color="#FFF" />
                        <Text style={styles.payButtonText}>결제하기</Text>
                    </TouchableOpacity>
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={globalStyles.container}>
            {/* 상단 탭 (도착한 견적 / 진행 중) [cite: 568-569] */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'arrived' && styles.activeTab]}
                    onPress={() => setActiveTab('arrived')}
                >
                    <Text style={[styles.tabText, activeTab === 'arrived' && styles.activeTabText]}>도착한 견적 <Text style={{color: COLORS.primary}}>3</Text></Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'ongoing' && styles.activeTab]}
                    onPress={() => setActiveTab('ongoing')}
                >
                    <Text style={[styles.tabText, activeTab === 'ongoing' && styles.activeTabText]}>진행 중</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.listContainer}>
                {activeTab === 'arrived' ? (
                    <>
                        <View style={styles.infoBar}>
                            <Text style={styles.avgText}>평균 견적가: <Text style={{fontWeight:'bold', color: COLORS.textPrimary}}>326만원</Text></Text>
                            <Text style={styles.infoLink}>견적 비교 팁 ⓘ</Text>
                        </View>
                        <FlatList
                            data={ESTIMATE_DATA}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 20 }}
                        />
                    </>
                ) : (
                    <View style={styles.emptyState}>
                        <Icon name="construct-outline" size={48} color="#DDD" />
                        <Text style={styles.emptyText}>진행 중인 공사가 없습니다.</Text>
                    </View>
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

    listContainer: { flex: 1, padding: SPACING.l, backgroundColor: '#F8F9FA' },
    infoBar: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
    avgText: { fontSize: 14, color: COLORS.textSecondary },
    infoLink: { fontSize: 12, color: COLORS.textSecondary, textDecorationLine: 'underline' },

    card: { backgroundColor: '#FFF', borderRadius: 12, padding: 16, marginBottom: 16, elevation: 2 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    premiumBadge: { backgroundColor: '#E3F2FD', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginRight: 6 },
    premiumText: { color: COLORS.primary, fontSize: 11, fontWeight: 'bold' },
    partnerName: { fontSize: 16, fontWeight: 'bold', color: COLORS.textPrimary },
    price: { fontSize: 18, fontWeight: 'bold', color: COLORS.primary },
    vatText: { fontSize: 11, color: COLORS.textSecondary, fontWeight: 'normal' },

    ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    ratingText: { fontSize: 13, fontWeight: 'bold', color: COLORS.textPrimary, marginLeft: 4 },
    divider: { marginHorizontal: 8, color: '#DDD', fontSize: 10 },
    metaText: { fontSize: 13, color: COLORS.textSecondary },

    actionRow: { flexDirection: 'row', gap: 8 },
    chatButton: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, borderWidth: 1, borderColor: '#DDD', borderRadius: 8 },
    chatButtonText: { marginLeft: 4, color: COLORS.textSecondary, fontWeight: 'bold' },
    payButton: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, backgroundColor: COLORS.secondary, borderRadius: 8 },
    payButtonText: { marginLeft: 4, color: '#FFF', fontWeight: 'bold' },

    emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 },
    emptyText: { color: COLORS.textSecondary, marginTop: 16 }
});

export default ChatListScreen;