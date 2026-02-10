import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'; // Alert 제거
import Icon from 'react-native-vector-icons/Ionicons';
import { globalStyles } from '../../../styles/globalStyles';
import { COLORS, SPACING } from '../../../constants/theme';
import Header from "../../../components/common/Header"; // Header 경로 확인 필요 (없으면 ../Header)

// 🔥 [핵심] 토스트 훅 import
import { useToast } from '../../../components/common/Toast';

const GeneralEstimateScreen = ({ navigation, route }: any) => {
    // 1. 파트너 정보 받기 (없으면 undefined)
    const targetPartner = route.params?.targetPartner;

    // 🔥 [핵심] 토스트 사용 선언
    const { showToast } = useToast();

    const [step, setStep] = useState(1);
    const [address, setAddress] = useState('');
    const [buildingType, setBuildingType] = useState('');
    const [description, setDescription] = useState('');
    const [photoCount, setPhotoCount] = useState(0);

    const buildingTypes = [
        { id: 'store', label: '상가', icon: 'storefront-outline' },
        { id: 'office', label: '오피스', icon: 'business-outline' },
        { id: 'warehouse', label: '창고', icon: 'cube-outline' },
        { id: 'restaurant', label: '음식점', icon: 'restaurant-outline' },
    ];

    const handleNext = () => {
        // Step 1 유효성 검사
        if (step === 1 && (!address || !buildingType)) {
            showToast('주소와 건물 형태를 모두 입력해주세요.', 'error');
            return;
        }

        // Step 2 유효성 검사
        if (step === 2 && photoCount < 1) {
            showToast('현장 사진을 최소 1장 이상 등록해주세요.', 'error');
            return;
        }

        if (step < 3) {
            setStep(step + 1);
        } else {
            // 최종 제출 완료
            const successMsg = targetPartner
                ? `${targetPartner.name} 파트너님에게 요청이 전달되었습니다.`
                : '견적 신청이 완료되었습니다!';

            // ✅ 성공 토스트 띄우고 홈으로 이동
            showToast(successMsg, 'success');
            navigation.navigate('Home');
        }
    };

    return (
        <View style={globalStyles.container}>
            <Header title="일반 견적" />

            {/* 진행률 바 */}
            <View style={styles.progressBar}>
                <View style={[styles.progressTrack, { width: `${(step / 3) * 100}%` }]} />
            </View>

            <ScrollView contentContainerStyle={{ padding: SPACING.l, paddingBottom: 100 }}>

                {/* 파트너 지정 배너 */}
                {targetPartner && (
                    <View style={styles.targetPartnerBox}>
                        <Text style={styles.targetLabel}>✨ 지정 견적 요청</Text>
                        <View style={{flexDirection:'row', alignItems:'center', marginTop:8}}>
                            <Icon name="person-circle" size={32} color={COLORS.primary} style={{marginRight:8}}/>
                            <View>
                                <Text style={styles.targetName}>
                                    <Text style={{fontWeight:'bold', fontSize:16}}>{targetPartner.name}</Text> 파트너님
                                </Text>
                                <Text style={styles.targetSub}>에게 직접 견적을 요청합니다.</Text>
                            </View>
                        </View>
                    </View>
                )}

                {/* 유의사항 박스 */}
                <View style={styles.warningBox}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                        <Icon name="alert-circle" size={18} color="#FF6F00" />
                        <Text style={styles.warningTitle}> 견적 신청 유의사항</Text>
                    </View>
                    <Text style={styles.warningText}>• 사진만으로 견적을 내므로 실제 비용과 차이가 있을 수 있어요.</Text>
                    <Text style={styles.warningText}>• 정확한 견적은 <Text style={{fontWeight:'bold', textDecorationLine:'underline'}}>안심 견적</Text>을 추천드려요.</Text>
                </View>

                {/* --- STEP 1: 기본 정보 --- */}
                {step === 1 && (
                    <View>
                        <Text style={styles.sectionTitle}>기본 정보</Text>
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

                        <Text style={[styles.label, { marginTop: 24 }]}>건물 형태</Text>
                        <View style={styles.gridContainer}>
                            {buildingTypes.map((type) => (
                                <TouchableOpacity
                                    key={type.id}
                                    style={[styles.gridItem, buildingType === type.id && styles.gridItemActive]}
                                    onPress={() => setBuildingType(type.id)}
                                >
                                    <Icon name={type.icon} size={32} color={buildingType === type.id ? COLORS.primary : COLORS.textSecondary} />
                                    <Text style={[styles.gridLabel, buildingType === type.id && styles.gridLabelActive]}>
                                        {type.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}

                {/* --- STEP 2: 현장 사진 --- */}
                {step === 2 && (
                    <View>
                        <Text style={styles.sectionTitle}>현장 사진 필수!</Text>
                        <Text style={styles.subtitle}>사진만으로 견적을 내므로 상세한 사진이 중요해요</Text>

                        <View style={styles.checklist}>
                            <Text style={styles.checkItem}>✓ 전체 전경 (입구에서 본 모습)</Text>
                            <Text style={styles.checkItem}>✓ 천장 (조명, 배선 등)</Text>
                            <Text style={styles.checkItem}>✓ 바닥 (마감재 종류)</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.photoUploadBox}
                            onPress={() => setPhotoCount(prev => prev + 1)}
                        >
                            <Icon name="camera" size={40} color={COLORS.textSecondary} />
                            <Text style={styles.photoText}>사진 촬영 또는 업로드</Text>
                            <Text style={styles.photoSubText}>최소 5장 이상 권장</Text>
                            {photoCount > 0 && <Text style={{color: COLORS.primary, marginTop: 10}}>{photoCount}장 선택됨</Text>}
                        </TouchableOpacity>
                    </View>
                )}

                {/* --- STEP 3: 추가 설명 --- */}
                {step === 3 && (
                    <View>
                        <Text style={styles.sectionTitle}>추가 설명</Text>
                        <Text style={styles.subtitle}>업체들이 정확한 견적을 내는 데 도움이 돼요</Text>

                        <View style={styles.textAreaContainer}>
                            <TextInput
                                style={styles.textArea}
                                multiline
                                placeholder="예: 천장 텍스가 있고, 벽면에 파티션이 3개 있습니다. 에어컨은 2대이고 바닥은 타일입니다."
                                value={description}
                                onChangeText={setDescription}
                                maxLength={500}
                            />
                            <Text style={styles.charCount}>{description.length}/500자</Text>
                        </View>

                        <View style={styles.summaryBox}>
                            <Text style={styles.summaryTitle}>신청 정보 확인</Text>
                            <View style={styles.summaryRow}><Text style={styles.sLabel}>주소</Text><Text style={styles.sValue}>{address || '-'}</Text></View>
                            <View style={styles.summaryRow}><Text style={styles.sLabel}>건물 타입</Text><Text style={styles.sValue}>{buildingTypes.find(b=>b.id===buildingType)?.label || '-'}</Text></View>
                            <View style={styles.summaryRow}><Text style={styles.sLabel}>사진 수</Text><Text style={styles.sValue}>{photoCount}장</Text></View>

                            <View style={styles.greenBox}>
                                <Text style={styles.greenText}>
                                    {targetPartner ? `✓ ${targetPartner.name} 파트너님에게 전달됩니다!` : '✓ 신청 완료 후 24-48시간 내 견적이 도착해요!'}
                                </Text>
                            </View>
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
                    <Text style={styles.nextText}>{step === 3 ? (targetPartner ? '요청 보내기' : '일반 견적 신청 완료') : '다음'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    progressBar: { height: 4, backgroundColor: '#EEE', width: '100%' },
    progressTrack: { height: '100%', backgroundColor: COLORS.primary },

    targetPartnerBox: { backgroundColor: '#E3F2FD', padding: 16, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#BBDEFB' },
    targetLabel: { color: COLORS.primary, fontSize: 13, fontWeight: 'bold' },
    targetName: { color: '#333', fontSize: 16 },
    targetSub: { color: '#666', fontSize: 14 },

    warningBox: { backgroundColor: '#FFF8E1', padding: 16, borderRadius: 12, marginBottom: 24, borderWidth: 1, borderColor: '#FFE082' },
    warningTitle: { color: '#F57C00', fontWeight: 'bold', fontSize: 13 },
    warningText: { color: '#5D4037', fontSize: 12, marginTop: 4, lineHeight: 18 },

    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.textPrimary, marginBottom: 8 },
    label: { fontSize: 14, fontWeight: 'bold', color: COLORS.textPrimary, marginBottom: 8, marginTop: 16 },
    subtitle: { fontSize: 13, color: COLORS.textSecondary, marginBottom: 20 },

    searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', borderRadius: 8, paddingHorizontal: 12, height: 48 },
    input: { flex: 1, marginLeft: 8, fontSize: 15 },

    gridContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 },
    gridItem: { width: '48%', height: 100, borderRadius: 12, borderWidth: 1, borderColor: '#EEE', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAFAFA' },
    gridItemActive: { borderColor: COLORS.primary, backgroundColor: '#F0F7FF', borderWidth: 2 },
    gridLabel: { marginTop: 8, color: COLORS.textSecondary, fontWeight: '500' },
    gridLabelActive: { color: COLORS.primary, fontWeight: 'bold' },

    checklist: { backgroundColor: '#F0F7FF', padding: 16, borderRadius: 12, marginBottom: 20 },
    checkItem: { color: COLORS.primary, fontSize: 13, marginBottom: 6 },
    photoUploadBox: { height: 180, borderWidth: 1, borderColor: '#DDD', borderStyle: 'dashed', borderRadius: 12, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAFAFA' },
    photoText: { fontWeight: 'bold', color: COLORS.textPrimary, marginTop: 10 },
    photoSubText: { fontSize: 12, color: COLORS.textSecondary, marginTop: 4 },

    textAreaContainer: { borderWidth: 1, borderColor: '#DDD', borderRadius: 12, padding: 12, height: 150, marginBottom: 24 },
    textArea: { flex: 1, textAlignVertical: 'top', fontSize: 14 },
    charCount: { textAlign: 'right', color: COLORS.textSecondary, fontSize: 12 },

    summaryBox: { borderTopWidth: 1, borderTopColor: '#EEE', paddingTop: 20 },
    summaryTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    sLabel: { color: COLORS.textSecondary },
    sValue: { fontWeight: 'bold', color: COLORS.textPrimary },
    greenBox: { backgroundColor: '#E8F5E9', padding: 12, borderRadius: 8, marginTop: 16 },
    greenText: { color: '#2E7D32', fontSize: 13, fontWeight: 'bold', textAlign: 'center' },

    bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', padding: 16, backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#EEE' },
    prevBtn: { flex: 1, marginRight: 8, height: 50, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#DDD', borderRadius: 8 },
    prevText: { color: COLORS.textSecondary, fontWeight: 'bold' },
    nextBtn: { flex: 2, height: 50, backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center', borderRadius: 8 },
    nextText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});

export default GeneralEstimateScreen;