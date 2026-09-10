import React, {useContext} from 'react';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import {AuthContext} from '../contexts/auth';

export default function Routes(){
    const loading = false;

    const auth = useContext(AuthContext);

    if (!auth) {
        return null;
    }
    
    const { signed } = auth;

    return(
        signed ? <AppRoutes /> : <AuthRoutes />
    );
}