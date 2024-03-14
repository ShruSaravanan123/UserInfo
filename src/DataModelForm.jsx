import React, { useState,useRef} from 'react';
import axios from 'axios'; 
import './DataModelForm.css';

const statesList = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const DataModelForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNo: '',
    email: '',
    nationalId: '',
    address: [{
      addressType: '',
      addressLine1: '',
      addressLine2: '',
      addressLine3: '',
      city: '',
      state: '',
      pincode: '',
      isPermanent: false
    }]
  });

  const firstNameRef = useRef(null);
  
    const redirectToQTrak = () => {
      window.location.href = 'https://qtrak.net/';
    };

    const handleRegisterClick = () => {
      // Scroll to the first input field
      firstNameRef.current.scrollIntoView({ behavior: 'smooth' });
    };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  

  const handleSubmit = async e => {
    e.preventDefault();
  
   
    const errors = {};
    if (!formData.firstName) {
      errors.firstName = 'First Name is required';
    }
    if (!formData.lastName) {
      errors.lastName = 'Last Name is required';
    }
    if (!formData.phoneNo.match(/^\d{10}$/)) {
      errors.phoneNo = 'Phone Number must be 10 digits';
    }
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      errors.email = 'Invalid Email Address';
    }
    if (formData.nationalId.length > 16) {
      errors.nationalId = 'National ID should be less than or equal to 16 characters';
    }
    if (!formData.address.some(addr => addr.isPermanent)) {
      errors.address = 'At least one address should be permanent';
    }
    if (formData.address.some(addr => !statesList.includes(addr.state))) {
      errors.addressState = 'Invalid State selected';
    }
    if (!formData.address.every(addr => addr.city.trim())) {
      errors.addressCity = 'City is required for all addresses';
    }
    if (!formData.address.every(addr => addr.pincode.match(/^\d{6}$/))) {
      errors.addressPincode = 'Pincode must be 6 digits';
    }
  
    if (Object.keys(errors).length > 0) {
      // Display validation errors
      console.error('Form data validation failed:', errors);
      return;
    }
  
    try {
      // Submit form data if validation passes
      const response = await axios.post('http://localhost:5000/api/register', formData);
      if (response && response.data) {
        console.log(response.data);
       
        alert('Registration successful!');
      } else {
        console.error("Response or response data is undefined");
      }
    } catch (error) {
      console.error('Error submitting form data:', error.response.data);
   
      alert('Registration failed. Please try again later.');
    }
  
    console.log(formData);
  };
  return (
    <div>
      <div className="container-fluid">
         <div className='app'><h1>QTrak App</h1></div>
         <div className="container">
         
      <div className="row">
        <div className="col-md-8">
        <div className='col-md-12'><h2 className="q1">Package And Asset Management Made Easy</h2></div>
          <p className="para">QTrak’s app-based scanning and cloud technology allows for quick logging, recipient notification, and complete chain of custody tracking of all your accountable mail, packages, and assets. If you receive and track packages, there’s no simpler, safer, or more cost-effective solution than QTrak.</p>
        </div>
        <div className="col-md-4">
          <img src="shru.png" alt="no" />
        </div>
        
        <div className="container">
      <div className="row">
        <div className="col-auto">
          <button type="button" className="btn btn-warning  btn-lg" onClick={redirectToQTrak}>Learn More</button>
        </div>
        <div className="col-auto">
          <button type="button" className="btn btn-primary  btn-lg" onClick={handleRegisterClick}>Register</button>
        </div>
      </div>
    </div>
        
      </div>
    </div>
        

        
      </div>
    <h2>User Registration Form</h2>
    <form onSubmit={handleSubmit} className="form-container">
    <div>
          <label htmlFor="firstName">First Name:</label>
          <input 
            ref={firstNameRef}
            type="text" 
            id="firstName" 
            name="firstName" 
            class="form-control"
            value={formData.firstName} 
            onChange={handleChange} 
            required 
          />
    </div>
    <div>
          <label htmlFor="lastName">Last Name:</label>
          <input 
            type="text" 
            id="lastName" 
            name="lastName" 
            class="form-control"
            value={formData.lastName} 
            onChange={handleChange} 
            required 
          />
    </div>
    <div>
          <label htmlFor="phoneNo">Phone Number:</label>
          
          <input 
            type="tel" 
            id="phoneNo" 
            name="phoneNo" 
            class="form-control"
            value={formData.phoneNo} 
            onChange={handleChange} 
            pattern="[0-9]{10}" 
            title="Please enter a 10 digit Indian phone number" 
            required 
          />
        
        </div>
        <br></br>
        <div>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email"
            class="form-control" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label htmlFor="nationalId">National ID:</label>
          <input 
            type="text" 
            id="nationalId" 
            name="nationalId" 
            class="form-control"
            value={formData.nationalId} 
            onChange={handleChange} 
            maxLength="16" 
          />
        </div>
        <div>
          <label htmlFor="addressType">Address Type:</label>
          <select 
            id="addressType" 
            name="addressType"
           
            value={formData.address.addressType} 
            onChange={handleChange} 
            required
          >
            <option value="">Select Address Type</option>
            <option value="Owned">Owned</option>
            <option value="Rent">Rent</option>
          </select>
        </div>
        <div>
          <label htmlFor="addressLine1">Address Line 1:</label>
          <input 
            type="text" 
            id="addressLine1" 
            name="addressLine1" 
            class="form-control"
            value={formData.address.addressLine1} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label htmlFor="addressLine2">Address Line 2:</label>
          <input 
            type="text" 
            id="addressLine2" 
            name="addressLine2" 
            class="form-control"
            value={formData.address.addressLine2} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label htmlFor="addressLine3">Address Line 3:</label>
          <input 
            type="text" 
            id="addressLine3" 
            name="addressLine3" 
            class="form-control"
            value={formData.address.addressLine3} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input 
            type="text" 
            id="city" 
            name="city" 
            class="form-control"
            value={formData.address.city} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label htmlFor="state">State:</label>
          <select 
            id="state" 
            name="state" 
            
            value={formData.state} 
            onChange={handleChange} 
            required
          >
            <option value="">Select State</option>
            {statesList.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
        <div>
  <label htmlFor="pincode">Pincode:</label>
  <input 
    type="text" 
    id="pincode" 
    name="pincode" 
    class="form-control"
    value={formData.address.pincode} 
    onChange={handleChange} 
    pattern="[0-9]{6}" 
    title="Please enter a 6 digit Indian pincode" 
    required 
  />
</div>
<div>
          <button type="submit">Submit</button>
        </div>
</form>
</div>
 );
};

export default DataModelForm;