import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FuncService } from 'src/app/servises/func.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
  providers: [FuncService],
})
export class GameListComponent implements OnInit {
  gamesList: any = [];
  twoGameList: any;
  page;
  pageSize;
  collectionSize;
  sorting: Array<Object>;
  sortFav;
  Favorite: any[];
  search: string;
  sortName: boolean;
  filter: Array<Object> = [];
  tempArrFilter: Array<Object> = [];
  filterBtn: boolean = false;

  constructor(private http: HttpClient, private funcService: FuncService) {
    this.gamesList = this.funcService.gamesList;
    this.twoGameList = this.gamesList;
    this.page = this.funcService.page;
    this.pageSize = this.funcService.pageSize;
    this.collectionSize = this.funcService.collectionSize;
    this.sorting = this.funcService.sorting;
    this.sortFav = this.funcService.sortFav;
    this.Favorite = this.funcService.Favorite;
    this.sortName = this.funcService.sortName;
    this.filter = this.funcService.filter;
  }

    /**
     * Получаю список игр
     */
  ngOnInit(): void {
    this.http.get('assets/games.json').subscribe((data: any) => {
      this.collectionSize = data.games.length;
      for (const [index, value] of data.games.entries()) {
        for (const iterator of this.Favorite) {
          if (iterator.id == value.ID) {
            value.Favorite = true;
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
      });
    });
  }

  changeFilter() {
    this.tempArrFilter = [];
    this.http.get('assets/games.json').subscribe((data: any) => {
      this.twoGameList = data.games;
      for (const [index, value] of this.filter.entries()) {
        if (value['checked']) {
          this.tempArrFilter.push(value);
        }
      }
      if (this.tempArrFilter.length > 0) {
        this.twoGameList = [];
        for (const [index, value] of data.games.entries()) {
          for (const [index_, value_] of this.tempArrFilter.entries()) {
            if (value.CategoryID.indexOf(value_['id']) >= 0) {
              this.twoGameList.push(value);
              break;
            }
          }
        }
      }

      this.collectionSize = this.twoGameList.length;
      this.gamesList = this.twoGameList;
      this.changeSort();
    });
  }

  searching() {
    this.funcService.gamesList = this.gamesList;
    this.funcService.collectionSize = this.collectionSize;
    this.funcService.twoGameList = this.twoGameList;
    this.funcService.searching(this.search);
    this.gamesList = this.funcService.gamesList;
  }


  changeSort() {
    this.funcService.gamesList = this.gamesList;
    this.funcService.sortFav = this.sortFav;
    this.funcService.sortName = this.sortName;
    this.funcService.changeSort();
  }


  sortingFav() {
    this.funcService.sortFav = this.sortFav;
    this.funcService.gamesList = this.gamesList;
    this.funcService.sortingFav();
  }

  addFavorite(game) {
    this.funcService.gamesList = this.gamesList;
    this.funcService.Favorite = this.Favorite;
    this.funcService.addFavorite(game);
  }
}
