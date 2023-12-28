import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import axios from 'axios';
import { downloadCSV } from '../../utils/common';

export default function Listusers() {
    const [items, setItems] = useState([]);
    const getUsers = async () => {
        try {
          let response = await axios.get(`http://localhost:8007/api/client/getusers?exportRequest=false`);
          console.log(response.data.data.items);
          if (response.status === 200) {
            setItems(response.data.data.items);
          } else {
            toast.error("Failed to fetch data!");
          }
        } catch (error) {
          toast.error("Something went wrong!");
        }
      };

      useEffect(() => {
        getUsers();
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
    <div className='container'>
          <div className='col-md-1'>
        <button className='btn btn-default new-btn mt-3 btn-width' onClick={downloadUsersCsv}>
              <span className='text-gadient'>Export </span>
            </button>
        </div>
            <div>
            <table class="table table-dark border border-1">
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
             
              {items.map((item,index)=>{
        return(
          <tbody>
                        <tr>
                            <td scope="row">{index+1}</td>
                            <td>{item.firstname}</td>
                            <td>{item.lastname}</td>
                            <td>{item.email}</td>
                            <td>{item.fathername}</td>
                            <td>{item.age}</td>
                            <td>{item.city}</td>
                            <td>{item.pincode}</td>
                        </tr>
                  </tbody>
              )})}
                    </table>
                        </div>
  </div>
  )
}
