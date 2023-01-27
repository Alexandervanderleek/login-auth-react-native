import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import {createUser } from '../util/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { authContext } from '../store/auth-context';



function SignupScreen() {
  
  const [isAuthing, setIsAuthing] = useState(false);

  const authCtx =  useContext(authContext);


  async function SignUpHanlder({email,password}){
    setIsAuthing(true);
    try{
      const token = await createUser(email,password);
      authCtx.authenticate(token);
    }catch(error){
      Alert.alert("Sign-Up failed","Please try again.")
      setIsAuthing(false);

    }
  }
  

  if(isAuthing){
    return <LoadingOverlay message="creating user..."></LoadingOverlay>
  }

  return <AuthContent onAuthenticate={SignUpHanlder}/>;
}

export default SignupScreen;
