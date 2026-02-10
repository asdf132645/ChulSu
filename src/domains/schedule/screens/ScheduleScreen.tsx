import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, SPACING } from '../../../constants/theme';
import { navigationRef } from '../../../navigation/RootNavigation';

// 캘린더 한국어 설정
LocaleConfig.locales['kr'] = {
    monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
    monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
    dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
    dayNamesShort: ['일','월','화','수','목','금','토'],
    today: '오늘'
};
LocaleConfig.defaultLocale = 'kr';

const ScheduleScreen = () => {
    const [selectedDate, setSelectedDate] = useState('2024-04-15');

    // 더미 데이터 (날짜별 일정)
    const schedules: any = {
        '2024-04-15': [
            { id: 1, type: 'visit', title: '강남구 역삼동 상가 실측', time: '14:00', status: '방문 예정' },
            { id: 2, type: 'construct', title: '서초동 오피스 철거 시작', time: '09:00', status: '공사 시작' }
        ],
        '2024-04-20': [
            { id: 3, type: 'construct', title: '마포구 카페 폐업 정리', time: '10:00', status: '공사 중' }
        ]
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* 헤더 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigationRef.goBack()}>
                    <Icon name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>견적 일정 관리</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView>
                {/* 캘린더 */}
                <View style={styles.calendarWrapper}>
                    <Calendar
                        current={selectedDate}
                        onDayPress={(day: any) => setSelectedDate(day.dateString)}
                        markedDates={{
                            '2024-04-15': { marked: true, dotColor: COLORS.primary },
                            '2024-04-20': { marked: true, dotColor: '#FF6F00' },
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

                {/* 선택한 날짜의 일정 리스트 */}
                <View style={styles.scheduleList}>
                    <Text style={styles.dateTitle}>{selectedDate} 일정</Text>

                    {schedules[selectedDate] ? (
                        schedules[selectedDate].map((item: any) => (
                            <View key={item.id} style={styles.card}>
                                <View style={[styles.bar, { backgroundColor: item.type === 'visit' ? COLORS.primary : '#FF6F00' }]} />
                                <View style={styles.cardContent}>
                                    <View style={styles.row}>
                                        <Text style={[styles.badge, { color: item.type === 'visit' ? COLORS.primary : '#FF6F00' }]}>
                                            {item.type === 'visit' ? '방문 실측' : '공사 일정'}
                                        </Text>
                                        <Text style={styles.time}>{item.time}</Text>
                                    </View>
                                    <Text style={styles.cardTitle}>{item.title}</Text>
                                    <Text style={styles.status}>{item.status}</Text>
                                </View>
                            </View>
                        ))
                    ) : (
                        <View style={styles.emptyBox}>
                            <Text style={styles.emptyText}>일정이 없습니다.</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#FFF' },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },

    calendarWrapper: { backgroundColor: '#FFF', paddingBottom: 20, marginBottom: 16, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, elevation: 4 },

    scheduleList: { padding: 24 },
    dateTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 16 },

    card: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 12, marginBottom: 12, overflow: 'hidden', elevation: 2 },
    bar: { width: 6, height: '100%' },
    cardContent: { flex: 1, padding: 16 },
    row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
    badge: { fontSize: 12, fontWeight: 'bold' },
    time: { fontSize: 12, color: '#999' },
    cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 4 },
    status: { fontSize: 13, color: '#666' },

    emptyBox: { alignItems: 'center', padding: 40 },
    emptyText: { color: '#999', fontSize: 14 }
});

export default ScheduleScreen;