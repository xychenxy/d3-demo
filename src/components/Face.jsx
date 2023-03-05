import { BackgroundCircle } from "./BackgroundCircle";
import { Eyes } from "./Eyes";
import { FaceContainer } from "./FaceContainer";
import { Mouth } from "./Mouth";

export const Face = ({ width, height }) => {
	const strokeWidth = 6;

	const shortLength = width - height > 0 ? width : height;

	const centerX = width / 2;
	const centerY = height / 2;
	const radius = shortLength / 2 - strokeWidth;
	const eyeOffsetX = radius * 0.33;
	const eyeOffsetY = radius * 0.33;
	const eyeR = shortLength * 0.08;
	const mouthWidth = strokeWidth * 2;
	const mouthRadius = radius / 2;

	return (
		<FaceContainer
			width={width}
			height={height}
			centerX={centerX}
			centerY={centerY}
		>
			<BackgroundCircle
				r={radius}
				fill="grey"
				strokeWidth={strokeWidth}
			/>

			<Eyes cx={eyeOffsetX} cy={-eyeOffsetY} r={eyeR} />
			<Eyes cx={-eyeOffsetX} cy={-eyeOffsetY} r={eyeR} />

			<Mouth mouthWidth={mouthWidth} mouthRadius={mouthRadius} />
		</FaceContainer>
	);
};
