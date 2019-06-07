document.addEventListener('DOMContentLoaded', () => {
//  window.requestAnimationFrame(draw);
  first();
  second();
  third();
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

When two waves intersect in space, their values add linearly as seen below:

And this linearity holds for any number of sounds. However, if we wanted to take some sound wave and
determine the frequencies that compose this sound wave, it can become difficult to do so by eye alone.
Below we can see what happens when we add together only six waves:

It's non-obvious that the component frequencies are 1/9, 1/10, ... and music includes far more than
just six frequencies, not to mention that music is not composed of the same pattern of notes.
`;

  const body = d3.select('body');
  const paragraph1 = body.append('p').attr('class', 'container');
  const paragraph2 = body.append('p').attr('class', 'container');

  paragraph1.text(text1);
  paragraph2.text(text2);

  /*
  const vis1 = body.append('svg')
    .append('path')
    .attr('d', '')
    .attr('id', 'first');
  body.append('input')
    .attr('type', "range")
    .attr('min', "0")
    .attr('max', "1000")
    .attr('value', "0")
    .attr('step', "1")
    .attr('id', "slider")
    */

// function for our first visualization
// a sinusoidal wave with modifiable amplitude and frequency
function drawSin(ctx, amplitude, frequency, xOffset, yOffset) {
  let width = ctx.canvas.width;
  let height = ctx.canvas.height;
  let scale = 20;

  ctx.beginPath();
  let x = 0;
  let y = 0;
  ctx.moveTo(x, y);
  while (x < width) {
    y = height / 2 + amplitude * Math.sin((x + xOffset) * frequency);
    ctx.lineTo(x, y);
    x++;
  }
  ctx.stroke();
  ctx.save();

  ctx.restore();
}

function draw() {
  let canvas = document.getElementById("animation1");
  let context = canvas.getContext("2d");

  context.clearRect(0, 0, 300, 500);
//  showAxes(context);
  context.save();

  let A = 20;
  let f = 1/10;
  let height = 200;

  $("#Aslider1").on("input", function() {
    A = $(this).val();
  });
  $("#Fslider1").on("input", function() {
    f = $(this).val();
  });

  drawSin(context, A, f, step, height);
  context.restore();

  step += 4;
  window.requestAnimationFrame(draw);
}

function first() {
  let xs = [];

    for(var i = 0; i < 200 * Math.PI; i += 1) {
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
}

// function for our third visualization
function third() {
  let xs = []

  for(var i = 0; i < 100 * Math.PI; i+= 1){
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
