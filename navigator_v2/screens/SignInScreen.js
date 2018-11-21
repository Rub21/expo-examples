//import liraries
import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Button, AsyncStorage
} from 'react-native';

// create a component
class SignInScreen extends Component {
    constructor() {
        super();
        this.signIn = this.signIn.bind(this);
    }

    signIn = async() => {
        await AsyncStorage.setItem('userToke', 'Rub21');
        this.props.navigation.navigate('App');
    }


    render() {
        return (
            <View style={styles.container}>
                <Button title="Complete Sign In" onPress={this.signIn} />
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default SignInScreen;
