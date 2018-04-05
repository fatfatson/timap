import React, { Component } from 'react';
import _ from 'lodash';
var Infinite = require('react-infinite');

class Home extends Component {
	constructor(props) {
		super();
		this.state = {
			elements: this.buildElements()
		};
	}

	buildElements() {
		var es = [];
		_.range(1, 500).forEach(k => {
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
			<Infinite
				styles={{ flex: 1, backgroundColor: 'red' }}
				containerHeight={400}
				elementHeight={40}
			>
				{this.state.elements}
			</Infinite>
		);
	}
}

export default Home;
