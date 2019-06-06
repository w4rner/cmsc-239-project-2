// you can put util functions here if you want
export function DFT(sampling) {
	const N = sampling.length; // Number of sampling points
	const indices = [...new Array(N)].map((d, i) => i);

	console.log(N);
	console.log('Hello!');
	console.log(indices);
	const transform = indices.map(n => {
		let cosHolder = sampling.reduce((acc, d, indx) => {
			return acc + d*Math.cos(2*Math.PI*indx*n/N);
		});
		let sinHolder = sampling.reduce((acc, d, indx) => {
			return acc + d*Math.sin(2*Math.PI*indx*n/N);
		});
		return {'re': cosHolder, 'im': sinHolder};
	});

	return transform;
}

export function inverseDFT(frequencySampling) {
	// the inverse is given by y_n = (1/N)*sum_{k = 0}^{N-1}x_k*e^{+2*pi*n*k/N}
	const N = sampling.length;
	const indices = [...new Array(N)].map((d, i) => i);
	const inverseTransform = indices.map(n => {
		let reHolder = sampling.reduce((acc, d, indx) => {
			return acc + (d['re']*cos(2*Math.PI*indx*n/N) - d['im']*sin(2*Math.PI*indx*n/N));
		});
		let imHolder = sampling.reduce((acc, d, indx) => {
			return acc + (d['re']*sin(2*Math.PI*indx*n/N) + d['im']*cos(2*Math.PI*indx*n/N));
		});
		return {'re': reHolder, 'im', imHolder};
	});

	return inverseTransform;

//	const samplingNew = sampling.map(x => x / N);
//	let inverseTransform = DFT(samplingNew);
//	inverseTransform = inverseTransform.map(d => {'re': d['cos'], 'im': -1*d['sin']});
}

function buildWave(A, k) {
	return (x => A*Math.sin(k*x));
}

export function polarPlot(f) {
	// Calculate cartesian points from polar coordinates given
	// radius = f(theta)
	thetaPoints = [...new Array(100)];
	xPoints = thetaPoints.map(t => f(t)*Math.cos(2*Math.PI*t/100));
	yPoints = thetaPoints.map(t => f(t)*Math.sin(2*Math.PI*t/100));

	return xPoints.map((x, indx) => (x, yPoints[indx]));
}