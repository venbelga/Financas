import React, {useState} from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { Calendar,  LocaleConfig} from "react-native-calendars";

import { 
    Container, 
    ButtonFilterText,
    ModalContent,
    ButtonFilter 
} from "./styles";




export default function CalendarModal({setVisible, handleFilter}: {setVisible: any, handleFilter: any}){
    const [dateNow, setDateNow] = useState(new Date());
    const [markedDates, setMarkedDates] = useState({});

    function handleOnDayPress(date: any){
        setDateNow(new Date(date.dateString));

        let markedDay = {
            selected: true,
            selectedColor: '#3b3dbf',
            textColor: '#fff'
        }

        setMarkedDates(markedDay)
    }

    function handleFilterDate(){
        handleFilter(dateNow);
        setVisible();
    }

    return(
        <Container>
            <TouchableWithoutFeedback onPress={setVisible}>
                <View style={{flex: 1}}></View>
            </TouchableWithoutFeedback>

            <ModalContent>
                <Calendar 
                    onDayPress={handleOnDayPress}
                    markedDates={markedDates}
                    enableSwipeMonths={true}
                    theme={{
                        todayTextColor: '#ff0000',
                        selectedDayBackgroundColor: '#00adf5',
                        selectedDayTextColor: '#fff'
                    }}
                />

                <ButtonFilter onPress={handleFilterDate}>
                    <ButtonFilterText>Filtrar</ButtonFilterText>
                </ButtonFilter>                
            </ModalContent>
        </Container>
    )
}