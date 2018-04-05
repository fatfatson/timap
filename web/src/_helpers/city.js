var dataNew = require('./citydata.json');

var _ = require('lodash');

export const cityInfo = {
	getAllProvinces,
	getAllCitiesByProvince,
	getAllZoneByCity
};

//var dataNew = require('./cityDataNew.json');

function getAllProvinces() {
	var p = [];
	for (var i = 0; i < dataNew.length; i++) {
		p.push(dataNew[i]['privnce']);
	}
	return p;
}

function getAllCitiesByProvince(province) {
	var result = [];
	for (let index = 0; index < dataNew[province]['citys'].length; index++) {
		result.push(dataNew[province]['citys'][index]['cityName']);
	}

	return result;
}

function getAllZoneByCity(province, city) {
	return dataNew[province]['citys'][city]['cityArea'];
}

