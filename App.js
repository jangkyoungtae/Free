import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import Stack from './Navigation/Stack';


export default () => {
  return (
    <>
      <NavigationContainer>
        <Stack />
      </NavigationContainer>
      <StatusBar barStyle="light-content" />
    </>
  );
}
