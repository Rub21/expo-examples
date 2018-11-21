import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createBottomTabNavigator
} from 'react-navigation';



import Icon from 'react-native-vector-icons/Ionicons';

import AuthLoadingScreen from './screens/AuthLoadingScreen';

import WelcomeScreen from './screens/WelcomeScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';


// ![image](https://user-images.githubusercontent.com/1152236/48776064-d48f1400-ec9c-11e8-9c2c-209ccbcfe2a1.png)

const AuthStackNavigator = createStackNavigator({
  Welcome: WelcomeScreen,
  SignIn: SignInScreen,
  SignUp: SignUpScreen
})


const AppTapNavigator = createBottomTabNavigator({
  HomeScreen: {
    screen: HomeScreen
  },
  Settings: {
    screen: SettingsScreen
  }
});



const AppStackNavigator = createStackNavigator({
  AppStackNavigator: {
    screen: AppTapNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Your App',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()} >
          <View style={{ paddingHorizontal: 10 }}>
            <Icon name="md-menu" size={24}></Icon>
          </View>
        </TouchableOpacity>
      )
    })
  }
});



const AppDrawerNavigator = createDrawerNavigator({
  Home: AppStackNavigator
});


export default createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Auth: AuthStackNavigator,
  App: AppDrawerNavigator
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
