import React, { useEffect } from 'react'
import "./edit.css"
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import customerService from '../services/customerservice'

const Edit = () => {
  const [data, setdata] = useState()
  let [name, setName] = useState("")
  let [address, setAddress] = useState("")
  let [due, setDue] = useState("")
  let [extra, setExtra] = useState("")

  const navigate = useNavigate();
  const loc = useLocation();
  const id = loc.pathname.split("/")[2]


  useEffect(() => {
    const fetchdata = async () => {
      await customerService.getcustomersById(id)
        .then((response) => {
          console.log(response)
          setdata(response.customer)              
          setAddress(response.customer.address)
          setName(response.customer.name)
          setDue(response.customer.due)
          setExtra(response.customer.extra)
        })
    }
    fetchdata();
  }, [id])

  let nameData = (e) => {
    e.preventDefault();
    setName(e.target.value)
  }

  let addressData = (e) => {
    e.preventDefault();
    setAddress(e.target.value)
  }

  let dueData = (e) => {
    e.preventDefault();
    setDue(e.target.value)
  }
  let extraData = (e) => {
    e.preventDefault();
    setExtra(e.target.value)
  }

  let formHandle = (e) => {
    e.preventDefault()
    let payLoad = { name, address, due, extra }
    customerService.updatecustomer(payLoad, id)
      .then(() => {
        navigate("/")
      })

  }

  return (
    <div>
      <section id='mainform'>

        <form id='edit'>
          {data &&
            <table >
              <caption>Update Details</caption>
              <tr>
                <td><label htmlFor="">Name:</label></td>
                <td><input type="text" placeholder='Enter Name' value={name} onChange={nameData} /></td>
              </tr>
              <tr>
                <td><label htmlFor="">Address:</label></td>
                <td><input type="text" placeholder='Enter Address' value={address} onChange={addressData} /></td>
              </tr>
              <tr>
                <td><label htmlFor="">Due:</label></td>
                <td><input type="number" placeholder='Enter due' value={due} onChange={dueData} /></td>
              </tr>

              <tr>
                <td><label htmlFor="">Deposit:</label></td>
                <td><input type="number" placeholder='Enter extra' value={extra} onChange={extraData} /></td>
              </tr>
  
              <tr>
                <th colSpan="2"><button onClick={formHandle}>Update</button></th>
              </tr>
            </table>
          }
        </form>
      </section>
    </div>
  )
}
export default Edit