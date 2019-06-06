document.addEventListener('DOMContentLoaded', () => {
  function first() {
      console.log('first running');
      let xs = []

      for(var i = 0; i < 200 * Math.PI; i+= .01){
          xs.push(i);
      }

      let t = 0;

      let A = 20;
      let f = 1/10;
      let height = 200;

      $("#slider").on("input", function() {
          A = $(this).val();
      });

      function animate(){
          let points = xs.map(x => {
              let y = A * Math.sin((x + t) * f);
              return[x,y + height];
          });

          let path = "M" + points.map(p => {
              return p[0] + "," + p[1];
          }).join('L')

          document.querySelector("#first").setAttribute("d", path);

          t += 1;
          requestAnimationFrame(animate);

      };
      animate();
  }

  const text1 = `
    Sound can be thought of as oscillations in the density of air particles. These oscillations
  can be modeled as waves, with a given beats per second, or frequency, and a volume
  given by the height, or amplitude of the wave.
  `;

  const text2 = `
  When two waves "packets" meet, their values add linearly.
  `;

  const text3 = `
  The same principle holds for any number of sound waves, but distinguishing between the contributions
  of sounds with different frequencies becomes difficult,`

  const text4 = `
  So, we ask, given an arbitrary sound wave, how can we determine its component frequencies?
  We may try to weigh points on our function so that the points of peaks of separate sound
  waves are given a greater weight
  `;

  const text5 = `
  Laurence try commit to master branch.
  `;
  const body = d3.select('body');
  const paragraph1 = body.append('div').attr('class', 'container')

  paragraph1.append('text')
  .text(text1);

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

  first();
}, false);
