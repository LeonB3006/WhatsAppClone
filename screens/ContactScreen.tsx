import * as React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import { Text, View } from '../components/Themed';
import users from "../data/Users";
import {API, graphqlOperation} from 'aws-amplify';
import NewMessageButton from "../components/NewMessageButton/NewMessageButton";
import ContactListItem from "../components/ContactListItem/ContactListItem";
import {useEffect, useState} from "react";
import {listUsers} from "../src/graphql/queries";



export default function ContactScreen() {

    const [users, setUsers] = useState([]);

    useEffect(()=>{
        const fetchUsers = async () => {
            try {
                const userData = await API.graphql(graphqlOperation(listUsers));
                setUsers(userData.data.listUsers.items);

            } catch(e) {
                console.log(e);

            }
        }
        fetchUsers();


    },[]);

    return (
        <View style={styles.container}>
            <FlatList style={{width: '100%'}} data={users} renderItem={({item}) => <ContactListItem user={item}/>} keyExtractor={(item) => item.id}/>
            <NewMessageButton />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
