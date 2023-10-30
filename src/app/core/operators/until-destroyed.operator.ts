import { DestroyRef, inject } from "@angular/core";
import { Subject, takeUntil } from "rxjs";

export function untilDestroyedOperator() {
  const subject = new Subject();

  inject(DestroyRef).onDestroy(() => {
    subject.next(true);
    subject.complete();
  });

  return <T>() => takeUntil<T>(subject.asObservable());
}
