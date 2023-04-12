import React, { useEffect, useState } from 'react'
import profile from "../../images/image.jpeg";
import "../../assets/billing_styles.css";
import "../../assets/bootstrap.min.css";
const Billing_Insurance = () => {
  const [activeDiv, setActiveDiv] = useState(1);

  const handleClick = (divNumber) => {
    setActiveDiv(divNumber);
  };
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const getActiveClass = (divNumber) => {
    return activeDiv === divNumber ? 'active' : '';
  };
  
  const SubmitForm = (event) =>{
      event.preventDefault();
  }
  

  return (
    <div>
      <div className="container">

        <br />  <p className="text-center">Choose the more preffered mode of payment</p>
          <hr />

            <div className="row">

              <aside className="col-sm-6">
                <h2><p>Service payment</p></h2>
              <article className="card" id="card">
                <div className="card-body p-5">

                  <ul className="nav bg-light nav-pills rounded nav-fill mb-3" role="tablist">
                    <li className="nav-item">
                      <a className={`nav-link ${getActiveClass(1)}`} data-toggle="pill" onClick={() => handleClick(1)}>
                        <i className="fa fa-credit-card"></i> Credit Card</a></li>
                    <li className="nav-item">
                      <a className={`nav-link ${getActiveClass(2)}`} data-toggle="pill" onClick={() => handleClick(2)}>
                        <i className="fab fa-paypal"></i>  Paypal</a></li>
                    <li className="nav-item">
                      <a className={`nav-link ${getActiveClass(3)}`} data-toggle="pill"  onClick={() => handleClick(3)}>
                        <i className="fa fa-university"></i>  Bank Transfer</a></li>
                    <li className="nav-item">
                      <a className={`nav-link ${getActiveClass(4)}`} data-toggle="pill" onClick={() => handleClick(4)}>
                      <img src={profile} alt=""   id='mpesa-icon'/> Mpesa</a></li>
                  </ul>

                  <div className="tab-content">
                    {activeDiv === 1 && (<div className="tab-pane fade show active" id="nav-tab-card">
                      {error && (<p className="alert alert-success">Some text success or error</p>)}
                      <form role="form">
                        <div className="form-group">
                          <label >Full name (on the card)</label>
                          <input type="text" className="form-control" name="username" placeholder="" required="" />
                          {/* </form> */}
                        </div> 
                        <div className="form-group">
                          <label >Card number</label>
                          <div className="input-group">
                            <input type="text" className="form-control" name="cardNumber" placeholder=""/>
                              <div className="input-group-append">
                                <span className="input-group-text text-muted">
                                  <i className="fab fa-cc-visa"></i>   <i className="fab fa-cc-amex"></i>
                                  <i className="fab fa-cc-mastercard"></i>
                                </span>
                              </div>
                            </div>
                        </div> 

                        <div className="row">
                          <div className="col-sm-8">
                            <div className="form-group">
                              <label><span className="hidden-xs">Expiration</span> </label>
                              <div className="input-group">
                                <input type="number" className="form-control" placeholder="MM" name="" />
                                  <input type="number" className="form-control" placeholder="YY" name="" />
                                  </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                              <div className="form-group">
                                <label data-toggle="tooltip" title="" data-original-title="3 digits code on back side of the card">CVV <i className="fa fa-question-circle"></i></label>
                                <input type="number" className="form-control" required="" />
                                </div> 
                            </div>
                          </div> 
                          <button className="subscribe btn btn-primary btn-block" type="button"> Confirm  </button>
                      </form>
                    </div> )}
                   {activeDiv === 2 && (<div className="tab-pane fade show active" id="nav-tab-paypal">
                      <p>Paypal is easiest way to pay online</p>
                      <p>
                        <button type="button" className="btn btn-primary"> <i className="fab fa-paypal"></i> Log in my Paypal </button>
                      </p>
                      <p><strong>Note:</strong>You will be redirected to official Paypal page to pay </p>
                    </div>)}
                    {activeDiv === 3 && (<div className="tab-pane fade show active" id="nav-tab-bank">
                      <p>Bank accaunt details</p>
                      <dl className="param">
                        <dt>BANK: </dt>
                        <dd> THE WORLD BANK</dd>
                      </dl>
                      <dl className="param">
                        <dt>Accaunt number: </dt>
                        <dd> 12345678912345</dd>
                      </dl>
                      <dl className="param">
                        <dt>IBAN: </dt>
                        <dd> 123456789</dd>
                      </dl>
                      <p><strong>Note:</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. </p>
                    </div>)}
                    {activeDiv === 4 &&(<div className="tab-pane fade show active" id="nav-tab-mpesa">
                    {/* <p className="alert alert-success ">Some text success or error</p> */}
                      <form role="form">
                        <div className="form-group">
                          
                          <label >Full name : </label>
                          <input type="text" className="form-control" name="username" placeholder="" required="" />                          
                        </div> 

                        <div className="form-group">
                          <label >Phone number</label>
                          <div className="input-group">
                            <input type="text" className="form-control" name="phoneNumber" placeholder=""/>                              
                            </div>
                        </div> 
                        <div className="form-group">
                          <label >Amount</label>
                          <div className="input-group">
                            <input type="text" className="form-control" name="Amount" placeholder=""/>                              
                            </div>
                        </div> 
                        <div className="row">
                        <button className="subscribe btn btn-primary btn-block" type="button"> Confirm  </button>
                        </div> 
                          
                      </form>
                    </div>)}
                  </div> 
                </div> 
              </article>
            </aside> 
            <aside className="col-sm-6">
              <h3><p>Always~by~your~side😊</p></h3>
            <article className="card">
              <div className="card-body p-5" id="container-image">
                <img src={profile} alt=""  id="image-card" />
                </div>
            </article>
          </aside>
        </div> 

    </div>
    <article className="bg-secondary" id="footer-article">
        <div className="card-body text-center">

          <h3 className="text-white mt-3">Thank you for choosing medicare hospitals , we value your trust <img src="https://em-content.zobj.net/thumbs/120/apple/354/smiling-face-with-smiling-eyes_1f60a.png" alt=""  /></h3>
        </div>

      </article>

    </div>
  )
}

export default Billing_Insurance;