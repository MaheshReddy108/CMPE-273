
import React from "react";
import { Slide } from 'react-slideshow-image';

class PanelHeader extends React.Component {
  render() {
    return (
      <div
        className={
          "panel-header "
          
        }
      >
        <Slide >
          <div className="each-slide">
            <div style={{"height":"200px",'backgroundImage': `url("https://res.cloudinary.com/grubhub-marketing/image/upload/f_auto,fl_lossy,q_80/v1538431627/Homepage_Desktop_0018_Pizza_2x_qshvvo.jpg")`}}>
              <span></span>
            </div>
          </div>
          <div className="each-slide">
            <div style={{"height":"200px",'backgroundImage': `url("https://cms.splendidtable.org/sites/default/files/styles/w2000/public/romesco-pasta-salad-basil-parmesan_c_Alex-Lau-LEDE.jpg")`}}>
              <span></span>
            </div>
          </div>
          <div className="each-slide">
            <div style={{"height":"200px",'backgroundImage': `url("https://www.thespruceeats.com/thmb/gOez2Jg0npSFXsoCxC3UfT5ytmA=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/juicy-baked-burgers-3052097-7-5b1054308e1b6e0036bc6cd1.jpg")`}}>
              <span></span>
            </div>
          </div>
        </Slide>
      </div>
    );
  }
}

export default PanelHeader;
