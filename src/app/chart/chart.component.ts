import { Component, OnInit } from '@angular/core';
import { DataService } from '../providers/data/data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  dataPopular
  dataRated

  // PIE CHART
  public pieChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public pieChartData = [120, 150, 180, 90];
  public pieChartType = 'pie';

  // BAR CHART
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = false;
  public barChartData = [
    { data: [] },
  ];

  chartDataName = []
  chartDataPopularity = []
  chartType = 'pie';

  constructor(
    public data: DataService
  ) { }

  ngOnInit(): void {
    this.getMostPopular()
    this.getTopRated()
  }

  getMostPopular() {
    this.data.getPopular()
      .subscribe(res => {
        this.dataPopular = res.results

        for (var x = 0; x <= 4; x++) {
          this.chartDataName.push(this.dataPopular[x].title)
          this.chartDataPopularity.push(Math.trunc(this.dataPopular[x].popularity))

          this.pieChartLabels = this.chartDataName
          this.pieChartData = this.chartDataPopularity
        }


      }, err => {
        console.log(err);
      })
  }

  getTopRated() {
    this.data.getRated(1)
      .subscribe(res => {
        this.dataRated = res.results

        for (var x = 0; x <= 4; x++) {
          this.barChartLabels.push(this.dataRated[x].title)
          this.barChartData[0].data.push(this.dataRated[x].vote_average)
        }

      }, err => {
        console.log(err)
      })
  }

}
