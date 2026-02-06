import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../domains/home/screens/HomeScreen';
import EstimateTypeScreen from '../domains/booking/screens/EstimateTypeScreen';
import BookingScreen from '../domains/booking/screens/BookingScreen';
import GeneralEstimateScreen from '../domains/estimate/screens/GeneralEstimateScreen';
import ChatListScreen from '../domains/chat/screens/ChatListScreen';
import ChatRoomScreen from '../domains/chat/screens/ChatRoomScreen';
import JobDetailScreen from '../domains/partner/screens/JobDetailScreen'; // 신규 추가
import PartnerDetailScreen from '../domains/partner/screens/PartnerDetailScreen'; // 신규 추가

const Stack = createStackNavigator();

const AppNavigator = () => (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />

        {/* 견적 신청 관련 (사용자용) */}
        <Stack.Screen name="EstimateType" component={EstimateTypeScreen} />
        <Stack.Screen name="Booking" component={BookingScreen} />
        <Stack.Screen name="GeneralEstimate" component={GeneralEstimateScreen} />

        {/* 채팅/메시지 */}
        <Stack.Screen name="ChatGuide" component={ChatListScreen} />
        <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />

        {/* 파트너용 일감 상세 (신규) */}
        <Stack.Screen name="JobDetail" component={JobDetailScreen} />
        <Stack.Screen name="PartnerDetail" component={PartnerDetailScreen} />
    </Stack.Navigator>
);

export default AppNavigator;