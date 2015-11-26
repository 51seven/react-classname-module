"use strict";

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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var transformedElement = function transformedElement(Component, styles) {
  return (function (_Component) {
    _inherits(_class, _Component);

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

var transformElement = function transformElement(element, cx) {
  var children = recursiveTransform(element.props.children, cx);
  var _props = undefined;
  if ("prototype" in element && typeof element.prototype.render === "function") {
    _props = element.props;
  } else {
    var _Object;

    var _className = undefined;
    if (typeof element.props.className === "string") {
      _className = element.props.className.split(" ");
    } else {
      _className = element.props.className;
    }

    _props = {
      className: cx(_className)
    };
    (_Object = Object).assign.apply(_Object, [_props].concat(_toConsumableArray(element.props)));

    if (_props.className === "") delete _props.className;
  }

  return _react2.default.cloneElement(element, _props, children);
};

function recursiveTransform(element, cx) {
  if (typeof element === "string") return element;

  if (_react2.default.isValidElement(element)) {
    return transformElement(element, cx);
  }

  if (Object.prototype.toString.call(element) === "[object Array]") {
    return _react2.default.Children.map(element, function (child) {
      if (_react2.default.isValidElement(child)) {
        return transformElement(child, cx);
      } else {
        return child;
      }
    });
  }
}

function transformCssModule(Component, styles) {
  return transformedElement(Component, styles);
}

exports.default = transformCssModule;