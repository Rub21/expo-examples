import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from './initializers/firebase';
import * as config from './config';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = ({
      email: '',
      password: ''
    })
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        // console.log(user);
      }
    });
  }

  signUpUser = (email, password) => {
    try {

      if (this.state.password.length < 6) {
        alert("Plase enter atleast 6 characters");
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error.toString());
    }
  }
  loginUser = (email, password) => {
    try {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (user) {
          // console.log(user)
        })
    } catch (error) {
      console.log(error.toString());
    }
  }

  async loginWithFacebook() {
    console.log('------------------------------------');
    console.log('login with facebook');
    console.log('------------------------------------');
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(config.facebookAppId, { permissions: ['public_profile'] });
    if (type == 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      firebase.auth().signInAndRetrieveDataWithCredential(credential).catch((error) => {
        console.log(error);
      })
    }
  }

  async  signInWithGoogleAsync() {
    console.log('------------------------------------');
    console.log('Need to improve here');
    console.log('------------------------------------');
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: config.androidClientId,
        iosClientId: config.iosClientId,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }


  render() {
    return (
      <Container style={styles.container}>
        <Form>
          <Item floatingLabel>
            <Label>
              Email
            </Label>
            <Input autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(email) => this.setState({ email })}
            >
            </Input>
          </Item>
          <Item floatingLabel>
            <Label>
              Password
            </Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(password) => this.setState({ password })}

            >
            </Input>
          </Item>

          <Button style={{ marginTop: 10 }}
            full
            rounded
            success
            onPress={() => this.loginUser(this.state.email, this.state.password)}
          >
            <Text style={{ color: 'white' }}>Login</Text>
          </Button>

          <Button style={{ marginTop: 10 }}
            full
            rounded
            primary
            onPress={() => this.signUpUser(this.state.email, this.state.password)}
          >
            <Text style={{ color: 'white' }}>Sign up</Text>
          </Button>


          <Button style={{ marginTop: 10 }}
            full
            rounded
            primary
            onPress={() => this.loginWithFacebook()}
          >
            <Text style={{ color: 'white' }}> Login with Facebook</Text>
          </Button>

          <Button style={{ marginTop: 10 }}
            full
            rounded
            primary
            onPress={() => this.signInWithGoogleAsync()}
          >
            <Text style={{ color: 'white' }}> Login with Google</Text>
          </Button>

        </Form>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

