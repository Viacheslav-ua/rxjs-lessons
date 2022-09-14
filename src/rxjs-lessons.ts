import { debounceTime, distinctUntilChanged, fromEvent, map, Observable } from "rxjs";


const search$ = new Observable<Event>(observer => {
  const search = document.getElementById('search')
  const stop = document.getElementById('stop')
  if (!search || !stop) {
    observer.error('Element does not exist on the page')
    return
  }

  const onSearch = (event: Event) => {
    checkSubscription()
    console.log(123)
    observer.next(event)

  }
  const onStop = (event: Event) => {
    checkSubscription()
    observer.complete()
    clear()
  }

  search?.addEventListener('input', onSearch )
  stop?.addEventListener('click', onStop )

  const checkSubscription = () => {
    console.log('Closed', observer.closed);

    if (observer.closed) {
      clear()
    }
  }

  const clear = () => {
  search.removeEventListener('input', onSearch)
  stop.removeEventListener('click', onStop)
}
})



// const search$: Observable<Event> = fromEvent<Event>(document, 'input')

const searchSubscription = search$.pipe(
  map(event => {
    return (event.target as HTMLInputElement).value
  }),
  debounceTime(500),
  map(value => value.length > 3 ? value : ''),
  distinctUntilChanged(),
  )
  .subscribe({
  next: value => console.log(value),
  // error: err => console.log(err),
   complete: () => console.log('Complete'),
})

setTimeout(() => {
  console.log('Unsubscribed')
  searchSubscription.unsubscribe()

}, 10000)


