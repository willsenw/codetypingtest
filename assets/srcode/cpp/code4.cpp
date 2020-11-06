int fibo( int n ){
  if ( n <= 1 ) return 1;
  return fibo(n-1) + fibo(n-2);
}

int fibo_loop( int n ){
  int a = 0, b = 1;
  for ( int i = 1; i <= n; i++ ){
    int c = a + b;
    a = b;
    b = c;
  }
  return b;
}
