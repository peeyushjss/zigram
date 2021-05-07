import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class DrinkService {

    readonly rootUrl = "https://www.thecocktaildb.com/api/json/v1/1/";

    constructor(
        private http: HttpClient
    ) { }

    /**
     * @description method to fetch the details of drinks.
     * @returns data of all drinks available which name started with 'b'
     */
    getAllDrinks() {
        return this.http.get<any>(this.rootUrl + `search.php`, {
            params: {
                f: "b"
            }
        }).pipe(map(data => {
            return data;
        }));
    }

    /**
     * @description method to fetch the details of drink by id
     * @param id 
     * @returns details of drink by id
     */
    getDrinkDetails(id: string) {
        return this.http.get<any>(this.rootUrl + `lookup.php`, {
            params: {
                i: id
            }
        }).pipe(map(data => {
            return data;
        }));
    }


}