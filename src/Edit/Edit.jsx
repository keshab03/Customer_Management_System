import React, { useEffect } from 'react'
import "./edit.css"
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import backicon from "./back-icon.png"
import customerService from '../services/customerservice'

const Edit = () => {
  const [data, setdata] = useState("")
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
        navigate("/customerlist")
      })

  }

  return (
    <div>
      <section id='editform'>
        {data &&
          <form id='edit'>
            <Link to="/customerlist" style={{color:'white'}}>
              <img src={backicon} alt="" style={{ paddingRight: '345px' }} />
            </Link>
            <h3>Update Details</h3>
            <span htmlFor="">Name:</span>
            <input type="text" placeholder='Enter Name' value={name} onChange={nameData} />
            <span htmlFor="">Address:</span>
            <input type="text" placeholder='Enter Address' value={address} onChange={addressData} />
            <span htmlFor="">Due:</span>
            <input type="number" placeholder='Enter Amount' value={due} onChange={dueData} />
            <span htmlFor="">Deposit:</span>
            <input type="number" placeholder='Enter Amount' value={extra} onChange={extraData} />
            <button onClick={formHandle}>Update</button>
          </form>
        }
      </section>
    </div>
  )
}
export default Edit
