import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, SPACING } from '../../../constants/theme';
import { navigationRef } from '../../../navigation/RootNavigation';
import Header from '../../../components/common/Header';

// 더미 데이터 (업종 category 추가)
const ALL_PARTNERS = [
    { id: 1, name: '장호연', job: '목수', category: '인테리어', count: '150건', price: '누적 8,345만원', rank: 1, img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=200&h=200&fit=crop' },
    { id: 2, name: '이장목', job: '전기', category: '설비', count: '129건', price: '누적 7,950만원', rank: 2, img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=200&h=200&fit=crop' },
    { id: 3, name: '김철거', job: '철거', category: '철거', count: '98건', price: '누적 6,200만원', rank: 3, img: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c7c?w=200&h=200&fit=crop' },
    { id: 4, name: '박타일', job: '타일', category: '인테리어', count: '85건', price: '누적 5,800만원', rank: 4, img: 'https://images.unsplash.com/photo-1620619767323-b95a89183081?w=200&h=200&fit=crop' },
    { id: 5, name: '최배관', job: '설비', category: '설비', count: '72건', price: '누적 4,500만원', rank: 5, img: 'https://images.unsplash.com/photo-1581092921461-eab62e97a783?w=200&h=200&fit=crop' },
    { id: 6, name: '정폐기', job: '폐기물', category: '폐기물', count: '65건', price: '누적 3,200만원', rank: 6, img: 'https://images.unsplash.com/photo-1535090467336-9501f96eef89?w=200&h=200&fit=crop' },
];

const PartnerListScreen = ({ navigation }: any) => {
    // 🔥 1. 업종 필터 상태 관리
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const CATEGORIES = ['전체', '철거', '원상복구', '설비', '인테리어', '폐기물'];

    // 🔥 2. 필터링 로직 (category 일치 여부 확인)
    const filteredPartners = selectedCategory === '전체'
        ? ALL_PARTNERS
        : ALL_PARTNERS.filter(p => p.category === selectedCategory || p.job.includes(selectedCategory));

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('PartnerDetail', { partner: item })}
        >
            <View style={styles.rankBox}>
                <Text style={[styles.rankText, item.rank <= 3 && styles.topRankText]}>{item.rank}</Text>
            </View>
            <Image source={{ uri: item.img }} style={styles.profileImg} />
            <View style={styles.infoBox}>
                <Text style={styles.name}>{item.name} <Text style={styles.job}>| {item.job}</Text></Text>
                <Text style={styles.stats}>작업 {item.count} · 평점 5.0</Text>
            </View>
            <Icon name="chevron-forward" size={20} color="#CCC" />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header title="이달의 우수 업체" />

            {/* 🔥 3. 업종 필터 UI (가로 스크롤) */}
            <View style={styles.filterContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16 }}
                >
                    {CATEGORIES.map((cat) => (
                        <TouchableOpacity
                            key={cat}
                            style={[
                                styles.filterChip,
                                selectedCategory === cat && styles.filterChipActive
                            ]}
                            onPress={() => setSelectedCategory(cat)}
                        >
                            <Text style={[
                                styles.filterText,
                                selectedCategory === cat && styles.filterTextActive
                            ]}>
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <FlatList
                data={filteredPartners}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Icon name="construct-outline" size={48} color="#DDD" />
                        <Text style={styles.emptyText}>해당 분야의 업체가 없습니다.</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F7FA' },

    // 필터 스타일 (Job List와 통일감 유지)
    filterContainer: {
        backgroundColor: '#FFF',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#F0F0F0'
    },
    filterChipActive: {
        backgroundColor: '#333', // 파트너 필터는 검정색으로 포인트 (차별화)
        borderColor: '#333',
    },
    filterText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    filterTextActive: {
        color: '#FFF',
        fontWeight: 'bold',
    },

    listContent: { padding: SPACING.m },
    card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 16, marginBottom: 12, borderRadius: 16, elevation: 2 },
    rankBox: { width: 30, alignItems: 'center', marginRight: 10 },
    rankText: { fontSize: 18, fontWeight: 'bold', color: '#999' },
    topRankText: { color: COLORS.primary },
    profileImg: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#EEE', marginRight: 16 },
    infoBox: { flex: 1 },
    name: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 4 },
    job: { fontSize: 13, color: '#666', fontWeight: 'normal' },
    stats: { fontSize: 12, color: '#888' },

    emptyContainer: { alignItems: 'center', marginTop: 50 },
    emptyText: { color: '#999', marginTop: 10, fontSize: 14 }
});

export default PartnerListScreen;