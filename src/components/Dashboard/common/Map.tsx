import * as React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import map from "../../../services/mapData";

import HighchartsMap from "highcharts/modules/map";

HighchartsMap(Highcharts);


const options: Highcharts.Options = {
    series: [{
        type: 'map',
        mapData: map,
        zones: [{
            value: 2,
            color: '#f7a35c'
        }]
    }],
    tooltip: {
        headerFormat: '',
        formatter: function () {
            const country = this.point;
            const info = `The value for ${country.name} is ${country.value}`
            return info;
        }
    }
}
export default function HighchartsTest(props: HighchartsReact.Props): JSX.Element {
    return (
        <div>
            <HighchartsReact
                constructorType={"mapChart"}
                highcharts={Highcharts}
                options={options}
                {...props}
            />
        </div>
    )
}