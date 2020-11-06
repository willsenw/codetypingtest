int multiply( int a, int b ){
  return a * b;
}

int mPlus( int a, int b ){
  if ( a < b ) return mPlus(b,a);
  if ( b == 0 ) return 0;
  return mPlus(a,b-1) + a;
}

bool funTest( int a, int b ){
    return multiply(a,b) == mPlus(a,b);
}
