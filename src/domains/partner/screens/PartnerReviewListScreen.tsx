import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, SPACING } from '../../../constants/theme';
import { navigationRef } from '../../../navigation/RootNavigation';

// 더미 데이터 (전체 리뷰 - 수량을 좀 늘렸습니다)
const FULL_REVIEWS = [
    { id: 1, user: '김*민', rating: 5, date: '2024.04.10', content: '사장님이 정말 친절하시고 시간 약속도 칼같이 지키십니다. 뒷정리까지 깔끔해서 놀랐어요!' },
    { id: 2, user: '이*수', rating: 5, date: '2024.04.08', content: '견적도 합리적이고 추가 비용 요구도 없어서 너무 좋았습니다. 강추합니다.' },
    { id: 3, user: '박*영', rating: 4, date: '2024.03.25', content: '작업 속도가 빠르시네요. 상담도 꼼꼼하게 해주셔서 믿고 맡겼습니다.' },
    { id: 4, user: '최*호', rating: 5, date: '2024.03.20', content: '다른 곳보다 저렴하게 했는데 퀄리티는 훨씬 좋습니다. 번창하세요!' },
    { id: 5, user: '정*미', rating: 5, date: '2024.03.15', content: '지인 소개로 알게 되었는데 역시 명불허전이네요. 깔끔한 시공 감사합니다.' },
    { id: 6, user: '강*우', rating: 4, date: '2024.03.10', content: '약간의 소음은 있었지만 미리 공지해주셔서 괜찮았습니다. 결과물은 만족합니다.' },
    { id: 7, user: '임*자', rating: 5, date: '2024.03.01', content: '사장님 인상이 너무 좋으세요. 믿고 맡길 수 있는 업체입니다.' },
];

const PartnerReviewListScreen = ({ route }: any) => {
    // 파트너 정보 받아오기 (헤더에 이름 표시용)
    const { partnerName } = route.params || { partnerName: '파트너' };

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.reviewCard}>
            <View style={styles.reviewTop}>
                <View style={styles.userInfo}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{item.user[0]}</Text>
                    </View>
                    <View>
                        <Text style={styles.userName}>{item.user}</Text>
                        <View style={styles.stars}>
                            {[...Array(5)].map((_, i) => (
                                <Icon key={i} name="star" size={12} color={i < item.rating ? "#FFD600" : "#EEE"} />
                            ))}
                        </View>
                    </View>
                </View>
                <Text style={styles.date}>{item.date}</Text>
            </View>
            <Text style={styles.content}>{item.content}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* 헤더 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigationRef.goBack()}>
                    <Icon name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{partnerName}님 후기</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* 리뷰 리스트 */}
            <FlatList
                data={FULL_REVIEWS}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContent}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#EEE' },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    listContent: { padding: SPACING.m },

    reviewCard: { backgroundColor: '#FFF', padding: 20, marginBottom: 12, borderRadius: 16, elevation: 1 },
    reviewTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
    userInfo: { flexDirection: 'row', alignItems: 'center' },
    avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    avatarText: { fontWeight: 'bold', color: '#AAA', fontSize: 16 },
    userName: { fontSize: 15, fontWeight: 'bold', color: '#333', marginBottom: 2 },
    stars: { flexDirection: 'row' },
    date: { fontSize: 13, color: '#999' },
    content: { fontSize: 15, color: '#444', lineHeight: 22 }
});

export default PartnerReviewListScreen;