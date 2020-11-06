bool fun( vector < int > A, int K ){
  int N = (int)(A.size());
  int rgtMost = 0;
  bool match = false;
  for ( int i = 0; i < N-1; i++ ){
    if ( i + 1 > rgtMost ) rgtMost = i + 1;

    while ( rgtMost + 1 < N ){
      if ( A[rgtMost+1] + A[i] < K ) rgtMost = rgtMost + 1;
      else break;
    }
    if ( A[rgtMost] + A[i] == K ) match = true;

    if ( match == true ) break;
  }
  return match;
}
