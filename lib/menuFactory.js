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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _baseStyles = require('./baseStyles');

var _baseStyles2 = _interopRequireDefault(_baseStyles);

var _BurgerIcon = require('./BurgerIcon');

var _BurgerIcon2 = _interopRequireDefault(_BurgerIcon);

var _CrossIcon = require('./CrossIcon');

var _CrossIcon2 = _interopRequireDefault(_CrossIcon);

exports['default'] = function (styles) {
    var Menu = (function (_Component) {
        _inherits(Menu, _Component);

        function Menu(props) {
            _classCallCheck(this, Menu);

            _get(Object.getPrototypeOf(Menu.prototype), 'constructor', this).call(this, props);

            this.state = {
                isOpen: props && typeof props.isOpen !== 'undefined' ? props.isOpen : false,

                // the detected width of the sidebar (in pixels)
                sidebarWidth: props.width,

                // keep track of touching params
                touchIdentifier: null,
                touchStartX: null,
                touchStartY: null,
                touchCurrentX: null,
                touchCurrentY: null,

                // if touch is supported by the browser
                dragSupported: false
            };

            this.onTouchStart = this.onTouchStart.bind(this);
            this.onTouchMove = this.onTouchMove.bind(this);
            this.onTouchEnd = this.onTouchEnd.bind(this);
            this.onScroll = this.onScroll.bind(this);
            this.saveSidebarRef = this.saveSidebarRef.bind(this);
        }

        _createClass(Menu, [{
            key: 'toggleMenu',
            value: function toggleMenu() {
                var _this = this;

                var newState = { isOpen: !this.state.isOpen };

                this.applyWrapperStyles();

                this.setState(newState, function () {
                    _this.props.onStateChange(newState);

                    // Timeout ensures wrappers are cleared after animation finishes.
                    _this.timeoutId && clearTimeout(_this.timeoutId);
                    _this.timeoutId = setTimeout(function () {
                        _this.timeoutId = null;
                        if (!newState.isOpen) {
                            _this.clearWrapperStyles();
                        }
                    }, 500);
                });
            }

            // Applies component-specific styles to external wrapper elements.
        }, {
            key: 'applyWrapperStyles',
            value: function applyWrapperStyles() {
                if (styles.pageWrap && this.props.pageWrapId) {
                    this.handleExternalWrapper(this.props.pageWrapId, styles.pageWrap, true);
                }

                if (styles.outerContainer && this.props.outerContainerId) {
                    this.handleExternalWrapper(this.props.outerContainerId, styles.outerContainer, true);
                }
            }

            // Removes component-specific styles applied to external wrapper elements.
        }, {
            key: 'clearWrapperStyles',
            value: function clearWrapperStyles() {
                if (styles.pageWrap && this.props.pageWrapId) {
                    this.handleExternalWrapper(this.props.pageWrapId, styles.pageWrap, false);
                }

                if (styles.outerContainer && this.props.outerContainerId) {
                    this.handleExternalWrapper(this.props.outerContainerId, styles.outerContainer, false);
                }
            }

            // Sets or unsets styles on DOM elements outside the menu component.
            // This is necessary for correct page interaction with some of the menus.
            // Throws and returns if the required external elements don't exist,
            // which means any external page animations won't be applied.
        }, {
            key: 'handleExternalWrapper',
            value: function handleExternalWrapper(id, wrapperStyles, set) {
                var html = document.querySelector('html');
                var body = document.querySelector('body');
                var wrapper = document.getElementById(id);

                if (!wrapper) {
                    if (!this.state.isOpen) console.error('Element with ID \'' + id + '\' not found');
                    return;
                }

                var builtStyles = this.getStyle(wrapperStyles);

                for (var prop in builtStyles) {
                    if (builtStyles.hasOwnProperty(prop)) {
                        wrapper.style[prop] = set ? builtStyles[prop] : '';
                    }
                }

                // Prevent any horizontal scroll.
                [html, body].forEach(function (element) {
                    element.style['overflow-x'] = set ? 'hidden' : '';
                });
            }

            // Builds styles incrementally for a given element.
        }, {
            key: 'getStyles',
            value: function getStyles(el, index, inline, children) {
                var propName = 'bm' + el.replace(el.charAt(0), el.charAt(0).toUpperCase());

                // Set base styles.
                var output = _baseStyles2['default'][el] ? this.getStyle(_baseStyles2['default'][el]) : {};

                // Add animation-specific styles.
                if (styles[el]) {
                    output = _extends({}, output, this.getStyle(styles[el], index + 1, children));
                }

                // Add custom styles.
                if (this.props.styles[propName]) {
                    output = _extends({}, output, this.props.styles[propName]);
                }

                // Add element inline styles.
                if (inline) {
                    output = _extends({}, output, inline);
                }

                return output;
            }
        }, {
            key: 'getStyle',
            value: function getStyle(style, index, children) {
                var _props = this.props;
                var width = _props.width;
                var height = _props.height;

                // Uncomment this line to change Menu to accept other values than pixels, this requires change to the API
                // Supported units are `px`, `rem`, `em`, `vh`, `vw`, `vmin`, `vmax` (% don't work everywhere)
                if (typeof width !== 'string') width = width + 'px';
                if (typeof height !== 'string') height = height + 'px';

                return style(this.state.isOpen, width, height, this.props.position, this.props.breakpoint, index, children);
            }
        }, {
            key: 'listenForClose',
            value: function listenForClose(e) {
                e = e || window.event;

                if (this.state.isOpen && (e.key === 'Escape' || e.keyCode === 27)) {
                    this.toggleMenu();
                }
            }
        }, {
            key: 'componentWillMount',
            value: function componentWillMount() {
                if (!styles) {
                    throw new Error('No styles supplied');
                }

                // Allow initial open state to be set by props.
                if (this.props.isOpen) {
                    this.toggleMenu();
                }
            }
        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
                // Bind ESC key handler (unless disabled or custom function supplied).
                if (this.props.customOnKeyDown) {
                    window.onkeydown = this.props.customOnKeyDown;
                } else if (!this.props.disableCloseOnEsc) {
                    window.onkeydown = this.listenForClose.bind(this);
                }

                // Allow initial open state to be set by props for animations with wrapper elements.
                if (this.props.isOpen) {
                    this.toggleMenu();
                }

                this.setState({
                    dragSupported: typeof window === 'object' && 'ontouchstart' in window
                });
                this.saveSidebarWidth();
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                window.onkeydown = null;

                this.clearWrapperStyles();
            }
        }, {
            key: 'componentDidUpdate',
            value: function componentDidUpdate() {
                var _this2 = this;

                if (styles.svg) {
                    (function () {
                        var morphShape = _reactDom2['default'].findDOMNode(_this2, 'bm-morph-shape');
                        var path = styles.svg.lib(morphShape).select('path');

                        if (_this2.state.isOpen) {
                            // Animate SVG path.
                            styles.svg.animate(path);
                        } else {
                            // Reset path (timeout ensures animation happens off screen).
                            setTimeout(function () {
                                path.attr('d', styles.svg.pathInitial);
                            }, 300);
                        }
                    })();
                }

                // filter out the updates when we're touching
                if (!this.isTouching()) {
                    this.saveSidebarWidth();
                }
            }
        }, {
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {
                if (typeof nextProps.isOpen !== 'undefined' && nextProps.isOpen !== this.state.isOpen) {
                    this.toggleMenu();
                }
            }
        }, {
            key: 'isTouching',
            value: function isTouching() {
                return this.state.touchIdentifier !== null;
            }
        }, {
            key: 'onTouchStart',
            value: function onTouchStart(ev) {
                // filter out if a user starts swiping with a second finger
                if (!this.isTouching()) {
                    var touch = ev.targetTouches[0];
                    this.setState({
                        touchIdentifier: touch.identifier,
                        touchStartX: touch.clientX,
                        touchStartY: touch.clientY,
                        touchCurrentX: touch.clientX,
                        touchCurrentY: touch.clientY
                    });
                }
            }
        }, {
            key: 'onTouchMove',
            value: function onTouchMove(ev) {
                if (this.isTouching()) {
                    for (var ind = 0; ind < ev.targetTouches.length; ind++) {
                        // we only care about the finger that we are tracking
                        if (ev.targetTouches[ind].identifier === this.state.touchIdentifier) {
                            this.setState({
                                touchCurrentX: ev.targetTouches[ind].clientX,
                                touchCurrentY: ev.targetTouches[ind].clientY
                            });
                            break;
                        }
                    }
                }
            }
        }, {
            key: 'onTouchEnd',
            value: function onTouchEnd() {
                if (this.isTouching()) {
                    // trigger a change to open if sidebar has been dragged beyond dragToggleDistance
                    var touchWidth = this.touchSidebarWidth();

                    if (this.state.isOpen && touchWidth < this.state.sidebarWidth - this.props.dragToggleDistance || !this.state.isOpen && touchWidth > this.props.dragToggleDistance) {
                        // this.setState({ isOpen: !this.state.isOpen });
                        this.toggleMenu();
                    }

                    this.setState({
                        touchIdentifier: null,
                        touchStartX: null,
                        touchStartY: null,
                        touchCurrentX: null,
                        touchCurrentY: null
                    });
                }
            }

            // calculate the sidebarWidth based on current touch info
        }, {
            key: 'touchSidebarWidth',
            value: function touchSidebarWidth() {
                // if the sidebar is open and start point of drag is inside the sidebar
                // we will only drag the distance they moved their finger
                // otherwise we will move the sidebar to be below the finger.

                if (this.props.position === 'right') {
                    if (this.state.isOpen && window.innerWidth - this.state.touchStartX < this.state.sidebarWidth) {
                        if (this.state.touchCurrentX > this.state.touchStartX) {
                            return this.state.sidebarWidth + this.state.touchStartX - this.state.touchCurrentX;
                        }
                        return this.state.sidebarWidth;
                    }
                    return Math.min(window.innerWidth - this.state.touchCurrentX, this.state.sidebarWidth);
                }

                if (this.props.position === 'left') {
                    if (this.state.isOpen && this.state.touchStartX < this.state.sidebarWidth) {
                        if (this.state.touchCurrentX > this.state.touchStartX) {
                            return this.state.sidebarWidth;
                        }
                        return this.state.sidebarWidth - this.state.touchStartX + this.state.touchCurrentX;
                    }
                }
                return Math.min(this.state.touchCurrentX, this.state.sidebarWidth);
            }

            // This logic helps us prevents the user from sliding the sidebar horizontally
            // while scrolling the sidebar vertically. When a scroll event comes in, we're
            // cancelling the ongoing gesture if it did not move horizontally much.
        }, {
            key: 'onScroll',
            value: function onScroll() {
                if (this.isTouching() && this.inCancelDistanceOnScroll()) {
                    this.setState({
                        touchIdentifier: null,
                        touchStartX: null,
                        touchStartY: null,
                        touchCurrentX: null,
                        touchCurrentY: null
                    });
                }
            }

            // True if the on going gesture X distance is less than the cancel distance
        }, {
            key: 'inCancelDistanceOnScroll',
            value: function inCancelDistanceOnScroll() {
                var _state = this.state;
                var touchCurrentX = _state.touchCurrentX;
                var touchStartX = _state.touchStartX;
                var position = this.props.position;

                var CANCEL_DISTANCE_ON_SCROLL = 20;
                var cancelDistanceOnScroll = undefined;

                if (position === 'right') {
                    cancelDistanceOnScroll = Math.abs(touchCurrentX - touchStartX) < CANCEL_DISTANCE_ON_SCROLL;
                } else if (position === 'left') {
                    cancelDistanceOnScroll = Math.abs(touchStartX - touchCurrentX) < CANCEL_DISTANCE_ON_SCROLL;
                } else return;
                return cancelDistanceOnScroll;
            }
        }, {
            key: 'saveSidebarWidth',
            value: function saveSidebarWidth() {
                var width = this.sidebar.offsetWidth;

                if (width !== this.state.sidebarWidth) {
                    this.setState({ sidebarWidth: width });
                }
            }
        }, {
            key: 'saveSidebarRef',
            value: function saveSidebarRef(node) {
                this.sidebar = node;
            }
        }, {
            key: 'render',
            value: function render() {
                var _this3 = this;

                var _state2 = this.state;
                var isOpen = _state2.isOpen;
                var dragSupported = _state2.dragSupported;
                var _props2 = this.props;
                var touchHandleWidth = _props2.touchHandleWidth;
                var position = _props2.position;
                var noOverlay = _props2.noOverlay;
                var id = _props2.id;
                var className = _props2.className;
                var customCrossIcon = _props2.customCrossIcon;
                var customBurgerIcon = _props2.customBurgerIcon;
                var styles = _props2.styles;
                var children = _props2.children;

                var rootProps = {};
                var dragHandle = undefined;

                if (dragSupported) {
                    if (isOpen) {
                        rootProps.onTouchStart = this.onTouchStart;
                        rootProps.onTouchMove = this.onTouchMove;
                        rootProps.onTouchEnd = this.onTouchEnd;
                        rootProps.onTouchCancel = this.onTouchEnd;
                        rootProps.onScroll = this.onScroll;
                    } else {
                        var dragHandleStyle = this.getStyles('dragHandle');
                        dragHandleStyle.width = touchHandleWidth;

                        // dragHandleStyle right/left
                        if (position === 'left') {
                            dragHandleStyle.left = 0;
                        } else if (position === 'right') {
                            dragHandleStyle.right = 0;
                        }

                        dragHandle = position === 'left' && _react2['default'].createElement('div', { style: dragHandleStyle,
                            onTouchStart: this.onTouchStart,
                            onTouchMove: this.onTouchMove,
                            onTouchEnd: this.onTouchEnd,
                            onTouchCancel: this.onTouchEnd });
                    }
                }

                return _react2['default'].createElement(
                    'div',
                    rootProps,
                    dragHandle,
                    !noOverlay && _react2['default'].createElement('div', { className: 'bm-overlay',
                        onClick: function () {
                            return _this3.toggleMenu();
                        },
                        style: this.getStyles('overlay') }),
                    _react2['default'].createElement(
                        'div',
                        { id: id,
                            className: 'bm-menu-wrap ' + (className || ''),
                            style: this.getStyles('menuWrap') },
                        styles.svg ? _react2['default'].createElement(
                            'div',
                            { className: 'bm-morph-shape', style: this.getStyles('morphShape') },
                            _react2['default'].createElement(
                                'svg',
                                { width: '100%', height: '100%', viewBox: '0 0 100 800', preserveAspectRatio: 'none' },
                                _react2['default'].createElement('path', { d: styles.svg.pathInitial })
                            )
                        ) : null,
                        _react2['default'].createElement(
                            'div',
                            { className: 'bm-menu',
                                style: this.getStyles('menu'),
                                ref: this.saveSidebarRef },
                            _react2['default'].createElement(
                                'nav',
                                { className: 'bm-item-list',
                                    style: this.getStyles('itemList') },
                                _react.Children.map(children, function (item, index) {
                                    if (item) {
                                        var kids = children.length;
                                        var extraProps = {
                                            key: index,
                                            style: _this3.getStyles('item', index, item.props.style, kids)
                                        };
                                        return (0, _react.cloneElement)(item, extraProps);
                                    }
                                })
                            )
                        ),
                        customCrossIcon !== false && _react2['default'].createElement(_CrossIcon2['default'], { onClick: function () {
                                return _this3.toggleMenu();
                            },
                            styles: styles,
                            customIcon: customCrossIcon })
                    ),
                    customBurgerIcon !== false && _react2['default'].createElement(_BurgerIcon2['default'], { onClick: function () {
                            return _this3.toggleMenu();
                        },
                        styles: styles,
                        customIcon: customBurgerIcon })
                );
            }
        }]);

        return Menu;
    })(_react.Component);

    Menu.propTypes = {
        breakpoint: _propTypes2['default'].number,
        className: _propTypes2['default'].string,
        customBurgerIcon: _propTypes2['default'].oneOfType([_propTypes2['default'].element, _propTypes2['default'].oneOf([false])]),
        customCrossIcon: _propTypes2['default'].oneOfType([_propTypes2['default'].element, _propTypes2['default'].oneOf([false])]),
        customOnKeyDown: _propTypes2['default'].func,
        disableCloseOnEsc: _propTypes2['default'].bool,
        dragToggleDistance: _propTypes2['default'].number,
        height: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].string]),
        id: _propTypes2['default'].string,
        isOpen: _propTypes2['default'].bool,
        noOverlay: _propTypes2['default'].bool,
        onStateChange: _propTypes2['default'].func,
        outerContainerId: styles && styles.outerContainer ? _propTypes2['default'].string.isRequired : _propTypes2['default'].string,
        pageWrapId: styles && styles.pageWrap ? _propTypes2['default'].string.isRequired : _propTypes2['default'].string,
        position: _propTypes2['default'].oneOf(['right', 'left', 'bottom', 'top']),
        styles: _propTypes2['default'].object,
        touchHandleWidth: _propTypes2['default'].number,
        width: _propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].string])
    };

    Menu.defaultProps = {
        breakpoint: 960,
        disableCloseOnEsc: false,
        dragToggleDistance: 30,
        height: 350,
        id: '',
        noOverlay: false,
        onStateChange: function onStateChange() {},
        outerContainerId: '',
        pageWrapId: '',
        position: 'left',
        styles: {},
        touchHandleWidth: 100,
        width: 300
    };

    return Menu;
};

module.exports = exports['default'];