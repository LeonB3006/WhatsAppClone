import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import Amplify from 'aws-amplify'
import config from './src/aws-exports';
Amplify.configure(config);

import {Auth, API, graphqlOperation} from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import {getUser} from './src/graphql/queries'
import {createUser} from "./src/graphql/mutations";

const randomImages = [
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-3.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-9.jpg',
]

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const getRandomImage = () => {
    return randomImages[Math.floor(Math.random() * randomImages.length)];
  };

  // Run only on first login
  useEffect(()=> {
    const fetchUser = async () => {
      // get authenticated user from auth

      const userInfo = await Auth.currentAuthenticatedUser({bypassCache: true});

      if (userInfo) {
        // get user from backend with SUB from Auth
        const userData = await API.graphql(graphqlOperation(getUser,{id: userInfo.attributes.sub} ));
        console.log(userData);

        // If NO userID found in database, add it

        if (userData.data.getUser) {
          console.log("User already exists");
          return;
        }

        const newUser = {
          id: userInfo.attributes.sub,
          name: userInfo.username,
          imageUri: getRandomImage(),
          status: 'Hey whats on your mind?'

        };

        await API.graphql(graphqlOperation(
            createUser,
            {input: newUser}
        ));


      }

    };
    fetchUser();
  },[]);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);
