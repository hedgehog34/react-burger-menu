'use strict';

import Snap from '../snapsvgImporter';
import menuFactory from '../menuFactory';

const styles = {

  svg: {
    lib: Snap,
    pathInitial: 'M-7.312,0H0c0,0,0,113.839,0,400c0,264.506,0,400,0,400h-7.312V0z',
    pathOpen: 'M-7.312,0H15c0,0,66,113.339,66,399.5C81,664.006,15,800,15,800H-7.312V0z;M-7.312,0H100c0,0,0,113.839,0,400c0,264.506,0,400,0,400H-7.312V0z',
    animate(path) {
      let pos = 0;
      let steps = this.pathOpen.split(';');
      let stepsTotal = steps.length;
      let mina = window.mina;

      let nextStep = function() {
        if (pos > stepsTotal - 1) return;

        path.animate({ path: steps[pos] }, pos === 0 ? 400 : 500, pos === 0 ? mina.easein : mina.elastic, () => {
          nextStep();
        });

        pos++;
      };

      nextStep();
    }
  },

  morphShape(isOpen, width, height, position) {
      switch (position) {
          case 'right':
              return {
                  position: 'fixed',
                  width: '100%',
                  height: '100%',
                  right: 'inherit',
                  left: 0,
                  MozTransform: 'rotateY(180deg)',
                  MsTransform: 'rotateY(180deg)',
                  OTransform: 'rotateY(180deg)',
                  WebkitTransform: 'rotateY(180deg)',
                  transform: 'rotateY(180deg)',
              };

          case 'left':
              return {
                  position: 'fixed',
                  width: '100%',
                  height: '100%',
                  right: 0,
                  left: 'inherit',
                  MozTransform: 'rotateY(0deg)',
                  MsTransform: 'rotateY(0deg)',
                  OTransform: 'rotateY(0deg)',
                  WebkitTransform: 'rotateY(0deg)',
                  transform: 'rotateY(0deg)',
              };

          case 'bottom':
              return {
                  position: 'fixed',
                  width: '100%',
                  height: `${height - 120}px`,
                  right: 'inherit',
                  left: 'inherit',
                  MozTransform: 'rotateY(90deg)',
                  MsTransform: 'rotateY(90deg)',
                  OTransform: 'rotateY(90deg)',
                  WebkitTransform: 'rotateY(90deg)',
                  transform: 'rotateY(90deg)',
              };
      }
  },

  menuWrap(isOpen, width, height, position) {
      switch (position) {
          case 'right':
              return {
                  MozTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)',
                  MsTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)',
                  OTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)',
                  WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)',
                  transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)',
                  transition: isOpen ? 'transform 0.4s 0s' : 'transform 0.4s'
              };

          case 'left':
              return {
                  MozTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
                  MsTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
                  OTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
                  WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
                  transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
                  transition: isOpen ? 'transform 0.4s 0s' : 'transform 0.4s'
              };

          case 'bottom':
              return {
                  MozTransform: isOpen ? '' : `translate3d(0, ${height}px, 0)`,
                  MsTransform: isOpen ? '' : `translate3d(0, ${height}px, 0)`,
                  OTransform: isOpen ? '' : `translate3d(0, ${height}px, 0)`,
                  WebkitTransform: isOpen ? '' : `translate3d(0, ${height}px, 0)`,
                  transform: isOpen ? '' : `translate3d(0, ${height}px, 0)`,
                  transition: isOpen ? 'transform 0.8s cubic-bezier(0.7, 0, 0.3, 1)' : 'transform 0.4s cubic-bezier(0.7, 0, 0.3, 1)'
              };
      }
  },

  menu(isOpen, width, height, position) {
      width -= 140;
      switch (position) {
          case 'right':
              return {
                  position: 'fixed',
                  MozTransform: isOpen ? '' : `translate3d(${width}, 0, 0)`,
                  MsTransform: isOpen ? '' : `translate3d(${width}, 0, 0)`,
                  OTransform: isOpen ? '' : `translate3d(${width}, 0, 0)`,
                  WebkitTransform: isOpen ? '' : `translate3d(${width}, 0, 0)`,
                  transform: isOpen ? '' : `translate3d(${width}px, 0, 0)`,
                  transition: isOpen ? 'opacity 0.1s 0.4s cubic-bezier(.17, .67, .1, 1.27), transform 0.1s 0.4s cubic-bezier(.17, .67, .1, 1.27)' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
                  opacity: isOpen ? 1 : 0,
              };

          case 'left':
              return {
                  position: 'fixed',
                  MozTransform: isOpen ? '' : `translate3d(-${width}, 0, 0)`,
                  MsTransform: isOpen ? '' : `translate3d(-${width}, 0, 0)`,
                  OTransform: isOpen ? '' : `translate3d(-${width}, 0, 0)`,
                  WebkitTransform: isOpen ? '' : `translate3d(-${width}, 0, 0)`,
                  transform: isOpen ? '' : `translate3d(-${width}px, 0, 0)`,
                  transition: isOpen ? 'opacity 0.1s 0.4s cubic-bezier(.17, .67, .1, 1.27), transform 0.1s 0.4s cubic-bezier(.17, .67, .1, 1.27)' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
                  opacity: isOpen ? 1 : 0,
              };

          case 'bottom':
              return {
                  position: 'fixed',
                  width: '100%',
                  MozTransform: isOpen ? '' : `translate3d(0, -${height}, 0)`,
                  MsTransform: isOpen ? '' : `translate3d(0, -${height}, 0)`,
                  OTransform: isOpen ? '' : `translate3d(0, -${height}, 0)`,
                  WebkitTransform: isOpen ? '' : `translate3d(0, -${height}, 0)`,
                  transform: isOpen ? '' : `translate3d(0, -${height}, 0)`,
                  transition: isOpen ? 'opacity 0.1s 0.4s cubic-bezier(.17, .67, .1, 1.27), transform 0.1s 0.4s cubic-bezier(.17, .67, .1, 1.27)' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
                  opacity: isOpen ? 1 : 0,
              };
      }
  },

  item(isOpen, width, height, position) {
      width -= 140;
      switch (position) {
          case 'right':
              return {
                  MozTransform: isOpen ? 'translate3d(0, 0, 0)' : `translate3d(${width}, 0, 0)`,
                  MsTransform: isOpen ? 'translate3d(0, 0, 0)' : `translate3d(${width}, 0, 0)`,
                  OTransform: isOpen ? 'translate3d(0, 0, 0)' : `translate3d(${width}, 0, 0)`,
                  WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : `translate3d(${width}, 0, 0)`,
                  transform: isOpen ? 'translate3d(0, 0, 0)' : `translate3d(${width}px, 0, 0)`,
                  transition: isOpen ? 'opacity 0.3s 0.4s, transform 0.3s 0.4s' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
                  opacity: isOpen ? 1 : 0,
              };

          case 'left':
              return {
                  MozTransform: isOpen ? 'translate3d(0, 0, 0)' : `translate3d(-${width}, 0, 0)`,
                  MsTransform: isOpen ? 'translate3d(0, 0, 0)' : `translate3d(-${width}, 0, 0)`,
                  OTransform: isOpen ? 'translate3d(0, 0, 0)' : `translate3d(-${width}, 0, 0)`,
                  WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : `translate3d(-${width}, 0, 0)`,
                  transform: isOpen ? 'translate3d(0, 0, 0)' : `translate3d(-${width}px, 0, 0)`,
                  transition: isOpen ? 'opacity 0.3s 0.4s, transform 0.3s 0.4s' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
                  opacity: isOpen ? 1 : 0,
              };

          case 'bottom':
              return {
                  MozTransform: isOpen ? 'translate3d(0, 0, 0)' : `translate3d(0, -${height}, 0)`,
                  MsTransform: isOpen ? 'translate3d(0, 0, 0)' : `translate3d(0, -${height}, 0)`,
                  OTransform: isOpen ? 'translate3d(0, 0, 0)' : `translate3d(0, -${height}, 0)`,
                  WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : `translate3d(0, -${height}, 0)`,
                  transform: isOpen ? 'translate3d(0, 0, 0)' : `translate3d(0, -${height}, 0)`,
                  transition: isOpen ? 'opacity 0.3s 0.4s, transform 0.3s 0.4s' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
                  opacity: isOpen ? 1 : 0,
              };
      }
  },

  closeButton(isOpen, width, height, position) {
      width -= 140;
      switch (position) {
          case 'right':
              return {
                  MozTransform: isOpen ? 'translate3d(0, 0, 0)' : `translate3d(${width}, 0, 0)`,
                  MsTransform: isOpen ? 'translate3d(0, 0, 0)' : `translate3d(${width}, 0, 0)`,
                  OTransform: isOpen ? 'translate3d(0, 0, 0)' : `translate3d(${width}, 0, 0)`,
                  WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : `translate3d(${width}, 0, 0)`,
                  transform: isOpen ? 'translate3d(0, 0, 0)' : `translate3d(${width}px, 0, 0)`,
                  transition: isOpen ? 'opacity 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27), transform 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27)' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
                  opacity: isOpen ? 1 : 0,
              };

          case 'left':
              return {
                  MozTransform: isOpen ? 'translate3d(0, 0, 0)' : `translate3d(-${width}, 0, 0)`,
                  MsTransform: isOpen ? 'translate3d(0, 0, 0)' : `translate3d(-${width}, 0, 0)`,
                  OTransform: isOpen ? 'translate3d(0, 0, 0)' : `translate3d(-${width}, 0, 0)`,
                  WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : `translate3d(-${width}, 0, 0)`,
                  transform: isOpen ? 'translate3d(0, 0, 0)' : `translate3d(-${width}px, 0, 0)`,
                  transition: isOpen ? 'opacity 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27), transform 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27)' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
                  opacity: isOpen ? 1 : 0,
              };

          case 'bottom':
              return {
                  MozTransform: isOpen ? 'translate3d(0, 0, 0)' : `translate3d(0, -${height}, 0)`,
                  MsTransform: isOpen ? 'translate3d(0, 0, 0)' : `translate3d(0, -${height}, 0)`,
                  OTransform: isOpen ? 'translate3d(0, 0, 0)' : `translate3d(0, -${height}, 0)`,
                  WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : `translate3d(0, -${height}, 0)`,
                  transform: isOpen ? 'translate3d(0, 0, 0)' : `translate3d(0, -${height}, 0)`,
                  transition: isOpen ? 'opacity 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27), transform 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27)' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
                  opacity: isOpen ? 1 : 0,
              };
      }
  }
};

export default menuFactory(styles);
