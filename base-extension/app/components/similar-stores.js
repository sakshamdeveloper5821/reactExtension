import React, { Component } from 'react';
import 'static/css/common.css';
import 'static/css/similar_stores.css';
import analytics from 'static/js/analytics.js'
class SimilarStore extends Component {
  constructor(props) {
        super(props);
  }
  onStoreClick(link) {
      analytics.sendEvent('SimilarStoreClicked');
      window.openLinkNewTab(link);
  }
  componentDidMount(){
      analytics.sendEvent( 'SimilarStorePageAppeared');
  }
  render() {
    return (
       <section id="similar-stores">
        {this.props.similarStores.length ===0 && <p>We can’t currently recommend any similar stores to <i>{this.props.merchantDomain}</i></p>}
        
        {this.props.similarStores.length >0 && <p>You can support <span className="emphasized">{this.props.partnerConfig.name}</span> when you shop at the following stores that are similar to <i>{this.props.merchantDomain}</i></p>}
      {this.props.similarStores.map((similarStore, i) => (
        <div className="store" onClick={() => this.onStoreClick(similarStore.affiliateLink)} key={i}  >
          <div className="store-image">
            <img src={similarStore.logoUrl} alt="Taget"/>
          </div>
          <a href='#'>{similarStore.url}</a>
          {/*
          <div className="store-description">
            <h3>Get 10%</h3>
            <p>When you click on this link and shop at Target.com &ndash; <span className="cause"></span> will receive up to 10% of your purchase price.</p>
          </div>*/}
        </div>
        ))
      }
        
      </section>
    );
  }
}

export default SimilarStore;
