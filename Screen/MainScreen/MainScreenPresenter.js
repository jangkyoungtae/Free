
import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView , TextInput, TouchableOpacity, View } from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import styled from 'styled-components/native';

const REST_API_KEY = '35cd6f93b1dda48ab1f3af7da6b32112';
const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const ImageView = styled.View`
    background-color: black;
    width:${WIDTH}px;
    height:${HEIGHT / 3}px;
`;

export default ({ route }) => {

    const [contents, setContents] = useState("내용없음");
    const [contentUri, setContentUri] = useState("");


    const OCR_Text = async (uri) => {
        // const res = await DocumentPicker.pick({
        //     type: [DocumentPicker.types.images],
        // });
        console.log(uri);
        ImageResizer.createResizedImage(uri, 2048, 2048, 'JPEG', 60, 0, undefined, false, { mode: 'contain', onlyScaleDown: true })
            .then(resizedImage => {
                const body = new FormData();
                //console.log('resize', resizedImage.uri);
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
                        //console.log(json);
                        const text = [];
                        json.result ? json.result.map((item) => {
                            text.push(item.recognition_words[0]);
                        }) : text.push("없음");
                        return text;
                    }).then(result => {
                        const res = result.join(" ");
                        if (uri !== contentUri) {
                            setContents(res);
                            setContentUri(uri);
                        }


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
    if (undefined != route.params) {

        OCR_Text(route.params.res);
    }

    const navigation = useNavigation();


    const goCamera = () => {
        setContents("내용없음");
        navigation.navigate('Camera')
    }
    const onChangeText = (params) => {
        setContents(params);
    }
    return (
        <View>
            <TouchableOpacity
                onPress={goCamera}>
                <ImageView>
                    {contentUri ? <Image style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain'
                    }} source={{ uri: contentUri }} /> : console.log(route.params)}
                </ImageView>
            </TouchableOpacity>
            <ScrollView
                style={{
                    width: '100%',
                    padding:10,
                    marginBottom:100,
                }}>
            <TextInput
                style={{
                    flexShrink: 1,
                    fontSize: 18
                }}
                multiline={true}
                value={contents}
                    onChangeText={onChangeText} />
            </ScrollView>

        </View>
    )
}