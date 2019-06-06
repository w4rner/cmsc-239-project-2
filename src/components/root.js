import React from 'react';
import {csv} from 'd3-fetch';
import ExampleChart from './example-chart';
import {complex} from 'mathjs'
import {DFT, inverseDFT, first} from '../utils.js'

const longBlock = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`;

/*const paragraph1 = `
  Consider a monotone sound. The number of beats per second, or the frequency, of the sound is 
constant. One can represent this pure tone as a wave function where the height of the maximum or
minimum point of the wave represents the volume of the sound, called the amplitude.
`;*/
const paragraph1 = `
  Sound can be thought of as oscillations in the density of air particles. These oscillations
can be modeled as waves, with a given beats per second, or frequency, and a volume
given by the height, or amplitude of the wave.
`;

const paragraph2 = `
When two waves "packets" meet, their values add linearly.
`;

const paragraph3 = `
The same principle holds for any number of sound waves, but distinguishing between the contributions
of sounds with different frequencies becomes difficult,`

const paragraph4 = `
So, we ask, given an arbitrary sound wave, how can we determine its component frequencies?
We may try to weigh points on our function so that the points of peaks of separate sound
waves are given a greater weight 
`;

const paragraph5 = `
Laurence try commit to master branch.
`;

const exampleTransform = DFT([...new Array(1024)].map((d, i) => i).map(x => Math.cos(x)));
//const exampleInverse = inverseDFT(example)
console.log(exampleTransform);
//console.log(fft2([...new Array(1024)].map((d, i) => i).map(x => Math.cos(x))));
console.log(inverseDFT(exampleTransform));

class RootComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      loading: true
    };
  }

  componentWillMount() {
    csv('data/sample-data.csv')
      .then(data => {
        this.setState({
          data,
          loading: false
        });
      });
  }

  render() {
    const {loading, data} = this.state;
    if (loading) {
      return <h1 class="header">LOADING</h1>;
    }
    return (
      <div className="container">
        <h1 className="header">Analyzing Sound Waves with the Discrete Fourier Transform</h1>
        <div>{paragraph1}</div>
        <div>{paragraph2}</div>
        <div>{paragraph3}</div>
        <div>{paragraph4}</div>
        <div>{paragraph5}</div>
        <img width="100%" height="100%" align-items="center" src="../../img/Discrete_Fourier_Transform.gif" />
        <ExampleChart data={data}/>
      </div>
    );
  }
}
RootComponent.displayName = 'RootComponent';
export default RootComponent;

/*
<div>{`The example data was loaded! There are ${data.length} rows`}</div>
<ExampleChart data={data}/>
<div>{longBlock}</div>
*/