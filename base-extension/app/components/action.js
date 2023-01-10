import React, { Component } from 'react';
import '../../app/static/css/common.css';
import '../../app/static/css/actions.css';
import analytics from 'static/js/analytics.js'
class Action extends Component {
  onActionClick(link,label) {
      analytics.sendEvent('Action-'+label+'-Clicked');
      window.openLinkNewTab(link);
  }
  componentDidMount(){
      analytics.sendEvent( 'ActionPageAppeared');
  }
  render() {
    return (
       <section id="actions">

      {this.props.actionList.map((action, i) => (

           <div className="action" onClick={() => this.onActionClick(action.link,action.label)} key={i} >
              <div className="action-icon">
                <img src={action.imageUrl} alt=""/>
              </div>
              <div className="action-description">
                <h3>{action.label}</h3>
                <p>{action.description}</p>
              </div>
              <div className="action-arrow">
                <i className="fa fa-chevron-right"></i>
              </div>
        </div>


        ))}

        
      </section>
    );
  }
}

export default Action;
