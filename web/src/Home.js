import React, { Component } from 'react';
import _ from 'lodash';
import { InfiniteLoader, List, AutoSizer } from 'react-virtualized';
import TimelineContainer from './_components/TimelineContainer';
var Infinite = require('react-infinite');

function MyComponent({ list }) {
	list = _.range(1, 50);
	const rowCount = list.length;

	var mapLoaded = {};
	// Only load 1 page of items at a time.
	// Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
	const loadMoreRows = ({ startIndex: si, stopIndex: ei }) => {
		console.log('loadmore', si, ei);
		for (var k = si; k <= ei; k++) {
			mapLoaded[k] = true;
		}
		var self = this;
		return new Promise(fill => {
			setTimeout(() => {
				console.log('load ok');
				fill();
			}, 1);
		});
	};

	// Every row is loaded except for our loading indicator row.
	const isRowLoaded = ({ index }) => mapLoaded[index];

	// Render a list item or a loading indicator.
	const rowRenderer = ({ index, key, style }) => {
		let content;

		if (!isRowLoaded({ index })) {
			content = 'Loading...';
		} else {
			content = 'year' + index;
		}

		return (
			<div key={key} style={style}>
				{content}
			</div>
		);
	};

	return (
		<InfiniteLoader
			isRowLoaded={isRowLoaded}
			loadMoreRows={loadMoreRows}
			rowCount={rowCount}
		>
			{({ onRowsRendered, registerChild }) => (
				<AutoSizer disableHeight>
					{({ width }) => (
						<List
							ref={registerChild}
							onRowsRendered={onRowsRendered}
							rowRenderer={rowRenderer}
							height={300}
							width={width}
							rowHeight={20}
							rowCount={rowCount}
						/>
					)}
				</AutoSizer>
			)}
		</InfiniteLoader>
	);
}

class Home extends Component {
	constructor(props) {
		super();
		this.state = {
			elements: this.buildElements()
		};
	}

	buildElements() {
		var es = [];
		_.range(1, 15000).forEach(k => {
			//console.log(k);
			es.push(
				<div key={k} style={{ height: 40 }}>
					{k}
					<div style={{ position: 'relative', left: 50 }}>{k}-ev</div>
				</div>
			);
		});
		return es;
	}
	render() {
		return <TimelineContainer range={[1900, 1950, 'y']} />;
	}
}

export default Home;
