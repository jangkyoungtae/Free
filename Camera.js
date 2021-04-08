import React from 'react';
import { Dimensions, ToastAndroid } from 'react-native';
import { RNCamera } from 'react-native-camera';
import styled from 'styled-components/native';
import { save } from '@react-native-community/cameraroll';
import ImageResizer from 'react-native-image-resizer';
import DocumentPicker from 'react-native-document-picker';


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

const Touchable = styled.TouchableOpacity``;

const REST_API_KEY = '35cd6f93b1dda48ab1f3af7da6b32112';

const OCR_Text = async (uri) => {
    const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
    });
    console.log(res);
    ImageResizer.createResizedImage(uri, 2048, 2048, 'JPEG', 50, 0, undefined, false, { mode: 'contain', onlyScaleDown: true })
        .then(resizedImage => {
            const body = new FormData();
            console.log('resize', resizedImage.uri);
            body.append("image", { uri: resizedImage.uri, name: 'picture.jpg', type: 'image/jpg' });
            fetch("https://dapi.kakao.com/v2/vision/text/ocr", {
                body,
                headers: {
                    Authorization: `KakaoAK ${REST_API_KEY}`,
                    "Content-Type": "multipart/form-data"
                },
                method: "POST"
            }).then(response => response.json())
                .then(json => {
                    // 받은 json으로 기능 구현
                    const text = [];
                    json.result.map((item) => {
                        text.push(item.recognition_words[0]);
                    })
                    return text;
                }).then(result => {
                   
                });
        })
        .catch(err => {
            console.log(err);
            return Alert.alert(
                'Unable to resize the photo',
                'Check the console for full the error message',
            );
        });







}

export default function Camera() {


    const cameraRef = React.useRef(null); // useRef로 camera를 위한 ref를 하나 만들어주고

    const takePhoto = async () => {
        // console.log('cameraRef', cameraRef);
        if (cameraRef) {
            const data = await cameraRef.current.takePictureAsync({
                quality: 1,
                exif: true,
            });
            await OCR_Text(data.uri);
            //const localFile = data.uri;
            // const asd = await MLKit(localFile);
            if (data) {

                save(data.uri, 'photo').then(onfulfilled => {


                    console.log('🐤result', data.uri);
                    ToastAndroid.show(onfulfilled, ToastAndroid.SHORT);
                }).catch(error => {
                    ToastAndroid.show(`${error.message}`, ToastAndroid.SHORT);
                });

            }
        }
    };

    return (
        <>

            <RNCamera
                ref={cameraRef}
                style={{
                    width: WIDTH,
                    height: HEIGHT - 100,
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
            <View>
                <Touchable onPress={takePhoto}>
                    <Button />
                </Touchable>
            </View>

        </>

    )
}
