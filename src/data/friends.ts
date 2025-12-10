// 友情链接数据配置
// 用于管理友情链接页面的数据

export interface FriendItem {
	id: number;
	title: string;
	imgurl: string;
	desc: string;
	siteurl: string;
	tags: string[];
}

// 友情链接数据
export const friendsData: FriendItem[] = [
	{
		id: 1,
		title: "Y5neKO",
		imgurl: "https://y5neko.github.io/image/123.jpeg",
		desc: "“行走于黑白之间。”",
		siteurl: "https://y5neko.github.io/",
		tags: ["老二次元","菜鸡"],
	},
	{
		id: 2,
		title: "CQ",
		imgurl:"https://data.mio.blue/img/CQ.PNG",
		desc: "“如果回憶能夠譽寫，光陰就有了副本”",
		siteurl: "http://www.smg1307.space",
		tags: ["Re"],
	},
	{
		id: 3,
		title: "kine",
		imgurl: "https://data.mio.blue/img/kine.jpg",
		desc: "“mio真可爱，想rua”",
		siteurl: "http://www.kinehoo.top",
		tags: ["web","Re"],
	},
	{
		id: 4,
		title: "f1iaz",
		imgurl: "https://data.mio.blue/img/f1iaz.jpg",
		desc: "“允许自己做自己，允许一切如其所是”",
		siteurl: "http://www.fliaz.top",
		tags: ["web", "linux"],
	},
	{
		id: 5,
		title: "thoelc",
		imgurl: "https://data.mio.blue/img/thoelc.jpg",
		desc: "“mio加油捏”",
		siteurl: "https://labwt.cn",
		tags: ["embedded", "web"],
	},
	/*{
		id: 6,
		title: "React",
		imgurl: "https://avatars.githubusercontent.com/u/6412038?v=4&s=640",
		desc: "“mio加油捏”",
		siteurl: "https://reactjs.org",
		tags: ["Framework", "JavaScript"],
	},
	{
		id: 7,
		title: "GitHub",
		imgurl: "https://avatars.githubusercontent.com/u/9919?v=4&s=640",
		desc: "Where the world builds software",
		siteurl: "https://github.com",
		tags: ["Development", "Platform"],
	},
	{
		id: 8,
		title: "MDN Web Docs",
		imgurl: "https://avatars.githubusercontent.com/u/7565578?v=4&s=640",
		desc: "The web's most comprehensive resource for web developers",
		siteurl: "https://developer.mozilla.org",
		tags: ["Docs", "Reference"],
	},*/
];

// 获取所有友情链接数据
export function getFriendsList(): FriendItem[] {
	return friendsData;
}

// 获取随机排序的友情链接数据
export function getShuffledFriendsList(): FriendItem[] {
	const shuffled = [...friendsData];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}
