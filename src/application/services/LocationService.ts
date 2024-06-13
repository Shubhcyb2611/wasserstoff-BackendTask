import { GOOGLE_MAP_API_KEY } from '@/config';
import { Location } from '@/domain/entities';
import { GenericRepository } from '@/infrastructure';

const apiKey = GOOGLE_MAP_API_KEY;
export class LocationService {
    constructor(private locationRepository: GenericRepository<Location>) {}
    async getCoordinatesFromSearch(query) {
        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const geocodingResponse = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${apiKey}`
            );
            const geocodingData = await geocodingResponse.json();
            if (geocodingData.status === 'OK') {
                const { lat, lng } = geocodingData.results[0].geometry.location;
                return { lat, lng };
            } else {
                console.error('Geocoding API request failed.');
                return { lat: 0, lng: 0 };
            }
        } catch (error) {
            console.error('Error fetching coordinates:', error);
            return { lat: 0, lng: 0 };
        }
    }

    async getDetailAddressFromCoords(lat: number, lng: number) {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            const results = data.results;
            let locality = '';
            let subLocality = '';
            let route = '';
            let houseNumber = '';
            if (results && results.length > 0) {
                for (const component of results[0].address_components) {
                    if (component.types.includes('locality')) {
                        locality = component.short_name;
                        continue;
                    }
                    if (
                        component.types.includes('administrative_area_level_1')
                    ) {
                        subLocality = component.long_name;
                        continue;
                    }
                }
                return {
                    subLocality: subLocality,
                    locality: locality,
                };
            }
            return null; // No pincode found
        } catch (error) {
            console.error('Error fetching pincode:', error);
            return null;
        }
    }
}
