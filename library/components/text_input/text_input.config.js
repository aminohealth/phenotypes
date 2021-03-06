module.exports = {
  name: 'text input',
  label: 'Text Input',
  status: 'draft',
  collated: true,
  context: {
    placeholder: 'Placeholder text',
  },
  variants: [{
    name: 'default',
    label: 'Medium',
  }, {
    name: 'small',
    label: 'Small',
    context: {
      className: 'TextInput--small',
      placeholder: '.TextInput--small',
    },
  }, {
    name: 'large',
    label: 'Large',
    context: {
      className: 'TextInput--large',
      placeholder: '.TextInput--large',
    },
  }, {
    name: 'disabled',
    label: 'Disabled',
    context: {
      placeholder: 'Can’t touch this.',
      disabled: true,
    },
  }, {
    name: 'error',
    label: 'Error',
    context: {
      className: 'TextInput--has-error',
      defaultValue: 'Something went horribly wrong.',
    },
  }, {
    name: 'password',
    label: 'Password',
    context: {
      placeholder: 'Password goes here.',
      type: 'password',
    },
  },
  {
    name: 'responsive',
    label: 'Responsive',
    context: {
      placeholder: 'Resize me!',
      className: 'TextInput--small TextInput--medium-sm TextInput--large-md',
    },
  }],
};
