import React, { useEffect, useState } from 'react';
import Nav from "../Navitems/Nav";
import Footer from "../Navitems/Footer";
import DataTable from "react-data-table-component";
import { BiChevronUp } from "react-icons/bi";
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
name: "DATE AND TIME",
selector: (row) => row.created_at,
sortable: true,
},

];

useEffect(() => {
fetch('http://localhost:6969/flutterpayment')
.then(res => res.json())
.then(data => {setPaymentData(data); setAdminBooking(data.length)})
.catch(error => console.error('Error fetching payments:', error));
}, []);


localStorage.setItem("adminBooking", adminBooking)

const loginId = localStorage.getItem("userId");

const filteredData = paymentData.filter((row) => row.UserId === loginId);



return (
<>
<div className=''>
    <div>
        <Nav />
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
        <Footer />
    </div>
</div>
</>
);
}

