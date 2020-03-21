import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TextInput, View } from 'react-native';
import HeaderButtons from 'react-navigation-header-buttons';

import Fire from '../db/Fire';

export default class EditPostScreen extends React.Component {
        static navigationOptions = ({ navigation }) => ({
        title: 'EditPost',
        headerRight: (
            <HeaderButtons IconComponent={Ionicons} iconSize={23} color="black">
                <HeaderButtons.Item
                title="Share"
                onPress={() => {
                    const title = navigation.getParam('title');
                    const oldTitle = navigation.getParam('oldTitle');
                    const description = navigation.getParam('description');
                    if (title && oldTitle && description) {
                        navigation.goBack();
                        Fire.shared.edit({ oldTitle, title, description: description.trim() });
                    } else {
                        alert('Need valid description');
                    }
                }}
            />
        </HeaderButtons>
        ),
  });

  state = { title: '', description: '' };

  render() {

    return (
        <View style={{ paddingHorizontal: 16, flexDirection: 'vertical' }}>
          <TextInput
            style={{ paddingVertical: 10, fontWeight: 'bold' }}
            placeholder="Add a title..."
            onChangeText={title => {
              this.setState({ title });
              this.props.navigation.setParams({ title });
            }}
          />
          <TextInput
            multiline
            placeholder="Add a description..."
            onChangeText={description => {
              this.setState({ description });
              this.props.navigation.setParams({ description });
            }}
          />
        </View>
    );
  }
}
