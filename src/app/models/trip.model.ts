export interface Trip {
    id: string;
    currentAddress: string;
    destinationAddress: string;
    coordinates: [
        {
            lat: number;
            lng: number;
        },
        {
            lat: number;
            lng: number;
        }
    ];
    distance: number;
    duration: number;
    price: number;
    status: string;
}