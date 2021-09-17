import {Component} from 'react'
import {Link} from 'react-router-dom'
import './Error_page_css.css'


class Error_page extends Component{

    render(){

        return(
            <div className='error_form'>
                <img Style='margin-top: -50px; margin-left: 15px; width: 450px; height: 400px;' src={require('../imgs/error.gif').default} />
                <Link to={'/'}>
                    {/* css for back_btn is located in card_form_css */}
                    <button className='back_btn'>Send me back home</button>
                </Link>
            </div>
        )
    }
}

export default Error_page;