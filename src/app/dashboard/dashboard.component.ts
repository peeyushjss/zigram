import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { first } from 'rxjs/operators';

import { DrinkService } from '../shared/drink.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  resultsLength = 0;
  mySelect = "Sort By";
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['idDrink', 'strDrink', 'strCategory', 'strGlass', 'strAlcoholic', 'strIngredient1', 'strIngredient2', 'dateModified', 'action'];

  dropDownData = [
    {
      key: "Sort By",
      value: "Sort By"
    },
    {
      key: "strDrink",
      value: "Name"
    }, {
      key: "strCategory",
      value: "Category"
    }];


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private drinkService: DrinkService
  ) {
    this.getAllDrinks();
  }

  /**
   * @description This method will run on component initialization and fetch the records from database
   */
  ngOnInit() {
    this.getAllDrinks();
  }

  /**
   * @description Get remote serve data using HTTP call
   */
  getAllDrinks() {
    this.drinkService.getAllDrinks()
      .pipe(first())
      .subscribe(
        data => {
          const remoteDummyData = data.drinks;
          this.dataSource.data = remoteDummyData;
          this.resultsLength = remoteDummyData.length;
        },
        error => {
          console.log(" Error: ", error);
        });
  }

  /**
   * @description method to apply filter
   * @param filterValue 
   */
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue;
    this.dataSource.filter = filterValue;
  }

  /**
   * @description on select change sorting will be done
   */
  selectChange() {
    this.dataSource.data.sort((a, b) => {
      if (a[this.mySelect] < b[this.mySelect]) {
        return -1;
      } else if (a[this.mySelect] > b[this.mySelect]) {
        return 1;
      } else {
        return 0;
      }
    });
    this.dataSource.data = this.dataSource.data;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}