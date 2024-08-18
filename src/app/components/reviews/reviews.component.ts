import { Component } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css',
})
export class ReviewsComponent {
  reviews: any[] = [];
  currentFilter: string = 'pending';

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.fetchReviews();
  }

  fetchReviews() {
    this.firebaseService.getReviews(this.currentFilter).subscribe((data) => {
      this.reviews = data;
    });
  }

  setFilter(filter: string) {
    this.currentFilter = filter;
    this.fetchReviews();
  }

  approveReview(reviewId: string) {
    this.firebaseService
      .updateReviewStatus(reviewId, 'approved')
      .subscribe(() => {
        this.fetchReviews();
      });
  }

  rejectReview(reviewId: string) {
    this.firebaseService
      .updateReviewStatus(reviewId, 'rejected')
      .subscribe(() => {
        this.fetchReviews();
      });
  }

  deleteReview(reviewId: string) {
    this.firebaseService.deleteReview(reviewId).subscribe(() => {
      this.fetchReviews();
    });
  }
}
