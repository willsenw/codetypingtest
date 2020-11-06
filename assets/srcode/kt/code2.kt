fun f( n : Int , fact : (Int) -> Int ) : Int {
  if ( n == 0 ) return 1
  return fact(n-1) * n
}

fun perm( n : Int ) : Int {
    if ( n == 0 ) return 1
    return n * perm( n - 1 )
}

fun cmp( n : Int ){
    val permResult = f(n , ::perm)
    val factResult = f(n) {
        n ->
        if ( n == 0 ) 1
        else perm(n-1) * n
    }
    println("permResult $permResult, factResult $factResult")
}
