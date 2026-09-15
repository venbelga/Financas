import React, {useEffect, useState}  from 'react';
import Header from '../../components/Header';
import api from '../../services/api';
import {format} from 'date-fns';
import {useIsFocused} from '@react-navigation/native';
import BalanceItem from '../../components/BalanceItem';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HistoricoList from '../../components/HistoricoList';

import {
  Background, 
  ListBalance,
  Area,
  Title,
  List
} from './styles';

export default function Home() {
  const [listBalance, setListBalance] = useState([]);
  const [dateMovements, setDateMovements] = useState(new Date());
  const isFocused = useIsFocused();
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    let isActive = true;

    async function getMovements() {
      let dateFormated = format(dateMovements, 'dd/MM/yyyy');

      const receives = await api.get('/receives', {
        params: {
          date: dateFormated
        }
      })

      const balance = await api.get(`/balance`, {
        params: {
          date: dateFormated,
        },
      });

      if (isActive) {
        setListBalance(balance.data);
        setMovements(receives.data);
      }
    }

    getMovements();

   return () => {
      isActive = false;
    } 
  }, [isFocused]);

  return (
    <Background>
      <Header title="Minhas movimentações"/>
      <ListBalance
        data={listBalance}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <BalanceItem data={item} />
        )}
      />

      <Area>
        <TouchableOpacity>
          <Icon name='event' color='#121212' size={30} />
        </TouchableOpacity>
        <Title>Últimas movimentações</Title>
      </Area>

      <List
        data={movements}
        renderItem={({item}) => <HistoricoList data={item}/>}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}
      />
    </Background>
  );
}
   