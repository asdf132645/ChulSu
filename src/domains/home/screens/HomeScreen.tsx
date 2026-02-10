import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Switch, Text } from 'react-native';
import { COLORS } from '../../../constants/theme';

// ✅ 컴포넌트 import
import HomeDashboard from '../components/HomeDashboard';
import PartnerRanking from '../components/PartnerRanking';
import JobSlider from '../components/JobSlider';
import ServiceSelection from '../components/ServiceSelection';
import Header from "../../../components/common/Header";
import { useUser } from '../../../context/UserContext';

// --- 더미 데이터 (금액 정보 제거 및 대체 텍스트 적용) ---
const RECOMMENDED_JOBS = [
    { id: 1, title: '강남구 상가 철거', location: '서울 역삼동', size: '30평', price: '견적 협의', dday: 3, img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=200&h=200&fit=crop' },
    { id: 2, title: '서초구 오피스', location: '서울 서초동', size: '45평', price: '방문 견적', dday: 5, img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=200&fit=crop' },
    { id: 3, title: '홍대 카페 폐업', location: '서울 서교동', size: '15평', price: '견적 협의', dday: 1, img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200&h=200&fit=crop' },
];

const TOP_PARTNERS = [
    // price 필드를 '경력'이나 '특징'으로 대체하여 렌더링하도록 유도
    { id: 1, name: '장호연', job: '목수 외 3', count: '28.5공수', price: '경력 15년', rank: 1, img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=200&h=200&fit=crop' },
    { id: 2, name: '이장목', job: '전기', count: '29공수', price: 'A/S 우수', rank: 2, img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=200&h=200&fit=crop' },
    { id: 3, name: '김철거', job: '철거 전문', count: '35공수', price: '자격증 보유', rank: 3, img: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c7c?w=200&h=200&fit=crop' },
];

const HomeScreen = ({ navigation }: any) => {
    const { isPartnerMode, toggleUserMode } = useUser();

    return (
        <View style={styles.container}>
            <Header showModeToggle={true} />

            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false} bounces={false}>
                {isPartnerMode ? (
                    /* === 👷 파트너 모드 (수입 -> 일감/기회 강조) === */
                    <>
                        <HomeDashboard
                            userTitle="기술자 김철수님"
                            // 🔥 수정: 수입 금액 -> 신규 일감 개수 강조
                            mainTitle={<Text>오늘 내 주변에{"\n"}<Text style={{color: COLORS.primary}}>신규 현장</Text>이 <Text style={{color: COLORS.primary}}>15곳</Text> 떴습니다!</Text>}
                            subText="맞춤 추천 일감 5건 확인하기"
                            btnText="내 스케줄 확인"
                            onBtnPress={() => navigation.navigate('Schedule')}
                            icon="construct"
                            // 🔥 수정: 통계도 활동성 위주로 변경
                            stats={{ label1: "읽지 않은 견적", val1: "3", label2: "진행중 현장", val2: "2" }}
                            bannerTitle="고객 응대 꿀팁 확인하기"
                        />
                        {/* JobSlider에 전달되는 데이터(price)가 이제 '견적 협의'로 나옵니다 */}
                        <JobSlider jobs={RECOMMENDED_JOBS} navigation={navigation} />
                    </>
                ) : (
                    /* === 👤 고객 모드 (누적 금액 -> 안심/현황 강조) === */
                    <>
                        <HomeDashboard
                            userTitle="사장님 안녕하세요,"
                            // 🔥 유지: 건수 위주 (금액 X)
                            mainTitle={<Text>현재 진행 중인{"\n"}<Text style={{color: COLORS.primary}}>안심 견적</Text>이 <Text style={{color: COLORS.primary}}>3건</Text>입니다.</Text>}
                            subText="새로 도착한 제안서 2건"
                            btnText="내 견적함 가기"
                            icon="person"
                            onBtnPress={() => navigation.navigate('Schedule')}
                            // 🔥 유지: 만족도 및 업체 수
                            stats={{ label1: "내 주변 업체", val1: "12", label2: "평균 만족도", val2: "4.9" }}
                            bannerTitle="철수 사용자 가이드"
                        />

                        <ServiceSelection navigation={navigation} />

                        {/* PartnerRanking에 전달되는 데이터(price)가 이제 '경력/특징'으로 나옵니다 */}
                        <PartnerRanking partners={TOP_PARTNERS} navigation={navigation} />
                    </>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F7FA' },
    devHeader: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#333', paddingVertical: 8 },
    devText: { color: '#FFF', marginRight: 10, fontWeight: 'bold', fontSize: 12 },
    scrollContainer: { flex: 1 },
});

export default HomeScreen;