/*!
 * Copyright 2016, nju33
 * Released under the MIT License
 * https://github.com/totora0155/tsu.js
 */

 var box = null;
 var state = [];

 Tsu.config = {
   timeout: 2000,
 };

export default function Tsu(label, opts) {
  this.label = label;
  this.opts = {
    color: '#fff',
    size: 3,
  };

  if (opts.color != null) {
    this.opts.color = opts.color;
  }

  if (opts.size != null) {
    if (typeof opts.size !== 'number') {
      throw Error('Please `size` specify a number value');
    }
    this.opts.size = opts.size;
  }
}

Tsu.prototype.add = function add(msg) {
  if (!box) {
    box = init();
  }

  var log = create(this.label, msg, this.opts);
  insert(log);
  setTimeout(show.bind(null, log), 0);

  if (state.length > this.opts.size) {
    var target = state.pop();
    remove(target);
  }
}

function init() {
  injectStyle();
  var box = document.createElement('ul');
  box.className = 'tsu__box';
  document.body.appendChild(box);
  return box;
}

function create(label, msg, opts) {
  var log = document.createElement('li');
  log.className = 'tsu__log tsu__' + label;
  log.innerHTML =  '<div class="tsu__inner">' +
                     '<span>' + label + '</span>' +
                     '<span>' + msg + '</span>' +
                   '</div>';
  log.children[0].style.background = opts.color;
  return log;
}

function insert(el) {
  box.insertBefore(el, box.children[0]);
  el.setAttribute('data-height', el.children[0].clientHeight);
  state.unshift(el);
}

function show(el) {
  var height = el.getAttribute('data-height');
  el.style.height = height + 'px';
  el.style.opacity = 1;
}

function remove(el) {
  var height = el.getAttribute('data-height');
  el.style.opacity = 0;
  el.children[0].style.top = height + 'px';
  setTimeout(function() {
    el.parentNode.removeChild(el);
  }, 125);
}

function injectStyle() {
  var style = document.createElement('style');
  var easeOutBack = 'cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  var css = '.tsu__box {' +
              'position: fixed;' +
              'right: 50%;' +
              'top: 1em;' +
              '-ms-transform: translateX(50%);' +
              '-webkit-transform: translateX(50%);' +
              'transform: translateX(50%);' +
              'list-style: none;' +
            '}' +
            '.tsu__log {' +
              'overflow:hidden;' +
              'margin: .5em;' +
              '-webkit-transition:' +
                'height .2s ' + easeOutBack + ',' +
                'opacity .125s ease-out;' +
              'transition:' +
                'height .2s ' + easeOutBack + ',' +
                'opacity .125s ease-out;' +
              'height: 0;' +
              'opacity: 0;' +
            '}' +
            '.tsu__inner {' +
              'position: relative;' +
              'padding: .5em;' +
              '-webkit-transition: top .125s ease-out;' +
              'transition: top .125s ease-out;' +
              'top: 0;' +
            '}'
            ;
  style.innerText = css;
  document.head.insertBefore(style, document.head.children[0]);
}