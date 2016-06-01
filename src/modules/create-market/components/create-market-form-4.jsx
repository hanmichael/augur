import React from 'react';
import classNames from 'classnames';

import FormButtons from '../../create-market/components/create-market-form-buttons';
import Input from '../../common/components/input';

import { BINARY, CATEGORICAL, SCALAR } from '../../markets/constants/market-types';

module.exports = React.createClass({
	propTypes: {
		tradingFeePercent: React.PropTypes.number,
		makerFeePercent: React.PropTypes.number,
		initialLiquidity: React.PropTypes.number,

		showAdvancedMarketParams: React.PropTypes.bool,

		errors: React.PropTypes.object,

		onValuesUpdated: React.PropTypes.func
	},

	componentWillMount: function(){
		this.setInitialFairPriceValues(this.props)
	},

	render: function() {
		var p = this.props;

		const advancedParamsArrow = !!p.showAdvancedMarketParams ? '▲' : '▼'

		return (
			<div className="step-4">
				<div className="fee">
					<h4>Set the trading fee for your market</h4>
					<p>
						The Trading Fee is a percentage fee charged against the value of any trade made in the market.
						You'll receive 50% of all fees charged during the lifetime of your market - with the other
						50% being awarded to those reporting the outcome.
					</p>

					<Input
						type="number"
						value={ p.tradingFeePercent }
						isClearable={ false }
						onChange={ (value) => p.onValuesUpdated({ tradingFeePercent: value }) } />

					<span className="denomination">%</span>

					{ p.errors.tradingFeePercent &&
						<span className="error-message">{ p.errors.tradingFeePercent }</span>
					}
				</div>
				<div className="fee">
					<h4>Set the maker's share of the trading fee</h4>
					<p>
						The Maker Fee is the percentage split the 'Maker' of an order must pay of the trading fee with the remaining percentage being paid by the 'Taker'.
					</p>

					<Input
						type="number"
						value = { p.makerFeePercent }
						isClearable={ false }
						onChange={ (value) => p.onValuesUpdated({ makerFeePercent: value }) }
					/>
					<span className="denomination">%</span>

					{ p.errors.makerFeePercent &&
						<span className="error-message">{ p.errors.makerFeePercent }</span>
					}
				</div>
				<div className="liquidity">
					<h4>Set the amount of initial liquidity</h4>
					<p>
						Initial liquidity is the amount of ether you're putting into the market to get trading started.
						The Market Maker will use these funds to buy shares - which are then sold back to those
						wanting to trade your market when the market opens. Any initial liquidity remaining when
						the market is expired will be returned to you (along with any profit generated by the Market
						Maker from selling shares).
					</p>
					<Input
						type="number"
						value={ p.initialLiquidity }
						isClearable={ false }
						onChange={ (value) => p.onValuesUpdated({ initialLiquidity: value }) } />

					<span className="denomination">Eth</span>
					{ p.errors.initialLiquidity &&
						<span className="error-message">{ p.errors.initialLiquidity }</span>
					}
				</div>


				<div className="advanced-market-params" >
					<h6 className="horizontal-divider" onClick={() => {p.onValuesUpdated({ showAdvancedMarketParams: !p.showAdvancedMarketParams })}}><span>{ advancedParamsArrow }</span> Advanced <span>{ advancedParamsArrow }</span></h6>

					<div className={ classNames({ 'displayNone': !!!p.showAdvancedMarketParams }) }>
						<div>
							<h4>Initial Fair Price</h4>
							<p>
								This establishes the initial price for each respective outcome.
							</p>
							{ this.renderFairPriceInputs(p) }
						</div>
					</div>
				</div>


				<FormButtons
					disabled={ !p.isValid }
					nextLabel="review"
					onNext={ () => p.onValuesUpdated({ step: this.props.step + 1 }) }
					onPrev={ () => p.onValuesUpdated({ step: this.props.step - 1 }) } />
			</div>
		);
	},

	setInitialFairPriceValues: (p) => {
		let prices = []

		switch(p.type){
			case BINARY:
				for(let i = 0; i <= 1; i++){
					prices[i] = p.defaultFairPrice
				}

				p.onValuesUpdated({ initialFairPrice: prices })

				break
			case CATEGORICAL:
				console.log('CATEGORICAL')
				break
			case SCALAR:
				console.log('SCALAR')
				break
		}
	},

	renderFairPriceInputs: (p) => {
		let inputs = [],
			baseInput = i => <Input
								type="number"
								value={ p.initialFairPrice[i] }
								isClearable={ false }
								onChange={
									(value) => {
										let prices = p.initialFairPrice
										prices[i] = parseFloat(value)

										p.onValuesUpdated({ initialFairPrice: prices })
									}
								} />

		switch(p.type){
			case BINARY:
				for(let i = 0; i <= 1; i++)
					inputs.push(
						<div key={`initialFairPrice${i}`} >
							{ baseInput(i) }
							<span className="denomination">{ !!!i ? 'Yes' : 'No' }</span>
						</div>
					)
				
				return (
					<div>
						{ inputs }
					</div>
				)
			case CATEGORICAL:
				return (
					<h1>Fair Price Fields -- CATEGORICAL</h1>
				)
			case SCALAR:
				return (
					<h1>Fair Price Fields -- SCALAR</h1>
				)
		}
	}
});