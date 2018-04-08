import { sleep } from '../common/tools';

const data = [
	{ time: '1910', title: '《日俄协定》' },
	{ time: '1911', title: '辛亥革命' },
	{ time: '1912', title: '中华民国成立' },
	{ time: '1921', title: '中国共产党成立' },
	{ time: '1927', title: '八一起义' },
	{ time: '1935', title: '遵义会议' },
	{ time: '1935', title: '中日《何梅协定》' },
	{ time: '1937', title: '抗战全面爆发' },
	{ time: '1949', title: '新中国成立' }
];
export const fetchEvents = async function(start, stop, options) {
	await sleep(1000);
	return data;
};
