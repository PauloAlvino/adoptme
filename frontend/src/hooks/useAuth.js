import api from "../utils/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFlashMessages from "./useFlshMessages";
export default function useAuth() {
  const { setFlashMessages } = useFlashMessages();
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      api.defaults.headers.Authorization = `Bearer ${token}`
      setAuth(true)
    } 
  }, []);
  async function register(user) {
    let message = "Cadastro realizado com sucesso";
    let type = "sucess";
    try {
      const response = await api.post("/users/register", user);
      const data = await response.data;
      console.log(data);
      await authUser(data);
    } catch (error) {
      message = error.response.data.message;
      type = "error";
    }
    setFlashMessages(message, type);
  }
  async function login(user) {
   let message = "Login realizado com sucesso";
    let type = "sucess";
    try {
      const response = await api.post("/users/login", user);
      const data = await response.data;
      console.log(data);
      await authUser(data);
    } catch (error) {
      message = error.response.data.message;
      type = "error";
    }
    setFlashMessages(message, type);
  }

  async function authUser(data) {
    setAuth(true);
    localStorage.setItem("token", JSON.stringify(data.token));
    navigate("/");
  }

  function logout() {
    const message = 'Logout realizado' 
    const type = 'sucess'
    setAuth(false);
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined
    navigate('/')
    setFlashMessages(message, type)
  }
  return { register, login, auth, logout };
}
