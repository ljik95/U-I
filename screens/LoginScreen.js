import React from 'react';
import {
  StyleSheet, Text,
  TextInput, View,
  Button,
} from 'react-native';
import Fire from '../db/Fire';

class Login extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };

  state = {
    email: 'jay@jay.com',
    password: 'whddlr11',
  };

  // using Fire.js
  onPressLogin = async () => {
    const user = await Fire.shared.login(this.state);
    if (user) {
        this.props.navigation.navigate('Feed', {
          name: user.name,
          email: user.email,
        });
    }
  };

  onChangeTextEmail = email => this.setState({ email });
  onChangeTextPassword = password => this.setState({ password });

  render() {
    return (
      <View>
        <Text style={styles.title}>Email:</Text>
        <TextInput
          style={styles.nameInput}
          placeHolder="jay@jay.com"
          onChangeText={this.onChangeTextEmail}
          value={this.state.email}
        />
        <Text style={styles.title}>Password:</Text>
        <TextInput
          style={styles.nameInput}
          onChangeText={this.onChangeTextPassword}
          value={this.state.password}
        />
        <Button
          title="Login"
          style={styles.buttonText}
          onPress={this.onPressLogin}
        />
        <Button
          title="Go to create new account"
          style={styles.buttonText}
          onPress={() => this.props.navigation.navigate("CreateAccount")}
        />
      </View>
    );
  }
}

const offset = 16;
const styles = StyleSheet.create({
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  nameInput: {
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth: 1,
    fontSize: offset,
  },
  buttonText: {
    marginLeft: offset,
    fontSize: 42,
  },
});

export default Login;
