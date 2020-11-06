int fill( int )

double fill( double glass, double cap ){
  return (cap - glass) / 8.0;
}

double cookingWater( double cap ){
  double glass = 0;
  double time = 0;
  while ( glass < cap - 10.0 ){
    double accel = fill(glass, cap);
    time += 8.0;
    glass = glass + 30.0 * accel;
  }
  if ( glass > cap ) time = time + 10.0;
  return time;
}
