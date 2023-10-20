

import React, { useState, useEffect } from 'react';



import Navbar from '../Navbar';

import axios from 'axios';

 

const ReportListPage = () => {

  const [reports, setReportsData] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

 

  useEffect(() => {

    axios.get('http://192.168.68.43:8000/api/v1/allreports')

      .then(response => {

        console.log('API response:', response.data);

        setReportsData(response.data);

      })

      .catch(error => {

        console.error('Failed to fetch report data:', error);

      });

  }, []);

 

 

  const filteredReports = reports.filter(report => {

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return (

      report.date.toLowerCase().includes(lowerCaseSearchTerm) ||

      report.project.toLowerCase().includes(lowerCaseSearchTerm)

    );

  });

 

  return (

    <>

      <Navbar />

      <div className="report-list">

        <h2>Report List</h2>

        <input

          type="text"

          placeholder="Search by Date or Project Name"

          value={searchTerm}

          onChange={(e) => setSearchTerm(e.target.value)}

        />

        <table>

          <thead>

            <tr>

              {/* <th>id</th>

              <th>Name</th> */}

              <th>Date</th>

              <th>Project Name</th>

              <th>Today's task Report</th>

              <th>Plan for Tomorrow</th>

            </tr>

          </thead>

          <tbody>

            {filteredReports.map((report, index) => (

              <tr key={report.id || index}>

                <td>{report._id}</td>

                <td>{report.name}</td>

                <td>{report.project}</td>

                <td>{report.date}</td>

                <td>{report.time}</td>

                <td>{report.discription}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </>

  );

};

 

export default ReportListPage;

// import React, { useState, useEffect } from 'react';
// import './ReportListPage.css';
// import Navbar from '../Navbar';

// const ReportListPage = (props) => {
//   const data = props.ds;

//   console.warn(data);

//   const [reportsData, setReportsData] = useState([]); 
//   const [currentPage, setCurrentPage] = useState(1);
//   const [reportsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredReports, setFilteredReports] = useState([]);
//   const [currentReports, setCurrentReports] = useState([]);

//   useEffect(() => {
    
//     if (reportsData) {
//       const filtered = reportsData.filter(
//         (report) =>
//           report.date.includes(searchTerm) || report.projectName.includes(searchTerm)
//       );
//       setFilteredReports(filtered);

//       const indexOfLastReport = currentPage * reportsPerPage;
//       const indexOfFirstReport = indexOfLastReport - reportsPerPage;
//       setCurrentReports(filtered.slice(indexOfFirstReport, indexOfLastReport));
//     }
//   }, [searchTerm, reportsData, currentPage, reportsPerPage]);

//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="report-list">
//         <h2>Report List</h2>
//         <input
//           type="text"
//           placeholder="Search by Date or Project Name"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <table>
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Name</th>
//               <th>Project Name</th>
//               <th>Hours Worked</th>
//               <th>Comments</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentReports.map((info, index) => (
//               <tr key={index}>
//                 <td>{info.date}</td>
//                 <td>{info.name}</td>
//                 <td>{info.projectName}</td>
//                 <td>{info.hoursWorked}</td>
//                 <td>{info.comments}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="pagination">
//           {Array.from({ length: Math.ceil(filteredReports.length / reportsPerPage) }).map(
//             (_, index) => (
//               <button key={index} onClick={() => paginate(index + 1)}>
//                 {index + 1}
//               </button>
//             )
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ReportListPage;
