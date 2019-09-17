import left from './leftScreen'
import right from './rightScreen'
window.addEventListener('resize', function (event) {

    left.scale.resize(window.innerWidth / 2, window.innerHeight);
    right.scale.resize(window.innerWidth / 2, window.innerHeight);

}, false);