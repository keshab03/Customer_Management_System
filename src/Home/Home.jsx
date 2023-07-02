import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./home.css"
import logo from "./km-Logo.png"
import customerService from '../services/customerservice'
const Home = () => {
  let [data, setData] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await customerService.getcustomers()
      console.log(response.customer)
      const data = response.customer
      setData(data);
    }
    fetchdata();

  }, [data])

  return (
    <section id='nav'>
      <img src={logo} alt="" />
      <Link to="/addcoustomer">Add New Customer</Link>
      <Link to="/customerlist">Customer List</Link>
      <p style={{color:'white'}}>Profile {data.length}</p>
    </section>
  )
}
export default Home
