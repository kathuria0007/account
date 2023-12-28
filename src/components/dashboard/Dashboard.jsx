import React, { useState ,useEffect} from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as Yup from 'yup';
import { downloadCSV } from '../../utils/common';
import './Login.css';

export default function Dashboard() {

  const [userLocation, setUserLocation] = useState(null);
  const [worklist, setworklist] = useState([]);

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
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required('Name is required.'),
      lastname: Yup.string(),
      email: Yup.string().email('Invalid email address').required('Email is required.'),
      fathername: Yup.string().required('Father name is required.'),
      age: Yup.string().required('Age is required.'),
      city: Yup.string().required('City is required.'),
      pincode: Yup.string().required('Pincode is required.'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log(values);
        const response = await axios.post('http://localhost:8007/api/client/uploadwork');
        if (response.status === 200) {
          console.log();
          toast.success('Your details are saved Successfully!');
          resetForm();
        } else {
          toast.error(response?.error ?? 'Something went wrong.');
        }
      } catch (error) {
        toast.error('Failed To Subscribe!');
      }
    },
  });

  const getAuth = async () => {
    let token = localStorage.getItem('accessToken');
    console.log(token);
    let response = await axios.get('http://localhost:8007/api/client/me', {
      headers: {
        authorization: token,
        accept: 'application/json',
      },
    });
    console.log(response.data);
    if (response.status === 200) {
      formik.setFieldValue('firstname', response.data.data.firstname);
      formik.setFieldValue('lastname', response.data.data.lastname);
      formik.setFieldValue('email', response.data.data.email);
      formik.setFieldValue('fathername', response.data.data.fathername);
      formik.setFieldValue('age', response.data.data.age);

    }
  };

  const getLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting user location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser.');
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (userLocation) {
      axios
        .get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLocation.latitude}&lon=${userLocation.longitude}&addressdetails=1`)
        .then((response) => {
          const address = response.data.display_name;
          formik.setFieldValue('city', address); 
          formik.setFieldValue('pincode',address.split(",")[4]); 
          // Set the city input with the full address
        })
        .catch((error) => {
          console.error('Error getting address:', error.message);
        });
    }
  }, [userLocation]);

  useEffect(()=>{
    getAuth()
  },[])

  // const handleFileChange = (event) => {
  //   formik.setFieldValue('profilePicture', event.currentTarget.files[0]);
  // };
  async function list()
  {
      try {
        let response = await axios.get(`http://localhost:8007/api/client/getusers?exportRequest=false`);
        console.log(response.data.data.items);
        if (response.status === 200) {
          setworklist(response.data.data.items);
        } else {
          toast.error("Failed to fetch data!");
        }
      } catch (error) {
        toast.error("Something went wrong!");
      }
  }
  useEffect(() => {
    list();
  }, []);

  const downloadUsersCsv = async () => {
    try {
      let response = await axios.get(
        `http://localhost:8007/api/client/getusers?exportRequest=true`,
        localStorage.getItem("accessToken")
      );
      if (response.status === 200) {
        alert("Are You sure to export into excel")
        downloadCSV(response?.data, "Users_list");
      } else {
        toast.error(response?.error ?? "Something went wrong.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="container mt-5 bh-50" >
      <div className="row justify-content-center">
        <div className="col-md-6 text-gradient">
       
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
              {formik.touched.firstname && formik.errors.firstname && (<div className="invalid-feedback">{formik.errors.firstname}</div>)}
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
              <label className="form-label fw-bolder">Your Work photo</label>
              <input
                type="file"
                name="profilePicture"
                accept="image/*"
                // onChange={handleFileChange}
                className={`form-control ${formik.touched.profilePicture && formik.errors.profilePicture ? 'is-invalid' : ''}`}
              />
              {formik.touched.profilePicture && formik.errors.profilePicture && (
                <div className="invalid-feedback">{formik.errors.profilePicture}</div>
              )}
            </div>


            <button className='btn btn-default new-btn mt-3 btn-width'>
              <span className='text-black'>Upload Your Work </span>
            </button>
          </form>
        </div>
      </div>
      
      <div className="col-md-6 text-gradient">
          <div className='col-md-2'>
            <button className='btn btn-default btn-width2' onClick={list}>
              <span className='h5'> Subscribed users </span>
            </button>
          </div>
          <table className="table table-dark border border-1">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">FirstName</th>
                <th scope="col">LastName</th>
                <th scope="col">Email</th>
                <th scope="col">Father's Name</th>
                <th scope="col">Age</th>
                <th scope="col">City</th>
                <th scope="col">PinCode</th>
              </tr>
            </thead>
            <tbody>
              {worklist.map((item, index) => (
                <tr key={index}>
                  <td scope="row">{index + 1}</td>
                  <td>{item.firstname}</td>
                  <td>{item.lastname}</td>
                  <td>{item.email}</td>
                  <td>{item.fathername}</td>
                  <td>{item.age}</td>
                  <td>{item.city}</td>
                  <td>{item.pincode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
  );
};
