import React, { useState } from 'react';
import { Dimensions, Image, ToastAndroid } from 'react-native';
import { RNCamera } from 'react-native-camera';
import styled from 'styled-components/native';
import { save } from '@react-native-community/cameraroll';
import ImageResizer from 'react-native-image-resizer';
import { useNavigation } from '@react-navigation/core';


const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const View = styled.View`
  background-color:black;
  z-index: 3;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Button = styled.View`
  width: 70px;
  height: 70px;
  border-radius: 50px;
  border: 5px solid black;
  background-color: red;
`;

const Touchable = styled.TouchableOpacity`
    
`;



export default function Camera({ route }) {
    const navigation = useNavigation();
   
    
    const cameraRef = React.useRef(null); // useRef로 camera를 위한 ref를 하나 만들어주고
    

    const takePhoto = async () => {
        // console.log('cameraRef', cameraRef);
        if (cameraRef) {
            const data = await cameraRef.current.takePictureAsync({
                quality: 1,
                exif: true,
            });
            if (data) {
            
                save(data.uri, 'photo').then(onfulfilled => {


                    //console.log('🐤result', data.uri);
                    ToastAndroid.show(onfulfilled, ToastAndroid.SHORT);
                }).catch(error => {
                    ToastAndroid.show(`${error.message}`, ToastAndroid.SHORT);
                });

            }
           // await OCR_Text(navigation, route, data.uri);
            navigation.navigate('MainScreen', {
                res: data.uri,
            });
            //const localFile = data.uri;
            // const asd = await MLKit(localFile);

        }
    };

    return (
        <>

            <RNCamera
                ref={cameraRef}
                style={{
                    width: WIDTH,
                    height: HEIGHT - 200,
                    zIndex: 1,
                }}
                ratio={'2:2'}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                androidRecordAudioPermissionOptions={{
                    title: 'Permission to use audio recording',
                    message: 'We need your permission to use your audio',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                captureAudio={false} />
            <View
                style={{
                    width: WIDTH,
                    height: HEIGHT - 200,
                    zIndex: 1,
                    backgroundColor: '#2e2e2e'
                }}>
                <Touchable onPress={takePhoto}>
                    <Button />
                </Touchable>
            </View>
            
        </>

    )
}
