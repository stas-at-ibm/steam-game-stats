export const eldenRingHttpDetailsSteamcharts = `<!DOCTYPE html>
<html lang="en">
<head>

<meta charset="utf-8">
<title>ELDEN RING - Steam Charts</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="An ongoing analysis of Steam&#39;s player numbers, seeing what&#39;s been played the most.">
<meta property="twitter:account_id" content="4503599630058963">

<meta name="twitter:site" content="@steamcharts"><meta name="twitter:title" content="ELDEN RING - Steam Charts"><meta name="twitter:url" content="http://steamcharts.com/app/1245620">
<script async src="https://kumo.network-n.com/dist/app.js" site="steam-charts"></script>
<link href="/assets/style-9826f406.css" rel="stylesheet">
<script src="/assets/script-88db269a.js"></script>	

<link rel="shortcut icon" href="/assets/favicon.ico">


</head>

<body>


<div id="nn_skinl"></div>
<div id="nn_skinr"></div>


<div id="content-wrapper">
	<div id="header">
		<a id="logo" href="/"><span id="logo-steam">STEAM</span><span id="logo-charts">CHARTS</span></a>
		&nbsp;&nbsp;
		<i>An ongoing analysis of Steam's concurrent players.</i>
		<div style="float: right">
			<form action="/search/" id="search" class="inline" role="search">
				<input type="text" name="q" placeholder="search games">
			</form>
		</div>
	</div>
	
	<h1 id="app-title"><a href="">ELDEN RING</a></h1>
<div id="app-links">
	<a href="http://store.steampowered.com/app/1245620/">Store</a>
	|
	<a href="http://steamcommunity.com/app/1245620">Hub</a>
</div>
<div id="app-heading" class="content">
	<img class="app-image"
		src="/assets/steam-images/1245620.jpg"
		alt="ELDEN RING"
		width="184" height="69">
	<div class="app-stat"> 
		<span class="num">121861</span>
		<br>playing <abbr class="timeago" title="2022-05-04T14:01:19Z"></abbr>
	</div>
	<div class="app-stat"> 
		<span class="num">139192</span>
		<br>24-hour peak
	</div>
	<div class="app-stat"> 
		<span class="num">952523</span>
		<br>all-time peak
	</div>
</div>



<div id="app-hours-content" class="content">
	<div id="app-longterm-chart">
	</div>
	<div style="float: right; margin: 0; padding: 0">
		<a href="/cmp/1245620">Compare with others...</a>
	</div>
</div>
<div class="ad720">
	<div id="nn_lb1"></div>
</div>
<div class="content">
	<table class="common-table">
		<thead>
			<tr>
				<th class="left">Month</th>
				<th class="right">Avg. Players</th>
				<th class="right">Gain</th>
				<th class="right">% Gain</th>
				<th class="right">Peak Players</th>
			</tr>
		</thead>
		<tbody>
			<tr class="odd">
				<td class="month-cell left italic">Last 30 Days</td>
				<td class="right num-f italic">189565.76</td>
				<td class="right num-p gainorloss italic">-21903.1</td>
				<td class="right gainorloss italic">-10.36%</td>
				<td class="right num italic">367192</td>
			</tr>
			
			<tr >
				
				<td class="month-cell left">
					April 2022
				</td>
				
				<td class="right num-f">211468.89</td>
				<td class="right num-p gainorloss">-310597.48</td>
				<td class="right gainorloss">-59.49%</td>
				<td class="right num">457067</td>
			</tr>
			
			<tr class="odd">
				
				<td class="month-cell left">
					March 2022
				</td>
				
				<td class="right num-f">522066.37</td>
				<td class="right num-p gainorloss">-</td>
				<td class="right gainorloss">-</td>
				<td class="right num">952523</td>
			</tr>
			
		</tbody>
	</table>
</div>

<script>
	d3.selectAll('.num').text(app.formatText);
	d3.selectAll('.num-f').text(app.formatF1Text);
	d3.selectAll('.num-p').text(app.formatPlusText);
	d3.selectAll('.gainorloss').classed('gain',
	function() { var text = this.textContent; return (text.length > 1 && text[0] == '+');})
		.classed('loss',
	function() { var text = this.textContent; return (text.length > 1 && text[0] == '-');});

	$('abbr.timeago').timeago();

	$.getJSON('/app/1245620/chart-data.json', function(data) {
		app.gameChart('app-longterm-chart', ["ELDEN RING"], [data]);
	});
</script>

<div>
	<div style="float: left; width:410px">
		
	<a class="twitter-timeline" href="https://twitter.com/steamcharts" data-widget-id="518237975872684032">Tweets by @steamcharts</a>
	<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
	</div>
	<div style="float: right">
		<div id="nn_mpu1"></div>
	</div>
	<div style="clear:both">
	</div>
</div>
<div id="footer">

	
	<a href="/about">About</a>
	| <a href="/privacy">Privacy</a>
	| <a href="/ads">Advertise</a>
</div>

	<div id="closing">
		All data is <a href="http://steampowered.com">powered by Steam</a>. Not affiliated with Valve in any way. All trademarks are property of their respective owners in the US and other countries. Our goal is to provide unique insight into gaming trends. &copy; steamcharts.com
	</div>
</div>

<script type="text/javascript">
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
</script>

<script type="text/javascript">
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
 (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
 m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
 })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-2224718-9', 'steamcharts.com');
ga('create', 'UA-31105670-10', 'auto', {'name': 'pcn'});
ga('send', 'pageview');
ga('pcn.send', 'pageview');
</script>

</body>
</html>`;