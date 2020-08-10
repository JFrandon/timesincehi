function DtS(now, then){
	let year = now.getFullYear() - then.getFullYear();
	let month = now.getMonth() - then.getMonth();
	let day = now.getDate() - then.getDate();
	let hours = now.getUTCHours() - then.getUTCHours();
	let min = now.getUTCMinutes() - then.getUTCMinutes();
	let sec = now.getUTCSeconds() - then.getUTCSeconds();
	if(sec<0){min--;sec+=60}
	if(min<0){hours--;min+=60}
	if(hours<0){day--;hours+=24}
	if(day<0){month--;day+=((new Date(year, month, 0)).getDate())}
	if(month<0){year--;month+=12}
    date_string = ""
    date_string += year + " Years, "
    date_string += month + " Months, "
    date_string += day + " Days, and "
    if(hours<10) date_string += '0'
    date_string += hours+":" ;
    if(min<10) date_string += '0'
    date_string += min+":"
    if(sec<10) date_string += '0'
    date_string += sec
    return date_string;
}
function register(){
    let lastDate = new Date();
    function updateDisplay() {
        $.get('get.php', (response,code)=>{
            let episode = JSON.parse( response.split('\n')[1])
            $('#title').html(episode.title).attr("href",episode.link)
            lastDate = new Date(episode.date * 1000);
        })
    }
    function updateClock(){
        let now = new Date();
        $('#timer').html(DtS(now, lastDate))
    }
    updateDisplay()
    updateClock()
    setInterval(updateClock,1000)
    setInterval(updateDisplay,30000)

}

