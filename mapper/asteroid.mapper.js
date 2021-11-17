module.exports = class AsteroidMapper {
  fromApi(data) {
    var result = [];
    const obj = data.near_earth_objects;

    for (const dateProp in obj) {
      if (obj.hasOwnProperty(dateProp)) {
        var arr = obj[dateProp];
        for (var i = 0; i < arr.length; i++) {
          result.push({
            referenceId: arr[i].neo_reference_id,
            name: arr[i].name,
            isPotentiallyHazardous: arr[i].is_potentially_hazardous_asteroid,
            date: dateProp,
            nasaJplUrl: arr[i].nasa_jpl_url,
          });
        }
      }
    }

    return result;
  }
};
