import {ReactElement, useEffect, useState} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer, ToastContainerProps} from "react-toastify";
import WeatherSimulator from "./WeatherSimulator";
import DeviceConfig from "./DeviceConfig";
import {deviceAction} from "../BlockchainTransactions";
import {DEVICE} from "../config";



const toastOpt: ToastContainerProps = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  rtl: false,
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: true,
  newestOnTop: true,
}

const createLink = (tx: string, message: string) => {
  const href = `https://explorer.smartkeyplatform.io/testnet/tx/${tx}`
  return <a target="_blank" href={href}>{message}</a>
}

const App = (): ReactElement => {
  const [weather, setWeather] = useState(new Array(3).fill('none'))
  const [startDate, setStartDate] = useState(new Date())
  const [period, setPeriod] = useState(0)
  const [status, setStatus] = useState(false)
  const [days, setDays] = useState(1)
  const [startTimers, setStartTimers] = useState<NodeJS.Timeout[]>([])



  const runTimer = (start: boolean) => {
    deviceAction(DEVICE).then(r =>
      {
        toast.info(createLink(r, `Sprinkler turn on`))
        setTimeout(stopTimer, period * 1000)
        setStatus(start)
      }
    ).catch(r => toast.error(r))


  }

  const stopTimer = () => {
    deviceAction(DEVICE).then(r =>
      {
        toast.info(createLink(r, 'Sprinkler turn off'))
        setStatus(false)
      }
    ).catch(r => toast.error(r))
  }

  useEffect(() => {
    if (startDate.getTime() <= Date.now()) return;

    const isSun = weather.filter(item => item === 'sun').length === 3

    if(!startDate || !period) {
      return
    }

    if (!isSun && startTimers.length > 0) {
      toast.info('Weather changed. Turning off timers')
      startTimers.forEach(item => clearTimeout(item))
      setStartTimers([])
      return
    }

    if (!isSun) return;

    let fixedDate = new Date()

    if(startDate < new Date())
      fixedDate.setDate(startDate.getDate() + 1)
    else fixedDate = startDate

    if ((fixedDate.getTime() - Date.now()) > 0 )
    {
      const newTimers = Array(days).fill(0).map((item, index) => {
        const date = fixedDate.setDate(fixedDate.getDate() + index)
        const timer = date - new Date().getTime()
        toast.info(`Timer set at ${new Date(date)}`)
        return setTimeout(() => runTimer(true), timer)
      })

      startTimers.forEach(item => clearTimeout(item))
      setStartTimers(newTimers);
    }
  }, [days, startDate, period, weather])

  return (
    <div style={{ background: 'white', minHeight: '100%', minWidth: '100%' }}>
      <div style={{ minHeight: '60px', background: 'white', paddingLeft:'50px', paddingTop: '30px' }}>
          <div style= {{minWidth: '60%', marginRight: '40%'}}>
            <h1>Sprinkler Control Panel</h1>
          </div>
        <div style={{ marginLeft: '60%', float: 'left'}}>
          <p style={{ float: 'left', paddingTop: '5px', paddingRight: '8px'}}>status:  </p>
          <p style={{ background: 'yellowgreen', float: 'left', padding: '5px'}}>{status ? 'ON' : 'OFF'}</p>
        </div>
      </div>

      <div style={{minWidth:'500px'}}>
        <DeviceConfig
          startDate = {startDate}
          days = {days}
          period = {period}
          setDate = {setStartDate}
          setPeriod = {setPeriod}
          setDays = {setDays}
        />

        <WeatherSimulator
          active = {period > 0 && days > 0}
          weather = {weather}
          setWeather = {setWeather}
        />

      </div>
      <ToastContainer {...toastOpt}/>
    </div>
  )
}

export default App;
