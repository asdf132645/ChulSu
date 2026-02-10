import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { globalStyles } from '../../../styles/globalStyles';
import { COLORS, SPACING } from '../../../constants/theme';
import Header from "../../../components/common/Header.tsx";

const EstimateTypeScreen = ({ navigation }: any) => {
    // 기획서 14P의 라디오 버튼 선택 상태 관리
    const [selected, setSelected] = useState<'premium' | 'basic' | null>(null);

    return (
        <View style={globalStyles.container}>
            <Header title="견적신청" />
            <ScrollView contentContainerStyle={{ padding: SPACING.l }}>
                {/* 기획서 메인 카피 */}
                <Text style={styles.title}>어떤 방식으로{"\n"}진행할까요?</Text>

                {/* 1. 안심 견적 (Premium Track) - 본사 직접 방문 */}
                <TouchableOpacity
                    style={[styles.card, selected === 'premium' && styles.activeCard]}
                    onPress={() => setSelected('premium')}
                    activeOpacity={0.8}
                >
                    <View style={styles.cardHead}>
                        <View style={styles.titleRow}>
                            <Text style={styles.cardTitle}>안심 견적</Text>
                            <View style={styles.badge}><Text style={styles.badgeText}>추천</Text></View>
                        </View>
                        {/* 라디오 버튼 UI - 선택 시 Trust Blue 활성화 */}
                        <View style={[styles.radio, selected === 'premium' && styles.radioOn]} />
                    </View>
                    <Text style={styles.cardDesc}>• 본사 직원이 직접 현장 방문 측정</Text>
                    <Text style={styles.cardDesc}>• 추가금 0원 보장 및 본사 품질 보증</Text>
                </TouchableOpacity>

                {/* 2. 일반 견적 (Basic Track) - 사진 기반 */}
                <TouchableOpacity
                    style={[styles.card, selected === 'basic' && styles.activeCard]}
                    onPress={() => setSelected('basic')}
                    activeOpacity={0.8}
                >
                    <View style={styles.cardHead}>
                        <Text style={styles.cardTitle}>일반 견적</Text>
                        <View style={[styles.radio, selected === 'basic' && styles.radioOn]} />
                    </View>
                    <Text style={styles.cardDesc}>• 사진 기반의 간편하고 빠른 견적</Text>
                    <Text style={styles.cardDesc}>• 여러 파트너사의 자율 입찰 경쟁</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* 선택 완료 버튼 섹션 */}
            <View style={styles.bottom}>
                <TouchableOpacity
                    style={[
                        globalStyles.actionButton,
                        !selected && { backgroundColor: '#CCC' } // 미선택 시 비활성화 컬러
                    ]}
                    disabled={!selected}
                    onPress={() => {
                        // 선택된 타입에 따라 다른 화면으로 이동
                        // premium -> Booking (안심 견적 예약)
                        // basic -> GeneralEstimate (일반 견적 3단계 입력) [수정됨]
                        navigation.navigate(selected === 'premium' ? 'Booking' : 'GeneralEstimate');
                    }}
                >
                    <Text style={globalStyles.buttonText}>선택 완료</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        marginBottom: 32,
        lineHeight: 36
    },
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 20,
        padding: 24,
        marginBottom: 16,
        borderWidth: 2,
        borderColor: '#F0F0F0',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10
    },
    activeCard: {
        borderColor: COLORS.primary,
        backgroundColor: '#F8FAFF'
    },
    cardHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        marginRight: 8
    },
    badge: {
        backgroundColor: COLORS.secondary, // Safety Orange (#FF6F00)
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4
    },
    badgeText: {
        color: '#FFF',
        fontSize: 11,
        fontWeight: 'bold'
    },
    radio: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: '#DDD'
    },
    radioOn: {
        borderColor: COLORS.primary, // Trust Blue (#1565C0)
        borderWidth: 7
    },
    cardDesc: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: 4
    },
    // [수정완료] 누락되었던 bottom 스타일 정의 추가
    bottom: {
        padding: SPACING.l,
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0'
    }
});

export default EstimateTypeScreen;