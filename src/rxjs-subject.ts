import { BehaviorSubject, ReplaySubject, Subject } from "rxjs";


const subject = new ReplaySubject<number>(2)

subject.next(1)
subject.next(2)

subject.subscribe((value) => console.log('first', value))
subject.next(3)

subject.subscribe((value) => console.log('second', value))
subject.next(4)

subject.subscribe((value) => console.log('third', value))
