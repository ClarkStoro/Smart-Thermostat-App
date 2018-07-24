/**
 * SmartThermostat-App
 * https://gitlab.com/ClarkStoro/SmartThermostat-App.git
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    NetInfo,
    AsyncStorage,
    Alert,
    Dimensions,
} from 'react-native';

import PropTypes from 'prop-types';

import {
    StackNavigator,
    NavigationActions,
} from 'react-navigation';

import * as firebase from 'firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import I18n from 'Termostato/app/i18n/i18n'; //Translations

import { createStyles, maxHeight, minHeight } from 'react-native-media-queries'; //media queries for responsive layouts
import small from "Termostato/app/components/Registration/styles/small.js";
import smp5 from "Termostato/app/components/Registration/styles/smp5.js";
import tablet10 from "Termostato/app/components/Registration/styles/tablet10.js";

export default class Registration extends Component {

    static navigationOptions =  {
        header: false,
      };

    constructor() {
        super();

        var iconEmail = require('Termostato/app/images/iconEmail.png');
        var iconPassword = require('Termostato/app/images/iconPassword.png');
        var iconIdThermostat = require('Termostato/app/images/iconIdThermostat.png');

        this.iconImages = {
            iconEmail: iconEmail,
            iconPassword: iconPassword,
            iconIdThermostat: iconIdThermostat,
        }

        this.state = {
            connStatus: false,

            email: '',
            password: '',
            passwordAgain: '',
            IdThermostat: '',
        };
        
    }
    componentDidMount() { 
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);

        NetInfo.isConnected.fetch().done(
            (isConnected) => { this.setState({ connStatus: isConnected }); }
        );

    }//end componentDidMount


    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
    }

    handleConnectionChange = (isConnected) => {
        this.setState({ connStatus: isConnected });
    }

    registerFirebase() {
        
        const constr = this;
        if (this.state.connStatus) {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(function (user) {

                var itemsRef = firebase.database().ref();
                var uid = user.uid;
                var dbRef = itemsRef.child("users").child('' + uid);
                dbRef.set({
                    email: constr.state.email,
                    idThermostat: constr.state.IdThermostat,
                });
               
                firebase.auth().signInWithEmailAndPassword(constr.state.email, constr.state.password).then(function (user) {

                    var uid = firebase.auth().currentUser.uid;
                    var itemsRef = firebase.database().ref();

                    constr.navigateToConsole();

                }).catch(function (e) {
                    Alert.alert(I18n.t("LoginFailed"));
                })

            }).catch(function (e) {
                Alert.alert(I18n.t("Fail"));
            })
        } else {
            Alert.alert(I18n.t("NoInternet"), I18n.t("NeedConnection"));
        }

    }//end registerFirebase
        
    
    //Go to Console Screen by resetting the Navigator 
    //-> Console screen will appear like first screen of the app and by clicking back arrow button the app will go on background
    navigateToConsole(user) {
        
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Console' }),
            ],
        });
        this.props.navigation.dispatch(resetAction);   
    }//end navigateToConsole

    render() {
        const nav = this.props.navigation;
        var { height, width } = Dimensions.get('window');
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#424242',  }}>
                <KeyboardAwareScrollView
                    style={{flex: 1, }}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    contentContainerStyle={styles.container}
                    scrollEnabled={true}>

                    <View style={styles.boxInput}>
                        <View style={styles.boxEmail}>
                            <Image source={this.iconImages.iconEmail} style={styles.iconEmail} />
                            <TextInput
                                style={styles.txtEmail}
                                underlineColorAndroid='transparent'
                                placeholder={I18n.t('Email')}
                                placeholderTextColor="#ffffff"
                                returnKeyType="next"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={true}
                                onSubmitEditing={() => this.passwordInput.focus()}
                                onChangeText={(value) => this.setState({email: value})}
                            />
                        </View>
                        <View style={styles.boxPassword}>
                            <Image source={this.iconImages.iconPassword} style={styles.iconPassword} />
                            <TextInput
                                style={styles.txtPassword}
                                underlineColorAndroid='transparent'
                                placeholder={I18n.t('Password')}
                                placeholderTextColor="#ffffff"
                                returnKeyType="next"
                                autoCapitalize="none"
                                autoCorrect={false}
                                secureTextEntry
                                ref={(input) => this.passwordInput = input}
                                onSubmitEditing={() => this.passwordAgainInput.focus()}
                                onChangeText={(value) => this.setState({password: value})}
                            />
                        </View>
                        <View style={styles.boxPassword}>
                            <Image source={this.iconImages.iconPassword} style={styles.iconPassword} />
                            <TextInput
                                style={styles.txtPassword}
                                underlineColorAndroid='transparent'
                                placeholder={I18n.t('Password')}
                                placeholderTextColor="#ffffff"
                                returnKeyType="next"
                                autoCapitalize="none"
                                autoCorrect={false}
                                secureTextEntry
                                ref={(input) => this.passwordAgainInput = input}
                                onSubmitEditing={() => this.IdThermostatInput.focus()}
                                onChangeText={(value) => this.setState({passwordAgain: value})}
                            />
                        </View>
                        <View style={styles.boxIdThermostat}>
                            <Image source={this.iconImages.iconIdThermostat} style={styles.iconIdThermostat} />
                            <TextInput
                                style={styles.txtIdThermostat}
                                underlineColorAndroid='transparent'
                                placeholder={I18n.t('IDThermostat')}
                                placeholderTextColor="#ffffff"
                                returnKeyType="go"
                                autoCapitalize="none"
                                autoCorrect={false}
                                secureTextEntry
                                ref={(input) => this.IdThermostatInput = input}
                                onChangeText={(value) => this.setState({IdThermostat: value})}
                            />
                        </View>

                        <TouchableWithoutFeedback onPress={this.registerFirebase.bind(this)}>
                            <View style={styles.btnRegister}>
                                <Text style={styles.txtbtnRegister}>{I18n.t('btnRegisterR')}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.boxOR}>
                            <Text style={styles.txtOR}>{I18n.t('Or')}</Text>
                            <TouchableWithoutFeedback onPress={() => nav.goBack()}>
                                <View style={styles.btnLogin}>
                                    <Text style={styles.txtbtnLogin}>{I18n.t('btnLoginR')}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </ScrollView>
        );
    }
}


const stylesBase = {
    container: {
    },

    //Input
    boxInput: {
    },

    //E-mail
    boxEmail: {
    },
    txtEmail: {
    },
    iconEmail: {
    },


    //Password
    boxPassword: {
    },
    txtPassword: {
    },
    iconPassword: {
    },

    //Password
    boxIdThermostat: {
    },
    txtIdThermostat: {
    },
    iconIdThermostat: {
    },
    //btnRegister
    btnRegister: {
    },
    txtbtnRegister: {
    },

    //OR
    boxOR:{
    },
    txtOR:{
    },

    //btnLogin
    btnLogin: {
    },
    txtbtnLogin: {
    },
};


const styles = createStyles(
    stylesBase,

    maxHeight(600, small),
    minHeight(601, maxHeight(1200, smp5)),
    minHeight(1201, tablet10),
);


AppRegistry.registerComponent('Termostato', () => Registration);
