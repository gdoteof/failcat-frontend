export class Car  {
constructor(
  id: number,
  vin: string,
  ext_color: string,
  int_color: string,
  car_model: string,
  opt_code: string,
  ship_to: string,
  sold_to: string,
  created_date: Date,
  serial_number: number,
  model_year: number
){}
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