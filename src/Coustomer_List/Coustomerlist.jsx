import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import "./coustomerlist.css";
import customerService from '../services/customerservice';

const Coustomerlist = () => {
  let [data, setData] = useState([]);
  let [totalDue, setTotalDue] = useState(0);
  let [totalExtra, setTotalExtra] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [showDue, setShowDue] = useState(false);
  const [showExtra, setShowExtra] = useState(false);

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchdata = async () => {
      const response = await customerService.getcustomers();
      console.log(response.customer);
      const data = response.customer;
      setData(data);
    };
    fetchdata();
  }, []);

  useEffect(() => {
    if (data.length >= 0) {
      let dueSum = 0;
      let extraSum = 0;
      data.forEach((x) => {
        dueSum += parseInt(x.due);
        extraSum += parseInt(x.extra);
      });
      setTotalDue(dueSum);
      setTotalExtra(extraSum);
    }
  }, [data]);

  let deleteData = (index) => {
    customerService.deletecustomer(index);
    const newdata = data.filter(x => x._id !== index);
    setData(newdata);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  let cancle = () => {
    setSearch('');
  };

  let filteredData = data;

  if (showDue) {
    filteredData = filteredData.filter((x) => parseInt(x.due) > parseInt(x.extra));
  } else if (showExtra) {
    filteredData = filteredData.filter((x) => parseInt(x.extra) > parseInt(x.due));
  }

  filteredData = filteredData.filter((x) =>
    x.name.toLowerCase().includes(search.toLowerCase())
  );

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  const pageData = getPageData();

  const dueAmount = () => {
    setShowDue(true);
    setShowExtra(false);
  };

  const extraAmount = () => {
    setShowDue(false);
    setShowExtra(true);
  };

  let sl = currentPage * 5 - 4;

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text('Customer List', 20, 10);
    doc.autoTable({
      head: [['Sl No.', 'Name', 'Address', 'Due', 'Deposit', 'Due/Deposit']],
      body: filteredData.map((x, index) => [
        index + 1,
        x.name,
        x.address,
        x.due,
        x.extra,
        x.extra - x.due > 0 ? `Deposit:${x.extra - x.due}` : `Due:${x.due - x.extra}`,
      ]),
      foot: [
        ['Total', '', '', totalDue, totalExtra, totalExtra - totalDue > 0 ? `Deposit:${parseInt(totalExtra - totalDue)}` : `Due:${parseInt(totalDue - totalExtra)}`],
      ],
    });

    doc.save('customer_list.pdf');
  };

  const generateCustomerPDF = (customer) => {
    const doc = new jsPDF();

    doc.text(`Customer: ${customer.name}`, 20, 10);
    doc.autoTable({
      head: [['Field', 'Value']],
      body: [
        ['Name', customer.name],
        ['Address', customer.address],
        ['Due', customer.due],
        ['Deposit', customer.extra],
        ['Due/Deposit', customer.extra - customer.due > 0 ? `Deposit:${customer.extra - customer.due}` : `Due:${customer.due - customer.extra}`]
      ]
    });

    doc.save(`customer_${customer.name}.pdf`);
  };

  return (
    <div>
      {data && (
        <>
          <input
            id="search"
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
          />
          <span id="span" onClick={cancle}>x</span>
          <section id="table" key={data.id}>
            <table>
              <thead>
                <tr>
                  <th>Sl No.</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Due</th>
                  <th>Deposit</th>
                  <th>Due/Deposit</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pageData.map((x) => (
                  <tr key={x._id}>
                    <td>{sl++}</td>
                    <td>{x.name}</td>
                    <td>{x.address}</td>
                    <td>{x.due}</td>
                    <td>{x.extra}</td>
                    <td>{x.extra - x.due > 0 ? `Deposit:${x.extra - x.due}` : `Due:${x.due - x.extra}`}</td>
                    <td>
                      <button>
                        <Link to={`/edit/${x._id}`}>Edit</Link>
                      </button>
                      <button id="delete" onClick={() => deleteData(x._id)}>Delete</button>
                      <button onClick={() => generateCustomerPDF(x)}>Download PDF</button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3">Total:</td>
                  <td>{totalDue}</td>
                  <td>{totalExtra}</td>
                  <td>{totalExtra - totalDue > 0 ? `Deposit:${parseInt(totalExtra - totalDue)}` : `Due:${parseInt(totalDue - totalExtra)}`}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </section>
        </>
      )}
      <div id="page">
        <button onClick={prevPage} id="prev">
          Previous
        </button>
        <span style={{ fontSize: '20px' }}>
          {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
        </span>
        <button onClick={nextPage} id="next">
          Next
        </button>
      </div>
      <div id="filterdata">
        <button onClick={dueAmount}>Due</button>
        <button onClick={extraAmount}>Extra</button>
      </div>
      <div id="generate-total-pdf">
        <button onClick={generatePDF}>Download Full PDF</button>
      </div>
    </div>
  );
};

export default Coustomerlist;
