// src/styles/globalStyles.ts
import { StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/theme';

export const globalStyles = StyleSheet.create({
  // 1. 레이아웃 및 컨테이너
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  mainCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24, // 더 둥글게
    padding: SPACING.xl,
    marginHorizontal: SPACING.l,
    marginVertical: SPACING.m,
    // 더 부드러운 그림자
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
  },
  // 텍스트 계층 구조
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    lineHeight: 32,
  },
  pointText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.primary, // Trust Blue
  },

  // 버튼 고도화
  actionButton: {
    backgroundColor: COLORS.secondary, // Safety Orange
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.secondary,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: { color: COLORS.white, fontSize: 18, fontWeight: 'bold' },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // 2. 텍스트 시스템
  title: {
    ...TYPOGRAPHY.title,
    color: COLORS.textPrimary,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginTop: SPACING.s,
  },
  caption: {
    ...TYPOGRAPHY.caption,
  },
  cardTitle: {
    ...TYPOGRAPHY.cardTitle,
    color: COLORS.primary, // Trust Blue
  },

  // 3. 버튼 시스템
  button: {
    padding: SPACING.m,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: COLORS.primary, // Trust Blue
  },
  kakaoButton: {
    backgroundColor: COLORS.kakao,
  },

  // 4. 카드 및 컴포넌트 박스
  card: {
    backgroundColor: COLORS.white,
    padding: SPACING.xl,
    borderRadius: 16,
    marginBottom: SPACING.m,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  premiumCard: {
    borderTopWidth: 5,
    borderTopColor: COLORS.primary, // Trust Blue 포인트
  },
  standardCard: {
    borderTopWidth: 5,
    borderTopColor: COLORS.textSecondary,
  },

  // 5. 도메인 특정 스타일
  calendarBox: {
    height: 300,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  urgentContainer: {
    marginTop: 'auto',
    padding: SPACING.l,
    backgroundColor: '#EEEEEE',
    borderRadius: 12,
    alignItems: 'center',
  },
  urgentLink: {
    color: COLORS.primary,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginTop: SPACING.s,
  },
});
