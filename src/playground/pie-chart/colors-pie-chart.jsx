import { useEffect, useState } from "react";

import { arc, csv, pie } from "d3";

const csvUrl =
	"https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/cssNamedColors.csv";

const width = 400;
const height = 400;
const centerX = width / 2;
const centerY = height / 2;

const pieArc = arc().innerRadius(0).outerRadius(width);

export const ColorsPieChart = () => {
	const [data, setData] = useState(null);

	useEffect(() => {
		csv(csvUrl).then((data) => {
			setData(data);
		});
	}, []);

	if (!data) return <div>Loading</div>;

	// 1 means it's equal
	const generator = pie().value(1);

	return (
		<svg width={width} height={height}>
			<g transform={`translate(${centerX}, ${centerY})`}>
				{generator(data).map((d) => (
					<path
						fill={d.data["RGB hex value"]}
						d={pieArc(d)}
						key={d.index}
					/>
				))}
			</g>
		</svg>
	);
};
