import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { DrinkService } from '../shared/drink.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  drinkdetails = {};

  constructor(
    private route: ActivatedRoute,
    private drinkService: DrinkService
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const idDrink = routeParams.get('idDrink');
    this.getDrinkDetails(idDrink);
  }

  getDrinkDetails(id: string) {
    this.drinkService.getDrinkDetails(id)
      .pipe(first())
      .subscribe(
        data => {
          this.drinkdetails = data.drinks[0];
        },
        error => {
          console.log(" Error: ", error);
        });
  }

}
