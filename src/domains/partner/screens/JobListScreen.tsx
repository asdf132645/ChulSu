import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, SPACING } from '../../../constants/theme';
import Header from '../../../components/common/Header';

// 🔥 [수정] 금액 삭제 -> '견적 협의' 등으로 변경
const ALL_JOBS = [
    { id: 1, title: '강남구 역삼동 상가 철거', location: '서울 역삼동', size: '30평', price: '견적 협의', dday: 3, img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=200&h=200&fit=crop' },
    { id: 2, title: '서초구 오피스 원상복구', location: '서울 서초동', size: '45평', price: '방문 견적', dday: 5, img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=200&fit=crop' },
    { id: 3, title: '분당 학원 칸막이 철거', location: '경기 분당', size: '50평', price: '견적 협의', dday: 6, img: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=200&h=200&fit=crop' },
    { id: 4, title: '홍대 카페 폐업 정리', location: '서울 서교동', size: '15평', price: '방문 견적', dday: 1, img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200&h=200&fit=crop' },
    { id: 5, title: '일산 아파트 인테리어 철거', location: '경기 일산', size: '32평', price: '견적 협의', dday: 7, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&h=200&fit=crop' },
    { id: 6, title: '성수동 팝업스토어 철거', location: '서울 성수동', size: '20평', price: '방문 견적', dday: 4, img: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?w=200&h=200&fit=crop' },
    { id: 7, title: '송도 식당 폐업', location: '인천 송도', size: '40평', price: '견적 협의', dday: 2, img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=200&fit=crop' },
];

const JobListScreen = ({ navigation }: any) => {
    // 지역 필터 상태 관리
    const [selectedRegion, setSelectedRegion] = useState('전체');
    const REGIONS = ['전체', '서울', '경기', '인천', '강원', '충청'];

    // 필터링 로직
    const filteredJobs = selectedRegion === '전체'
        ? ALL_JOBS
        : ALL_JOBS.filter(job => job.location.includes(selectedRegion));

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('JobDetail', { job: item })}
        >
            <Image source={{ uri: item.img }} style={styles.cardImage} />
            <View style={styles.cardContent}>
                <View style={styles.headerRow}>
                    <View style={styles.ddayBadge}>
                        <Text style={styles.ddayText}>D-{item.dday}</Text>
                    </View>
                    <Text style={styles.location}>{item.location}</Text>
                </View>
                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                <View style={styles.infoRow}>
                    <Text style={styles.infoText}>{item.size}</Text>
                    <View style={styles.dot} />
                    <Text style={styles.infoText}>철거 포함</Text>
                </View>
                {/* 🔥 [수정] "예상" 텍스트 삭제 및 스타일 유지 */}
                <Text style={styles.price}>{item.price}</Text>
            </View>
            <Icon name="chevron-forward" size={20} color="#CCC" style={{ alignSelf: 'center' }} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header title="추천 일감 전체보기" />

            {/* 지역 필터 UI */}
            <View style={styles.filterContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16 }}
                >
                    {REGIONS.map((region) => (
                        <TouchableOpacity
                            key={region}
                            style={[
                                styles.filterChip,
                                selectedRegion === region && styles.filterChipActive
                            ]}
                            onPress={() => setSelectedRegion(region)}
                        >
                            <Text style={[
                                styles.filterText,
                                selectedRegion === region && styles.filterTextActive
                            ]}>
                                {region}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* 리스트 */}
            <FlatList
                data={filteredJobs}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Icon name="search" size={48} color="#DDD" />
                        <Text style={styles.emptyText}>해당 지역의 일감이 없습니다.</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F7FA' },

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
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
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

    card: { flexDirection: 'row', backgroundColor: '#FFF', padding: 16, marginBottom: 12, borderRadius: 16, elevation: 2 },
    cardImage: { width: 80, height: 80, borderRadius: 12, backgroundColor: '#EEE', marginRight: 16 },
    cardContent: { flex: 1, justifyContent: 'center' },

    headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
    ddayBadge: { backgroundColor: '#FF6F00', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginRight: 8 },
    ddayText: { color: '#FFF', fontSize: 11, fontWeight: 'bold' },
    location: { fontSize: 13, color: '#888' },

    title: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 4 },
    infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
    infoText: { fontSize: 13, color: '#666' },
    dot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: '#CCC', marginHorizontal: 6 },

    price: { fontSize: 16, fontWeight: 'bold', color: COLORS.primary },

    emptyContainer: { alignItems: 'center', marginTop: 50 },
    emptyText: { color: '#999', marginTop: 10, fontSize: 14 }
});

export default JobListScreen;