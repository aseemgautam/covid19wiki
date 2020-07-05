import { Card } from 'antd';
import _ from 'lodash';

const gridStyle = {
	height: '50px',
	maxWidth: '180px'
};

const LiveUpdate = ({ casesByStateLatest }) => {
	const cards = [];
	let total = 0; let deaths = 0; let recover = 0;
	const cases = _.orderBy(casesByStateLatest, ['newCases'], ['desc']);
	cases.forEach(state => {
		if (state.newCases > 0) {
			total += state.newCases;
			deaths += state.newDeaths;
			recover += state.newRecover;
			cards.push(
				<Card.Grid key={state.state} style={gridStyle}>
					<div className="state-name">{state.state}</div> <div className="new-cases">+{state.newCases}</div>
				</Card.Grid>
			);
		}
	});
	// console.log(deaths);
	// console.log(recover);
	return (
		<Card className="live-update-cards" bordered={false}>
			<Card.Grid key="total" style={gridStyle}>
				<div className="state-name">05th July</div> <div className="new-cases total">+{total}</div>
			</Card.Grid>
			{cards}
		</Card>
	);
};

export default LiveUpdate;
