import React, { Component } from 'react';
import _ from 'lodash';
import { bindThis } from '../common/tools';

const VLLeft = 40;
const VL = () => (
	<div
		style={{
			display: 'inline-block',
			backgroundColor: 'black',
			//position: 'absolute',
			left: VLLeft,
			top: 0,
			width: 1,
			height: '100%'
		}}
	/>
);

const HL = ({ width }) => (
	<div
		style={{
			backgroundColor: 'black',
			//position: 'absolute',
			//left: VLLeft - width,
			//top: 10,
			marginLeft: 5 - width,
			width: width,
			height: 1
		}}
	/>
);

class TimelineNode extends Component {
	constructor(props) {
		super(props);
		bindThis(this);
	}

	renderEventData() {
		var { data } = this.props;
		var divs = [];
		data.forEach((ev, k) => {
			divs.push(
				<div
					key={k}
					style={{
						padding: 2,
						marginLeft: 4,
						marginRight: 4,
						backgroundColor: '#aa440033',
						fontSize: 10
					}}
				>
					{ev.title}
				</div>
			);
		});
		return divs;
	}

	render() {
		var { index, isLoaded, data } = this.props;
		console.log('rendernode', index, this.props.data);
		var isN = index % 5 == 0;
		var hasD = data && data.length > 0;
		var isLast = index == this.props.range.getCount() - 1;
		var year = this.props.range.start + index;
		return (
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					//height: '98%',
					height: '100%'
					//backgroundColor: '#00aa00aa'
				}}
			>
				<div
					style={{
						//backgroundColor: '#0000cc33',
						fontSize: isN ? 14 : 12,
						lineHeight: '14px',
						width: 40,
						textAlign: 'right',
						fontFamily: 'Arial, Helvetica, sans-serif'
					}}
				>
					{(isN || isLast || hasD) && year}
				</div>
				<HL width={isN ? 5 : 3} />
				<VL />
				{!isLoaded && <div style={{}}>loading</div>}
				{isLoaded && (
					<div
						style={{
							//position: 'absolute',
							//width: 50,
							height: '90%',
							display: 'flex',
							alignItems: 'center'
						}}
					>
						{data && this.renderEventData()}
					</div>
				)}
			</div>
		);
	}
}

export default TimelineNode;
