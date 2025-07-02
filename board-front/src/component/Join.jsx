import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { url } from './config';

export default function Join() {
  const [member, setMember] = useState({
    id: '', name: '', password: '', email: '',
    address: '', detailAddress: ''
  });
  const [isDuplicate, setIsDuplicate] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const checkDuplicate = async () => {
    try {
      const res = await axios.post(`${url}/memberDoubleId`, null, {
        params: { id: member.id }
      });
      if (res.data === true) {
        alert('아이디가 중복됩니다');
        setIsDuplicate(true);
      } else {
        alert('사용 가능한 아이디입니다');
        setIsDuplicate(false);
      }
    } catch {
      alert('중복 체크 오류');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isDuplicate) return alert('중복된 아이디입니다');
    try {
      await axios.post(`${url}/join`, member);
      alert('회원가입 완료');
      navigate('/Login');
    } catch {
      alert('회원가입 실패');
    }
  };

  const execDaumPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let fullAddr = '';
        if (data.userSelectedType === 'R') {
          fullAddr = data.roadAddress;
        } else {
          fullAddr = data.jibunAddress;
        }
        setMember({ ...member, address: fullAddr });
        document.getElementById("detailAddress").focus();
      }
    }).open();
  };

  // Daum script 로드
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <h2>회원가입</h2>
      <input type="text" name="id" placeholder="아이디" onChange={handleChange} required />
      <button type="button" onClick={checkDuplicate}>중복확인</button><br />
      <input type="text" name="name" placeholder="이름" onChange={handleChange} required /><br />
      <input type="password" name="password" placeholder="비밀번호" onChange={handleChange} required /><br />
      <input type="text" name="email" placeholder="이메일" onChange={handleChange} /><br />

      <button type="button" onClick={execDaumPostcode}>주소 찾기</button><br />
      <input type="text" name="address" placeholder="주소" value={member.address} readOnly /><br />
      <input type="text" id="detailAddress" name="detailAddress" placeholder="상세주소" onChange={handleChange} /><br />

      <button type="submit">회원가입</button>
    </form>
  );
}
