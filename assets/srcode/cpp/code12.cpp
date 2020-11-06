string funReduc( int kh, int jb , int a, int b, int c ){
  while ( kh > 0 && jb > 0 ){
    if ( kh < jb ){
      jb = jb - c;
      kh = kh - jb;
    } else {
      jb = jb - a;
      kh = kh - b;
    }
  }
  if ( kh <= 0 ){
    if ( jb <= 0 ) return "DRAW";
    else return "Joe Biden";
  } else {
    return "Kamala Harris";
  }
}
