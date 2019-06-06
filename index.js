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

  first();
}, false);
