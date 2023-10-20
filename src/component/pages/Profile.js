import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
// import './profile.css'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      joiningDate: new Date(),
      location: '',
      profilePhoto: null,
      loading: false,
    };
  }

  fetchData = async () => {
    try {
      this.setState({ loading: true });

      // Make an API request using Axios to fetch user data
      const response = await axios.get('/api/getUserProfile');

      this.setState({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        joiningDate: new Date(response.data.joiningDate),
        location: response.data.location,
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching user data', error);
      this.setState({ loading: false });
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleFileChange = (e) => {
    const file = e.target.files[0];
    this.setState({ profilePhoto: file });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('firstName', this.state.firstName);
    formData.append('lastName', this.state.lastName);
    formData.append('joiningDate', this.state.joiningDate);
    formData.append('location', this.state.location);
    formData.append('profilePhoto', this.state.profilePhoto);

    try {
      await axios.post('/api/updateProfile', formData);
      this.fetchData();
    } catch (error) {
      console.error('Error updating user data', error);
    }
  }

  render() {
    return (
      <div>
        <div className='userprofilecontainer'>
          <h2 className='uph1'>User Profile</h2>
          {this.state.loading ? (
            <p>Loading user data...</p>
          ) : (
            <form onSubmit={this.handleSubmit}>
              <div className='up'>
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className='ln'>
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className='jd'>
                <label>Joining Date</label>
                <DatePicker
                  selected={this.state.joiningDate}
                  onChange={(date) => this.setState({ joiningDate: date })}
                />
              </div>
              <div className='loc'>
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={this.state.location}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className='pp'>
                <label>Profile Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={this.handleFileChange}
                />
              </div>
              <button id='upbtn' type="submit">Update Profile</button>
            </form>
          )}
        </div>
      </div>
    );
  }
}

export default Profile;
