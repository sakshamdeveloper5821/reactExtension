import React, { Component } from 'react';
import 'static/css/common.css';
import 'static/css/header.css';
import analytics from 'static/js/analytics.js'

class Header extends Component {
  constructor(props) {
        super(props);
  }
  onSettingsClick = ()=>{
    analytics.sendEvent('SettingButtonClicked');
    this.props.showSetting();
  }

  onCloseButtonClick  = ()=>{
      analytics.sendEvent('PopupCloseClicked');
      window.closeIframeWindow();
  }

  render() {
    return (
      <div>
          <header>
              <i className="fa fa-cog pointer" id="btnSettings" title="Settings" onClick={this.onSettingsClick}></i>
              <a href={this.props.partnerConfig.inviteFriendMailLink}>
                <i className="fa fa-user-plus pointer" id="btnInvite" title="Invite a friend"></i>
              </a>
              
              <img id="logo" src="static/images/logo.png" className="pointer" />
              <a href={this.props.partnerConfig.feedbackMailLink}>
                <i className="fa fa-comment-alt pointer" id="btnFeedback" title="Give us Feedback"></i>
              </a>
              <i className="fa fa-times" id="btnClose" title="Close" onClick={this.onCloseButtonClick}></i>
          </header>
          
    </div>  
    );
  }
}
export default Header;
