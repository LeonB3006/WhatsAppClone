import {StyleSheet} from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10,
    },
    mainContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 50,
        marginRight: 10,
        flex: 1,
        alignItems: 'center',
    },
    buttonContainer: {
        backgroundColor: Colors.light.tint,
        borderRadius: 50,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        marginHorizontal: 5,

    },
    textInput: {
        flex: 1,
        marginHorizontal: 10,
    }

});

export default styles;
