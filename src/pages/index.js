import React, { useEffect, useState } from 'react';
import { Bar, Radar } from 'react-chartjs-2';

import Breadcrumb from '@/common/components/Breadcrumb';
import Card from '@/common/components/Card';
import MainLayout from '@/layouts/MainLayout';

const data = {
	labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
	datasets: [
		{
			label: 'My First dataset',
			backgroundColor: 'rgba(179,181,198,0.2)',
			borderColor: 'rgba(179,181,198,1)',
			pointBackgroundColor: 'rgba(179,181,198,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(179,181,198,1)',
			data: [65, 59, 90, 81, 56, 55, 40]
		},
		{
			label: 'My Second dataset',
			backgroundColor: 'rgba(255,99,132,0.2)',
			borderColor: 'rgba(255,99,132,1)',
			pointBackgroundColor: 'rgba(255,99,132,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(255,99,132,1)',
			data: [28, 48, 40, 19, 96, 27, 100]
		}
	]
};

const options = {
	scale: {
		ticks: { beginAtZero: true }
	}
};

const rand = () => Math.floor(Math.random() * 255);

const genData = () => ({
	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	datasets: [
		{
			type: 'line',
			label: 'Dataset 1',
			borderColor: `rgb(${rand()}, ${rand()}, ${rand()})`,
			borderWidth: 2,
			fill: false,
			data: [rand(), rand(), rand(), rand(), rand(), rand()]
		},
		{
			type: 'bar',
			label: 'Dataset 2',
			backgroundColor: `rgb(${rand()}, ${rand()}, ${rand()})`,
			data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
			borderColor: 'white',
			borderWidth: 2
		},
		{
			type: 'bar',
			label: 'Dataset 3',
			backgroundColor: `rgb(${rand()}, ${rand()}, ${rand()})`,
			data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()]
		}
	]
});

const options2 = {
	scales: {
		yAxes: [
			{
				ticks: {
					beginAtZero: true
				}
			}
		]
	}
};

const rand3 = () => Math.round(Math.random() * 20 - 10);

const data3 = {
	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	datasets: [
		{
			type: 'line',
			label: 'Dataset 1',
			borderColor: 'rgb(54, 162, 235)',
			borderWidth: 2,
			fill: false,
			data: [rand3(), rand3(), rand3(), rand3(), rand3(), rand3()]
		},
		{
			type: 'bar',
			label: 'Dataset 2',
			backgroundColor: 'rgb(255, 99, 132)',
			data: [rand3(), rand3(), rand3(), rand3(), rand3(), rand3(), rand3()],
			borderColor: 'white',
			borderWidth: 2
		},
		{
			type: 'bar',
			label: 'Dataset 3',
			backgroundColor: 'rgb(75, 192, 192)',
			data: [rand3(), rand3(), rand3(), rand3(), rand3(), rand3(), rand3()]
		}
	]
};

const data4 = {
	labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
	datasets: [
		{
			label: '# of Votes',
			data: [12, 19, 3, 5, 2, 3],
			backgroundColor: [
				'rgba(255, 99, 132, 0.2)',
				'rgba(54, 162, 235, 0.2)',
				'rgba(255, 206, 86, 0.2)',
				'rgba(75, 192, 192, 0.2)',
				'rgba(153, 102, 255, 0.2)',
				'rgba(255, 159, 64, 0.2)'
			],
			borderColor: [
				'rgba(255, 99, 132, 1)',
				'rgba(54, 162, 235, 1)',
				'rgba(255, 206, 86, 1)',
				'rgba(75, 192, 192, 1)',
				'rgba(153, 102, 255, 1)',
				'rgba(255, 159, 64, 1)'
			],
			borderWidth: 1
		}
	]
};

const options4 = {
	indexAxis: 'y',
	// Elements options apply to all of the options unless overridden in a dataset
	// In this case, we are setting the border of each horizontal bar to be 2px wide
	elements: {
		bar: {
			borderWidth: 2
		}
	},
	responsive: true,
	plugins: {
		legend: {
			position: 'right'
		},
		title: {
			display: true,
			text: 'Chart.js Horizontal Bar Chart'
		}
	}
};

const Home = () => {
	const [data2, setData2] = useState(genData());

	useEffect(() => {
		const interval = setInterval(() => setData2(genData()), 5000);

		return () => clearInterval(interval);
	}, []);

	return (
		<MainLayout>
			<div className="content-header py-3">
				<Breadcrumb>Dashboard</Breadcrumb>
			</div>
			<div className="content-body">
				<div className="row">
					<div className="col-sm-6">
						<Card header="Radar Chart">
							<Radar data={data} options={options} />
						</Card>
					</div>
					<div className="col-sm-6">
						<Card header="Crazy Chart">
							<Bar data={data2} options={options2} />
						</Card>
					</div>
					<div className="col-sm-6">
						<Card header="MultiType Chart">
							<Bar data={data3} />
						</Card>
					</div>
					<div className="col-sm-6">
						<Card header="Horizontal Bar Chart">
							<Bar data={data4} options={options4} />
						</Card>
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default Home;
