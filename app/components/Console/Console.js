/**
 * SmartThermostat-App
 * https://gitlab.com/ClarkStoro/SmartThermostat-App.git
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    TouchableNativeFeedback,
    NetInfo,
    Alert,
    AsyncStorage,
    Dimensions,
} from 'react-native';
import {
    StackNavigator,
    NavigationActions,
} from 'react-navigation';
import PropTypes from 'prop-types';

import * as firebase from 'firebase';

import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';
import Swiper from 'react-native-swiper';
import DateTimePicker from 'react-native-modal-datetime-picker';

import I18n from 'Termostato/app/i18n/i18n'; //Translations

import { createStyles, maxHeight, minHeight } from 'react-native-media-queries'; //media queries for responsive layouts
import small from "Termostato/app/components/Console/styles/small.js";
import smp5 from "Termostato/app/components/Console/styles/smp5.js";
import tablet10 from "Termostato/app/components/Console/styles/tablet10.js";

var idThermostat = '';

export default class Console extends Component {

    static navigationOptions =   ({ navigation }) => ({
        title: "Dashboard",
        headerStyle: {
            backgroundColor: '#424242',
        },
        headerTintColor: 'white',
        headerRight:
        <TouchableOpacity onPress={() => {navigation.state.params.handleLogout()}}>
            <Image source={require('Termostato/app/images/logout.png')}  style={{width:30, height:30, marginRight: 20}}/> 
        </TouchableOpacity>,
    });

    constructor() {
        super();
        var logout = require('Termostato/app/images/logout.png');
        var arrowUP = require('Termostato/app/images/arrowUP.png');
        var arrowDOWN = require('Termostato/app/images/arrowDOWN.png');
        var arrowUPblocked = require('Termostato/app/images/arrowUPblocked.png');
        var arrowDOWNblocked = require('Termostato/app/images/arrowDOWNblocked.png');
        var boilerON = require('Termostato/app/images/CaldaiaONb.png');
        var boilerOFF = require('Termostato/app/images/CaldaiaOFFb.png');

        this.iconImages = {
            logout: logout,
            arrowUP: arrowUP,
            arrowDOWN: arrowDOWN,
            arrowUPblocked: arrowUPblocked,
            arrowDOWNblocked: arrowDOWNblocked,
            boilerON: boilerON,
            boilerOFF: boilerOFF,
        }

        this.state = {
            connStatus: true,

            isDateTimePickerFromVisible: false,
            isDateTimePickerToVisible: false,
            timeFrom: '',
            timeTo: '',

            AUTOPressed: true,
            MANPressed: false,

            setTemp: '',
            isBoilerON: true,

            TempINT: '',
            HumINT: '',

            TempEXT: '',
            HumEXT: '',

            sizeEXT: 250,
            sizeINT: 220,

            fillINT: 0,
            fillEXT: 0,

            bgAUTO: '#186afa',
            bgMAN: '#b3b3b3',

            arrowUPURL: this.iconImages.arrowUP,
            arrowDOWNURL: this.iconImages.arrowDOWN,

            imgBoilerURL: this.iconImages.boilerON,
            txtTempColor: '#ffffff',
        };
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
        
        NetInfo.isConnected.fetch().done(
            (isConnected) => { this.setState({ connStatus: isConnected }); }
        );

        this.props.navigation.setParams({ handleLogout: this.logout.bind(this) }); //logout the user from the static navigationOptions
        this.getSizeCircular();
        this.getData();
    }//end componentDidMount

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
    }

    handleConnectionChange = (isConnected) => {
        this.setState({ connStatus: isConnected });
    }

    //return to Login screen and forget credentials saved
    logout(){
        AsyncStorage.setItem("Email", '');
        AsyncStorage.setItem("Password", '');
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Login' }),
            ],
        });
        this.props.navigation.dispatch(resetAction);
    }//end logout

    //set correct size of the 2 circular progress based on dimension of the screen
    getSizeCircular(){
        const height = Dimensions.get('window').height;
        var sizeEXT = 250;
        var sizeINT = 220;
        if(height<=600){
            sizeEXT = 220;
            sizeINT= 190;
        }else if((height > 600) && (height<= 1200)){
            sizeEXT =250;
            sizeINT= 220;
        }else{
            sizeEXT = 450;
            sizeINT= 420;
        }
        this.setState({
            sizeEXT: sizeEXT,
            sizeINT: sizeINT,
        });
    }

    //Get all data from firebase
    getData() {
        var uid = firebase.auth().currentUser.uid;
        var itemsRef = firebase.database().ref();
        itemsRef.child('users').child('' + uid).once('value', snapshot => { 
            idThermostat = snapshot.child("idThermostat").val();
            itemsRef.child('Thermostats/' + idThermostat).on('value', snapshot => {
                var AUTO = snapshot.child("UserOptions").child("automan").val();
                var boiler = snapshot.child("UserOptions").child("Boiler").val();
                var SetTemp = snapshot.child("UserOptions").child("SetTemp").val();
                var imgBoilerURL = '';
                var bgAUTO = '';
                var bgMAN = '';
                var T_int = snapshot.child("Params").child("INT").child('Temp').val();
                var H_int = snapshot.child("Params").child("INT").child('Hum').val();
                var T_ext = snapshot.child("Params").child("EXT").child('Temp').val();
                var H_ext = snapshot.child("Params").child("EXT").child('Hum').val();
                var fillINT = (parseInt("" + T_int) + 15) * 1.67;
                var fillEXT = (parseInt("" + T_ext) + 15) * 1.67;
                var ignitionFrom = snapshot.child("UserOptions").child('From').val();
                var ignitionTo = snapshot.child("UserOptions").child('To').val();

                this.changeColor(boiler, T_int, SetTemp);

                if (boiler) {
                    imgBoilerURL = this.iconImages.boilerON;
                } else {
                    imgBoilerURL = this.iconImages.boilerOFF;
                }

                if (AUTO) {
                    bgAUTO = '#186afa';
                    bgMAN = '#b3b3b3';
                } else {
                    bgAUTO = '#b3b3b3';
                    bgMAN = '#186afa';
                }

                this.setState({
                    isBoilerON: boiler,    //boiler
                    AUTOPressed: AUTO,  //automan
                    MANPressed: !AUTO,  //automan
                    setTemp: SetTemp,   //SetTemp

                    imgBoilerURL: imgBoilerURL,
                    bgAUTO: bgAUTO,
                    bgMAN: bgMAN,

                    TempINT: T_int,
                    HumINT: H_int,

                    TempEXT: T_ext,
                    HumEXT: H_ext,

                    fillINT: fillINT,
                    fillEXT: fillEXT,

                    timeFrom: ignitionFrom,
                    timeTo: ignitionTo,
                });

                });
            });
    }

    //change color of temperature set based on the difference between the internal temperature and the temperature to reach
    changeColor(boiler, Tint, Temp) {
        if (boiler) {
            var T_int = parseFloat("" + Tint);
            var setTemp = parseFloat("" + Temp);
            var diff = setTemp - T_int;
            if (diff > 0) {
                if (diff > 15) {
                    this.setState({
                        txtTempColor: '#e53935', //red
                    });
                } else {
                    if (diff > 10) {
                        this.setState({
                            txtTempColor: '#F57C00', //orange
                        });
                    } else {
                        if (diff > 8) {
                            this.setState({
                                txtTempColor: '#FFA000', //light orange
                            });
                        } else {
                            if (diff > 4) {
                                this.setState({
                                    txtTempColor: '#FBC02D', //dark yellow
                                });
                            } else {
                                if (diff > 2) {
                                    this.setState({
                                        txtTempColor: '#FFEB3B', //yellow
                                    });
                                } else {
                                    this.setState({
                                        txtTempColor: '#FFF176', //lime
                                    });
                                }
                            }
                        }
                    }
                }
            } else {
                this.setState({
                    txtTempColor: '#4CAF50', //green
                });
            }
        } else {
            this.setState({
                txtTempColor: '#ffffff', //white - boiler OFF
            });
        }
    }//end changeColor


    _showDateTimePickerFrom = () => this.setState({ isDateTimePickerFromVisible: true });
    _showDateTimePickerTo = () => this.setState({ isDateTimePickerToVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerFromVisible: false, isDateTimePickerToVisible: false });

    //get "From" hour by cutting the entire time string
    _handleDatePickedFrom = (time) => {
        var tim = time.toString();
        var strTime = '' + tim.substring(16, 21);
        this.setState({
            timeFrom: strTime,
        });

        var itemsRef = firebase.database().ref();
        var dbRef = itemsRef.child('Thermostats').child('' + idThermostat).child('UserOptions');
        dbRef.child('From').set(
            strTime
        );
        this._hideDateTimePicker();
    };

    //Get "To" hour by cutting the entire time string
    _handleDatePickedTo = (time) => {
        var tim = time.toString();
        var strTime = '' + tim.substring(16, 21);
        this.setState({
            timeTo: strTime,
        });

        var itemsRef = firebase.database().ref();
        var dbRef = itemsRef.child('Thermostats').child('' + idThermostat).child('UserOptions');
        dbRef.child('To').set(
            strTime
        );
        this._hideDateTimePicker();
    };

    //Set forever by setting From : 0 To: 24
    setForever() {
        this.setState({
            timeFrom: '0:00',
            timeTo: '24:00',
        });

        var itemsRef = firebase.database().ref();
        var dbRef = itemsRef.child('Thermostats').child('' + idThermostat).child('UserOptions');
        dbRef.child("From").set(
             '0:00'
        );
        dbRef.child("To").set(
            '24:00'
       );
    }//end setForever

    //Switch from AUTO to MANU
    switchAUTO() {
        this.setState({
            AUTOPressed: true,
            MANPressed: false,
            bgAUTO: '#186afa',
            bgMAN: '#b3b3b3',
            arrowUPURL: this.iconImages.arrowUP,
            arrowDOWNURL: this.iconImages.arrowDOWN,
        });

        var itemsRef = firebase.database().ref();
        var dbRef = itemsRef.child('Thermostats').child('' + idThermostat).child('UserOptions');
        dbRef.child('automan').set(
            true
        );
    }

    //Switch from MANU to AUTO
    switchMAN() {
        this.setState({
            AUTOPressed: false,
            MANPressed: true,
            bgAUTO: '#b3b3b3',
            bgMAN: '#186afa',
            arrowUPURL: this.iconImages.arrowUPblocked,
            arrowDOWNURL: this.iconImages.arrowDOWNblocked,
        });

        var itemsRef = firebase.database().ref();
        var dbRef = itemsRef.child('Thermostats').child('' + idThermostat).child('UserOptions');
        dbRef.child('automan').set(
            false
        );
    }

    //When thermostat is on manual mode switch ON/OFF the boiler
    switchBoiler() {
        var itemsRef = firebase.database().ref();
        if (this.state.isBoilerON) {
            this.setState({
                isBoilerON: false,
                imgBoilerURL: this.iconImages.boilerOFF,
            });
            var dbRef = itemsRef.child('Thermostats').child('' + idThermostat).child('UserOptions');
            dbRef.child('Boiler').set(
                false
            );
        } else {
            this.setState({
                isBoilerON: true,
                imgBoilerURL: this.iconImages.boilerON,
            });
            var dbRef = itemsRef.child('Thermostats').child('' + idThermostat).child('UserOptions');
            dbRef.child('Boiler').set(
                true
            );
        }
    }//end switchBoiler

    //Increase temperature set
    Increase() {
        var itemsRef = firebase.database().ref();
        if (this.state.setTemp + 0.5 > 50) {
            this.setState({
                arrowDOWNURL: this.iconImages.arrowDOWN,
                arrowUPURL: this.iconImages.arrowUPblocked,
            });
        }
        if (this.state.setTemp + 0.5 == 50) {
            this.setState({
                arrowDOWNURL: this.iconImages.arrowDOWN,
                arrowUPURL: this.iconImages.arrowUPblocked,
                setTemp: this.state.setTemp + 0.5,
            });

            var dbRef = itemsRef.child('Thermostats').child('' + idThermostat).child('UserOptions');
            dbRef.child('SetTemp').set(
                this.state.setTemp + 0.5
            );
        }
        if (this.state.setTemp + 0.5 < 50) {
            this.setState({
                arrowDOWNURL: this.iconImages.arrowDOWN,
                arrowUPURL: this.iconImages.arrowUP,
                setTemp: this.state.setTemp + 0.5,
            });

            var dbRef = itemsRef.child('Thermostats').child('' + idThermostat).child('UserOptions');
            dbRef.child('SetTemp').set(
                this.state.setTemp + 0.5
            );
        }
    }//end Increase

    //Decrease temperature set
    Decrease() {
        var itemsRef = firebase.database().ref();
        if (this.state.setTemp - 0.5 > (-20)) {
            this.setState({
                arrowUPURL: this.iconImages.arrowUP,
                arrowDOWNURL: this.iconImages.arrowDOWN,
                setTemp: this.state.setTemp - 0.5,
            });
            var dbRef = itemsRef.child('Thermostats').child('' + idThermostat).child('UserOptions');
            dbRef.child('SetTemp').set(
                this.state.setTemp - 0.5
            );
        }
        if (this.state.setTemp - 0.5 == (-20)) {
            this.setState({
                arrowUPURL: this.iconImages.arrowUP,
                arrowDOWNURL: this.iconImages.arrowDOWNblocked,
                setTemp: this.state.setTemp - 0.5,
            });
            var dbRef = itemsRef.child('Thermostats').child('' + idThermostat).child('UserOptions');
            dbRef.child('SetTemp').set(
                this.state.setTemp - 0.5
            );
        }
        if (this.state.setTemp - 0.5 < (-20)) {
            this.setState({
                arrowUPURL: this.iconImages.arrowUP,
                arrowDOWNURL: this.iconImages.arrowDOWNblocked,
            });
        }
    }//end Decrease


    render() {
        if (!this.state.connStatus){
            return (
                <View><Text>{I18n.t("NoInternet")}</Text></View>
                );
        }
        if (this.state.MANPressed) {
            return (
                <ScrollView style={{ flex: 1, backgroundColor: '#6d6d6d' }}>
                    <View style={styles.container}>
                        <View style={styles.boxMode}>
                            <TouchableOpacity style={[styles.switchLeft, { backgroundColor: this.state.bgAUTO }]} onPress={this.switchAUTO.bind(this)}><Text style={styles.txtSwitch}>AUTO</Text></TouchableOpacity>
                            <TouchableOpacity style={[styles.switchRight, { backgroundColor: this.state.bgMAN }]} onPress={this.switchMAN.bind(this)}><Text style={styles.txtSwitch}>MANU</Text></TouchableOpacity>
                        </View>
                        <View style={styles.boxProgress}>
                            <Image source={this.iconImages.arrowUPblocked} style={styles.arrow} />
                            <AnimatedGaugeProgress
                                size={this.state.sizeEXT}
                                width={15}
                                fill={this.state.fillEXT}
                                rotation={90}
                                cropDegree={0}
                                tintColor="#ffa726"
                                backgroundColor="#6d6d6d" >
                                {
                                    (fill) => (
                                        <View style={styles.tempINT}>
                                            <AnimatedGaugeProgress
                                                size={this.state.sizeINT}
                                                width={15}
                                                fill={this.state.fillINT}
                                                rotation={90}
                                                cropDegree={0}
                                                tintColor="#4caf50"
                                                backgroundColor="#6d6d6d" >
                                                {
                                                    (fill) => (
                                                        <View style={styles.boxCircularMAN}>
                                                            <View style={styles.TempIMPMAN}>
                                                                <TouchableOpacity onPress={this.switchBoiler.bind(this)}>
                                                                    <Image source={this.state.imgBoilerURL} style={styles.flame} />
                                                                </TouchableOpacity>
                                                            </View>
                                                            <View style={styles.lineMAN} />
                                                            <View style={styles.DATA}>
                                                                <View style={styles.DATAINT}>
                                                                    <View>
                                                                        <Text style={styles.txtTINT}>INT {this.state.TempINT}&#176;C</Text>
                                                                    </View>
                                                                    <View>
                                                                        <Text style={styles.txtHINT}>HUM {this.state.HumINT}%</Text>
                                                                    </View>
                                                                </View>
                                                                <View style={styles.DATAEXT}>
                                                                    <View>
                                                                        <Text style={styles.txtTEXT}>EXT {this.state.TempEXT}&#176;C</Text>
                                                                    </View>
                                                                    <View>
                                                                        <Text style={styles.txtHEXT}>HUM {this.state.HumEXT}%</Text>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    )
                                                }
                                            </AnimatedGaugeProgress>
                                        </View>
                                    )
                                }
                            </AnimatedGaugeProgress>
                            <Image source={this.iconImages.arrowDOWNblocked} style={styles.arrow} />
                        </View>
                    </View>
                </ScrollView>
            );
        }

        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#6d6d6d', }}>
                <View style={styles.container}>
                    <View style={styles.boxMode}>
                        <TouchableOpacity style={[styles.switchLeft, { backgroundColor: this.state.bgAUTO }]} onPress={this.switchAUTO.bind(this)}><Text style={styles.txtSwitch}>AUTO</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.switchRight, { backgroundColor: this.state.bgMAN }]} onPress={this.switchMAN.bind(this)}><Text style={styles.txtSwitch}>MANU</Text></TouchableOpacity>
                    </View>
                    <View style={styles.boxProgress}>
                        <TouchableOpacity onPress={this.Increase.bind(this)}>
                            <Image source={this.state.arrowUPURL} style={styles.arrow} />
                        </TouchableOpacity>
                        <AnimatedGaugeProgress
                            size={this.state.sizeEXT}
                            width={15}
                            fill={this.state.fillEXT}
                            rotation={90}
                            cropDegree={0}
                            tintColor="#ffa726"
                            backgroundColor="#6d6d6d" >
                            {
                                (fill) => (
                                    <View style={styles.tempINT}>
                                        <AnimatedGaugeProgress
                                            size={this.state.sizeINT}
                                            width={15}
                                            fill={this.state.fillINT}
                                            rotation={90}
                                            cropDegree={0}
                                            tintColor="#4caf50"
                                            backgroundColor="#6d6d6d" >
                                            {
                                                (fill) => (
                                                    <View style={{ flex: 1, position: 'absolute', alignItems: 'center', justifyContent: 'center', left: 30, right: 30, }}>
                                                        <Swiper style={{ alignItems: 'center', }} width={this.state.sizeINT} height={this.state.sizeINT} loop={false} showsButtons={false}>
                                                            <View style={styles.boxCircular}>
                                                                <View style={styles.TempIMP}>
                                                                    <Text style={[styles.txtTempMP, { color: this.state.txtTempColor }]}>{this.state.setTemp}&#176;C</Text>
                                                                </View>
                                                                <View style={styles.line} />
                                                                <View style={styles.DATA}>
                                                                    <View style={styles.DATAINT}>
                                                                        <View>
                                                                            <Text style={styles.txtTINT}>INT {this.state.TempINT}&#176;C</Text>
                                                                        </View>
                                                                        <View>
                                                                            <Text style={styles.txtHINT}>HUM {this.state.HumINT}%</Text>
                                                                        </View>
                                                                    </View>
                                                                    <View style={styles.DATAEXT}>
                                                                        <View>
                                                                            <Text style={styles.txtTEXT}>EXT {this.state.TempEXT}&#176;C</Text>
                                                                        </View>
                                                                        <View>
                                                                            <Text style={styles.txtHEXT}>HUM {this.state.HumEXT}%</Text>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                            <View style={styles.boxHours}>
                                                                <View style={{
                                                                    flexDirection: 'row',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                }}>
                                                                    <TouchableOpacity onPress={this._showDateTimePickerFrom.bind(this)}>
                                                                        <Text style={styles.txtHours}>{I18n.t('From')} {this.state.timeFrom} </Text>
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity onPress={this._showDateTimePickerTo.bind(this)}>
                                                                        <Text style={styles.txtHours}>  {I18n.t('To')} {this.state.timeTo}</Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                                <View>
                                                                    <TouchableOpacity onPress={this.setForever.bind(this)}>
                                                                        <Text style={styles.txtForever}>{I18n.t('SetForever')}</Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </View>
                                                        </Swiper>
                                                    </View>
                                                )
                                            }
                                        </AnimatedGaugeProgress>
                                    </View>
                                )
                            }
                        </AnimatedGaugeProgress>
                        <TouchableOpacity onPress={this.Decrease.bind(this)}>
                            <Image source={this.state.arrowDOWNURL} style={styles.arrow} />
                        </TouchableOpacity>
                    </View>
                </View>

                <DateTimePicker
                    datePickerModeAndroid='calendar'
                    mode='time'
                    isVisible={this.state.isDateTimePickerFromVisible}
                    onConfirm={this._handleDatePickedFrom.bind(this)}
                    onCancel={this._hideDateTimePicker.bind(this)}
                />
                <DateTimePicker
                    datePickerModeAndroid='calendar'
                    mode='time'
                    isVisible={this.state.isDateTimePickerToVisible}
                    onConfirm={this._handleDatePickedTo.bind(this)}
                    onCancel={this._hideDateTimePicker.bind(this)}
                />
            </ScrollView>
        );
    }
}

const stylesBase = {
    container: {
    },
    imgLogout:{
        width: 40,
        height:40,
    },

    //Switch AUTO-MAN
    boxMode: {
    },
    switchLeft: {
    },
    switchRight: {
    },
    txtSwitch: {
    },

    arrow: {
    },
    //Circle
    boxProgress: {  
    },
    //Circular progress internal temperature
    tempINT: {
    },
    boxCircular: {
    },
    boxCircularMAN: {
    },

    //View AUTO
    TempIMP: {
    },
    TempIMPMAN: {
    },
    txtTempMP: {
    },

    //View MANUAL
    flame: {
    },
    line: {
    },
    lineMAN: {
    },

    //View INT/EXT data
    DATA: {
    },
    DATAINT: {
    },
    DATAEXT: {
    },
    txtTINT: {
    },
    txtHINT: {
    },
    txtTEXT: {
    },
    txtHEXT: {
    },

    //View Set Time
    boxHours: {
    },
    txtHours: {
    },
    txtForever: {
    },
};


const styles = createStyles(
    stylesBase,

    maxHeight(600, small),
    minHeight(601, maxHeight(1200, smp5)),
    minHeight(1201, tablet10),

);

AppRegistry.registerComponent('Termostato', () => Console);
