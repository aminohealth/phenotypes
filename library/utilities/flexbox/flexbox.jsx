import * as React from 'react';

const boxStyle1 = { background: '#eee' };
const boxStyle2 = { background: '#dbdbdb' };

function Label(props) {
  const className = props.className || 'text-color-hint';
  return (
    <p>
      <code className={className}>{props.children}</code>
    </p>
  );
}

function Separator() {
  return <hr className="my5" />;
}

function Demo(props) {
  const extraClassNames = props.extraClassNames || '';
  const allClassNames = `${props.classNames} ${extraClassNames}`;
  const style = Object.assign({}, boxStyle1, {
    height: props.height || '',
    width: props.width || '',
  });

  return (
    <div>
      <Label>
        {props.classNames.split(' ').map(className => `. ${className} `)}
      </Label>
      <div className={allClassNames} style={style}>
        {props.children}
      </div>
    </div>
  );
}

function InnerBox(props) {
  const text = props.children || 'Flex item';
  const classNames = `p3 m1 ${props.className || ''}`;
  const highlightStyles = {
    background: '#4d4d4d',
    color: '#fff',
  };
  let style = Object.assign({}, boxStyle2, {
    height: props.height || '',
    width: props.width || '',
  });
  if (props.highlight) {
    style = Object.assign(style, highlightStyles);
  }
  return (
    <div className={classNames} style={style}>
      {text}
    </div>
  );
}

function FlexboxUtilities() {
  return (
    <div>
      <h3>These display utilities are needed for flexbox</h3>
      <p>
        Apply these display utilities to an element to create a flexbox
        container. This transforms direct children elements into flex items.
        Apply additional flex properties shown below to further customize.
      </p>
      <Demo classNames="d-flex" extraClassNames="p3">
        I’m a flexbox container!
      </Demo>
      <Separator />
      <Demo classNames="d-inline-flex" extraClassNames="p3">
        I’m an inline flexbox container!
      </Demo>

      <h3 className="mt7">Direction utilities</h3>
      <Demo classNames="d-flex flex-column flex-row-sm" extraClassNames="p2">
        <InnerBox>Flex item 1</InnerBox>
        <InnerBox>Flex item 2</InnerBox>
        <InnerBox>Flex item 3</InnerBox>
      </Demo>
      <Separator />
      <Demo
        classNames="d-flex flex-column-reverse flex-row-reverse-sm"
        extraClassNames="p2"
      >
        <InnerBox>Flex item 1</InnerBox>
        <InnerBox>Flex item 2</InnerBox>
        <InnerBox>Flex item 3</InnerBox>
      </Demo>

      <h3 className="mt7">Justify utilities</h3>
      <Demo classNames="d-flex justify-content-start" extraClassNames="p2">
        <InnerBox />
        <InnerBox />
        <InnerBox />
      </Demo>
      <Separator />
      <Demo classNames="d-flex justify-content-end" extraClassNames="p2">
        <InnerBox />
        <InnerBox />
        <InnerBox />
      </Demo>
      <Separator />
      <Demo classNames="d-flex justify-content-center" extraClassNames="p2">
        <InnerBox />
        <InnerBox />
        <InnerBox />
      </Demo>
      <Separator />
      <Demo classNames="d-flex justify-content-between" extraClassNames="p2">
        <InnerBox />
        <InnerBox />
        <InnerBox />
      </Demo>
      <Separator />
      <Demo classNames="d-flex justify-content-around" extraClassNames="p2">
        <InnerBox />
        <InnerBox />
        <InnerBox />
      </Demo>

      <h3 className="mt7">Align utilities</h3>
      <Demo classNames="d-flex align-items-start" height="119px">
        <InnerBox />
        <InnerBox />
        <InnerBox />
      </Demo>
      <Separator />
      <Demo classNames="d-flex align-items-end" height="119px">
        <InnerBox />
        <InnerBox />
        <InnerBox />
      </Demo>
      <Separator />
      <Demo classNames="d-flex align-items-center" height="119px">
        <InnerBox />
        <InnerBox />
        <InnerBox />
      </Demo>
      <Separator />
      <Demo classNames="d-flex align-items-baseline" height="119px">
        <InnerBox />
        <InnerBox />
        <InnerBox />
      </Demo>
      <Separator />
      <Demo classNames="d-flex align-items-stretch" height="119px">
        <InnerBox />
        <InnerBox />
        <InnerBox />
      </Demo>

      <h3 className="mt7">Align self utilities</h3>
      <Demo classNames="d-flex">
        <InnerBox height="119px" />
        <InnerBox highlight="true" className="align-self-start">
          <code>.align-self-start</code>
        </InnerBox>
        <InnerBox height="119px" />
      </Demo>
      <Separator />
      <Demo classNames="d-flex">
        <InnerBox height="119px" />
        <InnerBox highlight="true" className="align-self-end">
          <code>.align-self-end</code>
        </InnerBox>
        <InnerBox height="119px" />
      </Demo>
      <Separator />
      <Demo classNames="d-flex">
        <InnerBox height="119px" />
        <InnerBox highlight="true" className="align-self-center">
          <code>.align-self-center</code>
        </InnerBox>
        <InnerBox height="119px" />
      </Demo>
      <Separator />
      <Demo classNames="d-flex">
        <InnerBox height="119px" />
        <InnerBox highlight="true" className="align-self-baseline">
          <code>.align-self-baseline</code>
        </InnerBox>
        <InnerBox height="119px" />
      </Demo>
      <Separator />
      <Demo classNames="d-flex">
        <InnerBox height="119px" />
        <InnerBox highlight="true" className="align-self-stretch">
          <code>.align-self-stretch</code>
        </InnerBox>
        <InnerBox height="119px" />
      </Demo>

      <h3 className="mt7">Combining utilities with auto margins</h3>
      <Demo classNames="d-flex justify-content-end" extraClassNames="p2">
        <InnerBox highlight="true" className="mr-auto">
          <code>.mr-auto</code>
        </InnerBox>
        <InnerBox />
        <InnerBox />
      </Demo>
      <Separator />
      <Demo classNames="d-flex justify-content-start" extraClassNames="p2">
        <InnerBox />
        <InnerBox />
        <InnerBox highlight="true" className="ml-auto">
          <code>.ml-auto</code>
        </InnerBox>
      </Demo>
      <Separator />
      <Demo classNames="d-flex flex-column align-items-start" height="200px">
        <InnerBox highlight="true" className="mb-auto">
          <code>.mb-auto</code>
        </InnerBox>
        <InnerBox />
        <InnerBox />
      </Demo>
      <Separator />
      <Demo classNames="d-flex flex-column align-items-end" height="200px">
        <InnerBox />
        <InnerBox />
        <InnerBox highlight="true" className="mt-auto">
          <code>.mt-auto</code>
        </InnerBox>
      </Demo>

      <h3 className="mt7">Wrapping utilities</h3>
      <Demo classNames="d-flex flex-nowrap" width="500px">
        <InnerBox>Flex item 1</InnerBox>
        <InnerBox>Flex item 2</InnerBox>
        <InnerBox>Flex item 3</InnerBox>
        <InnerBox>Flex item 4</InnerBox>
        <InnerBox>Flex item 5</InnerBox>
      </Demo>
      <Separator />
      <Demo classNames="d-flex flex-wrap" width="500px">
        <InnerBox>Flex item 1</InnerBox>
        <InnerBox>Flex item 2</InnerBox>
        <InnerBox>Flex item 3</InnerBox>
        <InnerBox>Flex item 4</InnerBox>
        <InnerBox>Flex item 5</InnerBox>
      </Demo>
      <Separator />
      <Demo classNames="d-flex flex-wrap-reverse" width="500px">
        <InnerBox>Flex item 1</InnerBox>
        <InnerBox>Flex item 2</InnerBox>
        <InnerBox>Flex item 3</InnerBox>
        <InnerBox>Flex item 4</InnerBox>
        <InnerBox>Flex item 5</InnerBox>
      </Demo>

      <h3 className="mt7">Order utilities</h3>
      <Demo classNames="d-flex" extraClassNames="p2">
        <InnerBox highlight="true" className="order-last">
          Flex item 1 (<code>.order-last</code>)
        </InnerBox>
        <InnerBox>Flex item 2</InnerBox>
        <InnerBox highlight="true" className="order-first">
          Flex item 3 (<code>.order-first</code>)
        </InnerBox>
      </Demo>

      <h3 className="mt7">Align content utilities</h3>
      <Demo
        classNames="d-flex flex-wrap align-content-start"
        width="500px"
        height="200px"
      >
        <InnerBox />
        <InnerBox />
        <InnerBox />
        <InnerBox />
        <InnerBox />
      </Demo>
      <Separator />
      <Demo
        classNames="d-flex flex-wrap align-content-end"
        width="500px"
        height="200px"
      >
        <InnerBox />
        <InnerBox />
        <InnerBox />
        <InnerBox />
        <InnerBox />
      </Demo>
      <Separator />
      <Demo
        classNames="d-flex flex-wrap align-content-center"
        width="500px"
        height="200px"
      >
        <InnerBox />
        <InnerBox />
        <InnerBox />
        <InnerBox />
        <InnerBox />
      </Demo>
      <Separator />
      <Demo
        classNames="d-flex flex-wrap align-content-between"
        width="500px"
        height="200px"
      >
        <InnerBox />
        <InnerBox />
        <InnerBox />
        <InnerBox />
        <InnerBox />
      </Demo>
      <Separator />
      <Demo
        classNames="d-flex flex-wrap align-content-around"
        width="500px"
        height="200px"
      >
        <InnerBox />
        <InnerBox />
        <InnerBox />
        <InnerBox />
        <InnerBox />
      </Demo>
      <Separator />
      <Demo
        classNames="d-flex flex-wrap align-content-stretch"
        width="500px"
        height="200px"
      >
        <InnerBox />
        <InnerBox />
        <InnerBox />
        <InnerBox />
        <InnerBox />
      </Demo>

      <h3 className="mt7">Grow and shrink</h3>
      <Demo classNames="d-inline-flex">
        <InnerBox>
          In this example, this box has so much text in it that it would cause
          the other box to break lines on the dash. But that box cannot shrink
          b/c it has the
          <code>.flex-none</code> class.
        </InnerBox>
        <InnerBox className="flex-none">
          <code>.flex-none</code>
        </InnerBox>
      </Demo>
      <Separator />
      <Demo classNames="d-flex">
        <InnerBox className="flex-1">
          <code>.flex-1</code>
        </InnerBox>
        <InnerBox />
        <InnerBox className="flex-1">
          <code>.flex-1</code>
        </InnerBox>
      </Demo>
    </div>
  );
}

export default FlexboxUtilities;
