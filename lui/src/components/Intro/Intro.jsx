import React, { Component } from 'react';
import backDrop from './backdrop2.png';
import './Intro.css';
import { css } from 'glamor';
import glamorous from 'glamorous'
import { withStyles } from '@material-ui/core/styles';
import Particles from 'react-particles-js';
import { Redirect } from 'react-router';
import Button from '@material-ui/core/Button';
import Home from '@material-ui/icons/Home';
import Leap from './leap.js';
//firebase
import firebase from 'firebase/app'
import "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyDjM37_DSv2RvPQzl5YiVzmgRHfpd4rJFU",
  authDomain: "lui-medialab.firebaseapp.com",
  databaseURL: "https://lui-medialab.firebaseio.com",
  projectId: "lui-medialab",
  storageBucket: "lui-medialab.appspot.com",
  messagingSenderId: "247289397118",
  appId: "1:247289397118:web:eb2bcb0076d4bb4d"
};

if (!firebase.apps.length) {
firebase.initializeApp(firebaseConfig);
}
var database = firebase.database();
var currentRef = database.ref('voice');
//end

const particleOpt = require('./particles.json');

const fadeIn = css.keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 }
})

const slideOut = css.keyframes({
  '100%': { transform: 'translateX(-100%)' },
})

const fingers = ["#9bcfed", "#B2EBF2", "#80DEEA", "#4DD0E1", "#26C6DA"];


const styles = {

  backDrop: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },

  canvas: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 0,
    pointerEvents: 'none',
  },
  
  // "::selection": {
  //   background: "rgba(0,0,0,0)"
  // },

  button: {
    position: 'fixed',
    bottom: '10px',
    left: '10px',
    zIndex: 10,
    color: "rgba(255,255,255,0.3)",
    backgroundColor: "rgba(255,255,255,0.1)"
  },
};

//Animations for entering/exiting the page:
const Wrapper = glamorous.div(props => ({
  animation: props.isMounted ? `${fadeIn} 1s` : props.page === "app" ? '' : `${fadeIn} 4s`,
  position: 'absolute',
  top: '0px',
  left: '0px',
  width: '100vw',
  height: '100vh',
  zIndex: 5
}))

class Intro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exit: false,
    };
  }

   componentDidMount() {
     //google home
    currentRef.update({"current":"landing"});
    var something = this;
    currentRef.on('value', function(snapshot) {
      console.log(snapshot.val());
      var db = snapshot.val();
      var name = db.goto;
      if (db.update){
        if (name === "home") {
            something.setState({ exit: true });
            currentRef.update({"update":false});
        }
      }
    });
  }

  handleClick = () => {
    console.log("clicked")
  }
  handleSwipeUp = () => {
    let { clicked } = this.state;
    if (clicked != -1) {
      this.setState({ clicked: -1 });
      this.getPhotos();
    } else {
      this.setState({ exit: true });
    }
  }
  handleExit = () => {
    this.setState({
      exit: true
    })
  }

  render() {
    const { classes } = this.props;
    // Handling redirecting to home screen:
    if (this.state.exit) {
      console.log("EXITING")
      return <Redirect to={{ pathname: "/Home", state: {page: "home"} }} />
    }
    if (this.props.page == "intro") {
      return (
        <Wrapper isMounted={this.props.isMounted} page={this.props.page}>
          <div>
            
            <Leap
              handleClick={this.handleClick}
              handleSwipeUp={this.handleSwipeUp}
              handleExit={this.handleExit}
            />

            <div className={classes.backDrop} >
              {/* <input ref={input => this.inputElement = input} > */}
              
              {/* Component that renders the interactive particles.js: */}
                <Particles
                  params={particleOpt}
                  style={{ zIndex: 5, position: 'absolute' }}
                />
              
              {/* </input> */}
            </div>

            {/* Rendering the backdrop: */}
            <div >
              <img className={classes.backDrop} src={backDrop} style={{ zIndex: 1, position: 'absolute' }} />
            </div>
          </div>

          {/* Home button: */}
          <Button onClick={() => this.handleExit()}  className={classes.button}>
              <Home/>
          </Button>

        </Wrapper>
      );
    } else {
      return null;
    }
  }

}

export default withStyles(styles)(Intro);
