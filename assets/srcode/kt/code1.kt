fun main() {
    cases("Hello Jo")
    cases(20)
    cases(25L)
    cases(MyClass())
    cases("hello world")
}

fun cases(obj: Any) {
    when (obj) {
        20 -> println("Twenty")
        "Hello Jo" -> println("Greeting")
        is Long -> println("Long")
        !is String -> println("Not a string")
        else -> println("Unknown object")
    }
}
