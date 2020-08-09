import { useState } from 'react';
import { Card, Tag, Select } from 'antd';
import _ from 'lodash';

const { Option } = Select;

const gridStyle = {
	height: '50px',
};

const StateDeltaGrid = ({ casesByStateLatest }) => {
	const cards = [];
	const [field, setField] = useState('newCases');
	let tweet = '';
	let newCases = 0; let newRecovered = 0; let newDeaths = 0;
	let className = '';
	const cases = _.orderBy(casesByStateLatest, [field], ['desc']);
	cases.forEach(state => {
		className = '';
		if (state.newCases > 0 || state.newRecover > 0 || state.newDeaths > 0) {
			if (field === 'newCases') {
				if (state.isHigh) {
					className = 'new-high';
				} else if (state.is14dayHigh) {
					className = 'day-14-high';
				} else if (state.is14dayLow) {
					className = 'day-14-low';
				}
			}
			if (!state.isHigh) {
				tweet += `${state.stateCode} +${state.newCases}, `;
			}
			newCases += state.newCases; newRecovered += state.newRecover;
			newDeaths += state.newDeaths;
			if (state.newCases > 0) {
				cards.push(
					<Card.Grid className={className} key={state.state} style={gridStyle} hoverable={false}>
						<div className="state-name">{state.state}</div> <div className="new-cases">+{state[field]}</div>
					</Card.Grid>
				);
			}
		}
	});
	function handleChange(value) {
		setField(value);
	}
	console.log(tweet);
	console.log(_.filter(cases, { isHigh: true }).reduce((acc, state) => {
		acc += `${state.stateCode} +${state.newCases}, `;
		return acc;
	}, ''));
	return (
		<>
			<Tag className="delta-grid-tags" color="#ffccc7">New High</Tag>
			<Tag className="delta-grid-tags" color="#ffe7ba">14 Day High</Tag>
			<Tag className="delta-grid-tags" color="#d9f7be">14 Day Low</Tag>
			<Select size="small" className="delta-grid-select" defaultValue="newCases" onChange={handleChange}>
				<Option value="newCases">Cases</Option>
				<Option value="newRecover">Recovered</Option>
				<Option value="newDeaths">Deaths</Option>
			</Select>
			<br /><br />
			<Card className="card-grid" bordered={false}>
				<Card.Grid className="title" key="total" style={gridStyle} hoverable={false}>
					New Cases
					<div>+{newCases}</div>
				</Card.Grid>
				<Card.Grid className="title" key="recovered" style={gridStyle} hoverable={false}>
					Recovered
					<div className="recovered">+{newRecovered}</div>
				</Card.Grid>
				<Card.Grid className="title" key="deaths" style={gridStyle} hoverable={false}>
					Deaths
					<div className="deaths">+{newDeaths}</div>
				</Card.Grid>
				{cards}
			</Card>
		</>
	);
};

export default StateDeltaGrid;
