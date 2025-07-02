import { url } from "./config";
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import './boardModify.css'


export default function BoardModify(){
  	const [board, setBoard] = useState({num: '', title: '', content: '', imgFileName: null, fileName: null});
	const [user, setUser] = useState({id:'hong',name:'홍길동',nickname:'동에번쩍'});    
	const {num} = useParams();
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

	useEffect(() => {
		//axios.get(`${url}/modify/${num}`)
		axios.get(`${url}/detail?num=${num}`)
			.then(res => {
				console.log(res.data);
				setBoard(res.data)
			})
			.catch(err =>{
				console.log(err);
			});
		}, [num]);
	
	const dFileChange= (e)=>{
	setBoard({...board,fileName:e.target.files[0].name});
	setDfile(e.target.files[0]);
	}


	const submit = (e) =>{
        e.preventDefault();

        //form데이터를 씀
        //get방식 가벼운건 헤더, 무거운건 body에 넣음
        const formData = new FormData();
		formData.append("num", board.num);
        formData.append("title", board.title);
        formData.append("content", board.content)
        formData.append("writer", user.id)
        if(ifile!=null) formData.append("ifile", ifile);
        if(dfile!=null) formData.append("dfile", dfile);

        axios.post(`${url}/modify`, formData)
                .then(res => {
                    console.log(res);
                    navigate(`/BoardDetail/${res.data.num}`);
                })
                .catch((err) =>{
                    console.log(err);
                });
    }


    return(
 		<>
			<h2>게시판글수정</h2>
			<form onSubmit={submit}>
				<table>
				<tbody>
					<tr>
						<td className="td_left"><label>글쓴이</label></td>
						<td className="td_right">
							<input type="text" name="writer"  value={board.writer } onChange={edit}  />
						</td>
					</tr>
					<tr>
						<td className="td_left"><label>제목</label></td>
						<td className="td_right"><input name="title" type="text"
							required="required" value={board.title} onChange={edit}/></td>
					</tr>
					<tr>
						<td className="td_left"><label>내용</label></td>
						<td><textarea id="content" name="content"
							cols="40" rows="15" required="required" value={board.content} onChange={edit} ></textarea></td>
					</tr>
					<tr>
						<td className="td_left"><label>이미지</label></td>
						<td className="td_right">
							<img src={board.imgFileName? `${url}/image?filename=${board.imgFileName}`:'/plus.png'}
								 width="100px" id="preview" onClick={()=>document.getElementById('ifile').click()} />
							<input type="file" name="ifile" id="ifile" accept="image/*" style={{display: "none"}}
								onChange={readURL}/>
						</td>
					</tr>
					<tr>
						<td className="td_left"><label>파일 첨부</label></td>
						<td className="td_right">
							<span id="dfilename" onClick={()=>document.getElementById('dfile').click()}>
								{board.fileName? board.fileName:'파일없음'}
							</span>
							<input type="file" name="dfile" id="dfile" style={{display: "none"}}
								onChange={dFileChange}/>
						</td>
					</tr>
					</tbody>
				</table>
				<section id="commandCell">
					<input type="submit" value="수정"/>&nbsp;&nbsp;
						<a href="/BoardList">목록</a>&nbsp;&nbsp;&nbsp;
				</section>
			</form>
		</>

    )
}