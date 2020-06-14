<?php
$cache_file = "cache.txt";

function get_HI_xml(){
$url = "http://www.hellointernet.fm/podcast?format=rss";
$curl = curl_init($url);
curl_setopt_array($curl,
    array(
        CURLOPT_HTTPHEADER => array("Host: www.hellointernet.fm",
                                    "User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36",
                                    "Accept: text/html,application/xhtml+xml,application/xml"),
        CURLOPT_RETURNTRANSFER => TRUE
    )
);
$result = curl_exec($curl);
curl_close($curl);
return $result;
}

$time = time();
$resp = "";
if(
    !file_exists($cache_file) ||
    ((60+explode( "\n" ,file_get_contents($cache_file))[0]))<$time
){
    $xml = simplexml_load_string(get_HI_xml());
    $lastPod = $xml->channel->item[0];
    $date = strtotime($lastPod->pubDate);
    $title = $lastPod->title;
    $link = $lastPod->link;

    $resp .= "$time\n{\"date\":$date,\"title\":\"$title\",\"link\":\"$link\"}";
    file_put_contents ($cache_file,$resp);
}else{
    $resp .= file_get_contents($cache_file);
}



echo $resp;
?>