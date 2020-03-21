// import React from 'react';
// import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0

// import Fire from '../db/Fire';

// export default class Chat extends React.Component {

//   constructor(props) {
//     super(props);
//   }
//   static navigationOptions = ({ navigation }) => ({
//     title: (navigation.state.params || {}).name || 'Chat!',
//   });

//   state = {
//     messages: [],
//   };

// //   get user() {
// //     return {
// //       name: this.props.navigation.state.params.name,
// //       email: this.props.navigation.state.params.email,
// //       avatar: this.props.navigation.state.params.avatar,
// //       id: Fire.uid,
// //       _id: Fire.uid, // need for gifted-chat
// //     };
// //   }

//   render() {
//     return (
//       <GiftedChat
//         messages={this.state.messages}
//         onSend={Fire.send}
//         user={this.user}
//       />
//     );
//   }

// //   componentDidMount() {
// //     FirebaseSvc.refOn(message =>
// //       this.setState(previousState => ({
// //         messages: GiftedChat.append(previousState.messages, message),
// //       }))
// //     );
// //   }
// //   componentWillUnmount() {
// //     FirebaseSvc.refOff();
// //   }
// }