import Piece from "./piece.js";

class Queen extends Piece {

  _img;

  constructor(position, color, player=null) {

    super(position, color, player);
    this._img = (this._color == "white") ? "&#9813;" : "&#9819;";

    $("#" + this._position).html(this._img);

  };

  _moveOptions(gamePieces, calledForCheck=false, forKingCheckingCoordinates=false) {

    this._validMoves = [];

    let positions, plane;
    let tempArray;
    let coordinates, checkCoordinates;
    let coordinate = 1;
    let changingPos = ["x", "y", "x", "y"];
    let changingPlane = [{x: 1, y: 1}, {x: -1, y: 1}, {x: -1, y: -1}, {x: 1, y: -1}];
    
    coordinates = checkCoordinates = [];

    for (var i = 0; i < changingPos.length; i++) {

      let posInPlane = changingPos[i];
      // possible move position set
      positions = {x: 0, y: 0};
      // temporary possible moves array
      tempArray = [];
      // positive or negative quadrant
      plane = (coordinate <= 2) ? 1 : -1;

      for (var point = 1; point <= 7; point++) {

        // this multiplies one coordinate with the increasing or decreasing var and stores the straight coordinates
        positions[posInPlane] = point * plane;
        
        tempArray = tempArray.concat([positions]);

        positions = {x: 0, y: 0};

      };
      
      coordinate++;

      coordinates = tempArray.map(this._addingCoordinates).filter(this._outOfBoundsCheck);
      this._validMoves = this._validMoves.concat(this._filterMultipleMoveOptions(gamePieces, coordinates, forKingCheckingCoordinates));
  
      if (calledForCheck) checkCoordinates = checkCoordinates.concat([coordinates]);

    };

    for (var i = 0; i < changingPlane.length; i++) {

      tempArray = [];
      plane = changingPlane[i];

      for (var point = 1; point <= 7; point++) {

        // this multiplies both coordinates with the increasing and decreasing var and stores the diagonal coordinates
        positions = {
          x: plane.x * point, 
          y: plane.y * point
        };

        tempArray = tempArray.concat([positions]);

      };

      coordinates = tempArray.map(this._addingCoordinates).filter(this._outOfBoundsCheck);
      this._validMoves = this._validMoves.concat(this._filterMultipleMoveOptions(gamePieces, coordinates, forKingCheckingCoordinates));
  
      if (calledForCheck) checkCoordinates = checkCoordinates.concat([coordinates]);

    };
    
    if (calledForCheck) return (checkCoordinates);

  };

};

export {Queen as default};