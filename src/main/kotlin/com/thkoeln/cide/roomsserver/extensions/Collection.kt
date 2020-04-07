package com.thkoeln.cide.roomsserver.extensions

fun <T> Collection<T>.contains(predicate: (value: T) -> Boolean) = firstOrNull(predicate) != null

inline fun <T> Iterable<T>.sumBy(selector: (T) -> Long): Long {
    var sum: Long = 0
    for (element in this) {
        sum += selector(element)
    }
    return sum
}