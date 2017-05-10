import React from 'react';

function TextUtilities(props) {
  return (
    <div>
      <h4>General text and headings</h4>
      <div className="d-flex-sm">
        <div style={{ marginRight: '3rem' }}>
          <p><code className="text-color-hint">.text-1</code></p>
          <p className="text-1">Regular 12px</p>
          <hr />
          <p><code className="text-color-hint">.text-2</code></p>
          <p className="text-2">Regular 14px</p>
          <hr />
          <p><code className="text-color-hint">.text-3</code></p>
          <p className="text-3">Regular 16px</p>
          <hr />
          <p><code className="text-color-hint">.text-4</code></p>
          <p className="text-4">Regular 18px</p>
          <hr />
          <p><code className="text-color-hint">.text-5</code></p>
          <p className="text-5">Regular 21px</p>
          <hr />
          <p><code className="text-color-hint">.text-6</code></p>
          <p className="text-6">Regular 24px</p>
          <hr />
          <p><code className="text-color-hint">.text-7</code></p>
          <p className="text-7">Regular 36px</p>
          <hr />
          <p><code className="text-color-hint">.text-8</code></p>
          <p className="text-8">Regular 53px</p>
        </div>
        <div>
          <p><code className="text-color-hint">.text-1.text-weight-bold</code></p>
          <p className="text-1 text-weight-bold">Bold 12px</p>
          <hr />
          <p><code className="text-color-hint">.text-2.text-weight-bold</code></p>
          <p className="text-2 text-weight-bold">Bold 14px</p>
          <hr />
          <p><code className="text-color-hint">h6, .h6</code></p>
          <p className="h6">Bold 16px</p>
          <hr />
          <p><code className="text-color-hint">h5, .h5</code></p>
          <p className="h5">Bold 18px</p>
          <hr />
          <p><code className="text-color-hint">h4, .h4</code></p>
          <p className="h4">Bold 21px</p>
          <hr />
          <p><code className="text-color-hint">h3, .h3</code></p>
          <p className="h3">Bold 24px</p>
          <hr />
          <p><code className="text-color-hint">h2, .h2</code></p>
          <p className="h2">Bold 36px</p>
          <hr />
          <p><code className="text-color-hint">h1, .h1</code></p>
          <p className="h1">Bold 53px</p>
        </div>
      </div>

      <hr style={{ margin: '3rem 0' }} />

      <h4>Uppercase</h4>
      <p><code className="text-color-hint">.uppercase-1</code></p>
      <p className="uppercase-1">Uppercase 9px</p>
      <p><code className="text-color-hint">.uppercase-2</code></p>
      <p className="uppercase-2">Uppercase 11px</p>
      <p><code className="text-color-hint">.uppercase-3</code></p>
      <p className="uppercase-3">Uppercase 12px</p>

      <hr style={{ margin: '3rem 0' }} />

      <h4>Colors</h4>
      <div className="d-flex-sm">
        <div style={{ marginRight: '3rem', padding: '1rem' }}>
          <p><code className="text-color-hint">.text-color-primary</code></p>
          <p className="text-color-primary">◼︎ Primary color</p>
          <p><code className="text-color-hint">.text-color-secondary</code></p>
          <p className="text-color-secondary">︎◼︎ Secondary color</p>
          <p><code className="text-color-hint">.text-color-hint</code></p>
          <p className="text-color-hint">◼︎ Hint color</p>    
        </div>
        <div style={{ background: '#232323', padding: '1rem' }}>
          <p><code className="text-color-reversed-hint">.text-color-reversed-primary</code></p>
          <p className="text-color-reversed-primary">◼︎ Reversed primary color</p>
          <p><code className="text-color-reversed-hint">.text-color-reversed-secondary</code></p>
          <p className="text-color-reversed-secondary">◼︎ Reversed secondary color</p>
          <p><code className="text-color-reversed-hint">.text-color-reversed-hint</code></p>
          <p className="text-color-reversed-hint">◼︎ Reversed hint color</p>    
        </div>
      </div>
    </div>
  );
}

module.exports = TextUtilities;