export class Car  {
constructor(
  public id: number,
  public vin: string,
  public ext_color: string,
  public int_color: string,
  public car_model: string,
  public opt_code: string,
  public ship_to: string,
  public sold_to: string,
  public created_date: Date,
  public serial_number: number,
  public model_year: number
){}
}

export interface Car {
  // add the properties of a car here
  [key: string]: any;
}

export class Dealer {
constructor(
public dealer_code: string,
public address: string,
public zip: string,
public car_count: number
) {}
}

export class CarModel {
constructor(
public model_code: string,
public description: string
) {}
}