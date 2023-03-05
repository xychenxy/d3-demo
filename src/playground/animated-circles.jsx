import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

const AnimatedCircles = () => {
	const ref = useRef();
	const [data, setData] = useState([]);

	const width = 600;
	const height = 400;

	function generateData(width, height) {
		let arr = [...Array(d3.randomInt(2, 11)())];

		// Create a new array of objects with random properties:
		// each node compose of radius, x coordinate, y coordinate, and color
		const nodes = arr.map((a) => {
			const r = d3.randomUniform(10, 50)();
			const red = d3.randomInt(1, 256)();
			const green = d3.randomInt(1, 256)();
			const blue = d3.randomInt(1, 256)();
			const alpha = Math.random();
			return {
				x: d3.randomUniform(r, width - r)(),
				y: d3.randomUniform(r, height - r)(),
				r: r,
				color: d3.rgb(red, green, blue, alpha),
			};
		});

		return nodes;
	}

	function updateData() {
		const nodes = generateData(width, height);
		setData(nodes);
	}

	function clearData() {
		setData([]);
	}

	function draw() {
		d3.select(ref.current).select("svg").remove();

		// Create new svg
		const svgElement = d3
			.select(ref.current)
			.append("svg")
			.attr("width", width)
			.attr("height", height);

		// svgElement
		// 	.selectAll("circle")
		// 	.data(data)
		// 	.join("circle")
		// 	.attr("cx", (d) => d.x)
		// 	.attr("cy", (d) => d.y)
		// 	.transition()
		// 	.duration(1000)
		// 	.attr("r", (d) => d.r)
		// 	.attr("fill", (d) => d.color);

		svgElement
			.selectAll("circle")
			.data(data)
			.join(function (enter) {
				return enter
					.append("circle")
					.attr("cx", (d) => d.x)
					.attr("cy", (d) => d.y)
					.transition()
					.duration(1000)
					.attr("r", (d) => d.r)
					.attr("fill", (d) => d.color);
			});
	}

	useEffect(() => {
		draw();
	}, [data]);

	return (
		<div>
			<button onClick={updateData}>update data</button>
			<button onClick={clearData}>clear</button>
			<div ref={ref} style={{ backgroundColor: "#e9edc9" }}></div>
		</div>
	);
};

export default AnimatedCircles;
