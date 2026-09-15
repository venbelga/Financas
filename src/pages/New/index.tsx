import React, {useState} from 'react';
import { Background, Input, SubmitText, SubmitButton } from './styles';
import Header from '../../components/Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import { TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';  
import RegisterType from '../../components/RegisterType';
import api from '../../services/api';
import {format} from 'date-fns';
import { useNavigation } from '@react-navigation/native';

export default function New() {
    const [labelInput, setLabelInput] = useState('');
    const [valueInput, setValueInput] = useState('');
    const [type, setType] = useState('receita');
    const navigation = useNavigation();

    function handleSubmit(){
        Keyboard.dismiss();

        if(isNaN(parseFloat(valueInput)) || type === null){
            Alert.alert('Preencha todos os campos!');
            return;
        }

        Alert.alert(
            'Confirmando dados',
            `Tipo: ${type} - Valor: ${parseFloat(valueInput)} - Descrição: ${labelInput}`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Continuar',
                    onPress: () => handleAdd()
                }
            ]
        )
    }

    async function handleAdd(){
        Keyboard.dismiss();

        await api.post('/receive', {
            type: type,
            value: Number(valueInput),
            description: labelInput,
            date: format(new Date(), 'dd/MM/yyyy')
        });

        setLabelInput('');
        setValueInput('');
        setType('receita');
        navigation.navigate('Home' as never);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Background>
                <Header title="Registrando"/>

                <SafeAreaView style={{marginTop: 14, alignItems: 'center'}}>
                    <Input 
                        placeholder="Descrição desse registro" 
                        value={labelInput} 
                        onChangeText={setLabelInput}
                    />

                    <Input 
                        placeholder="Valor desejado" 
                        keyboardType="numeric" value={valueInput} 
                        onChangeText={setValueInput}
                    />
                    <RegisterType 
                        type={type} 
                        sendTypeChanged={(item: string) => setType(item)}
                    />

                    <SubmitButton onPress={handleSubmit}>
                        <SubmitText>Registrar</SubmitText>
                    </SubmitButton>
                </SafeAreaView>
            </Background>
        </TouchableWithoutFeedback>
    );
}