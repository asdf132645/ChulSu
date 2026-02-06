//(가로 스크롤: 우수 파트너 Top 10)

// src/domains/home/components/PartnerRanking.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../../constants/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = 160;
const CARD_SPACING = 16;
const SNAP_INTERVAL = CARD_WIDTH + CARD_SPACING;

const PartnerRanking = ({ partners, navigation }: any) => {
    return (
        <View style={styles.rankContainer}>
            <View style={styles.rankHeader}>
                <Text style={styles.rankTitle}>이달의 우수 파트너 TOP 10</Text>
                <Text style={styles.rankDots}>•••••</Text>
            </View>

            {/* 파란 배경 */}
            <View style={styles.blueBackground}>
                <TouchableOpacity style={styles.bottomLink}>
                    <Text style={styles.bottomLinkText}>수익 노하우 엿보기 +</Text>
                </TouchableOpacity>
            </View>

            {/* 슬라이더 */}
            <View style={styles.sliderWrapper}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.sliderContent}
                    snapToInterval={SNAP_INTERVAL}
                    decelerationRate="fast"
                >
                    {partners.map((partner: any) => (
                        <TouchableOpacity
                            key={partner.id}
                            style={styles.rankCard}
                            activeOpacity={0.9}
                            onPress={() => navigation.navigate('PartnerDetail', { partner })}
                        >
                            <View style={styles.rankBadge}>
                                <Text style={styles.rankBadgeText}>{partner.rank}위</Text>
                            </View>
                            <View style={styles.profileCircle}>
                                <Image source={{ uri: partner.img }} style={styles.profileImg} />
                            </View>
                            <Text style={styles.cardName}>{partner.name}</Text>
                            <Text style={styles.cardInfo}>{partner.job} | {partner.count}</Text>
                            <Text style={styles.cardPrice}>{partner.price}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    rankContainer: { marginTop: 32, marginBottom: 40 },
    rankHeader: { paddingHorizontal: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    rankTitle: { fontSize: 19, fontWeight: 'bold', color: '#1A2138' },
    rankDots: { color: '#CFD8DC', letterSpacing: 2, fontSize: 18 },
    blueBackground: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 140, backgroundColor: '#448AFF', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 20 },
    bottomLink: { padding: 10 },
    bottomLinkText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
    sliderWrapper: { marginBottom: 50 },
    sliderContent: { paddingHorizontal: 24, paddingBottom: 10 },
    rankCard: { width: CARD_WIDTH, height: 200, backgroundColor: '#FFF', borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: CARD_SPACING, padding: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5 },
    rankBadge: { position: 'absolute', top: -12, left: 0, backgroundColor: '#FFD600', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, elevation: 4 },
    rankBadgeText: { fontWeight: 'bold', color: '#333', fontSize: 12 },
    profileCircle: { width: 70, height: 70, borderRadius: 35, marginBottom: 12, overflow: 'hidden', borderWidth: 2, borderColor: '#F5F5F5' },
    profileImg: { width: '100%', height: '100%' },
    cardName: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 4, textAlign:'center' },
    cardInfo: { fontSize: 12, color: '#888', marginBottom: 8 },
    cardPrice: { fontSize: 16, fontWeight: '900', color: '#1A2138' }
});

export default PartnerRanking;