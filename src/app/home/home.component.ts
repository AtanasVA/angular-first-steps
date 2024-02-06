import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  filteredLocationList: HousingLocation[] = [];
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);

  constructor() {
    this.housingService
      .getAllHousingLocations()
      .then((housingLocations: HousingLocation[]) => {
        this.housingLocationList = housingLocations;
        this.filteredLocationList = this.housingLocationList;
      });
  }

  filterResults(cityName: string) {
    if (!cityName) {
      return (this.filteredLocationList = this.housingLocationList);
    }

    return (this.filteredLocationList = this.housingLocationList.filter(
      (housing) => housing.city.toLowerCase().includes(cityName.toLowerCase())
    ));
  }
}
