import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, SafeAreaView, Alert } from 'react-native'; // Alert 추가
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, SPACING } from '../../../constants/theme';
import { navigationRef } from '../../../navigation/RootNavigation';

const PartnerDetailScreen = ({ route }: any) => {
    const { partner } = route.params || {
        partner: { name: '알 수 없음', job: '전문가', count: '-', price: '-', img: 'https://via.placeholder.com/150', rank: 0 }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigationRef.goBack()}>
                    <Icon name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>파트너 프로필</Text>
                <Icon name="share-social-outline" size={24} color="#333" />
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
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
                            <Text style={styles.statLabel}>작업 건수</Text>
                        </View>
                        <View style={styles.verticalLine} />
                        <View style={styles.statItem}>
                            <Text style={[styles.statValue, { color: COLORS.primary }]}>{partner.price}</Text>
                            <Text style={styles.statLabel}>누적 수익</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>💰 수익 창출 노하우</Text>
                    <View style={styles.knowhowCard}>
                        <Text style={styles.knowhowTitle}>"고객 응대 속도가 핵심입니다"</Text>
                        <Text style={styles.knowhowDesc}>
                            견적 요청이 오면 5분 이내에 해피콜을 진행합니다.
                            빠른 응대가 신뢰를 주고 수주 확률을 높여줍니다.
                        </Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>📷 최근 시공 사례</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.portfolioScroll}>
                        {[1, 2, 3].map((i) => (
                            <Image
                                key={i}
                                source={{ uri: `https://source.unsplash.com/random/200x200?construction,interior&sig=${i}` }}
                                style={styles.portfolioImg}
                            />
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>

            <View style={styles.bottomBar}>
                {/* 🚨 수정됨: alert() -> Alert.alert() */}
                <TouchableOpacity style={styles.contactBtn} onPress={() => Alert.alert("알림", "서비스 준비 중입니다.")}>
                    <Icon name="chatbubble-ellipses" size={18} color="#FFF" style={{marginRight:8}}/>
                    <Text style={styles.btnText}>노하우 질문하기</Text>
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

    statRow: { flexDirection: 'row', width: '80%', justifyContent: 'space-around', backgroundColor: '#F9F9F9', padding: 16, borderRadius: 16 },
    statItem: { alignItems: 'center' },
    statValue: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 4 },
    statLabel: { fontSize: 13, color: '#999' },
    verticalLine: { width: 1, height: '100%', backgroundColor: '#DDD' },

    section: { backgroundColor: '#FFF', padding: 24, marginBottom: 12 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 16 },

    knowhowCard: { backgroundColor: '#E3F2FD', padding: 20, borderRadius: 16 },
    knowhowTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.primary, marginBottom: 8 },
    knowhowDesc: { fontSize: 14, color: '#555', lineHeight: 22 },

    portfolioScroll: { marginTop: 8 },
    portfolioImg: { width: 120, height: 120, borderRadius: 12, marginRight: 12, backgroundColor: '#EEE' },

    bottomBar: { position: 'absolute', bottom: 0, width: '100%', padding: 20, backgroundColor: '#FFF', borderTopWidth: 1, borderColor: '#EEE' },
    contactBtn: { backgroundColor: COLORS.primary, height: 56, borderRadius: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    btnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});

export default PartnerDetailScreen;