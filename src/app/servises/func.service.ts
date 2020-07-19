import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FuncService {
  gamesList: any = [];
  twoGameList: any = this.gamesList;
  page = 1;
  pageSize = 20;
  collectionSize = 10;
  sorting: Array<Object> = [
    { num: 0, name: 'ASC' },
    { num: 1, name: 'desc' },
  ];
  sortFav = false;
  Favorite: any[] = JSON.parse(localStorage.getItem('Favorite'));
  sortName: boolean = false;
  filter: Array<Object> = [];

  constructor(private http: HttpClient) {
    this.http.get('assets/games.json').subscribe((data: any) => {
      for (const [index, value] of data.categories.entries()) {
        this.filter.push({ id: value.ID, name: value.Name.en, checked: false });
      }
    });
  }

  /**
   * Сортировка по названию
   */
  changeSort() {
    if (!this.sortName) {
      this.gamesList.sort(function (a, b) {
        if (a.Name.en > b.Name.en) {
          return 1;
        }
        if (a.Name.en < b.Name.en) {
          return -1;
        }
        return 0;
      });
      if (this.sortFav) {
        this.gamesList.sort(function (a, b) {
          return a.Favorite === b.Favorite ? 0 : a.Favorite ? -1 : 1;
        });
      }
    } else if (this.sortName) {
      this.gamesList.sort(function (a, b) {
        if (b.Name.en > a.Name.en) {
          return 1;
        }
        if (b.Name.en < a.Name.en) {
          return -1;
        }
        return 0;
      });

      if (this.sortFav) {
        this.gamesList.sort(function (a, b) {
          return a.Favorite === b.Favorite ? 0 : a.Favorite ? -1 : 1;
        });
      }
    }
  }

  searching(search) {
    let searchEl: any = [];
    for (const iterator of this.gamesList) {
      if (
        iterator.Name.en
          .toLocaleLowerCase()
          .indexOf(search.toLocaleLowerCase()) > -1 &&
        search.length > 2
      ) {
        searchEl.push(iterator);
      }
    }

    if (search.length > 2) {
      this.gamesList = searchEl;
      this.collectionSize = this.gamesList.length;
    } else {
      this.gamesList = this.twoGameList;
      this.collectionSize = this.gamesList.length;
    }
  }

  sortingFav() {
    if (!this.sortName && this.sortFav) {
      this.gamesList.sort(function (a, b) {
        if (a.Name.en > b.Name.en) {
          return 1;
        }
        if (a.Name.en < b.Name.en) {
          return -1;
        }

        return 0;
      });
      this.gamesList.sort(function (a, b) {
        return a.Favorite === b.Favorite ? 0 : a.Favorite ? -1 : 1;
      });
    } else if (this.sortName && this.sortFav) {
      this.gamesList.sort(function (a, b) {
        if (b.Name.en > a.Name.en) {
          return 1;
        }
        if (b.Name.en < a.Name.en) {
          return -1;
        }

        return 0;
      });
      this.gamesList.sort(function (a, b) {
        return a.Favorite === b.Favorite ? 0 : a.Favorite ? -1 : 1;
      });
    } else {
      this.changeSort();
    }
  }

  addFavorite(game) {
    let repeat = false;
    for (const [index, value] of this.Favorite.entries()) {
      if (value.id == game.ID) {
        repeat = true;
        this.gamesList.find((e) => e.ID === game.ID).Favorite = false;
        this.Favorite.splice(index, 1);
        this.sortingFav();
      }
    }
    if (!repeat) {
      this.Favorite.push({ id: game.ID });
      this.gamesList.find((e) => e.ID === game.ID).Favorite = true;
      this.sortingFav();
    }

    localStorage.setItem('Favorite', JSON.stringify(this.Favorite));
  }
}
