import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { navigationRef } from '../../navigation/RootNavigation';
import { COLORS, SPACING } from '../../constants/theme';

const Header = () => {
    const [routeName, setRouteName] = useState('Home');
    useEffect(() => {
        const unsubscribe = navigationRef.addListener('state', () => {
            const currentRoute = navigationRef.getCurrentRoute();
            if (currentRoute) setRouteName(currentRoute.name);
        });
        return unsubscribe;
    }, []);

    const isHome = routeName === 'Home';

    return (
        <View style={styles.headerContainer}>
            <View style={styles.topBar}>
                <View style={styles.sideArea}>
                    {isHome ? (
                        <TouchableOpacity style={styles.menuBtn}>
                            <View style={styles.lineLong} />
                            <View style={styles.lineMedium} />
                            <View style={styles.lineShort} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => navigationRef.goBack()}>
                            <Icon name="chevron-back" size={26} color={COLORS.textPrimary} />
                        </TouchableOpacity>
                    )}
                </View>
                <Text style={styles.logoText}>CHUL-SU</Text>
                <View style={styles.sideArea}><Icon name="notifications-outline" size={24} color={COLORS.textPrimary} /></View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: { backgroundColor: COLORS.white, paddingHorizontal: SPACING.l, borderBottomWidth: 1, borderBottomColor: '#F2F2F2' },
    topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 56 },
    sideArea: { width: 40 },
    logoText: { fontSize: 18, fontWeight: '900', color: COLORS.primary },
    menuBtn: { width: 30, height: 40, justifyContent: 'center' },
    lineLong: { width: 22, height: 2.2, backgroundColor: COLORS.textPrimary, borderRadius: 2, marginBottom: 4 },
    lineMedium: { width: 16, height: 2.2, backgroundColor: COLORS.textPrimary, borderRadius: 2, marginBottom: 4 },
    lineShort: { width: 10, height: 2.2, backgroundColor: COLORS.textPrimary, borderRadius: 2 }
});

export default Header;