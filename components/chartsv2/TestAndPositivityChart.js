/* eslint-disable import/prefer-default-export */
import React, { useRef, useEffect } from 'react';
import _ from 'lodash';
import { LineOutlined } from '@ant-design/icons';
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

const TestAndPositivityChart = ({ tests, movingAverage, dates, positivity, positivityMovingAverage }) => {
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
						return `<b>${Utils.longMonthAndDate(params[0].name)}</b> <br />
							Tests: ${numeral(tests[params[0].dataIndex]).format('0,0')}
							<br />7-day average: ${numeral(movingAverage[params[0].dataIndex]).format('0,0')}
							<br />Positivity: ${numeral(positivity[params[0].dataIndex]).format('0.00')}%
							<br />7-day average: ${numeral(positivityMovingAverage[params[0].dataIndex]).format('0.00')}%`;
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
				graphic: chartSettings.getGraphicSettings('daily tests', 'positivity'),
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
					...chartSettings.getAxisIntervals(_.max(tests))
				}, {
					...chartSettings.yAxis,
					gridIndex: 1,
					...chartSettings.getAxisIntervals(_.max(positivity)),
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
						...chartSettings.barSeries,
						name: 'Tests',
						data: tests,
						color: '#ffd591',
						emphasis: {
							itemStyle: {
								color: '#ffa940'
							}
						},
					},
					{
						...chartSettings.lineSeries,
						name: '7 day avg',
						color: '#d46b08',
						data: movingAverage,
						lineStyle: {
							color: '#d46b08',
							width: 2
						},
						areaStyle: {
							color: '#ffe7ba'
						},
					},
					{
						...chartSettings.lineSeries,
						name: '+VE',
						data: positivity,
						color: '#d9d9d9',
						xAxisIndex: 1,
						yAxisIndex: 1,
						lineStyle: {
							color: '#d9d9d9',
							width: 2
						}
					},
					{
						...chartSettings.lineSeries,
						name: '+VE 7 day avg',
						data: positivityMovingAverage,
						color: '#ff7a45',
						xAxisIndex: 1,
						yAxisIndex: 1,
						lineStyle: {
							color: '#ff7a45',
							width: 2
						}
					}
				]
			}
		);
		function handleResize() {
			chart.resize();
		}
		window.addEventListener('resize', handleResize);
	}, [tests, movingAverage, dates, positivity, positivityMovingAverage]);
	return (
		<>
			<div ref={container} />
		</>
	);
};

export default TestAndPositivityChart;
