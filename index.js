document.addEventListener('DOMContentLoaded', () => {
  first();
  second();
  third();
  fifth();
}, false);

  let step = -4;

  const text1 = `
    Sound can be thought of as oscillations in air density over time, similar to a spring compressing and
  decompressing. Oscillations like this can be described by waves, with a constant number of oscillations
  occurring in one second, or frequency, and constant maximum height, the wave's amplitude. Different
  notes correspond to different frequencies, and loudness correspond to amplitude.
  `;
  const text2 = `Why should we care about separating a sound wave component frequencies? Well knowing which
  frequencies compose a sound wave, we can boost the parts we want and remove the parts we don't. Crackles caused
  by random noise, or problems caused with recording equipment can also be removed! In short, knowing component frequencies
  is essential to editing and producing music recordings!
  `;
  const text3 = `
  When two waves intersect in space and time, their values add linearly as seen below,
  `;
  const text4 = `
  The same principle holds for any number of sound waves, but determining which individual sound waves
  add up to a sound we hear can quickly become difficult:
  `;
  const text5 = `
  So, we ask, given an arbitrary sound wave, how can we determine its component frequencies?
  We may try to weigh points on our function so that the points of peaks of separate sound
  waves are given a greater weight
  `;

const textDraft = `
  Sound can be thought of as oscillations in air density over time, similar to a spring compressing and
decompressing. Such oscillations can be described by waves with a frequency, the number of oscillations
occurring in one second, and an amplitude, one-half the different between the highest and lowest point(s)
in the wave. In music, different notes correspond to different frequencies, and loudness corresponds to
amplitude.

<animation 1>

When two waves intersect in space, their values add linearly as seen below:

<animation 2>

And this linearity holds for any number of sounds. However, if we wanted to take some sound wave and
determine the frequencies that compose this sound wave, it can become difficult to do so by eye alone.
Below we can see what happens when we add together only six waves:

<animation 3>

It's non-obvious that the component frequencies are 1/10, 1/18, 1/22, 1/40, 1/9, and 1/2 and music includes
far more than just six frequencies, not to mention that music is not composed of the same pattern of notes.
Why should we care about separating a sound wave component frequencies? Well knowing which frequencies
compose a sound wave, we can boost the parts we want and remove the parts we don't, such as crackles caused
by random noise. It's essential to music production to accurately find component frequencies!

Fortunately, there exists a mathematical tool for finding these frequencies: the Fourier Transform! The
transform is constructed by using the periodicity of Euler's formula and of wave functions. Consider a
point traveling on a sine wave, mapped to a point on a circle, as shown below. The point travels around the circle in
the same time it takes to complete one period of the wave, i.e. the amount of time it takes for the wave to
repeat.

<animation 4>

Euler's formula exhibits a similar periodicity when mapped over time,

<Euler's equation in terms of time and arbitrary frequency f>

with the rate it travels around the circle given by f. We then have that, over a period of time, the product
of the wave function mapped onto a circle and of Euler's formula is greatest when the two make the same
number of rotations about the circle over a period of time, i.e. when they have the same frequency. It also
happens that when the two are out of sync, their product is relatively small.

Below we can see what happens when we sample a period of time and calculate the Fourier transform of the
complicated sum of waves we had above.

<animation 5>

For our sum of six waves, we have six distinct peaks! The axis of the transform is not directly in terms of frequency, but rather in terms of the period times
the frequency, Tk. One simply needs to divide by our period of 200*pi to determine the frequency.
`;
  const body = d3.select('body');
  /*const paragraph1 = body.append('p').attr('class', 'container');
  const paragraph2 = body.append('p').attr('class', 'container');

  paragraph1.text(text1);
  paragraph2.text(text2);*/


// function for our first visualization
// a sinusoidal wave with modifiable amplitude and frequency
function first() {
  let xs = [];

    for(var i = 0; i < 200 * Math.PI; i += 1) {
        xs.push(i);
    }

    let t = 0;

    let A = 20;
    let f = 1/10;
    let height = 100;

    $("#Aslider1").on("input", function() {
        A = $(this).val();
    });

    $("#Fslider1").on("input", function() {
        f = $(this).val();
    });

    function animate() {
        let points = xs.map(x => {
            let y = A * Math.sin((x + t) * f);
            return[x,y + height];
        });

        let path = "M" + points.map(p => {
            return p[0] + "," + p[1];
        }).join('L')

        document.querySelector("#first1").setAttribute("d", path);

        t = t <= 200 * Math.PI ? t + 1 : 0;
        requestAnimationFrame(animate);

    };
    animate();
}

// function for our second visualization
// two wave fronts intersecting
function second() {
  let xs = []
  for(var i = 0; i < 120 * Math.PI; i+= 1){
      xs.push(i);
  }

  let t = 0;

  let A1 = 20;
  let f1 = 1/10;
  let A2 = 20;
  let f2 = 1/10;
  let height = 100;
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
}

// function for our third visualization
function third() {
  let xs = []

  for(var i = 0; i < 100 * Math.PI; i+= 1){
      xs.push(i);
  }

  let t = 0;
  let height = 100;

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

function fifth(){
    const margin = {top: 40, right: 20, bottom: 100, left: 80};
    const width = 1050 - margin.left - margin.right;
    const height = 800 - margin.top - margin.bottom;

    const SVG_SELECTION = d3.select('#FourierSVG');

    console.log('here');

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

    function fourier(array, N){
        SVG_SELECTION.selectAll(".circ").remove()
        SVG_SELECTION.selectAll(".axis").remove()
        let freq = Math.floor(array.length / N);
        let Xn = [];
        for(var k = 0; k < Math.floor(N / 2); k++){
            let sum1 = 0;
            let sum2 = 0;
            for(var n = 0; n < N; n ++){
                let index = n * freq;
                const mult1 = Math.cos(2 * Math.PI * k * n / N);
                const mult2 = Math.sin(2 * Math.PI * k * n / N)
                sum1 += array[index] * mult1;
                sum2 += array[index] * mult2;
            }
            let sum3 = Math.sqrt(sum1 * sum1 + sum2 * sum2);
            Xn.push(sum3);
        }
        console.log("here2");
        const Y_SCALE = d3.scaleLinear().range([370, 0]).domain([0, Math.max(...Xn)]);
        const X_SCALE = d3.scaleLinear().range([0,600]).domain([0, N/2]);
        SVG_SELECTION.append('g')
            .attr('class', 'axis')
            .call(d3.axisBottom(X_SCALE))
            .attr('transform', 'translate(0, 380)')
            .attr('stroke', 'black')
            .attr('line-width', 1);
        SVG_SELECTION.selectAll('.axis')
          .attr('stroke', 'None');


        console.log("Here3");
        SVG_SELECTION.selectAll('.circ')
            .data(Xn).enter()
            .append('circle')
            .attr('class', 'circ')
            .attr('cx', (d,i) => X_SCALE(i))
            .attr('cy', d => Y_SCALE(d))
            .attr('r', 2)
            .attr('fill', 'blue');
        console.log("Here4");
        return(Xn);
    }

    let data = [];
    let B = [];
    let points = []
    for(var x = 0; x < 200 * Math.PI; x+= 1){
        let y1 = A1 * Math.sin((x) * f1);
        let y2 = A2 * Math.sin((x) * f2);
        let y3 = A3 * Math.sin((x) * f3);
        let y4 = A4 * Math.sin((x) * f4);
        let y5 = A5 * Math.sin((x) * f5);
        let y6 = A6 * Math.sin((x) * f6);
        const l = Math.sin(2 * Math.PI / 100 * x);
        data.push(y1 + y2 + y3 + y4 + y5 + y6);
        points.push([x, y1 + y2 + y3 + y4 + y5 + y6 + 200]);
    }

    let pathPre = "M" + points.map(p => {
                return p[0] + "," + (p[1]);
            }).join('L');
    document.querySelector("#PreFourier").setAttribute("d", pathPre);

    let N = 50;
    $("#FourierSlider").on("input", function() {
            N = $(this).val();
            console.log(N)
        });

    $("#FourierButton").on("click", function(){
      fourier(data,N)
    });

}




// Fourth animation
const margin = {top: 50, right: 20, bottom: 100, left: 80};
const width = 1100 - margin.left - margin.right;
const height = 550 - margin.top - margin.bottom;
console.log("here1")
const svg = d3.select('#fourthSVG')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

const Y_SCALE = d3.scaleLinear().range([350, 50]).domain([-1, 1]);
const X_SCALE = d3.scaleLinear().range([10,600]).domain([0, 2 * Math.PI]);
console.log("here3")
const CIRC_Y = d3.scaleLinear().range([350, 50]).domain([-1, 1]);
const CIRC_X = d3.scaleLinear().range([700,1000]).domain([-1, 1]);

console.log("here5")

let sine = [];
for(var i = 0; i < Math.PI * 2; i+= .01){
  sine.push([i, Math.sin(i)])
}

svg.append('line')
.attr('x1', X_SCALE(0))
.attr('x2', 600)
.attr('y1', Y_SCALE(0))
.attr('y2', Y_SCALE(0))
.attr('stroke', 'black')
.attr('stroke-width', 4);

svg.append('line')
.attr('x1', CIRC_X(-1))
.attr('x2', CIRC_X(1))
.attr('y1', CIRC_Y(0))
.attr('y2', CIRC_Y(0))
.attr('stroke', 'black')
.attr('stroke-width', 4);

svg.append('line')
.attr('x1', CIRC_X(0))
.attr('x2', CIRC_X(0))
.attr('y1', 50)
.attr('y2', 350)
.attr('stroke', 'black')
.attr('stroke-width', 4);

svg.selectAll('.circ')
  .data(sine).enter().append('circle')
  .attr('class', 'circ')
  .attr('cx', d => X_SCALE(d[0]))
  .attr('cy', d=> Y_SCALE(d[1]))
  .attr('fill', 'green')
  .attr('r', 3);


svg.append('circle')
    .attr('cy' , CIRC_Y(0))
    .attr('cx' , CIRC_X(0))
    .attr('r', 150)
    .attr('fill', 'none')
    .attr('stroke', 'green')
    .attr('stroke-width', '5px')

svg.append('circle')
    .attr('cy' , CIRC_Y(0))
    .attr('cx' , CIRC_X(1))
    .attr('class', 'pnt2')
    .attr('r', 8)
    .attr('fill', 'Black')
    .attr('stroke', 'none');

svg.append('circle')
    .attr('cy' ,Y_SCALE(0))
    .attr('cx' , X_SCALE(0))
    .attr('class', 'pnt1')
    .attr('r', 8)
    .attr('fill', 'Black')
    .attr('stroke', 'none');





    $("#FourthSlider").on("input", function() {
        let val = $(this).val();
        svg.selectAll('.pnt1')
        .transition()
        .attr('cx', X_SCALE(val * Math.PI / 50))
        .attr('cy', Y_SCALE(Math.sin(val * Math.PI / 50)));

        svg.selectAll('.pnt2')
        .transition()
        .attr('cx', CIRC_X(Math.cos(val * Math.PI / 50)))
        .attr('cy', CIRC_Y(Math.sin(val * Math.PI / 50)));
    });
