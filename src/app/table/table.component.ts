import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataMovies } from '../interface/dataMovies';
import { DataService } from '../providers/data/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableComponent implements OnInit {

  dataMovies: DataMovies[]
  dataRated;
  displayedColumns: string[] = ['title', 'overview', 'vote_average'];
  dataSource = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  expandedElement: any;

  genres

  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');

  rowClick(row: any) {
    this.expandedElement = this.expandedElement === row ? null : row;
  }

  constructor(
    public data: DataService
  ) { }

  ngAfterViewInit() {
    this.getGenres()
    this.data.getRated(1).subscribe(res => {
      this.dataRated = res.results

      this.dataMovies = this.dataRated
      this.dataSource = new MatTableDataSource<DataMovies>(this.dataMovies);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  getGenres() {

    this.data.getGenres().subscribe(res => {
      this.genres = res.genres
    })

  }


  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  renderImg(url) {
    return `https://image.tmdb.org/t/p/original/${url}`
  }

}
