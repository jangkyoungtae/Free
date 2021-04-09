import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Camera from './Camera';
import MainScreen from './MainScreen';

const Stack = createStackNavigator();

export default () => {
    return (
   
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#ffffff',
                    },
                    headerTintColor: '#000000',
                    headerTitleStyle: {
                        fontFamily: 'Jalnan',
                    },
                    headerBackTitleVisible: false
                }}>
                <Stack.Screen name="MainScreen" component={MainScreen} />
                <Stack.Screen name="Camera" component={Camera} />
            </Stack.Navigator>

    );
}
