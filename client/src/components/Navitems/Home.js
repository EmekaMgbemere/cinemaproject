import React from 'react'
import Footer from './Footer';
import Nav from './Nav';
import homeimage2 from '../images/homeimage2.gif'
import downloading2 from '../images/downloading2.gif'

export default function Home() {

  return (
    <div className='emhome'>
      <Nav />
        <div className='emhomediv2 embackgroundimage'>
              <div className='emhomediv22'>
                <p className='emhomep1'>Unlimited movies, TV shows, and more.</p>
                <p className='emhomep2'>Watch anywhere. Cancel anytime.</p>
                <a href="/movies" target="_blank"> <button className='emhomep2button' > Proceed to Movie Page</button></a>
              </div>
        </div>
        <hr className='emhr'/>
            <div className='emhomediv2'>
              <div className='emhomediv22'>
                <p className='emhomep1'>Enjoy On Any Device.</p>
                <p className='emhomep2'>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
              </div>
              <div className='emhomediv23'>
              <img src={homeimage2} alt="home" className="img-responsive" width='80%' height='90%' />
              </div>
            </div>
            <hr className='emhr'/>
            <div className='emhomediv2'>
              <div className='emhomediv23'>
                <img src={downloading2} alt="home" className="img-responsive" width='85%' height='90%' />
              </div>
                <div className='emhomediv22'>
                  <p className='emhomep1'> 
                  Download your shows to watch offline.
                    </p>
                    <p className='emhomep2'>
                    Save your favorites easily and always have something to watch.
                    </p>
                </div>
            </div>
            <hr className='emhr'/>
        <Footer />
    </div>
  );
}


// import React from 'react'
// import Footer from './Footer';
// import Nav from './Nav';
// import homeimage2 from '../images/homeimage2.gif'
// import downloading2 from '../images/downloading2.gif'

// export default function Home() {

//   return (
//     <div className='emhome'>
//       <Nav />
//         <div className='emhomediv2 embackgroundimage'>
//               <div className='emhomediv22'>
//                 <p className='emhomep1'>Unlimited movies, TV shows, and more.</p>
//                 <p className='emhomep2'>Watch anywhere. Cancel anytime.</p>
//                 <a href="/location" target="_blank"> <button className='emhomep2button' > Proceed to Movie Page</button></a>
//               </div>
//         </div>
//         <hr className='emhr'/>
//             <div className='emhomediv2'>
//               <div className='emhomediv22'>
//                 <p className='emhomep1'>Enjoy On Any Device.</p>
//                 <p className='emhomep2'>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
//               </div>
//               <div className='emhomediv23'>
//               <img src={homeimage2} alt="home" className="img-responsive" width='80%' height='90%' />
//               </div>
//             </div>
//             <hr className='emhr'/>
//             <div className='emhomediv2'>
//               <div className='emhomediv23'>
//                 <img src={downloading2} alt="home" className="img-responsive" width='85%' height='90%' />
//               </div>
//                 <div className='emhomediv22'>
//                   <p className='emhomep1'> 
//                   Download your shows to watch offline.
//                     </p>
//                     <p className='emhomep2'>
//                     Save your favorites easily and always have something to watch.
//                     </p>
//                 </div>
//             </div>
//             <hr className='emhr'/>
//         <Footer />
//     </div>
//   );
// }
