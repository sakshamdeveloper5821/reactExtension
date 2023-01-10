import React, { Component } from 'react';
import 'static/css/common.css';
import 'static/css/home.css';
import analytics from 'static/js/analytics.js'
class Home extends Component {
  constructor(props) {
        super(props);
  }

  onContinueClick  = ()=>{
    if(this.props.dealOfDay){
      analytics.sendEvent('HomePageContinueClicked');
      window.openLinkNewTab(this.props.dealOfDay.affiliateLink);
    }
  }
  componentDidMount(){
      analytics.sendEvent( 'HomePageAppeared');
  }
  render() {
    return (
      <div>
        <section id="home">
        
          {(this.props.ribbon.showAvailableDeals || this.props.ribbon.noDealOnPartner) && 

            <div onClick={this.onContinueClick}>
              <p>When you shop on this site, your purchase will support  <span className="emphasized">{this.props.partnerConfig.name} </span>  at no additional cost to you</p>
              <p>Press continue to help <span className="emphasized">{this.props.partnerConfig.name}</span> when you shop</p>
              <button>Continue</button>
            </div> 
          }
          {this.props.ribbon.showSimilarStores && <p>This site does not currently support <span className="emphasized">{this.props.partnerConfig.name} </span> when you shop here</p> }
        </section>

     </div>
     
    );
  }
}

export default Home;
