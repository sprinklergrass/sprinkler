import {AUTH, BACKEND, CHAIN_ID, DAPP_ADDRESS, USER_SEED} from "./config";
import {IInvokeScriptParams, invokeScript} from "@waves/waves-transactions";

export const deviceAction = async (device: string) => {
  const script: IInvokeScriptParams = {
    call: {
      function: 'deviceAction',
      args: [{type: "string", value: device}]
    },
    dApp: DAPP_ADDRESS,
    fee: 500000,
    chainId: CHAIN_ID,
    payment: []
  }

  const response =  await fetchData(invokeScript(script, USER_SEED))
  if (response.status === 'ok') return response.body
  else throw new Error(response.body)
}


const fetchData = async (data: any) => {
  try {
    const response = await fetch(BACKEND, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        "Authorization": `Bearer ${AUTH}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    const body = await response.text()
    return {
      status: 'ok',
      body: body
    }
  } catch (e) {
    return {
      status: 'error',
      body: (e as any).message
    }
  }
}