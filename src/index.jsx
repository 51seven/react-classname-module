import React from "react"
import classNames from "classnames/bind"

var transformedElement = (Component, styles) => {
  return class extends Component {
    render() {
      let cx = classNames.bind(styles)
      return transformElement(super.render(), cx)
    }
  }
}

var transformElement = (element, cx) => {
  let children = recursiveTransform(element.props.children, cx)
  let _props
  if ("prototype" in element && typeof element.prototype.render === "function") {
    _props = element.props
  }
  else {
    let _className
    if (typeof element.props.className === "string") {
      _className = element.props.className.split(" ")
    } else {
      _className = element.props.className
    }

    _props = {
      className: cx(_className)
    }
    Object.assign(_props, ...element.props)


    if (_props.className === "")
      delete _props.className
  }

  return React.cloneElement(element, _props, children)
}

function recursiveTransform(element, cx) {
  if (typeof element === "string")
    return element

  if (React.isValidElement(element)) {
    return transformElement(element, cx)
  }

  if (Object.prototype.toString.call(element) === "[object Array]") {
    return React.Children.map(element, (child) => {
      if (React.isValidElement(child)) {
        return transformElement(child, cx)
      } else {
        return child
      }
    })
  }

}

function transformCssModule(Component, styles) {
  return transformedElement(Component, styles)
}

export default transformCssModule
