import React, { Component } from 'react';
import _ from 'lodash';
import { InfiniteLoader, List, AutoSizer } from 'react-virtualized';
import { bindThis } from '../common/tools';
import TimelineNode from './TimelineNode';
import TimeRange from '../common/TimeRange';
import { fetchEvents } from '../_helpers/fetch';

class TimelineContainer extends Component {
	constructor(props) {
		super(props);
		this.timeRange = new TimeRange(...this.props.range);
		this.mapLoaded = {};
		//console.log('tlc init', this.timeRange);
		bindThis(this, 'loadMoreRows', 'isRowLoaded', 'rowRenderer');
	}

	loadMoreRows({ startIndex: si, stopIndex: ei }) {
		var start = this.timeRange.getTime(si);
		var stop = this.timeRange.getTime(ei);
		console.log('loadmore', si, ei, start, stop);
		var pro = fetchEvents(start, stop);
		return pro.then(data => {
			//console.log('loadfinish', data);
			this.data = data;
			for (var k = si; k <= ei; k++) {
				this.mapLoaded[k] = true;
			}
		});
	}

	isRowLoaded({ index, ...args }) {
		//console.log('isloaded?', index, args);
		return this.mapLoaded[index];
	}

	rowRenderer({ index, key, style }) {
		let content;

		let isLoaded = this.isRowLoaded({ index });

		return (
			<div key={key} style={style}>
				<TimelineNode
					range={this.timeRange}
					index={index}
					isLoaded={isLoaded}
					data={this.getDataForNode(index)}
				/>
			</div>
		);
	}

	getDataForNode(index) {
		if (!this.data) return;
		var time = this.timeRange.getTime(index);
		var data = [];
		this.data.forEach(ev => {
			if (ev.time == time) data.push(ev);
		});
		return data;
	}

	render() {
		return (
			<div style={{ display: 'flex', width: '100%' }}>
				<InfiniteLoader
					isRowLoaded={this.isRowLoaded}
					loadMoreRows={this.loadMoreRows}
					rowCount={this.timeRange.getCount()}
				>
					{({ onRowsRendered, registerChild }) => (
						<AutoSizer>
							{({ width, height }) => (
								<List
									ref={registerChild}
									onRowsRendered={onRowsRendered}
									rowRenderer={this.rowRenderer}
									width={width}
									height={height}
									rowHeight={26}
									rowCount={this.timeRange.getCount()}
									style={{
										outline: 'none'
									}}
								/>
							)}
						</AutoSizer>
					)}
				</InfiniteLoader>
			</div>
		);
	}
}

export default TimelineContainer;
