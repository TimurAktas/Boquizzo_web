import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    scales,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    scales,
    ChartDataLabels
);


export type GraphBarProps = {
    labels: String[] | undefined;
    dataSets: number[] | undefined;
};


export const GraphBar: React.FC<GraphBarProps> = ({labels,dataSets}) => {

    const options = { 
        responsive: true,
        scales: {
            x: {
                grid: {
                display: false,
                },
                display: true,
            },
            y: { 
                ticks: {
                display: false,
                beginAtZero: true,
                },
                grid: {
                display: false,
                drawBorder: false,
                
                },
                display: false,
            },
        },
        layout: {
            padding: {
                top: 40
            }
        },
    };
    
    const data:any = {
        labels,
        datasets: [{
            data: dataSets,
            backgroundColor: '#e2001a',
            datalabels: {
                color: 'black',
                anchor: 'end',
                align: 'top',
                offset: 10,
                labels: {
                    title: {
                        font: {
                        weight: 'bold',
                        }
                    },
                } 
            }
            },
        ],
        plugins: [ChartDataLabels],
    };
    return (
        <Bar options={options} plugins={[ChartDataLabels]} data={data} />
    )
}