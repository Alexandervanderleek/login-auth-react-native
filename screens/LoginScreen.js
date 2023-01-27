import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { authContext } from '../store/auth-context';
import { login } from '../util/auth';



function LoginScreen() {
  const [isAuthing, setIsAuthing] = useState(false);

  const authCtx =  useContext(authContext);

  

  async function loginHandler({email,password}){
    setIsAuthing(true);
    try{
      const token = await login(email,password);
      authCtx.authenticate(token);

      
    
    }catch(error){
      Alert.alert('Auth failed','Could not log you in');
      setIsAuthing(false);

    }
  }
  

  if(isAuthing){
    return <LoadingOverlay message="creating user..."></LoadingOverlay>
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
