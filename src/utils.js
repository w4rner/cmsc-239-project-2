import {pi, complex, add, subtract, multiply, exp} from 'mathjs';

console.log('utils');
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


export function first(){
    let xs = []

    for(var i = 0; i < 200 * Math.PI; i+= .01){
        xs.push(i);
    }

    let t = 0;

    let A = 20;
    let f = 1/10;
    let height = 200;

    $("#Aslider1").on("input", function() {
        A = $(this).val();
    });

    $("#Fslider1").on("input", function() {
        f = $(this).val();
    });

    function animate(){
        let points = xs.map(x => {
            let y = A * Math.sin((x + t) * f);
            return[x,y + height];
        });

        let path = "M" + points.map(p => {
            return p[0] + "," + p[1];
        }).join('L')

        document.querySelector("#first1").setAttribute("d", path);

        t += 1;
        requestAnimationFrame(animate);

    };
    animate();
}

export function second(){
    let xs = []
    for(var i = 0; i < 120 * Math.PI; i+= .01){
        xs.push(i);
    }

    let t = 0;

    let A1 = 20;
    let f1 = 1/10;
    let A2 = 20;
    let f2 = 1/10;
    let height = 200;
    let low = -40 * Math.PI;
    let high = 0;
    let low2 = 120 * Math.PI;
    let high2 = 160 * Math.PI;

    $("#Aslider12").on("input", function() {
        A1 = $(this).val();
    });

    $("#Fslider12").on("input", function() {
        f1 = 1 / $(this).val();
    });

    $("#Aslider22").on("input", function() {
        A2 = $(this).val();
    });

    $("#Fslider22").on("input", function() {
        f2 = 1 / $(this).val();
    });

    function animate(){
        let points = xs.map(x => {
            let y = 0;
            let y2 = 0;
            if(x >= low && x <= high){
            y = Math.abs(A1 * Math.sin((high - x) * f1));}
          else{y = 0;}
          if(x >= low2 && x <= high2){
            y2 = A2*Math.sin((high2 - x) * f2);}
          else{y2 = 0}
            return[x, y + y2 + height];
        });

        let path = "M" + points.map(p => {
            return p[0] + "," + p[1];
        }).join('L')

        document.querySelector("#first2").setAttribute("d", path);

        low += 1;
        high += 1;
        low2 -= 1;
        high2 -=1;

        if(high2 < 0){
          low2 = 120 * Math.PI;
          high2 = 160 * Math.PI;
        }
        if(low > 120*Math.PI){
          low = -40* Math.PI;
          high = 0;
        }
        requestAnimationFrame(animate);

    };
    animate();

export function third() {
    let xs = []

    for(var i = 0; i < 100 * Math.PI; i+= .01){
        xs.push(i);
    }

    let t = 0;
    let height = 200;

    let A1 = 20;
    let f1 = 1/10;

    let A2 = 30;
    let f2 = 1/18;

    let A3 = -20;
    let f3 = 1/22;

    let A4 = 80;
    let f4 = 1/40;

    let A5 = -12;
    let f5 = 1/9;

    let A6 = -4;
    let f6 = 1/2;

    function animate(){
        let points = xs.map(x => {
            let y1 = A1 * Math.sin((x + t) * f1);
            let y2 = A2 * Math.sin((x + t) * f2);
            let y3 = A3 * Math.sin((x + t) * f3);
            let y4 = A4 * Math.sin((x + t) * f4);
            let y5 = A5 * Math.sin((x + t) * f5);
            let y6 = A6 * Math.sin((x + t) * f6);
            return[x,y1, y2, y3, y4, y5, y6];
        });

        let path1 = "M" + points.map(p => {
            return p[0] + "," + (p[1] + height);
        }).join('L');

        let path2 = "M" + points.map(p => {
            return p[0] + "," + (p[2] + height);
        }).join('L')

        let path3 = "M" + points.map(p => {
            return p[0] + "," + (p[3] + height);
        }).join('L')

        let path4 = "M" + points.map(p => {
            return p[0] + "," + (p[4] + height);
        }).join('L')

        let path5 = "M" + points.map(p => {
            return p[0] + "," + (p[5] + height);
        }).join('L')

        let path6 = "M" + points.map(p => {
            return p[0] + "," + (p[6] + height);
        }).join('L')

        let sum = height;
        let j1 = document.getElementById("Check1").checked;
        let j2 = document.getElementById("Check2").checked;
        let j3 = document.getElementById("Check3").checked;
        let j4 = document.getElementById("Check4").checked;
        let j5 = document.getElementById("Check5").checked;
        let j6 = document.getElementById("Check6").checked;
        let path7 = "M" + points.map(p => {
            let x1 = 0;
            let x2 = 0;
            let x3 = 0;
            let x4 = 0;
            let x5 = 0;
            let x6 = 0;
            if(j1 == true){
              x1 = p[1];
            }
            if(j2 == true){
                x2 = p[2];
              }
            if(j3 == true){
                x3 = p[3];
              }
            if(j4 == true){
                x4 = p[4];
              }
            if(j5 == true){
                x5 = p[5];
              }
            if(j6 == true){
                x6 = p[6];
              }
            return p[0] + "," + (height + x1 + x2 + x3 + x4 + x5 + x6);
        }).join('L')

        document.querySelector("#final3").setAttribute("d", path7);
        document.querySelector("#first3").setAttribute("d", path1);
        document.querySelector("#second3").setAttribute("d", path2);
        document.querySelector("#third3").setAttribute("d", path3);
        document.querySelector("#fourth3").setAttribute("d", path4);
        document.querySelector("#fifth3").setAttribute("d", path5);
        document.querySelector("#sixth3").setAttribute("d", path6);

        t += 1;
        requestAnimationFrame(animate);

    };
    animate();
  }

function fourier(array, N){
    let freq = Math.floor(array.length / N);
    let Xn = [];
    for(var k = 0; k < N; k++){
        let sum = 0;
        for(var n = 0; n < array.length; n ++){
            let index = n * freq;
            const mult = Math.cos(2 * Math.PI * k * n / N);
            sum += array[index] * mult;
        }
        Xn.push(sum);
    }
    return(Xn);
}