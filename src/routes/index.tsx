import React, {useContext} from 'react';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import {AuthContext} from '../contexts/auth';
import {View, ActivityIndicator} from 'react-native';

export default function Routes(){
    const auth = useContext(AuthContext);

    if (!auth) {
        return null;
    }
    
    const { signed, loading } = auth;

    if(loading){
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4ff'}} >
                <ActivityIndicator size="large" color="#131313" />
            </View>
        )
    }

    return(
        signed ? <AppRoutes /> : <AuthRoutes />
    );
}