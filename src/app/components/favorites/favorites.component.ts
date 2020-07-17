import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  gamesList: any = [];
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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('assets/games.json').subscribe((data: any) => {
      
      

        for (const iterator of this.Favorite) { 
          let el = data.games.find(e => e.ID === iterator.id);
          el.Favorite = true
          this.gamesList.push(el)
          // console.log(data.games.find(e => e.ID === iterator.id));
        }
        // console.log(this.gamesList);
        

        this.collectionSize = this.gamesList.length;
      

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
        return 0;
      })
      if(this.sortFav){
        this.gamesList.sort(function (a, b) {
          return (a.Favorite=== b.Favorite)? 0 : a.Favorite? -1 : 1;
          // return b.Favorite - a.Favorite;
        })
      }
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
      if(this.sortFav){
        this.gamesList.sort(function (a, b) {
          return (a.Favorite=== b.Favorite)? 0 : a.Favorite? -1 : 1;
          // return b.Favorite - a.Favorite;
        })
      }
    }
  }

  fav(){
    if(this.selectSort['name'] == 'ASC' && this.sortFav){
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
      this.gamesList.sort(function (a, b) {
        return (a.Favorite=== b.Favorite)? 0 : a.Favorite? -1 : 1;
        // return b.Favorite - a.Favorite;
      })
    }else if(this.selectSort['name'] == 'desc' && this.sortFav){
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
      this.gamesList.sort(function (a, b) {
        return (a.Favorite=== b.Favorite)? 0 : a.Favorite? -1 : 1;
        // return b.Favorite - a.Favorite;
      })
    }else{
      this.changeSort()
    }
  
  // console.log(event.target.checked, this.sortFav);
  
}

addFavorite(game){
  
  let repeat = false
  for (const [index, value] of this.Favorite.entries()) {
    if(value.id == game.ID){
      repeat = true
      this.gamesList.find(e => e.ID === game.ID).Favorite = false
      this.Favorite.splice(index, 1)
      this.fav()
    }
  }
  if (!repeat) {
    this.Favorite.push({id: game.ID})
    this.gamesList.find(e => e.ID === game.ID).Favorite = true
    this.fav()
  }
  
  
  localStorage.setItem('Favorite', JSON.stringify(this.Favorite));
  console.log(this.Favorite );
  
}

}
