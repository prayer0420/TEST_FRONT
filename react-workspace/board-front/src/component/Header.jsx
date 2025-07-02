import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('loginUser'));

  const logout = () => {
    sessionStorage.removeItem('loginUser');
    alert('로그아웃 되었습니다');
    navigate('/Login');
  };

  return (
    <header>
      <h2>🔐 React 게시판</h2>
      {user ? (
        <div>
          <span>{user.name}님 환영합니다</span>
          <button onClick={logout}>로그아웃</button>
        </div>
      ) : (
        <div>
          <a href="/Login">로그인</a>&nbsp;
          <a href="/Join">회원가입</a>
        </div>
      )}
    </header>
  );
}
