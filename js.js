$.getJSON("data.json", function(trip) {
    const name = trip[0]['client'];
    const tripTitle = trip[0]['trip'];
    const duration = parseInt(trip[trip.length - 1]['day']);
    const endDate = addDay(new Date(trip[0]['start']), duration - 1);
    const tip = trip[0]['tip'];

    $('trip').text(`${name}'s Itinerary to ${tripTitle}`);
    $('timeline').text(`${obtainDate(new Date(trip[0]['start']))} - ${obtainDate(endDate)}`);
    $('tip > p').text(`${tip}`);

    let main = '';
    for (let i = 0; i < duration; i++) {
        const currentDate = addDay(new Date(trip[0]['start']), i);
        const dayTitle = trip.find(rec => rec['day'] === i + 1)['title'];
        const html = `<day class="row-align">
                    <date class="row-align column-align">
                        <h1>Day ${i + 1}</h1>
                        <p>${obtainWeekday(currentDate)}</p>
                        <p>${obtainDate(currentDate)}</p>
                    </date>
                    <section>
                        <h2>${dayTitle}</h2>
                        <ul>` + obtainDesc(i + 1) + `</ul></section></day>`;
        main += html;
    }
    $('main').empty().append(main);

    function obtainDate(d) {
        const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        return`${d.getDate()} ${month[d.getMonth()]} ${d.getFullYear()}`;
    }

    function addDay(d, days) {
        d.setDate(d.getDate() + days);
        return d;
    }

    function obtainWeekday(d) {
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        return weekday[d.getDay()];
    }

    function obtainDesc(day) {
        const arr = trip.filter(rec => rec['day'] === day);
        let html = '';
        for (let i = 0; i < arr.length; i++) {
            html +=`<li class="row-align"><img src="assets/${arr[i]['category']}.svg">
                        <p>${arr[i]['description']}</p></li>`
        }
        return html;
    }
});
