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
        marginLeft: 40,
        marginRight: 40,
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
        marginLeft: 10,
        color: '#ffffff',
        fontSize: 25,
    },
    iconEmail: {
        marginLeft: 15,
        width: 40,
        height: 40,
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
        marginTop: 30,
    },
    txtPassword: {
        flex: 1,
        marginLeft: 10,
        color: '#ffffff',
        fontSize: 25,
    },
    iconPassword: {
        marginLeft: 15,
        width: 40,
        height: 40,
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
        marginTop: 30,
    },
    txtIdThermostat: {
        flex: 1,
        marginLeft: 10,
        color: '#ffffff',
        fontSize: 25,
    },
    iconIdThermostat: {
        marginLeft: 15,
        width: 40,
        height: 40,
        padding: 13
    },
    
    //btnRegister
    btnRegister: {
        backgroundColor: '#FF6e40',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:50,
        marginBottom:20,
    },
    txtbtnRegister: {
        color: '#FFFFFF',
        fontSize: 35,
        fontWeight: 'bold',
        padding: 10,
      
    },

    //OR
    boxOR:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    txtOR:{
        color: '#FFFFFF',
        fontSize: 18, 
    },

    //btnLogin
    btnLogin: {
    },
    txtbtnLogin: {
        color: '#FFFFFF',
        fontSize: 25,
        padding: 10,
    },
}