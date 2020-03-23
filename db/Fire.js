const firebase = require('firebase');
import uuid from 'uuid';

import getUserInfo from '../utils/getUserInfo';
import shrinkImageAsync from '../utils/shrinkImageAsync';
import uploadPhoto from '../utils/uploadPhoto';

// Required for side-effects
require('firebase/firestore');

const photoCollectionName = 'Photos';
const userCollectionName = 'Users';
const messageCollectionName = 'Messages';

class Fire {
  constructor() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDgtQkyYGXfnhgxNpM17R3-3cOkQkX5dGE',
      authDomain: 'sjtapp-8bd75.firebaseapp.com',
      databaseURL: 'https://sjtapp-8bd75.firebaseio.com',
      projectId: 'sjtapp-8bd75',
      storageBucket: 'sjtapp-8bd75.appspot.com',
      messagingSenderId: '986489439472',
    });
    // Some nonsense...
    firebase.firestore().settings({ timestampsInSnapshots: true });

    // Listen for auth
    firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }
    });
  }

  // Download Data
  getPaged = async ({ size, start, name, email }) => {
    let ref = this.photoCollection.orderBy('timestamp', 'desc').limit(size);
    try {
      if (start) {
        ref = ref.startAfter(start);
      }

      // const querySnapshot = await ref.get();
      const data = [];
      console.log(email);
      const querySnapshot = await ref.where('email', '==', email).get();

      querySnapshot.forEach((doc) => {
        if (doc.exists) {
          const post = doc.data() || {};

          // Reduce the name
          const user = post.user || {};

          const reduced = {
            key: doc.id,
            name: (name).trim(),
            ...post,
          };
          data.push(reduced);
        }
      });

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      return { data, cursor: lastVisible };
    } catch ({ message }) {
      alert(message);
    }
  };

  // Upload Data
  uploadPhotoAsync = async uri => {
    const path = `${photoCollectionName}/${this.uid}/${uuid.v4()}.jpg`;
    return uploadPhoto(uri, path);
  };

  post = async ({ image: localUri, title, description }) => {
    try {
      const { uri: reducedImage, width, height } = await shrinkImageAsync(
        localUri,
      );

      const remoteUri = await this.uploadPhotoAsync(reducedImage);

      this.photoCollection.doc(title).set({
        title,
        description,
        uid: this.uid,
        imageWidth: width,
        imageHeight: height,
        image: remoteUri,
        timestamp: this.timestamp,
        date: new Date(),
        user: getUserInfo(),
      });
    } catch ({ message }) {
      alert(message);
    }
  };

  // Edit Photo
  edit = async ({ oldTitle, title, description }) => {
    try {
      let oldPost = {
        imageWidth: 0,
        imageHeight: 0,
        image: ''
      };
      await this.photoCollection.doc(oldTitle).get()
        .then((doc) => {
          oldPost.imageWidth = doc.data().imageWidth;
          oldPost.imageHeight = doc.data().imageHeight;
          oldPost.image = doc.data().image;
        }
      );
      await this.photoCollection.doc(title).set({
        title,
        description,
        uid: this.uid,
        imageWidth: oldPost.imageWidth,
        imageHeight: oldPost.imageHeight,
        image: oldPost.image,
        timestamp: this.timestamp,
        date: new Date(),
        user: getUserInfo(),
      });
      await this.photoCollection.doc(oldTitle).delete();
    } catch ({ message }) {
      alert(message);
    }
  }

  // Create account
  createAccount = async ({ email, password, name }) => {
    try {
      let user;
      await this.userCollection.where('email', '==', email).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            user = doc.data();
          })
        });
      if (!user) {
        await this.userCollection.doc(name).set({
          email,
          password,
          name,
        })
        alert('Account successfully created!');
        return true;
      } else {
        alert('The email address is registered in the system already');
      }
    } catch ({ message }) {
      alert(message);
    }
  }

  // Login
  login = async ({ email, password }) => {
    try {
      let user;
      await this.userCollection.where('email', '==', email).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            user = doc.data();
          })
        });
      if (user) {
        if (user.password == password) {
          return user;
        } else {
          alert('Wrong password.')
        }
      } else {
        alert('There is no registered user with the following e-mail address.');
      }
    } catch ({ message }) {
      alert(message);
    }
  }

  // Helpers
  get photoCollection() {
    return firebase.firestore().collection(photoCollectionName);
  }

  get userCollection() {
    return firebase.firestore().collection(userCollectionName);
  }

  get messageCollection() {
    return firebase.firestore().collection(messageCollectionName);
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();
export default Fire;
