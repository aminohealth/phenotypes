module.exports = {
  name: 'checkbox',
  label: 'Checkbox',
  status: 'draft',
  collated: true,
  context: {
    label: 'Checkbox label'
  },
  variants: [{
    name: 'checked',
    context: {
      label: 'Checked',
      defaultChecked: true
    }
  }, {
    name: 'disabled',
    context: {
      label: 'Disabled',
      disabled: true
    }
  }, {
    name: 'disabled checked',
    context: {
      label: 'Disabled checked',
      disabled: true,
      defaultChecked: true
    }
  }, {
    name: 'small',
    context: {
      label: 'Small',
      className: 'Checkbox--small'
    }
  }, {
    name: 'small checked',
    context: {
      label: 'Small checked',
      defaultChecked: true,
      className: 'Checkbox--small'
    }
  }, {
    name: 'small disabled',
    context: {
      label: 'Small disabled',
      disabled: true,
      className: 'Checkbox--small'
    }
  }, {
    name: 'small disabled checked',
    context: {
      label: 'Small disabled checked',
      disabled: true,
      defaultChecked: true,
      className: 'Checkbox--small'
    }
  }, {
    name: 'large',
    context: {
      label: 'Large',
      className: 'Checkbox--large'
    }
  }, {
    name: 'large checked',
    context: {
      label: 'Large checked',
      defaultChecked: true,
      className: 'Checkbox--large'
    }
  }, {
    name: 'large disabled',
    context: {
      label: 'Large disabled',
      disabled: true,
      className: 'Checkbox--large'
    }
  }, {
    name: 'large disabled checked',
    context: {
      label: 'Large disabled checked',
      disabled: true,
      defaultChecked: true,
      className: 'Checkbox--large'
    }
  }, {
    name: 'responsive',
    context: {
      label: 'Resize me!',
      className: 'Checkbox--small Checkbox--medium-sm Checkbox--large-md'
    }
  }]
};
