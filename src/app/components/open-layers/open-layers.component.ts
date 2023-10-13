// noinspection TypeScriptFieldCanBeMadeReadonly

import { AfterViewInit, Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Issue } from '../../ts/interface/issue.interface';
import { useGeographic } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Feature, Map, View } from 'ol';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';

// noinspection TypeScriptFieldCanBeMadeReadonly
@Component({
  selector: 'app-open-layers',
  templateUrl: './open-layers.component.html',
  styleUrls: ['./open-layers.component.sass']
})
export class OpenLayersComponent implements AfterViewInit, OnDestroy {
  @Output('issue') selectedIssue: EventEmitter<Issue>;

  map: Map;
  private tileLayer: TileLayer<OSM>;
  private iconStyle: Style;
  private _zoom: number;

  constructor() {
    useGeographic();

    this.selectedIssue = new EventEmitter();
    this._zoom = 2;
    this.tileLayer = new TileLayer({ source: new OSM() });
    this.iconStyle = new Style({
      image: new Icon({
        src: 'assets/img/mapMarker.png',
        width: 30
      }),
    });
    this.map = new Map({
      layers: [
        this.tileLayer
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });
  }

  ngAfterViewInit(): void {
    this.map.setTarget('ol-map');
    this.mapClickHandler();
  }

  ngOnDestroy(): void {
    this.map.setTarget();
  }

  set zoom(zoom: number) {
    this._zoom = zoom;
  }

  moveTo(lon: number, lat: number) {
    this.map.setView(
      new View({
        center: [lon, lat],
        zoom: this._zoom
      })
    )
  }

  loadMarkers(issues: Issue[]) {
    const markers = issues.map(issue => {
      const marker= new Feature({
        geometry: new Point([issue.long, issue.lat]),
        issue: issue
      })

      marker.setStyle(this.iconStyle);
      return marker;
    });

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: markers
      })
    })

    this.map.setLayers([this.tileLayer, vectorLayer]);
  }

  private mapClickHandler() {
    this.map.on('click', (event) => {
      const feature = this.map.forEachFeatureAtPixel(event.pixel, (feature) => {
        return feature;
      });

      if (!feature) {
        return;
      }

      this.selectedIssue.emit(feature.get('issue'));
    })
  }
}
