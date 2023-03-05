import vl from "vega-lite-api";
export const viz = vl
	.markPoint()
	.encode(
		vl.x().fieldQ("acceleration").scale({ zero: false }),
		vl.y().fieldQ("horsepower").scale({ zero: false }),
		vl.tooltip().fieldN("name")
	);
