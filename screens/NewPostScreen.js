import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';
import HeaderButtons from 'react-navigation-header-buttons';

import Fire from '../db/Fire';

export default class NewPostScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'New Post',
    headerRight: (
      <HeaderButtons IconComponent={Ionicons} iconSize={23} color="black">
        <HeaderButtons.Item
          title="Share"
          onPress={() => {
            const image = navigation.getParam('image');
            const title = navigation.getParam('title');
            const description = navigation.getParam('description');
            if (image && title && description) {
              navigation.goBack();
              Fire.shared.post({ image, title, description: description.trim() });
            } else {
              alert('Need valid description');
            }
          }}
        />
      </HeaderButtons>
    ),
  });

  state = { description: '' , title: '' };

  render() {
    const { image } = this.props.navigation.state.params;
    return (
      <View style={{ padding: 10, flexDirection: 'row' }}>
        <Image
          source={{ uri: image }}
          style={{ resizeMode: 'contain', aspectRatio: 1, width: 72 }}
        />
        <View style={{ flexDirection: 'vertical' }}>
          <TextInput
            style={{ flex: 1, paddingHorizontal: 16, fontWeight: 'bold' }}
            placeholder="Add a title..."
            onChangeText={title => {
              this.setState({ title });
              this.props.navigation.setParams({ title });
            }}
          />
          <TextInput
            multiline
            style={{ flex: 1, paddingHorizontal: 16 }}
            placeholder="Add a description..."
            onChangeText={description => {
              this.setState({ description });
              this.props.navigation.setParams({ description });
            }}
          />
        </View>
      </View>
    );
  }
}
