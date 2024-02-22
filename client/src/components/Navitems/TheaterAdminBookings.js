import React, { useEffect, useState, useCallback } from 'react';
import Admintopnav from "./Admin/Admintopnav";
import DataTable from "react-data-table-component";
import { BiChevronUp } from "react-icons/bi";
import dayjs from "dayjs";
import TheaterAdminleftnav from './TheaterAdminleftnav';

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

export default function TheaterAdminBookings() {
const [search, setSearch] = useState("");
const [filDat, setFilDat] = useState([]);
// const [user, setUser] = useState([]);
const [book, setTBook] = useState([]);


useEffect(() => {
fetch('http://localhost:6969/theateradminbookings')
.then(res => res.json())
.then(data => {  
                setTBook(data.theaterid);
                const filteredMovies = data.filter(cin => cin.theaterID === book);
                setFilDat(filteredMovies);
              })
              .catch(error => {
                console.error('Error fetching data:', error);
              });
}, [book]);

const columns = [
  {
  name: "ID",
  selector: (row) => row._id,
  sortable: true,
  },
  {
  name: "PRICE",
  selector: (row) => row.price,
  sortable: true,
  },
  {
  name: "MOVIETIME",
  selector: (row) => row.movietime,
  sortable: true,
  },
  {
  name: "MOVIETITLE",
  selector: (row) => row.movietitle,
  sortable: true,
  },
  {
  name: "THEATER",
  selector: (row) => row.theater,
  sortable: true,
  }
  ];

const filteredData = filDat.filter((row) =>
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
          <TheaterAdminleftnav />
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
        </div>
    </div>
    
</div>
</>
);
}

