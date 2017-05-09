import React from 'react';

function DisplayUtilities(props) {
  return (
    <div>
      <p><code className="text-color-secondary">.d-none</code></p>
      <div className="d-none">I'm hidden at xs size and up</div>
      <hr/>
      <p><code className="text-color-secondary">.d-none-sm</code></p>
      <div className="d-none-sm">I'm hidden at sm size and up</div>
      <hr/>
      <p><code className="text-color-secondary">.d-none-md</code></p>
      <div className="d-none-md">I'm hidden at md size and up</div>
      <hr/>
      <p><code className="text-color-secondary">.d-none-lg</code></p>
      <div className="d-none-lg">I'm hidden at lg size and up</div>
      <hr/>
      <p><code className="text-color-secondary">.d-none-xl</code></p>
      <div className="d-none-xl">I'm hidden at xl size and up</div>
      <hr/>
      <p><code className="text-color-secondary">.d-flex-sm</code></p>
      <div className="d-flex-sm">
        <div>Column 1</div>
        <div>Column 2</div>
        <div>Column 3</div>
      </div>
    </div>
  );
}

module.exports = DisplayUtilities;
