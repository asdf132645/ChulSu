// src/constants/theme.ts
export const COLORS = {
    // 주조색: 전문성과 신뢰 (삼성, 토스 스타일)
    primary: '#1565C0',

    // 보조색: 안전 및 핵심 액션 (안전 조끼, 경고, CTA)
    secondary: '#FF6F00',

    // 상태색
    success: '#2E7D32', // 완료, 인증
    error: '#D32F2F',   // 하자, 반려, 위험

    // 무채색 및 배경
    background: '#F5F5F5',
    white: '#ffffff',
    textPrimary: '#212121',
    textSecondary: '#757575',
    border: '#E0E0E0',

    // 기존 카카오 컬러는 유지 (상담용)
    kakao: '#FEE500',
};

export const SPACING = {
    xs: 4, s: 8, m: 16, l: 20, xl: 24, xxl: 40,
};

export const TYPOGRAPHY = {
    title: { fontSize: 28, fontWeight: 'bold' as const },
    cardTitle: { fontSize: 18, fontWeight: 'bold' as const },
    body: { fontSize: 16, lineHeight: 24 },
    caption: { fontSize: 14, fontWeight: '400' as const },
};