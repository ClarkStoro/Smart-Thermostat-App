import {Dimensions} from 'react-native';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export default{
    container: {
        flex: 1,
        height: height-25,
        alignItems: 'center',
        justifyContent: 'center',
    },

    //Input
    boxInput: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
    },

    //E-mail
    boxEmail: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        borderWidth: 0.5,
        height: 'auto',
    },
    txtEmail: {
        flex: 1,
        marginLeft: 5,
        color: '#ffffff',
    },
    iconEmail: {
        marginLeft: 10,
        width: 12,
        height: 12,
        padding: 13
    },

    //Password
    boxPassword: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        borderWidth: 0.5,
        height: 'auto',
        marginTop: 10,
    },
    txtPassword: {
        flex: 1,
        marginLeft: 5,
        color: '#ffffff',
    },
    iconPassword: {
        marginLeft: 10,
        width: 12,
        height: 12,
        padding: 13
    },

     //Password
     boxIdThermostat: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        borderWidth: 0.5,
        height: 'auto',
        marginTop: 10,
    },
    txtIdThermostat: {
        flex: 1,
        marginLeft: 5,
        color: '#ffffff',
    },
    iconIdThermostat: {
        marginLeft: 10,
        width: 12,
        height: 12,
        padding: 13
    },

    //btnRegister
    btnRegister: {
        backgroundColor: '#FF6e40',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:20,
        marginBottom:20,
    },
    txtbtnRegister: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        padding: 10,
    },

    //OR
    boxOR:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    txtOR:{
        color: '#FFFFFF',
        fontSize: 12, 
    },

    //btnLogin
    btnLogin: {
    },
    txtbtnLogin: {
        color: '#FFFFFF',
        fontSize: 16,
        padding: 10,
    },
}