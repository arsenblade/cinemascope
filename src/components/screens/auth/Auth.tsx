import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { IAuthInput } from './auth.interface';
import { useAuthRedirect } from './useAuthRedirect'

import styles from './Auth.module.scss'
import AuthFields from './AuthFields';
import { useAuth } from '../../../hooks/useAuth';
import { useActions } from '../../../hooks/useAction';
import Button from '../../ui/form-element/Button';
import { toast, ToastContainer } from 'react-toastify';


const Auth:FC = () => {
  const {isLoading, user} = useAuth()
  const [type, setType] = useState<'login' | 'register'>('login'); 
  useAuthRedirect()
  const {register: registerInput, handleSubmit, formState, reset} = useForm<IAuthInput>({
    mode: 'onChange'
  })
  const {login, register} = useActions()
  const onSubmit:SubmitHandler<IAuthInput> = (data) => {
    if(type === 'login') login(data)
    else if(type === 'register') register(data) 
    reset()
  }

  return (
    !user ?
    <section className={styles.wrapper}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Email: testADMIN@test.ru</h1>
      <h1>Password: 123456</h1>
      <h1 className={styles.title}>Auth</h1>
      <AuthFields formState={formState} register={registerInput} isPasswordRequired />
      <div className={styles.buttons}>
        <Button type='submit' onClick={() => setType('login')} disabled={isLoading}>Login</Button>
        <Button type='submit' onClick={() => setType('register')} disabled={isLoading}>Register</Button>
      </div>
    </form>
  </section> : null
  )
}

export default Auth