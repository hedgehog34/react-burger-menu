import React, { Component, cloneElement } from 'react';
import { element, object } from 'prop-types';

export default class CrossIcon extends Component {
  getCrossStyle(type) {
    return {
      position: 'absolute',
      width: 3,
      height: 14,
      transform: type === 'before' ? 'rotate(45deg)' : 'rotate(-45deg)'
    };
  }

  render() {
    const { customIcon, styles, onClick } = this.props;
    const { bmCross, bmCrossButton } = styles;

    let icon;
    const buttonWrapperStyle = {
      position: 'absolute',
      width: 24,
      height: 24,
      right: 8,
      top: 8
    };

    const buttonStyle = {
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
      const extraProps = {
        className: 'bm-cross',
        style: {...{width: '100%', height: '100%'}, ...bmCross}
      };
      icon = cloneElement(customIcon, extraProps);
    } else {
      icon = (
        <span style={{ position: 'absolute', top: '6px', right: '14px' }}>
          <span className="bm-cross" style={{...this.getCrossStyle('before'), ...bmCross}} />
          <span className="bm-cross" style={{...this.getCrossStyle('after'), ...bmCross}} />
        </span>
      );
    }

    return (
      <div className="bm-cross-button"
           style={{...buttonWrapperStyle, ...bmCrossButton}}>
        {icon}
        <button onClick={onClick}
                style={buttonStyle}>
            Close Menu
        </button>
      </div>
    );
  }
}

CrossIcon.propTypes = {
  customIcon: element,
  styles: object
};

CrossIcon.defaultProps = {
  styles: {}
};
