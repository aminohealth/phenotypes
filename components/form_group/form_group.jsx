const React = require('react');
const classes = require('classnames');

const responsiveClass = require('../_utilities/responsive_class.js');
const size = require('../_utilities/size.js');

const FormControl = require('../form_control/form_control.jsx');

class FormGroup extends React.Component {

  renderChildren() {
    // Preview environment won't have a child prop, so we have to supply a default one here:
    if (this.props.__preview) {
      return <FormControl id={this.props.controlId} placeholder="Placeholder text" />;
    }
    return this.props.children;
  }

  renderHint() {
    return !!this.props.hint && (
      <div className="FormGroup__hint">
        {this.props.hint}
      </div>
    );
  }

  renderError() {
    return !!this.props.error && (
      <div className="FormGroup__error">
        {this.props.error}
      </div>
    );
  }
  renderLabel() {
    return !!this.props.label && (
      <label htmlFor={this.props.controlId} className="FormGroup__label">
        {this.props.label}
      </label>
    );
  }

  render() {
    return (
      <div
        className={classes(
          this.props.className,
          'FormGroup',
          responsiveClass('FormGroup--small', this.props, size.isSmall),
          responsiveClass('FormGroup--large', this.props, size.isLarge),
          { 'FormGroup--has-error': !!this.props.error },
        )}
      >
        { this.renderLabel() }
        { this.renderChildren() }
        { this.renderError() }
        { this.renderHint() }
      </div>
    );
  }
}

module.exports = FormGroup;
