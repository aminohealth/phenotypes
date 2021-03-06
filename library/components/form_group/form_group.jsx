import * as React from 'react';
import classes from 'classnames';

import TextInput from '../text_input/text_input.jsx';

class FormGroup extends React.Component {
  renderChildren() {
    // Preview environment won't have a child prop, so we have to supply a default one here:
    if (this.props.__preview) {
      return (
        <TextInput id={this.props.controlId} placeholder="Placeholder text" />
      );
    }
    return this.props.children;
  }

  renderHint() {
    return (
      !!this.props.hint && (
        <div className="FormGroup__hint">{this.props.hint}</div>
      )
    );
  }

  renderError() {
    const hasError = !!this.props.error;
    return (
      hasError && (
        <div
          id={this.props.errorId}
          className="FormGroup__error"
          aria-live="assertive" // A live region scenario is when an error message is displayed to users only after they have provided invalid information
        >
          {this.props.error}
        </div>
      )
    );
  }
  renderLabel() {
    return (
      !!this.props.label && (
        <label htmlFor={this.props.controlId} className="FormGroup__label">
          {this.props.label}
        </label>
      )
    );
  }

  render() {
    const hasError = !!this.props.error;
    return (
      <div
        className={classes(this.props.className, 'FormGroup', {
          'FormGroup--has-error': hasError,
        })}
      >
        {this.renderLabel()}
        {this.renderChildren()}
        {this.renderError()}
        {this.renderHint()}
      </div>
    );
  }
}

export default FormGroup;
