import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, SPACING } from '../../../constants/theme';
import { navigationRef } from '../../../navigation/RootNavigation';

const ChatRoomScreen = ({ route }: any) => {
    const { partnerName } = route.params || { partnerName: '상담원' };

    return (
        <SafeAreaView style={styles.container}>
            {/* 채팅 헤더 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigationRef.goBack()}>
                    <Icon name="chevron-back" size={26} color={COLORS.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{partnerName}</Text>
                <Icon name="ellipsis-vertical" size={24} color={COLORS.textPrimary} />
            </View>

            {/* 안심번호 안내 [cite: 579] */}
            <View style={styles.safeNotice}>
                <Icon name="shield-checkmark" size={14} color={COLORS.textSecondary} />
                <Text style={styles.safeText}> 안심번호로 보호됩니다.</Text>
            </View>

            <ScrollView contentContainerStyle={{ padding: SPACING.m }}>
                {/* 상대방 말풍선 (견적서) [cite: 574] */}
                <View style={styles.bubbleLeft}>
                    <Text style={styles.bubbleText}>안녕하세요, 고객님.{"\n"}요청하신 견적서 보내드립니다.</Text>
                    <View style={styles.estimateAttachment}>
                        <Icon name="document-text-outline" size={24} color={COLORS.primary} />
                        <Text style={styles.attachText}>상세 견적서.pdf</Text>
                    </View>
                </View>
                <Text style={styles.timeTextLeft}>오전 10:30</Text>

                {/* 내 말풍선 [cite: 576] */}
                <View style={styles.bubbleRight}>
                    <Text style={[styles.bubbleText, { color: '#FFF' }]}>네, 확인했습니다. 감사합니다.</Text>
                </View>
                <Text style={styles.timeTextRight}>오전 10:32</Text>
            </ScrollView>

            {/* 입력창 */}
            <View style={styles.inputArea}>
                <TouchableOpacity style={styles.plusBtn}>
                    <Icon name="add" size={24} color={COLORS.textSecondary} />
                </TouchableOpacity>
                <TextInput style={styles.input} placeholder="메시지를 입력하세요" />
                <TouchableOpacity style={styles.sendBtn}>
                    <Icon name="arrow-up" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
    headerTitle: { fontSize: 18, fontWeight: 'bold' },

    safeNotice: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5', padding: 8 },
    safeText: { fontSize: 12, color: COLORS.textSecondary, marginLeft: 4 },

    bubbleLeft: { alignSelf: 'flex-start', backgroundColor: '#F0F0F0', borderRadius: 12, borderTopLeftRadius: 2, padding: 12, maxWidth: '75%' },
    bubbleRight: { alignSelf: 'flex-end', backgroundColor: COLORS.primary, borderRadius: 12, borderTopRightRadius: 2, padding: 12, maxWidth: '75%', marginTop: 16 },
    bubbleText: { fontSize: 15, lineHeight: 22, color: COLORS.textPrimary },

    estimateAttachment: { flexDirection: 'row', alignItems: 'center', marginTop: 10, backgroundColor: '#FFF', padding: 10, borderRadius: 8 },
    attachText: { marginLeft: 8, fontSize: 13, color: COLORS.textPrimary, fontWeight: '500' },

    timeTextLeft: { fontSize: 11, color: COLORS.textSecondary, marginTop: 4, marginLeft: 4 },
    timeTextRight: { alignSelf: 'flex-end', fontSize: 11, color: COLORS.textSecondary, marginTop: 4, marginRight: 4 },

    inputArea: { flexDirection: 'row', alignItems: 'center', padding: 10, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
    plusBtn: { padding: 10 },
    input: { flex: 1, backgroundColor: '#F5F5F5', borderRadius: 20, paddingHorizontal: 16, height: 40, marginHorizontal: 8 },
    sendBtn: { backgroundColor: COLORS.primary, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }
});

export default ChatRoomScreen;