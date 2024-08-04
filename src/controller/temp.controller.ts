export async function getColorByTemp(temp:number): Promise<string> {
    const adjustedTemp = temp - 273.15;
    switch (true) {
        case adjustedTemp >= 0 && adjustedTemp < 17:
            return 'blue';
        case adjustedTemp >= 17 && adjustedTemp < 26:
            return 'green';
        case adjustedTemp >= 26 && adjustedTemp < 30:
            return 'yellow';
        case adjustedTemp >= 30:
            return 'red';
        default:
            return 'white';
    }
}
