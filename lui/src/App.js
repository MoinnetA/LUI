import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { css } from 'glamor';
import glamorous from 'glamorous'
import { Redirect } from 'react-router';
import Photos from './components/Photos';
import Videos from './components/Videos';
import Intro from './components/Intro/Intro.jsx';
import Prismatic from './components/Prismatic/\\';
import CandyCrush from './components/CandyCrush';
import Documents from './components/Documents';
import Maps from './components/Maps';
import DicomViewer from './components/DicomViewer';
import GestureKeyboard from './components/GestureKeyboard';
import Leap from './leap.js';
// import axios from 'axios';
// import request from 'request';
import Model from './components/Model';
import { I } from 'glamorous';
//add firebase
import firebase from 'firebase/app'
import "firebase/database";

// const zoomIn = css.keyframes({
//   '0%': { opacity: 0 },
//   '100%': { opacity: 1 }
// })
const zoomIn = css.keyframes({
  '0%': { transform: 'scale(0.5)' },
  '100%': { transform: 'scale(1)' }
})

const styles = {

  mainContainer: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    animation: `${zoomIn} 1s`
  },

  rowContainer: {
    width: '100%',
    height: '50%',

  }

};

// class DelayedComponent extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       shouldRender: false
//     }
//   }

//   // componentWillReceiveProps(nextProps) {
//   //   const timeout = 0;
//   //   if (this.props.isMounted && !nextProps.isMounted) { //true -> false
//   //     setTimeout(() => this.setState({ shouldRender: false }), timeout)
//   //   } else if (!this.props.isMounted && nextProps.isMounted) { //false -> true
//   //     this.setState({ shouldRender: true })
//   //   }
//   // }

//   render() {
//     // return this.state.shouldRender ? <Intro {...this.props} /> : null
//     return this.props.page === "intro" ? <Intro {...this.props} /> : null
//   }
// }

const fadeIn = css.keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 }
})
const slideOut = css.keyframes({
  '100%': { transform: 'translateY(-100%)' },
})
const Wrapper = glamorous.div(props => ({
  animation: props.exit === true ? `${slideOut} 1s` : props.isMounted ? '' : `${fadeIn} 1.5s`,
  position: 'absolute',
  top: '0px',
  left: '0px',
  width: '100vw',
  height: '100vh',
  zIndex: 5
}))
const firebaseConfig = {
  apiKey: "AIzaSyCuy4pAfTSoNnVt9OHryXeMBm6T4BaJkL0",
  authDomain: "master-thesis-lui.firebaseapp.com",
  databaseURL: "https://master-thesis-lui.firebaseio.com",
  projectId: "master-thesis-lui",
  storageBucket: "master-thesis-lui.appspot.com",
  messagingSenderId: "670995532611",
  appId: "1:670995532611:web:947999a7e4317e08f8fdf6"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
var database = firebase.database();
var currentRef = database.ref('voice');

class App extends Component {

  constructor(props) {
    super(props);


    this.state = {
      cards: [],
      hovered: "",
      clicked: "",
      page: "home"
    };
  }

  componentDidMount() {
    currentRef.update({"current":"home"});
    // const page = localStorage.getItem("page") || "main";
    // const page = "intro";
    const cards = [this.refs.card1, this.refs.card2, this.refs.card3, this.refs.card4, this.refs.card5, this.refs.card6];
    this.setState({
      cards,
      exit: false
    })
    //firebase cloud (sockets)
    var something = this;
    currentRef.on('value', function(snapshot) {
      let appClicked;
      var db = snapshot.val();
      var name = db.goto;
      if (db.update){
        if (name === "photos") {
          appClicked = "card1";
          something.setState({ clicked: appClicked });
        } else if (name === "videos") {
          appClicked = "card2";
          something.setState({ clicked: appClicked });
        } else if (name === "prismatic") {
          appClicked = "card3";
          something.setState({ clicked: appClicked });
        } else if (name === "game") {
          appClicked = "card4";
          something.setState({ clicked: appClicked });
        }else if (name === "gesture keyboard") {
          appClicked = "card5";
          something.setState({ clicked: appClicked });
        } else if (name === "model") {
          appClicked = "card6";
          something.setState({ clicked: appClicked });
        } else if (name === "landing") {
          something.setState({ exit: true });
        }
        currentRef.update({"update":false});
      }
      if(db.clicked&&db.hovered!=null){
        something.handleClick(db.hovered);
        currentRef.update({"clicked":false});
      }
      if (db.back){
        something.setState({ exit: true });
      }
    });
    //voice end

  }


  handleHover = (card) => {
    // console.log("HOVER", card);
    this.setState({ hovered: card })
    currentRef.update({"hovered": card});
  }

  handleClick = (card) => {
    // console.log("CLICK", card);
    this.setState({ clicked: card })
  }

  handleExit = () => {
    console.log("Exit to Intro");
    this.setState({ page: "intro" })
    // localStorage.setItem("page", this.state.page);
  }

  handleUnlock = () => {
    console.log("Unlock to Main");
    this.setState({
      page: "main"
    })
    // localStorage.setItem("page", this.state.page);
  }

  handleSwipeUp = () => {
    this.setState({ exit: true });

  }

  render() {
    const { classes } = this.props;

    if (this.state.exit) {
      console.log("EXITING")
      return <Redirect from="/Home" to="/" />
    }


    return (
      <Wrapper isMounted={this.props.isMounted} exit={this.state.exit}>
      <div>
        <Leap
          cards={this.state.cards}
          clicked={this.state.clicked}
          handleHover={this.handleHover}
          handleClick={this.handleClick}
          handleUnlock={this.handleUnlock}
          handleSwipeUp={this.handleSwipeUp}
          page={this.state.page}
        />

        <Grid className={classes.mainContainer} container>
          <Grid className={classes.rowContainer} container>
            <Grid ref="card1" item xs={4}
              onClick={() => { this.setState({ clicked: "card1" }) }}
              onMouseEnter={() => { this.setState({ hovered: "card1" }) }}
              onMouseLeave={() => { this.setState({ hovered: "" }) }} >
              <Photos isMounted = {this.state.clicked === "card1"} hovered={this.state.hovered === "card1"} clicked={this.state.clicked === "card1"} />
            </Grid>
            <Grid ref="card2" item xs={4}
              onClick={() => { this.setState({ clicked: "card2" }) }}
              onMouseEnter={() => { this.setState({ hovered: "card2" }) }}
              onMouseLeave={() => { this.setState({ hovered: "" }) }} >
              <Videos hovered={this.state.hovered === "card2"} clicked={this.state.clicked === "card2"} />
            </Grid>
            <Grid ref="card3" item xs={4}
              onClick={() => { this.setState({ clicked: "card3" }) }}
              onMouseEnter={() => { this.setState({ hovered: "card3" }) }}
              onMouseLeave={() => { this.setState({ hovered: "" }) }} >
              <Documents hovered={this.state.hovered === "card3"} clicked={this.state.clicked === "card3"} />
              {/* <Documents hovered={false} clicked={false} /> */}
            </Grid>
          </Grid>
          
          <Grid className={classes.rowContainer} container>
            {/* <Grid ref="card4" item xs={4}
              onClick={() => { this.setState({ clicked: "card4" }) }}
              onMouseEnter={() => { this.setState({ hovered: "card4" }) }}
              onMouseLeave={() => { this.setState({ hovered: "" }) }} >
              <CandyCrush hovered={this.state.hovered === "card4"} clicked={false} />
            </Grid> */}
            <Grid ref="card4" item xs={4}
              onClick={() => { this.setState({ clicked: "card4" }) }}
              onMouseEnter={() => { this.setState({ hovered: "card4" }) }}
              onMouseLeave={() => { this.setState({ hovered: "" }) }} >
              <Maps hovered={this.state.hovered === "card4"} clicked={this.state.clicked === "card4"} />
              {/* <Maps hovered={false} clicked={false} /> */}
            </Grid>
            <Grid ref="card5" item xs={4}
              onClick={() => { this.setState({ clicked: "card5" }) }}
              onMouseEnter={() => { this.setState({ hovered: "card5" }) }}
              onMouseLeave={() => { this.setState({ hovered: "" }) }} >
              <DicomViewer hovered={this.state.hovered === "card5"} clicked={this.state.clicked === "card5"} />
              {/* <GestureKeyboard hovered={this.state.hovered === "card5"} clicked={this.state.clicked === "card5"} /> */}
              {/* <GestureKeyboard hovered={false} clicked={false} /> */}
            </Grid>
            <Grid ref="card6" item xs={4}
              onClick={() => { this.setState({ clicked: "card6" }) }}
              onMouseEnter={() => { this.setState({ hovered: "card6" }) }}
              onMouseLeave={() => { this.setState({ hovered: "" }) }} >
              <Model hovered={false} clicked={false} />
            </Grid>
          </Grid>
        </Grid>

        {/* <Intro page = {this.state.page}/> */}
        {/* <DelayedComponent isMounted={this.state.page === "intro"} page={this.state.page} handleUnlock={this.handleUnlock} /> */}

      </div>
      </Wrapper>
    );
  }
}

export default withStyles(styles)(App);
