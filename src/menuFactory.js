import React, { Component, Children, cloneElement } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import baseStyles from './baseStyles';
import BurgerIcon from './BurgerIcon';
import CrossIcon from './CrossIcon';


const defaultStyles = {
    dragHandle: {
        zIndex: 1,
        position: 'fixed',
        top: 0,
        bottom: 0,
    },
};

export default (styles) => {
    class Menu extends Component {
        constructor(props) {
            super(props);

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
                dragSupported: false,
            };

            this.onTouchStart = this.onTouchStart.bind(this);
            this.onTouchMove = this.onTouchMove.bind(this);
            this.onTouchEnd = this.onTouchEnd.bind(this);
            this.onScroll = this.onScroll.bind(this);
            this.saveSidebarRef = this.saveSidebarRef.bind(this);
        }

        toggleMenu() {
            const newState = { isOpen: !this.state.isOpen };

            this.applyWrapperStyles();

            this.setState(newState, () => {
                this.props.onStateChange(newState);

                // Timeout ensures wrappers are cleared after animation finishes.
                this.timeoutId && clearTimeout(this.timeoutId);
                this.timeoutId = setTimeout(() => {
                    this.timeoutId = null;
                    if (!newState.isOpen) {
                        this.clearWrapperStyles();
                    }
                }, 500);
            });
        }

        // Applies component-specific styles to external wrapper elements.
        applyWrapperStyles() {
            if (styles.pageWrap && this.props.pageWrapId) {
                this.handleExternalWrapper(this.props.pageWrapId, styles.pageWrap, true);
            }

            if (styles.outerContainer && this.props.outerContainerId) {
                this.handleExternalWrapper(this.props.outerContainerId, styles.outerContainer, true);
            }
        }

        // Removes component-specific styles applied to external wrapper elements.
        clearWrapperStyles() {
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
        handleExternalWrapper(id, wrapperStyles, set) {
            const html = document.querySelector('html');
            const body = document.querySelector('body');
            const wrapper = document.getElementById(id);

            if (!wrapper) {
                if (!this.state.isOpen) console.error('Element with ID \'' + id + '\' not found');
                return;
            }

            const builtStyles = this.getStyle(wrapperStyles);

            for (const prop in builtStyles) {
                if (builtStyles.hasOwnProperty(prop)) {
                    wrapper.style[prop] = set ? builtStyles[prop] : '';
                }
            }

            // Prevent any horizontal scroll.
            [html, body].forEach((element) => {
                element.style['overflow-x'] = set ? 'hidden' : '';
            });
        }

        // Builds styles incrementally for a given element.
        getStyles(el, index, inline, children) {
            const propName = 'bm' + el.replace(el.charAt(0), el.charAt(0).toUpperCase());

            // Set base styles.
            let output = baseStyles[el] ? this.getStyle(baseStyles[el]) : {};

            // Add animation-specific styles.
            if (styles[el]) {
                output = {
                    ...output,
                    ...this.getStyle(styles[el], index + 1, children)
                };
            }

            // Add custom styles.
            if (this.props.styles[propName]) {
                output = {
                    ...output,
                    ...this.props.styles[propName]
                };
            }

            // Add element inline styles.
            if (inline) {
                output = {
                    ...output,
                    ...inline
                };
            }

            return output;
        }

        getStyle(style, index, children) {
            let {width, height} = this.props;

            // Uncomment this line to change Menu to accept other values than pixels, this requires change to the API
            // Supported units are `px`, `rem`, `em`, `vh`, `vw`, `vmin`, `vmax` (% don't work everywhere)
            if (typeof width !== 'string') width = `${width}px`;
            if (typeof height !== 'string') height = `${height}px`;

            return style(this.state.isOpen, width, height, this.props.position, this.props.breakpoint, index, children);
        }

        listenForClose(e) {
            e = e || window.event;

            if (this.state.isOpen && (e.key === 'Escape' || e.keyCode === 27)) {
                this.toggleMenu();
            }
        }

        componentWillMount() {
            if (!styles) {
                throw new Error('No styles supplied');
            }

            // Allow initial open state to be set by props.
            if (this.props.isOpen) {
                this.toggleMenu();
            }
        }

        componentDidMount() {
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
                dragSupported: typeof window === 'object' && 'ontouchstart' in window,
            });
            this.saveSidebarWidth();
        }

        componentWillUnmount() {
            window.onkeydown = null;

            this.clearWrapperStyles();
        }

        componentDidUpdate() {
            if (styles.svg) {
                const morphShape = ReactDOM.findDOMNode(this, 'bm-morph-shape');
                const path = styles.svg.lib(morphShape).select('path');

                if (this.state.isOpen) {
                    // Animate SVG path.
                    styles.svg.animate(path);
                } else {
                    // Reset path (timeout ensures animation happens off screen).
                    setTimeout(() => {
                        path.attr('d', styles.svg.pathInitial);
                    }, 300);
                }
            }

            // filter out the updates when we're touching
            if (!this.isTouching()) {
                this.saveSidebarWidth();
            }
        }

        componentWillReceiveProps(nextProps) {
            if (typeof nextProps.isOpen !== 'undefined' && nextProps.isOpen !== this.state.isOpen) {
                this.toggleMenu();
            }
        }

        isTouching() {
            return this.state.touchIdentifier !== null;
        }

        onTouchStart(ev) {
            // filter out if a user starts swiping with a second finger
            if (!this.isTouching()) {
                const touch = ev.targetTouches[0];
                this.setState({
                    touchIdentifier: touch.identifier,
                    touchStartX: touch.clientX,
                    touchStartY: touch.clientY,
                    touchCurrentX: touch.clientX,
                    touchCurrentY: touch.clientY,
                });
            }
        }

        onTouchMove(ev) {
            if (this.isTouching()) {
                for (let ind = 0; ind < ev.targetTouches.length; ind++) {
                    // we only care about the finger that we are tracking
                    if (ev.targetTouches[ind].identifier === this.state.touchIdentifier) {
                        this.setState({
                            touchCurrentX: ev.targetTouches[ind].clientX,
                            touchCurrentY: ev.targetTouches[ind].clientY,
                        });
                        break;
                    }
                }
            }
        }

        onTouchEnd() {
            if (this.isTouching()) {
                // trigger a change to open if sidebar has been dragged beyond dragToggleDistance
                const touchWidth = this.touchSidebarWidth();

                if (this.state.isOpen && touchWidth < this.state.sidebarWidth - this.props.dragToggleDistance ||
                    !this.state.isOpen && touchWidth > this.props.dragToggleDistance) {
                    this.setState({ isOpen: !this.state.isOpen });
                }

                this.setState({
                    touchIdentifier: null,
                    touchStartX: null,
                    touchStartY: null,
                    touchCurrentX: null,
                    touchCurrentY: null,
                });
            }
        }

        // calculate the sidebarWidth based on current touch info
        touchSidebarWidth() {
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
        onScroll() {
            if (this.isTouching() && this.inCancelDistanceOnScroll()) {
                this.setState({
                    touchIdentifier: null,
                    touchStartX: null,
                    touchStartY: null,
                    touchCurrentX: null,
                    touchCurrentY: null,
                });
            }
        }

        // True if the on going gesture X distance is less than the cancel distance
        inCancelDistanceOnScroll() {
            const { touchCurrentX, touchStartX, } = this.state;
            const { position } = this.props;

            const CANCEL_DISTANCE_ON_SCROLL = 20;
            let cancelDistanceOnScroll;

            if (position === 'right') {
                cancelDistanceOnScroll = Math.abs(touchCurrentX - touchStartX) <
                    CANCEL_DISTANCE_ON_SCROLL;
            } else if (position === 'left') {
                cancelDistanceOnScroll = Math.abs(touchStartX - touchCurrentX) < CANCEL_DISTANCE_ON_SCROLL;
            } else return;
            return cancelDistanceOnScroll;
        }

        saveSidebarWidth() {
            const width = this.sidebar.offsetWidth;

            if (width !== this.state.sidebarWidth) {
                this.setState({ sidebarWidth: width });
            }
        }

        saveSidebarRef(node) {
            this.sidebar = node;
        }

        render() {
            const { isOpen, dragSupported } = this.state;
            const { touchHandleWidth, position, noOverlay, id, className, customCrossIcon, customBurgerIcon, styles, children } = this.props;

            const rootProps = {};
            let dragHandle;

            if (dragSupported) {
                if (isOpen) {
                    rootProps.onTouchStart = this.onTouchStart;
                    rootProps.onTouchMove = this.onTouchMove;
                    rootProps.onTouchEnd = this.onTouchEnd;
                    rootProps.onTouchCancel = this.onTouchEnd;
                    rootProps.onScroll = this.onScroll;
                } else {
                    const dragHandleStyle = {...defaultStyles.dragHandle};
                    dragHandleStyle.width = touchHandleWidth;

                    // dragHandleStyle right/left
                    if (position === 'left') {
                        dragHandleStyle.left = 0;
                    } else if (position === 'right') {
                        dragHandleStyle.right = 0;
                    }

                    dragHandle = (position === 'left' || position === 'right') && (
                        <div style={dragHandleStyle}
                             onTouchStart={this.onTouchStart}
                             onTouchMove={this.onTouchMove}
                             onTouchEnd={this.onTouchEnd}
                             onTouchCancel={this.onTouchEnd} />
                    );
                }
            }

            return (
                <div {...rootProps}>

                    {dragHandle}

                    {!noOverlay && (
                        <div className="bm-overlay"
                             onClick={() => this.toggleMenu()}
                             style={this.getStyles('overlay')}/>
                    )}

                    <div id={id}
                         className={`bm-menu-wrap ${className || ''}`}
                         style={this.getStyles('menuWrap')}>

                        {styles.svg ? (
                            <div className="bm-morph-shape" style={this.getStyles('morphShape')}>
                                <svg width="100%" height="100%" viewBox="0 0 100 800" preserveAspectRatio="none">
                                    <path d={styles.svg.pathInitial}/>
                                </svg>
                            </div>
                        ) : null}

                        <div className="bm-menu"
                             style={this.getStyles('menu')}
                             ref={this.saveSidebarRef}>
                            <nav className="bm-item-list"
                                 style={this.getStyles('itemList')}>

                                {Children.map(children, (item, index) => {
                                    if (item) {
                                        const kids = children.length;
                                        const extraProps = {
                                            key: index,
                                            style: this.getStyles('item', index, item.props.style, kids)
                                        };
                                        return cloneElement(item, extraProps);
                                    }
                                })}

                            </nav>
                        </div>

                        {customCrossIcon !== false ? (
                            <div style={this.getStyles('closeButton')}>
                                <CrossIcon onClick={() => this.toggleMenu()}
                                           styles={styles}
                                           customIcon={customCrossIcon}/>
                            </div>
                        ) : null}

                    </div>

                    {customBurgerIcon !== false ? (
                        <BurgerIcon onClick={() => this.toggleMenu()}
                                    styles={styles}
                                    customIcon={customBurgerIcon}/>
                    ) : null}

                </div>
            );
        }
    }

    Menu.propTypes = {
        breakpoint: PropTypes.number,
        className: PropTypes.string,
        customBurgerIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.oneOf([false])]),
        customCrossIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.oneOf([false])]),
        customOnKeyDown: PropTypes.func,
        disableCloseOnEsc: PropTypes.bool,
        dragToggleDistance: PropTypes.number,
        height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        id: PropTypes.string,
        isOpen: PropTypes.bool,
        noOverlay: PropTypes.bool,
        onStateChange: PropTypes.func,
        outerContainerId: styles && styles.outerContainer ? PropTypes.string.isRequired : PropTypes.string,
        pageWrapId: styles && styles.pageWrap ? PropTypes.string.isRequired : PropTypes.string,
        position: PropTypes.oneOf(['right', 'left', 'bottom', 'top']),
        styles: PropTypes.object,
        touchHandleWidth: PropTypes.number,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    };

    Menu.defaultProps = {
        breakpoint: 960,
        disableCloseOnEsc: false,
        dragToggleDistance: 30,
        height: 350,
        id: '',
        noOverlay: false,
        onStateChange: () => {},
        outerContainerId: '',
        pageWrapId: '',
        position: 'left',
        styles: {},
        touchHandleWidth: 100,
        width: 300
    };

    return Menu;
};
