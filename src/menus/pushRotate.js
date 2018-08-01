import menuFactory from '../menuFactory';

const styles = {

  pageWrap(isOpen, width, height, position) {
      switch (position) {
          case 'right':
              return {
                  MozTransform: isOpen ? '' : `translate3d(-${width}, 0, 0) rotateY(15deg)`,
                  MsTransform: isOpen ? '' : `translate3d(-${width}, 0, 0) rotateY(15deg)`,
                  OTransform: isOpen ? '' : `translate3d(-${width}, 0, 0) rotateY(15deg)`,
                  WebkitTransform: isOpen ? '' : `translate3d(-${width}, 0, 0) rotateY(15deg)`,
                  transform: isOpen ? '' : `translate3d(-${width}, 0, 0) rotateY(15deg)`,
                  transformOrigin: '100% 50%',
                  transformStyle: 'preserve-3d',
                  transition: 'all 0.5s',
              };

          case 'left':
              return {
                  MozTransform: isOpen ? '' : `translate3d(${width}, 0, 0) rotateY(-15deg)`,
                  MsTransform: isOpen ? '' : `translate3d(${width}, 0, 0) rotateY(-15deg)`,
                  OTransform: isOpen ? '' : `translate3d(${width}, 0, 0) rotateY(-15deg)`,
                  WebkitTransform: isOpen ? '' : `translate3d(${width}, 0, 0) rotateY(-15deg)`,
                  transform: isOpen ? '' : `translate3d(${width}, 0, 0) rotateY(-15deg)`,
                  transformOrigin: '0% 50%',
                  transformStyle: 'preserve-3d',
                  transition: 'all 0.5s',
              };

          case 'bottom':
              return {
                  MozTransform: isOpen ? '' : `translate3d(0, -${height}, 0) rotateX(25deg)`,
                  MsTransform: isOpen ? '' : `translate3d(0, -${height}, 0) rotateX(25deg)`,
                  OTransform: isOpen ? '' : `translate3d(0, -${height}, 0) rotateX(25deg)`,
                  WebkitTransform: isOpen ? '' : `translate3d(0, -${height}, 0) rotateX(25deg)`,
                  transform: isOpen ? '' : `translate3d(0, -${height}, 0) rotateX(25deg)`,
                  transition: 'all 0.5s',
              };

          case 'top':
              return {
                  MozTransform: isOpen ? '' : `translate3d(0, ${height}, 0) rotateX(25deg)`,
                  MsTransform: isOpen ? '' : `translate3d(0, ${height}, 0) rotateX(25deg)`,
                  OTransform: isOpen ? '' : `translate3d(0, ${height}, 0) rotateX(25deg)`,
                  WebkitTransform: isOpen ? '' : `translate3d(0, ${height}, 0) rotateX(25deg)`,
                  transform: isOpen ? '' : `translate3d(0, ${height}, 0) rotateX(25deg)`,
                  transition: 'all 0.5s',
              };
      }
  },

  outerContainer(isOpen) {
    return {
      perspective: '1500px',
      overflow: isOpen ? '' : 'hidden'
    };
  }
};

export default menuFactory(styles);
