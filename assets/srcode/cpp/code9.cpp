bool alwaysFun( int a, int b, int c ){
  bool cmp1 = a + 2 * b < c;
  if ( a < c ) a += b;
  bool cmp2 = a + b < c;
  return !(cmp1 ^ cmp2);
}
