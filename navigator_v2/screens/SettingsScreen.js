//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage } from 'react-native';

// create a component
class SettingsScreen extends Component {

        signOut = async()=>{
            AsyncStorage.clear();
            this.props.navigation.navigate('AuthLoading');
        }

    render() {
        return (
            <View style={styles.container}>
            <Button title="Sign Out" onPress={this.signOut}></Button>
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
export default SettingsScreen;
