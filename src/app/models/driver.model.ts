export interface Driver {
    uid: string;
    email: string;
    name: string;
    password?: string;
    car: {
        model: string;
        plate: string;
    };
    location: {
        lat: number;
        lng: number;
    };
    active: boolean;
}