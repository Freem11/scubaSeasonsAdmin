export class GPSBubble {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;

  constructor({ minLat, maxLat, minLng, maxLng }: { minLat: number, maxLat: number, minLng: number, maxLng: number }) {
    this.minLat = minLat;
    this.maxLat = maxLat;
    this.minLng = minLng;
    this.maxLng = maxLng;
  }

  /**
   * IDL = International Date Line
   * @returns true is current bubble crosses the IDL
   */
  isIDL(): boolean {
    return this.minLng > this.maxLng;
  }

  getAsianBubble() {
    return new GPSBubble({
      minLat: this.minLat,
      maxLat: this.maxLat,
      minLng: this.minLng,
      maxLng: 180,
    });
  }

  getAmericanBubble() {
    return new GPSBubble({
      minLat: this.minLat,
      maxLat: this.maxLat,
      minLng: -180,
      maxLng: this.maxLng,
    });
  }

  /**
 * GPS bubble - some area on the map.
 * If GPS bubble crosses the IDL(International Date Line), we need to get items from both sides of the IDL
 * so we need to do two API request twice
 * @param callable - API request to get items. Its first parameter is the bubble.
 * @param bubble GPS bubble
 * @param rest - the other arguments of the API request
 * @returns
 */
  static async getItemsInGpsBubble<TRest extends unknown[], TItem>(
    callable: (bubble: GPSBubble, ...rest: TRest) => Promise<TItem[] | undefined>,
    bubble: GPSBubble,
    ...rest: TRest
  ): Promise<TItem[] | undefined> {
    if (bubble.isIDL()) {
      const american = await callable(bubble.getAmericanBubble(), ...rest);
      const asian = await callable(bubble.getAsianBubble(), ...rest);

      return [
        ...(american ? american : []),
        ...(asian ? asian : []),
      ];
    } else {
      return await callable(bubble, ...rest);
    }
  }

  static createFromBoundaries(boundaries: google.maps.LatLngBounds) {
    return new GPSBubble({
      minLat: boundaries.getSouthWest().lat(),
      maxLat: boundaries.getNorthEast().lat(),
      minLng: boundaries.getSouthWest().lng(),
      maxLng: boundaries.getNorthEast().lng(),
    });
  }
}

/** The four bounds of a GPSBubble, without its methods. */
export type GPSBounds = Pick<GPSBubble, 'minLat' | 'maxLat' | 'minLng' | 'maxLng'>;

/** A map region as the mobile app sends it: its south-west and north-east corners. */
export type RegionCorners = {
  southWest: { latitude: number, longitude: number }
  northEast: { latitude: number, longitude: number }
};

/** The two area shapes the legacy query helpers accept. */
export type MapArea = GPSBounds | RegionCorners;
