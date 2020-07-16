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
  ];
  selectSort = this.sorting[0];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('assets/games.json').subscribe((data: any) => {
      this.collectionSize = data.games.length;

      for (const [index, value] of data.games.entries()) {
        this.gamesList.push(value);
      }
    });
  }



  changeSort(){
    console.log(this.selectSort['name']);
    
  }

}
