import 'react-toastify/dist/ReactToastify.css';
import WeatherDay from "./WeatherDay";


const WeatherSimulator = (props: any) => {

  const dayProp = (index: number) => ({
    setWeather: props.setWeather,
    index: index,
    weather: props.weather[index],
    active: props.active
  })

  return (
    <div style={{float: 'left', paddingLeft: '8%', width:'42%', background: '#299e4c', color: 'white', minHeight: '500px' }}>
      <h2>Weather simulator</h2>

      <p style={{fontSize: '20px'}}>Day 1</p>
      <WeatherDay  {...dayProp(0)}/>

      <p style={{fontSize: '20px'}}>Day 2</p>
      <WeatherDay {...dayProp(1)}/>

      <p style={{fontSize: '20px'}}>Day 3</p>
      <WeatherDay {...dayProp(2)}/>
    </div>
  )
}


export default WeatherSimulator;
