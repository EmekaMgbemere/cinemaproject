import React from "react";
import visaicon from '../images/visaicon.png'
import mastercardicon from '../images/mastercardicon.png'
    

function Footer(){
    return(
    <div className="">
        <div className="emfooter">
            <footer>
                <div className="row emfooterrow">
                    <div className="col emfootercol list-group">
                        <h5 className="emfooterh5">Product</h5>
                           <ul>
                                <li>Key Features</li>
                                <li>Pricing</li>
                                <li>Event Ticketing</li>
                                <li>Booking</li>
                                <li>Online Promotion</li>
                                <li>Developers</li>
                            </ul>
                    </div>
                    <div className="col emfootercol list-group">
                        <h5 className="emfooterh5">Explore More</h5>
                        <ul>
                            <li>How It Works</li>
                            <li>Download App</li>
                            <li>Event Promoter</li>
                            <li>Sell Tickets</li>
                            <li>Event Organiser</li>
                            <li>Nonprofits & Fundraisers</li>
                        </ul>
                    </div>
                    <div className="col emfootercol list-group">
                        <h5 className="emfooterh5">Connect With Us</h5>
                        <ul>
                            <li>Customer Support</li>
                            <li>Download App</li>
                            <li>Event Promoter</li>
                            <li>{" "}<i className="fa-brands fa-facebook pr-2"></i>Facebook</li>
                            <li>{" "}<i className="fa-brands fa-square-twitter"></i>Twitter</li>
                            <li>{" "}<i className="fa-brands fa-instagram"></i>Instagram</li>
                        </ul>
                    </div>
                    <div className="col emfootercol list-group">
                        <h5 className="emfooterh5">Payment Available </h5>
                        <div className="empaymenticons">
                            <ul className="empaymenticonsul">
                                <li><img src={visaicon} alt="visaicon"/></li>
                                <li><img src={mastercardicon} alt="mastercardicon"/></li>
                            </ul>
                        </div>
                        <div className="empaymenticons">
                            <ul className="empaymenticonsul">
                                <li><img src={visaicon} alt="visaicon"/></li>
                                <li><img src={mastercardicon} alt="mastercardicon"/></li>
                            </ul>
                        </div>
                        
                    </div>
                </div>
            </footer>
        </div>
    </div>
    );
}

export default Footer;