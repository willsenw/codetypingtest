int multiply( int a, int b ){
  return a * b;
}

int multiplyPlus( int a, int b ){
  if ( a < b ) return multiplyPlus(b,a);
  if ( b == 0 ) return 0;
  return multiplyPlus(a,b-1) + a;
}

bool funTest( int a, int b ){
    return multiply(a,b) == multiplyPlus(a,b);
}
