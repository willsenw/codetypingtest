string decimalToBinary( int dec ){
  string binary = "";
  do {
    if ( dec % 2 == 0 ) binary = binary + "0";
    else binary = binary + "1";
    dec /= 2;
  } while ( dec > 0 );
  reverse(binary.begin(),binary.end());
  return binary;
}

int binaryToDecimal( string bin ){
  int dec = 0;
  for ( int i = 0; i < (int)(bin.size()); i++ ){
    dec = (dec * 2);
    if (bin[i] == '1' ) dec = dec + 1;
  }
  return dec;
}
