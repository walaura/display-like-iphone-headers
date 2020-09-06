registerPaint(
  "bg",
  class {
    static get inputProperties() {
      return ["--bg", "--dots", "--radius"];
    }
    paint(ctx, geom, props) {
      const [bg, dots, radius] = [
        props.get("--bg").toString(),
        props.get("--dots").toString(),
        props.get("--radius") || 20
      ];
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, geom.width, geom.height);

      ctx.fillStyle = dots;
      for (let row = -1; row < 6; row++) {
        for (let column = -1; column < 6; column++) {
          ctx.arc(
            (geom.width / 5) * (row + (column % 2) * 0.5),
            (geom.height / 5) * column,
            geom.width / radius,
            0,
            2 * Math.PI
          );
          ctx.closePath();
        }
      }
      ctx.fill();
    }
    fill;
  }
);
/*
			ctx.fillStyle = 'black';
			ctx.globalCompositeOperation = 'xor';

*/
