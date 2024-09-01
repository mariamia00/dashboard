import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent implements OnInit {
  reviews: any[] = [];
  filteredReviews: any[] = [];
  currentFilter: string = 'all'; // Default filter is now 'all'
  selectedStars: string = ''; // Dropdown for stars
  selectedDate: string = ''; // Dropdown for date

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.fetchReviews();
  }

  fetchReviews() {
    this.firebaseService
      .getReviews(this.currentFilter === 'all' ? null : this.currentFilter)
      .subscribe((data) => {
        this.reviews = data;
        this.filterReviews();
      });
  }

  filterReviews() {
    let filtered = this.reviews;

    // Filter by number of stars
    if (this.selectedStars) {
      const stars = parseInt(this.selectedStars, 10);

      filtered = filtered.filter((review) => {
        const reviewRating =
          typeof review.rating === 'string'
            ? parseInt(review.rating, 10)
            : review.rating;

        return reviewRating === stars;
      });
    }

    // Filter by date
    if (this.selectedDate) {
      const year =
        this.selectedDate === 'before-2023' ? 2023 : new Date().getFullYear();
      const dateCondition =
        this.selectedDate === 'before-2023'
          ? (date: Date) => date.getFullYear() < year
          : (date: Date) => date.getFullYear() >= year;

      filtered = filtered.filter((review) =>
        dateCondition(new Date(review.timestamp))
      );
    }

    this.filteredReviews = filtered;
  }

  generateStars(rating: number): any[] {
    return new Array(Math.floor(rating));
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
    const confirmed = window.confirm(
      'Are you sure you want to delete this review?'
    );

    if (confirmed) {
      this.firebaseService.deleteReview(reviewId).subscribe(() => {
        this.fetchReviews();
      });
    }
  }
}
