import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import getValue from 'utils/get-value'

import Styles from 'modules/market/components/market-positions-list--mobile-positions/market-positions-list--mobile-positions.styles'
import CommonStyles from 'modules/market/components/market-positions-list--mobile/market-positions-list--mobile.styles'

export default class MobilePositions extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showConfirm: false,
    }
  }

  calcAvgDiff(position, orders) {
    const currentAvg = +getValue(position, 'position.avgPrice.formatted') || 0
    const currentShares = +getValue(position, 'position.qtyShares.formatted') || 0

    let newAvg = currentAvg * currentShares
    let totalShares = currentShares

    orders.forEach(order => {
      const thisPrice = +(getValue(order, 'order.purchasePrice.formatted') || 0)
      const thisShares = +(getValue(order, 'order.qtyShares.formatted') || 0)

      newAvg += thisPrice * thisShares
      totalShares += thisShares
    })

    newAvg = newAvg / totalShares

    return (newAvg - currentAvg).toFixed(4)
  }

  render() {
    const s = this.state
    const p = this.props

    const orderText = p.pendingOrders.length > 1 ? 'Orders' : 'Order'

    return (
      <div className={CommonStyles.MarketPositionsListMobile__wrapper}>
        <div className={Styles.MobilePositions__header}>
          <h2 className={CommonStyles.MarketPositionsListMobile__heading}>
              My Position
              { p.pendingOrders.length > 0 &&
                <span className={Styles.MobilePositions__pending}>
                  { p.pendingOrders.length } Pending { orderText }
                </span>
              }
          </h2>
          <button
            className={Styles.MobilePositions__close}
            onClick={e => this.setState({ showConfirm: !s.showConfirm })}
          >Close</button>
        </div>
        <div className={Styles.MobilePositions__positions}>
          <ul className={Styles.MobilePositions__position}>
            <li>
              <span>
                QTY
                { p.pendingOrders.length > 0 &&
                  <span className={Styles.MobilePositions__pending}>
                    +{ p.pendingOrders.reduce((sum, order) => sum + +order.order.qtyShares.formatted, 0) }
                  </span>
                }
              </span>
              { getValue(p, 'position.position.qtyShares.formatted') }
            </li>
            <li>
              <span>
                AVG Price
                { p.pendingOrders.length > 0 &&
                  <span className={Styles.MobilePositions__pending}>
                    { this.calcAvgDiff(p.position, p.pendingOrders) }
                  </span>
                }
              </span>
              { getValue(p, 'position.position.avgPrice.formatted') } ETH
            </li>
            <li>
              <span>Unrealized P/L</span>
              { getValue(p, 'position.position.unrealizedNet.formatted') } ETH
            </li>
            <li>
              <span>Realized P/L</span>
              { getValue(p, 'position.position.realizedNet.formatted') } ETH
            </li>
          </ul>
        </div>
        <div className={classNames(Styles.MobilePositions__confirm, { [`${Styles['is-open']}`]: s.showConfirm })}>
          { p.pendingOrders.length > 0 ?
            <div className={classNames(Styles['MobilePositions__confirm-details'], Styles.pending)}>
              <p>Positions cannot be closed while orders are pending.</p>
              <div className={Styles['MobilePositions__confirm-options']}>
                <button onClick={e => this.setState({ showConfirm: !s.showConfirm })}>Ok</button>
              </div>
            </div>
          :
            <div className={Styles['MobilePositions__confirm-details']}>
              <h3>Close Position?</h3>
              <p>This will sell your { getValue(p, 'position.position.qtyShares.formatted') } shares of &ldquo;{ getValue(p, 'position.name') }&rdquo; at market rate.</p>
              <div className={Styles['MobilePositions__confirm-options']}>
                <button onClick={e => this.setState({ showConfirm: !s.showConfirm })}>No</button>
                <button onClick={(e) => { p.position.position.closePosition(); this.setState({ showConfirm: !s.showConfirm }) }}>Yes</button>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}
