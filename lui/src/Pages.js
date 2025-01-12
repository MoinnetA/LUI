import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from './App';
import Intro from './components/Intro/Intro.jsx';
import Photos from './components/Photos/PhotosApp.jsx';
import Videos from './components/Videos/VideosApp.js';
import Documents from './components/Documents/DocumentsApp';
import Maps from './components/Maps/MapsApp';
import DicomViewer from './components/DicomViewer/DicomViewerApp';
import GestureKeyboard from './components/GestureKeyboard/GestureKeyboardApp.jsx';
import CandyCrush from './components/CandyCrush/CandyCrushApp';
import Model from './components/Model/ModelApp';
import Prismatic from './components/Prismatic/PrismaticApp';

class Pages extends Component {

  render() {
    return (
      <Router>
        <Switch>
          {/* <Route exact path='/' component={Intro}/>
          <Route path='/Home' component={App}/> */}
          <Route exact path='/' render={(props) => <Intro {...props} page={"intro"} />}/>
          <Route path='/Home' component={App}/>
          <Route path='/Photos' component={Photos}/>
          <Route path='/Videos' component={Videos}/>
          <Route path='/Documents' component={Documents}/>
          <Route path='/Maps' component={Maps}/>
          <Route path='/DicomViewer' component={DicomViewer}/>
          <Route path='/GestureKeyboard' component={GestureKeyboard}/>
          <Route path='/CandyCrush' component={CandyCrush}/>
          <Route path='/Model' component={Model} />
          <Route path='/Prismatic' component={Prismatic} />
          <Route path='*' component={App}/>
        </Switch>
      </Router>
    );
  }
}

export default Pages;
