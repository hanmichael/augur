import { describe, it } from 'mocha'
import { assert } from 'chai'
import proxyquire from 'proxyquire'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

const order1 = { amount: '1' }
const order2 = { amount: '1.2' }
const marketsData = { MARKET_0: { minPrice: '0', maxPrice: '1' } }

describe(`modules/bids-asks/actions/load-one-outcome-bids-or-asks.js`, () => {
  proxyquire.noPreserveCache()
  const test = t => it(t.description, (done) => {
    const store = configureMockStore([thunk])({ ...t.mock.state })
    const loadOneOutcomeBidsOrAsks = proxyquire('../../../src/modules/bids-asks/actions/load-one-outcome-bids-or-asks', {
      '../../../services/augurjs': t.stub.augurjs,
      './insert-order-book-chunk-to-order-book': t.stub.insertOrderBookChunkToOrderBook
    }).default
    store.dispatch(loadOneOutcomeBidsOrAsks(t.params.marketID, t.params.outcome, t.params.orderTypeLabel, (err) => {
      t.assertions(err, store.getActions())
      store.clearActions()
      done()
    }))
  })
  test({
    description: 'short-circuit if market ID not provided',
    params: {
      marketID: undefined,
      outcome: 3,
      orderTypeLabel: 'sell'
    },
    mock: {
      state: { marketsData }
    },
    stub: {
      augurjs: {
        augur: {
          trading: {
            getOpenOrders: () => assert.fail()
          }
        }
      },
      insertOrderBookChunkToOrderBook: {
        default: () => () => assert.fail()
      }
    },
    assertions: (err, actions) => {
      assert.strictEqual(err, 'must specify market ID, outcome, and order type: undefined 3 sell')
      assert.deepEqual(actions, [])
    }
  })
  test({
    description: 'short-circuit if outcome not provided',
    params: {
      marketID: 'MARKET_0',
      outcome: undefined,
      orderTypeLabel: 'sell'
    },
    mock: {
      state: { marketsData }
    },
    stub: {
      augurjs: {
        augur: {
          trading: {
            getOpenOrders: () => assert.fail()
          }
        }
      },
      insertOrderBookChunkToOrderBook: {
        default: () => () => assert.fail()
      }
    },
    assertions: (err, actions) => {
      assert.strictEqual(err, 'must specify market ID, outcome, and order type: MARKET_0 undefined sell')
      assert.deepEqual(actions, [])
    }
  })
  test({
    description: 'short-circuit if orderType not provided',
    params: {
      marketID: 'MARKET_0',
      outcome: 3,
      orderType: undefined
    },
    mock: {
      state: { marketsData }
    },
    stub: {
      augurjs: {
        augur: {
          trading: {
            getOpenOrders: () => assert.fail()
          }
        }
      },
      insertOrderBookChunkToOrderBook: {
        default: () => () => assert.fail()
      }
    },
    assertions: (err, actions) => {
      assert.strictEqual(err, 'must specify market ID, outcome, and order type: MARKET_0 3 undefined')
      assert.deepEqual(actions, [])
    }
  })
  test({
    description: 'short-circuit if market data not found',
    params: {
      marketID: 'MARKET_0',
      outcome: 3,
      orderTypeLabel: 'sell'
    },
    mock: {
      state: { marketsData: {} }
    },
    stub: {
      augurjs: {
        augur: {
          trading: {
            getOpenOrders: () => assert.fail()
          }
        }
      },
      insertOrderBookChunkToOrderBook: {
        default: () => () => assert.fail()
      }
    },
    assertions: (err, actions) => {
      assert.strictEqual(err, 'market MARKET_0 data not found')
      assert.deepEqual(actions, [])
    }
  })
  test({
    description: 'no orders found',
    params: {
      marketID: 'MARKET_0',
      outcome: 3,
      orderTypeLabel: 'sell'
    },
    mock: {
      state: { marketsData }
    },
    stub: {
      augurjs: {
        augur: {
          trading: {
            getOpenOrders: (p, callback) => {
              callback(null, {})
            }
          }
        }
      },
      insertOrderBookChunkToOrderBook: {
        default: (marketID, outcome, orderTypeLabel, orderBookChunk) => dispatch => dispatch({
          type: 'INSERT_ORDER_BOOK_CHUNK_TO_ORDER_BOOK',
          marketID,
          outcome,
          orderTypeLabel,
          orderBookChunk
        })
      }
    },
    assertions: (err, actions) => {
      assert.isNull(err)
      assert.deepEqual(actions, [{
        type: 'UPDATE_IS_FIRST_ORDER_BOOK_CHUNK_LOADED',
        marketID: 'MARKET_0',
        outcome: 3,
        orderTypeLabel: 'sell',
        isLoaded: false
      }, {
        type: 'INSERT_ORDER_BOOK_CHUNK_TO_ORDER_BOOK',
        marketID: 'MARKET_0',
        outcome: 3,
        orderTypeLabel: 'sell',
        orderBookChunk: {}
      }])
    }
  })
  test({
    description: 'load two orders',
    params: {
      marketID: 'MARKET_0',
      outcome: 3,
      orderTypeLabel: 'sell'
    },
    mock: {
      state: { marketsData }
    },
    stub: {
      augurjs: {
        augur: {
          trading: {
            getOpenOrders: (p, callback) => {
              callback(null, { '0x1': order1, '0x2': order2 })
            }
          }
        }
      },
      insertOrderBookChunkToOrderBook: {
        default: (marketID, outcome, orderTypeLabel, orderBookChunk) => dispatch => dispatch({
          type: 'INSERT_ORDER_BOOK_CHUNK_TO_ORDER_BOOK',
          marketID,
          outcome,
          orderTypeLabel,
          orderBookChunk
        })
      }
    },
    assertions: (err, actions) => {
      assert.isNull(err)
      assert.deepEqual(actions, [{
        type: 'UPDATE_IS_FIRST_ORDER_BOOK_CHUNK_LOADED',
        marketID: 'MARKET_0',
        outcome: 3,
        orderTypeLabel: 'sell',
        isLoaded: false
      }, {
        type: 'INSERT_ORDER_BOOK_CHUNK_TO_ORDER_BOOK',
        marketID: 'MARKET_0',
        outcome: 3,
        orderTypeLabel: 'sell',
        orderBookChunk: { '0x1': order1, '0x2': order2 }
      }])
    }
  })
})
