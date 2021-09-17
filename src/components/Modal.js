import {Component} from 'react'
import {Link} from 'react-router-dom'
import './Modal_css.css'

//props for this component: showModal (on/off) , changeState(setter method for modal state), info (message tp display)
class Modal extends Component{

    render(){
        return(
            <>
                {this.props.showModal ? (

                    <div className='modal_wrapper'>
                        <div className='modal_banner'> Error </div>
                        <div className='modal_content'>
                            <p Style='margin-top: -50px; height: 50px'>Error : {this.props.info} <br/> If you think you should not be receving this error please contact our staff</p>
                         
                            <button className='modal_button' onClick={this.props.changeState}> OK </button>
                        </div>
                    </div>

                ) : null}
            </>
        )
    }
}

export default Modal;