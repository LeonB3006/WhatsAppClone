import React, {useEffect, useState} from "react";
import {
    View,
    Text
} from 'react-native';
import { message } from "../../types";
import moment from "moment";
import styles from "./styles";

export type ChatRoomMessageProps = {
    message: message;
    myID: String;
}

const ChatRoomMessage = (props: ChatRoomMessageProps) => {
   const { message, myID } = props;



   const isMyMessage = () => {
       return message.user.id === myID;
   };

    return (
        <View style={styles.container}>
            <View style={[styles.messageBox, {
                backgroundColor: isMyMessage() ? '#6cc8ff' : 'white',
                marginLeft: isMyMessage() ? 50 : 10,
                marginRight: isMyMessage() ? 10 : 50,

            }]}>
                {!isMyMessage() && <Text style={styles.name}>{message.user.name}</Text> }
            <Text style={styles.message}>{message.content}</Text>
            <Text style={styles.time}>{moment(message.createdAt).fromNow()}</Text>
            </View>
        </View>
    );

};


export default ChatRoomMessage;
