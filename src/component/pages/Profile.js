// import React, { Component } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import axios from 'axios';
// // import './profile.css'

// class Profile extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       firstName: '',
//       lastName: '',
//       joiningDate: new Date(),
//       location: '',
//       profilePhoto: null,
//       loading: false,
//     };
//   }

//   fetchData = async () => {
//     try {
//       this.setState({ loading: true });

//       // Make an API request using Axios to fetch user data
//       const response = await axios.get('http://localhost:8000/api/getUser');

//       this.setState({
//         firstName: response.data.firstName,
//         lastName: response.data.lastName,
//         joiningDate: new Date(response.data.joiningDate),
//         location: response.data.location,
//         loading: false,
//       });
//     } catch (error) {
//       console.error('Error fetching user data', error);
//       this.setState({ loading: false });
//     }
//   }

//   componentDidMount() {
//     this.fetchData();
//   }

//   handleInputChange = (e) => {
//     const { name, value } = e.target;
//     this.setState({ [name]: value });
//   }

//   handleFileChange = (e) => {
//     const file = e.target.files[0];
//     this.setState({ profilePhoto: file });
//   }

//   handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('firstName', this.state.firstName);
//     formData.append('lastName', this.state.lastName);
//     formData.append('joiningDate', this.state.joiningDate);
//     formData.append('location', this.state.location);
//     formData.append('profilePhoto', this.state.profilePhoto);

//     try {
//       await axios.post('/api/updateProfile', formData);
//       this.fetchData();
//     } catch (error) {
//       console.error('Error updating user data', error);
//     }
//   }

//   render() {
//     return (
//       <div>
//         <div className='userprofilecontainer'>
//           <h2 className='uph1'>User Profile</h2>
//           {this.state.loading ? (
//             <p>Loading user data...</p>
//           ) : (
//             <form onSubmit={this.handleSubmit}>
//               <div className='up'>
//                 <label>First Name</label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={this.state.firstName}
//                   onChange={this.handleInputChange}
//                 />
//               </div>
//               <div className='ln'>
//                 <label>Last Name</label>
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={this.state.lastName}
//                   onChange={this.handleInputChange}
//                 />
//               </div>
//               <div className='jd'>
//                 <label>Joining Date</label>
//                 <DatePicker
//                   selected={this.state.joiningDate}
//                   onChange={(date) => this.setState({ joiningDate: date })}
//                 />
//               </div>
//               <div className='loc'>
//                 <label>Location</label>
//                 <input
//                   type="text"
//                   name="location"
//                   value={this.state.location}
//                   onChange={this.handleInputChange}
//                 />
//               </div>
//               <div className='pp'>
//                 <label>Profile Photo</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={this.handleFileChange}
//                 />
//               </div>
//               <button id='upbtn' type="submit">Update Profile</button>
//             </form>
//           )}
//         </div>
//       </div>
//     );
//   }
// }

// export default Profile;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';

function UpdateProfile() {
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    contact: '',
    password: '',
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    // Fetch user data from the server and populate the form
    axios.get('http://localhost:8000/api/getUser')
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.log('Error fetching user data', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:8000/api/updateUser', userData);
      console.log(response.data);

      if (response.status === 'ok') {
        setEditing(false); // Exit edit mode after a successful update
        console.warn('Data updated');
      }
    } catch (error) {
      console.log('Profile update failed. Please try again.', error);
    }
  };

  return (
    <>
    <Navbar />
    <div>
      <h1>User Profile</h1>
      {editing ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            required
            value={userData.firstname}
            onChange={handleChange}
          />

        <label htmlFor="lastname">Last Name:</label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          required
          value={userData.lastname}
          onChange={handleChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          value={userData.email}
          onChange={handleChange}
        />

        <label htmlFor="contact">Contact:</label>
        <input
          type="text"
          name="contact"
          id="contact"
          required
          value={userData.contact}
          onChange={handleChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={userData.password}
          onChange={handleChange}
        />
        <button type="submit">Update Profile</button>
        </form>
      ) : (
        <div>
          <p>First Name: {userData.firstname}</p>
          <p>Last Name: {userData.lastname}</p>
          <p>Email: {userData.email}</p>
          <p>Contact: {userData.contact}</p>
          {/* Display other user data fields here */}
          <button onClick={() => setEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
    </>
  );
}

export default UpdateProfile;



