import React, { Component } from 'react';
import data from  'static/js/analytics.js';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import analytics from 'static/js/analytics.js'

class Slider extends Component {
  constructor(props) {
        super(props);
  }

  componentDidMount() {
  	analytics.sendEvent('ExtensionInstalled');
  }

  render() {
    return (
		    <div>
	    	<Carousel emulateTouch className="slider_class" width="70%" autoPlay interval={5000} infiniteLoop>
				<div>
					<img src="static/images/browser01.png" />
				</div>
				<div>
					<img src="static/images/browser02.png" />
				</div>
				<div>
					<img src="static/images/browser03.png" />
				</div>
		</Carousel>
		    </div>
    );
  }
}

export default Slider;
