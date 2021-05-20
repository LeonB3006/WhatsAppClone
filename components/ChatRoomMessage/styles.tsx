import {StyleSheet} from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
    container: {
        padding: 10,

    },
    messageBox: {
        borderRadius: 5,
        padding: 10,
    },
    name: {
        color: Colors.light.tint,
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    message: {
        fontSize: 16,

    },
    time: {
        alignSelf: 'flex-end',
        color: 'grey'
    }
});

export default styles;
