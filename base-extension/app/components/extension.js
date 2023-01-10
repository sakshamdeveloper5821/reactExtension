import React, { Component } from 'react';
import Popup from 'components/popup';
import Ribbon from 'components/ribbon';
import Slider from 'components/Slider';
import 'static/css/common.css';

class Extension extends Component {
  constructor(props) {
    super(props);
  }
  getStyles = ()=>{
    return this.props.data.partnerConfig.cssStyles;
  }
  
  render() {
    return (
      <div>
        {this.props.carousel && 
          (
            <div id="carouselDiv">
                 <Slider />
            </div>
          )
        }
        {this.props.popup && 
          (
          <div style={this.getStyles()}>
            <div id="popupDiv">
               <Popup data={this.props.data}/>
            </div>
          </div>
          )
        }
        {this.props.ribbon && 
          (
          <div style={this.getStyles()}>
            <div id="ribbonDiv">
                 <Ribbon data={this.props.data}/>
            </div>
          </div>
            )
        }
        
      </div>
      
    );
   
  }
}

export default Extension;
