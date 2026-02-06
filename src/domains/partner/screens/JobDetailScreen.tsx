import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, SafeAreaView, Alert } from 'react-native'; // Alert 추가
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, SPACING } from '../../../constants/theme';
import { navigationRef } from '../../../navigation/RootNavigation';

const JobDetailScreen = ({ route }: any) => {
    const { job } = route.params || {
        job: { title: '정보 없음', location: '-', price: '0', img: 'https://via.placeholder.com/150' }
    };

    const handleApply = () => {
        // 🚨 수정됨: alert() -> Alert.alert()
        Alert.alert("지원 완료", "성공적으로 지원되었습니다.\n담당자가 곧 연락드릴 예정입니다.", [
            { text: "확인", onPress: () => navigationRef.goBack() }
        ]);
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

                    <Text style={styles.sectionTitle}>상세 정보</Text>
                    <Text style={styles.desc}>
                        30평 규모의 상가 원상복구 현장입니다.{"\n"}
                        천장 텍스 제거 및 바닥 데코타일 철거 포함입니다.{"\n"}
                        폐기물 처리는 별도 협의 가능합니다.
                    </Text>
                </View>
            </ScrollView>

            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
                    <Text style={styles.applyText}>지금 지원하기</Text>
                </TouchableOpacity>
            </View>
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
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
    desc: { fontSize: 15, color: '#555', lineHeight: 24 },
    bottomBar: { position: 'absolute', bottom: 0, width: '100%', padding: 20, backgroundColor: '#FFF', borderTopWidth: 1, borderColor: '#EEE' },
    applyBtn: { backgroundColor: COLORS.primary, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
    applyText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});

export default JobDetailScreen;