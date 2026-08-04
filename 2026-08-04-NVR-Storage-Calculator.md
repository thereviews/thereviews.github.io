---
layout: page
title: NVR Storage Calculator
description: " Calculate exactly how much NVR storage you need. Estimate HDD size and recording retention based on camera count, resolution, FPS, compression (H.264/H.265), and recording mode."
permalink: NVR-Storage-Calculator 
---



<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<H2>NVR Storage Calculator</H2>

<style>
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Arial,Helvetica,sans-serif;
}

body{
    background:#f4f6f9;
    padding:40px 15px;
}

.container{
    max-width:700px;
    margin:auto;
    background:#fff;
    padding:30px;
    border-radius:10px;
    box-shadow:0 8px 20px rgba(0,0,0,.1);
}

h1{
    text-align:center;
    margin-bottom:10px;
}

p{
    text-align:center;
    color:#666;
    margin-bottom:30px;
}

.grid{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:20px;
}

@media(max-width:700px){
.grid{
grid-template-columns:1fr;
}
}

label{
    display:block;
    font-weight:bold;
    margin-bottom:6px;
}

input,select{
    width:100%;
    padding:10px;
    border:1px solid #ccc;
    border-radius:6px;
    font-size:15px;
}

button{
    width:100%;
    margin-top:30px;
    padding:14px;
    font-size:17px;
    background:#0078ff;
    color:white;
    border:none;
    border-radius:6px;
    cursor:pointer;
}

button:hover{
background:#005fd1;
}

.results{
    margin-top:30px;
    background:#f8f9fb;
    padding:20px;
    border-radius:8px;
}

.results h2{
margin-bottom:15px;
}

.result{
margin:10px 0;
font-size:18px;
}

.note{
margin-top:20px;
font-size:14px;
color:#666;
line-height:1.5;
}
</style>

</head>
<body>

<div class="container">

<h1>NVR Storage Calculator</h1>

<p>Estimate hard drive size and recording retention.</p>

<div class="grid">

<div>
<label>Number of Cameras</label>
<input type="number" id="cams" value="4" min="1">
</div>

<div>
<label>Resolution</label>
<select id="resolution">
<option value="4">1080P</option>
<option value="6">2K</option>
<option value="8">4K</option>
<option value="8">8MP</option>
</select>
</div>

<div>
<label>Frame Rate (FPS)</label>
<input type="number" id="fps" value="15">
</div>

<div>
<label>Compression</label>
<select id="codec">
<option value="1">H.264</option>
<option value="0.65">H.265</option>
<option value="0.50">H.265+</option>
</select>
</div>

<div>
<label>Recording Hours Per Day</label>
<input type="number" id="hours" value="24">
</div>

<div>
<label>Recording Type</label>
<select id="mode">
<option value="1">24/7 Recording</option>
<option value="0.30">Motion Recording (~30%)</option>
</select>
</div>

<div>
<label>Desired Retention (Days)</label>
<input type="number" id="days" value="30">
</div>

<div>
<label>Installed HDD Size (TB)</label>
<input type="number" id="installed" value="4">
</div>

</div>

<button onclick="calculate()">Calculate</button>

<div class="results">

<h2>Results</h2>

<div class="result">
Required Storage:
<strong><span id="required">-</span></strong>
</div>

<div class="result">
Estimated Retention:
<strong><span id="retention">-</span></strong>
</div>

<div class="note">
Calculations are estimates based on typical surveillance bitrates. Actual storage depends on scene complexity, camera settings, VBR/CBR, AI features, and manufacturer optimizations.
</div>

</div>

</div>

<script>

// Average Mbps at 15 FPS H.264
const baseBitrate={
4:4,
6:6,
8:8
};

function calculate(){

const cams=Number(document.getElementById("cams").value);

const res=Number(document.getElementById("resolution").value);

const fps=Number(document.getElementById("fps").value);

const codec=Number(document.getElementById("codec").value);

const hours=Number(document.getElementById("hours").value);

const mode=Number(document.getElementById("mode").value);

const days=Number(document.getElementById("days").value);

const installed=Number(document.getElementById("installed").value);

let bitrate=baseBitrate[res];

bitrate*=fps/15;

bitrate*=codec;

bitrate*=mode;

const totalMbps=bitrate*cams;

const totalMBps=totalMbps/8;

const storagePerDayGB=totalMBps*3600*hours/1024;

const requiredTB=(storagePerDayGB*days)/1024;

document.getElementById("required").innerHTML=
requiredTB.toFixed(2)+" TB";

const installedGB=installed*1024;

const retention=installedGB/storagePerDayGB;

document.getElementById("retention").innerHTML=
retention.toFixed(1)+" Days";

}

calculate();

</script>

</body>
</html>
