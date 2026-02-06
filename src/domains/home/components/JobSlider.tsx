//(가로 스크롤: 추천 일감 리스트)

// src/domains/home/components/JobSlider.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../constants/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;

const JobSlider = ({ jobs, navigation }: any) => {
    return (
        <View style={styles.bottomSectionWide}>
            <View style={styles.sectionHeaderRow}>
                <View><Text style={styles.sectionTitleBig}>추천 일감</Text><View style={styles.blueUnderlineShort} /></View>
                <TouchableOpacity style={styles.viewAllBtn}>
                    <Text style={styles.viewAllText}>전체보기</Text>
                    <Icon name="chevron-forward" size={18} color={COLORS.textSecondary} />
                </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalListPadding} snapToInterval={CARD_WIDTH + 16} decelerationRate="fast">
                {jobs.map((job: any) => (
                    <TouchableOpacity
                        key={job.id}
                        style={styles.bigJobCard}
                        activeOpacity={0.9}
                        onPress={() => navigation.navigate('JobDetail', { job })}
                    >
                        <View style={styles.cardTopRow}>
                            <View style={styles.urgentBadgeBig}>
                                <Icon name="time" size={16} color="#FFF" style={{ marginRight: 4 }} />
                                <Text style={styles.urgentBadgeTextBig}>D-{job.dday} 마감임박</Text>
                            </View>
                            <Text style={styles.cardLocationText}>{job.location}</Text>
                        </View>
                        <Text style={styles.bigCardTitle} numberOfLines={2}>{job.title}</Text>
                        <Text style={styles.bigCardPrice}>예상 {job.price}</Text>
                        <View style={styles.cardDivider} />
                        <View style={styles.cardBottomRow}>
                            <View style={styles.specItem}><Icon name="resize-outline" size={18} color={COLORS.textSecondary} /><Text style={styles.specText}>{job.size}</Text></View>
                            <View style={styles.specItem}><Icon name="layers-outline" size={18} color={COLORS.textSecondary} /><Text style={styles.specText}>철거 포함</Text></View>
                            <Icon name="arrow-forward-circle" size={32} color={COLORS.primary} style={styles.goIcon} />
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomSectionWide: { paddingVertical: 24 },
    sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingHorizontal: 24, marginBottom: 16 },
    sectionTitleBig: { fontSize: 20, fontWeight: 'bold', color: '#222' },
    blueUnderlineShort: { width: 80, height: 8, backgroundColor: 'rgba(21, 101, 192, 0.15)', marginTop: -8, marginLeft: -2 },
    viewAllBtn: { flexDirection: 'row', alignItems: 'center', paddingBottom: 4 },
    viewAllText: { fontSize: 14, color: COLORS.textSecondary, marginRight: 4 },
    horizontalListPadding: { paddingHorizontal: 24, paddingBottom: 10 },
    bigJobCard: { width: CARD_WIDTH, backgroundColor: '#FFF', borderRadius: 20, padding: 24, marginRight: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 10, elevation: 4, borderWidth: 1, borderColor: '#F0F0F0' },
    cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    urgentBadgeBig: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, backgroundColor: '#FF6F00' },
    urgentBadgeTextBig: { color: '#FFF', fontWeight: 'bold', fontSize: 13 },
    cardLocationText: { fontSize: 14, color: '#666', fontWeight: '500' },
    bigCardTitle: { fontSize: 22, fontWeight: 'bold', color: '#111', marginBottom: 8, lineHeight: 30 },
    bigCardPrice: { fontSize: 24, fontWeight: '900', color: COLORS.primary, marginBottom: 20 },
    cardDivider: { height: 1, backgroundColor: '#F0F0F0', marginBottom: 16 },
    cardBottomRow: { flexDirection: 'row', alignItems: 'center' },
    specItem: { flexDirection: 'row', alignItems: 'center', marginRight: 16 },
    specText: { fontSize: 15, color: '#555', marginLeft: 6 },
    goIcon: { marginLeft: 'auto' }
});

export default JobSlider;