import React, {useEffect, useState}  from 'react';
import Header from '../../components/Header';
import api from '../../services/api';
import {format} from 'date-fns';
import {useIsFocused} from '@react-navigation/native';
import BalanceItem from '../../components/BalanceItem';
import { TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HistoricoList from '../../components/HistoricoList';
import CalendarModal from '../../components/CalendarModal';

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
  const [modalVisible, setModalVisible] = useState(false);

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
  }, [isFocused, dateMovements]);

  async function handleDelete(id: string){
    try{
      await api.delete('/receives/delete', {
        params: {
          item_id: id
        }
      })

      setDateMovements(new Date())
    }catch(err){
      console.log(err);
    }
  }

  function filterDateMovement(dateSelected: any){
    setDateMovements(dateSelected);
  }

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
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name='event' color='#121212' size={30} />
        </TouchableOpacity>
        <Title>Últimas movimentações</Title>
      </Area>

      <List
        data={movements}
        renderItem={({item}) => <HistoricoList data={item} deleteItem={handleDelete}/>}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}
      />

      <Modal visible={modalVisible} animationType='fade' transparent={true}>
        <CalendarModal 
          setVisible={() => setModalVisible(false)}
          handleFilter={filterDateMovement}
        />
      </Modal>
    </Background>
  );
}
   