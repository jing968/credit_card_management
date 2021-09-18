import {Component} from 'react'
import {Link} from 'react-router-dom'
import Mini_card from './Mini_card'
import './Home_css.css'

class Home extends Component{
    _loaded_cards = false;
    state={
        cards: [],
    }
    
    // fetching cards info from get_cards end point
    fetch_info(){
        let children = [];
        fetch('http://18.218.241.66/server/get_cards/').then(res => res.json()).then(data => {
            if(!this._loaded_cards){
                for(let i = 0; i <data.length;i ++){
                    children.push(
                        <Mini_card id={data[i].id} number={data[i].card_number} month={data[i].month} year={data[i].year} />
                    );
                }
                this.setState({
                    cards: children
                })
                this._loaded_cards = true;
                if(this.props.match.url === '/added') alert('Successfully added new card');
                else if(this.props.match.url === '/updated') alert('Successfully updated card details');
            }

        
        }).catch(err => console.log(err));
        
    }

    // build the card display accordingly to fetched result
    build_card_display(){
        return this.state.cards;
    }

    render(){
        this.fetch_info();

        return(
            <div className='body'>
                <div className='top_banner'>
                    <Link Style='text-decoration: none' to={'/'}>
                        <label className='heading'>Your Cards</label>
                    </Link>
                </div>
                
                <div id='display' className='cards_display'>
                    {this.build_card_display()}
                    <Link to={'/new'} className='new_card'>
                        <img Style='width: 150px; height: 150px; margin: auto' src={require('../imgs/add.png').default}/>
                    </Link>
                </div>

            </div>
        )
    }
}

export default Home;