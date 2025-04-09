import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Screens
import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import CoursesScreen from './src/screens/CoursesScreen';
import CoursesInformationScreen from './src/screens/CoursesInformationScreen';
import WordNotesScreen from './src/screens/WordNotesScreen';
import LearningModeScreen from './src/screens/LearningModeScreen';
import QuizModeScreen from './src/screens/QuizModeScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CourseDetails"
        component={CoursesInformationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LearningMode"
        component={LearningModeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="QuizMode"
        component={QuizModeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const MainApp = ({ setIsAuthenticated }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Ana Sayfa') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Kurslar') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Notlar') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'Profil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Ana Sayfa" component={HomeStack} />
      <Tab.Screen name="Kurslar" component={CoursesScreen} />
      <Tab.Screen name="Notlar" component={WordNotesScreen} />
      <Tab.Screen 
        name="Profil" 
        component={ProfileScreen}
        initialParams={{ setIsAuthenticated }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      {!isAuthenticated ? (
        <AuthStack.Navigator>
          <AuthStack.Screen
            name="Auth"
            component={AuthScreen}
            options={{ headerShown: false }}
            initialParams={{ setIsAuthenticated }}
          />
        </AuthStack.Navigator>
      ) : (
        <MainApp setIsAuthenticated={setIsAuthenticated} />
      )}
    </NavigationContainer>
  );
};

export default App;
