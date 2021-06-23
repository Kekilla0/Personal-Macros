class Point {
  constructor(...args) {
    if (args[0] instanceof Array) this._buildFromArray(args[0]);
    else if (args[0] instanceof Object) this._buildFromObject(args[0]);
    else if (typeof args[0] == "number") this._buildFromArray(args);
    else return new Error("Invalid Arguments");
  }

  _buildFromObject({ x, y }) {
    this.x = x;
    this.y = y;
  }

  _buildFromArray([x, y]) {
    this.x = x;
    this.y = y;
  }

  get Object() {
    return { x: this.x, y: this.y };
  }

  get Array() {
    return [this.x, this.y];
  }

  draw({ thickness = 5, color = "0xffffff" } = {}){
    const graphics = new PIXI.Graphics();
    graphics.beginFill(color);
    graphics.drawCircle(this.x, this.y, thickness);
    graphics.endFill();
    canvas.foreground.addChild(graphics);
  }
}

class Segment {
  points = [];

  constructor(...args) {
    if (args[0] instanceof Point) this._buildFromPoint(args);
    else if (args[0] instanceof Object) this._buildFromObject(args);
    else if (typeof args[0] == "number") this._buildFromNumber(args);
    else return new Error("Invalid Arguments");
    if(this.points.length !== 2) return new Error("Invalid Arguments");
  }

  _buildFromPoint(args) {
    for(let arg of args)
      if(arg instanceof Point)
        this.points.push(arg);
      else
        return new Error("Invalid Arguments");
    return this;
  }

  _buildFromObject(args) {
    for(let arg of args)
      if(arg instanceof Object)
        this.points.push(new Point(arg));
      else 
        return new Error("Invalid Arguments");
    return this;
  }

  _buildFromNumber(args) {
    if (args.length !== 4) return new Error("Invalid Arguments");
    if (args.reduce((a,b) => a || typeof b !== "number", false)) return new Error("Invalid Arguments");
    this.points = [new Point(args[0], args[1]), new Point(args[2], args[3])];
    return this;
  }

  get Length() {
    let [p1, p2] = this.points;
    return Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
  }

  get Ray() {
    return new Ray(...this.points.map(p => p.Object));
  }

  draw({ thickness = 1, color = "0xfffffff" } = {}) {
    const [p1, p2] = this.points;
    const line = new PIXI.Graphics();

    line.position.set(p1.x, p1.y);
    line.lineStyle(thickness, color).moveTo(0, 0).lineTo(p2.x - p1.x, p2.y - p1.y);
    canvas.foreground.addChild(line);
  }

  static checkIntersection(a, b, draw = false) {
    const [p1, p2] = a.points, [p3, p4] = b.points;
    let det, gam, lam, result;
    det = (p2.x - p1.x) * (p4.y - p3.y) - (p4.x - p3.x) * (p2.y - p1.y);
    if (det !== 0) {
      lam = ((p4.y - p3.y) * (p4.x - p1.x) + (p3.x - p4.x) * (p4.y - p1.y)) / det;
      gam = ((p1.y - p2.y) * (p4.x - p1.x) + (p2.x - p1.x) * (p4.y - p1.y)) / det;
      result = (0 < lam && lam < 1) && (0 < gamma && gamma < 1);
    } else {
      result = false;
    }

    if (result && draw) { a.draw(); b.draw(); }

    return result;
  }
}

class Shape {
  segments = [];

  constructor({ points = [], segments = []} = {}) {
    this.segments = segments instanceof Array ? segments : [];

    if(points instanceof Array){
      points.forEach((element, index, array) => {
        let args = index + 1 !== array.length ? [element, array[index + 1]] : [element, array[0]];
        this.addSegment(new Segment(...args));
      });
    }   
  }

  addSegment(s){
    if(s instanceof Segment) 
      this.segments.push(s);
  }

  draw(){
    for(let s of this.segments)
      s.draw();
  }

  get Area(){

  }

  checkIntersection(segment){

  } 

  static buildRectangle({ x, y, w, h} = {}, p = 5){
    let points = [
      new Point(x + p, y + p),
      new Point(x + w - p, y + p),
      new Point(x + w - p, y + h - p),
      new Point(x + p, y + h - p)
    ];

    return new Shape({points});
  }

  static buildX({ x, y, w, h} = {}, p = 5){
    let segments = [
      new Segment(x + p , y + p, x + w - p, y + h - p),
      new Segment(x + w - p, y + p, x + p, y + h - p),
    ];

    return new Shape({segments});
  }
}

class Cover extends Shape{

}