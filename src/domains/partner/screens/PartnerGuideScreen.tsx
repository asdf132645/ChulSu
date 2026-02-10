import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../constants/theme';
import Header from '../../../components/common/Header';

// 🔥 파트너용 힙한 네온 블루 팔레트
const HIP_COLORS = {
    DARK_BG: '#0F1115',
    DARK_CARD: '#181A20',
    NEON_BLUE: '#2979FF',     // 메인 포인트
    CYAN_ACCENT: '#00E5FF',   // 강조 포인트
    TEXT_MAIN: '#FFFFFF',
    TEXT_SUB: '#B0B3B8',
    BORDER: '#2A2D35',
    PROFIT_GREEN: '#00C853',  // 수익 강조용 그린
};

const PartnerGuideScreen = ({ navigation }: any) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={HIP_COLORS.DARK_BG} />
            <View style={{ backgroundColor: HIP_COLORS.DARK_BG }}>
                <Header title="파트너 성공 가이드" />
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* 1. 인트로: 수익 창출 강조 */}
                <View style={styles.introContainer}>
                    <Text style={styles.introHighlight}>PARTNER SUCCESS</Text>
                    <Text style={styles.introTitle}>오직 <Text style={{color: HIP_COLORS.NEON_BLUE}}>기술</Text>에만{'\n'}집중하세요.</Text>
                    <Text style={styles.introDesc}>
                        복잡한 영업, 마케팅은 철수가 합니다.{'\n'}
                        사장님은 <Text style={{color: '#FFF', fontWeight:'bold'}}>실력으로 수익만 챙겨가세요.</Text>
                    </Text>
                </View>

                {/* 2. 파트너 핵심 혜택 3가지 */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>WHY CHULSU PARTNER?</Text>
                    <View style={styles.reasonGrid}>
                        {/* 혜택 1 */}
                        <View style={styles.reasonItem}>
                            <View style={styles.reasonIconBox}>
                                <Icon name="trending-up" size={24} color={HIP_COLORS.CYAN_ACCENT} />
                            </View>
                            <Text style={styles.reasonTitle}>공실률 제로</Text>
                            <Text style={styles.reasonDesc}>내 주변 일감이{'\n'}실시간 매칭</Text>
                        </View>
                        {/* 혜택 2 */}
                        <View style={styles.reasonItem}>
                            <View style={[styles.reasonIconBox, { borderColor: HIP_COLORS.PROFIT_GREEN, backgroundColor: 'rgba(0, 200, 83, 0.1)' }]}>
                                <Icon name="wallet" size={24} color={HIP_COLORS.PROFIT_GREEN} />
                            </View>
                            <Text style={styles.reasonTitle}>확실한 정산</Text>
                            <Text style={styles.reasonDesc}>미수금 걱정 없는{'\n'}안전 결제 시스템</Text>
                        </View>
                        {/* 혜택 3 */}
                        <View style={styles.reasonItem}>
                            <View style={styles.reasonIconBox}>
                                <Icon name="people" size={24} color={HIP_COLORS.CYAN_ACCENT} />
                            </View>
                            <Text style={styles.reasonTitle}>진성 고객</Text>
                            <Text style={styles.reasonDesc}>허수 없는 검증된{'\n'}고객 연결</Text>
                        </View>
                    </View>
                </View>

                {/* 3. 일감 수주 프로세스 */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>WORK FLOW</Text>
                    <View style={styles.stepContainer}>
                        {/* Step 1 */}
                        <View style={styles.stepItem}>
                            <View style={styles.stepIconBadge}><Text style={styles.stepNum}>01</Text></View>
                            <View style={styles.stepContent}>
                                <Text style={styles.stepTitleText}>일감 알림 받기</Text>
                                <Text style={styles.stepDescText}>설정한 지역/업종의 신규 오더 푸시 수신</Text>
                            </View>
                        </View>
                        <View style={styles.stepConnector} />

                        {/* Step 2 */}
                        <View style={styles.stepItem}>
                            <View style={styles.stepIconBadge}><Text style={styles.stepNum}>02</Text></View>
                            <View style={styles.stepContent}>
                                <Text style={styles.stepTitleText}>가견적 발송 <Text style={{color: HIP_COLORS.TEXT_MAIN}}>(선점)</Text></Text>
                                <Text style={styles.stepDescText}>빠르게 예상 견적을 보내 고객 관심을 유도</Text>
                            </View>
                        </View>
                        <View style={styles.stepConnector} />

                        {/* Step 3 */}
                        <View style={styles.stepItem}>
                            <View style={styles.stepIconBadge}><Text style={styles.stepNum}>03</Text></View>
                            <View style={styles.stepContent}>
                                <Text style={styles.stepTitleText}>방문 및 최종 계약</Text>
                                <Text style={styles.stepDescText}>현장 방문으로 신뢰도 확보 및 계약 체결</Text>
                            </View>
                        </View>
                        <View style={styles.stepConnector} />

                        {/* Step 4 */}
                        <View style={styles.stepItem}>
                            <View style={[styles.stepIconBadge, styles.stepIconBadgeComplete]}>
                                <Icon name="cash-outline" size={18} color={HIP_COLORS.DARK_BG} />
                            </View>
                            <View style={styles.stepContent}>
                                <Text style={[styles.stepTitleText, { color: HIP_COLORS.PROFIT_GREEN }]}>시공 완료 및 정산</Text>
                                <Text style={styles.stepDescText}>작업 완료 승인 후 대금 즉시 입금 처리</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* 4. 수주 확률 높이는 꿀팁 */}
                <View style={[styles.card, styles.tipCard]}>
                    <View style={styles.tipHeader}>
                        <Icon name="trophy" size={24} color={HIP_COLORS.CYAN_ACCENT} style={{ marginRight: 10 }} />
                        <Text style={styles.tipTitle}>수주율 200% 비법</Text>
                    </View>
                    <Text style={styles.tipText}>
                        고객은 <Text style={styles.tipHighlight}>현장 사진이 포함된 프로필</Text>을 가장 신뢰합니다. 시공 사례를 3개 이상 등록하면 매칭 확률이 대폭 상승합니다.
                    </Text>
                </View>
            </ScrollView>

            {/* 하단 액션 버튼 */}
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity
                    style={styles.bottomButton}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('JobList')}
                >
                    <Text style={styles.bottomButtonText}>지금 일감 찾으러 가기  →</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: HIP_COLORS.DARK_BG },
    scrollContent: { padding: 24, paddingBottom: 120 },

    introContainer: { marginBottom: 32, paddingHorizontal: 4 },
    introHighlight: { fontSize: 14, fontWeight: 'bold', color: HIP_COLORS.TEXT_MAIN, letterSpacing: 2, marginBottom: 8 },
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

    // 혜택 그리드
    reasonGrid: { flexDirection: 'row', justifyContent: 'space-between' },
    reasonItem: { width: '31%', alignItems: 'center' },
    reasonIconBox: {
        width: 50, height: 50, borderRadius: 25,
        backgroundColor: 'rgba(41, 121, 255, 0.1)',
        justifyContent: 'center', alignItems: 'center', marginBottom: 12,
        borderWidth: 1, borderColor: HIP_COLORS.NEON_BLUE
    },
    reasonTitle: { fontSize: 14, fontWeight: 'bold', color: HIP_COLORS.TEXT_MAIN, marginBottom: 6, textAlign: 'center' },
    reasonDesc: { fontSize: 11, color: HIP_COLORS.TEXT_SUB, textAlign: 'center', lineHeight: 14 },

    // 워크플로우
    stepContainer: { paddingLeft: 6 },
    stepItem: { flexDirection: 'row', alignItems: 'flex-start' },
    stepIconBadge: {
        width: 30, height: 30, borderRadius: 15,
        backgroundColor: HIP_COLORS.DARK_BG, borderWidth: 1.5, borderColor: HIP_COLORS.NEON_BLUE,
        justifyContent: 'center', alignItems: 'center', marginRight: 14, zIndex: 1
    },
    stepIconBadgeComplete: { backgroundColor: HIP_COLORS.PROFIT_GREEN, borderColor: HIP_COLORS.PROFIT_GREEN },
    stepNum: { fontSize: 12, fontWeight: 'bold', color: HIP_COLORS.NEON_BLUE },
    stepContent: { flex: 1, paddingBottom: 28 },
    stepTitleText: { fontSize: 16, fontWeight: 'bold', color: HIP_COLORS.TEXT_MAIN, marginBottom: 4 },
    stepDescText: { fontSize: 13, color: HIP_COLORS.TEXT_SUB, lineHeight: 18 },
    stepConnector: {
        position: 'absolute', left: 20, top: 30, width: 1.5, height: '100%',
        backgroundColor: HIP_COLORS.BORDER, zIndex: 0
    },

    // 꿀팁 카드
    tipCard: { borderColor: HIP_COLORS.CYAN_ACCENT, backgroundColor: 'rgba(0, 229, 255, 0.05)' },
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

export default PartnerGuideScreen;