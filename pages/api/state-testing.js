import _ from 'lodash';
import papa from 'papaparse';
import CovidDataState from '../../classes/CovidDataState';
import CovidDataTesting from '../../classes/CovidDataTesting';

export default async (req, res) => {
	const stateDataLatest = await CovidDataState.latest();
	const stateDataAll = await CovidDataState.all();
	const stateDataTesting = await CovidDataTesting.all();

	const response = [];
	stateDataLatest.forEach(current => {
		const stateData = stateDataAll.get(current.state);
		const testingData = _.filter(stateDataTesting, { state: current.state });
		const result = {};
		result.State = current.state;
		result['POSITIVITY RATE'] = current.positivity;
		result.posRate28daysAgo = _.nth(stateData, -28).positivity;
		result.posRate21daysAgo = _.nth(stateData, -21).positivity;
		result.posRate14daysAgo = _.nth(stateData, -14).positivity;
		result.posRate7daysAgo = _.nth(stateData, -7).positivity;
		result.posRate = current.positivity;
		result['TESTS DAILY (7-DAY AVG)'] = _.last(testingData).movingAverage;
		// result.movingAvg28daysAgo = _.nth(testingData, -28).movingAverage;
		// result.movingAvg21daysAgo = _.nth(testingData, -21).movingAverage;
		result.movingAvg14daysAgo = _.nth(testingData, -14).movingAverage;
		result.movingAvg7daysAgo = _.nth(testingData, -7).movingAverage;
		result.movingAverage = _.last(testingData).movingAverage;
		result['TOTAL TESTS'] = current.tests;
		result['TESTS PER MILLION'] = current.testsPerMillion;
		response.push(result);
	});

	// res.end(JSON.stringify(await CovidDataTesting.all()));
	// res.end(JSON.stringify(_.filter(await CovidDataTesting.all(), { state: 'Dadra and Nagar Haveli' })));
	res.end(papa.unparse(response));
};
