// class Matrix {
//   constructor(rows, columns) {
//     this.rows = rows;
//     this.columns = columns;
//     if (columns > 0)  this.data = new Array(rows).fill().map(() => new Array(columns).fill());
//     else this.data = new Array(rows).fill();
//   }
//
//   fillWith(type) {
//     if (this.columns > 0) {
//       if (type == "random") {
//         for (let i = 0; i < this.data.length; i++) {
//           for (let j = 0; j < this.data[i].length; j++) {
//             this.data[i][j] = Math.random();
//           }
//         }
//       } else {
//         for (let i = 0; i < this.data.length; i++) {
//           for (let j = 0; j < this.data[i].length; j++) {
//             this.data[i][j] = type;
//           }
//         }
//       }
//     } else {
//       if (type == "random") {
//         for (let i = 0; i < this.data.length; i++) {
//           this.data[i] = Math.random();
//         }
//       } else {
//         for (let i = 0; i < this.data.length; i++) {
//           this.data[i] = type;
//         }
//       }
//     }
//
//   }
//
//   mult(vector) {
//     let final = new Array(this.rows).fill(0);
//     for (let i = 0; i < vector.rows; i++) {
//       for (let j = 0; j < this.data.length; j++) {
//         final[j] += (vector.data[i] * this.data[j][i]);
//       }
//     }
//     let finalVec = new Matrix(this.rows, 0);
//     finalVec.fromArray(final);
//     return finalVec;
//   }
//
//   addVec(vector) {
//     let final = new Array(vector.data.length).fill(0);
//     for (let i = 0; i < this.data.length; i++) {
//       final[i] += this.data[i] + vector.data[i];
//     }
//     let finalVec = new Matrix(vector.data.length, 0);
//     finalVec.fromArray(final);
//     return finalVec;
//   }
//
//   fromArray(arr) {
//     if (this.columns > 0) {
//       for (let i = 0; i < this.data.length; i++) {
//         for (let j = 0; j < this.data[i].length; j++) {
//           this.data[i][j] = arr[i][j];
//         }
//       }
//     } else {
//       for (let i = 0; i < this.data.length; i++) {
//         this.data[i] = arr[i];
//       }
//     }
//   }
//
//   hadamard(vector) { // two vectors
//     let final = new Array(vector.data.length).fill(0);
//     for (let i = 0; i < vector.data.length; i++) {
//       final[i] = this.data[i] * vector.data[i];
//     }
//     let finalVec = new Matrix(vector.data.length, 0);
//     finalVec.fromArray(final);
//     return finalVec;
//   }
// }
//
// let vec1 = new Matrix(5, 0);
// let vec2 = new Matrix(5, 0);
//
// vec1.fillWith(2);
// vec2.fillWith(5);
//
// console.log(vec1.hadamard(vec2));
