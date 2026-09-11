import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../pages/Home';

const AppDrawer = createDrawerNavigator();

export default function AppRoutes() {
    return(
        <AppDrawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    backgroundColor: '#fff',
                    padding: 20,
                },
                drawerActiveBackgroundColor: '#3b3dbf',
                drawerActiveTintColor: '#fff',

                drawerInactiveBackgroundColor: '#f0f2ff',
                drawerInactiveTintColor: '#121212',

            }}
        >
            <AppDrawer.Screen 
                name="Home" 
                component={Home} 
            />
        </AppDrawer.Navigator>
    )
}