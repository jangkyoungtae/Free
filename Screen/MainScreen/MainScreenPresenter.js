
import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';



export default () => {
    const [contents, setContents] = useState("내용없음");
    const navigation = useNavigation();

    const onPlaceChosen = (params) => {
        setContents(params);
    }
    const goCamera = () => {

        navigation.navigate('Camera', {
            onPlaceChosen
        })
    }
    const onChangeText = (params) => {
        setContents(params);
    }
    return (
        <View>
            <TextInput value={contents}
                onChangeText={onChangeText}/>
            
            <TouchableOpacity
                onPress={goCamera}
               >
                <Text>카메라로 이동</Text>
                
            </TouchableOpacity>
        </View>
    )
}