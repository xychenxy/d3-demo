export const Eyes = ({
	cx,
	cy,
	r,
	fill = "black",
	stroke = "black",
	strokeWidth = 5,
}) => {
	return (
		<circle
			cx={cx}
			cy={cy}
			r={r}
			fill={fill}
			stroke={stroke}
			strokeWidth={strokeWidth}
		></circle>
	);
};
