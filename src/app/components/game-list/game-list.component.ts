import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnInit {
  gamesList: any = [];
  page = 1;
  pageSize = 20;
  collectionSize = 10;
  sorting: Array<Object> = [
    { num: 0, name: 'ASC' },
    { num: 1, name: 'desc' },
    { num: 2, name: 'fav' },
  ];
  selectSort = this.sorting[0];
  sortFav = false;
  Favorite = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('assets/games.json').subscribe((data: any) => {
      this.collectionSize = data.games.length;
      
      for (const [index, value] of data.games.entries()) {
        this.gamesList.push(value);
      }

      this.gamesList.sort(function (a, b) {
        if (a.Name.en > b.Name.en) {
          return 1;
        }
        if (a.Name.en < b.Name.en) {
          return -1;
        }
        return 0;
      })
    });
  }



  changeSort(){
    console.log(this.selectSort['name']);
    if(this.selectSort['name'] == 'ASC'){
      this.gamesList.sort(function (a, b) {
        if (a.Name.en > b.Name.en) {
          return 1;
        }
        if (a.Name.en < b.Name.en) {
          return -1;
        }
        // a должно быть равным b
        return 0;
      })
    }else if(this.selectSort['name'] == 'desc'){
      this.gamesList.sort(function (a, b) {
        if (b.Name.en > a.Name.en) {
          return 1;
        }
        if (b.Name.en < a.Name.en) {
          return -1;
        }
        // a должно быть равным b
        return 0;
      })
    }else{
      this.gamesList.sort(function (a, b) {
        return (a.Favorite=== b.Favorite)? 0 : a.Favorite? -1 : 1;
        // return b.Favorite - a.Favorite;
      })
    }
  }

  fav(){
    if(this.sortFav){
      this.gamesList.sort(function (a, b) {
        return (a.Favorite=== b.Favorite)? 0 : a.Favorite? -1 : 1;
        // return b.Favorite - a.Favorite;
      })
    }else{
      if(this.selectSort['name'] == 'ASC'){
        this.gamesList.sort(function (a, b) {
          if (a.Name.en > b.Name.en) {
            return 1;
          }
          if (a.Name.en < b.Name.en) {
            return -1;
          }
          // a должно быть равным b
          return 0;
        })
      }else if(this.selectSort['name'] == 'desc'){
        this.gamesList.sort(function (a, b) {
          if (b.Name.en > a.Name.en) {
            return 1;
          }
          if (b.Name.en < a.Name.en) {
            return -1;
          }
          // a должно быть равным b
          return 0;
        })
      }
    }
    // console.log(event.target.checked, this.sortFav);
    
  }

  addFavorite(game){
    
    let repeat = false
    for (const iterator of this.Favorite) {
      if(iterator.id == game.ID){
        repeat = true
      }
    }
    if (!repeat) {
      this.Favorite.push({id: game.ID})
      this.gamesList.find(e => e.ID === game.ID).Favorite = true
      this.fav()
    }
    
    // Favorite.
    // localStorage
    localStorage.setItem('Favorite', JSON.stringify(this.Favorite));
    console.log( localStorage.getItem('Favorite'), this.gamesList.find(e => e.ID === game.ID));
    
  }



}
