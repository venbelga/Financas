import React, {useState, useContext} from 'react';
import {ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../contexts/auth';
import { 
    Background, 
    Container, 
    Logo, 
    AreaInput, 
    Input, 
    SubmitButton, 
    SubmitText,
    Link,
    LinkText  
} from './styles';

export default function SignIn(){
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useContext(AuthContext);

    if(!auth){
        return null;
    }

    const { signIn, loadingAuth } = auth;

    function handleLogin(){
        signIn(email, password);
    }

    return(    
        <Background>
            <Container behavior={'padding'} enabled>
                <Logo source={require('../../assets/Logo.png')} />

                <AreaInput>
                    <Input 
                        placeholder="Seu email" 
                        value={email}
                        onChangeText={setEmail}
                    />
                </AreaInput>
                <AreaInput>
                    <Input 
                        placeholder="Sua senha" 
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </AreaInput>
                <SubmitButton activeOpacity={0.8} onPress={handleLogin}>
                    {loadingAuth ? 
                        <ActivityIndicator size={20} color="#FFF" /> : 
                        (<SubmitText>Acessar</SubmitText>)
                    }
                </SubmitButton>
                <Link onPress={ () => navigation.navigate('SignUp' as never)}>
                    <LinkText>Criar uma conta</LinkText>
                </Link>
            </Container>
        </Background>
    )
}
