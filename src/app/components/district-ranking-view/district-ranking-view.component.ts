// src/app/components/district-ranking-view/district-ranking-view.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DistrictRankingDistrict } from '../../Services/data.service';

@Component({
  selector: 'district-ranking-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './district-ranking-view.component.html',
  styleUrls: ['./district-ranking-view.component.css']
})
export class DistrictRankingViewComponent implements OnInit {
  // Assume input data is already sorted by the backend/mock API (rank 1st, 2nd, etc.)
  @Input() data: DistrictRankingDistrict[] = []; 
  
  // Ranks text helper function
  getRankText(rank: number): string {
    if (rank === 1) return '1st';
    if (rank === 2) return '2nd';
    if (rank === 3) return '3rd';
    return `${rank}th`;
  }
  
  // This is used for navigation arrows to show a subset of ranks
  displayData: DistrictRankingDistrict[] = [];
  currentIndex: number = 0;
  itemsPerPage: number = 8; // Match the mockup's visible card count

  ngOnInit() {
    this.updateDisplayData();
  }

  // Update which cards are visible based on currentIndex
  updateDisplayData() {
    this.displayData = this.data.slice(this.currentIndex, this.currentIndex + this.itemsPerPage);
  }

  // Navigation handlers
  next() {
    if (this.currentIndex + this.itemsPerPage < this.data.length) {
      this.currentIndex += this.itemsPerPage;
      this.updateDisplayData();
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex -= this.itemsPerPage;
      this.updateDisplayData();
    }
  }
}