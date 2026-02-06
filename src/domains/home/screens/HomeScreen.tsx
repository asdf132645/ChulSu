import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Switch, Text } from 'react-native';
import { COLORS } from '../../../constants/theme';

// ✅ 컴포넌트 import (중복 선언 제거됨)
import HomeDashboard from '../components/HomeDashboard';
import PartnerRanking from '../components/PartnerRanking';
import JobSlider from '../components/JobSlider';
import ServiceSelection from '../components/ServiceSelection';

// --- 더미 데이터 ---
const RECOMMENDED_JOBS = [
    { id: 1, title: '강남구 상가 철거', location: '서울 역삼동', size: '30평', price: '350만원', dday: 3, img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=200&h=200&fit=crop' },
    { id: 2, title: '서초구 오피스', location: '서울 서초동', size: '45평', price: '520만원', dday: 5, img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=200&fit=crop' },
    { id: 3, title: '홍대 카페 폐업', location: '서울 서교동', size: '15평', price: '210만원', dday: 1, img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200&h=200&fit=crop' },
];

const TOP_PARTNERS = [
    { id: 1, name: '장호연', job: '목수 외 3', count: '28.5공수', price: '8,345,000원', rank: 1, img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=200&h=200&fit=crop' },
    { id: 2, name: '이장목', job: '전기', count: '29공수', price: '7,950,000원', rank: 2, img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=200&h=200&fit=crop' },
    { id: 3, name: '김철거', job: '철거 전문', count: '35공수', price: '6,200,000원', rank: 3, img: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c7c?w=200&h=200&fit=crop' },
];

const HomeScreen = ({ navigation }: any) => {
    const [isPartnerMode, setIsPartnerMode] = useState(false);

    return (
        <View style={styles.container}>
            {/* 개발용 토글 */}
            <View style={styles.devHeader}>
                <Text style={styles.devText}>{isPartnerMode ? '👷 파트너(업자) 모드' : '👤 고객(사용자) 모드'}</Text>
                <Switch
                    value={isPartnerMode}
                    onValueChange={setIsPartnerMode}
                    trackColor={{ false: "#767577", true: "#90CAF9" }}
                    thumbColor={isPartnerMode ? COLORS.primary : "#f4f3f4"}
                />
            </View>

            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false} bounces={false}>
                {isPartnerMode ? (
                    /* === 파트너 모드 === */
                    <>
                        <HomeDashboard
                            userTitle="기술자 김철수님"
                            mainTitle={<Text>이번달 수입은{"\n"}<Text style={{color: COLORS.primary}}>4,500,000원</Text>입니다.</Text>}
                            subText="지원 중인 견적 3,500,000원"
                            btnText="스케줄 관리"
                            icon="construct"
                            stats={{ label1: "오늘의 매칭", val1: "1", label2: "이번주 이슈", val2: "6" }}
                            bannerTitle="어플 사용 Tips !"
                        />
                        <JobSlider jobs={RECOMMENDED_JOBS} navigation={navigation} />
                    </>
                ) : (
                    /* === 고객 모드 === */
                    <>
                        <HomeDashboard
                            userTitle="사장님 안녕하세요,"
                            mainTitle={<Text>현재 진행 중인{"\n"}<Text style={{color: COLORS.primary}}>안심 견적</Text>이 <Text style={{color: COLORS.primary}}>3건</Text>입니다.</Text>}
                            subText="도착한 견적 5건"
                            btnText="견적 일정 관리"
                            icon="person"
                            onBtnPress={() => navigation.navigate('Booking')}
                            stats={{ label1: "내 주변 업체", val1: "12", label2: "평균 만족도", val2: "4.9" }}
                            bannerTitle="철수 앱 활용 Tip !"
                        />

                        {/* ✅ 분리된 컴포넌트 사용 */}
                        <ServiceSelection navigation={navigation} />

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