class Hole{
    constructor(id, position, opposite){
        this.id = id;
        this.position = createVector(position[0], position[1]);
        this.opposite = opposite;
        this.radius = 15;
    }

    render() {
        stroke(0);
        strokeWeight(0);
        fill("#000");
        ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
    }

    
}