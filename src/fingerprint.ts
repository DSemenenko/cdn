import { v4 as uuidV4 } from 'uuid'
import { sendCollectedData, collectInputData } from './helpers'
import { getCookie, setCookie } from './utils'

window.addEventListener('DOMContentLoaded', async () => {
  import('@/libs/browser-finger-print').then(({ getBrowserFingerprint }) => {
    const visitID = getCookie('visitID')
    const { fingerprintID, fingerprintData } = getBrowserFingerprint()
    setCookie('fingerprintID', fingerprintID, 30)
    if (!visitID) {
      setCookie('visitID', uuidV4(), 1)
    }

    sendCollectedData({
      visitID,
      fingerprintID,
      fingerprintData,
      Location: window.location,
    })

    const fingerprintElement = document.getElementById('fingerprint-id');
    if (fingerprintElement) {
      fingerprintElement.textContent = fingerprintID;
    } else {
      console.error('Element with id "fingerprint-id" not found.');
    }


    document.querySelectorAll('form').forEach((form) => {
      form.querySelectorAll('input').forEach((input) => {
        input.addEventListener('blur', () => {
          const data = collectInputData(form)
          const visitID = getCookie('visitID')

          sendCollectedData({
            visitID,
            fingerprintID,
            collectedInputData: data,
            Location: window.location,
          })
        })
      })
    })
  })
})
