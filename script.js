class RubiksCube {
  constructor() {
    this.faces = {
      U: Array(9).fill('w'),
      D: Array(9).fill('y'),
      F: Array(9).fill('g'),
      B: Array(9).fill('b'),
      L: Array(9).fill('o'),
      R: Array(9).fill('r')
    };
  }
  rotateFaceClockwise(face) {
    const f = this.faces[face];
    this.faces[face] = [
      f[6], f[3], f[0],
      f[7], f[4], f[1],
      f[8], f[5], f[2]
    ];
  }
  rotate(face) {
    this.rotateFaceClockwise(face);
    let u = this.faces.U.slice();
    let d = this.faces.D.slice();
    let l = this.faces.L.slice();
    let r = this.faces.R.slice();
    let f = this.faces.F.slice();
    let b = this.faces.B.slice();
    switch (face) {
      case 'F':
        [this.faces.U[6], this.faces.U[7], this.faces.U[8]] = [l[8], l[5], l[2]];
        [this.faces.R[0], this.faces.R[3], this.faces.R[6]] = [u[6], u[7], u[8]];
        [this.faces.D[2], this.faces.D[1], this.faces.D[0]] = [r[0], r[3], r[6]];
        [this.faces.L[2], this.faces.L[5], this.faces.L[8]] = [d[2], d[1], d[0]];
        break;
      case 'B':
        [this.faces.U[0], this.faces.U[1], this.faces.U[2]] = [r[8], r[5], r[2]];
        [this.faces.L[0], this.faces.L[3], this.faces.L[6]] = [u[2], u[1], u[0]];
        [this.faces.D[8], this.faces.D[7], this.faces.D[6]] = [l[0], l[3], l[6]];
        [this.faces.R[8], this.faces.R[5], this.faces.R[2]] = [d[6], d[7], d[8]];
        break;
    }
  }
  shuffleCube(moves = 10) {
    const faces = ['F', 'B', 'L', 'R', 'U', 'D'];
    for (let i = 0; i < moves; i++) {
      const randomFace = faces[Math.floor(Math.random() * faces.length)];
      this.rotate(randomFace);
    }
  }
  solveCube() {
    this.faces = new RubiksCube().faces;
  }
  getCubeStateString() {
    return this.faces.U.join('') + this.faces.R.join('') +
           this.faces.F.join('') + this.faces.D.join('') +
           this.faces.L.join('') + this.faces.B.join('');
  }
}
const cube = new RubiksCube();
function getCubeDisplay(stateStr) {
  let out = '';
  out += 'Up (U):    ' + stateStr.slice(0, 9).split('').join(' ') + '\n';
  out += 'Right (R): ' + stateStr.slice(9, 18).split('').join(' ') + '\n';
  out += 'Front (F): ' + stateStr.slice(18, 27).split('').join(' ') + '\n';
  out += 'Down (D):  ' + stateStr.slice(27, 36).split('').join(' ') + '\n';
  out += 'Left (L):  ' + stateStr.slice(36, 45).split('').join(' ') + '\n';
  out += 'Back (B):  ' + stateStr.slice(45, 54).split('').join(' ') + '\n';
  return out;
}
function render() {
  document.getElementById("cube").innerText = getCubeDisplay(cube.getCubeStateString());
}
function shuffle() {
  cube.shuffleCube();
  render();
}
function solve() {
  cube.solveCube();
  render();
}
render();
