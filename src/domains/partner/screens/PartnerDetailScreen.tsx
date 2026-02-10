import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../constants/theme';

import PartnerReviews from '../components/PartnerReviews';
import Header from "../../../components/common/Header.tsx";
import { useToast } from '../../../components/common/Toast';

// 더미 데이터
const REVIEWS = [
    { id: 1, user: '김*민', rating: 5, date: '2024.04.10', content: '사장님이 정말 친절하시고 시간 약속도 칼같이 지키십니다. 뒷정리까지 깔끔해서 놀랐어요!' },
    { id: 2, user: '이*수', rating: 5, date: '2024.04.08', content: '견적도 합리적이고 추가 비용 요구도 없어서 너무 좋았습니다. 강추합니다.' },
    { id: 3, user: '박*영', rating: 4, date: '2024.03.25', content: '작업 속도가 빠르시네요. 상담도 꼼꼼하게 해주셔서 믿고 맡겼습니다.' },
];

const PartnerDetailScreen = ({ route, navigation }: any) => {
    const { showToast } = useToast();
    // 1. 메인에서 넘겨받은 파트너 데이터 (없으면 기본값 방어 코드)
    const { partner } = route.params || {
        partner: { name: '알 수 없음', job: '전문가', count: '-', img: 'https://via.placeholder.com/150', rank: 0 }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* 상단 헤더 */}
            <Header title="파트너 프로필" />

            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                {/* 1. 프로필 정보 섹션 */}
                <View style={styles.profileSection}>
                    <View style={styles.imageWrapper}>
                        <Image source={{ uri: partner.img }} style={styles.profileImage} />
                        {partner.rank > 0 && (
                            <View style={styles.rankBadge}>
                                <Text style={styles.rankText}>{partner.rank}위</Text>
                            </View>
                        )}
                    </View>
                    <Text style={styles.name}>{partner.name}</Text>
                    <Text style={styles.job}>{partner.job} 전문</Text>

                    <View style={styles.statRow}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{partner.count}</Text>
                            <Text style={styles.statLabel}>총 작업</Text>
                        </View>
                        <View style={styles.verticalLine} />
                        <View style={styles.statItem}>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Icon name="star" size={16} color="#FFD600" style={{marginRight:4}}/>
                                <Text style={styles.statValue}>4.9</Text>
                            </View>
                            <Text style={styles.statLabel}>평점 (52개)</Text>
                        </View>
                        <View style={styles.verticalLine} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>10년</Text>
                            <Text style={styles.statLabel}>경력</Text>
                        </View>
                    </View>
                </View>

                {/* 2. 파트너 한마디 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>💬 파트너 한마디</Text>
                    <View style={styles.knowhowCard}>
                        <Text style={styles.knowhowTitle}>"보이지 않는 곳까지 꼼꼼하게 시공합니다"</Text>
                        <Text style={styles.knowhowDesc}>
                            10년 이상의 현장 경험을 바탕으로 고객님의 공간을 내 집처럼 생각하며 작업합니다.
                            AS까지 확실하게 책임지겠습니다.
                        </Text>
                    </View>
                </View>

                {/* 3. 시공 포트폴리오 */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>📷 최근 시공 사례</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.portfolioScroll}>
                        {[1, 2, 3, 4].map((i) => (
                            <Image
                                key={i}
                                source={{ uri: `https://source.unsplash.com/random/200x200?construction,interior&sig=${i}` }}
                                style={styles.portfolioImg}
                            />
                        ))}
                    </ScrollView>
                </View>

                {/* 4. 고객 리뷰 (컴포넌트 사용) */}
                <PartnerReviews
                    reviews={REVIEWS}
                    totalCount={52}
                    onPressAll={() => {
                        // 실제 이동 로직은 그대로 유지 (navigation.navigate...)
                        navigation.navigate('PartnerReviewList', { partnerName: partner.name });
                    }}
                />
            </ScrollView>

            {/* ▼ 하단 버튼: 일반 견적 화면으로 이동 (데이터 전달) */}
            <View style={styles.bottomBar}>
                <TouchableOpacity
                    style={styles.contactBtn}
                    onPress={() => {
                        // 🔥 핵심: targetPartner에 현재 파트너 정보를 담아 보냄
                        navigation.navigate('GeneralEstimate', { targetPartner: partner });
                    }}
                >
                    <Text style={styles.btnText}>이 파트너에게 견적 요청하기</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#FFF' },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    profileSection: { backgroundColor: '#FFF', alignItems: 'center', paddingVertical: 30, marginBottom: 12 },
    imageWrapper: { marginBottom: 16 },
    profileImage: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: '#F0F0F0' },
    rankBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#FFD600', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
    rankText: { fontWeight: 'bold', color: '#333', fontSize: 12 },
    name: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 4 },
    job: { fontSize: 14, color: '#888', marginBottom: 24 },
    statRow: { flexDirection: 'row', width: '90%', justifyContent: 'space-around', backgroundColor: '#F9F9F9', padding: 16, borderRadius: 16 },
    statItem: { alignItems: 'center', flex: 1 },
    statValue: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 4 },
    statLabel: { fontSize: 13, color: '#999' },
    verticalLine: { width: 1, height: '80%', backgroundColor: '#DDD' },
    section: { backgroundColor: '#FFF', padding: 24, marginBottom: 12 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 16 },
    knowhowCard: { backgroundColor: '#E3F2FD', padding: 20, borderRadius: 16 },
    knowhowTitle: { fontSize: 15, fontWeight: 'bold', color: COLORS.primary, marginBottom: 8 },
    knowhowDesc: { fontSize: 14, color: '#555', lineHeight: 22 },
    portfolioScroll: { marginTop: 8 },
    portfolioImg: { width: 120, height: 120, borderRadius: 12, marginRight: 12, backgroundColor: '#EEE' },
    bottomBar: { position: 'absolute', bottom: 0, width: '100%', padding: 20, backgroundColor: '#FFF', borderTopWidth: 1, borderColor: '#EEE' },
    contactBtn: { backgroundColor: COLORS.primary, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
    btnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});

export default PartnerDetailScreen;