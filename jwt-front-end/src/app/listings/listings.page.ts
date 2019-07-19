import { Component, OnInit } from '@angular/core';
import { ListingService } from '../services/listing.service';
import { Listing } from '../models/listing';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.page.html',
  styleUrls: ['./listings.page.scss'],
})
export class ListingsPage implements OnInit {

  listings: Listing[];

  constructor(private listingService: ListingService) { }

  ngOnInit() {
    this.listingService.getListings().subscribe((response: Listing[]) => {
      this.listings = response;
    });;
  }

}