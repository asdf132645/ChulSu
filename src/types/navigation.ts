// src/types/navigation.ts
export type RootStackParamList = {
    Home: undefined;          // 홈 화면
    Booking: undefined;       // 안심견적 예약 (날짜 선택)
    ChatGuide: undefined;     // 일반견적 채팅 안내
    Payment: { amount: number }; // 결제 화면 (금액 전달 예시)
    History: undefined;       // 내 견적 현황 (타임라인)
};