function DtS(date){
    date_string = ""
    date_string += (date.getFullYear() - 1970) + " Years, "
    date_string += date.getMonth() + " Months, "
    date_string += date.getDay() + " Days, and "
    if(date.getUTCHours()<10) date_string += '0'
    date_string += date.getUTCHours()+":" ;
    if(date.getUTCMinutes()<10) date_string += '0'
    date_string += date.getUTCMinutes()+":"
    if(date.getUTCSeconds()<10) date_string += '0'
    date_string += date.getUTCSeconds()
    return date_string;
}
function register(){
    let lastDate = 0
    function updateDisplay() {
        $.get('get.php', (response,code)=>{
            let episode = JSON.parse( response.split('\n')[1])
            $('#title').html(episode.title).attr("href",episode.link)
            lastDate = episode.date;
        })
    }
    function updateClock(){
        let timediff = (new Date()).getTime() - (lastDate * 1000);
        let dateDiff = new Date(timediff);
        $('#timer').html(DtS(dateDiff))
    }
    updateDisplay()
    updateClock()
    setInterval(updateClock,1000)
    setInterval(updateDisplay,30000)

}

