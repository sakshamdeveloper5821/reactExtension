import React, { Component } from 'react';
import Home from 'components/home';
import Action from './action';
import SimilarStore from './similar-stores';
import Header from 'components/header';
import Settings from 'components/settings';
import Coupan from 'components/coupan';
import Footer from './footer';
import 'static/css/common.css';
class Popup extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      home: this.props.data.ribbon.dealOfTheDay || this.props.data.ribbon.noDealOnPartner, 
      action:false, 
      similarStory: this.props.data.ribbon.showSimilarStores, 
      setting: false, 
      coupan: this.props.data.ribbon.showAvailableDeals
    };
  }
  showHome = ()=>{
    this.setState({home: true, action:false, similarStory: false, setting: false, coupan: false });
  }
  showAction = ()=>{
    this.setState({home: false, action:true, similarStory: false, setting: false, coupan: false });
  }
  showSimilarStory = ()=>{
    this.setState({home: false, action:false, similarStory: true, setting: false, coupan: false });
  }
  showSetting = ()=>{
    this.setState({home: false, action:false, similarStory: false, setting: true, coupan: false });
  }
  showCoupans = ()=>{
    this.setState({home: false, action:false, similarStory: false, setting: false, coupan: true });
  }
  componentDidMount(){
  	if(this.state.coupan){
  		window.openLinkInNewTabAndClose(this.props.data.merchant.affiliateLink);
  	}
  }
  render() {
    let data = this.props.data;
    return (
      <div>
          <Header showSetting={this.showSetting} partnerConfig={data.partnerConfig} />
          
          {
            (this.state.home || this.state.action || this.state.similarStory || this.state.coupan || this.state.setting) && 
            (
              <main>
                 {this.state.setting && <Settings settingsCheckboxValues={data.settingsCheckboxValues} partnerConfig={data.partnerConfig} />}
                 {this.state.home && <Home partnerConfig={data.partnerConfig} merchant={data.merchant} ribbon={data.ribbon} />}
                 {this.state.coupan && <Coupan merchantDomain={data.visitedSite} dealsList={data.dealList} partnerConfig={data.partnerConfig}/>}
                 {this.state.action && <Action actionList={data.partnerConfig.actionList} />}
                 {this.state.similarStory && <SimilarStore similarStores={data.similarStores} merchantDomain={data.visitedSite} partnerConfig={data.partnerConfig} />}
              </main>
            )
          }
          <Footer showHome={this.showHome}  
            showAction={this.showAction} 
            showSimilarStory={this.showSimilarStory} 
            home={this.state.home}
            action={this.state.action}
            similarStory={this.state.similarStory} />
      </div>
    );
  }
}

export default Popup;
