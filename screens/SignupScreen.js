import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../util/http/auth';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signupHandler({email, password}) {
    setIsAuthenticating(true);

    try {
      const token = await createUser(email, password);

      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert('Authetication failed!', 'Verify your inputs');

      setIsAuthenticating(false);
    }
  }

  if(isAuthenticating) {
    return <LoadingOverlay />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;