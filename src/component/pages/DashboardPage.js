

import React from 'react';
// // import { Link } from 'react-router-dom';
// import './DashboardPage.css'; // Import your CSS file
import Navbar from '../Navbar';

import Profile from './Profile';



function DashboardPage() {
  return (
    <div className='dash'>
      <Navbar></Navbar>
      <Profile></Profile>
        <main>
        {/* <img  className='bg2' src={bg2} alt="Background Image2" /> */}
      </main> 
       
    </div>
  );
}

export default DashboardPage;






























// import React from 'react';
// import { Link } from 'react-router-dom';
// import './DashboardPage.css';
// import Navbar from '../Navbar';

// function DashboardPage() {
//   return (
//     <div className='dash'>
//     <h1>Welcome to dashboard</h1><br/>
//       <Navbar></Navbar>
//       <main>
//         {/* Your dashboard content goes here */}
//       </main>
//     </div>
//   );
// }

// export default DashboardPage;
