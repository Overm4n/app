import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FuncService } from 'src/app/servises/func.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  gamesList: any = [];
  twoGameList: any;
  page;
  pageSize;
  collectionSize;
  sorting: Array<Object>;
  sortFav;
  Favorite: any[];
  sortName: boolean;

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
  }

  /**
   * Получаю список игр
   */
  ngOnInit(): void {
    this.http.get('assets/games.json').subscribe((data: any) => {
      for (const iterator of this.Favorite) {
        let el = data.games.find((e) => e.ID === iterator.id);
        el.Favorite = true;
        this.gamesList.push(el);
      }
      this.collectionSize = this.gamesList.length;
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


  changeSort() {
    this.funcService.gamesList = this.gamesList;
    this.funcService.sortName = this.sortName;
    this.funcService.sortFav = this.sortFav;
    this.funcService.changeSort();
  }

  addFavorite(game) {
    this.funcService.gamesList = this.gamesList;
    this.funcService.Favorite = this.Favorite;
    this.funcService.addFavorite(game);
  }
}
