import { Injectable } from '@angular/core';
import {
  Database,
  ref,
  child,
  get,
  update,
  remove,
} from '@angular/fire/database';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private db: Database) {}

  getReviews(status: string | null): Observable<any[]> {
    const dbRef = ref(this.db);
    return from(get(child(dbRef, 'reviews'))).pipe(
      map((snapshot) => {
        const reviews = snapshot.val();
        return Object.keys(reviews)
          .filter((key) => !status || reviews[key].status === status)
          .map((key) => ({ id: key, ...reviews[key] }));
      })
    );
  }

  updateReviewStatus(reviewId: string, status: string) {
    const dbRef = ref(this.db, `reviews/${reviewId}`);
    return from(update(dbRef, { status }));
  }

  deleteReview(reviewId: string) {
    const dbRef = ref(this.db, `reviews/${reviewId}`);
    return from(remove(dbRef));
  }

  getSubscribers() {}
}
