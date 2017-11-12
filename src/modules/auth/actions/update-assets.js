import speedomatic from 'speedomatic'
import { augur } from 'services/augurjs'
import { UNIVERSE_ID } from 'modules/app/constants/network'
import { updateLoginAccount } from 'modules/auth/actions/update-login-account'
import { allAssetsLoaded } from 'modules/auth/selectors/balances'
import logError from 'utils/log-error'

export function updateAssets(callback = logError) {
  return (dispatch, getState) => {
    const { loginAccount, universe } = getState()
    const universeID = universe.id || UNIVERSE_ID
    const balances = { eth: undefined, ethTokens: undefined, rep: undefined }
    if (!loginAccount.address) return dispatch(updateLoginAccount(balances))
    // FIXME -- 'balanceOf' is undefined...not sure where it moved to
    // augur.api.Cash.balanceOf({ _owner: loginAccount.address }, (err, attoEthTokensBalance) => {
    //   if (err) return callback(err)
    //   const ethTokensBalance = speedomatic.unfix(attoEthTokensBalance, 'string')
    //   balances.ethTokens = ethTokensBalance
    //   if (!loginAccount.ethTokens || loginAccount.ethTokens !== ethTokensBalance) {
    //     dispatch(updateLoginAccount({ ethTokens: ethTokensBalance }))
    //   }
    //   if (allAssetsLoaded(balances)) callback(null, balances)
    // })
    augur.api.Universe.getReputationToken({ tx: { to: universeID } }, (err, reputationTokenAddress) => {
      if (err) return callback(err)
      augur.api.ReputationToken.balanceOf({
        tx: { to: reputationTokenAddress },
        _owner: loginAccount.address
      }, (attoRepBalance) => {
        if (!attoRepBalance || attoRepBalance.error) return callback(attoRepBalance)
        const repBalance = speedomatic.unfix(attoRepBalance, 'string')
        balances.rep = repBalance
        if (!loginAccount.rep || loginAccount.rep !== repBalance) {
          dispatch(updateLoginAccount({ rep: repBalance }))
        }
        if (allAssetsLoaded(balances)) callback(null, balances)
      })
    })
    augur.rpc.eth.getBalance([loginAccount.address, 'latest'], (attoEthBalance) => {
      if (!attoEthBalance || attoEthBalance.error) return callback(attoEthBalance)
      const ethBalance = speedomatic.unfix(attoEthBalance, 'string')
      balances.eth = ethBalance
      if (!loginAccount.eth || loginAccount.eth !== ethBalance) {
        dispatch(updateLoginAccount({ eth: ethBalance }))
      }
      if (allAssetsLoaded(balances)) callback(null, balances)
    })
  }
}
