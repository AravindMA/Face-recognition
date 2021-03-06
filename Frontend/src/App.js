import React,{Component} from 'react';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';
import 'tachyons';

const particlesOptions={
  particles:{
    number:{
      value:300,
      density:{
        enable:true,
        value_area:800
      }
    }
  }
}
const app = new Clarifai.App({apiKey: '8090e83e40fb4759b0f995f95dcc6a3c'});

const initialState={
      input:'',
      imageUrl:'',
      box: {},
      route:'SignIn',
      isSignedIn:false,
      user:{
        id:'',
        name: '',
        email:'',
        entries:0,
        joined: ''
      }

class App extends Component {
  constructor(){
    super();
    this.state=initialState;
    }
  }
  loadUser=(data)=>{
    this.setState({user:{
      id:data.id,
      name: data.name,
      email:data.email,
      entries:data.entries,
      joined: data.joined
    }})
  }
  claculateFaceLocation=(data)=>{
    const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
    const image= document.getElementById('inputimage');
    const width=Number(image.width);
    const height=Number(image.height);
    return{
      leftCol: clarifaiFace.left_col*width,
      topRow: clarifaiFace.top_row*height,
      rightCol:width-(clarifaiFace.right_col*width),
      bottomRow:height-(clarifaiFace.bottom_row*height)
    }
  }
   onButtonSubmit=()=>{
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input).then(response=>{
      if(response){
        fetch('http://localhost:3001/image',{
        method:'put',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          id:this.state.user.id
      })
      }).then(response=>response.json()).then(count=>{
        this.setState(Object.assign(this.state.user,{entries:count}))
      })
    }
    this.displayFaceBox(this.claculateFaceLocation(response))
    })
    .catch(err=>console.log(err));
  }
  onRouteChange=(route)=>{
    if(route==='SignOut'){
      this.setState(initialState);
    }
    else if(route==='home') {
      this.setState({isSignedIn:true});
    }
    this.setState({route:route});
  }

  displayFaceBox=(box)=>{
    this.setState({box: box});
  }
  
   onInputChange=(event)=>{
    this.setState({input: event.target.value});
   }

  render(){
    const {isSignedIn,box,imageUrl,route}=this.state;
   return( 
    <div className="App">
       <Particles className='particles' 
        params={particlesOptions}
       />
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/> 
       {route==='home'?
          <div>
            <Logo /> 
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm  onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition box={box} imageUrl={imageUrl} />
           </div>
          :(route==='SignIn'?
              <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>:
              <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>)
        }    
    </div>
   );
  }
}   
 

export default App;
