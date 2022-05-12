"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

$(document).ready(function () {
  $('.carousel__wrapper').slick({
    prevArrow: "<button type=\"button\" class=\"carousel__arrow-left\"><img src=\"img/icons/arrow_l.png\" alt=\"arrow\"></button>",
    nextArrow: "<button type=\"button\" class=\"carousel__arrow-right\"><img src=\"img/icons/arrow_r.png\" alt=\"arrow\"></button>"
  });
});
var content = document.querySelectorAll('.catalog__content');
var contentItem = document.querySelectorAll('.content-item');
var tabs = document.querySelectorAll('.catalog__tab');
var wrapperInfo = document.querySelectorAll('.content-item__wrapper-info');
var wrapper = document.querySelectorAll('.content-item__wrapper');

var changeInnerMoreLink = function changeInnerMoreLink(e) {
  e.target.innerHTML === 'ПОДРОБНЕЕ' ? e.target.innerHTML = 'НАЗАД' : e.target.innerHTML = 'ПОДРОБНЕЕ';
};

var removeActiveTab = function removeActiveTab() {
  tabs.forEach(function (item) {
    item.classList.remove('catalog__tab_active');
  });
};

var closeTextInfo = function closeTextInfo() {
  wrapperInfo.forEach(function (item) {
    item.classList.add('content-item__wrapper-info_disable');
  });
  wrapper.forEach(function (item) {
    item.classList.remove('content-item__wrapper_disable');
  });
};

contentItem.forEach(function (item) {
  var _item$children = _slicedToArray(item.children, 3),
      wrapper = _item$children[0],
      wrapperInfo = _item$children[1],
      link = _item$children[2];

  link.addEventListener('click', function (e) {
    e.preventDefault();
    changeInnerMoreLink(e);
    wrapper.classList.toggle('content-item__wrapper_disable');
    wrapperInfo.classList.toggle('content-item__wrapper-info_disable');
  });
});
tabs.forEach(function (tab) {
  tab.addEventListener('click', function () {
    removeActiveTab();
    closeTextInfo();
    tab.classList.add('catalog__tab_active');
    var attribute = tab.attributes.data.value;
    content.forEach(function (item) {
      attribute === item.attributes.data.value ? item.classList.add('catalog__content_active') : item.classList.remove('catalog__content_active');
    });
  });
}); // work with modals

var buttons = document.querySelectorAll('button');
var overlays = document.querySelectorAll('.overlay');

var overlayActive = function overlayActive(data) {
  overlays.forEach(function (overlay) {
    var _overlay$attributes = _slicedToArray(overlay.attributes, 1),
        dataOver = _overlay$attributes[0];

    data === dataOver.value ? overlay.classList.add('overlay_active') : null;
  });
};

buttons.forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    var _e$target$attributes = _slicedToArray(e.target.attributes, 1),
        data = _e$target$attributes[0];

    overlayActive(data.value);
  });
});