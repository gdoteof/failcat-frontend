
// Importing necessary libraries and components
import { Grid, Card, Text } from '@nextui-org/react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Car } from '../models'; 


// Car Detail Component
const CarDetail = ( {carData} : { carData: Car }): JSX.Element => {
  return (
    <Grid.Container gap={2} justify="center">
      <Grid xs={24} sm={24} md={12}>
        <Card>
          <Text h4>{carData.car_model}</Text>
          <Text>
            VIN: {carData.vin}
          </Text>
          {/* Add other car details here */}
        </Card>
      </Grid>
    <Grid xs={24} sm={24} md={16}>
        <iframe src={`https://failcat-rust.vteng.io/window-sticker/${carData.vin}`} width="100%" height="100%" title="window-sticker"/>
    </Grid>
    </Grid.Container>
  );
};

// Page Component
const CarCard = ({ id }: { id: number }) => {
  const [carData, setCarData] = useState(null);

  useEffect(() => {
    const fetchCarData = async () => {
      const { data } = await axios.get(`https://failcat-rust.vteng.io/car/${id}`);
      setCarData(data);
    };
    fetchCarData();
  }, [id]);

  return (
    <div>
      {carData && <CarDetail carData={carData} />}
    </div>
  );
};

export default CarCard;
