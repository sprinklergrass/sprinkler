import {ReactElement, useState} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import TimeField from 'react-simple-timefield';
import {toast} from "react-toastify";

const timeStyle = {
  border: '2px solid #666',
  fontSize: 20,
  width: 80,
  padding: '5px 8px',
  color: '#333',
  borderRadius: 3
}

function padTo2Digits(num: number) {
  return String(num).padStart(2, '0');
}

function dateToTime(date: Date) {
  return padTo2Digits(date.getHours())+ ':' + padTo2Digits(date.getMinutes())
}

const DeviceConfig = (props: any): ReactElement => {
  const [start, setStart] = useState(padTo2Digits(props.startDate.getHours()) + ':' + padTo2Digits(props.startDate.getMinutes()))
  const [period, setPeriod] = useState('00:00')
  const [days, setDays] = useState(1)

  const changeStart = (event: any, value: any) => {
    setStart(value)
  }

  const changePeriod = (event: any, value: any) => {
    setPeriod(value)
  }

  const saveSettings = () => {
    const [h,m] = start.split(':')
    const startDate = new Date()
    startDate.setHours(Number(h), Number(m), Number(0))

    const [ph,pm] = period.split(':')
    const periodSec = Number(ph) * 3_600 + Number(pm) * 60

    if (!startDate || !periodSec || periodSec < 1 || startDate < new Date()) {
      toast.error('Invalid settings')
      return
    }

    props.setDate(startDate)
    props.setPeriod(periodSec)
    props.setDays(days)
    toast.success('Settings saved')
  }

  return (
    <div style={{float: 'left', paddingLeft: '8%', width:'42%', background: '#299e4c', color: 'white', minHeight: '500px' }}>
      <h2>Ustawienia</h2>

      <p style={{fontSize: '20px'}}>Godzina włączenia zraszacza</p>
      <TimeField
        style={timeStyle}
        value={dateToTime(props.startDate)}
        onChange={(event, value) => {changeStart(event, value)}}
        colon=":"
      />

      <p style={{fontSize: '20px'}}>Czas zraszania</p>
      <TimeField
        style={timeStyle}
        value={'00:00'}
        onChange={(event, value) => {changePeriod(event, value)}}
        colon=":"
      />

      <p style={{fontSize: '20px'}}>Liczba dni</p>
      <select  value={days.toString()} style={timeStyle} onChange={(e) => {setDays(Number(e.target.value))}}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <br/><br/><br/><br/>

      <button style={timeStyle} onClick={saveSettings}>Zapisz</button>
    </div>


  )
}


export default DeviceConfig;
