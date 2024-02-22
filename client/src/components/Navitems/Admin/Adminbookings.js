import React, { useEffect, useState } from 'react';
import Admintopnav from "../../Navitems/Admin/Admintopnav";
import DataTable from "react-data-table-component";
import { BiChevronUp } from "react-icons/bi";
import Adminleftnav from "./Adminleftnav";
import dayjs from "dayjs";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

export default function Adminbookings() {
const [search, setSearch] = useState("");
const [paymentData, setPaymentData] = useState([]);
const [adminBooking, setAdminBooking] = useState("");


const columns = [
{
name: "ID",
selector: (row) => row.transaction_id,
sortable: true,
},
{
name: "PAYMENT REF",
selector: (row) => row.tx_ref,
sortable: true,
},
{
name: "Amount",
selector: (row) => row.amount,
sortable: true,
},
{
name: "EMAIL",
selector: (row) => row.customer.email,
sortable: true,
},
{
name: "CUSTOMER NAME",
selector: (row) => row.customer.name,
sortable: true,
},
{
name: "PHONE NUMBER",
selector: (row) => row.customer.phone_number,
sortable: true,
},

{
name: "DATE AND TIME",
selector: (row) => row.created_at,
sortable: true,
},
];

useEffect(() => {
fetch('http://localhost:6969/flutterpayment')
.then(res => res.json())
.then(data => {setPaymentData(data);})
.catch(error => console.error('Error fetching payments:', error));
}, []);

useEffect(() => {
    fetch('http://localhost:6969/theateradminbookings')
    .then(res => res.json())
    .then(data => { setAdminBooking(data)})
    }, []);

const filteredData = paymentData.filter((row) =>
columns.some((column) => {
const value = column.selector(row);
return (
typeof value === "string" &&
value.toLowerCase().includes(search.toLowerCase())
);
})
);


return (
<>
<div >
    <div>
        <Admintopnav />
    </div>
    <div className='d-flex'>
        <div>
          <Adminleftnav />
        </div>
        <div style={{"width": "90vw"}} >
         <DataTable
                        columns={columns}
                        data={filteredData}
                        selectableRows
                        sele
                        defaultSortFieldId={1}
                        sortIcon={<BiChevronUp />}
                        pagination
                        fixedHeader
                        fixedHeaderScrollHeight="300px"
                        highlightOnHover
                        subHeader
                        subHeaderComponent={
                        <input
                        type="text"
                        placeholder="Search Here"
                        className="w-25 form-control"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        />
                        }
                />
                <div>
                    <p>THEATER BOOKING</p>
                    <table className="table mx-2"
                      border={"1px"}
                    >
                        <thead>
                                <tr>
                                    <th >Theater Price</th>
                                    <th >Theater userType</th>
                                    <th >Theater Movietitle</th>
                                    <th >Theater Movietime</th>
                                    <th >Theater </th>
                                </tr>
                        </thead>
                          <tbody>
                              {
                                  adminBooking && adminBooking.map((thea, id) => {
                                      return (
                                          <tr key={id}>
                                              <td >{thea.price}</td>
                                              <td >{thea.userType}</td>
                                              <td >{thea.movietitle}</td>
                                              <td >{thea.movietime}</td>
                                              <td >{thea.theater}</td>
                                          </tr>
                                      )
                                  })
                                }
                            </tbody>
                    </table>
                </div>
        </div>

    </div>
    
</div>
</>
);
}

