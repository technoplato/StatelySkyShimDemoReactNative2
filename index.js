/**
 * @format
 */

// if (!globalThis.event) {
//   globalThis.event = Event;
// }

// if (!globalThis.eventTarget) {
//   globalThis.eventTarget = EventTarget;
// }

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
