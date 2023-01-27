import { HttpClient } from "@angular/common/http";
import { Films } from "../models/film/film.model";
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { promises,resolve } from 'dns';
import { rejects } from 'assert';

@Injectable()
export class ApiService{

    constructor(private client: HttpClient){}
    endpoind ='https://swapi.dev/api/films'
    
    async callApi(): Promise<Films[]>{

        return new Promise((resolve , reject)=>{
            
            this.client.get(this.endpoind).subscribe((data: any)=> {

                let  allFilms = [];
                let responses = data['results'];
                console.log(data['results']);

                for(let item in responses) {
                    let response:Films = {
                        title: responses[item].title, 
                        description: responses[item].opening_crawl, 
                        episode_id: responses[item].episode_id, 
                        director: responses[item].director,
                        producer: responses[item].producer,
                        release_date: responses[item].release_date
                    }
                     allFilms.push(response);
                }
                resolve(allFilms)
            })
        })
    }
}