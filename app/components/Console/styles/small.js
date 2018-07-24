import {Dimensions} from 'react-native';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export default{
    container: {
        flex: 1,
        backgroundColor: '#6d6d6d',
    },

    //Switch AUTO-MAN
    boxMode: {
        top: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },
    switchLeft: {
        padding: 5,
        borderRadius: 7,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    switchRight: {
        padding: 5,
        borderRadius: 7,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },
    txtSwitch: {
        fontSize: 14,
        color: '#ffffff',
    },

    arrow:{
        resizeMode: 'contain',
        width: 120,
        height: 80,
        marginTop: 0,
        marginBottom: 0,
    },

    //Circle
    boxProgress: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
    },

    tempINT:{
        backgroundColor: 'transparent',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: 220,
        height: 220,
    },
    boxCircular: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        position: 'absolute',
        width: 190,
        height: 190,
    },
    boxCircularMAN: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        position: 'absolute',
        width: 190,
        height: 190,
    },

    //View AUTO
    TempIMP: {
        alignItems: 'center',
        top: 30,
    },
    TempIMPMAN: {
        alignItems: 'center',
        top: 30,
    },
    txtTempMP: {
        fontSize: 40,
    },

    //View MANUAL
    flame: {
        width: 52,
        height: 52,
    },
    line: {
        borderWidth: 1,
        borderColor: '#616161',
        alignItems: 'center',
        marginTop: 35,
        marginBottom: 5,
        width: 95,
        marginLeft: 20,
        marginRight: 20,
    },
    lineMAN: {
        borderWidth: 1,
        borderColor: '#616161',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 5,
        width: 95,
        marginLeft: 20,
        marginRight: 20,
    },

    //View INT/EXT data
    DATA: {
        alignItems: 'center',
        marginTop: 10,
    },
    DATAINT: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    DATAEXT: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    txtTINT: {
        fontSize: 12,
        color: '#ffffff',
        marginLeft: 10,
        marginRight: 10,
    },
    txtHINT: {
        fontSize: 12,
        color: '#ffffff',
        marginLeft: 10,
        marginRight: 10,
    },
    txtTEXT: {
        fontSize: 12,
        color: '#ffffff',
        marginLeft: 10,
        marginRight: 10,
    },
    txtHEXT: {
        fontSize: 12,
        color: '#ffffff',
        marginLeft: 10,
        marginRight: 10,
    },

    //View Set Time
    boxHours: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 190,
        height: 190,
        position: 'absolute',
    },
    txtHours: {
        alignItems: 'center',
        color: '#ffffff',
        fontSize: 14,
        marginBottom: 10,
    },
    txtForever: {
        color: '#ffffff',
        fontSize: 14,
    },
}