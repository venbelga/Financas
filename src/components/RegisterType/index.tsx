import React, {useState} from 'react';
import { RegisterContainer, RegisterButton, RegisterLabel } from './styles';
import Feather from 'react-native-vector-icons/Feather';


type Props = {
    type: string;
    sendTypeChanged: (newType: string) => void;
};

export default function RegisterType({ type, sendTypeChanged }: Props) {
   
    const [typeChecked, setTypeChecked] = useState(type);

    function changeType(name: string) {        
        setTypeChecked(name);
        sendTypeChanged(name);
    }
    
    return (
        <RegisterContainer>
            <RegisterButton 
                checked={typeChecked === 'receita' ? true : false}
                onPress={() => changeType('receita')}
            >
                <Feather 
                    name="arrow-up" 
                    size={24} 
                    color='#121212' 
                />
                <RegisterLabel>Receita</RegisterLabel>
            </RegisterButton>

            <RegisterButton 
                checked={typeChecked === 'despesa' ? true : false}
                onPress={() => changeType('despesa')}
            >
                <Feather 
                    name="arrow-down" 
                    size={24} 
                    color='#121212' 
                />
                <RegisterLabel>Despesa</RegisterLabel>
            </RegisterButton>
        </RegisterContainer>
    );
}