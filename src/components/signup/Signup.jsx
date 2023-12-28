import React from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as Yup from 'yup';
import './Login.css';

const Signup = () => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      fathername: '',
      age: '',
      city: '',
      pincode: '',
      password:''
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required('Name is required.'),
      lastname: Yup.string(),
      email: Yup.string().email('Invalid email address').required('Email is required.'),
      fathername: Yup.string().required('Father name is required.'),
      age: Yup.string().required('Age is required.'),
      city: Yup.string().required('City is required.'),
      pincode: Yup.string().required('Pincode is required.'),
      password:Yup.string().required("Please enter your password.")
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log(values);
        const response = await axios.post('http://localhost:8007/api/client/register', values);
        if (response.status === 200) {
          toast.success('Your details is saved Successfully!');
          resetForm();
        } else {
          toast.error(response?.error ?? 'Something went wrong.');
        }
      } catch (error) {
        toast.error('Failed To Subscribe!');
      }
    },
  });
  function loginpage()
  {
      window.location.href="/login"
  }

  return (
    <div className="container mt-5 bh-50" >
      <div className="row justify-content-center">
        
        <div className="col-md-6 text-gradient">
          <h2 className="text-center mb-4 text-black">Signup Form</h2>
          <form onSubmit={formik.handleSubmit} className="border p-4 rounded bg-gradient">
            <div className="mb-3 text-start text-color ">
              <label className="form-label fw-bolder text-color">First Name</label>
              <input
                type="text"
                name="firstname"
                className={`form-control ${formik.touched.firstname && formik.errors.firstname ? 'is-invalid' : ''}`}
                placeholder="Your First name"
                onChange={formik.handleChange}
                value={formik.values.firstname}
              />
              {formik.touched.firstname && formik.errors.firstname && (
                <div className="invalid-feedback">{formik.errors.firstname}</div>
              )}
            </div>

            <div className="mb-3 text-start ">
              <label className="form-label fw-bolder text-color">Last Name</label>
              <input
                type="text"
                name="lastname"
                className={`form-control ${formik.touched.lastname && formik.errors.lastname ? 'is-invalid' : ''}`}
                placeholder="Your Last name"
                onChange={formik.handleChange}
                value={formik.values.lastname}
              />
              {formik.touched.lastname && formik.errors.lastname && (
                <div className="invalid-feedback">{formik.errors.lastname}</div>
              )}
            </div>

            <div className="mb-3 text-start">
              <label className="form-label fw-bolder">Email</label>
              <input
                type="email"
                name="email"
                className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                placeholder="Enter Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="invalid-feedback">{formik.errors.email}</div>
              )}
            </div>

            <div className="mb-3 text-start">
              <label className="form-label fw-bolder">Father's Name</label>
              <input
                type="text"
                name="fathername"
                className={`form-control ${formik.touched.fathername && formik.errors.fathername ? 'is-invalid' : ''}`}
                placeholder="Your Father name"
                onChange={formik.handleChange}
                value={formik.values.fathername}
              />
              {formik.touched.fathername && formik.errors.fathername && (
                <div className="invalid-feedback">{formik.errors.fathername}</div>
              )}
            </div>

            <div className="mb-3 text-start">
              <label className="form-label fw-bolder">Age</label>
              <input
                type="text"
                name="age"
                className={`form-control ${formik.touched.age && formik.errors.age ? 'is-invalid' : ''}`}
                placeholder="Enter your age"
                onChange={formik.handleChange}
                value={formik.values.age}
              />
              {formik.touched.age && formik.errors.age && (
                <div className="invalid-feedback">{formik.errors.age}</div>
              )}
            </div>

            <div className="mb-3 text-start">
              <label className="form-label fw-bolder">City</label>
              <input
                type="text"
                name="city"
                className={`form-control ${formik.touched.city && formik.errors.city ? 'is-invalid' : ''}`}
                placeholder="Enter Your city"
                onChange={formik.handleChange}
                value={formik.values.city}
              />
              {formik.touched.city && formik.errors.city && (
                <div className="invalid-feedback">{formik.errors.city}</div>
              )}
            </div>

            <div className="mb-3 text-start">
              <label className="form-label fw-bolder">Pincode</label>
              <input
                type="text"
                name="pincode"
                className={`form-control ${formik.touched.pincode && formik.errors.pincode ? 'is-invalid' : ''}`}
                placeholder="Enter Your Pincode"
                onChange={formik.handleChange}
                value={formik.values.pincode}
              />
              {formik.touched.pincode && formik.errors.pincode && (
                <div className="invalid-feedback">{formik.errors.pincode}</div>
              )}
            </div>

            <div className="mb-3 text-start">
              <label className="form-label fw-bolder">Password</label>
              <input
                type="text"
                name="password"
                className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                placeholder="Enter Your Password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="invalid-feedback">{formik.errors.password}</div>
              )}
            </div>


            <button className='btn btn-default new-btn mt-3 btn-width'>
              <span className='text-black'>Subscribe </span>
            </button>
          </form>
        </div>
        <div className='col-md-2'>
        <button className='btn btn-default btn-width2' onClick={loginpage}>
              <span className='h5'> Login </span>
            </button>
        </div>
      </div>
    </div>
  );
};
export default Signup;
