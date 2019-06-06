import {pi, complex, add, subtract, multiply, exp} from 'mathjs';

// you can put util functions here if you want
export function DFT(sampling) {
  const N = sampling.length; // Number of sampling points
  const indices = [...new Array(N)].map((d, i) => i);

  const transform = indices.map(n => {
    let reHolder = sampling.reduce((acc, d, indx) => {
      return acc + d*Math.cos(2*Math.PI*indx*n/N);
    });
    let imHolder = sampling.reduce((acc, d, indx) => {
      return acc - d*Math.sin(2*Math.PI*indx*n/N);
    });
    return {'re': reHolder, 'im': imHolder};
  });

  return transform;
}

// credit to mrquincle for this js implementation of the FFT
/*
export function fft2(X) {
  // X is our set of sampling points from the function we are taking the transform of
  var N = X.length;
  if (N <= 1) {
    return X;
  }
  var M = N/2;
  var even = [];
  var odd = [];
  even.length = M;
  odd.length = M;
  for (var i = 0; i < M; ++i) {
    even[i] = X[i*2];
    odd[i] = X[i*2+1];
  }
  even = fft2(even);
  odd = fft2(odd);
  var a = -2*pi;
  for (var k = 0; k < M; ++k) {
    // t = exp(-2PI*i*k/N) * X_{k+N/2} (in two steps)
    var t = exp(complex(0, a*k/N));
    t = multiply(t, odd[k]);
    X[k] = odd[k] = add(even[k], t);
    X[k+M] = even[k] = subtract(even[k], t);
  }
  return X;
}
*/


export function inverseDFT(frequencySampling) {
  // the inverse is given by y_n = (1/N)*sum_{k = 0}^{N-1}x_k*e^{+2*pi*n*k/N}
  const N = frequencySampling.length;
  const indices = [...new Array(N)].map((d, i) => i);
  const inverseTransform = indices.map(n => {
    let reHolder = frequencySampling.reduce((acc, d, indx) => {
      return acc + (Number(d['re'])*Math.cos(2*Math.PI*indx*n/N) - Number(d['im'])*Math.sin(2*Math.PI*indx*n/N));
    });
    let imHolder = frequencySampling.reduce((acc, d, indx) => {
      return acc + (Number(d['re'])*Math.sin(2*Math.PI*indx*n/N) + Number(d['im'])*Math.cos(2*Math.PI*indx*n/N));
    });
    return {'re': reHolder, 'im': imHolder};
  });

  return inverseTransform;
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