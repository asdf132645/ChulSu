import React, { createContext, useContext, useState } from 'react';

interface UserContextType {
    isPartnerMode: boolean;
    toggleUserMode: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within a UserProvider');
    return context;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [isPartnerMode, setIsPartnerMode] = useState(false); // 기본값: 고객 모드

    const toggleUserMode = () => {
        setIsPartnerMode(prev => !prev);
    };

    return (
        <UserContext.Provider value={{ isPartnerMode, toggleUserMode }}>
            {children}
        </UserContext.Provider>
    );
};