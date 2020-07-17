import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FuncService } from 'src/app/servises/func.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
  providers: [FuncService]
})
export class GameListComponent implements OnInit {
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



  constructor(private http: HttpClient, private funcService: FuncService ) {
    this.gamesList  = this.funcService.gamesList;
    this.twoGameList = this.gamesList;
    this.page = this.funcService.page;
    this.pageSize = this.funcService.pageSize;
    this.collectionSize = this.funcService.collectionSize;
    this.sorting = this.funcService.sorting;
    this.selectSort = this.sorting[0];
    this.sortFav = this.funcService.sortFav;
    this.Favorite = this.funcService.Favorite;
    this.search = this.funcService.search;
  }

  ngOnInit(): void {
    this.http.get('assets/games.json').subscribe((data: any) => {
      this.collectionSize = data.games.length;
      
      for (const [index, value] of data.games.entries()) {
        for (const iterator of this.Favorite) {
          if(iterator.id == value.ID){
            value.Favorite = true
          }
          
        }
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

  searching(){
    let searchEl: any = [];
    for (const iterator of this.gamesList) {
      if(iterator.Name.en.toLocaleLowerCase().indexOf(this.search.toLocaleLowerCase()) > -1 && this.search.length > 2){
        searchEl.push(iterator);
      }
    }
    if(this.search.length > 2){
      this.gamesList = searchEl
      this.collectionSize = this.gamesList.length
    }else{
      this.gamesList = this.twoGameList
      this.collectionSize = this.gamesList.length
    }

  }
  // searching(){
  //   this.funcService.searching(this.gamesList, this.search, this.collectionSize, this.twoGameList)
  //   console.log(this.gamesList);
    
  // }
  /**
   * Сортировка по названию
   */
  changeSort(){
    this.funcService.changeSort(this.selectSort, this.gamesList, this.sortFav )
  }
  
  /**
   * Сортировка по фоворитам
   */
  sortingFav(){
    this.funcService.sortingFav(this.selectSort, this.sortFav, this.gamesList)
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
    console.log(this.Favorite );
    
  }



}
