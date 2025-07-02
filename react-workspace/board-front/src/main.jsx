import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Header from './component/Header';
import Login from './component/login.jsx';
import Join from './component/join.jsx';
import BoardList from './component/BoardList.jsx';
import BoardDetail from './component/BoardDetail.jsx';
import BoardWrite from './component/BoardWrite.jsx';
import BoardModify from './component/BoardModify.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/Join" element={<Join />} />
      <Route path="/BoardList" element={<BoardList />} />
      <Route path="/BoardDetail/:num" element={<BoardDetail />} />
      <Route path="/BoardWrite" element={<BoardWrite />} />
      <Route path="/BoardModify/:num" element={<BoardModify />} />
      
    </Routes>
  </BrowserRouter>
);
