import React, { useEffect, useState } from 'react';
import Admintopnav from "../../Navitems/Admin/Admintopnav";
import DataTable from "react-data-table-component";
import { BiChevronUp } from "react-icons/bi";
import Adminleftnav from "./Adminleftnav";
import dayjs from "dayjs";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';


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
                    <Table className="table"
                      border={"1px"}
                    >
                        <Thead>
                                <Tr>
                                    <Th >Theater Price</Th>
                                    <Th >Theater userType</Th>
                                    <Th >Theater Movietitle</Th>
                                    <Th >Theater Movietime</Th>
                                    <Th >Theater </Th>
                                </Tr>
                        </Thead>
                          <Tbody>
                              {
                                  adminBooking && adminBooking.map((thea, id) => {
                                      return (
                                          <Tr key={id}>
                                              <Td className='p-2'>{thea.price}</Td>
                                              <Td className='p-2'>{thea.userType}</Td>
                                              <Td className='p-2'>{thea.movietitle}</Td>
                                              <Td className='p-2'>{thea.movietime}</Td>
                                              <Td className='p-2'>{thea.theater}</Td>
                                          </Tr>
                                      )
                                  })
                                }
                            </Tbody>
                    </Table>
                </div>
        </div>

    </div>
    
</div>
</>
);
}

