import {Dimensions} from 'react-native';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export default{
    container: {
        flex: 1,
        backgroundColor: '#6d6d6d',
        height: height ,
    },

    //Switch AUTO-MAN
    boxMode: {
        top: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 0,
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
        fontSize: 30,
        color: '#ffffff',
    },

    arrow:{
        resizeMode: 'contain',
        width: 300,
        height: 160,
        marginTop: 20,
        marginBottom: 20,
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
        width: 450,
        height: 450,
    },
    boxCircular: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        position: 'absolute',
        width: 420,
        height: 420,
    },
    boxCircularMAN: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        position: 'absolute',
        width: 420,
        height: 420,
    },

    //View AUTO
    TempIMP: {
        alignItems: 'center',
        top: 80,
    },
    TempIMPMAN: {
        alignItems: 'center',
        top: 50,
    },
    txtTempMP: {
        fontSize: 80,
    },

    //View MANUAL
    flame: {
        width: 130,
        height: 130,
    },
    line: {
        borderWidth: 1,
        borderColor: '#616161',
        alignItems: 'center',
        marginTop: 100,
        marginBottom: 10,
        width: 280,
        marginLeft: 20,
        marginRight: 20,
    },
    lineMAN: {
        borderWidth: 1,
        borderColor: '#616161',
        alignItems: 'center',
        marginTop: 80,
        marginBottom: 10,
        width: 280,
        marginLeft: 20,
        marginRight: 20,
    },

    //View INT/EXT data
    DATA: {
        alignItems: 'center',
        marginTop: 20,
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
        fontSize: 25,
        color: '#ffffff',
        marginLeft: 10,
        marginRight: 10,
    },
    txtHINT: {
        fontSize: 25,
        color: '#ffffff',
        marginLeft: 10,
        marginRight: 10,
    },
    txtTEXT: {
        fontSize: 25,
        color: '#ffffff',
        marginLeft: 10,
        marginRight: 10,
    },
    txtHEXT: {
        fontSize: 25,
        color: '#ffffff',
        marginLeft: 10,
        marginRight: 10,
    },

    //View Set Time
    boxHours: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 420,
        height: 420,
        position: 'absolute',
    },
    txtHours: {
        alignItems: 'center',
        color: '#ffffff',
        fontSize: 30,
        marginBottom: 20,
    },
    txtForever: {
        color: '#ffffff',
        fontSize: 30,
    },
}