//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Camera, Permissions } from 'expo';
import { Container, Content, Header, Item, Icon, Input, Button } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// create a component
class CameraComponent extends Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }
    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return (
                <View />
            );
        } else if (hasCameraPermission === false) {
            return (
                <View style={styles.container}>
                    <Text>No access to camara</Text>
                </View>
            );
        } else {
            return (<View style={{ flex: 1 }}>
                <Camera style={{ flex: 1, justifyContent: 'space-between' }} type={this.state.type}>
                    <Header searchBar rounded style={{
                        position: "absolute",
                        backgroundColor: "transparent",
                        left: 0,
                        top: 0,
                        right: 0,
                        zIndex: 100
                    }}>
                        <View style={{ flexDirection: 'row', flex: 4 }}>
                            <Icon name="logo-snapchat" style={{ color: 'white' }}></Icon>
                            <Item style={{ backgroundColor: 'transparent' }}>
                                <Icon name='ios-search' style={{ color: 'white', fontSize: 24, fontWeight: 'bold', }}></Icon>
                                <Input
                                    placeholder="Search"
                                    placeholderTextColor="white"
                                >
                                </Input>
                            </Item>
                        </View>

                        <View style={{ flexDirection: 'row', flex: 2, justifyContent: 'space-around' }}>
                            <Icon name="ios-flash" style={{ color: 'white', fontWeight: 'bold' }}></Icon>
                            <Icon
                                name="ios-reverse-camera"
                                style={{ color: 'white', fontWeight: 'bold' }}
                                onPress={() => {
                                    this.setState({
                                        type: this.state.type === Camera.Constants.Type.back ?
                                            Camera.Constants.Type.front :
                                            Camera.Constants.Type.back
                                    })
                                }}
                            ></Icon>

                        </View>
                    </Header>

                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-between',
                        paddingHorizontal: 10, marginBottom: 15,
                        alignItems: 'flex-end'
                    }}>
                        <MaterialCommunityIcons
                            name="message-reply"
                            style={{ color: 'white', fontSize: 36 }}
                        ></MaterialCommunityIcons>

                        <View style={{ alignItems: 'center' }}>
                            <MaterialCommunityIcons
                                name="circle-outline"
                                style={{ color: 'white', fontSize: 100 }}
                            > </MaterialCommunityIcons>
                            <Icon name='ios-images' style={{ color: 'white', fontSize: 36 }}></Icon>
                        </View>

                        <MaterialCommunityIcons
                            name="google-circles-communities"
                            style={{ color: 'white', fontSize: 36 }}
                        ></MaterialCommunityIcons>
                    </View>
                </Camera>
            </View>)
        }
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default CameraComponent;
