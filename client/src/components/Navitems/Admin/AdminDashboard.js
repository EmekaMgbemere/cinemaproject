import React , { useState } from 'react';
import Adminleftnav from './Adminleftnav';
import Admintopnav from './Admintopnav';
import Admininfo from './Admininfo';
import Footer from "../Footer";



function AdminDashboard() {

    const [loading, setLoading] = useState(true);

      fetch('http://localhost:3000/cinema')
        .then(response => response.json())
        .then(data => {setLoading(false);})
        .catch(error => {console.error('Error fetching data:', error);setLoading(false);
        });
  
    if (loading) {
      return <p>Loading...</p>;
    }
  

  return (
  <>
    <div className='emadmindash '>
          <div >
            <Admintopnav />
          </div>
        <div className='emaddashsmright'>
              <div className='' >
                <Adminleftnav />
              </div>
              <div>
                  <Admininfo />
              </div>
        </div>
   </div>
   <div>
    <Footer />
  </div>
</>
  );
}

export default AdminDashboard;

