export const BackgroundCircle = ({
	fill = "black",
	stroke = "black",
	strokeWidth = 5,
	...otherProps
}) => {
	return (
		<circle
			fill={fill}
			stroke={stroke}
			strokeWidth={strokeWidth}
			{...otherProps}
		></circle>
	);
};
