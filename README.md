[![NPM version][npm-version-image]][npm-url]

# Phenotypes

Phenotypes is Amino's design system—a set of guides and components that we use to design and build our products.

This repository contains the following resources:

* **Guides** — These document how to use the design system. Read about typography, color, and other concepts for designing and building Amino's products and assets.
* **Components** — React components that can be used in front-end projects.
* **Styles** — SASS and CSS stylesheets that can be used in front-end projects.

Phenotypes runs on [Fractal](http://fractal.build), a tool that hosts the guides, components, and styles, and displays them in a friendly web UI. Before contributing to Phenotypes components, familiarize yourself with [Fractal's documentation](http://fractal.build/guide). Just keep in mind that we're using React instead of Handlebars as our component rendering engine, so anything specific to Handlebars doesn't apply.

## Getting started

Here's how to get Phenotypes up and running locally:

* Have [Docker](https://www.docker.com) installed and working
* Clone this repo and `cd` into it.
* `make build`
* `make dev`
* Open [http://localhost:3000](http://localhost:3000) in a browser

While running, Fractal will watch your `components` and `guides` directories for changes. It will automatically reload itself and your browser as needed.

There are a couple other background watcher processes running that automatically compile JS and CSS as needed (`watchJs` and `watchCss`, respectively).

The `watchJs` script has Rollup automatically rebuild the client-side React bundle whenever components are changed. Here's the basic sequence of events:

* You update a component
* Fractal notices and fires an event on the server side
* We write out a mapping file of all components
* Rollup (via `watchJs`) detects that the component mapping file has changed and rebuilds the client-side rendering bundle

The `watchCss` script recompiles `phenotypes.css` whenever a SASS file in the `/styles` or `/library` directory tree changes. Note: phenotypes.css is version controlled so that it can be used in a project without requiring SASS. It's also symlinked into `/fractal_assets/css` so that it can be used in the Fractal preview.

To stop the server, just hit `^C`. If something weird is going on, try `make clean && make dev`.

To run Phenotypes without all the syncing and watching (e.g. for deployment), just run it like so:

```
$ make run
```

## Developing components

Each React component should go in a subdirectory of `components`. For example, a generic button component would be `components/button/button.jsx`.

In addition to the .jsx file, a component's directory can contain additional files that define how it will function in the Fractal viewer. Most importantly, each component should have a config file and a README.

Take a look at an existing component or the [Fractal components](http://fractal.build/guide/components) documentation for more details.

### Testing

Unit tests for a component should go in a component's directory. In the example above, tests for a generic button component would be `components/button/button.spec.js`. Tests are run with [Mocha](https://mochajs.org/) using the [Chai](http://chaijs.com/) assertion library and Airbnb's [Enzyme](https://github.com/airbnb/enzyme) as a React testing utility. Because Enzyme's `mount` API requires a DOM, test commands first load a document into the global scope using [JSDOM](https://github.com/tmpvar/jsdom).

To run all the tests:
```
$ make test
```

To run tests matching a regex pattern, first run `make shell` to create a shell inside the container then `npm run test --grep '<pattern>'`. The pattern should match text for the `describe` or `it` blocks for the suite or tests you want to run.

## Developing styles

The SASS file organization scheme is loosely based on Bootstrap 4. The entry point file is phenotypes.scss, which goes on to import all the things:

1. Webfonts
2. Feature toggles
3. Modular scale
4. Variables and mixins
5. Theme CSS variables
6. Reboot
7. Typography
8. Components
9. Utilities

Webfonts are imported first, because they're pulled in as a raw .css import. The webfont file has a CSS `@import` directive at the top, which must come first in the compiled stylesheet.

The next import is `_features.scss`, which contains a number of toggles for optional Phenotypes responsive utility modules, like flexbox, display, spacing, and text utilities. These utilities, which are all enabled by default, can create a LOT of compiled CSS, so they can be worth turning off if your project doesn't need them. To turn off a utility, override the corresponding variable before importing Phenotypes:

```
// _config.scss
$enable-spacing-utilities: false;

// main.scss
@import "config";
@import "phenotypes";
```

Modular scale helpers come next, since these variables and functions need to be defined for the subsequent files to function properly.

Variables that are used throughout Phenotypes are organized in `_variables.scss`. All variables are flagged as `!default`, which means they can be overridden similarly to the feature toggles:

```
// _config.scss
$grid-breakpoints: (
  xs: 0,
  md: 900px
);

// main.scss
@import "config";
@import "phenotypes";
```

The `_mixins.scss` file contains imports for functions and mixins that are used by other modules and components. Actual implementations should go in `styles/mixins`. E.g. `styles/mixins/_type.scss` contains both functions and mixins that help with typography.

The `_theme_config.scss` file contains a CSS ruleset that defines the theming CSS variables that Phenotypes uses. These are defined as CSS custom properties and allow custom themes for Phenotypes. Please see the [Theming guide](/guides/11-theming.md) for more info.

Phenotypes uses a slightly modified version of Bootstrap 4's reboot. [Read more about that.](https://v4-alpha.getbootstrap.com/content/reboot/)

The main `_type.scss` file contains styles for basic typographic and HTML elements. These styles should be lightweight and flexible so that they are easily overridden by more specific module and component styles. Note that there are also `mixins/_type.scss` and `utilities/_type.scss` for typography mixins and utilities, respectively.

Component styles are imported next. Each component should get its own stylesheet. TODO: more documentation once we have component styles.

Finally, utilities are imported. Similarly to mixins, each utility gets its own file in `styles/utilities`. E.g. `styles/utilities/_spacing.scss` contains spacing utilities. The utility files are aggregated together into `_utilities.scss`, which is imported into the main `phenotypes.scss` file.

The compiled CSS is provided as `@aminohealth/dist/phenotypes.css`. Using the SASS stylesheet is preferred, as you'll get access to all the variables and mixins. But for a simple project, it might make more sense to just use the pre-baked CSS.

## Publishing a release to npm

First, some npm stuff:

* If you don't have an npm account, create one and use `npm login` to login on the command line
* Get your npm username added to the @aminohealth organization

Then create the release:

* Create a new branch
* Use `npm version [patch|minor|major]` to create a commit and tag that bumps the package version. Use [semver](http://semver.org/) to decide whether the update is patch/minor/major.
* Create a PR and get that branch merged
* In github, create a PR to merge dev into master, and get that merged

Then publish the release:

* In the updated master branch, run
  * `yarn install` (to install rollup/etc on your machine)
  * `npm publish`
  * `git push --tags` (to push the tag created by `npm version` to github)
* In github, create a new release and describe the changes


## Using Phenotypes components and styles in a project

The following command will install Phenotypes into `@aminohealth/phenotypes`:

```
$ npm install @aminohealth/phenotypes --save
```

### SASS

The recommended way to use the styles for Phenotypes is to import the scss entrypoint phenotypes.scss in your own project. When installed via npm this will be located at `@aminohealth/phenotypes/styles/phenotypes.scss`. This does require your project to use [SASS](https://sass-lang.com/). This is; however, not required and for that reason we also provide plain old CSS that you are able to use.

**NOTE**  By default the phenotypes.scss entry point when compiled will include CSS variables in the output. CSS variables are required for custom themes. CSS variables will work fine for all evergreen browsers; however, if you need to support a browser that does not support CSS variables (IE) or do not require a custom theme, you can compile the CSS variables away (Or see the [Theming guide](/guides/11-theming.md) for supporting IE). CSS variables can be compiled away easily by post-processing via [postcss](https://postcss.org/) and using the [postcss-preset-env](https://preset-env.cssdb.org/) plugin. An example of how to do this is can be seen in our own build process when we compile the phenotypes.scss file to plain old CSS [here](./scripts/compileScss.js#L40-L48).

### CSS

If you do not want to use SASS there are two different CSS files that Phenotypes provides. The most straightforward of which is located at `@aminohealth/dist/css/phenotypes.css` when installed via npm. The other file is a themable CSS file that is located at `@aminohealth/dist/css/phenotypes.themable.css`. This file uses CSS variables to set theme variables and propagate those values to the Phenotypes styling. More information on this can be found in the [Theming guide](/guides/11-theming.md).

## Browser Support

CSS variables (used in theming) are [supported by all evergreen browsers](https://caniuse.com/#feat=css-variables). As with most modern web standards Internet Explorer is not supported by default. If you must support IE you can use the [css-vars-ponyfill](https://jhildenbiddle.github.io/css-vars-ponyfill/#/) that will compile away the CSS variables at runtime. This ponyfill will work for all browsers that do not support CSS variables not just IE.

### Peer Dependencies

Phenotypes relies on a few peer dependencies that are exluded from the final build in order to ensure there are no duplicate libraries that are shipped when you use it within your application. You will need to install these alongside Phenotypes to ensure that the React components work correctly. These include:

* @babel/runtime
* classnames
* keycode
* react
* react-dom

All of the react components are available as named imports from `@aminohealth/phenotypes`. In order to use the react components in your project import them like you would any other library. Example below:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@aminohealth/phenotypes';

ReactDOM.render(
  <Button>Click Me!</Button>,
  document.body
)
```

## Theming

Phenotypes allows you to theme the CSS and component library to suit your needs. Please see the [Theming guide](/guides/11-theming.md) for more information on how to customize and theme Phenotypes.

[npm-url]: https://www.npmjs.com/package/@aminohealth/phenotypes
[npm-version-image]: https://img.shields.io/npm/v/@aminohealth/phenotypes.svg?style=flat
