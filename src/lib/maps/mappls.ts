// ==========================================
// MapsMyIndia (Mappls) Service
// ==========================================

const MAPPLS_API_KEY = process.env.NEXT_PUBLIC_MAPPLS_API_KEY;
const MAPPLS_REST_KEY = process.env.NEXT_PUBLIC_MAPPLS_REST_KEY;

export interface MapplsRoute {
  distance: number; // km
  duration: number; // minutes
  geometry: { lat: number; lng: number }[];
}

export async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const res = await fetch(
      `https://atlas.mappls.com/api/places/geocode?address=${encodeURIComponent(address)}`,
      { headers: { Authorization: `Bearer ${MAPPLS_REST_KEY}` } }
    );
    const data = await res.json();
    if (data.copResults) {
      return { lat: data.copResults.latitude, lng: data.copResults.longitude };
    }
    return null;
  } catch {
    return null;
  }
}

export async function reverseGeocode(lat: number, lng: number): Promise<string> {
  try {
    const res = await fetch(
      `https://apis.mappls.com/advancedmaps/v1/${MAPPLS_REST_KEY}/rev_geocode?lat=${lat}&lng=${lng}`,
    );
    const data = await res.json();
    return data.results?.[0]?.formatted_address || 'Unknown location';
  } catch {
    return 'Unknown location';
  }
}

export async function getRoute(
  origin: { lat: number; lng: number },
  destination: { lat: number; lng: number }
): Promise<MapplsRoute | null> {
  try {
    const res = await fetch(
      `https://apis.mappls.com/advancedmaps/v1/${MAPPLS_REST_KEY}/route_adv/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?geometries=polyline`,
    );
    const data = await res.json();
    const route = data.routes?.[0];
    if (route) {
      return {
        distance: route.distance / 1000,
        duration: route.duration / 60,
        geometry: [],
      };
    }
    return null;
  } catch {
    return null;
  }
}

export function calculateDistance(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function estimateETA(distanceKm: number, speedKmh: number = 25): number {
  return Math.ceil((distanceKm / speedKmh) * 60);
}
