"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _bind = require("classnames/bind");

var _bind2 = _interopRequireDefault(_bind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Wrap potential stateless Components and start this whole thingy!
function receiveComponent(Component, styles) {
  var _Component = Component;

  // Stateless Components are just functions like other React Components, but
  // they don't have a render method, because they'll render directly
  if (!("prototype" in Component && typeof Component.prototype.render === "function")) {
    _Component = wrapStatelessComponent(Component);
  }

  return transformedElement(_Component, styles);
}

// return a new Component based on the original Component
// with a transformed renderer
var transformedElement = function transformedElement(Component, styles) {
  return (function (_Component2) {
    _inherits(_class, _Component2);

    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
    }

    _createClass(_class, [{
      key: "render",
      value: function render() {
        var cx = _bind2.default.bind(styles);
        return transformElement(_get(Object.getPrototypeOf(_class.prototype), "render", this).call(this), cx);
      }
    }]);

    return _class;
  })(Component);
};

// transform the element
// - recursive transform its children (see recursiveTransform())
// - Generate the className
// - copy the props, inject the new className
// - return a cloned element
var transformElement = function transformElement(element, cx) {
  // Straight return elements, which render to undefined
  if (!element) {
    return element;
  }

  var _props = undefined,
      _className = undefined,

  // Here we start the recursion
  children = recursiveTransform(element.props.children, cx);

  // Support string classnames
  if (typeof element.props.className === "string") {
    _className = element.props.className.split(" ");
  }

  // Support object classnames for classnames module
  else {
      _className = element.props.className;
    }

  // copy props and override the className
  _props = _extends({}, element.props, {
    className: cx(_className)
  });

  // delete the className, if it is empty
  // Note:
  // ... yeah, this is kinda silly, we could've checked earlier if the className
  // iss empty. But I think it's less code. Less code makes our files smaller,
  // and that's a good thing.
  if (_props.className === "") delete _props.className;

  return _react2.default.cloneElement(element, _props, children);
};

// handler for recursive looping and delegating children of a
// Component or simple Element
function recursiveTransform(element, cx) {
  // Straight transform a valid element
  if (_react2.default.isValidElement(element)) {
    return transformElement(element, cx);
  }

  // Loop through an array of elements
  else if (Object.prototype.toString.call(element) === "[object Array]") {
      return _react2.default.Children.map(element, function (child) {
        return recursiveTransform(child, cx);
      });
    }

    // This can either be string or undefined.
    // We don't need to transform them
    else {
        return element;
      }
}

// With React 0.14 we have these awesome stateless Components, but we need
// to wrap them in secret to a normal Component.
function wrapStatelessComponent(Component) {
  var Wrapped = (function (_React$Component) {
    _inherits(Wrapped, _React$Component);

    function Wrapped() {
      _classCallCheck(this, Wrapped);

      var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Wrapped).call(this));

      _this2.displayName = Component.name;
      return _this2;
    }

    _createClass(Wrapped, [{
      key: "render",
      value: function render() {
        return Component(this.props);
      }
    }]);

    return Wrapped;
  })(_react2.default.Component);

  // We need to consider the defaultProps and propTypes, too, when wrapping the
  // component

  if (Component.defaultProps) {
    Wrapped.defaultProps = Component.defaultProps;
  }
  if (Component.propTypes) {
    Wrapped.propTypes = Component.propTypes;
  }

  return Wrapped;
}

exports.default = receiveComponent;