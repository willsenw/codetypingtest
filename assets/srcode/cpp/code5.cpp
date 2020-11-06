void floodFill( int x, int y ){
  if ( visit[x][y] == true ) return;
  visit[x][y] = true;
  floodFill(x+1,y);
  floodFill(x-1,y);
  floodFill(x,y+1);
  floodFill(x,y-1);
}

int countIsland(int width, int height){
  int island = 0;
  for ( int i = 0; i < width; i++ ){
    for ( int j = 0; j < height; j++ ){
      if ( visit[i][j] == false ){
        island = island + 1;
        floodFill(i,j);
      }
    }
  }
  return island;
}
