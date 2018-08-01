import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class BurgerIcon extends Component {
  constructor (props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  getLineStyle(index) {
    return {
      position: 'absolute',
      height: '20%',
      left: 0,
      right: 0,
      top: 20 * (index * 2) + '%',
      opacity: this.state.hover ? 0.6 : 1
    };
  }

  handleHover() {
    this.setState({ hover: !this.state.hover });
  }

  render() {
    const { styles, customIcon, onClick } = this.props;
    const { bmIcon, bmBurgerBars, bmBurgerButton, } = styles;
    let icon;
    let buttonStyle = {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      margin: 0,
      padding: 0,
      border: 'none',
      textIndent: -9999,
      background: 'transparent',
      outline: 'none'
    };

    if (customIcon) {
      let extraProps = {
        className: 'bm-icon',
        style: {...{width: '100%', height: '100%'}, ...bmIcon}
      };
      icon = React.cloneElement(customIcon, extraProps);
    } else {
      icon = (
        <span>
          <span className="bm-burger-bars" style={{...this.getLineStyle(0), ...bmBurgerBars}} />
          <span className="bm-burger-bars" style={{...this.getLineStyle(1), ...bmBurgerBars}} />
          <span className="bm-burger-bars" style={{...this.getLineStyle(2), ...bmBurgerBars}} />
        </span>
      );
    }

    return (
      <div className="bm-burger-button" style={{...{zIndex: 1}, ...bmBurgerButton}}>
        {icon}
        <button className="bm-burger-button__button"
                onClick={onClick}
                onMouseEnter={() => this.handleHover()}
                onMouseLeave={() => this.handleHover()}
                style={buttonStyle}>
          Open Menu
        </button>
      </div>
    );
  }
}

BurgerIcon.propTypes = {
  customIcon: PropTypes.element,
  styles: PropTypes.object
};

BurgerIcon.defaultProps = {
  styles: {}
};