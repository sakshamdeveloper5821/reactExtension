import React, { Component } from 'react';
import 'static/css/common.css';
import 'static/css/settings.css';
import analytics from 'static/js/analytics.js'
class Settings extends Component {
  constructor(props) {
      super(props);
      this.state = {
        amazonDetectionCheckbox: props.settingsCheckboxValues.amazonDetectionCheckbox, 
        dealCheckbox: props.settingsCheckboxValues.dealCheckbox, 
        similarStoreCheckbox: props.settingsCheckboxValues.similarStoreCheckbox, 
        actionCheckbox: props.settingsCheckboxValues.actionCheckbox
    };
  }
  handleChangeChkbox = ({target})=>{
    const state = this.state;
    state[target.id] = target.checked;
    this.setState(state);
    window.setSettingsCheckboxValue(target.id, target.checked);
    if(target.checked){
          analytics.sendEvent( target.id+ 'Checked')
    } else {
          analytics.sendEvent(target.id+ 'Unchecked');
    }
  }
  componentDidMount() {
      analytics.sendEvent('SettingsPageAppeared');

  }
  render() {
    return (
            <section id="settings">
                
                <div className="setting">
                  <div className="setting-description">
                    <p><label >Remind me to use Smile when shopping on Amazon.</label></p>
                  </div>
                  <div className="setting-toggler">
                    <input type="checkbox" id="amazonDetectionCheckbox" className="toggle-switch" defaultChecked={this.state.amazonDetectionCheckbox} onChange={this.handleChangeChkbox}/>
                  </div>
                </div>

                <div className="setting">
                  <div className="setting-description">
                    <p><label >Always let me know when there are coupons available for the site I'm on.</label></p>
                  </div>
                  <div className="setting-toggler">
                    <input type="checkbox" id="dealCheckbox" className="toggle-switch" defaultChecked={this.state.dealCheckbox} onChange={this.handleChangeChkbox}/>
                  </div>
                </div>
                <div className="setting">
                  <div className="setting-description">
                    <p><label >Always let me know about similar sites that provide greater funding when I shop.</label></p>
                  </div>
                  <div className="setting-toggler">
                    <input type="checkbox" id="similarStoreCheckbox" className="toggle-switch" defaultChecked={this.state.similarStoreCheckbox} onChange={this.handleChangeChkbox}/>
                  </div>
                </div>
                <div className="setting">
                  <div className="setting-description">
                    <p><label >Notify me when there are actions I can take to support <span className="emphasized">{this.props.partnerConfig.name}</span>.</label></p>
                  </div>
                  <div className="setting-toggler">
                    <input type="checkbox" id="actionCheckbox" className="toggle-switch" defaultChecked={this.state.actionCheckbox} onChange={this.handleChangeChkbox}/>
                  </div>
                </div>
          </section>  
    );
  }
}
export default Settings;
