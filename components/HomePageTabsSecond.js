import { Tabs, Row, Col } from 'antd';
import dynamic from 'next/dynamic';
import TrendInfoCards from './TrendInfoCards';
import StateTable from './StateTable';
import StateStatsTable from './StateStatsTable';

const IndiaMap = dynamic(() => { return import('./geo/IndiaMap'); }, { ssr: false });
const { TabPane } = Tabs;

const HomePageTabsSecond = ({ stateDataLatest }) => {
	return (
		<Tabs className="home-page-tabs-second">
			<TabPane
				tab={
					(<div>Map</div>)
				}
				key="1"
			>
				<Row>
					<Col flex={24}>
						<p style={{ marginTop: 16, marginBottom: 16 }}>Scales are based on value of 7 day Moving Average
							of new cases over 14 days.
							Read more about our criteria <a href="/criteria">here</a>.
						</p>
					</Col>
				</Row>
				<Row gutter={[{ xs: 8, sm: 16 }, { xs: 8, sm: 16 }]}>
					<Col xs={24} sm={24} md={12}>
						<IndiaMap stateDataMostRecent={stateDataLatest} />
					</Col>
					<Col xs={24} sm={24} md={12}>
						<TrendInfoCards colSpan={12} />
					</Col>
				</Row>
			</TabPane>
			<TabPane
				tab={
					(<div>State Progress</div>)
				}
				key="2"
			>
				<Row>
					<Col xs={24} sm={24} md={24}>
						<StateTable
							casesByStateLatest={stateDataLatest}
						/>
					</Col>
				</Row>
			</TabPane>
			<TabPane
				tab={
					(<div>State Statistics</div>)
				}
				key="3"
			>
				<Row>
					<Col xs={24} sm={24} md={24}>
						<StateStatsTable
							casesByStateLatest={stateDataLatest}
						/>
					</Col>
				</Row>
			</TabPane>
		</Tabs>
	);
};

export default HomePageTabsSecond;
