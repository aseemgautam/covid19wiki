/* eslint-disable import/prefer-default-export */
import React, { useRef, useEffect } from 'react';
import _ from 'lodash';
import echarts from 'echarts/lib/echarts';
import bar from 'echarts/lib/chart/bar';
import line from 'echarts/lib/chart/line';
import tooltip from 'echarts/lib/component/tooltip';
import dataZoom from 'echarts/lib/component/dataZoom';
import legend from 'echarts/lib/component/legend';
import axisPointer from 'echarts/lib/component/axisPointer';
import graphic from 'echarts/lib/component/graphic';
import numeral from 'numeral';
import Utils from '../../classes/Utils';
import chartSettings from './Settings';

const NewCasesAndDeathsChart = ({ newCases, movingAverage, dates, deaths, deathsMovingAverage }) => {
	const container = useRef(null);
	const chartWidth = useRef(0);
	useEffect(() => {
		if (!container.current) {
			return;
		}
		chartWidth.current = container.current.parentElement.offsetWidth;
		const chart = echarts.init(container.current, {},
			{ width: 'auto', height: 420 });
		chart.setOption(
			{
				tooltip: {
					...chartSettings.tooltip,
					trigger: 'axis',
					formatter: params => {
						return `<b>${Utils.longMonthAndDate(params[0].name)}</b> <br />New Cases: ${newCases[params[0].dataIndex]}
							<br />7-day average: ${numeral(movingAverage[params[0].dataIndex]).format('0,0')}
							<br />Deaths: ${deaths[params[0].dataIndex]}
							<br />7-day average: ${deathsMovingAverage[params[0].dataIndex]}`;
					},
					axisPointer: {
						animation: false
					}
				},
				dataZoom: {
					show: true,
					xAxisIndex: [0, 1],
					start: 50,
					end: 100,
				},
				graphic: chartSettings.getGraphicSettings('new cases', 'deaths'),
				xAxis: [{
					data: dates,
					...chartSettings.xAxis,
					axisTick: {
						show: false
					},
					axisLabel: {
						show: false
					},
					show: true,
				},
				{
					data: dates,
					gridIndex: 1,
					...chartSettings.xAxis
				}],
				axisPointer: {
					link: { xAxisIndex: 'all' }
				},
				grid: chartSettings.grid,
				yAxis: [{
					...chartSettings.yAxis,
					...chartSettings.getAxisIntervals(_.max(newCases))
				}, {
					...chartSettings.yAxis,
					gridIndex: 1,
					...chartSettings.getAxisIntervals(_.max(deaths)),
					axisLabel: {
						verticalAlign: 'top',
						inside: true,
						align: 'left',
						margin: 0,
						lineHeight: 20,
						showMinLabel: false,
						color: '#999'
					}
				}],
				series: [
					{
						...chartSettings.lineSeries,
						name: 'Cases Avg',
						data: movingAverage,
						lineStyle: {
							color: '#CF1110',
							width: 2
						},
						areaStyle: {
							color: '#FAE6E6'
						},
					},
					{
						...chartSettings.barSeries,
						name: 'Cases',
						data: newCases,
						color: '#FAC9C7',
						emphasis: {
							itemStyle: {
								color: '#F87E7B'
							}
						},
					},
					{
						...chartSettings.lineSeries,
						name: 'Deaths Avg',
						data: deathsMovingAverage,
						xAxisIndex: 1,
						yAxisIndex: 1,
						lineStyle: {
							color: '#434343',
							width: 2
						},
						areaStyle: {
							color: '#f5f5f5'
						},
					},
					{
						...chartSettings.barSeries,
						name: 'Deaths',
						data: deaths,
						color: '#bbb',
						xAxisIndex: 1,
						yAxisIndex: 1,
						emphasis: {
							itemStyle: {
								color: '#666'
							}
						},
					},
				]
			}
		);
		function handleResize() {
			chart.resize();
		}
		window.addEventListener('resize', handleResize);
	}, [newCases, movingAverage, dates, deaths, deathsMovingAverage]);
	return (
		<>
			<div ref={container} />
		</>
	);
};

export default NewCasesAndDeathsChart;
