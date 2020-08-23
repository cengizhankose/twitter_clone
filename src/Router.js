import * as React from 'react';
import {View, Text, TouchableOpacity, Image, Animated} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Login from './screens/Auth/Login';
import Register from './screens/Auth/Register';
import Home from './screens/Home/Home';
import Messages from './screens/Messages/Messages';
import MessagesDetail from './screens/Messages/MessagesDetail';
import Notifications from './screens/Notifications/Notifications';
import NotificationsDetail from './screens/Notifications/NotificationsDetail';
import Search from './screens/Search/Search';
import SearchDetail from './screens/Search/SearchDetail';

import {navigationRef} from './RootNavigation';
import AsyncStorage from '@react-native-community/async-storage';
import {LOCAL_AUTH_ID, USER} from './actions/types';
import FirstScreen from './screens/Auth/FirstScreen';
import {create} from 'react-test-renderer';
import {Icon, Root} from 'native-base';
import { connect } from 'react-redux';

const menu = (navigation) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.openDrawer();
      }}
      style={{
        marginLeft: 10,
      }}>
      <Icon name="user" type="FontAwesome" />
    </TouchableOpacity>
  );
};

const AuthStack = createStackNavigator();
const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator initialRouteName="FirstScreen">
      <AuthStack.Screen
        name="FirstScreen"
        component={FirstScreen}
        options={({navigation, route}) => ({
          title: 'Login',
          headerShown: false,
        })}
      />
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={({navigation, route}) => ({
          title: 'Login',
          headerShown: false,
        })}
      />
      <AuthStack.Screen
        name="Register"
        component={Register}
        options={({navigation, route}) => ({
          title: 'Register',
          headerShown: false,
        })}
      />
    </AuthStack.Navigator>
  );
};

const HomeStack = createStackNavigator();
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation, route}) => ({
          headerLeft: () => menu(navigation),
        })}
      />
      <HomeStack.Screen name="HomeDetail" component={HomeDetail} />
    </HomeStack.Navigator>
  );
};

const SearchStack = createStackNavigator();
const SearchStackScreen = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Search"
        component={SearchScreen}
        options={({navigation, route}) => ({
          headerLeft: () => menu(navigation),
        })}
      />
      <SearchStack.Screen name="SearchDetail" component={SearchDetail} />
    </SearchStack.Navigator>
  );
};

const NotificationsStack = createStackNavigator();
const NotificationsStackScreen = () => {
  return (
    <NotificationsStack.Navigator>
      <NotificationsStack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={({navigation, route}) => ({
          headerLeft: () => menu(navigation),
        })}
      />
      <NotificationsStack.Screen
        name="NotificationDetail"
        component={NotificationsDetail}
      />
    </NotificationsStack.Navigator>
  );
};

const MessagesStack = createStackNavigator();
const MessagesStackScreen = () => {
  return (
    <MessagesStack.Navigator>
      <MessagesStack.Screen
        name="Messages"
        component={MessagesScreen}
        options={({navigation, route}) => ({
          headerLeft: () => menu(navigation),
        })}
      />
      <MessagesStack.Screen name="MessageDetail" component={MessageDetail} />
    </MessagesStack.Navigator>
  );
};

const TabStack = createBottomTabNavigator();
const TabStackScreen = () => {
  return (
    <TabStack.Navigator>
      <TabStack.Screen name="Home" component={HomeStackScreen} />
      <TabStack.Screen name="Search" component={SearchStackScreen} />
      <TabStack.Screen
        name="Notifications"
        component={NotificationsStackScreen}
      />
      <TabStack.Screen name="Messages" component={MessagesStackScreen} />
    </TabStack.Navigator>
  );
};

const DrawerStack = createDrawerNavigator();
const DrawerStackScreen = () => {
  return (
    <DrawerStack.Navigator>
      <DrawerStack.Screen name="Drawer" component={TabStackScreen} />
    </DrawerStack.Navigator>
  );
};

const RootStack = createStackNavigator();

function Router(props) {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator>
        {props.user ? (
          <RootStack.Screen
            name="Main"
            component={DrawerStackScreen}
            options={{
              animationEnabled: false,
            }}
          />
        ) : (
          <RootStack.Screen
            name="Auth"
            component={AuthStackScreen}
            options={{
              animationEnabled: false,
            }}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = ({ authResponse }) => {
    const { loading, user } = authResponse;
    return { loading, user };
};
export default connect(mapStateToProps, {}) (Router);
