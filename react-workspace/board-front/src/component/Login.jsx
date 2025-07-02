import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { url } from './config';

export default function Login() {
  const [loginData, setLoginData] = useState({ id: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/login`, loginData);
      alert(`${res.data.name}님 환영합니다`);
      sessionStorage.setItem('loginUser', JSON.stringify(res.data));
      navigate('/BoardList');
    } catch (err) {
      alert('로그인 실패');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>로그인</h2>
      <input type="text" name="id" placeholder="아이디" onChange={handleChange} required />
      <input type="password" name="password" placeholder="비밀번호" onChange={handleChange} required />
      <button type="submit">로그인</button>
    </form>
  );
}
