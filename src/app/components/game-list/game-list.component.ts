import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnInit {
  gamesList: any = [];
  pagination: pagination = {
    page: 1,
    allElements: 0,
    allPage: [],
    curentPage: 0,
    showPagesList:  Array(10).fill(0).map((x, i) => i),
    countElementsPages: 20,
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('assets/games.json').subscribe((data: any) => {
      this.pagination.allElements = data.games.length;
      this.pagination.allPage = Array(
        Math.ceil(data.games.length / this.pagination.countElementsPages)
      ).fill(0).map((x, i) => i);

      for (const [index, value] of data.games.entries()) {
        if (index < this.pagination.countElementsPages) {
          this.gamesList.push(value);
        }
      }
    });
  }

  clickPage(number) {
    if(number <= this.pagination.allPage.length){
      this.pagination.curentPage = number;
    this.pagination.showPagesList = Array(10).fill(0).map((x, i) => i+number);
    console.log(number, this.pagination.showPagesList);
    this.http.get('assets/games.json').subscribe((data: any) => {
      this.gamesList.splice(0, this.gamesList.length);
      for (const [index, value] of data.games.entries()) {
        if (index < this.pagination.curentPage * this.pagination.countElementsPages + this.pagination.countElementsPages &&
           index >= this.pagination.curentPage * this.pagination.countElementsPages) {
          this.gamesList.push(value);
        }
      }
    })
    }
    
    
  }
}

type pagination = {
  page: number;
  allElements: number;
  allPage: number[];
  curentPage: number;
  showPagesList: number[];
  countElementsPages: number;
};
