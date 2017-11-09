import React, { Component } from 'react'
import PropTypes from 'prop-types'

import NullStateMessage from 'modules/common/components/null-state-message'
import Notification from 'modules/notifications/components/notification'

import getValue from 'utils/get-value'
import debounce from 'utils/debounce'
import { CloseBlack } from 'modules/common/components/icons/icons'

import Styles from 'modules/notifications/components/notifications-view.styles'

export default class NotificationsView extends Component {
  static propTypes = {
    notifications: PropTypes.object.isRequired,
    updateNotification: PropTypes.func.isRequired,
    removeNotification: PropTypes.func.isRequired,
    clearNotifications: PropTypes.func.isRequired,
    toggleNotifications: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props)

    this.state = {
      notificationsBounds: {},
      checkSeen: false
    }

    this.updateNotificationsBoundingBox = this.updateNotificationsBoundingBox.bind(this)
    this.setCheckSeen = debounce(this.setCheckSeen.bind(this), 100)
  }

  componentDidMount() {
    this.updateNotificationsBoundingBox()

    this.notifications && this.notifications.addEventListener('scroll', () => { this.setCheckSeen(true) })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.checkSeen && prevState.checkSeen !== this.state.checkSeen) this.setCheckSeen(false)
  }

  componentWillUnmount() {
    this.notifications && this.notifications.removeEventListener('scroll', this.setCheckSeen)
  }

  setCheckSeen(checkSeen) {
    this.setState({ checkSeen })
  }

  updateNotificationsBoundingBox() {
    if (this.notifications) this.setState({ notificationsBounds: this.notifications.getBoundingClientRect() })
  }

  render() {
    const p = this.props
    const s = this.state

    const notifications = getValue(p, 'notifications.notifications')

    return (
      <section id="notifications_view" className={Styles.NotificationsView}>
        <button
          className={Styles.Notification__close}
          onClick={(e) => {
            e.stopPropagation()
            p.toggleNotifications()
          }}
        >
          {CloseBlack}
        </button>
        {notifications && notifications.length ?
          <div
            ref={(notifications) => {
              this.notifications = notifications
            }}
            className={Styles.NotificationsView__box}
          >
            {notifications.map((notification, i) => (
              <Notification
                key={`${notification.id}-${notification.title}`}
                removeNotification={() => p.removeNotification(notification.id)}
                toggleNotifications={p.toggleNotifications}
                updateNotification={p.updateNotification}
                notificationsBounds={s.notificationsBounds}
                checkSeen={s.checkSeen}
                updateNotificationsBoundingBox={this.updateNotificationsBoundingBox}
                {...notification}
              />
            ))}
          </div> :
          <NullStateMessage message="No Notifications" />
        }
      </section>
    )
  }
}
