
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isFormSubmitted, setFormSubmitted] = useState(false);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('', formData);

      if (response.status === 200) {
        console.log('Form submitted successfully');
        
        setFormData({
          name: '',
          email: '',
          message: '',
        });

        // this is use for Save the user query to local storage
        const userQueries = JSON.parse(localStorage.getItem('userQueries')) || [];
        userQueries.push(formData.message);
        localStorage.setItem('userQueries', JSON.stringify(userQueries));

        setFormSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  if(isFormSubmitted) {
    alert("Query Submitted")
  }

  return (
    <div className="contact-us">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            placeholder='Enter Your name'
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            placeholder='Enter Your e-mail..'
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            placeholder='Write Your Query....'
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
          {/* <Link to="/" className='hbtn'>Home</Link> */}
          <Link to='/'><button id='hbtn'>Home</button></Link>
        </div>
      </form>
    </div>
  );
}

export default ContactUs;







// import React, { useState } from 'react';
// import axios from 'axios';

// function ContactUs() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('', formData);

//       if (response.status === 200) {
//         console.log('Form submitted successfully');
        
//         setFormData({
//           name: '',
//           email: '',
//           message: '',
//         });
//       }
//     } catch (error) {
//       console.error('Error submitting the form:', error);
//     }
//   };

//   return (
//     <div className="contact-us">
//       <h2>Contact Us</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="name"  >Name:</label>
//           <input
//             placeholder='Enter Your Name'
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="email" >Email:</label>
//           <input
//             placeholder='Enter Your Email'
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="message" >Message:</label>
//           <textarea
//             placeholder='Write Your Quries...'
//             id="message"
//             name="message"
//             value={formData.message}
//             onChange={handleChange}
//             rows="4"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <button type="submit">Submit</button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default ContactUs;
