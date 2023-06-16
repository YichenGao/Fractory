import React, { Component } from "react";
import "./Canvas.css";
import { unstable_batchedUpdates } from "react-dom";
import { post,get } from "../../utilities";


class Fractal extends Component {
    constructor(props) {
      super(props);
      // Two state properties, isActive stores info on which brush is active. brushSize controls the pixel size of the brush
      this.state = {
          
          images: [],
          loadIndex: 0,
          loadId: 0,
          imageToLoad: undefined,
          imageTitle: '',
          titleGiven: false,
          newSession: true,
          height:0,
          width:0,
      }
    //   this.saveImage = this.saveImage.bind(this);
    //   this.saveImageContinue = this.saveImageContinue.bind(this);
    }
    
    
    

    // toggleModal= () => {
    //   if (this.state.modalActive) {
    //       this.setState({titleGiven:true});
    //       this.saveImageContinue();
    //       this.setState({modalActive:false});
    //   } else {
    //       this.setState({modalActive:true})
    //     }
    //   }
    // } 

    // saveImage = () => {
    //   if (this.props.clientId === undefined) {
    //       window.alert("Please login to save work");
    //       return;
    //   } else if (this.props.savedImages >= 10) {
    //       window.alert("Storage full: you can only save up to xx artworks! :(");
    //       return;
    //   } else {
    //       this.changStatus();
    //   }

}



