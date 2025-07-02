import { useState,useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { url } from "./config";
import './BoardWrite.css';

export default function BoardDetail() {
  const [board, setBoard] = useState({num: '', title: '', content: '', imgFileName: null, fileName: null});
  const [user, setUser] = useState({id:'hong',name:'홍길동',nickname:'동에번쩍'});    
  const { num } = useParams();
  const navigate = useNavigate();
  const [like, setLike] = useState(false);

  const readURL = (input) => {
    if (input.target.files && input.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("preview").src = e.target.result;
      };
      reader.readAsDataURL(input.target.files[0]);
    }
  };

    const edit = (e) => {
        setBoard({...board, [e.target.name]:e.target.value});
    }

  useEffect(() => {
    // axios.get(`${url}/detail/${num}`)
    axios.get(`${url}/detail?num=${num}`)
      .then(res => {
        console.log();
        setBoard(res.data)
      })
      .catch(err =>{
        console.log();
        console.error(err)
      });
  }, [num]);



  return (
    <>
      <h2>게시판 글 상세</h2>
      <form>
        <table>
          <tbody>
            <tr>
              <td className="td_left"><label>글쓴이</label></td>
              <td className="td_right">
                <input type="text" value={board.writer} readOnly />
              </td>
            </tr>
            <tr>
              <td className="td_left"><label>제목</label></td>
              <td className="td_right">
                <input type="text" value={board.title||''} readOnly />
              </td>
            </tr>
            <tr>
              <td className="td_left"><label>내용</label></td>
              <td className="td_right">
                <textarea value={board.content} readOnly rows="10" cols="40"></textarea>
              </td>
            </tr>
            {
              board.imgFileName != null?
              <tr>
                <td className="td_left"><label>이미지</label></td>
                <td className="td_right">
                  <img src={`${url}/image?filename=${board.imgFileName}`} alt="첨부이미지" width="100px" id="preview"
                    onClick={() => document.getElementById('ifile').click()} />
                  <input type="file" id="ifile" name="ifile" accept="image/*" style={{ display: "none" }}
                    onChange={readURL} />
                </td>
              </tr>: ''
            }
            {board.fileName != null?
              <tr>
                <td className="td_left"><label>파일 다운로드</label></td>
                <td className="td_right">
                  <a href={`${url}/filedown?filename=${board.fileName}`}>{board.fileName}</a>
                </td>
              </tr> : ''
            }
          </tbody>
        </table>
        <div id="commandCell">
          <a href={`/BoardModify/${board.num}`}>수정</a>&nbsp;&nbsp;&nbsp;
          <a href="/BoardList">목록</a>&nbsp;&nbsp;&nbsp;
          {user.id && (
            <img
              src={like ? "/redheart.png" : "/blackheart.png"}
              width="40px"
              height="40px"
              style={{ marginTop: '5px', cursor: 'pointer' }}
              id="like"
              alt="like"
              onClick={() => setLike(prev => !prev)}
            />
          )}
        </div>
      </form>
    </>
  );
}
