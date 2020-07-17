import { Injectable } from '@angular/core';

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
  selectSort = this.sorting[0];
  sortFav = false;
  Favorite: any[] = JSON.parse(localStorage.getItem('Favorite'));
  search: string;

  /**
   * Сортировка по названию
   */
  changeSort(selectSort: any, gamesList: any, sortFav){
    console.log(selectSort['name']);
    if(selectSort['name'] == 'ASC'){
      gamesList.sort(function (a, b) {
        if (a.Name.en > b.Name.en) {
          return 1;
        }
        if (a.Name.en < b.Name.en) {
          return -1;
        }
        return 0;
      })
      if(sortFav){
        gamesList.sort(function (a, b) {
          return (a.Favorite=== b.Favorite)? 0 : a.Favorite? -1 : 1;
          // return b.Favorite - a.Favorite;
        })
      }
    }else if(selectSort['name'] == 'desc'){
      gamesList.sort(function (a, b) {
        if (b.Name.en > a.Name.en) {
          return 1;
        }
        if (b.Name.en < a.Name.en) {
          return -1;
        }
        // a должно быть равным b
        return 0;
      })
      if(sortFav){
        gamesList.sort(function (a, b) {
          return (a.Favorite=== b.Favorite)? 0 : a.Favorite? -1 : 1;
          // return b.Favorite - a.Favorite;
        })
      }
    }
  }

  searching(gamesList: any, search: any, collectionSize: any, twoGameList: any){
    
    
    let searchEl: any = [];
    for (const iterator of gamesList) {
      if(iterator.Name.en.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1 && search.length > 2){
        searchEl.push(iterator);
      }
    }
    
    if(search.length > 2){
      gamesList = searchEl
      collectionSize = gamesList.length
    }else{
      gamesList = twoGameList
      collectionSize = gamesList.length
    }
    console.log(searchEl);
  }

  sortingFav(selectSort, sortFav, gamesList){
    if(selectSort['name'] == 'ASC' && sortFav){
      gamesList.sort(function (a, b) {
        if (a.Name.en > b.Name.en) {
          return 1;
        }
        if (a.Name.en < b.Name.en) {
          return -1;
        }
        // a должно быть равным b
        return 0;
      })
      gamesList.sort(function (a, b) {
        return (a.Favorite=== b.Favorite)? 0 : a.Favorite? -1 : 1;
        // return b.Favorite - a.Favorite;
      })
    }else if(selectSort['name'] == 'desc' && sortFav){
      gamesList.sort(function (a, b) {
        if (b.Name.en > a.Name.en) {
          return 1;
        }
        if (b.Name.en < a.Name.en) {
          return -1;
        }
        // a должно быть равным b
        return 0;
      })
      gamesList.sort(function (a, b) {
        return (a.Favorite=== b.Favorite)? 0 : a.Favorite? -1 : 1;
        // return b.Favorite - a.Favorite;
      })
    }else{
      this.changeSort(selectSort, gamesList, sortFav)
    }
}

addFavorite(game, Favorite, gamesList){
    
  let repeat = false
  for (const [index, value] of Favorite.entries()) {
    if(value.id == game.ID){
      repeat = true
      gamesList.find(e => e.ID === game.ID).Favorite = false
      Favorite.splice(index, 1)
      this.sortingFav(this.selectSort, this.sortFav, this.gamesList)
    }
  }
  if (!repeat) {
    Favorite.push({id: game.ID})
    gamesList.find(e => e.ID === game.ID).Favorite = true
    this.sortingFav(this.selectSort, this.sortFav, this.gamesList)
  }
  
  
  localStorage.setItem('Favorite', JSON.stringify(Favorite));
  console.log(Favorite );
  
}

}
