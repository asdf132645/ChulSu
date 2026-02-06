// (상단 화이트 영역: 수입/견적 현황)
// src/domains/home/components/HomeDashboard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../constants/theme';

interface DashboardProps {
    userTitle: string;
    mainTitle: React.ReactNode;
    subText: string;
    btnText: string;
    icon: string;
    onBtnPress?: () => void;
    stats: { label1: string; val1: string; label2: string; val2: string };
    bannerTitle: string;
}

const HomeDashboard = ({ userTitle, mainTitle, subText, btnText, icon, onBtnPress, stats, bannerTitle }: DashboardProps) => {
    return (
        <View style={styles.topSection}>
            {/* 히어로 섹션 */}
            <View style={styles.heroRow}>
                <View style={styles.heroContent}>
                    <Text style={styles.userTitle}>{userTitle}</Text>
                    <Text style={styles.mainTitle}>{mainTitle}</Text>
                    <Text style={styles.subText}>{subText}</Text>
                    <TouchableOpacity style={styles.bluePillBtn} onPress={onBtnPress} activeOpacity={0.8}>
                        <Icon name={icon === 'construct' ? "calendar-outline" : "document-text-outline"} size={16} color="#FFF" style={{ marginRight: 6 }} />
                        <Text style={styles.pillBtnText}>{btnText}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.illustrationPlaceholder}>
                    <Icon name={icon} size={32} color={COLORS.primary} />
                </View>
            </View>

            {/* 통계 카드 */}
            <View style={styles.statsCard}>
                <View style={styles.statItem}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.statNumber}>{stats.val1}</Text>
                        <View style={styles.newBadge}><Text style={styles.newBadgeText}>N</Text></View>
                    </View>
                    <Text style={styles.statLabel}>{stats.label1}</Text>
                </View>
                <View style={styles.verticalLine} />
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{stats.val2}</Text>
                    <Text style={styles.statLabel}>{stats.label2}</Text>
                </View>
            </View>

            {/* 다크 배너 */}
            <TouchableOpacity style={styles.darkBanner} activeOpacity={0.9}>
                <View>
                    <Text style={styles.bannerSub}>실패 없는 서비스를 위한</Text>
                    <Text style={styles.bannerTitle}>{bannerTitle}</Text>
                </View>
                <View style={styles.playBtn}><Icon name="play" size={14} color="#FFF" style={{ marginLeft: 2 }} /></View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    topSection: { backgroundColor: '#FFF', paddingHorizontal: 24, paddingTop: 24, paddingBottom: 32, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 5, zIndex: 1 },
    heroRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
    heroContent: { flex: 1, paddingRight: 10 },
    userTitle: { fontSize: 13, color: '#888', marginBottom: 6, fontWeight: '500' },
    mainTitle: { fontSize: 22, fontWeight: 'bold', color: '#111', lineHeight: 32 },
    subText: { fontSize: 12, color: '#78909C', marginTop: 6, marginBottom: 16 },
    bluePillBtn: { backgroundColor: COLORS.primary, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 24, alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', shadowColor: COLORS.primary, shadowOpacity: 0.3, shadowOffset: { width: 0, height: 4 }, elevation: 4 },
    pillBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
    illustrationPlaceholder: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#E3F2FD', justifyContent: 'center', alignItems: 'center', marginTop: 10 },
    statsCard: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 16, padding: 20, marginBottom: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3, borderWidth: 1, borderColor: '#F5F5F5' },
    statItem: { flex: 1, alignItems: 'center' },
    statNumber: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 4 },
    newBadge: { backgroundColor: '#FF6F00', width: 14, height: 14, borderRadius: 7, justifyContent: 'center', alignItems: 'center', marginLeft: 2, marginTop: 4 },
    newBadgeText: { color: '#FFF', fontSize: 8, fontWeight: 'bold' },
    statLabel: { fontSize: 12, color: '#888' },
    verticalLine: { width: 1, height: '100%', backgroundColor: '#EEE' },
    darkBanner: { backgroundColor: '#1A2138', borderRadius: 16, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: "#1A2138", shadowOpacity: 0.3, shadowOffset: { width: 0, height: 4 }, elevation: 5 },
    bannerSub: { color: '#AAA', fontSize: 11, marginBottom: 4 },
    bannerTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
    playBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' }
});

export default HomeDashboard;