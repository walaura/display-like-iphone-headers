registerPaint(
  "bg",
  class {
    static get inputProperties() {
      return [
        "--bg",
        "--dots",
        "--radius",
        "--stroke",
        "--cursor-x",
        "--cursor-y",
        "border-radius"
      ];
    }
    paint(ctx, geom, props) {
      const [bg, stroke, strokeSize, radius, borderRadius] = [
        props.get("--bg").toString(),
        props.get("--stroke").toString() || "blue",
        props.get("--stroke-size") || 1,
        props.get("--radius") || 20
      ];
      const [x, y] = [
        props.get("--cursor-x") || 0,
        props.get("--cursor-y") || 0
      ];
      ctx.fillStyle = bg;
      ctx.strokeStyle = stroke;
      ctx.strokeSize = 4;
      ctx.rect(
        strokeSize / 2,
        strokeSize / 2,
        geom.width - strokeSize,
        geom.height - strokeSize
      );
      ctx.stroke();
      ctx.fill();
      ctx.beginPath();

      const grd = ctx.createRadialGradient(x, y, 0, x, y, radius);
      grd.addColorStop(0, "#fff");
      grd.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = grd;
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.globalCompositeOperation = "destination-in";
      ctx.fill();
    }
    fill;
  }
);
/*
			ctx.fillStyle = 'black';
			ctx.globalCompositeOperation = 'xor';

*/
