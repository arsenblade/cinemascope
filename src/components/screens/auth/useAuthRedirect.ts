import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../hooks/useAuth";

export const useAuthRedirect = () => {
  const {user} = useAuth()
  const navigate = useNavigate()

  const redirectPath = localStorage.getItem('redirect')

  let redirect = '/'

  if(redirectPath) {
    redirect = redirectPath
    localStorage.removeItem('redirect')
  }

  useEffect(() => {
    if(user) navigate(redirect);
  }, [navigate, redirect, user])
}