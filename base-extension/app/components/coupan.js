import React, { Component } from 'react';
import 'static/css/common.css';
import 'static/css/coupons.css';
import analytics from 'static/js/analytics.js'
class Coupan extends Component {
  constructor(props) {
        super(props);
  }
 
  onCouponClick(text) {
      analytics.sendEvent('CouponCopied');
      window.copyTextToClipBoard(text);
  }
  componentDidMount(){
      analytics.sendEvent( 'CouponListPageAppeared');
  }

  render() {
    return (
      <section id="coupons">
          <p>Your purchase today at <i>{this.props.merchantDomain}</i> will help support <span className="emphasized">{this.props.partnerConfig.name}</span> at no additional cost</p>
      
           {this.props.dealsList.map((deal, i) => (
                <div className="coupon" key={i}>
                <div className="coupon-image">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="3287 1614 96.028 96">
  
  <g id="coupon_1_" data-name="coupon (1)" transform="translate(3287 1613.926)">
    <path id="Path_20" data-name="Path 20" className="cls-1" d="M93.553,41.952l-5.727-5.727c6.483-8.71,4.017-19.289-2.386-25.931-6.363-6.681-16.7-9.386-25.97-2.426L53.782,2.606a8.425,8.425,0,0,0-11.931,0L2.476,41.952a8.426,8.426,0,0,0,0,11.931l6.564,6.96a18.977,18.977,0,0,0,5.051,20.8c5.488,5.25,13.6,7.556,20.8,5.051l6.96,6.96a8.449,8.449,0,0,0,11.931,0l39.77-39.771A8.425,8.425,0,0,0,93.553,41.952ZM77.644,30.021h0a8.437,8.437,0,0,1-11.931,0h0a8.437,8.437,0,0,1,0-11.931h0a8.437,8.437,0,0,1,11.931,0h0A8.437,8.437,0,0,1,77.644,30.021Z" transform="translate(0 -0.045)"/>
    <path id="Path_21" data-name="Path 21" className="cls-2" d="M154.591,85.984l-5.727-5.727c6.483-8.71,4.017-19.289-2.386-25.931l-7.795,7.795h0a8.437,8.437,0,0,1,0,11.931h0a8.437,8.437,0,0,1-11.931,0h0L75.13,125.674c5.488,5.25,13.6,7.556,20.8,5.051l6.96,6.96a8.449,8.449,0,0,0,11.931,0l39.77-39.77A8.425,8.425,0,0,0,154.591,85.984Z" transform="translate(-61.039 -44.077)"/>
    <g id="Group_7" data-name="Group 7" transform="translate(21.148 31.481)">
      <path id="Path_22" data-name="Path 22" className="cls-3" d="M151.674,266.787l-21.4,2.386-14.4,1.591a.44.44,0,0,1-.318,0,2.792,2.792,0,0,1-.318-5.568l21.4-2.386,14.4-1.591a2.8,2.8,0,1,1,.636,5.568Z" transform="translate(-112.756 -243.635)"/>
      <path id="Path_23" data-name="Path 23" className="cls-3" d="M170.026,181.933h0a8.437,8.437,0,0,1,0-11.931h0a8.437,8.437,0,0,1,11.931,0h0a8.437,8.437,0,0,1,0,11.931h0A8.437,8.437,0,0,1,170.026,181.933Z" transform="translate(-157.277 -167.531)"/>
    </g>
    <path id="Path_24" data-name="Path 24" className="cls-4" d="M191.23,330.366h0a8.437,8.437,0,0,1,0-11.931h0a8.437,8.437,0,0,1,11.931,0h0a8.437,8.437,0,0,1,0,11.931h0A8.437,8.437,0,0,1,191.23,330.366Z" transform="translate(-153.356 -256.643)"/>
    <path id="Path_25" data-name="Path 25" d="M389.209,22.021h0a2.812,2.812,0,0,1,0-3.977L406.355.9a2.812,2.812,0,0,1,3.977,0h0a2.812,2.812,0,0,1,0,3.977L393.186,22.021A2.812,2.812,0,0,1,389.209,22.021Z" transform="translate(-315.541)"/>
    <path id="Path_30" data-name="Path 30" className="cls-4" d="M227.572,266.786l-21.4,2.386,6.363-6.363,14.4-1.591a2.8,2.8,0,0,1,.636,5.568Z" transform="translate(-167.506 -212.153)"/>
    <path id="Path_31" data-name="Path 31" d="M396.754,25.59,413.9,8.443a2.812,2.812,0,0,0,0-3.977L392.777,25.59A2.812,2.812,0,0,0,396.754,25.59Z" transform="translate(-319.11 -3.568)"/>
  </g>
</svg>

                </div>
                <div className="coupon-description">
                  <h3>{deal.coupanText}</h3>
                 <p> {/*Lorem ipsum dolor sit amet, consectetur.*/}</p>
                </div>
                <div className="coupon-copy-code-btn" onClick={() => this.onCouponClick(deal.coupanCode)}>
                  <button title="Copy Coupon Code">{deal.coupanCode}</button>

                  <input type="hidden" id="couponCodeHidden" value={deal.coupanCode} />
                </div>
              </div>
            ))
           }
      </section>
    );
  }
}

export default Coupan;
