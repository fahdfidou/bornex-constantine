
declare global {
  interface Window {
    google: typeof google;
  }
}

declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: Element | null, opts?: MapOptions);
    }
    
    class Marker {
      constructor(opts?: MarkerOptions);
      addListener(eventName: string, handler: Function): void;
    }
    
    class InfoWindow {
      constructor(opts?: InfoWindowOptions);
      open(map?: Map, anchor?: Marker): void;
    }
    
    class Size {
      constructor(width: number, height: number);
    }
    
    interface MapOptions {
      center?: LatLngLiteral;
      zoom?: number;
      styles?: MapTypeStyle[];
    }
    
    interface MarkerOptions {
      position?: LatLngLiteral;
      map?: Map;
      title?: string;
      icon?: string | Icon;
    }
    
    interface InfoWindowOptions {
      content?: string;
    }
    
    interface LatLngLiteral {
      lat: number;
      lng: number;
    }
    
    interface MapTypeStyle {
      featureType?: string;
      elementType?: string;
      stylers?: any[];
    }
    
    interface Icon {
      url: string;
      scaledSize: Size;
    }
  }
}

export {};
