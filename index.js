/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import chat from './chat';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => chat);
