import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import MarketLink from 'modules/market/components/market-link/market-link'
import ValueDenomination from 'modules/common/components/value-denomination/value-denomination'

import { TYPE_REPORT, TYPE_CHALLENGE, TYPE_TRADE, TYPE_CLOSED } from 'modules/market/constants/link-types'

import getValue from 'utils/get-value'
import setShareDenomination from 'utils/set-share-denomination'
import shareDenominationLabel from 'utils/share-denomination-label'

import Styles from 'modules/market/components/market-properties/market-properties.styles'

const MarketProperties = (p) => {
  const shareVolumeRounded = setShareDenomination(getValue(p, 'volume.rounded'), p.selectedShareDenomination)
  const shareDenomination = shareDenominationLabel(p.selectedShareDenomination, p.shareDenominations)

  let buttonText

  switch (p.linkType) {
    case TYPE_REPORT:
      buttonText = 'Report'
      break
    case TYPE_CHALLENGE:
      buttonText = 'Challenge'
      break
    case TYPE_TRADE:
      buttonText = 'Trade'
      break
    default:
      buttonText = 'View'
  }

  return (
    <article className={Styles.MarketProperties}>
      <ul className={Styles.MarketProperties__meta}>
        <li>
          <span>Volume</span>
          <ValueDenomination formatted={shareVolumeRounded} denomination={shareDenomination} />
        </li>
        <li>
          <span>Fee</span>
          <ValueDenomination {...p.takerFeePercent} />
        </li>
        <li>
          <span>Expires</span>
          <span>{ p.endDate.formatted }</span>
        </li>
      </ul>
      <div className={Styles.MarketProperties__actions}>
        { p.isLogged && p.toggleFavorite &&
          <button
            className={classNames(Styles.MarketProperties__favorite, { [Styles.favorite]: p.isFavorite })}
            onClick={() => p.toggleFavorite(p.id)}
          >
            {p.isFavorite ?
              <i className="fa fa-star" /> :
              <i className="fa fa-star-o" />
            }
          </button>
        }
        { (p.linkType === undefined || (p.linkType && p.linkType !== TYPE_CLOSED)) &&
          <MarketLink
            className={Styles.MarketProperties__trade}
            id={p.id}
            formattedDescription={p.formattedDescription}
            linkType={p.linkType}
          >
            { p.buttonText || buttonText }
          </MarketLink>
        }
        { p.linkType && p.linkType === TYPE_CLOSED &&
          <button
            className={Styles.MarketProperties__trade}
            onClick={e => console.log('call to finalize market')}
          >
            Finalize
          </button>
        }
      </div>
    </article>
  )
}

MarketProperties.propTypes = {
  linkType: PropTypes.string,
  buttonText: PropTypes.string,
}

export default MarketProperties
