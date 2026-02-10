import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../constants/theme';

interface Review {
    id: number;
    user: string;
    rating: number;
    date: string;
    content: string;
}

interface PartnerReviewsProps {
    reviews: Review[];
    totalCount: number;
    onPressAll?: () => void;
}

const PartnerReviews = ({ reviews, totalCount, onPressAll }: PartnerReviewsProps) => {
    return (
        <View style={styles.container}>
            {/* 리뷰 헤더 */}
            <View style={styles.header}>
                <Text style={styles.title}>
                    ⭐ 고객 후기 <Text style={{ color: COLORS.primary }}>{totalCount}</Text>
                </Text>
                <TouchableOpacity onPress={onPressAll}>
                    <Text style={styles.viewAllText}>전체보기</Text>
                </TouchableOpacity>
            </View>

            {/* 리뷰 리스트 */}
            {reviews.map((review) => (
                <View key={review.id} style={styles.card}>
                    <View style={styles.topRow}>
                        <View style={styles.userInfo}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>{review.user[0]}</Text>
                            </View>
                            <View>
                                <Text style={styles.userName}>{review.user}</Text>
                                <View style={styles.stars}>
                                    {[...Array(5)].map((_, i) => (
                                        <Icon
                                            key={i}
                                            name="star"
                                            size={12}
                                            color={i < review.rating ? "#FFD600" : "#EEE"}
                                        />
                                    ))}
                                </View>
                            </View>
                        </View>
                        <Text style={styles.date}>{review.date}</Text>
                    </View>
                    <Text style={styles.content}>{review.content}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { backgroundColor: '#FFF', padding: 24, marginBottom: 12 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    title: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    viewAllText: { color: '#999', fontSize: 13 },

    card: { marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#F5F5F5', paddingBottom: 20 },
    topRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    userInfo: { flexDirection: 'row', alignItems: 'center' },
    avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
    avatarText: { fontWeight: 'bold', color: '#AAA' },
    userName: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 2 },
    stars: { flexDirection: 'row' },
    date: { fontSize: 12, color: '#999' },
    content: { fontSize: 14, color: '#444', lineHeight: 20 }
});

export default PartnerReviews;