import { Tabs, Tag } from 'antd';
import _ from 'lodash';
import NationalStats from './NationalStats';
import DailyReportSection from './DailyReportSection';

const { TabPane } = Tabs;

const HomePageTabs = ({ testingData, indiaData, stateDataLatest, buildTime }) => {
	let liveCounter = 0; let cases = 0; let recovered = 0; let deaths = 0; let active = 0; let tests = 0;
	let positivity = 0;
	for (let i = 0; i < stateDataLatest.length; i++) {
		cases += stateDataLatest[i].newCases;
		recovered += stateDataLatest[i].newRecover;
		deaths += stateDataLatest[i].newDeaths;
		tests += stateDataLatest[i].newTests;
		if (stateDataLatest[i].newCases > 0 || stateDataLatest[i].newRecovered > 0) {
			liveCounter += 1;
		}
	}
	active = cases - recovered - deaths;
	const recoveryRate = ((recovered * 100) / cases).toFixed(2);
	const deathRate = ((deaths * 100) / (deaths + recovered)).toFixed(2);
	positivity = tests > 0 ? ((cases * 100) / tests).toFixed(2) : '-';
	return (
		<Tabs tabBarExtraContent={
			(
				<div>{buildTime}</div>
			)
		}
		>
			<TabPane
				tab={
					(<div>National Statistics</div>)
				}
				key="1"
			>
				<NationalStats
					testingData={testingData}
					covidDataIndia={indiaData}
					cases={cases}
					recovered={recovered}
					deaths={deaths}
					active={active}
					tests={tests}
					positivity={positivity}
					recoveryRate={recoveryRate}
					deathRate={deathRate}
				/>
			</TabPane>
			<TabPane
				tab={
					(
						<div>+Today &nbsp;<Tag style={{ color: '#303030' }} color="#FFD666">{liveCounter}</Tag></div>
					)
				}
				key="2"
			>
				<DailyReportSection casesByStateLatest={stateDataLatest} />
			</TabPane>
		</Tabs>
	);
};

export default HomePageTabs;
