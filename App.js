import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import AuthContextProvider, { authContext } from './store/auth-context';
import { useContext, useEffect, useState } from 'react';
import IconButton from './components/ui/IconButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading'

const Stack = createNativeStackNavigator();


function Root(){
  const [isTrying, setIsTrying] = useState(true);
  const authCtx = useContext(authContext);

  useEffect(()=>{
    async function fetchToken(){
        const storedToken = await AsyncStorage.getItem('token');

        if(storedToken){
            authCtx.authenticate(storedToken);
        }

        setIsTrying(false);

    }


    fetchToken();
    
    AsyncStorage.getItem('token');
},[])

  if(isTrying){
    return <AppLoading></AppLoading>
  }

return <Navigation></Navigation>
}


function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {

  const authCtx = useContext(authContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
        headerRight: ({tintColor})=><IconButton icon='exit' color={tintColor} size={24} onPress={authCtx.logout}></IconButton>
      }} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(authContext);
  return (
      <NavigationContainer>
        {authCtx.isAuth ? <AuthenticatedStack/> :<AuthStack />}
      </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
        <AuthContextProvider>
          <Root></Root>
        </AuthContextProvider>
    </>
  );
}
