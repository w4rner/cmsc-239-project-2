import {first, second, third} from ./src/utils.js

document.addEventListener('DOMContentLoaded', () => {
  first();
  second();
  third();
}, false);
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
