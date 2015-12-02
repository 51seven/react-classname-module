<h1 align="center">
  <a href="https://github.com/51seven/react-classname-module">
    <img src="https://cloud.githubusercontent.com/assets/4227520/11537012/6b6c382c-991b-11e5-9a63-af5d1c988f0d.png" alt="React Classname Module" />
  </a>
</h1>

<p align="right">
  <a href="https://www.npmjs.com/package/react-classname-module">
    <img src="https://img.shields.io/npm/v/react-classname-module.svg" alt="react-classname-module on npm" />
  </a>
</p>

**React Classname Module** allows you to write your classnames for [CSS Modules](https://github.com/css-modules/css-modules) as easy as without CSS Modules. It's build with [classnames](https://github.com/JedWatson/classnames), so you have a simple and powerful way to write your classnames.

**Notice:** This is currently a 0.x version. What this actually means is that it works in our project but we're too busy to write tests to be sure that it'll work in your project, too.

## Install

`npm install --save react-classname-module`

## How?

See this example. Yuck, it sucks!

```JSX
import React from "react";
import styles from "styles.css";

class MyComponent extends React.Component {
  render() {
    return (
      <div className={styles.head}>
        <h1 className={styles["headline--h1"]}>Lorem ipsum</h1>
        <div className={styles.content}>
          ...
        </div>
      </div>
    );
  }
}

export default MyComponent;
```

With **React Classname Module** you can simply write this nice little piece of code:

```JSX
import React from "react";
import cm from "react-classname-module";
import styles from "styles.css";

class MyComponent extends React.Component {
  render() {
    return (
      <div className="head">
        <h1 className="headline--h1">Lorem ipsum</h1>
        <div className="content">
          ...
        </div>
      </div>
    );
  }
}

export default cm(MyComponent, styles);
```

And that's it.

## Features

* Supports local and global classnames
* Works with stateless Components
* Works with multiple classes: `className="btn btn-highlight"`
* Works with [classnames](https://github.com/JedWatson/classnames)

## Doesn't support (currently)

* identical local and global classnames
* merging `className` on a React Component:  
  e.g. `<Foo className="bar" />` will override the Components className with the CSS Module `"bar"`

## Supporting classnames

Instead of writing a string into classname, you can pass a typical [classnames](https://github.com/JedWatson/classnames) object into it.

```JSX
let classnames = {
  foo: true,
  bar: true,
  "foo-bar": false
}

<div className={classnames}></div>
```

## Changelog

### v0.1.1

* Fixed missing `defaultProps` and `propTypes` in stateless Components


### v0.1.0

* Removed silly dead code
* Support for stateless components


### v0.0.1

* initial version
