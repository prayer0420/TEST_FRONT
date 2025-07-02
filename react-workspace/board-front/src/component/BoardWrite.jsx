import { useState } from "react"
import { useNavigate } from 'react-router-dom';

import { url } from "./config";
import './BoardWrite.css'
import axios from 'axios';

export default function BoardWrite() {
    const [board, setBoard] = useState({num:'',title:'',content:''});
    const [user, setUser] = useState({id:'hong',name:'홍길동',nickname:'동에번쩍'});    
     const [ifile, setIfile] = useState(null);
     const [dfile, setDfile] = useState(null);
      const navigate = useNavigate();

	const  readURL = (input) => {
		if(input.target.files && input.target.files[0]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				document.getElementById("preview").src = e.target.result;
			}
			reader.readAsDataURL(input.target.files[0]);
            setIfile(input.target.files[0]);
		}
	}     
    const edit = (e) => {
        setBoard({...board, [e.target.name]:e.target.value});
    }

    const submit = (e) =>{
        e.preventDefault();

        //form데이터를 씀
        //get방식 가벼운건 헤더, 무거운건 body에 넣음
        const formData = new FormData();
        formData.append("title", board.title);
        formData.append("content", board.content)
        formData.append("writer", user.id)
        if(ifile!=null) formData.append("ifile", ifile);
        if(dfile!=null) formData.append("dfile", dfile);

        axios.post(`${url}/write`, formData)
                .then(res => {
                    console.log(res);
                    navigate(`/BoardDetail/${res.data.num}`);
                })
                .catch((err) =>{
                    console.log(err);
                });
    }

    return (
        <>
            <h2 >게시판 글 등록</h2>
        <form onSubmit={submit} encType="multipart/form-data">
                <table>
                    <tbody>
                        <tr>
                            <td className="td_left">
                                <label>글쓴이</label>
                            </td>
                            <td className="td_right">
                                <input type="text" value={user.name} readOnly/>
                            </td>
                        </tr>
                        <tr>
                            <td className="td_left">
                                <label>제목</label>
                            </td>
                            <td className="td_right">
                                <input type="text" name="title" id="title"  onChange={edit} required="required" />
                            </td>
                        </tr>
                        <tr>
                            <td className="td_left">
                                <label>내용</label>
                            </td>
                            <td className="td_right">
                                <textarea id="content" name="content" cols="40" rows="15"  onChange={edit}></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td className="td_left">
                                <label>이미지 파일 첨부</label>
                            </td>
                            <td className="td_right">
                                <img src="/plus.png" alt="이미지선택" id="preview" width="100px"
                                    onClick={()=>document.getElementById('ifile').click()} />
                                <input type="file" name="ifile" id="ifile" accept="image/*" style={{display:"none"}}
                                    onChange={readURL} />
                            </td>
                        </tr>
                        <tr>
                            <td className="td_left">
                                <label>파일 첨부</label>
                            </td>
                            <td className="td_right">
                                <input type="file" name="dfile" id="dfile" onChange={(e)=>setDfile(e.target.files[0])} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div id="commandCell">
                    <input type="submit" value="등록" />&nbsp;&nbsp;
                    <input type="reset" value="다시쓰기" />&nbsp;&nbsp;
                    <a href="/BoardList">목록</a>
                </div>
            </form>
        </>
    )
}