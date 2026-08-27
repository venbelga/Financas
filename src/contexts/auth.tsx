import React, {createContext, useState} from 'react';
import api from '../services/api';
import {useNavigation} from '@react-navigation/native';

type User = {
    nome: string;
};

type AuthContextData = {
    user: User;
    signUp: (nome: string, email: string, password: string) => Promise<void>;
    loadingAuth: boolean;
};

export const AuthContext = createContext<AuthContextData | null>(null);

export default function AuthProvider({children}: { children: React.ReactNode }) {
    const [user, setUser] = useState<User>(null as any);
    const [loadingAuth, setLoadingAuth] = useState(false);

    const navigation = useNavigation();

    async function signUp(nome: string, email: string, password: string) {
        setLoadingAuth(true);
        try{
            const response = await api.post('/users', {
                name: nome,
                email: email,
                password: password
            });
            setLoadingAuth(false);
            navigation.goBack();
        }catch(err){
            console.log('Erro ao cadastrar: ', err);
            setLoadingAuth(false);
        }
    }

    return (
        <AuthContext.Provider value={{ user, signUp, loadingAuth }}>
            {children}
        </AuthContext.Provider>
    );
}


