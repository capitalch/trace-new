import { filter, debounceTime } from 'rxjs/operators'
import { Subject, BehaviorSubject } from 'rxjs'

const subject = new Subject()
const behSubject = new BehaviorSubject<any>(0)

function emit(id: string, options: any) {
    subject.next({ id: id, data: options })
}

function filterOn(id: string) {
    return subject.pipe(filter((d: any) => d.id === id))
}

function hotEmit(id: string, options: any) {
    behSubject.next({ id: id, data: options })
}

function hotFilterOn(id: string) {
    return behSubject.pipe(filter((d: any) => d.id === id))
}

function debounceEmit(id: string, options: any) {
    subject.next({ id: id, data: options })
}

function debounceFilterOn(id: string, debouncePeriod: number = 1000) {
    return subject
        .pipe(filter((d: any) => d.id === id))
        .pipe(debounceTime(debouncePeriod))
}

enum IbukiMessagesEnum {
    messSelectableGrid = 'MESS-SELECTABLE-GRID',
}

export { IbukiMessagesEnum, emit, filterOn, hotEmit, hotFilterOn, debounceEmit, debounceFilterOn }