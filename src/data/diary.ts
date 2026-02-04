// 日记数据配置
// 用于管理日记页面的数据

export interface DiaryItem {
	id: number;
	content: string;
	date: string;
	images?: string[];
	location?: string;
	mood?: string;
	tags?: string[];
}

// 示例日记数据
const diaryData: DiaryItem[] = [
	//{
		//id: 1,
		//content:
			//"The falling speed of cherry blossoms is five centimeters per second!",
		//date: "2025-01-15T10:30:00Z",
		//images: ["/images/diary/sakura.jpg", "/images/diary/1.jpg"],
	//},
	{
		id: 1,
		content:
			"hello world",
		date: "2025-12-05T11:08:00Z",
		//images: ["/images/diary/sakura.jpg", "/images/diary/1.jpg"],
	},
	/*{
		id: 2,
		content:
			"这周好累,一直在打比赛，做题，周末也没歇着，忙到好晚把家里的服务器用cloudflare隧道穿透了,现在终于可以用了,以前熬夜都 从来没有这么累过 这周下来感觉现在和实验室的大家差距越来越大了....不开心..",
		date: "2025-12-07T19:50:00Z",
		//images: ["/images/diary/sakura.jpg", "/images/diary/1.jpg"],
	},*/

];

// 获取日记统计数据
export const getDiaryStats = () => {
	const total = diaryData.length;
	const hasImages = diaryData.filter(
		(item) => item.images && item.images.length > 0,
	).length;
	const hasLocation = diaryData.filter((item) => item.location).length;
	const hasMood = diaryData.filter((item) => item.mood).length;

	return {
		total,
		hasImages,
		hasLocation,
		hasMood,
		imagePercentage: Math.round((hasImages / total) * 100),
		locationPercentage: Math.round((hasLocation / total) * 100),
		moodPercentage: Math.round((hasMood / total) * 100),
	};
};

// 获取日记列表（按时间倒序）
export const getDiaryList = (limit?: number) => {
	const sortedData = diaryData.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);

	if (limit && limit > 0) {
		return sortedData.slice(0, limit);
	}

	return sortedData;
};

// 获取最新的日记
export const getLatestDiary = () => {
	return getDiaryList(1)[0];
};

// 根据ID获取日记
export const getDiaryById = (id: number) => {
	return diaryData.find((item) => item.id === id);
};

// 获取包含图片的日记
export const getDiaryWithImages = () => {
	return diaryData.filter((item) => item.images && item.images.length > 0);
};

// 根据标签筛选日记
export const getDiaryByTag = (tag: string) => {
	return diaryData
		.filter((item) => item.tags?.includes(tag))
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// 获取所有标签
export const getAllTags = () => {
	const tags = new Set<string>();
	diaryData.forEach((item) => {
		if (item.tags) {
			item.tags.forEach((tag) => tags.add(tag));
		}
	});
	return Array.from(tags).sort();
};

export default diaryData;
