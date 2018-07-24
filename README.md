# SmartThermostat-App

This app, made in React Native and Firebase, allows you to control your homemade smart thermostat. 
Hardware explanation of the project -> https://github.com/SuperCaliMan/SmartThermostat



### Screenshots
<img src="/images/screenHomeAUTO.jpg?raw=true" width="120">
<img src="/images/screenHomeMANU.jpg?raw=true" width="120">


## Getting Started

This app was built by using React Native with react-native-fcm (https://github.com/evollu/react-native-fcm) which permits to use Firebase on React Native like a normal javascript application.

This project use Firebase with a free plan. 

##  Firebase database

As you can see the database is split in two branches: 

- thermostats : in case you want control multiple thermostats
- users : with all user who did the registration

Every thermostat and every user have an ID, user will use the thermostat's ID to connect with.

Every thermostat branch contains internal and external temperature and humidity on the branch Params and a branch UserOption which consist on user preferences and some system informations: 

- Boiler: indicates if the boiler is ON/OFF with a boolean variable
- SetTemp: temperature which the thermostat has to maintain
- automan: a boolean which indicates if the thermostat is on AUTO mode or on MANUAL mode
- From & To: indicates on which interval of hours the thermostat will work

When you build your database pay attention to the "Rules" of the db, in this case read and write are set to "auth != null" so that only authenticated users could access and modify the database.


## Built With

* [React Native](https://facebook.github.io/react-native/docs/getting-started.html) - The app framework used
* [Firebase](https://firebase.google.com/docs/) - Database


## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

* **Emanuele Maso** - *Mobile app and Firebase* - [ClarkStoro](https://github.com/ClarkStoro)
* **Alberto Caliman** - *Hardware and Firebase* - [SuperCaliMan](https://github.com/SuperCaliMan)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


