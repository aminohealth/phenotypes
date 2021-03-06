import * as React from 'react';
import classes from 'classnames';

class Tab extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    if (this.props.href === '#') {
      event.preventDefault();
    }

    this.props.onClick && this.props.onClick();
  }

  render() {
    const {
      active,
      className,
      onClick: _onClick_,
      href,
      children,
      ...htmlProps
    } = this.props;

    return active ? (
      <span
        className={classes('Tab', 'Tab--is-active', className)}
        {...htmlProps}
      >
        {children}
      </span>
    ) : (
      <a
        className={classes('Tab', className)}
        href={href}
        onClick={this.handleClick}
        {...htmlProps}
      >
        {children}
      </a>
    );
  }
}

Tab.defaultProps = {
  href: '#',
  active: false,
};

export default Tab;
