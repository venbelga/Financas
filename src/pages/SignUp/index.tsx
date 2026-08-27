import React, {useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {
    Background,
    Container,
    AreaInput,
    Input,
    SubmitButton,
    SubmitText
} from '../SignIn/styles';
import {AuthContext} from '../../contexts/auth';

export default function SignUp() {
    const auth = React.useContext(AuthContext);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if (!auth) {
        return null;
    }

    const { user, loadingAuth, signUp } = auth;

    function handleSignUp() {
        if(nome === '' || email === '' || password === ''){
            return;
        }
        signUp(nome, email, password);
    }

    return (
        <Background>
            <Container behavior={'padding'} enabled>
                <AreaInput>
                    <Input 
                        placeholder="Nome" 
                        value={nome} 
                        onChangeText={setNome} 
                    />
                </AreaInput>
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

                <SubmitButton onPress={handleSignUp}>
                    {loadingAuth ? (
                        <ActivityIndicator size={20} color="#FFF" />
                    ) : (
                        <SubmitText>Cadastrar</SubmitText>
                    )}
                </SubmitButton>
            </Container>
        </Background>
    );
}
