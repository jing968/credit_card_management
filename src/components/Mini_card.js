import {Component} from 'react'
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'
import './Mini_card_css.css'

// props for this component : id, number, month, year
class Mini_card extends Component{

    render(){

        return(
            <motion.div id={this.props.id} 
                className='display_element' 
                initial = {{ scale:0, opacity:0}}
                animate = {{ scale:1, opacity:1}}
                transition = {{duration: 0.5}}
                whileHover= {{ scale: 1.03}}
            >
                <img className='remove' src={require('../imgs/remove.png').default}  onClick={() => {
                    if(window.confirm('Are you sure you want to remove this credit card')){
                        fetch(`http://localhost:3001/delete=${this.props.id}`).then(res => res.json()).then(data => console.log(data));
                        { var item = document.getElementById(`${this.props.id}`); item.parentNode.removeChild(item) ; alert('Successfully removed the chosen card')}      
                    }
                }} />
                <img className='mini_sim' src={require('../imgs/card_sim.png').default} />
                <Link to={`/edit=${this.props.id}`}>
                    <img className='edit' src={require('../imgs/edit.png').default} />
                </Link>
                <div className='mini_number'>
                    <p id='mini-number#1'> {this.props.number.toString().substring(0,4)}</p>&nbsp;&nbsp;
                    <p id='mini-number#2'> {this.props.number.toString().substring(4,8)}</p>&nbsp;&nbsp;
                    <p id='mini-number#3'> {this.props.number.toString().substring(8,12)}</p>&nbsp;&nbsp;
                    <p id='mini-number#4'> {this.props.number.toString().substring(12,16)}</p>&nbsp;&nbsp;                    
                </div>

                <div className='mini_exp'>
                    <p>Expiration date &nbsp;: &nbsp;</p>
                    <p>{this.props.month}&nbsp;/&nbsp;{this.props.year}</p>
                </div>
            </motion.div>
        )
    }
}

export default Mini_card;