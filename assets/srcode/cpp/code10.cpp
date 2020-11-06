int cautious( int long, int short ){
  if ( long < short ) return false;
  if ( short < long ){
    if ( long - short < short ) return long / 2;
    else return short + short;
  }
  return 0;
}

int play( int A, int B ){
  while ( A > 0 && B > 0 ){
    if ( cautious(A,B) == 0 ){
      A--;
      int C = A, A = B, B = C;
    } else {
      B--;
    }
  }
  if ( A == 0 && B == 0 ){
    return 0;
  } else {
    return (A > 0 && B == 0) ? 1 : -1;
  }
}
