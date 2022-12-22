import axios from "axios";
class mapData {
    baseUrl = "https://code.highcharts.com/mapdata/";

    getWorld = async () => {
        return await axios.get(this.baseUrl + "countries/us/us-all.geo.json");
    };
}

export default mapData;