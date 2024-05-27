import React, { useState } from 'react'
import "./addcoustomer.css"
import { useNavigate } from 'react-router-dom'
import welcome from "./welcome.png"
import customerservice from '../services/customerservice'
const Addcoustomer = () => {
    let [name, setName] = useState()
    let [address, setAddress] = useState()
    let [due, setDue] = useState()
    let [extra, setExtra] = useState()

    const payload = { name, address, due, extra }

    const navigate = useNavigate();
    const submit = async (e) => {
        e.preventDefault();
        console.log(payload)
        await customerservice.createcustomer(payload);
        navigate("/customerlist")
    }
    return (
        <div id='addcust'>
            <marquee behavior="" direction="" id='h2'><h2> <img src={welcome} alt="" />Welcome <img src={welcome} alt="" /></h2></marquee>
            <section id='mainform'>
                <div>
                    <form action="">
                        <span>Name:</span><input type="text" placeholder='Enter Name' value={name} onChange={(e) => { setName(e.target.value) }} />
                        <span>Address:</span><input type="text" placeholder='Enter Address' value={address} onChange={(e) => { setAddress(e.target.value) }} />
                        <span>Due:</span><input type="number" placeholder='Enter Amount' value={due} onChange={(e) => { setDue(e.target.value) }} />
                        <span>Deposit:</span> <input type="number" placeholder='Enter Amount' value={extra} onChange={(e) => { setExtra(e.target.value) }} />
                        <button onClick={submit}>Submit</button>
                    </form>
                </div>
            </section>
        </div>
    )
}
export default Addcoustomer