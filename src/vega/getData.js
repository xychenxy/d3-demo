import { csv } from "d3";

const csvUrl =
	"https://gist.githubusercontent.com/curran/8c131a74b85d0bb0246233de2cff3f52/raw/auto-mpg.csv";

export const getData = async () => {
	const data = await csv(csvUrl);

	return data;
};
