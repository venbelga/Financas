import React, {useContext} from "react";
import { View, Text, Image } from "react-native";
import { DrawerItemList, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { AuthContext } from "../../contexts/auth";

export default function CustomDrawer(props: any){
    const auth = useContext(AuthContext)

    if(!auth){
        return null
    }

    const {user, signOut} = auth;

    return(
        <DrawerContentScrollView {...props}>
            <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 25}}>
                <Image 
                    source={require('../../assets/Logo.png')} 
                    style={{width: 90, height: 90}}
                    resizeMode="contain"
                />
            

                <Text style={{fontSize: 18, marginTop: 14}}>
                    Bem-vindo
                </Text>

                <Text numberOfLines={1} style={{fontSize: 17, fontWeight: 'bold', marginBottom: 25, paddingHorizontal: 20}}>
                    {user.name}
                </Text>
            </View>

            <DrawerItemList {...props} />

            <DrawerItem 
                {...props}
                label="Sair"
                onPress={() => signOut()}
            />
        </DrawerContentScrollView>
    )
}