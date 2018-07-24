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
        marginBottom: 50,
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
        fontSize: 16,
        color: '#ffffff',
    },

    arrow:{
        resizeMode: 'contain',
        width: 140,
        height: 100,
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
        width: 250,
        height: 250,
    },
    boxCircular: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        position: 'absolute',
        width: 220,
        height: 220,
    },
    boxCircularMAN: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        position: 'absolute',
        width: 220,
        height: 220,
    },

    //View AUTO
    TempIMP: {
        alignItems: 'center',
        top: 40,
    },
    TempIMPMAN: {
        alignItems: 'center',
        top: 30,
    },
    txtTempMP: {
        fontSize: 45,
    },

    //View MANUAL
    flame: {
        width: 65,
        height: 65,
    },
    line: {
        borderWidth: 1,
        borderColor: '#616161',
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 10,
        width: 120,
        marginLeft: 20,
        marginRight: 20,
    },
    lineMAN: {
        borderWidth: 1,
        borderColor: '#616161',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 5,
        width: 120,
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
        fontSize: 14,
        color: '#ffffff',
        marginLeft: 10,
        marginRight: 10,
    },
    txtHINT: {
        fontSize: 14,
        color: '#ffffff',
        marginLeft: 10,
        marginRight: 10,
    },
    txtTEXT: {
        fontSize: 14,
        color: '#ffffff',
        marginLeft: 10,
        marginRight: 10,
    },
    txtHEXT: {
        fontSize: 14,
        color: '#ffffff',
        marginLeft: 10,
        marginRight: 10,
    },

    //View Set Time
    boxHours: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 220,
        height: 220,
        position: 'absolute',
    },
    txtHours: {
        alignItems: 'center',
        color: '#ffffff',
        fontSize: 15,
        marginBottom: 20,
    },
    txtForever: {
        color: '#ffffff',
        fontSize: 15,
    },
}