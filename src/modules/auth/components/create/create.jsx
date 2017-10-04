import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import NavPanel from 'modules/common/components/nav-panel/nav-panel'
import Help from 'modules/auth/components/help/help'
import Airbitz from 'modules/auth/containers/airbitz-create'
import Uport from 'modules/auth/containers/uport-create'
import KeystoreCreate from 'modules/auth/containers/keystore-create'

import parseQuery from 'modules/routes/helpers/parse-query'

import { CREATE_NAV } from 'modules/routes/constants/param-names'
import { ITEMS, PARAMS } from 'modules/auth/constants/create-nav'
import { TITLE_SUFFIX } from 'modules/app/constants/title-suffix'

import Styles from 'modules/auth/components/auth/auth.styles'

export default function AuthCreate(p) {
  const selectedNav = parseQuery(p.location.search)[CREATE_NAV] || null

  return (
    <div className={Styles.Auth}>
      <Helmet
        titleTemplate={`Create %s ${TITLE_SUFFIX}`}
      />
      <div className={Styles['Auth--constrained']}>
        <div className={Styles.Auth__header}>
          <h1>Create An Account</h1>
        </div>
        <div className={Styles.Auth__content}>
          <NavPanel
            location={p.location}
            history={p.history}
            items={ITEMS}
            param={CREATE_NAV}
            selectedNav={selectedNav}
          />
          <div className={Styles.Auth__connections}>
            {selectedNav == null &&
              <Airbitz />
            }
            {selectedNav === PARAMS.UPORT &&
              <Uport />
            }
            {selectedNav === PARAMS.KEYSTORE &&
              <KeystoreCreate />
            }
          </div>
        </div>
        <div className={Styles.Auth__faq}>
          <Help />
        </div>
      </div>
    </div>
  )
}

AuthCreate.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired
}
