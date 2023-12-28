import React, { useState } from 'react'
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from 'react-toastify';
import axios from "axios"
import "../login/login.scss";


export default function Login() {
    const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: Yup.object({
        email: Yup.string().email("plz provide valid email address.").required("email is required."),
        password: Yup.string()
          .required("password is required.")
          .min(6, "password is too short - should be 6 chars minimum.")
          .matches(/[a-zA-Z0-9]/, "password can only contain latin letters."),
      }),
      onSubmit: async (values) => {
        try {
          const response = await axios.post('http://localhost:8007/api/client/login', values);
          if (response.status === 200) {
            localStorage.setItem('accessToken', response.data.data.token);
            toast.success(response?.message);
            window.location.href="/dashboard"
          } else {
            toast.error(response?.error ?? "Something went wrong.");
          }
        } catch (error) {
          console.log(error);
          toast.error('Failed To Login!');
        }
      }
    });
  return (
    <div className='bg-dark-1 d-flex justify-content-center align-items-center vh-100'>

      <div className=" login text-center">
        <div className="edit-profile  rounded-5 mt-2">
          <form onSubmit={formik.handleSubmit}>
            <div className="">
              <div className="form-group mb-3">
                <label className="text-white">Email</label>
                <input placeholder="Enter Email" type="email" name='email' className="form-control font_family"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className="text-danger">
                    {formik.errors.email}
                  </p>
                ) : null}
              </div>
              <div className="form-group">
                <label className="text-white">Password</label>
                <div className="position-relative">
                  <input placeholder="Enter Password" name='password' className="bg-transparent form-control font_family"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <p className="text-danger">
                    {formik.errors.password}
                  </p>
                ) : null}

              </div>

              <div className='mt-3'>
                <button type="submit" className="cursor-pointer btn btn-default shadow-0 py-2 w-100" >
                  <span className="text-gradient">Login</span> </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

