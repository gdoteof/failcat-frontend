export interface CarType {
  make: string;
  model: string;
  ext_colors: string[];
  year: number;
  trims: string[];
}

export class KiaTelluride implements CarType {
  public trims: string[] = [];
  public make: string = "Kia";
  public model: string = "Telluride";
  public ext_colors: string[] = [
    "BLACK COPPER",
    "SNOW WHITE PEARL",
    "EBONY BLACK",
    "SANGRIA",
    "EVERLASTING SILVER",
    "GRAVITY GRAY",
    "DARK MOSS",
    "GLACIAL WHITE PEARL",
    "WOLF GRAY",
  ];
  constructor(public year: number) {
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

      this.ext_colors = [
        "BLACK COPPER",
        "GLACIAL WHITE PEARL",
        "DAWNING RED",
        "DARK MOSS",
        "WOLF GRAY",
        "EBONY BLACK",
        "EVERLASTING SILVER",
        "GRAVITY GRAY",
        "JUNGLE GREEN",
        "MIDNIGHT LAKE BLUE",
      ];
    }
  }
}
