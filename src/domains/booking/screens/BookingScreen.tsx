import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'; // Alert 제거
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalStyles } from '../../../styles/globalStyles';
import { COLORS, SPACING } from '../../../constants/theme';
import Header from "../../../components/common/Header";

// 🔥 [핵심] 토스트 훅 import
import { useToast } from '../../../components/common/Toast';

// 캘린더 한국어 설정
LocaleConfig.locales['kr'] = {
    monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
    monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
    dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
    dayNamesShort: ['일','월','화','수','목','금','토'],
    today: '오늘'
};
LocaleConfig.defaultLocale = 'kr';

const BookingScreen = ({ navigation }: any) => {
    // 🔥 [핵심] 토스트 사용 선언
    const { showToast } = useToast();

    // 단계 관리 (1: 기본정보, 2: 사진, 3: 일정)
    const [step, setStep] = useState(1);

    // 입력 데이터 상태
    const [address, setAddress] = useState('');
    const [buildingType, setBuildingType] = useState('');
    const [area, setArea] = useState('');
    const [photoCount, setPhotoCount] = useState(0);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState<'morning' | 'afternoon' | 'consult' | null>(null);

    // 건물 형태 옵션
    const buildingTypes = [
        { id: 'store', label: '상가', icon: 'storefront-outline' },
        { id: 'office', label: '오피스', icon: 'business-outline' },
        { id: 'warehouse', label: '창고', icon: 'cube-outline' },
        { id: 'restaurant', label: '음식점', icon: 'restaurant-outline' },
    ];

    // 다음 단계 이동 및 검증 로직
    const handleNext = () => {
        if (step === 1) {
            if (!address || !buildingType || !area) {
                // 🚨 Alert 대신 에러 토스트
                showToast('주소, 건물 형태, 평수를 모두 입력해주세요.', 'error');
                return;
            }
            setStep(2);
        } else if (step === 2) {
            if (photoCount < 2) {
                // 🚨 Alert 대신 에러 토스트
                showToast('정확한 검토를 위해 최소 2장의 사진을 등록해주세요.', 'error');
                return;
            }
            setStep(3);
        } else if (step === 3) {
            if (!selectedDate || !selectedTime) {
                // 🚨 Alert 대신 에러 토스트
                showToast('방문 희망 날짜와 시간을 선택해주세요.', 'error');
                return;
            }

            // ✅ 최종 완료 (성공 토스트 + 홈 이동)
            showToast('안심 견적 신청이 완료되었습니다! (24시간 내 연락)', 'success');
            navigation.navigate('Home');
        }
    };

    return (
        <View style={globalStyles.container}>
            <Header title="안심 견적" />
            {/* 상단 진행률 바 (3단계) */}
            <View style={styles.progressBar}>
                <View style={[styles.progressTrack, { width: `${(step / 3) * 100}%` }]} />
            </View>

            <ScrollView contentContainerStyle={{ padding: SPACING.l, paddingBottom: 100 }}>
                {/* --- STEP 1: 기본 정보 (주소/건물/평수) --- */}
                {step === 1 && (
                    <View>
                        <Text style={styles.headerTitle}>기본 정보 입력</Text>
                        <Text style={styles.headerDesc}>정확한 견적을 위해 현장 정보를 알려주세요</Text>

                        {/* 주소 입력 */}
                        <Text style={styles.label}>주소</Text>
                        <View style={styles.searchBar}>
                            <Icon name="search" size={20} color={COLORS.textSecondary} />
                            <TextInput
                                placeholder="도로명 주소 검색"
                                style={styles.input}
                                value={address}
                                onChangeText={setAddress}
                            />
                        </View>

                        {/* 건물 형태 선택 */}
                        <Text style={[styles.label, { marginTop: 24 }]}>건물 형태</Text>
                        <View style={styles.gridContainer}>
                            {buildingTypes.map((type) => (
                                <TouchableOpacity
                                    key={type.id}
                                    style={[styles.gridItem, buildingType === type.id && styles.gridItemActive]}
                                    onPress={() => setBuildingType(type.id)}
                                >
                                    <Icon
                                        name={type.icon}
                                        size={28}
                                        color={buildingType === type.id ? COLORS.primary : COLORS.textSecondary}
                                    />
                                    <Text style={[styles.gridLabel, buildingType === type.id && styles.gridLabelActive]}>
                                        {type.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* 평수 입력 */}
                        <Text style={[styles.label, { marginTop: 24 }]}>면적 (평)</Text>
                        <View style={styles.inputBox}>
                            <TextInput
                                placeholder="예: 30"
                                style={styles.input}
                                keyboardType="numeric"
                                value={area}
                                onChangeText={setArea}
                            />
                            <Text style={styles.unitText}>평</Text>
                        </View>
                        <Text style={styles.helperText}>* 정확한 면적은 본사 직원이 방문하여 측정해드려요</Text>
                    </View>
                )}

                {/* --- STEP 2: 현장 사진 --- */}
                {step === 2 && (
                    <View>
                        <Text style={styles.headerTitle}>현장 사진 업로드</Text>
                        <Text style={styles.headerDesc}>사진이 있으면 더 정확한 사전 검토가 가능해요</Text>

                        <View style={styles.tipBox}>
                            <Text style={styles.tipText}>💡 촬영 팁: 전체 모습, 천장, 바닥, 벽면을 찍어주시면 좋아요!</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.photoUploadBox}
                            onPress={() => setPhotoCount(prev => prev + 1)}
                        >
                            <Icon name="camera" size={48} color={COLORS.primary} />
                            <Text style={styles.photoMainText}>사진 촬영 또는 업로드</Text>
                            <Text style={styles.photoSubText}>최소 2장 이상 권장 (전체 모습, 세부 사항)</Text>
                            {photoCount > 0 && (
                                <View style={styles.photoBadge}>
                                    <Text style={styles.photoBadgeText}>{photoCount}장 선택됨</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                )}

                {/* --- STEP 3: 방문 일정 --- */}
                {step === 3 && (
                    <View>
                        <Text style={styles.headerTitle}>방문 희망 일정</Text>
                        <Text style={styles.headerDesc}>본사 직원이 방문하여 정확하게 측정해드려요</Text>

                        {/* 캘린더 */}
                        <View style={styles.calendarWrapper}>
                            <Calendar
                                onDayPress={(day: any) => setSelectedDate(day.dateString)}
                                markedDates={{
                                    [selectedDate]: { selected: true, selectedColor: COLORS.primary }
                                }}
                                theme={{
                                    selectedDayBackgroundColor: COLORS.primary,
                                    todayTextColor: COLORS.primary,
                                    arrowColor: COLORS.primary,
                                    textMonthFontWeight: 'bold',
                                }}
                            />
                        </View>

                        {/* 시간대 선택 */}
                        <Text style={[styles.label, { marginBottom: 12 }]}>방문 시간대</Text>
                        <View style={styles.timeRow}>
                            {[
                                { id: 'morning', label: '오전 (9-12시)' },
                                { id: 'afternoon', label: '오후 (12-18시)' },
                                { id: 'consult', label: '협의' }
                            ].map((time) => (
                                <TouchableOpacity
                                    key={time.id}
                                    style={[styles.timeBtn, selectedTime === time.id && styles.timeBtnActive]}
                                    onPress={() => setSelectedTime(time.id as any)}
                                >
                                    <Text style={[styles.timeText, selectedTime === time.id && styles.timeTextActive]}>
                                        {time.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* 혜택 안내 및 프로세스 */}
                        <View style={styles.benefitBox}>
                            <Text style={styles.benefitTitle}>🎁 첫 이용 혜택</Text>
                            <Text style={styles.benefitText}>방문 측정 무료 + 견적서 무료 제공!</Text>
                        </View>
                        <View style={styles.processBox}>
                            <Text style={styles.processText}>✓ 신청 후 24시간 내 본사에서 연락드려요</Text>
                            <Text style={styles.processText}>✓ 방문 일정을 최종 확정해요</Text>
                        </View>
                    </View>
                )}
            </ScrollView>

            {/* 하단 네비게이션 버튼 */}
            <View style={styles.bottomNav}>
                {step > 1 && (
                    <TouchableOpacity style={styles.prevBtn} onPress={() => setStep(step - 1)}>
                        <Text style={styles.prevText}>이전</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
                    <Text style={styles.nextText}>
                        {step === 3 ? '안심 견적 신청 완료' : '다음'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    progressBar: { height: 4, backgroundColor: '#EEE', width: '100%' },
    progressTrack: { height: '100%', backgroundColor: COLORS.primary },

    headerTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.textPrimary, marginBottom: 6 },
    headerDesc: { fontSize: 14, color: COLORS.textSecondary, marginBottom: 24 },

    label: { fontSize: 15, fontWeight: 'bold', color: COLORS.textPrimary, marginBottom: 8 },
    searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', borderRadius: 12, paddingHorizontal: 12, height: 50 },
    input: { flex: 1, marginLeft: 8, fontSize: 15, color: COLORS.textPrimary },

    inputBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', borderRadius: 12, paddingHorizontal: 12, height: 50 },
    unitText: { fontSize: 15, fontWeight: 'bold', color: COLORS.textPrimary },
    helperText: { fontSize: 12, color: COLORS.textSecondary, marginTop: 6, marginLeft: 4 },

    gridContainer: { flexDirection: 'row', gap: 10, justifyContent: 'space-between' },
    gridItem: { width: '23%', height: 80, borderRadius: 12, borderWidth: 1, borderColor: '#EEE', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' },
    gridItemActive: { borderColor: COLORS.primary, backgroundColor: '#F0F7FF', borderWidth: 2 },
    gridLabel: { marginTop: 6, fontSize: 12, color: COLORS.textSecondary },
    gridLabelActive: { color: COLORS.primary, fontWeight: 'bold' },

    tipBox: { backgroundColor: '#FFF8E1', padding: 12, borderRadius: 8, marginBottom: 16 },
    tipText: { color: '#F57C00', fontSize: 12, fontWeight: 'bold' },

    photoUploadBox: { height: 200, borderWidth: 1, borderColor: '#DDD', borderStyle: 'dashed', borderRadius: 16, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAFAFA' },
    photoMainText: { fontSize: 16, fontWeight: 'bold', color: COLORS.textPrimary, marginTop: 12 },
    photoSubText: { fontSize: 12, color: COLORS.textSecondary, marginTop: 4 },
    photoBadge: { marginTop: 12, backgroundColor: COLORS.primary, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
    photoBadgeText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },

    calendarWrapper: { backgroundColor: '#FFF', borderRadius: 16, padding: 4, elevation: 2, marginBottom: 24, borderWidth: 1, borderColor: '#EEE' },
    timeRow: { flexDirection: 'row', gap: 8, marginBottom: 24 },
    timeBtn: { flex: 1, paddingVertical: 14, alignItems: 'center', borderRadius: 12, borderWidth: 1, borderColor: '#EEE', backgroundColor: '#FFF' },
    timeBtnActive: { borderColor: COLORS.primary, backgroundColor: '#F0F7FF' },
    timeText: { fontSize: 14, color: COLORS.textSecondary },
    timeTextActive: { color: COLORS.primary, fontWeight: 'bold' },

    benefitBox: { backgroundColor: '#E3F2FD', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 12 },
    benefitTitle: { fontSize: 14, fontWeight: 'bold', color: COLORS.primary, marginBottom: 4 },
    benefitText: { fontSize: 13, color: COLORS.textPrimary },
    processBox: { padding: 12, backgroundColor: '#F9F9F9', borderRadius: 12 },
    processText: { fontSize: 12, color: COLORS.textSecondary, marginBottom: 4 },

    bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', padding: 16, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#EEE' },
    prevBtn: { flex: 1, marginRight: 8, height: 54, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#DDD', borderRadius: 12 },
    prevText: { color: COLORS.textSecondary, fontWeight: 'bold', fontSize: 16 },
    nextBtn: { flex: 2, height: 54, backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', borderRadius: 12 },
    nextText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});

export default BookingScreen;