import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../constants/theme';
import Header from '../../../components/common/Header';

// 🔥 힙한 파란색 네온 컬러 팔레트
const HIP_COLORS = {
    DARK_BG: '#0F1115',       // 더 깊은 남색 계열 블랙
    DARK_CARD: '#181A20',     // 카드 배경
    NEON_BLUE: '#2979FF',     // 메인 주력 파란색 (진한 네온)
    CYAN_ACCENT: '#00E5FF',   // 포인트 형광 하늘색 (강조용)
    TEXT_MAIN: '#FFFFFF',
    TEXT_SUB: '#B0B3B8',
    BORDER: '#2A2D35',
};

const GuideScreen = ({ navigation }: any) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={HIP_COLORS.DARK_BG} />
            <View style={{ backgroundColor: HIP_COLORS.DARK_BG }}>
                <Header title="철수 사용자 가이드" />
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* 1. 인트로: 안심 견적의 필요성 강조 */}
                <View style={styles.introContainer}>
                    <Text style={styles.introHighlight}>SAFE & PERFECT</Text>
                    <Text style={styles.introTitle}>철거, 왜 <Text style={{color: HIP_COLORS.NEON_BLUE}}>안심 견적</Text>이어야 할까요?</Text>
                    <Text style={styles.introDesc}>
                        가격만 보고 결정했다가 추가 비용 폭탄, 연락 두절...{'\n'}
                        불안한 철거 시장, <Text style={{color: '#FFF', fontWeight:'bold'}}>철수 안심 견적</Text>이 정답인 이유를 확인하세요.
                    </Text>
                </View>

                {/* 🔥 [신규] 안심 견적 핵심 가치 카드 (3단 그리드) */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>WHY SAFE ESTIMATE?</Text>
                    <View style={styles.reasonGrid}>
                        {/* 이유 1 */}
                        <View style={styles.reasonItem}>
                            <View style={styles.reasonIconBox}>
                                <Icon name="shield-checkmark" size={24} color={HIP_COLORS.CYAN_ACCENT} />
                            </View>
                            <Text style={styles.reasonTitle}>먹튀 완벽 차단</Text>
                            <Text style={styles.reasonDesc}>검증된 파트너 매칭으로{'\n'}공사 중단 걱정 끝</Text>
                        </View>
                        {/* 이유 2 */}
                        <View style={styles.reasonItem}>
                            <View style={styles.reasonIconBox}>
                                <Icon name="document-text" size={24} color={HIP_COLORS.CYAN_ACCENT} />
                            </View>
                            <Text style={styles.reasonTitle}>표준 계약서</Text>
                            <Text style={styles.reasonDesc}>불공정 조항 없는{'\n'}투명한 계약 보장</Text>
                        </View>
                        {/* 이유 3 */}
                        <View style={styles.reasonItem}>
                            <View style={styles.reasonIconBox}>
                                <Icon name="hammer" size={24} color={HIP_COLORS.CYAN_ACCENT} />
                            </View>
                            <Text style={styles.reasonTitle}>확실한 A/S</Text>
                            <Text style={styles.reasonDesc}>시공 후 문제 발생 시{'\n'}끝까지 책임 관리</Text>
                        </View>
                    </View>
                </View>

                {/* 2. 진행 절차 카드 */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>PROCESS FLOW</Text>
                    <View style={styles.stepContainer}>
                        {/* Step 1 */}
                        <View style={styles.stepItem}>
                            <View style={styles.stepIconBadge}><Text style={styles.stepNum}>01</Text></View>
                            <View style={styles.stepContent}>
                                <Text style={styles.stepTitleText}>견적 신청 및 상담</Text>
                                <Text style={styles.stepDescText}>앱에 현장 사진 등록 후 비교 견적 확인</Text>
                            </View>
                        </View>
                        <View style={styles.stepConnector} />

                        {/* Step 2 */}
                        <View style={styles.stepItem}>
                            <View style={styles.stepIconBadge}><Text style={styles.stepNum}>02</Text></View>
                            <View style={styles.stepContent}>
                                <Text style={styles.stepTitleText}>방문 실측 <Text style={{color: HIP_COLORS.NEON_BLUE}}>(필수)</Text></Text>
                                <Text style={styles.stepDescText}>파트너가 직접 방문하여 숨은 비용까지 체크</Text>
                            </View>
                        </View>
                        <View style={styles.stepConnector} />

                        {/* Step 3 */}
                        <View style={styles.stepItem}>
                            <View style={styles.stepIconBadge}><Text style={styles.stepNum}>03</Text></View>
                            <View style={styles.stepContent}>
                                <Text style={styles.stepTitleText}>안심 계약 및 시공</Text>
                                <Text style={styles.stepDescText}>표준 계약서 작성 후 안전하게 공사 시작</Text>
                            </View>
                        </View>
                        <View style={styles.stepConnector} />

                        {/* Step 4 (완료) */}
                        <View style={styles.stepItem}>
                            <View style={[styles.stepIconBadge, styles.stepIconBadgeComplete]}>
                                <Icon name="checkmark-sharp" size={18} color={HIP_COLORS.DARK_BG} />
                            </View>
                            <View style={styles.stepContent}>
                                <Text style={[styles.stepTitleText, { color: HIP_COLORS.NEON_BLUE }]}>검수 및 완료</Text>
                                <Text style={styles.stepDescText}>결과물 확인 및 A/S 보증서 발급</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* 3. 필수 체크리스트 카드 */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>CHECKLIST</Text>
                    <View style={styles.checklistContainer}>
                        <View style={styles.checkItem}>
                            <Icon name="checkbox" size={24} color={HIP_COLORS.NEON_BLUE} style={{ marginRight: 12 }} />
                            <Text style={styles.checkText}>관리사무소 공사 일정 사전 통보</Text>
                        </View>
                        <View style={styles.checkItem}>
                            <Icon name="checkbox" size={24} color={HIP_COLORS.NEON_BLUE} style={{ marginRight: 12 }} />
                            <Text style={styles.checkText}>엘리베이터/복도 보양 작업 범위 확인</Text>
                        </View>
                        <View style={styles.checkItem}>
                            <Icon name="checkbox" size={24} color={HIP_COLORS.NEON_BLUE} style={{ marginRight: 12 }} />
                            <Text style={styles.checkText}>폐기물 처리 비용 포함 여부 체크</Text>
                        </View>
                    </View>
                </View>

                {/* 4. 꿀팁 카드 */}
                <View style={[styles.card, styles.tipCard]}>
                    <View style={styles.tipHeader}>
                        <Icon name="bulb" size={24} color={HIP_COLORS.CYAN_ACCENT} style={{ marginRight: 10 }} />
                        <Text style={styles.tipTitle}>사장님을 위한 팁</Text>
                    </View>
                    <Text style={styles.tipText}>
                        무조건 싼 견적이 정답은 아닙니다. <Text style={styles.tipHighlight}>비슷한 현장 경험</Text>이 많은 파트너가 결국 시간과 비용을 아껴줍니다.
                    </Text>
                </View>
            </ScrollView>

            {/* 하단 액션 버튼 (파란색 네온) */}
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity
                    style={styles.bottomButton}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('EstimateType')}
                >
                    <Text style={styles.bottomButtonText}>안심 견적 신청하기</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: HIP_COLORS.DARK_BG },

    scrollContent: { padding: 24, paddingBottom: 120 },

    introContainer: { marginBottom: 32, paddingHorizontal: 4 },
    introHighlight: { fontSize: 14, fontWeight: 'bold', color: HIP_COLORS.NEON_BLUE, letterSpacing: 2, marginBottom: 8 },
    introTitle: { fontSize: 32, fontWeight: '900', color: HIP_COLORS.TEXT_MAIN, lineHeight: 40, marginBottom: 12 },
    introDesc: { fontSize: 15, color: HIP_COLORS.TEXT_SUB, lineHeight: 22 },

    card: {
        backgroundColor: HIP_COLORS.DARK_CARD,
        borderRadius: 16,
        padding: 24,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: HIP_COLORS.BORDER,
    },
    cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#FFF', marginBottom: 20, letterSpacing: 1 },

    // 🔥 [신규] 안심 견적 이유 그리드 스타일
    reasonGrid: { flexDirection: 'row', justifyContent: 'space-between' },
    reasonItem: { width: '31%', alignItems: 'center' },
    reasonIconBox: {
        width: 50, height: 50, borderRadius: 25,
        backgroundColor: 'rgba(41, 121, 255, 0.1)', // NEON_BLUE 투명도
        justifyContent: 'center', alignItems: 'center', marginBottom: 12,
        borderWidth: 1, borderColor: HIP_COLORS.NEON_BLUE
    },
    reasonTitle: { fontSize: 14, fontWeight: 'bold', color: HIP_COLORS.TEXT_MAIN, marginBottom: 6, textAlign: 'center' },
    reasonDesc: { fontSize: 11, color: HIP_COLORS.TEXT_SUB, textAlign: 'center', lineHeight: 14 },

    // 진행 절차 스타일
    stepContainer: { paddingLeft: 6 },
    stepItem: { flexDirection: 'row', alignItems: 'flex-start' },
    stepIconBadge: {
        width: 30, height: 30, borderRadius: 15,
        backgroundColor: HIP_COLORS.DARK_BG, borderWidth: 1.5, borderColor: HIP_COLORS.NEON_BLUE,
        justifyContent: 'center', alignItems: 'center', marginRight: 14, zIndex: 1
    },
    stepIconBadgeComplete: { backgroundColor: HIP_COLORS.TEXT_MAIN, borderColor: HIP_COLORS.TEXT_MAIN },
    stepNum: { fontSize: 12, fontWeight: 'bold', color: HIP_COLORS.NEON_BLUE },
    stepContent: { flex: 1, paddingBottom: 28 },
    stepTitleText: { fontSize: 16, fontWeight: 'bold', color: HIP_COLORS.TEXT_MAIN, marginBottom: 4 },
    stepDescText: { fontSize: 13, color: HIP_COLORS.TEXT_SUB, lineHeight: 18 },
    stepConnector: {
        position: 'absolute', left: 20, top: 30, width: 1.5, height: '100%',
        backgroundColor: HIP_COLORS.BORDER, zIndex: 0
    },

    checklistContainer: {},
    checkItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    checkText: { fontSize: 15, color: HIP_COLORS.TEXT_SUB, flex: 1 },

    tipCard: { borderColor: HIP_COLORS.NEON_BLUE, backgroundColor: 'rgba(41, 121, 255, 0.05)' },
    tipHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    tipTitle: { fontSize: 16, fontWeight: 'bold', color: HIP_COLORS.CYAN_ACCENT },
    tipText: { fontSize: 14, color: HIP_COLORS.TEXT_SUB, lineHeight: 22 },
    tipHighlight: { fontWeight: 'bold', color: HIP_COLORS.CYAN_ACCENT },

    bottomButtonContainer: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: 20, backgroundColor: HIP_COLORS.DARK_BG,
        borderTopWidth: 1, borderTopColor: HIP_COLORS.BORDER,
    },
    bottomButton: {
        backgroundColor: HIP_COLORS.NEON_BLUE,
        borderRadius: 8,
        height: 56,
        justifyContent: 'center', alignItems: 'center',
        shadowColor: HIP_COLORS.NEON_BLUE,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5,
    },
    bottomButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});

export default GuideScreen;