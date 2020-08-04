import React from 'react';

const ImageLinkForm=({onInputChange,onButtonSubmit})=>{
	return(
		<div>
		 <p className='f3'>
		   {'This will recognize face.Give it a try'}
		 </p>
		 <div className='centre'>
		   <div className=' pa4 br3 shadow-5'>
		   <input placeholder='enter the url...' className='f4 pa2 w-70  ' type='text' onChange={onInputChange}/>
		   <button className='w-30 grow  f4 link ph2 pv2 centre dib white bg-purple' onClick={onButtonSubmit}>DETECT</button>
           </div>
		 </div> 
		</div>
     
		)
}

export default ImageLinkForm;