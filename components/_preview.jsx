const React = require('react');

const ROOT_ELEMENT_ID_PREFIX = 'root-';


// Basic component/variant server-side renderer
// --------------------------------------------

class Variant extends React.Component {
  render() {
    return (
      <div id={this.props.rootElementId} dangerouslySetInnerHTML={this.renderInner()} />
    );
  }

  renderInner() {
    return {
      __html: this.props.content
    };
  }
}


// Shuttles data to client-side React via <script>
// -----------------------------------------------

class Shuttle extends React.Component {
  render() {
    return (
      <script dangerouslySetInnerHTML={this.renderInner()} />
    );
  }

  renderInner() {
    return {
      __html: `
        window.__phenotypesReactData__ = ${JSON.stringify(this.props.data).replace(/</g, '\\u003c')};
      `
    };
  }
}


// Preview wrapper
// ---------------
// This preview template does the following:
//
//   * Includes component styles and preview styles
//   * Renders the React component and variants (if applicable)
//   * Shuttles data to the client side so that React can re-render and take over
//   * Includes the webpack bundle

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.isCollated = this.props._target.component.isCollated;
    this.variants = this.collectVariants();
    this.shuttleData = this.compileShuttleData();
  }

  render() {

    return (
      <div>
        {/* <link media="all" rel="stylesheet" href="/css/main.css" /> */}
        {/* <link media="all" rel="stylesheet" href="/css/preview.css" /> */}

        {this.variants.map(variant => {
          const rootElementId = ROOT_ELEMENT_ID_PREFIX + variant.handle;

          // NOTE: server rendering only works for non-collated components
          // because this.props.yield puts all the components in one string
          // when it's rendered on the server for a collated component.
          const content = this.isCollated ? '' : this.props.yield;

          return (
            <Variant key={rootElementId}
              rootElementId={rootElementId}
              content={content}
            />
          );
        })}

        <Shuttle data={this.shuttleData} />

        <script type="text/javascript" src="/js/bundle.js"></script>
      </div>
    );
  }

  // Returns an array with one or more component variant objects in a reliable format.
  collectVariants() {
    const component = this.props._target.component;

    if(this.isCollated) {
      // In collated mode, each variant has its context attached.
      return component.variants.items;
    }

    else {
      // When not collated, the context is on the component's parent (_target)
      // so we move it to the component object.
      const componentWithContext = Object.assign({}, component, {
        context: this.props._target.context
      });
      return [componentWithContext];
    }
  }

  // Compiles data about component variants to shuttle to client side.
  compileShuttleData() {
    return this.variants.map(item => ({
      baseHandle: item.baseHandle,
      context: item.context,
      rootElementId: ROOT_ELEMENT_ID_PREFIX + item.handle
    }));
  }
}

module.exports = Preview;
