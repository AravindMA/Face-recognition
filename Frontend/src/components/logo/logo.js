import React from 'react';
import Tilt from 'react-tilt';
import './logo.css';
import Brain from './brain.png';

const Logo=()=>{
	return(
      <div className='ma3 mt0'>
        <Tilt className="Tilt br2 shadow-2" options={{ max :55 }} style={{ height: 150, width: 150 }} >
			 <div className="Tilt-inner"><img style={{paddingTop:'18px',width:'75%'}} alt='logo' src={Brain}/></div>
		</Tilt>
      </div>
		)
}

export default Logo;