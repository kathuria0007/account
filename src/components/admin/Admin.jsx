import React, { useState ,useEffect} from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as Yup from 'yup';

export default function admin() { 
    function handleaddwork()
    {
            window.location.href='addwork';
    }
  return (
    <div>
            <button className='btn btn-default new-btn mt-3 btn-width py-2 mx-2' onClick={handleaddwork}>
            <span className='text-black'>Add Work for labour</span>
        </button>

        <button className='btn btn-default new-btn mt-3 btn-width py-2 mx-2'>
            <span className='text-black'>Get Work of labours</span>
        </button>
        </div>
    )
}
