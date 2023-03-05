import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { generateName } from "../../utils/name";
import styled from "styled-components";

const Tooltip = styled.div`
	position: absolute;
	width: 200px;
	height: auto;
	padding: 10px;
	background-color: white;
	box-shadow: 4px 4px 10px rbga(0, 0, 0, 0.4);
	border-radius: 5%;
	opacity: ${(props) => (props.opacity ? props.opacity : 0)};
	top: ${(props) => props.top};
	left: ${(props) => props.left};

	transition: opacity ${(props) => (props.opacity ? "1s" : "0")} ease-in-out;

	&:hover {
		cursor: pointer;
	}

	p {
		margin: 0;
		font-size: 16px;
	}
`;

export const BasicPieChart = () => {
	const ref = useRef();
	const [data, setData] = useState([]);
	const [tooltipState, setTooltipState] = useState({});

	const innerRadius = 80;
	const outerRadius = 200;
	const width = 700;
	const height = 600;
	const peiCenterX = 250;
	const pieCenterY = 300;
	const legendCenterX = 490;
	const legendCenterY = 120;
	const labelHeight = 9;

	useEffect(() => {
		draw();
	}, [data]);

	// each node compose of name, value and color
	function generateData() {
		let arr = [...Array(d3.randomInt(4, 11)())];

		// Create a new array of objects with random properties:
		// each node compose of radius, x coordinate, y coordinate, and color
		const nodes = arr.map((a) => {
			const value = d3.randomInt(100, 2000)();
			const red = d3.randomInt(1, 256)();
			const green = d3.randomInt(1, 256)();
			const blue = d3.randomInt(1, 256)();
			return {
				name: generateName(),
				value: value,
				color: d3.rgb(red, green, blue, 0.7),
				borderColor: d3.rgb(red, green, blue, 1),
			};
		});

		return nodes;
	}

	function draw() {
		d3.select(ref.current).select("svg").remove();

		// Create new svg
		const svgElement = d3
			.select(ref.current)
			.append("svg")
			.attr("width", width)
			.attr("height", height);

		const gElement = svgElement
			.append("g")
			.attr("transform", `translate(${peiCenterX}, ${pieCenterY})`);

		const arcGenerator = d3
			.arc()
			.innerRadius(innerRadius)
			.outerRadius(outerRadius)
			.cornerRadius(12);
		const arcHoverGenerator = d3
			.arc()
			.innerRadius(innerRadius)
			.outerRadius(outerRadius + 10)
			.cornerRadius(12);

		const pieGenerator = d3
			.pie()
			.padAngle(0.02)
			.value((d) => d.value)
			.sort(null);

		function mouseOver(event, d) {
			event.stopPropagation();
			d3.select(this)
				.transition()
				.attr("d", arcHoverGenerator)
				.duration(200);

			// Adding tooltip

			setTooltipState({
				opacity: 1,
				left: `${event.pageX}px`,
				top: `${event.pageY}px`,
				value: d.value,
				name: d.data.name,
			});
			// d3.select("#tooltip2").transition().duration(200);

			// 	.style("left", event.pageX + "px")
			// 	.style("top", event.pageY + "px")
			// 	.style("opacity", 1)
			// 	.style("border", `1px solid ${d.data.color}`);

			// d3.select("#tooltip .value").text(d.value);
			// d3.select("#tooltip .name").text(d.data.name);
		}

		function mouseOut(event) {
			event.stopPropagation();
			d3.select(this).transition().attr("d", arcGenerator).duration(200);
			// d3.select("#tooltip").style("opacity", 0);
			setTooltipState({ opacity: 0 });
		}

		const pieData = pieGenerator(data);
		const totalValue = pieData.reduce((a, c) => a + c.data.value, 0);
		let delaySum = 0;
		pieData.forEach((d, i) => {
			d.duration = 500 * (d.data.value / totalValue);
			d.delay = delaySum;
			delaySum += d.duration;
		});

		const arc = gElement.selectAll("path").data(pieData).enter();

		arc.append("path")
			.attr("fill", (d) => d.data.color)
			.attr("stroke", (d) => d.data.borderColor)
			.attr("stroke-width", 2)
			.on("mouseover", mouseOver)
			.on("mouseout", mouseOut)
			.transition()
			.duration((d) => d.duration)
			.delay((d) => d.delay)
			.attrTween("d", function (d) {
				var i = d3.interpolate(d.startAngle, d.endAngle);
				return function (t) {
					d.endAngle = i(t);
					return arcGenerator(d);
				};
			});

		// Append text labels
		// arc.append("text")
		// 	.attr("text-anchor", "middle")
		// 	.attr("alignment-baseline", "middle")
		// 	.text((d) => d.data.name)
		// 	.style("fill", "black")
		// 	.attr("transform", (d) => {
		// 		const [x, y] = arcGenerator.centroid(d);
		// 		return `translate(${x}, ${y})`;
		// 	});

		// Append legend
		const legend = svgElement
			.append("g")
			.attr("transform", `translate(${legendCenterX}, ${legendCenterY})`);

		legend
			.selectAll(null)
			.data(pieData)
			.enter()
			.append("circle")
			.attr("r", labelHeight)
			.attr("cy", (d) => labelHeight * d.index * 3)
			.attr("fill", (d) => d.data.color)
			.attr("stroke", (d) => d.data.borderColor)
			.attr("stroke-width", 2);

		legend
			.selectAll(null)
			.data(pieData)
			.enter()
			.append("text")
			.text((d) => d.data.name)
			.attr("x", labelHeight * 2)
			.attr("y", (d) => labelHeight * d.index * 3 + labelHeight - 4)
			.style("font-family", "sans-serif")
			.style("font-size", `${labelHeight + 3}px`);
	}

	function updateData() {
		const nodes = generateData();
		setData(nodes);
	}

	function clearData() {
		setData([]);
	}

	return (
		<div>
			<button onClick={updateData}>update data</button>
			<button onClick={clearData}>clear</button>
			<div ref={ref} style={{ backgroundColor: "#e9edc9" }} />
			{/* <div id="tooltip" className="hidden">
				<p>Hi, I am a tooltip.</p>
				<p>
					name is : <span className="name"></span>
				</p>
				<p>
					Value is : <span className="value">0</span>
				</p>
			</div> */}
			<Tooltip id="tooltip2" {...tooltipState}>
				<p>Hi, I am a tooltip.</p>
				<p>
					name is : <span>{tooltipState?.name}</span>
				</p>
				<p>
					Value is : <span>{tooltipState?.value}</span>
				</p>
			</Tooltip>
		</div>
	);
};
