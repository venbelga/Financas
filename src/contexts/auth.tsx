import React, {createContext, useState, useEffect} from 'react';
import api from '../services/api';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
    name: string;
    id: string;
    email: string;
};

type AuthContextData = {
    user: User;
    signUp: (name: string, email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    loadingAuth: boolean;
    loading: boolean;
    signed: boolean;
    signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextData | null>(null);

export default function AuthProvider({children}: { children: React.ReactNode }) {
    const [user, setUser] = useState<User>(null as any);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    useEffect(() => {
    async function loadStorage() {
        const storageToken = await AsyncStorage.getItem('@finToken');

        if (!storageToken) return;

        try {
            const response = await api.get('/me', {
                    headers: {
                        Authorization: `Bearer ${storageToken}`,
                    },
                });

                api.defaults.headers.Authorization = `Bearer ${storageToken}`;
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                await AsyncStorage.removeItem('@finToken');
                setUser(null as any);
                setLoading(false);
            }
        }   

        setLoading(false);
        loadStorage();
    }, []);

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

    async function signIn(email: string, password: string) {
        setLoadingAuth(true);
        try{
            const response = await api.post('/login', {
                email: email,
                password: password
            });

            const {id, name, token} = response.data;

            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            await AsyncStorage.setItem('@finToken', token);

            setUser({
                id: id,
                name: name,
                email: email
            });
            setLoadingAuth(false);
        }catch(err){
            console.log('Erro ao cadastrar: ', err);
            setLoadingAuth(false);
        }
    }

    async function signOut() {
        await AsyncStorage.clear().then(() => {
            setUser(null as any);
        });
    }

    return (
        <AuthContext.Provider value={{ user, signUp, signIn, loadingAuth, loading, signed: !!user, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}


