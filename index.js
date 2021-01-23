import { registerRootComponent } from 'expo';
import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import analytics from '@react-native-firebase/analytics';

import App from './App';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  await analytics().logEvent('notificationReceived', remoteMessage);
});

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
AppRegistry.registerComponent('app', () => HeadlessCheck);