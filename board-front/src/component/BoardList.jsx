import { useState, useEffect } from "react"
import { url } from "./config";
import axios from "axios";
import './BoardList.css'
export default function BoardList() {
    const [boardList, setBoardList] = useState([]);
    const [pageInfo, setPageInfo] = useState({curPage:1,allPage:1,startPage:1,endPage:1})
    const [user, setUser] = useState({id:'hong',name:'홍길동',nickname:'동에번쩍'});
    const [search, setSearch] = useState({page:1,type:'title',word:''});
    const [pageNums, setPageNums] = useState([]);

    const submit = (page) => {
      setSearch({...search, page:page})
      
      const param = {page:page, type:search.type, word:search.word};

      axios.post(`${url}/list`, param)
        .then(res=> {
          console.log(res);
          setBoardList(res.data.list);
          
          let resPageInfo = res.data.pageInfo;
          setPageInfo(resPageInfo);
          let pages = [];
          for(let i= resPageInfo.startPage; i<=resPageInfo.endPage; i++){
              pages.push(i);
          }
          setPageNums([...pages])
        })
        .catch(err=>{
          console.log(err);
        })
    }

    
    useEffect(()=>{
      submit(1);
      
    },[])


    const edit = (e) => {
        setSearch({...search, [e.target.name]:e.target.value});
    }
    return (
        <>
            <h2>글 목록&nbsp;&nbsp;&nbsp;&nbsp;
                {user.id ? <a href="/BoardWrite">글쓰기</a> :''}
            </h2>
            <form onSubmit={(e)=>e.preventDefault()}>
                <select name="type" id="type" onChange={edit} defaultValue={"title"}>
                    <option value="title" selected="selected">제목</option>
                    <option value="writer">작성자</option>
                    <option value="content">내용</option>
                </select>
                <input type="text" name="word" onChange={edit}/>
                <input type="submit" value="검색" onClick={()=>submit(1)}/>
            </form>
            <br />
            <table>
              <tbody>
                <tr id="tr_top">
                    <th>번호</th><th>제목</th><th>작성자</th><th>날짜</th><th>조회수</th>
                </tr>
                {
                    boardList.map(board=> <tr key={board.num}>
                        <td>{board.num}</td>
                        <td><a href={`BoardDetail/${board.num}`}>{board.title}</a></td>
                        <td>{board.writer}</td>
                        <td>{board.createdate}</td>
                        <td>{board.viewcnt}</td>
                    </tr>)
                }
                </tbody>
            </table>
            <br />
            <div id="emptyArea">
                <button onClick={()=>submit(pageInfo.curPage-1)} disabled={pageInfo.curPage==1}>&lt;</button>

                { pageNums.map(p=>
                    <button onClick={()=>submit(p)} 
                        className={p==pageInfo.curPage?'select':''} key={p}>{p}</button>) }

                <button onClick={()=>submit(pageInfo.curPage-1)} disabled={pageInfo.curPage>=pageInfo.allPage}>&gt;</button>
            </div>	        
        </>
    )
}