
function scrapeMonthNumber (dateValue: string) {
    return dateValue.slice(5,7)
}

function formatHeatVals(heatValues: any) {
    let newArr: any[] = [];
    heatValues &&
      heatValues.forEach((heatPoint: any) => {
        let newpt = {
          location: new google.maps.LatLng(heatPoint.lat, heatPoint.lng),
          weight: heatPoint.weight,
        };
        newArr.push(newpt);
      });

    return newArr;
  }

export { scrapeMonthNumber, formatHeatVals };