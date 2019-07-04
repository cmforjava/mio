let isPiontInRing = (point, path)=>{
  let i, j, c = 0
  for (i = 0, j = path.length-1; i < path.length; j = i++) {
	  if ( ((path[i][1]>point[1]) != (path[j][1]>point[1])) &&
		  (point[0] < (path[j][0]-path[i][0]) * (point[1]-path[i][1]) / (path[j][1]-path[i][1]) + path[i][0]) )
		  c = !c;
  }
  return c;
}
export default isPiontInRing