import React, { useRef, useState } from "react";
import { useMeasure } from "./use-measure";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Pager } from "./pager";
import AnimatedCircles from "../playground/animated-circles";
import { BasicPieChart } from "../playground/pie-chart/basic-pie-chart";

const TabContainer = styled.div`
	overflow-y: hidden;
	box-shadow: none;
`;

const TabList = styled.div`
	display: block;
	position: relative;
	border-bottom: 1px solid rgba(0, 0, 0, 0.12);
`;

const TabItem = styled(motion.button)`
	white-space: nowrap;
	-webkit-appearance: none;
	box-sizing: border-box;
	text-align: center;
	-webkit-font-smoothing: antialiased;
	text-rendering: optimizelegibility;
	user-select: none;
	outline: none;
	-webkit-tap-highlight-color: transparent;
	box-shadow: none;
	cursor: pointer;
	text-decoration: none;
	border-width: initial;
	border-style: none;
	border-color: initial;
	border-image: initial;
	padding: 10px 1rem;
	box-sizing: border-box;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
		"Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
		"Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
	-webkit-font-smoothing: antialiased;
	text-size-adjust: none;
	text-overflow: ellipsis;
	line-height: 1.5;
	font-size: 0.875rem;
	font-weight: 600;
	color: ${(p) => (p.isActive ? "rgb(25, 113, 194)" : "rgb(95, 104, 113)")};
	margin: 0px;
	overflow: hidden;

	background-color: transparent;
`;

const Slider = styled(motion.div)`
	height: 4px;
	border-top-right-radius: 8px;
	border-top-left-radius: 8px;
	margin-left: 2px;
	margin-right: 2px;
	bottom: 0;
	position: absolute;
	background: #08e;
`;

const TabContent = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const tabs = ["Pie chart", "Circle"];
const tabsContent = [<BasicPieChart />, <AnimatedCircles />];

export function Tabs() {
	const [value, setValue] = useState(1);
	const childRefs = useRef(new Map());
	const tabListRef = useRef();
	const [slider, setSlider] = useState({ left: 0, right: 0 });
	const { bounds, ref } = useMeasure();

	// measure our elements
	React.useEffect(() => {
		const target = childRefs.current.get(value);
		const container = tabListRef.current;
		if (target) {
			const cRect = container.getBoundingClientRect();

			// when container is `display: none`, width === 0.
			// ignore this case
			if (cRect.width === 0) {
				return;
			}

			const tRect = target.getBoundingClientRect();
			const left = tRect.left - cRect.left;
			const right = cRect.right - tRect.right;

			setSlider({
				hasValue: true,
				left: left + 8,
				right: right + 8,
			});
		}
	}, [value, bounds]);

	return (
		<div>
			<TabContainer ref={ref}>
				<TabList ref={tabListRef}>
					{tabs.map((tab, i) => (
						<TabItem
							key={tab}
							isActive={i === value}
							whileHover={{ backgroundColor: "#f1f3f5" }}
							transition={{ duration: 0.1 }}
							whileTap={{ backgroundColor: "#e9ecef" }}
							ref={(el) => childRefs.current.set(i, el)}
							onClick={() => setValue(i)}
						>
							{tab}
						</TabItem>
					))}
					{slider.hasValue && (
						<Slider
							positionTransition={{
								bounceDamping: 3,
							}}
							initial={false}
							style={{
								left: slider.left,
								right: slider.right,
							}}
						/>
					)}
				</TabList>
			</TabContainer>
			<Pager value={value}>
				{tabsContent.map((tab, i) => (
					<div key={i}>
						<TabContent>{tab}</TabContent>
					</div>
				))}
			</Pager>
		</div>
	);
}
