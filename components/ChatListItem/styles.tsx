import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        padding: 10
    },
    leftContainer: {
        flexDirection: 'row',

    },
    midContainer: {
        justifyContent: 'space-around',
        marginLeft: 5
    },
    avatarStyle: {
        width: 60,
        height: 60,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 40
    },
    username: {
        fontWeight: 'bold',
        fontSize: 18
    },
    lastMessage: {
        fontSize: 16,
        color: 'grey'
    },
    time: {
        fontSize: 14,
        color: 'grey',
    }

});

export default styles;
