class Manager { 
    constructor(){
        this.turn = 0;
        this.extraturns = [0, 0];
        this.ballTypes = [null, null];
        this.points = [0, 0];
        this.blackHoles = [-1, -1];
        this.winner = null;
    }

    setBallType(type){
        if (this.ballTypes[this.turn] == null && !this.ballTypes.includes(type)) {
            this.ballTypes[this.turn] = type;
            let tempTurn = (this.turn == 0)? 1 : 0;
            this.ballTypes[tempTurn] = (type == 1)? 2 : 1;
        }
    }

    addPoint(type){
        if (this.ballTypes[this.turn] == null){
            manager.setBallType(type);
        }

        for (let i = 0; i < this.ballTypes.length; i++) {
            if (this.ballTypes[i] == type){
                this.points[i]++;
            }
        }
    }

    nextTurn(){
        if(this.extraturns[this.turn] > 0){
            this.extraturns[this.turn]--;
        } else {
            this.turn = (this.turn == 0)? 1 : 0;
        }
    }

    addExtraTurn(){
        let otherTurn = (this.turn == 0)? 1 : 0
        this.extraturns[otherTurn]++;
        this.extraturns[this.turn] = 0;
    }

    setBlack(MAXPOINTS, hole){
        let winner = null;
        //tens els punts
        //es el forat correcte
        if(this.points[this.turn] == MAXPOINTS){
            if (this.blackHoles[this.turn] == hole){
                winner = this.turn;
            } else {
                winner = (this.turn == 0)? 1 : 0;
            }
        } else {
            winner = (this.turn == 0)? 1 : 0;
        }

        return winner;
    }
}