import React, {useContext} from 'react';
import Header from '../../components/Header';
import { AuthContext } from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';

import {
    Container,
    Message,
    Name,
    NewLink,
    NewText,
    LogoutButton,
    LogoutText
} from './styles';

export default function Profile(){
    const navigation = useNavigation();
    const authContext = useContext(AuthContext);

    if(!authContext){
        return null
    }

    const {user, signOut} = authContext;

    return(
        <Container>
            <Header title='Meu Perfil' />

            <Message>Hey, bem vindo de volta!</Message>

            <Name numberOfLines={1}>
                {user.name}
            </Name>

            <NewLink onPress={() => navigation.navigate('Registrar' as never)}>
                <NewText>Fazer registro</NewText>
            </NewLink>

            <LogoutButton onPress={() => signOut()}>
                <LogoutText>Sair</LogoutText>
            </LogoutButton>
        </Container>
    )
}