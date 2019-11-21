import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px' };
    return (
        <footer>
          <div style={divStyle} className="landing-footer">
          <div style={divStyle} className="ui center aligned container">
            <hr />
            Warrior Jam <br />
            University of Hawaii<br />
            Honolulu, HI 96822 <br />
            <a style={{ color: 'white' }} href="https://warrior-jam.github.io./">Warrior Jam Home Page</a>
          </div>
            </div>
        </footer>
    );
  }
}

export default Footer;
