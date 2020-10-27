export function deleteElement<T>(element: T, array: T[]) {
  const index = array.indexOf(element, 0);
  if (index > -1) {
    array.splice(index, 1);
  }
}
