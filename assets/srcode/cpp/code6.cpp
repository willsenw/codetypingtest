void halfSquare(int Dim){
  for ( int i = 1; i <= Dim ; i++ ){
    for ( int j = 1; j <= i; j++ ){
      printf("*");
    }
    printf("\n");
  }
}

void halfSquareMirrored( int Dim ){
  for ( int i = 1; i <= Dim; i++ ){
    for ( int j = 1; j <= Dim; j++ ){
      if (j < Dim - i ) printf(" ");
      else printf("*");
    }
    printf("\n");
  }
}
