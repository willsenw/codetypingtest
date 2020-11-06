vector < int > A, T;

void merge( int L, int M, int R ){
  int lptr = L, rptr = M+1;
  for ( int i = L; i <= R; i++ ){
    if ( lptr <= M && rptr <= R ){
      if ( A[lptr] <= A[rptr] ){
        T[i] = A[lptr++];
      } else {
        T[i] = A[rptr++];
      }
    } else if ( lptr <= M ){
      T[i] = A[lptr++];
    } else if ( rptr <= M ){
      T[i] = A[rptr++];
    }
  }
  for ( int i = L; i <= R; i++ ) A[i] = T[i];
}

void mergeSort( int L, int R ){
  if ( L >= R ) return;
  int middle = ( L + R ) / 2;
  mergeSort(L,middle);
  mergeSort(middle+1,R);
  merge(L,middle,R);
}
