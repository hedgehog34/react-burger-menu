'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var CrossIcon = (function (_Component) {
  _inherits(CrossIcon, _Component);

  function CrossIcon() {
    _classCallCheck(this, CrossIcon);

    _get(Object.getPrototypeOf(CrossIcon.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(CrossIcon, [{
    key: 'getCrossStyle',
    value: function getCrossStyle(type) {
      return {
        position: 'absolute',
        width: 3,
        height: 14,
        transform: type === 'before' ? 'rotate(45deg)' : 'rotate(-45deg)'
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var customIcon = _props.customIcon;
      var styles = _props.styles;
      var onClick = _props.onClick;
      var bmCross = styles.bmCross;
      var bmCrossButton = styles.bmCrossButton;

      var icon = undefined;
      var buttonWrapperStyle = {
        position: 'absolute',
        width: 24,
        height: 24,
        right: 8,
        top: 8
      };

      var buttonStyle = {
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
        var extraProps = {
          className: 'bm-cross',
          style: _extends({ width: '100%', height: '100%' }, bmCross)
        };
        icon = (0, _react.cloneElement)(customIcon, extraProps);
      } else {
        icon = _react2['default'].createElement(
          'span',
          { style: { position: 'absolute', top: '6px', right: '14px' } },
          _react2['default'].createElement('span', { className: 'bm-cross', style: _extends({}, this.getCrossStyle('before'), bmCross) }),
          _react2['default'].createElement('span', { className: 'bm-cross', style: _extends({}, this.getCrossStyle('after'), bmCross) })
        );
      }

      return _react2['default'].createElement(
        'div',
        { className: 'bm-cross-button',
          style: _extends({}, buttonWrapperStyle, bmCrossButton) },
        icon,
        _react2['default'].createElement(
          'button',
          { onClick: onClick,
            style: buttonStyle },
          'Close Menu'
        )
      );
    }
  }]);

  return CrossIcon;
})(_react.Component);

exports['default'] = CrossIcon;

CrossIcon.propTypes = {
  customIcon: _propTypes.element,
  styles: _propTypes.object
};

CrossIcon.defaultProps = {
  styles: {}
};
module.exports = exports['default'];