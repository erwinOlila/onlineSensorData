var firebaseConfig = {
        apiKey: "AIzaSyA9Qtxo66LWPtAAvQFJ_EAjB2NTwKn2lDA",
        authDomain: "home-temperature-data-1ef85.firebaseapp.com",
        databaseURL: "https://home-temperature-data-1ef85-default-rtdb.firebaseio.com",
        projectId: "home-temperature-data-1ef85",
        storageBucket: "home-temperature-data-1ef85.appspot.com",
        messagingSenderId: "527187977802",
        appId: "1:527187977802:web:e9ff71fe661976cbb7a8b3",
        measurementId: "G-WDJD6JLPQX"
};

firebase.initializeApp(firebaseConfig);


var database = firebase.database();
var dataRef  = database.ref('/');
dataRef.limitToLast(20).get().then(function(snapshot){
    if (snapshot.exists()) {
        const data = snapshot.val();
        const keys = Object.keys(data);
        const vals = Object.values(data);
        plottData(keys, vals);
    }
    else {
        console.log("No data available");
    }
}).catch(function(error){
    console.error(error);
})

// dataRef.limitToLast(10).on('child_added', function(data) {
//     var sensor_data = {
//         date: data.key, value: data.val()
//     }
//     console.log(sensor_data.date + ': ' + sensor_data.value)
// })

function plottData(k, v) {
    var ctx = document.getElementById('myChart');
    const newLocal = 'cyan';
    var config = {
        type: 'line',
        data: {
            labels: k,
            datasets: [{
                label: 'Temperature',
                backgroundColor: 'red',
                borderColor: 'red',
                data: v,
                fill:false
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Sensor Data'
            },
            hover: {
                mode: 'nearest',
                intersect: true
            }
        }
    }
    var myChart = new Chart(ctx, config);

    dataRef.limitToLast(1).on('child_added', (snapshot) => {
        console.log(snapshot.key);
        const key = snapshot.key;
        const val = snapshot.val();

        if (config.data.labels.includes(key)) {
            console.log("already exists");
        } else {
            config.data.labels.push(key);
            config.data.datasets.forEach(function(dataset) {
                dataset.data.push(val);
            });
            myChart.update();
        }
    })
}





// var ctx = document.getElementById('myChart');
// var myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             borderColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         }
//     }
// });