import {Component} from 'react'
import {motion} from 'framer-motion'
import './Card_Form_css.css'
import {Link} from 'react-router-dom'
import Modal from './Modal'
import {updateCardNumber,
    updateCVV,
    updateCardExp,
    updateCardName,
    triggerFlip,
    restoreFlip
} from './functions'

class Card_Form extends Component{
    state={
        showModal: false,
        err: '',
        looped: false
    }

    // state changing method for showModal, change it to the its oppsing state on called
    changeModalstate = () =>{
        if(this.state.showModal === false){
            this.setState({
              showModal: true,
              looped: true
            })
          }else{
            this.setState({
              showModal: false,
              looped: true
            })      
          }     
    }

    render(){
        if(this.props.match.url === '/retry' && this.state.showModal === false && this.state.looped === false)this.setState({showModal: true, err:  'Invalid credit details'}) 
        return(
            <div className='container'>
                <Modal showModal={this.state.showModal} changeState={this.changeModalstate} info={this.state.err} />
                <div className='card'>
                    
                    <div id='flip' className='flip'>

                        <div className='front'>
                            <div className='brand'></div>
                            <div className='sim'>
                                <img Style='width:75px; height: 55px;' src={require('../imgs/card_sim.png').default}/>
                            </div>
                            <div className='card-number'>
                                <p id='card-number#1' Style='margin-top: 5px; margin-left: 15px; font-size: 27px;'></p>&nbsp;&nbsp;&nbsp;
                                <p id='card-number#2' Style='margin-top: 5px; margin-left: 15px; font-size: 27px;'></p>&nbsp;&nbsp;&nbsp;
                                <p id='card-number#3' Style='margin-top: 5px; margin-left: 15px; font-size: 27px;'></p>&nbsp;&nbsp;&nbsp;
                                <p id='card-number#4' Style='margin-top: 5px; margin-left: 15px; font-size: 27px;'></p>&nbsp;&nbsp;&nbsp;
                            </div>
                            <div className='card-name'>
                                <p Style='margin-top: 5px; font-size: 12px; color: grey; margin-left: 10px'>Card Holder</p>
                                <p id='card-name-display' Style='margin-top: -10px; font-size: 15px; margin-left: 10px'></p>
                            </div>         
                            <div className='card-exp'>
                                <p Style='margin-top: 5px; font-size: 12px; color: grey; margin-left: 2px'>Expires</p>
                                <p id='card-exp-display' Style='margin-top: -5px;'>MM/YY</p>
                            </div>       
                        </div>
                                        
                        <div className='back'>
                            <div className='black_banner'></div>
                            <div className='brand'></div>
                            <div className='cvv_display'>
                                <p>CVV</p>
                                <div className='white_banner'>
                                    <p id='card-cvv-display' Style='padding-top: 10px;font-size: 20px; margin-right: 10px; color: black'></p>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

                <motion.form action='http://localhost:3001/add_new_card' method='POST' className='form'
                    initial = {{ opacity: 0, y: -300, scale: 0.1}}
                    animate = {{ opacity: 1, y: 0 , scale: 1}}
                    transition = {{ duration: 1}}
                >
                    <div className='input_field'>
                        <div className='headers' Style='padding-left: 0%'>
                            <label>Card Number</label>
                        </div>
                        <input id='card_number' name='number' type='text' onChange={updateCardNumber} maxLength='16'/>                        
                    </div>
                    <br/>
                    <div className='input_field'>
                        <div className='headers' Style='padding-left: 0%'>
                            <label>Card Name</label>
                        </div>
                        <input id='card_name' name='holder' type='text' onChange={updateCardName}/>                   
                    </div>

                    <br/>
                    <br/>

                    <div className='headers'> 
                        <div Style='width: 75%'>
                            <label>Expiration Date</label>
                        </div>
                        
                        <div Style='width: 25%'>
                            <label>CVV</label>
                        </div>
                        
                    </div>

                    <div className='expire_date_and_cvv'>
                  
                        <div className='exp_month'>
                            <select id='exp_month' name='month' Style='width: 90%; border: 1px solid rgb(219, 216, 223); height: 35px;' size="1" 
                                onChange={updateCardExp}
                            >
                                <option value="MM">Month</option>
                                <option value="Jan">January</option>
                                <option value="Feb">February</option>
                                <option value="Mar">March</option>
                                <option value="Apr">April</option>
                                <option value="May">May</option>
                                <option value="Jun">June</option>
                                <option value="Jul">July</option>
                                <option value="Aug">August</option>
                                <option value="Sep">September</option>
                                <option value="Oct">October</option>
                                <option value="Nov">November</option>
                                <option value="Dec">December</option>
                            </select>
                        
                        </div>

                        <div className='exp_year'>
                            <select id='exp_year' name='year' Style='width: 90%; border: 1px solid rgb(219, 216, 223); height: 35px;' size="1" 
                                onChange={updateCardExp}
                            >
                                <option value="YY">Year</option>
                                <option value="21">2021</option>
                                <option value="22">2022</option>
                                <option value="23">2023</option>
                                <option value="24">2024</option>
                                <option value="25">2025</option>
                                <option value="26">2026</option>
                                <option value="27">2027</option>
                                <option value="28">2028</option>
                                <option value="29">2029</option>
                                <option value="30">2030</option>
                                <option value="31">2031</option>
                            </select>                            
                            
                        </div>

                        
                        <div className='CVV'>
                            <input id='card_cvv' name='cvv' type='text' onChange={updateCVV} onFocus={triggerFlip} onBlur={restoreFlip}></input>
                        </div>
                    </div>

                    
                    <button type='Submit' className='submit_btn' >Submit</button>
                    
                    
                    <Link  to={'/'}> 
                        <button className='back_btn'>Back</button>
                    </Link> 
                </motion.form>

            </div>

        );
    }

}

export default Card_Form;