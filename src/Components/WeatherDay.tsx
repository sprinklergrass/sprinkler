import 'react-toastify/dist/ReactToastify.css';

const style = {
  border: '2px solid #666',
  fontSize: 20,
  width: 200,
  padding: '5px 8px',
  color: '#333',
  borderRadius: 3
}

const WeatherDay = (props: any) => {

  const setDayWeather = (weather: string) => {
    props.setWeather((prevState: any) => prevState.map((item: any, index: number) => {
      if (index === props.index) return weather
      return item
    }))
  }

  return (
    <div>
      <select disabled={!props.active} style={style} value={props.weather ?? "none"} onChange={(e) => {setDayWeather(e.target.value)}}>
        <option value="sun">Brak opadów</option>
        <option value="rain">Opady</option>
        <option value="none">Brak danych</option>
      </select>
    </div>
  )
}


export default WeatherDay;
