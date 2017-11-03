import React from 'react';
import classes from 'classnames';
import keycode from 'keycode';

function getFillStyle(valueAsPercentage) {
  return {
    right: `${100 - valueAsPercentage}%`,
    // When the handle is at the left edge, hide the fill line (w/ left: 0) so that it doesn't
    // peak out to the left of the handle.
    left: (valueAsPercentage === 0 ? 0 : null),
  };
}

function getTrackLineStyle(valueAsPercentage) {
  return {
    // When the handle is at one of the edges, bring the track in by one pixel so that it doesn't
    // peak out to the side of the handle.
    left: (valueAsPercentage === 0 ? '1px' : null),
    right: (valueAsPercentage === 100 ? '1px' : null),
  };
}

function getPercentage(value, min, max) {
  const percentage = ((value - min) / (max - min)) || 0;
  return percentage * 100;
}

function cleanFloat(value) {
  // Correct floating point weirdness - 5 points of precision is enough b/c the user won't be
  // able to get more delicate than that with their mouse/finger.
  return parseFloat(value.toFixed(5));
}

class Slider extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = { useFocusStyle: false };

    this.handleDrag = this.handleDrag.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleDragMouseEnd = this.handleDragMouseEnd.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  setValueFromEvent(event) {
    const { min, max, step, value, onChange } = this.props;
    const track = this.track.getBoundingClientRect();

    let eventX = event.touches ? event.touches[0].clientX : event.clientX;
    if (eventX < track.left) {
      eventX = track.left;
    } else if (eventX > track.right) {
      eventX = track.right;
    }

    let newValue = ((eventX - track.left) / track.width) * (max - min);
    newValue = Math.round(newValue / step) * step; // rounds to nearest `step`
    newValue += min;
    newValue = cleanFloat(newValue);

    if (onChange && newValue !== value) {
      onChange(newValue);
    }
  }

  handleDrag(event) {
    if (this.waitingForDragAnimationFrame) {
      return;
    }

    this.waitingForDragAnimationFrame = true;

    requestAnimationFrame(() => {
      this.waitingForDragAnimationFrame = false;

      if (!this.props.disabled) {
        this.setValueFromEvent(event);
      }
    });
  }

  handleMouseDown(event) {
    const { onMouseDown, onDragStart } = this.props;

    document.addEventListener('mousemove', this.handleDrag);
    document.addEventListener('mouseup', this.handleDragMouseEnd);

    this.setValueFromEvent(event);

    onMouseDown && onMouseDown(event);
    onDragStart && onDragStart(event);

    // Prevent text selection when dragging the slider (but still focus when clicking)
    event.preventDefault();
    this.focusedFromClick = true;
    this.slider.focus();
  }

  handleDragMouseEnd(event) {
    document.removeEventListener('mousemove', this.handleDrag);
    document.removeEventListener('mouseup', this.handleDragMouseEnd);
    this.props.onDragStop && this.props.onDragStop(event);
  }

  handleTouchStart(event) {
    const { onTouchStart, onDragStart } = this.props;

    document.addEventListener('touchmove', this.handleDrag);
    document.addEventListener('touchup', this.handleTouchEnd);
    document.addEventListener('touchend', this.handleTouchEnd);
    document.addEventListener('touchcancel', this.handleTouchEnd);

    this.setValueFromEvent(event);

    onTouchStart && onTouchStart(event);
    onDragStart && onDragStart(event);

    // Don't allow page scrolling while dragging the slider
    event.preventDefault();
  }

  handleTouchEnd(event) {
    document.removeEventListener('touchmove', this.handleDrag);
    document.removeEventListener('touchup', this.handleTouchEnd);
    document.removeEventListener('touchend', this.handleTouchEnd);
    document.removeEventListener('touchcancel', this.handleTouchEnd);
    this.props.onDragStop && this.props.onDragStop(event);
  }

  handleKeyDown(event) {
    const { value, min, max, step, onChange, onKeyDown } = this.props;
    let newValue;

    switch (keycode(event)) {
      case 'right':
      case 'up':
      case 'page up':
        newValue = Math.min(max, cleanFloat(value + step));
        break;
      case 'left':
      case 'down':
      case 'page down':
        newValue = Math.max(min, cleanFloat(value - step));
        break;
      case 'end':
        newValue = max;
        break;
      case 'home':
        newValue = min;
        break;
      default:
        return;
    }

    // If focus happened via mouse click, and then the user hits arrow keys, show the focused style
    if (!this.state.useFocusStyle) {
      this.setState({ useFocusStyle: true });
    }

    if (onChange && newValue !== value) {
      onChange(newValue);
    }

    onKeyDown && onKeyDown(event);
  }

  handleFocus(event) {
    if (!this.focusedFromClick) {
      this.focusedFromClick = false;
      this.setState({ useFocusStyle: true });
    } else {
      this.focusedFromClick = false;
    }

    this.props.onFocus && this.props.onFocus(event);
  }

  handleBlur(event) {
    if (this.state.useFocusStyle) {
      this.setState({ useFocusStyle: false });
    }

    this.props.onBlur && this.props.onBlur(event);
  }

  render() {
    const {
      className,
      disabled,
      max,
      min,
      name,
      required,
      step,
      value,
      ...other
    } = this.props;

    const valueAsPercentage = getPercentage(value, min, max);

    return (
      <div
        tabIndex={disabled ? -1 : 0}
        role="slider"
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={value}
        {...other}
        ref={(element) => { this.slider = element }}
        className={classes('Slider', className, {
          'Slider--is-disabled': disabled,
          'Slider--is-focused': !disabled && this.state.useFocusStyle,
        })}
        onMouseDown={!disabled && this.handleMouseDown}
        onTouchStart={!disabled && this.handleTouchStart}
        onFocus={!disabled && this.handleFocus}
        onBlur={!disabled && this.handleBlur}
        onKeyDown={!disabled && this.handleKeyDown}
      >
        <div className="Slider__track-line" style={getTrackLineStyle(valueAsPercentage)} />
        <div className="Slider__track" ref={(element) => { this.track = element }}>
          <div className="Slider__fill" style={getFillStyle(valueAsPercentage)}>
            <div className="Slider__handle" />
          </div>
        </div>
        <input
          type="hidden"
          name={name}
          value={value}
          min={min}
          max={max}
          step={step}
          required={required}
        />
      </div>
    );
  }
}

Slider.defaultProps = {
  disabled: false,
  min: 0,
  max: 100,
  step: 1,
  value: null,
};

module.exports = Slider;