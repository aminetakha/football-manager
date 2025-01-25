import { useMutation } from 'react-query';
import { useAuth } from '../../hooks/useAuth';
import LogInForm from './components/Login';
import { LoginValues, } from '../../types';
import authApi from '../../api/authApi';

const Login = () => {
  const { signUser } = useAuth();

  const login = useMutation(async (value: LoginValues) => {
    const data = await authApi.login(value);
    signUser(data);
    return data;
  })

  const onSubmitHandler = (values: LoginValues) => {
    login.mutate(values);
  }

  return (
    <LogInForm onSubmit={onSubmitHandler} />
  )
}

export default Login;