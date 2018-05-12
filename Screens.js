import { StackNavigator } from 'react-navigation';
import Home from './components/Home.js';
import AddTask from './components/AddTask.js';
import Login from './components/Login.js';
import SignUp from './components/SignUp.js';

const LoginStack = StackNavigator(
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

export default StackNavigator(
  {
    Home: {
      screen: Home,
    },
    AddTask: {
      screen: AddTask,
    },
    Login: {
      screen: LoginStack,
    },
  },
  {
    headerMode: 'none',
  },
);
