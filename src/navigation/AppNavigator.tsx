import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, User, Settings, Info} from 'lucide-react-native';
import DummyScreen from '../screens/DummyScreen';
import StartupScreen from '../screens/StartupScreen';
import StaticPage from '../screens/StaticPage';
import EmailPage from '../screens/EmailPage';
import EmailVerificationPage from '../screens/EmailVerificationPage';

type MainStackParamList = {
  Startup: undefined;
  EmailPage: undefined;
  EmailVerificationPage: undefined;
  StaticPage: undefined;
  Login: undefined;
  HomeTabs: undefined;
};

type HomeStackParamList = {
  HomeMain: undefined;
};

type ProfileStackParamList = {
  ProfileMain: undefined;
};

type RootTabParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};
const MainStack = createNativeStackNavigator<MainStackParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const HomeStackNavigator = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="HomeMain"
      component={DummyScreen}
      options={{title: 'Home'}}
    />
  </HomeStack.Navigator>
);

const ProfileStackNavigator = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="ProfileMain"
      component={DummyScreen}
      options={{title: 'Profile'}}
    />
  </ProfileStack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({color, size}) => {
        switch (route.name) {
          case 'Home':
            return <Home color={color} size={size} />;
          case 'Profile':
            return <User color={color} size={size} />;
          case 'Settings':
            return <Settings color={color} size={size} />;
          default:
            return <Info color={color} size={size} />;
        }
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}>
    <Tab.Screen
      name="Home"
      component={HomeStackNavigator}
      options={{headerShown: false}}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStackNavigator}
      options={{headerShown: false}}
    />
    <Tab.Screen name="Settings" component={DummyScreen} />
  </Tab.Navigator>
);

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen
          name="Startup"
          component={StartupScreen}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="EmailPage"
          component={EmailPage}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="EmailVerificationPage"
          component={EmailVerificationPage}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="StaticPage"
          component={StaticPage}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="HomeTabs"
          component={TabNavigator}
          options={{headerShown: false}}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
