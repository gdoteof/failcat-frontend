export interface CarType {
    make: string;
    model: string;
    year: number;
    trims: string[];
}

export class KiaTelluride implements CarType {
    public trims: string[] = [];
    public make: string = "Kia";
    public model: string = "Telluride";
    constructor(
        public year: number,
    ) {
        if (year > 2022) {
            this.trims = [
                "SX-PRESTIGE X-LINE",
                "SX-PRESTIGE X-PRO",
                "SX-PRESTIGE",
                "SX X-PRO",
                "SX X-LINE",
                "EX X-LINE",
                "LX",
                "SX",
                "EX",
                "S",
            ];
        }
    }
}

export interface Car {
  // add the properties of a car here
  [key: string]: any;
}