import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../domains/home/screens/HomeScreen';
import EstimateTypeScreen from '../domains/booking/screens/EstimateTypeScreen';
import BookingScreen from '../domains/booking/screens/BookingScreen';
import GeneralEstimateScreen from '../domains/estimate/screens/GeneralEstimateScreen';
import ChatListScreen from '../domains/chat/screens/ChatListScreen';
import ChatRoomScreen from '../domains/chat/screens/ChatRoomScreen';
import JobDetailScreen from '../domains/partner/screens/JobDetailScreen';
import PartnerDetailScreen from '../domains/partner/screens/PartnerDetailScreen';
import PartnerListScreen from '../domains/partner/screens/PartnerListScreen';
import ScheduleScreen from '../domains/schedule/screens/ScheduleScreen';
import PartnerReviewListScreen from '../domains/partner/screens/PartnerReviewListScreen';
import JobListScreen from '../domains/partner/screens/JobListScreen';
import GuideScreen from '../domains/home/screens/GuideScreen';
import PartnerGuideScreen from '../domains/partner/screens/PartnerGuideScreen';
import SplashScreen from '../screens/SplashScreen';

const Stack = createStackNavigator();

const AppNavigator = () => (
    <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false, gestureEnabled: false }}
      />

      {/* 🔥 Drawer 제거하고 바로 HomeScreen 연결 */}
      <Stack.Screen name="Home" component={HomeScreen} />

      {/* 나머지 화면들 */}
      <Stack.Screen name="EstimateType" component={EstimateTypeScreen} />
      <Stack.Screen name="Booking" component={BookingScreen} />
      <Stack.Screen name="GeneralEstimate" component={GeneralEstimateScreen} />
      <Stack.Screen name="ChatGuide" component={ChatListScreen} />
      <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
      <Stack.Screen name="JobDetail" component={JobDetailScreen} />
      <Stack.Screen name="PartnerDetail" component={PartnerDetailScreen} />
      <Stack.Screen name="PartnerList" component={PartnerListScreen} />
      <Stack.Screen name="Schedule" component={ScheduleScreen} />
      <Stack.Screen name="PartnerReviewList" component={PartnerReviewListScreen} />
      <Stack.Screen name="JobList" component={JobListScreen} />
      <Stack.Screen name="Guide" component={GuideScreen} />
      <Stack.Screen name="PartnerGuide" component={PartnerGuideScreen} />
    </Stack.Navigator>
);

export default AppNavigator;