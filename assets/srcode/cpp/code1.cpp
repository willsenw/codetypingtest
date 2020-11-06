void swap( int &a, int &b ){
  int c = a;
  a = b;
  b = c;
}

bool isEqual( string pat, string text ){
  if ( (int)(pat.size()) != (int)(text.size()) ) return false;

  int len = (int)(pat.size());
  bool valid = true;
  for ( int i = 0; i < len && valid ; i++ ){
    if ( pat[i] != text[i] ) valid = false;
  }
  return valid;
}

bool check( string sent ){
  string rev = sent;
  int l = 0, r = (int)(rev.size()-1);
  while ( l < r ){
    swap(rev[l],rev[r]);
    l = l + 1, r = r - 1;
  }
  return isEqual(rev,sent);
}
