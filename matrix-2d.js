class Matrix2D {
  constructor(a = 1, b = 0, c = 0, d = 1, e = 0, f = 0) {
    /*
			3x3 Matrix, Defaut Values:
			┌ a c e ┐	  ┌ 1 0 0 ┐
			│ b d f │ = │ 0 1 0 │
			└ 0 0 1 ┘	  └ 0 0 1 ┘
		*/
    [this.a, this.b, this.c, this.d, this.e, this.f] = [a, b, c, d, e, f];
  }

  add(a, b, c, d, e, f) {
    /*
			matrix1 is the Dot Product of Original Matrix and Addes matrix

			┌ this.a this.c this.e ┐   ┌ a c e ┐
			│ this.b this.d this.f │ · │ b d d │
			└ 0      0      1      ┘   └ 0 0 1 ┘
		*/

    const a1 = this.a * a + this.c * b + this.e * 0;
    const c1 = this.a * c + this.c * d + this.e * 0;
    const e1 = this.a * e + this.c * f + this.e * 1;
    const b1 = this.b * a + this.d * b + this.f * 0;
    const d1 = this.b * c + this.d * d + this.f * 0;
    const f1 = this.b * e + this.d * f + this.f * 1;

    [this.a, this.b, this.c, this.d, this.e, this.f] = [a1, b1, c1, d1, e1, f1];
  }

  rad(deg) {
    return ((deg % 360) * Math.PI) / 180;
  }

  deg(rad) {
    return ((rad * 180) / Math.PI) % 360;
  }

  translate(x, y) {
    /*
		translate matrix by x and y
		┌ a c e ┐   ┌ 1 0 x ┐
		│ b d f │ · │ 0 1 y │
		└ 0 0 1 ┘   └ 0 0 1 ┘
		*/

    this.add(1, 0, 0, 1, x, y);
  }

  rotate(deg, x = 0, y = 0) {
    /*
		rotate and translate in one step
		θ = deg
		┌ a c e ┐	 ┌ cosθ −sinθ cx ┐
		│ b d f │ ·│ sinθ cosθ	cy │
		└ 0 0 1 ┘	 └ 0		0		 1	 ┘
		*/

    let rad = this.rad(deg);
    let cos = Math.cos(rad).toFixed(9);
    let sin = Math.sin(rad).toFixed(9);
    this.add(cos, sin, -sin, cos, x, y);

    /*
		Reverse the translation of of the scale center
		┌ a c e ┐	 ┌ 1 0 -cx ┐
		│ b d f │ · │ b 1 -cy │
		└ 0 0 1 ┘	 └ 0 0 1	 ┘
		*/

    this.add(1, 0, 0, 1, -x, -y);
  }

  scale(x, y = x, cx = 0, cy = 0) {
    /*
		Scale and translate in one Step
		┌ a c e ┐	 ┌ x 0 cx ┐
		│ b d f │ · │ 0 y cy │
		└ 0 0 1 ┘	 └ 0 0 1	┘
		*/
    this.add(x, 0, 0, y, cx, cy);
    /*
		Reverse the translation of of the scale center
		┌ a c e ┐	 ┌ 1 0 -cx ┐
		│ b d f │ · │ b 1 -cy │
		└ 0 0 1 ┘	 └ 0 0 1	 ┘
		*/
    this.add(1, 0, 0, 1, -cx, -cy);
  }

  x(x, y) {
    return x * this.a + y * this.c + this.e;
  }

  y(x, y) {
    return x * this.b + y * this.d + this.f;
  }
}

module.exports = {
  Matrix2D
};
