import "./App.css";
import { ColorsPieChart } from "./playground/pie-chart/colors-pie-chart";
import { Face } from "./components/Face";
import { BasicPieChart } from "./playground/pie-chart/basic-pie-chart";
import LineChart from "./playground/bar-chart/basic-bar-chart";
import AnimatedCircles from "./playground/animated-circles";
import styled from "styled-components";
import { Tabs } from "./components/tabs";

// https://npmtrends.com/d3.js-vs-echarts-vs-highcharts-vs-react-vis-vs-vega-vs-vega-lite
const Container = styled.div`
	/* box-shadow: 0 10px 20px rgba(0, 0, 0, 0.07); */
	margin: 1rem;
	border-radius: 1rem;
	overflow: hidden;
`;

function App() {
	return (
		<div id="test">
			<Container>
				{/* <ColorsPieChart /> */}
				{/* <BasicPieChart /> */}
				{/* <LineChart /> */}
				{/* <AnimatedCircles /> */}
				<Tabs />
			</Container>
		</div>
	);
}

export default App;
