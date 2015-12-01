import React from "react"
import classNames from "classnames/bind"

// Wrap potential stateless Components and start this whole thingy!
function receiveComponent(Component, styles) {
  let _Component = Component

  // Stateless Components are just functions like other React Components, but
  // they don't have a render method, because they'll render directly
  if (!("prototype" in Component && typeof Component.prototype.render === "function")) {
    _Component = wrapStatelessComponent(Component)
  }

  return transformedElement(_Component, styles)
}

// return a new Component based on the original Component
// with a transformed renderer
var transformedElement = (Component, styles) => {
  return class extends Component {
    render() {
      let cx = classNames.bind(styles)
      return transformElement(super.render(), cx)
    }
  }
}

// transform the element
// - recursive transform its children (see recursiveTransform())
// - Generate the className
// - copy the props, inject the new className
// - return a cloned element
var transformElement = (element, cx) => {
  // Straight return elements, which render to undefined
  if (!element) {
    return element
  }

  let _props,
    _className,

    // Here we start the recursion
    children = recursiveTransform(element.props.children, cx)

  // Support string classnames
  if (typeof element.props.className === "string") {
    _className = element.props.className.split(" ")
  }

  // Support object classnames for classnames module
  else {
    _className = element.props.className
  }

  // copy props and override the className
  _props = {
    ...element.props,
    className: cx(_className)
  }

  // delete the className, if it is empty
  // Note:
  // ... yeah, this is kinda silly, we could've checked earlier if the className
  // iss empty. But I think it's less code. Less code makes our files smaller,
  // and that's a good thing.
  if (_props.className === "")
    delete _props.className

  return React.cloneElement(element, _props, children)
}

// handler for recursive looping and delegating children of a
// Component or simple Element
function recursiveTransform(element, cx) {
  // Straight transform a valid element
  if (React.isValidElement(element)) {
    return transformElement(element, cx)
  }

  // Loop through an array of elements
  else if (Object.prototype.toString.call(element) === "[object Array]") {
    return React.Children.map(element, (child) => {
      return recursiveTransform(child, cx)
    })
  }

  // This can either be string or undefined.
  // We don't need to transform them
  else {
    return element
  }
}

// With React 0.14 we have these awesome stateless Components, but we need
// to wrap them in secret to a normal Component.
function wrapStatelessComponent(Component) {
  class Wrapped extends React.Component {
    constructor() {
      super()
      this.displayName = Component.name
    }

    render() {
      return Component(this.props)
    }
  }

  // We need to consider the defaultProps and propTypes, too, when wrapping the
  // component
  if (Component.defaultProps) {
    Wrapped.defaultProps = Component.defaultProps
  }
  if (Component.propTypes) {
    Wrapped.propTypes = Component.propTypes
  }

  return Wrapped
}

export default receiveComponent
