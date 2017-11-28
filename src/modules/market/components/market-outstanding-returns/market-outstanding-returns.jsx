import React from 'react'
import PropTypes from 'prop-types'

const OutstandingReturns = p => (
  <div>
      Outstanding Returns {p.outstandingReturns.full}
  </div>
)

OutstandingReturns.propTypes = {
  outstandingReturns: PropTypes.object.isRequired
}

export default OutstandingReturns
