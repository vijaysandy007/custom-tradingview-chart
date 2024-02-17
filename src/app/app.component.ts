import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { createChart, CrosshairMode } from 'lightweight-charts';
import { priceData } from '../assets/js/priceData';
import { volumeData } from '../assets/js/volumeData';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('chartContainer') chartContainer: ElementRef;
  chart: any;
  resizeObserver: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.TradingViewChart()
  }

  TradingViewChart(){
    this.chart = createChart(this.chartContainer.nativeElement, {
      width: this.chartContainer.nativeElement.clientWidth,
      height: this.chartContainer.nativeElement.clientHeight,
      layout: {
        backgroundColor: '#253248',
        textColor: 'rgba(255, 255, 255, 0.9)',
      },
      grid: {
        vertLines: {
          color: '#334158',
        },
        horzLines: {
          color: '#334158',
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: '#485c7b',
      },
      timeScale: {
        borderColor: '#485c7b',
      },
    });

    const candleSeries = this.chart.addCandlestickSeries({
      upColor: '#4bffb5',
      downColor: '#ff4976',
      borderDownColor: '#ff4976',
      borderUpColor: '#4bffb5',
      wickDownColor: '#838ca1',
      wickUpColor: '#838ca1',
    });

    candleSeries.setData(priceData);

    const volumeSeries = this.chart.addHistogramSeries({
      color: '#182233',
      lineWidth: 2,
      priceFormat: {
        type: 'volume',
      },
      overlay: true,
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },

    });

    volumeSeries.setData(volumeData);
     const resizeObserver = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      this.chart.applyOptions({ width, height });
      setTimeout(() => {
        this.chart.timeScale().fitContent();
      }, 0);
    });

    resizeObserver.observe(this.chartContainer.nativeElement);
  }

}


