const width = 500;
const height = 500;
const circleRadius = 30;

const initialMousePosition = {
	x: width / 2,
	y: height / 2,
};

export default MouseMove = () => {
	const [mousePosition, setMousePosition] = useState(initialMousePosition);

	/**
	 * https://www.w3schools.com/react/react_usecallback.asp
	 * https://dmitripavlutin.com/react-usecallback/
	 */
	const handleMouseMove = useCallback(
		(event) => {
			const { clientX, clientY } = event;
			setMousePosition({ x: clientX, y: clientY });
		},
		[setMousePosition]
	);
	return (
		<div>
			<svg height={height} width={width} onMouseMove={handleMouseMove}>
				<circle
					cx={mousePosition.x}
					cy={mousePosition.y}
					r={circleRadius}
				></circle>
			</svg>
		</div>
	);
};
