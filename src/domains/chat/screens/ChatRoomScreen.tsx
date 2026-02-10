import React, { useState, useRef, useEffect } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet,
    FlatList, SafeAreaView, KeyboardAvoidingView, Platform, Modal, Dimensions, Image, ScrollView, Alert, Linking, PermissionsAndroid, TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchCamera, launchImageLibrary, Asset } from 'react-native-image-picker';
import { COLORS, SPACING } from '../../../constants/theme';
import { navigationRef } from '../../../navigation/RootNavigation';
import { useUser } from '../../../context/UserContext';

const { width } = Dimensions.get('window');

// -------------------------------------------------------------------------
// 1. 유틸리티 함수
// -------------------------------------------------------------------------
const formatPrice = (price: string | number) => {
    if (!price) return '0';
    const num = Number(String(price).replace(/[^0-9]/g, ''));
    return isNaN(num) ? '0' : num.toLocaleString();
};

// -------------------------------------------------------------------------
// 2. 타입 정의
// -------------------------------------------------------------------------
interface Message {
    id: string;
    text: string;
    sender: 'me' | 'partner' | 'system';
    type: 'text' | 'image' | 'schedule' | 'estimate';
    time: string;
    imageUri?: string;
    data?: any;
    // 🔥 [데모용] 메시지별로 타입을 강제 지정하기 위한 필드 추가
    demoType?: 'basic' | 'premium';
}

// -------------------------------------------------------------------------
// 3. 하위 컴포넌트 (달력, 견적서, 프로세스 바)
// -------------------------------------------------------------------------

// 🗓️ [달력] 방문 약속 잡기 모달
const CalendarModal = ({ visible, onClose, onConfirm }: any) => {
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const days = Array.from({ length: 28 }, (_, i) => i + 1);
    const times = ['10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.modalOverlay}>
                <View style={styles.calendarContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>📅 방문 약속 잡기</Text>
                        <TouchableOpacity onPress={onClose}><Icon name="close" size={24} color="#333" /></TouchableOpacity>
                    </View>
                    <Text style={styles.sectionTitle}>2026년 2월</Text>
                    <View style={styles.calendarGrid}>
                        {days.map((day) => (
                            <TouchableOpacity key={day} style={[styles.dayCell, selectedDate === day && styles.dayCellSelected]} onPress={() => setSelectedDate(day)}>
                                <Text style={[styles.dayText, selectedDate === day && styles.textWhite]}>{day}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
                        {times.map((time) => (
                            <TouchableOpacity key={time} style={[styles.timeChip, selectedTime === time && styles.timeChipSelected]} onPress={() => setSelectedTime(time)}>
                                <Text style={[styles.timeText, selectedTime === time && styles.textWhite]}>{time}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <TouchableOpacity
                        style={[styles.fullBtn, (!selectedDate || !selectedTime) && { backgroundColor: '#DDD' }]}
                        disabled={!selectedDate || !selectedTime}
                        onPress={() => onConfirm(`2026.02.${selectedDate}`, selectedTime)}
                    >
                        <Text style={styles.fullBtnText}>약속 제안하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

// 💰 [견적서] 업체용 견적 발송 모달
const EstimateModal = ({ visible, onClose, onSend }: any) => {
    const [price, setPrice] = useState('');
    const [detail, setDetail] = useState('');

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.estimateContainer}>
                    <Text style={styles.modalTitle}>견적서 발송</Text>
                    <Text style={styles.subTitle}>고객님께 최종 견적 금액을 알려주세요.</Text>
                    <TextInput
                        style={styles.inputBox}
                        placeholder="총 견적 금액 (예: 1500000)"
                        keyboardType="numeric"
                        value={price}
                        onChangeText={setPrice}
                    />
                    <Text style={{textAlign:'right', marginBottom:10, color:'#888'}}>{formatPrice(price)}원</Text>
                    <TextInput
                        style={[styles.inputBox, { height: 100, textAlignVertical: 'top' }]}
                        placeholder="상세 내용 (철거 범위, 폐기물 처리 등)"
                        multiline
                        value={detail}
                        onChangeText={setDetail}
                    />
                    <View style={styles.btnRow}>
                        <TouchableOpacity style={styles.cancelBtn} onPress={onClose}><Text style={styles.cancelText}>취소</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.confirmBtn} onPress={() => onSend(price, detail)}><Text style={styles.confirmText}>발송하기</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

// 🚥 [프로세스 바]
const ProcessBar = ({ step }: { step: number }) => (
    <View style={styles.processContainer}>
        <View style={styles.stepItem}>
            <View style={[styles.stepCircle, step >= 1 ? styles.activeCircle : styles.inactiveCircle]}><Text style={styles.stepNum}>1</Text></View>
            <Text style={[styles.stepLabel, step >= 1 ? styles.activeLabel : styles.inactiveLabel]}>상담</Text>
        </View>
        <View style={[styles.stepLine, step >= 2 ? styles.activeLine : styles.inactiveLine]} />
        <View style={styles.stepItem}>
            <View style={[styles.stepCircle, step >= 2 ? styles.activeCircle : styles.inactiveCircle]}><Text style={styles.stepNum}>2</Text></View>
            <Text style={[styles.stepLabel, step >= 2 ? styles.activeLabel : styles.inactiveLabel]}>방문/일정</Text>
        </View>
        <View style={[styles.stepLine, step >= 3 ? styles.activeLine : styles.inactiveLine]} />
        <View style={styles.stepItem}>
            <View style={[styles.stepCircle, step >= 3 ? styles.activeCircle : styles.inactiveCircle]}><Text style={styles.stepNum}>3</Text></View>
            <Text style={[styles.stepLabel, step >= 3 ? styles.activeLabel : styles.inactiveLabel]}>확정/결제</Text>
        </View>
    </View>
);

// -------------------------------------------------------------------------
// 4. 메인 화면
// -------------------------------------------------------------------------
const ChatRoomScreen = ({ route }: any) => {
    const { isPartnerMode } = useUser();
    const { partnerName, type } = route.params || { partnerName: '상담원', type: 'basic' };

    const [step, setStep] = useState(3); // 🔥 데모용: 3단계(확정) 상태로 시작
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');

    const [showMenu, setShowMenu] = useState(false);
    const [showHeaderMenu, setShowHeaderMenu] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [showEstimate, setShowEstimate] = useState(false);

    const flatListRef = useRef<FlatList>(null);

    // 🔥 [데모 데이터] 화면 진입 시 결제/확정 버튼이 모두 보이도록 강제 세팅
    useEffect(() => {
        setMessages([
            {
                id: '1',
                text: `${partnerName}입니다. 무엇을 도와드릴까요?`,
                sender: 'partner',
                type: 'text',
                time: '오전 10:00'
            },
            {
                id: '2',
                text: '약속 제안',
                sender: 'partner',
                type: 'schedule',
                time: '오전 10:05',
                data: { date: '2026.02.14', time: '14:00' }
            },
            // 💰 [데모 1] 안심 견적서 (결제 버튼 보임)
            {
                id: '3',
                text: '견적서 발송',
                sender: 'partner',
                type: 'estimate',
                time: '오전 10:10',
                data: { price: '2800000', detail: '[안심] 철거 및 폐기물 처리 포함' },
                demoType: 'premium' // 🔥 강제 프리미엄 설정
            },
            // ✅ [데모 2] 일반 견적서 (시공 확정 버튼 보임)
            {
                id: '4',
                text: '견적서 발송',
                sender: 'partner',
                type: 'estimate',
                time: '오전 10:12',
                data: { price: '1500000', detail: '[일반] 단순 철거 작업' },
                demoType: 'basic' // 🔥 강제 일반 설정
            }
        ]);
    }, []);

    const addMessage = (msg: Message) => {
        setMessages(prev => [...prev, msg]);
        setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    };

    const getCurrentTime = () => new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });

    const handleSendText = () => {
        if (!inputText.trim()) return;
        addMessage({ id: Date.now().toString(), text: inputText, sender: 'me', type: 'text', time: getCurrentTime() });
        setInputText('');
    };

    // 카메라/이미지 로직 (동일)
    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) { return false; }
        }
        return true;
    };

    const handleImagePicker = async (mode: 'camera' | 'gallery') => {
        setShowMenu(false);
        const options: any = { mediaType: 'photo', quality: 0.8 };
        if (mode === 'camera') {
            if (!(await requestCameraPermission())) return;
            const result = await launchCamera(options);
            if (result.assets?.[0]) sendImage(result.assets[0]);
        } else {
            const result = await launchImageLibrary(options);
            if (result.assets?.[0]) sendImage(result.assets[0]);
        }
    };

    const sendImage = (asset: Asset) => {
        addMessage({ id: Date.now().toString(), text: '', sender: 'me', type: 'image', imageUri: asset.uri, time: getCurrentTime() });
    };

    const handleScheduleConfirm = (date: string, time: string) => {
        setShowCalendar(false); setShowMenu(false);
        addMessage({ id: Date.now().toString(), text: '약속 제안', sender: 'me', type: 'schedule', time: getCurrentTime(), data: { date, time } });
    };

    const handleEstimateSend = (price: string, detail: string) => {
        setShowEstimate(false); setShowMenu(false);
        addMessage({
            id: Date.now().toString(),
            text: '견적서 발송',
            sender: 'me',
            type: 'estimate',
            time: getCurrentTime(),
            data: { price, detail },
            demoType: type === 'premium' ? 'premium' : 'basic'
        });
        setStep(3);
    };

    // 결제/확정 핸들러
    const handlePayment = () => {
        Alert.alert("안심 결제", "PG사 결제창이 뜹니다. (테스트)", [{ text: "확인" }]);
    };

    const handleConfirmConstruction = () => {
        Alert.alert("시공 확정", "시공이 확정되었습니다. (무료)", [{ text: "확인" }]);
    };

    const renderMessage = ({ item }: { item: Message }) => {
        if (item.sender === 'system') {
            return (
                <View style={styles.systemMessage}>
                    <Icon name="information-circle" size={14} color="#555" />
                    <Text style={styles.systemText}> {item.text}</Text>
                </View>
            );
        }

        const isMe = item.sender === 'me';
        // 🔥 메시지별 타입 우선 적용, 없으면 방 타입 따름
        const currentType = item.demoType || type;

        return (
            <View style={[styles.row, isMe ? styles.rowMe : styles.rowPartner]}>
                {!isMe && <View style={styles.avatar}><Icon name="person" size={20} color="#FFF" /></View>}
                <View style={{ maxWidth: '75%', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
                    {item.type === 'text' && (
                        <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubblePartner]}>
                            <Text style={[styles.msgText, isMe && styles.textWhite]}>{item.text}</Text>
                        </View>
                    )}
                    {item.type === 'image' && item.imageUri && (
                        <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubblePartner, { padding: 4 }]}>
                            <Image source={{ uri: item.imageUri }} style={styles.msgImage} resizeMode="cover" />
                        </View>
                    )}
                    {item.type === 'schedule' && (
                        <View style={styles.card}>
                            <View style={styles.cardHeader}><Icon name="calendar" size={16} color={COLORS.primary} /><Text style={styles.cardTitle}> 약속 잡기</Text></View>
                            <Text style={styles.cardBigText}>{item.data.date} {item.data.time}</Text>
                            <Text style={styles.cardDesc}>{isMe ? '방문 약속을 제안했습니다.' : '상대방이 방문 약속을 제안했습니다.'}</Text>
                            {!isMe && (
                                <TouchableOpacity style={styles.cardBtn} onPress={() => Alert.alert("확정", "일정이 확정되었습니다.")}>
                                    <Text style={styles.cardBtnText}>이 시간으로 확정</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}

                    {/* 🔥 [견적서 카드] 여기가 핵심입니다 🔥 */}
                    {item.type === 'estimate' && (
                        <View style={[styles.card, { borderColor: currentType === 'premium' ? COLORS.secondary : '#DDD' }]}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardTitle}>📄 최종 견적서</Text>
                                <View style={[styles.badge, currentType === 'premium' ? {backgroundColor: COLORS.secondary} : {backgroundColor: '#555'}]}>
                                    <Text style={styles.badgeText}>{currentType === 'premium' ? '안심견적' : '일반견적'}</Text>
                                </View>
                            </View>
                            <Text style={styles.cardPrice}>{formatPrice(item.data.price)}원</Text>
                            <Text style={styles.cardDesc}>{item.data.detail}</Text>

                            {/* 👇 데모용: 내가 보낸게 아니면 무조건 버튼 노출 (파트너 모드라도 보이게 처리함) */}
                            {!isMe && (
                                <>
                                    {currentType === 'premium' ? (
                                        <TouchableOpacity style={styles.payBtn} onPress={handlePayment}>
                                            <Icon name="shield-checkmark" size={16} color="#FFF" style={{marginRight:4}} />
                                            <Text style={styles.payBtnText}>안심결제 진행</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity style={[styles.payBtn, {backgroundColor: '#333'}]} onPress={handleConfirmConstruction}>
                                            <Icon name="checkmark-circle" size={16} color="#FFF" style={{marginRight:4}} />
                                            <Text style={styles.payBtnText}>시공 확정 (무료)</Text>
                                        </TouchableOpacity>
                                    )}
                                </>
                            )}
                        </View>
                    )}

                    <Text style={[styles.timeLabel, isMe ? { textAlign: 'right' } : { textAlign: 'left' }]}>{item.time}</Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigationRef.goBack()} style={{ padding: 10 }}>
                    <Icon name="chevron-back" size={24} color="#333" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerTitle}>{partnerName}</Text>
                    {isPartnerMode && <Text style={styles.debugText}>[파트너 모드]</Text>}
                </View>
                <View style={styles.headerIcons}>
                    <TouchableOpacity onPress={() => Linking.openURL('tel:010')} style={{ padding: 10 }}><Icon name="call-outline" size={22} color="#333" /></TouchableOpacity>
                    <TouchableOpacity onPress={() => setShowHeaderMenu(!showHeaderMenu)} style={{ padding: 10 }}><Icon name="ellipsis-vertical" size={22} color="#333" /></TouchableOpacity>
                </View>
            </View>

            {showHeaderMenu && (
                <TouchableWithoutFeedback onPress={() => setShowHeaderMenu(false)}>
                    <View style={styles.menuOverlay}>
                        <View style={styles.popupMenu}>
                            <TouchableOpacity style={styles.popupItem} onPress={() => { setShowHeaderMenu(false); navigationRef.goBack(); }}>
                                <Icon name="exit-outline" size={18} color="#FF5252" />
                                <Text style={[styles.popupText, { color: '#FF5252' }]}> 나가기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            )}

            <View style={styles.topSection}>
                <View style={styles.safeBanner}><Icon name="shield-checkmark" size={12} color="#666" /><Text style={styles.safeText}> 안심번호 보호 중</Text></View>
                <ProcessBar step={step} />
            </View>

            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={item => item.id}
                renderItem={renderMessage}
                contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
            />

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <View style={styles.inputContainer}>
                    <TouchableOpacity style={styles.plusBtn} onPress={() => setShowMenu(!showMenu)}>
                        <Icon name={showMenu ? "close" : "add"} size={26} color="#555" />
                    </TouchableOpacity>
                    <TextInput style={styles.textInput} placeholder="메시지 입력" value={inputText} onChangeText={setInputText} multiline />
                    <TouchableOpacity style={styles.sendBtn} onPress={handleSendText}><Icon name="arrow-up" size={20} color="#FFF" /></TouchableOpacity>
                </View>

                {showMenu && (
                    <View style={styles.menuGrid}>
                        <TouchableOpacity style={styles.menuItem} onPress={() => handleImagePicker('gallery')}>
                            <View style={[styles.menuIconCircle, { backgroundColor: '#E3F2FD' }]}><Icon name="images" size={24} color={COLORS.primary} /></View><Text style={styles.menuLabel}>앨범</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => handleImagePicker('camera')}>
                            <View style={[styles.menuIconCircle, { backgroundColor: '#ffebee' }]}><Icon name="camera" size={24} color="#e91e63" /></View><Text style={styles.menuLabel}>카메라</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => setShowCalendar(true)}>
                            <View style={[styles.menuIconCircle, { backgroundColor: '#e8f5e9' }]}><Icon name="calendar" size={24} color="#2e7d32" /></View><Text style={styles.menuLabel}>약속잡기</Text>
                        </TouchableOpacity>
                        {isPartnerMode && (
                            <TouchableOpacity style={styles.menuItem} onPress={() => setShowEstimate(true)}>
                                <View style={[styles.menuIconCircle, { backgroundColor: '#fff3e0' }]}><Icon name="receipt" size={24} color="#ff9800" /></View><Text style={styles.menuLabel}>견적발송</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </KeyboardAvoidingView>

            <CalendarModal visible={showCalendar} onClose={() => setShowCalendar(false)} onConfirm={handleScheduleConfirm} />
            <EstimateModal visible={showEstimate} onClose={() => setShowEstimate(false)} onSend={handleEstimateSend} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 56, borderBottomWidth: 1, borderBottomColor: '#EEE', paddingRight: 8 },
    headerTitle: { fontSize: 17, fontWeight: 'bold', color: '#333' },
    headerIcons: { flexDirection: 'row' },
    debugText: { fontSize: 10, color: 'blue', textAlign: 'center' },

    menuOverlay: { position: 'absolute', top: 56, right: 10, zIndex: 999 },
    popupMenu: { backgroundColor: '#FFF', borderRadius: 8, padding: 4, elevation: 5 },
    popupItem: { flexDirection: 'row', alignItems: 'center', padding: 12, minWidth: 120 },
    popupText: { fontSize: 14, color: '#333', marginLeft: 8 },

    topSection: { backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#EEE', paddingBottom: 10 },
    safeBanner: { flexDirection: 'row', justifyContent: 'center', paddingVertical: 8, backgroundColor: '#FAFAFA' },
    safeText: { fontSize: 12, color: '#666' },
    processContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
    stepItem: { alignItems: 'center', width: 70 },
    stepCircle: { width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 4 },
    activeCircle: { backgroundColor: COLORS.primary },
    inactiveCircle: { backgroundColor: '#EEE' },
    stepNum: { fontSize: 12, fontWeight: 'bold', color: '#FFF' },
    stepLabel: { fontSize: 11 },
    activeLabel: { color: COLORS.primary, fontWeight: 'bold' },
    inactiveLabel: { color: '#AAA' },
    stepLine: { width: 30, height: 2, marginTop: 12 },
    activeLine: { backgroundColor: COLORS.primary },
    inactiveLine: { backgroundColor: '#EEE' },

    row: { flexDirection: 'row', marginBottom: 12 },
    rowMe: { justifyContent: 'flex-end' },
    rowPartner: { justifyContent: 'flex-start' },
    avatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#DDD', justifyContent: 'center', alignItems: 'center', marginRight: 8, marginTop: 4 },
    bubble: { padding: 12, borderRadius: 18, maxWidth: '100%' },
    bubbleMe: { backgroundColor: COLORS.primary, borderTopRightRadius: 2 },
    bubblePartner: { backgroundColor: '#F0F0F0', borderTopLeftRadius: 2 },
    msgText: { fontSize: 15, color: '#333', lineHeight: 20 },
    msgImage: { width: 200, height: 200, borderRadius: 12 },
    textWhite: { color: '#FFF' },
    timeLabel: { fontSize: 10, color: '#AAA', marginTop: 4, marginHorizontal: 2 },
    systemMessage: { flexDirection: 'row', alignSelf: 'center', backgroundColor: '#F5F7FA', padding: 8, borderRadius: 12, marginBottom: 12 },
    systemText: { fontSize: 12, color: '#555' },

    card: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', borderRadius: 12, padding: 16, width: 240, marginTop: 4 },
    cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    cardTitle: { fontSize: 14, fontWeight: 'bold', marginLeft: 4, color: '#333' },
    cardBigText: { fontSize: 16, fontWeight: 'bold', color: COLORS.primary, marginBottom: 2 },
    cardDesc: { fontSize: 12, color: '#888', marginVertical: 8, lineHeight: 16 },
    cardPrice: { fontSize: 20, fontWeight: 'bold', color: '#333', marginVertical: 4 },
    badge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginLeft: 'auto' },
    badgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },

    cardBtn: { backgroundColor: COLORS.primary, padding: 10, borderRadius: 8, alignItems: 'center', marginTop: 8 },
    cardBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 13 },
    payBtn: { backgroundColor: COLORS.secondary, padding: 10, borderRadius: 8, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 8 },
    payBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 13 },
    doneLabel: { textAlign: 'center', color: '#AAA', fontSize: 12, marginTop: 8 },

    inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 10, borderTopWidth: 1, borderTopColor: '#EEE', backgroundColor: '#FFF' },
    plusBtn: { padding: 10 },
    textInput: { flex: 1, backgroundColor: '#F5F5F5', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, maxHeight: 100, marginHorizontal: 8, fontSize: 15 },
    sendBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
    menuGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 20, backgroundColor: '#FFF' },
    menuItem: { alignItems: 'center', width: '25%', marginBottom: 16 },
    menuIconCircle: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
    menuLabel: { fontSize: 12, color: '#333' },

    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    calendarContainer: { backgroundColor: '#FFF', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '80%' },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    modalTitle: { fontSize: 18, fontWeight: 'bold' },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#333' },
    calendarGrid: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
    dayCell: { width: (width - 40) / 7, height: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 4 },
    dayCellSelected: { backgroundColor: COLORS.primary, borderRadius: 20 },
    dayText: { fontSize: 14, color: '#333' },
    timeChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#DDD', marginRight: 8 },
    timeChipSelected: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
    timeText: { color: '#333' },
    fullBtn: { backgroundColor: COLORS.primary, padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
    fullBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },

    estimateContainer: { backgroundColor: '#FFF', padding: 24, borderRadius: 16, width: '85%', alignSelf: 'center', marginTop: '40%' },
    subTitle: { fontSize: 13, color: '#666', marginBottom: 16 },
    inputBox: { borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 15 },
    btnRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
    cancelBtn: { flex: 1, padding: 14, backgroundColor: '#EEE', borderRadius: 8, marginRight: 8, alignItems: 'center' },
    cancelText: { color: '#333' },
    confirmBtn: { flex: 1, padding: 14, backgroundColor: COLORS.primary, borderRadius: 8, alignItems: 'center' },
    confirmText: { color: '#FFF', fontWeight: 'bold' },
});

export default ChatRoomScreen;