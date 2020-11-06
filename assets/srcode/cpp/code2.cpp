int multiply( int a, int b ){
  return a * b;
}

int multiplyByPlus( int a, int b ){
  if ( a < b ) return multiplyByPlus(b,a);
  if ( b == 0 ) return 0;
  return multiplyByPlus(a,b-1) + a;
}

bool multiplyTest( int a, int b ){
    return multiply(a,b) == multiplyByPlus(a,b);
}
