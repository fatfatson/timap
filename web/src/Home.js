import React, { Component } from 'react';
import _ from 'lodash';
import { InfiniteLoader, List } from 'react-virtualized';
var Infinite = require('react-infinite');

function MyComponent({
	/** Are there more items to load? (This information comes from the most recent API request.) */
	hasNextPage,
	/** Are we currently loading a page of items? (This may be an in-flight flag in your Redux store for example.) */
	isNextPageLoading,
	/** List of items loaded so far */
	list,
	/** Callback function (eg. Redux action-creator) responsible for loading the next page of items */
	loadNextPage
}) {
	// If there are more items to be loaded then add an extra row to hold a loading indicator.
	const rowCount = hasNextPage ? list.size + 1 : list.size;

	// Only load 1 page of items at a time.
	// Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
	const loadMoreRows = isNextPageLoading ? () => {} : loadNextPage;

	// Every row is loaded except for our loading indicator row.
	const isRowLoaded = ({ index }) => !hasNextPage || index < list.size;

	// Render a list item or a loading indicator.
	const rowRenderer = ({ index, key, style }) => {
		let content;

		if (!isRowLoaded({ index })) {
			content = 'Loading...';
		} else {
			content = list.getIn([index, 'name']);
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
				<List
					ref={registerChild}
					onRowsRendered={onRowsRendered}
					rowRenderer={rowRenderer}
				/>
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
		return (
			<MyComponent />
			// <Infinite
			// 	styles={{ flex: 1, backgroundColor: 'red' }}
			// 	//useWindowAsScrollContainer
			// 	containerHeight={1400}
			// 	elementHeight={40}
			// 	onLayout={(...args) => {
			// 		console.log(args);
			// 	}}
			// >
			// 	{this.state.elements}
			// </Infinite>
		);
	}
}

export default Home;
