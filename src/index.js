import React from 'react'
import ReactDOM from 'react-dom'
import Root from './root'
import * as serviceWorker from './serviceWorker'

import ErrorBoudary from './error'

ReactDOM.render(
  <ErrorBoudary>
    {(hasError) => (
      <Root hasError={hasError} />
    )}
  </ErrorBoudary>,
  document.getElementById('root')
)

serviceWorker.unregister()
