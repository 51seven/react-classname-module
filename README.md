# React Classname Module

**React Classname Module** allows you to write your classnames for [CSS Modules](https://github.com/css-modules/css-modules) as easy as without CSS Modules. It's build with [classnames](https://github.com/JedWatson/classnames), so you have a simple and powerful way to write your classnames.

**Notice: This is currently in an early alpha stage**

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