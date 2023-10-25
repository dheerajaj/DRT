import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



// // index.js
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import App from './App';
// import Home from './component/pages/Home';
// import Login from './component/pages/Login';
// import Register from './component/pages/Register';

// ReactDOM.render(
  
//   <BrowserRouter>
//     <App />
//     <Routes>
//        <Route path='/' element={<Home/>}></Route>
//        <Route path='/login' element={<Login/>}></Route>
//        <Route path='/register' element={<Register/>}></Route>
//        </Routes>
//   </BrowserRouter>
//   ,
//   document.getElementById('root')
// );
