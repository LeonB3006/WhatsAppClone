import React, {useEffect, useState} from "react"
import {
    View,
    Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform
} from 'react-native'
import styles from "./styles";
import {MaterialCommunityIcons, FontAwesome5, Entypo, Fontisto} from "@expo/vector-icons";
import {API, Auth, graphqlOperation} from 'aws-amplify';
import {createMessage, updateChatRoom} from "../../src/graphql/mutations";


const ChatInput = (props) =>{

    const {chatRoomID} = props;

    const [message, setMessage] = useState('');
    const [myUserId, setMyUserId] = useState(null);

    useEffect(()=>{

        const fetchUser = async () => {
            const userInfo = await Auth.currentAuthenticatedUser();
            setMyUserId(userInfo.attributes.sub);
        };

        fetchUser();

    },[]);

    const onMicrophonePress = () => {

    };

    const updateChatRoomLastMessage = async (messageId: string) => {
        try {
            await API.graphql(graphqlOperation(
                updateChatRoom, {
                    input: {
                        id: chatRoomID,
                        lastMessageID: messageId,
                    }
                }
            ))

        } catch(e) {
            console.log(e);
        }


    };

    const onSendPress = async () =>{
        //Send message to the backend

        try {
            const newMessageData = await API.graphql(graphqlOperation(
                createMessage,
                {
                    input: {
                        content: message,
                        userID: myUserId,
                        chatRoomID
                    }
                }
            ));

            await updateChatRoomLastMessage(newMessageData.data.createMessage.id);

        } catch(e) {
            console.log(e);

        }

        setMessage('');

    };

    const onPress = () => {
        if(!message) {
            onMicrophonePress();
        } else {
            onSendPress();
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.container} keyboardVerticalOffset={100}>
            <View style={styles.mainContainer}>
                <FontAwesome5 name="laugh-beam" size={25} color="grey"/>
                <TextInput
                    style={styles.textInput}
                    placeholder="Type a Message"
                    multiline
                    onChangeText={setMessage}
                />
                <Entypo name="attachment" style={styles.icon} size={25} />
                {!message && <Fontisto name="camera" size={25} color="grey" style={styles.icon} />}


            </View>

            <TouchableOpacity onPress={onPress}>
                <View style={styles.buttonContainer}>
                    {
                        !message
                        ?
                            <MaterialCommunityIcons name="microphone" size={24} color='white'/>

                        :
                            <MaterialCommunityIcons name="send" size={24} color='white'/>
                    }
                </View>
            </TouchableOpacity>

        </KeyboardAvoidingView>
    );
}


export default ChatInput;
