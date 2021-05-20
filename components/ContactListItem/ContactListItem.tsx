import React from "react";
import {View, Text, Image, TouchableWithoutFeedback} from "react-native";
import { User } from "../../types";
import styles from "./styles";
import moment from "moment";
import {useNavigation} from '@react-navigation/native';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import { createChatRoom, createChatRoomUser} from "../../src/graphql/mutations";


export type ContactListItemProps = {
    user: User;
}

const ContactListItem = (props: ContactListItemProps) => {
    const { user } = props;

    const onClick = async () =>{
            // Navigate to this users chat room

        try {
            //Creating new chatroom

            const newChatRoomData = await API.graphql(graphqlOperation(createChatRoom, {input: {
                lastMessageID: "872916c2-4a78-48ef-b210-04bf0c2148bd"
                }}));

            if(!newChatRoomData) {
                console.log("failed to create new Chatroom");
                return;
            }

            const newChatRoom = newChatRoomData.data.createChatRoom;

            // Add clicked on user to Chat Room

            await API.graphql(graphqlOperation(createChatRoomUser, {
               input: { userID: user.id , chatRoomID: newChatRoom.id, }
            }));

            // Add logged in user to chat Room
            const userInfo = await Auth.currentAuthenticatedUser();
            await API.graphql(graphqlOperation(createChatRoomUser, {
                    input: {
                        userID: userInfo.attributes.sub, chatRoomID: newChatRoom.id,
                    }
                }
                ));

            navigation.navigate('ChatRoom', {
                id: newChatRoom.id,
                name: "Hardcoded"
            })

        } catch(e) {
            console.log(e)
        }

    };

    const navigation = useNavigation();

    return (
        <TouchableWithoutFeedback onPress={onClick}>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Image source={{ uri: user.imageUri}} style={styles.avatarStyle}/>
                    <View style={styles.midContainer}>
                        <Text style={styles.username}>{user.name}</Text>
                        <Text style={styles.status} > {user.status}</Text>
                    </View>
                </View>

            </View>
        </TouchableWithoutFeedback>

    );

};

export default ContactListItem;
