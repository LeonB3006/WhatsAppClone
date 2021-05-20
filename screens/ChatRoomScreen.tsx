import React, {useEffect, useState} from "react";
import {FlatList, Text, View, ImageBackground, KeyboardAvoidingView, Platform} from 'react-native';
import {useRoute} from '@react-navigation/native';
import ChatRoomMessage from "../components/ChatRoomMessage/ChatRoomMessage";
import BG from '../assets/images/BG.png';
import ChatInput from "../components/ChatInput/ChatInput";
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {getUser, messagesByChatRoom} from "../src/graphql/queries";
import {onCreateMessage} from "../src/graphql/subscriptions";



const ChatRoomScreen = () => {

    const [messages, setMessages] = useState([]);

    const route = useRoute();

    const [myID, setMyID] = useState(null);

    useEffect(()=>{
        const getMyID = async () =>{
            const userInfo = await Auth.currentAuthenticatedUser();
            setMyID(userInfo.attributes.sub);

        }
        getMyID();

    },[]);

    const fetchMessages = async () => {
        const messageData = await API.graphql(graphqlOperation(
            messagesByChatRoom,
            {
                chatRoomID: route.params.id,
                sortDirection: "DESC",

            }
        ));

        console.log('FETCH MESSAGES');
        setMessages(messageData.data.messagesByChatRoom.items)
    };

     useEffect(()=>{

        fetchMessages();
    },[]);


     const addMessagesToState = (message) => {
         setMessages([message, ...messages])

     }

    useEffect(() => {
        const subscription = API.graphql(
            graphqlOperation(onCreateMessage)
        ).subscribe({
            next: (data) => {
                const newMessage = data.value.data.onCreateMessage;

                if(newMessage.chatRoomID !== route.params.id) {
                    return;
                }

                fetchMessages();
                /*setMessages([newMessage, ...messages]); */


            }
        });

        return () => subscription.unsubscribe();
    }, []);


    return (
        <View>
            <ImageBackground style={{width: '100%', height: '100%'}} source={BG}>
                <FlatList
                    data={messages}
                    renderItem={({ item }) => <ChatRoomMessage myID={myID} message={item}/>}
                    inverted
                />

                <ChatInput chatRoomID={route.params.id}/>
            </ImageBackground>
        </View>

    );

};

export default ChatRoomScreen
