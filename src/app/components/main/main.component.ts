import { Component } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  reviewCount: number = 0;
  contactCount: number = 0;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.getReviewCount();
    this.getContactCount();
  }

  getReviewCount() {
    this.firebaseService.countReviews().subscribe((count) => {
      this.reviewCount = count;
    });
  }

  getContactCount() {
    this.firebaseService.countContacts().subscribe((count) => {
      this.contactCount = count;
    });
  }
}
