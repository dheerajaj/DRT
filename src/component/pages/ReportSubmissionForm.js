import React, { useState } from 'react';
import Navbar from '../Navbar';
import axios from 'axios';

function ReportSubmissionForm() {

  const [formData, setFormData] = useState({
    date: '',
    project_name: '',
    status_update: '',
    obstacles: 'On Track',
    needs_clarification: 'No',
    plans: '',
    attachment: null,
  });

  const [errors, setErrors] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,

    });
  };
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      attachment: e.target.files[0],
    });
  }
  const headers = {
    'Content-Type': 'application/json',
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!formData.date) {
      validationErrors.date = 'Date is required.';
    }
    if (!formData.project_name) {
      validationErrors.project_name = 'Project Name is required.';
    }
    if (!formData.status_update) {
      validationErrors.status_update = 'Status Update is required.';
    }

    if (!formData.explanation && formData.needs_clarification === 'Yes') {
      validationErrors.explanation = 'Explanation is required when clarification is needed.';
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await axios.post('http://localhost:8000/api/reportsubmission', formData, {
          headers,
        });
        console.log('Form submitted:', response.data);
        alert(response.data.message);
        setFormData({
          date: '',
          project_name: '',
          status_update: '',
          obstacles: 'On Track',
          needs_clarification: 'No',
          plans: '',
          attachment: null,
        });
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };
  return (

    <div>
      <Navbar></Navbar>
      <div>
        <form id='formreport' onSubmit={handleSubmit}>
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
          {/* Change the input field for Project Name */}
          <label>Project Name</label>
          <input
            type="text"
            name="project_name"
            placeholder="enter your project name"
            value={formData.project_name}
            onChange={handleInputChange}
          />
          <h2 >What Did You Do Today?</h2>
          <textarea
            id='txt1'
            name="status_update"
            rows="4"
            cols="50"
            value={formData.status_update}
            onChange={handleInputChange}
          ></textarea>
          <h2>Are There Any Obstacles Hindering Your Progress?</h2>
          <select
            className='select1'
            name="obstacles"
            value={formData.obstacles}
            onChange={handleInputChange}
          >
            <option value="On Track">On Track</option>
            <option value="At Risk">At Risk</option>
            <option value="Off Track">Off Track</option>
          </select>
         
          <h2 >What Are Your Plans for Tomorrow?</h2>
          <textarea
            id='txt3'
            name="plans"
            rows="4"
            cols="50"
            value={formData.plans}
            onChange={handleInputChange}
          ></textarea>
          <h2 >Attachment</h2>
          <input type="file" name="attachment" onChange={handleFileChange} />
          <p>The maximum file size allowed per upload on the Free plan is 10 MB.</p>
          {errors.date && <div className="error">{errors.date}</div>}
          {errors.project_name && <div className="error">{errors.project_name}</div>}
          {errors.status_update && <div className="error">{errors.status_update}</div>}
          {errors.explanation && <div className="error">{errors.explanation}</div>}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ReportSubmissionForm;