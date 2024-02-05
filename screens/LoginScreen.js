import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { login } from '../util/http/auth';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function loginHandler({email, password}) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);

      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert('Authetication failed!', 'Verify your inputs');

      setIsAuthenticating(false);
    }
  }

  if(isAuthenticating) {
    return <LoadingOverlay />;
  }


  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;