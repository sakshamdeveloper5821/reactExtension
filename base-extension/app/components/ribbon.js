import React, { Component } from 'react';
import 'static/css/common.css';
import 'static/css/ribbon.css';
import analytics from  'static/js/analytics.js';

class Ribbon extends Component {
  constructor(props) {
        super(props);
  }

  onCloseButtonClick  = ()=>{
      analytics.sendEvent(this.getRibbonName()+'CloseClicked');
      window.closeIframeWindow();
  }

  onRibbonButtonClick  = ()=>{
  	analytics.sendEvent(this.getRibbonName()+'Clicked');
  	if(this.props.data.ribbon.onAmazonCom || this.props.data.ribbon.onAmazonSmile){
  		window.openLinkNewTab(this.props.data.partnerConfig.amznSmileLink);
  	}
  	else{
  		window.openIframePopup();
  	}
    
  }
 
  componentDidMount() {
  	analytics.sendEvent(this.getRibbonName()+'Appeared');
  }
  getRibbonName(){
  	if(this.props.data.ribbon.showAvailableDeals)
  		return 'DealAvailableRibbon';
  	if(this.props.data.ribbon.showSimilarStores){
  		return 'SimilarStoreRibbon';
  	}
  	if(this.props.data.ribbon.noDealOnPartner){
  		return 'NoDealPartnerRibbon';
  	}
  	if(this.props.data.ribbon.onAmazonCom){
  		return 'AmazonRibbon';
  	}
  	if(this.props.data.ribbon.onAmazonSmile){
  		return 'AmazonSmileRibbon';
  	}
  }
  render() {
    let showAvailableDeals = this.props.data.ribbon.showAvailableDeals;
    let showSimilarStores = this.props.data.ribbon.showSimilarStores;
    let noDealOnPartner =  this.props.data.ribbon.noDealOnPartner;
    let onAmazonCom = this.props.data.ribbon.onAmazonCom;
    let onAmazonSmile = this.props.data.ribbon.onAmazonSmile;
    return (
		      <div id="ribbon">
		    <div id="logo" onClick={this.onRibbonButtonClick}>
		       
		        <img src="static/images/logo.png"/>
		        
		    </div>
		    <div id="main" onClick={this.onRibbonButtonClick}>
		        <div id="dealOfDay">
		           {showAvailableDeals && <div>Coupons are available for this site!</div> }
		           {noDealOnPartner && <div>No coupons here - but you can still support {this.props.data.partnerConfig.name} when you shop</div> }
		           {showSimilarStores && <div>This site is not currently a partner, let us suggest some similar stores</div> }
		           {onAmazonCom && <div>Click here to support {this.props.data.partnerConfig.name} through Smile today</div> }
		           {onAmazonSmile && <div>Click here to support {this.props.data.partnerConfig.name} instead of {this.props.data.amznSmilePartnerName} with Smile today</div> }
		           {(showSimilarStores) && 

		           <svg xmlns="http://www.w3.org/2000/svg" viewBox="3431.6 622.2 250 187.5">

					<g id="discount-voucher" transform="translate(3431.6 558.2)">
					    <g id="Group_2" data-name="Group 2" transform="translate(0 64)">
					    <g id="Group_1" data-name="Group 1">
					        <path id="Path_3" data-name="Path 3"  d="M330.416,277.333c-5.646,0-10.417,7.156-10.417,15.625s4.771,15.625,10.417,15.625,10.417-7.156,10.417-15.625S336.062,277.333,330.416,277.333Z" transform="translate(-163.75 -173.166)"/>
					        <path id="Path_4" data-name="Path 4"  d="M234.167,186.292c0-8.469-4.771-15.625-10.417-15.625s-10.417,7.156-10.417,15.625,4.771,15.625,10.417,15.625S234.167,194.76,234.167,186.292Z" transform="translate(-109.167 -118.583)"/>
					        <path id="Path_5" data-name="Path 5"  d="M244.792,131.709A5.206,5.206,0,0,0,250,126.5V84.834A20.854,20.854,0,0,0,229.167,64H20.833A20.854,20.854,0,0,0,0,84.834V126.5a5.206,5.206,0,0,0,5.208,5.209,26.042,26.042,0,1,1,0,52.083A5.206,5.206,0,0,0,0,189v41.666A20.854,20.854,0,0,0,20.833,251.5H229.167A20.854,20.854,0,0,0,250,230.666V189a5.206,5.206,0,0,0-5.208-5.208,26.042,26.042,0,1,1,0-52.083ZM72.917,225.459a5.209,5.209,0,1,1-10.417,0V215.042a5.208,5.208,0,0,1,10.417,0v10.417Zm0-41.667a5.209,5.209,0,0,1-10.417,0V173.375a5.208,5.208,0,1,1,10.417,0v10.417Zm0-41.667a5.209,5.209,0,1,1-10.417,0V131.709a5.208,5.208,0,1,1,10.417,0v10.416Zm0-41.666a5.209,5.209,0,1,1-10.417,0V88.74a5.208,5.208,0,0,1,10.417,0v11.719Zm20.834,31.25c0-14.358,9.343-26.041,20.833-26.041s20.833,11.683,20.833,26.041-9.344,26.041-20.833,26.041S93.75,146.067,93.75,131.709Zm15.62,78.125a5.209,5.209,0,0,1-4.328-8.1l62.5-93.75a5.208,5.208,0,0,1,8.667,5.778l-62.5,93.75A5.2,5.2,0,0,1,109.37,209.834Zm57.3,0c-11.49,0-20.833-11.683-20.833-26.042s9.344-26.042,20.833-26.042S187.5,169.433,187.5,183.792,178.157,209.834,166.667,209.834Z" transform="translate(0 -64)"/>
					    </g>
					    </g>
					</g>
					</svg>


		           }
		        </div>
		       
		       
		    </div>
		    <div id="button" onClick={this.onRibbonButtonClick}>
		     {showAvailableDeals && <a href="#">View Coupons</a> }
		     {showSimilarStores && <a href="#">Similar Stores</a> }
		     {noDealOnPartner && <a href="#">Continue</a> }
		     {onAmazonCom && <a href="#">Continue</a> }
		     {onAmazonSmile && <a href="#">Continue</a> }
		    </div>
		    <div id="close">
              <i className="fa fa-times" id="btnClose" title="Close" onClick={this.onCloseButtonClick}></i>
		    </div>
		</div>
    );
  }
}

export default Ribbon;
