import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FuncService {
  gamesList: any = [];
  twoGameList: any = this.gamesList;
  page = 1;
  pageSize = 20;
  collectionSize = 10;
  sorting: Array<Object> = [
    { num: 0, name: 'ASC' },
    { num: 1, name: 'desc' }
  ];
  sortFav = false;
  Favorite: any[] = JSON.parse(localStorage.getItem('Favorite'));
  sortName: boolean = false;
  filter: number;

  constructor(private http: HttpClient) {

  }

  changeFilter(){
    this.http.get('assets/games.json').subscribe((data: any) => {
      console.log(data);
      
      this.collectionSize = data.games.length;
      
      for (const [index, value] of data.games.entries()) {
        for (const iterator of this.Favorite) {
          if(iterator.id == value.ID){
            value.Favorite = true
          }
          
        }
        
        
        // this.gamesList.push(value);
      } 
      console.log(this.gamesList);
    });
  }

  /**
   * Сортировка по названию
   */
  changeSort(){
    console.log(this.sortName);
    

    if(!this.sortName){
      this.gamesList.sort(function (a, b) {
        if (a.Name.en > b.Name.en) {
          return 1;
        }
        if (a.Name.en < b.Name.en) {
          return -1;
        }
        return 0;
      })
      if(this.sortFav){
        this.gamesList.sort(function (a, b) {
          return (a.Favorite=== b.Favorite)? 0 : a.Favorite? -1 : 1;
        })
      }
    }else if(this.sortName){
      this.gamesList.sort(function (a, b) {
        if (b.Name.en > a.Name.en) {
          return 1;
        }
        if (b.Name.en < a.Name.en) {
          return -1;
        }
        return 0;
      })
      
      if(this.sortFav){
        this.gamesList.sort(function (a, b) {
          return (a.Favorite=== b.Favorite)? 0 : a.Favorite? -1 : 1;
        })
      }
    }
  }

  searching(search){
    let searchEl: any = [];
    for (const iterator of this.gamesList) {
      if(iterator.Name.en.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1 && search.length > 2){
        searchEl.push(iterator);
      }
    }
    
    if(search.length > 2){
      this.gamesList = searchEl
      this.collectionSize = this.gamesList.length
    }else{
      this.gamesList = this.twoGameList
      this.collectionSize = this.gamesList.length
    }
    console.log(searchEl);
  }

  sortingFav(){
    if(!this.sortName && this.sortFav){
      this.gamesList.sort(function (a, b) {
        if (a.Name.en > b.Name.en) {
          return 1;
        }
        if (a.Name.en < b.Name.en) {
          return -1;
        }

        return 0;
      })
      this.gamesList.sort(function (a, b) {
        return (a.Favorite=== b.Favorite)? 0 : a.Favorite? -1 : 1;

      })
    }else if(this.sortName && this.sortFav){
      this.gamesList.sort(function (a, b) {
        if (b.Name.en > a.Name.en) {
          return 1;
        }
        if (b.Name.en < a.Name.en) {
          return -1;
        }

        return 0;
      })
      this.gamesList.sort(function (a, b) {
        return (a.Favorite=== b.Favorite)? 0 : a.Favorite? -1 : 1;

      })
    }else{
      this.changeSort()
    }
}

addFavorite(game){
    
  let repeat = false
  for (const [index, value] of this.Favorite.entries()) {
    if(value.id == game.ID){
      repeat = true
      this.gamesList.find(e => e.ID === game.ID).Favorite = false
      this.Favorite.splice(index, 1)
      this.sortingFav()
    }
  }
  if (!repeat) {
    this.Favorite.push({id: game.ID})
    this.gamesList.find(e => e.ID === game.ID).Favorite = true
    this.sortingFav()
  }
  
  localStorage.setItem('Favorite', JSON.stringify(this.Favorite));
}

}
