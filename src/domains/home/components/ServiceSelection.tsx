// (안심/일반 견적 선택 버튼)
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../constants/theme';

const ServiceSelection = ({ navigation }: any) => {
    const POINT_COLOR = '#FF6F00'; // Safety Orange

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>어떤 서비스를 원하시나요?</Text>
                <View style={styles.underline} />
            </View>

            <View style={styles.list}>
                {/* 안심 견적 (Premium) */}
                <TouchableOpacity
                    style={styles.card}
                    activeOpacity={0.9}
                    onPress={() => navigation.navigate('EstimateType')}
                >
                    <View style={styles.iconBox}>
                        <Icon name="shield-checkmark" size={24} color={COLORS.primary} />
                    </View>
                    <View style={styles.content}>
                        <View style={styles.titleRow}>
                            <Text style={styles.cardTitle}>안심 견적</Text>
                            <View style={[styles.badge, { backgroundColor: POINT_COLOR }]}>
                                <Text style={styles.badgeText}>추천</Text>
                            </View>
                        </View>
                        <Text style={styles.desc}>본사 직접 방문 · 추가금 0원 보장</Text>
                    </View>
                    <Icon name="chevron-forward" size={20} color="#CCC" />
                </TouchableOpacity>

                {/* 일반 견적 (Basic) */}
                <TouchableOpacity
                    style={styles.card}
                    activeOpacity={0.9}
                    onPress={() => navigation.navigate('EstimateType')}
                >
                    <View style={[styles.iconBox, { backgroundColor: '#F5F5F5' }]}>
                        <Icon name="camera" size={24} color="#757575" />
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.cardTitle}>일반 견적</Text>
                        <Text style={styles.desc}>사진 기반 간편 신청 · 업체 자율 입찰</Text>
                    </View>
                    <Icon name="chevron-forward" size={20} color="#CCC" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 24, paddingBottom: 0 },
    header: { marginBottom: 16 },
    title: { fontSize: 18, fontWeight: 'bold', color: '#222', marginBottom: 4 },
    underline: { width: 120, height: 8, backgroundColor: 'rgba(21, 101, 192, 0.1)', marginTop: -8, marginLeft: -2 },
    list: { gap: 12 },
    card: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#FFF', borderRadius: 16, padding: 20,
        elevation: 1, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 4
    },
    iconBox: {
        width: 44, height: 44, borderRadius: 12,
        backgroundColor: '#E3F2FD', justifyContent: 'center', alignItems: 'center',
        marginRight: 16
    },
    content: { flex: 1 },
    titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
    cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    badge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginLeft: 6 },
    badgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
    desc: { fontSize: 12, color: '#999' }
});

export default ServiceSelection;