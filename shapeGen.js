function heart(){
    // Heart
				var x = 0, y = 0;
				var heartShape = new THREE.Shape(); // From http://blog.burlock.org/html5/130-paths
				heartShape.moveTo( x + 25, y + 25 );
				heartShape.bezierCurveTo( x + 25, y + 25, x + 20, y, x, y );
				heartShape.bezierCurveTo( x - 30, y, x - 30, y + 35, x - 30, y + 35 );
				heartShape.bezierCurveTo( x - 30, y + 55, x - 10, y + 77, x + 25, y + 95 );
				heartShape.bezierCurveTo( x + 60, y + 77, x + 80, y + 55, x + 80, y + 35 );
				heartShape.bezierCurveTo( x + 80, y + 35, x + 80, y, x + 50, y );
				heartShape.bezierCurveTo( x + 35, y, x + 25, y + 25, x + 25, y + 25 );
    return heartShape;
}