import { StackNavigator, SwitchNavigator } from 'react-navigation';
import Home from './components/Home.js';
import AddTask from './components/AddTask.js';
import Login from './components/Login.js';
import SignUp from './components/SignUp.js';

const SignedOut = StackNavigator(
  {
    Login: {
      screen: Login,
    },
    SignUp: {
      screen: SignUp,
    },
  },
  {
    headerMode: 'none',
    mode: 'modal',
  },
);

const SignedIn =  StackNavigator(
  {
    Home: {
      screen: Home,
    },
    AddTask: {
      screen: AddTask,
    }
  },
  {
    headerMode: 'none',
  },
);

const RootNavigator = (signedIn = false) => {
  return SwitchNavigator (
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      }
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
}

export default RootNavigator;