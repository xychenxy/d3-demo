export const BasicPieChart = ({
	data,
	innerRadius,
	outerRadius,
	padding = 20,
}) => {
	const createPie = pie()
		.value((d) => d.value)
		.padAngle(0.02);
	const createArc = arc()
		.innerRadius(innerRadius)
		.outerRadius(outerRadius)
		.cornerRadius(12);
	const createArcOut = arc()
		.innerRadius(innerRadius)
		.outerRadius(outerRadius + 10)
		.cornerRadius(12);

	const mapData = createPie(data);
	let initSum = 0;
	mapData.forEach((d) => {
		d._endAngle = d.endAngle;
		// d.endAngle = d.startAngle;
		d.duration = 2 * (d.data.value / data.reduce((a, c) => a + c.value, 0));
		d.delay = initSum;
		initSum += d.duration;
	});

	console.log("mapData", mapData);

	const startAngle = useMotionValue(0);

	const width = outerRadius * 2 + padding;
	const height = outerRadius * 2 + padding;
	const centerX = width / 2;
	const centerY = height / 2;

	function tweenArc(b) {
		return function (a, i) {
			var d = b.call(this, a, i);
			var i = interpolate(a, d);

			return function (t) {
				return createArc(i(t));
			};
		};
	}

	const test = (d) => {
		d.endAngle = d._endAngle;
		d.startAngle = d.startAngle;
		return d;
	};

	return (
		<svg width={width} height={height} radius={outerRadius}>
			<g transform={`translate(${centerX}, ${centerY})`}>
				{React.Children.toArray(
					mapData.map((d, i) => {
						const [x, y] = createArc.centroid(d);

						return (
							<>
								<motion.path
									initial={{
										// pathLength: d.startAngle,
										// d: createArc(d),
										fill: getRGB0Colors[d.index],
									}}
									animate={{
										// pathLength: d.endAngle,
										fill: getRGBColors[d.index],
										// d: createArc(test(d)),
									}}
									// transition={{
									// 	// duration: 1,
									// 	// ease: "easeInOut",
									// 	duration: d.duration,
									// 	delay: d.delay,
									// 	ease: "linear",
									// 	// type: "tween",
									// 	// d: createArc(test(d)),
									// 	// repeat: Infinity,
									// 	// repeatType: "loop",
									// 	// repeatDelay: 2,
									// }}
									// fill={getRGBColors[d.index]}
									// transition={{
									// 	duration: d.duration,
									// 	ease: "linear",
									// 	delay: d.delay,
									// }}
									transition={transition({
										duration: d.duration,
										delay: d.delay,
										ease: "linear",
									})}
									whileHover={{
										d: createArcOut(d),
										transition: {
											duration: 0.5,
											ease: "easeInOut",
										},
									}}
									// d={createArc(d)}
									d={createArc(d)}
									key={d.index}
									// stroke="#fff"
									// stroke="black"
									strokeWidth="2"
								/>
								{/* <text
									textAnchor="middle"
									alignmentBaseline="middle"
									transform={`translate(${x}, ${y})`}
									fill="black"
								>
									{d.data.name}
								</text> */}
							</>
						);
					})
				)}
			</g>
		</svg>
	);
};
