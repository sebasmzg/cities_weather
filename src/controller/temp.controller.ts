export async function getColorByTemp(temp:number): Promise<string> {
    const adjustedTemp = temp - 273.15;
    switch (true) {
        case adjustedTemp >= 0 && adjustedTemp < 15:
            return 'blue';
        case adjustedTemp >= 15 && adjustedTemp < 25:
            return 'green';
        case adjustedTemp >= 25 && adjustedTemp < 30:
            return 'yellow';
        case adjustedTemp >= 30:
            return 'red';
        default:
            return 'white';
    }
}
