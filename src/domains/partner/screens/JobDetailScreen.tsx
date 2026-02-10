import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, SafeAreaView, Modal, TextInput, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, SPACING } from '../../../constants/theme';
import { navigationRef } from '../../../navigation/RootNavigation';
import { useToast } from '../../../components/common/Toast';

const SITE_PHOTOS = [
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1620619767323-b95a89183081?w=800&h=800&fit=crop'
];

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const JobDetailScreen = ({ route }: any) => {
    // 1. 데이터 수신
    const { job } = route.params || {
        job: { title: '정보 없음', location: '-', price: '350만원', img: 'https://via.placeholder.com/150' }
    };

    // 2. 훅(Hooks) 선언
    const { showToast } = useToast();

    // 모달 상태
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [isVisitRequired, setIsVisitRequired] = useState(true); // 방문 희망 여부

    // 사진 확대 모달 상태
    const [photoModalVisible, setPhotoModalVisible] = useState(false);
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

    const openPhotoModal = (index: number) => {
        setSelectedPhotoIndex(index);
        setPhotoModalVisible(true);
    };

    const handleFinalApply = () => {
        setModalVisible(false);
        const typeMsg = isVisitRequired ? "방문 상담 요청" : "상담 신청";
        showToast(`${typeMsg}이 성공적으로 전달되었습니다!`, 'success');
        navigationRef.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                <Image source={{ uri: job.img }} style={styles.heroImage} />
                <TouchableOpacity style={styles.backBtn} onPress={() => navigationRef.goBack()}>
                    <Icon name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>

                <View style={styles.content}>
                    <View style={styles.badgeRow}>
                        <View style={styles.badge}><Text style={styles.badgeText}>D-{job.dday || '3'}</Text></View>
                        <Text style={styles.location}>{job.location}</Text>
                    </View>

                    <Text style={styles.title}>{job.title}</Text>
                    <Text style={styles.price}>{job.price}</Text>
                    <View style={styles.divider} />

                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>상세 정보</Text>
                        <Text style={styles.photoCount}>사진 {SITE_PHOTOS.length}장</Text>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.photoList}>
                        {SITE_PHOTOS.map((photoUrl, index) => (
                            <TouchableOpacity key={index} activeOpacity={0.9} onPress={() => openPhotoModal(index)}>
                                <Image source={{ uri: photoUrl }} style={styles.sitePhoto} />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <Text style={styles.desc}>
                        30평 규모의 상가 원상복구 현장입니다.{"\n"}
                        천장 텍스 제거 및 바닥 데코타일 철거 포함입니다.{"\n"}
                        폐기물 처리는 별도 협의 가능합니다.{"\n\n"}
                        * 특이사항: 엘리베이터 사용 가능하며, 주말 작업 선호합니다.
                    </Text>
                </View>
            </ScrollView>

            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.applyBtn} onPress={() => setModalVisible(true)}>
                    <Text style={styles.applyText}>견적 상담 신청하기</Text>
                </TouchableOpacity>
            </View>

            {/* 🔥 [수정됨] 상담 신청 모달 (가격 입력 삭제됨) */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.modalOverlay}
                >
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>상담 신청하기</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Icon name="close" size={24} color="#999" />
                            </TouchableOpacity>
                        </View>

                        {/* 1. 현장 정보 확인 (가격 입력 대신 들어감) */}
                        <View style={styles.infoBox}>
                            <Text style={styles.infoLabel}>지원 현장</Text>
                            <Text style={styles.infoValue}>{job.title}</Text>

                            <View style={styles.infoDivider} />

                            <Text style={styles.infoLabel}>현장 위치</Text>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Icon name="location" size={16} color={COLORS.primary} style={{marginRight:4}} />
                                <Text style={styles.infoValue}>{job.location}</Text>
                            </View>
                        </View>

                        {/* 2. 방문 필수 체크박스 */}
                        <TouchableOpacity
                            style={styles.checkboxRow}
                            activeOpacity={0.8}
                            onPress={() => setIsVisitRequired(!isVisitRequired)}
                        >
                            <Icon
                                name={isVisitRequired ? "checkbox" : "square-outline"}
                                size={24}
                                color={isVisitRequired ? COLORS.primary : "#CCC"}
                            />
                            <Text style={[styles.checkboxText, isVisitRequired && styles.checkboxTextActive]}>
                                정확한 견적을 위해 현장 방문을 희망합니다.
                            </Text>
                        </TouchableOpacity>

                        {/* 3. 메시지 입력 */}
                        <Text style={[styles.label, { marginTop: 16 }]}>전달 메시지</Text>
                        <View style={[styles.inputContainer, { height: 100, alignItems: 'flex-start', paddingTop: 10 }]}>
                            <TextInput
                                style={styles.input}
                                value={message}
                                onChangeText={setMessage}
                                placeholder="예: 안녕하세요, 철거 전문 업체입니다. 연락주시면 방문 일정 잡겠습니다."
                                multiline
                            />
                        </View>

                        <TouchableOpacity style={styles.modalBtn} onPress={handleFinalApply}>
                            <Text style={styles.modalBtnText}>신청 보내기</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </Modal>

            {/* 사진 확대 모달 */}
            <Modal
                visible={photoModalVisible}
                transparent={true}
                onRequestClose={() => setPhotoModalVisible(false)}
                animationType="fade"
            >
                <View style={styles.photoModalContainer}>
                    <TouchableOpacity style={styles.photoCloseBtn} onPress={() => setPhotoModalVisible(false)}>
                        <Icon name="close" size={30} color="#FFF" />
                    </TouchableOpacity>
                    <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} contentOffset={{ x: screenWidth * selectedPhotoIndex, y: 0 }}>
                        {SITE_PHOTOS.map((photoUrl, index) => (
                            <View key={index} style={{ width: screenWidth, height: screenHeight, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={{ uri: photoUrl }} style={styles.fullSizeImage} resizeMode="contain" />
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
    heroImage: { width: '100%', height: 250, backgroundColor: '#EEE' },
    backBtn: { position: 'absolute', top: 40, left: 20, backgroundColor: 'rgba(0,0,0,0.5)', padding: 8, borderRadius: 20, zIndex: 10 },
    content: { padding: SPACING.l, marginTop: -20, backgroundColor: '#FFF', borderTopLeftRadius: 24, borderTopRightRadius: 24 },
    badgeRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    badge: { backgroundColor: '#FF6F00', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginRight: 8 },
    badgeText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },
    location: { color: '#666', fontSize: 14 },
    title: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 8 },
    price: { fontSize: 24, fontWeight: '900', color: COLORS.primary, marginBottom: 24 },
    divider: { height: 1, backgroundColor: '#F0F0F0', marginBottom: 24 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    photoCount: { fontSize: 14, color: COLORS.primary, fontWeight: 'bold' },
    photoList: { marginBottom: 20 },
    sitePhoto: { width: 120, height: 120, borderRadius: 12, marginRight: 10, backgroundColor: '#F0F0F0' },
    desc: { fontSize: 15, color: '#444', lineHeight: 24 },
    bottomBar: { position: 'absolute', bottom: 0, width: '100%', padding: 20, backgroundColor: '#FFF', borderTopWidth: 1, borderColor: '#EEE' },
    applyBtn: { backgroundColor: COLORS.primary, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
    applyText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },

    // 🔥 수정된 모달 스타일
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
    modalContent: { width: '100%', backgroundColor: '#FFF', borderRadius: 20, padding: 24, elevation: 5 },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },

    // 현장 정보 박스
    infoBox: { backgroundColor: '#F9F9F9', borderRadius: 12, padding: 16, marginBottom: 10 },
    infoLabel: { fontSize: 12, color: '#888', marginBottom: 4 },
    infoValue: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    infoDivider: { height: 1, backgroundColor: '#EEE', marginVertical: 10 },

    label: { fontSize: 14, fontWeight: 'bold', color: '#666', marginBottom: 8 },
    inputContainer: { backgroundColor: '#F5F5F5', borderRadius: 12, paddingHorizontal: 16, height: 50, justifyContent: 'center' },
    input: { fontSize: 16, color: '#333', width: '100%' },

    checkboxRow: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
    checkboxText: { marginLeft: 8, fontSize: 14, color: '#666' },
    checkboxTextActive: { color: COLORS.primary, fontWeight: 'bold' },

    modalBtn: { backgroundColor: COLORS.primary, borderRadius: 12, height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 24 },
    modalBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },

    photoModalContainer: { flex: 1, backgroundColor: '#000', justifyContent: 'center' },
    photoCloseBtn: { position: 'absolute', top: 50, right: 20, zIndex: 10, padding: 10, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 25 },
    fullSizeImage: { width: '100%', height: '100%' },
});

export default JobDetailScreen;