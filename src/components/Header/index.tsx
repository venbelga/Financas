import React from 'react';
import { Container, Title, ButtonMenu } from './styles';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

export default function Header({title}: {title: string}) {
    const navigation = useNavigation<DrawerNavigationProp<Record<string, undefined>>>();

    return(
        <Container>
            <ButtonMenu onPress={() => navigation.openDrawer()}>
                <Icon name="menu" size={35} color="#121212" />
            </ButtonMenu>

            <Title>{title}</Title>
        </Container>
    )
}