// Import Node.js core modules
const http = require('http');
const fs = require('fs');
const path = require('path');

// Function to handle file upload
function handleFileUpload(req, res) {
  if (req.method === 'POST' && req.url === '/upload') {
      let body = '';
      req.on('data', chunk => {
          body += chunk.toString();
      });
      req.on('end', () => {
          const boundary = req.headers['content-type'].split('; ')[1].split('=')[1];
          const parts = body.split('--' + boundary);
          const filePart = parts[1];
          const contentDisposition = filePart.split('\r\n')[1];
          const filename = contentDisposition.split('; ')[2].split('=')[1].replace(/"/g, '');
          const fileContent = filePart.split('\r\n\r\n')[1].split('\r\n--')[0];

          // Save the uploaded file
          const filePath = path.join(__dirname, filename);
          fs.writeFile(filePath, fileContent, 'binary', err => {
              if (err) {
                  res.writeHead(500, { 'Content-Type': 'text/plain' });
                  res.end('Internal Server Error');
                  return;
              }

              // Display file information
              res.writeHead(200, { 'Content-Type': 'text/html' });
              res.end(`
                  <html lang="en">
                  <head>
                      <title>File Upload</title>
                      <meta charset="utf-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1">
                      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
                      <style>
                          .fakeimg { height: 200px; background: #dfdfdf; }
                          .title-bg { background-color: #6f8469; }
                          .nav-bg { background-color: #131313f4; }
                      </style>
                  </head>
                  <body>
                      
  <nav class="navbar navbar-expand-sm nav-bg navbar-dark">
    <div class="container-fluid">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" href="http://localhost:8010" id="profileLink">Profile</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-bs-toggle="dropdown">
            Professional
          </a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="http://localhost:8000/portfolio">Portfolio</a>
            <a class="dropdown-item" href="http://localhost:8000/article1">Article 1</a>
            <a class="dropdown-item" href="http://localhost:8010" id="article2">Article 2</a>
            <a class="dropdown-item" href="http://localhost:8010" id="article3">Article 3</a>
            <a class="dropdown-item" href="http://localhost:8010" id="articleCalculator">Article 4</a>
            <a class="dropdown-item" href="http://localhost:3010">Article 5</a>
            <a class="dropdown-item" href="http://localhost:8010" id="jobOrderLink">Services</a>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="http://localhost:8010" id="photoAlbumLink">Photo Album</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="http://localhost:8010" id="bankingInfoLink">Banking Info</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="http://localhost:8010" id="personalPicturesLink">Personal Pictures</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="http://localhost:8000/upload" >File Upload</a>
        </li>
      </ul>
    </div>
  </nav>

                      <div class="p-5 title-bg text-white text-center">
                              <h1>Kenan A. Banal</h1>
    <p>Hello! I'm Kenan A. Banal, a 2024 Undergraduate Student at De La Salle University, Manila, Philippines</p>
                      </div>
                      <div class="container mt-5">
                          <h2>Done Uploading</h2>
                          <p>Filename: ${filename}</p>
                          <p>File Path: ${filePath}</p>
                          <p>File Size: ${fileContent.length} bytes</p>
                          <a href="http://localhost:8000/upload" class="btn btn-success">Upload Another File</a>
                      </div>
                      <br><br><br><br><br><br>
       <br><br><br><br><br><br>
       <br><br><br><br>
<div class="mt-5 p-4 bg-dark text-white text-center">
  <p>This content is protected under international copyright laws. 
    No part of this publication may be reproduced, distributed, or transmitted in 
    any form or by any means, including photocopying, recording, or other electronic or
     mechanical methods, without the prior written permission of the publisher, except in
      the case of brief quotations embodied in critical reviews and certain other noncommercial uses permitted by copyright law.
    For permission requests, please contact kenanbanal@gmail.com</p>
</div>
                  </body>
                  </html>
              `);
          });
      });
  } else {
      // Serve the upload form
      fs.readFile('./index.html', (err, data) => {
          if (err) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Internal Server Error');
              return;
          }

          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data);
      });
  }
}


// Create web server
const server = http.createServer(function (req, res) {
    // Serve the index.html file for the root URL
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), function (err, data) {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.write('Internal Server Error');
                res.end();
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                res.end();
            }
        });
    } else if (req.url === '/upload' && req.method === 'POST') {
      handleFileUpload(req, res);
  } else if (req.url === '/portfolio') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`
<html lang="en">
<head>
  <title>Kenan A. Banal - Portfolio</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <style>
    .fakeimg {
      height: 200px;
      background: #dfdfdf;
    }
    .title-bg {
      background-color: #6f8469;
    }
    .nav-bg {
      background-color: #131313f4;
    }
    .fakeimg {
        height: 200px;
        background: #dfdfdf;
      }
      .title-bg {
        background-color: #6f8469;
      }
      .nav-bg {
        background-color: #131313f4;
      }
    
      /* General Section Padding */
      .container .row {
        margin-bottom: 2rem; /* Adds bottom margin to create space between rows */
      }
      
      .container .col-sm-4, 
      .container .col-sm-8 {
        padding: 1rem; /* Adds padding inside each column */
      }
    
      /* Specific Section Padding */
      #contentContainer .row:nth-of-type(1) .col-sm-8,
      #contentContainer .row:nth-of-type(1) .col-sm-4,
      #contentContainer .row:nth-of-type(2) .col-sm-8,
      #contentContainer .row:nth-of-type(2) .col-sm-4,
      #contentContainer .row:nth-of-type(3) .col-sm-8,
      #contentContainer .row:nth-of-type(3) .col-sm-4,
      #contentContainer .row:nth-of-type(4) .col-sm-8,
      #contentContainer .row:nth-of-type(4) .col-sm-4,
      #contentContainer .row:nth-of-type(5) .col-sm-8,
      #contentContainer .row:nth-of-type(5) .col-sm-4,
      #contentContainer .row:nth-of-type(6) .col-sm-8,
      #contentContainer .row:nth-of-type(6) .col-sm-4 {
        padding-top: 1rem; /* Adds top padding to the content in each section */
        padding-bottom: 1rem; /* Adds bottom padding to the content in each section */
      }
    
      /* Optional: Additional spacing for headings */
      .container h2 {
        margin-bottom: 1rem; /* Adds space below headings */
      }
  </style>
</head>
<body>
  <nav class="navbar navbar-expand-sm nav-bg navbar-dark">
    <div class="container-fluid">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" href="http://localhost:8010" id="profileLink">Profile</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-bs-toggle="dropdown">Professional</a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="http://localhost:8000/portfolio">Portfolio</a>
            <a class="dropdown-item" href="http://localhost:8000/article1">Article 1</a>
            <a class="dropdown-item" href="http://localhost:8010" id="article2">Article 2</a>
            <a class="dropdown-item" href="http://localhost:8010" id="article3">Article 3</a>
            <a class="dropdown-item" href="http://localhost:8010" id="articleCalculator">Article 4</a>
            <a class="dropdown-item" href="http://localhost:3010">Article 5</a>
            <a class="dropdown-item" href="http://localhost:8010" id="jobOrderLink">Services</a>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="http://localhost:8010" id="photoAlbumLink">Photo Album</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="http://localhost:8010" id="bankingInfoLink">Banking Info</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="http://localhost:8010" id="personalPicturesLink">Personal Pictures</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="http://localhost:8000/upload">File Upload</a>
        </li>
      </ul>
    </div>
  </nav>

  <div class="p-5 title-bg text-white text-center">
    <h1>Kenan A. Banal</h1>
    <p>Hello! I'm Kenan A. Banal, a 2024 Undergraduate Student at De La Salle University, Manila, Philippines</p>
  </div>

  <div class="container mt-5" id="contentContainer">
    <!-- Contact Information -->
    <div class="row">
        <div class="col-sm-8">
        <h2>Contact Information</h2>
        <p><strong>Address:</strong> 9 Cityview Street, Citylane Townhomes, Barangay Oranbo, Pasig City</p>
        <p><strong>Phone:</strong> (02) 6374662 | +63662131937</p>
        <p><strong>Email:</strong> kenan_banal@dlsu.edu.ph</p>
        </div>
        <div class="col-sm-4">
            <img src="Kenan.jpg" alt="Image of Kenan" width="200" height="200">
        </div>
    </div>

    <!-- Objective Section -->
    <div class="row">
        <div class="col-sm-4">
        <h2>Objective</h2>
        </div>
        <div class="col-sm-8">
            <p>To join an organization where I can use my skills in personnel administration and attain a high level of performance in personnel recruitment and training.</p>
        </div>
    </div>

    <!-- Education Section -->
    <div class="row">
        <div class="col-sm-4">
            <h2>Education</h2>
            <p> <strong>2025: DE LA SALLE UNIVERSITY COLLEGE</strong> </p>
            <p> <strong>2021: LA SALLE GREEN HILLS HIGH SCHOOL</strong> </p>
            
        </div>
        <div class="col-sm-8">
            <br><br>
            <p> College Diploma, BS in Computer Engineering </p>
            <p> High School Diploma, STEM </p>
            
        </div>
    </div>

    <!-- Work Experience Section -->
    <div class="row">
        <div class="col-sm-4">
            <h2>Work Experience</h2>
            <p> <strong>January 2020: GALILEO PH</strong> </p>
        </div>
        <div class="col-sm-8">
          <br><br>
            <p>Learned the basics of writing code in Java and C++ and the simple principles in business and marketing.</p>
        </div>
    </div>

    <!-- Co-Curricular Activities Section -->
    <div class="row">
        <div class="col-sm-4">
            <h2>Co-Curricular Activities</h2>
            <p> <strong>2023-2024: ACCESS OFFICER</strong> </p>
            <p> <strong>2018-2020: NETIZENS CLUB</strong> </p>
        </div>
        <div class="col-sm-8">
          <br><br>
          <p>Involved with making reviewers and was a project head of an online seminar named The Art of Programming Design Pattern.</p>
            <p>Used different internet sites and tested various programs and websites. Learned basic coding in Java and tested these programs on a personal computer.</p>
          </div>
    </div>

    <!-- Accomplishments Section -->
    <div class="row">
        <div class="col-sm-4">
            <h2>Accomplishments</h2>
            <p> <strong>2023:</strong></p>
            <p> <strong>2021:</strong> </p>
        </div>
        <div class="col-sm-8">
          <br><br>
          <p> Jose Rizal Second Honors Certificate 1st Trimester AY 2023-2024</p>
          <p> Br. Rafael S. Donato FSC General Academic Excellence Awards with High Honors, Br. Francis Cody FSC Exemplary Conduct Award, Loyalty Award.</p>
    </div>

    <!-- Research Papers Prepared Section -->
    <div class="row">
        <div class="col-sm-4">
            <h2>Research Papers Prepared</h2>
            <p> <strong>August 2024: Development of Cow Milking Control System with Milk Tank Level Indicator</strong></p>
            <p> <strong>May 2021: Kinetic Energy Harvesting in Vehicular Traffic through Rumble Strips</strong> </p>
        </div>
        <div class="col-sm-8">
          <br><br>
          <p> Cow Milking Control system with a Milk Tank Level Indicator that makes use of an Arduino board, 1 temperature sensor, 4 DC motors, 4 relays, 4 IR sensors, a 20x4 LCD, an ultrasonic sensor, and a ULN2003A motor driver. </p>
            <p>Estimated a utility function discussing the probabilities of high school graduates applying and studying at DLSU, being admitted, and accepting DLSU’s offer.</p>
    </div>

    <!-- Personal Background Section -->
    <div class="row">
        <div class="col-sm-4">
            <h2>Personal Background</h2>
        </div>
        <div class="col-sm-8">
            <p>Born on May 2, 2003, in Mandaluyong City, Philippines. Fluent in English and Filipino. Interests include basketball, volleyball, and sketching food. Capabilities include video editing, Microsoft Office (PowerPoint, Excel, Word), Canvas, familiar with most programming languages, and basic drawings. Adaptable, goal-oriented, and quality-oriented.</p>
       </div>
    </div>
  </div>
 </div>
 </div>
  <div class="mt-5 p-4 bg-dark text-white text-center">
    <p>This content is protected under international copyright laws. No part of this publication may be reproduced, distributed, or transmitted in any form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior written permission of the publisher, except in the case of brief quotations embodied in critical reviews and certain other noncommercial uses permitted by copyright law. For permission requests, please contact kenanbanal@gmail.com</p>
  </div>
</body>
</html>
          `);
        res.end();
    } else if (req.url === '/article1') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`
<html lang="en">
<head>
  <title>Bootstrap 5 Website Example</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
  <style>
    .fakeimg {
      height: 200px;
      background: #dfdfdf;
    }
    .title-bg {
      background-color: #6f8469; /* Change to your desired color */
    }
    .nav-bg {
      background-color: #131313f4
    }
    .video-container {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    height: 0;
    overflow: hidden;
    max-width: 100%;
    background: #000;
  }
  .video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
  </style>
</head>
            <body>
             <nav class="navbar navbar-expand-sm nav-bg navbar-dark">
    <div class="container-fluid">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" href="http://localhost:8010" id="profileLink">Profile</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-bs-toggle="dropdown">
            Professional
          </a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="http://localhost:8000/portfolio">Portfolio</a>
            <a class="dropdown-item" href="http://localhost:8000/article1">Article 1</a>
            <a class="dropdown-item" href="http://localhost:8010" id="article2">Article 2</a>
            <a class="dropdown-item" href="http://localhost:8010" id="article3">Article 3</a>
            <a class="dropdown-item" href="http://localhost:8010" id="articleCalculator">Article 4</a>
            <a class="dropdown-item" href="http://localhost:3010">Article 5</a>
            <a class="dropdown-item" href="http://localhost:8010" id="jobOrderLink">Services</a>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="http://localhost:8010" id="photoAlbumLink">Photo Album</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="http://localhost:8010" id="bankingInfoLink">Banking Info</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="http://localhost:8010" id="personalPicturesLink">Personal Pictures</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="http://localhost:8000/upload" >File Upload</a>
        </li>
      </ul>
    </div>
  </nav>
<div class="p-5 title-bg text-white text-center">
  <h1>Kenan Banal</h1>
  <p>Hello! I'm Kenan Banal, a 2024 Undergraduate Student at De La Salle University, Manila, Philippines</p>
</div>
<div class="container mt-5" id="contentContainer">
<div class="row">
      <div class="col-sm-4">
      <h2>ARTICLE 1: Video</h2>
      <h5>Date: Dec 7, 2021</h5>
      <p>This is a video that I liked in my childhood and I hope you like it too.</p>
      <p>The title of this YouTube video is Potter Puppet Pals: The Mysterious Ticking Noise.</p>
      </div>
       <div class="col-sm-8">.
       
      <div class="video-container">
  <iframe src="https://www.youtube.com/embed/Tx1XIm6q4r4?si=9dYGya9qseW0DdFS" frameborder="0" allowfullscreen></iframe>
</div>
       
       </div>
      </div>
      <br> <br> <br>
</div>

<div class="mt-5 p-4 bg-dark text-white text-center">
  <p>This content is protected under international copyright laws. 
    No part of this publication may be reproduced, distributed, or transmitted in 
    any form or by any means, including photocopying, recording, or other electronic or
     mechanical methods, without the prior written permission of the publisher, except in
      the case of brief quotations embodied in critical reviews and certain other noncommercial uses permitted by copyright law.
    For permission requests, please contact kenanbanal@gmail.com</p>
</div>

            </body></html>`);
        res.end();
    } 
else if (req.url === '/upload') {
  
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(`
                <html lang="en">
<head>
  <title>Bootstrap 5 Website Example</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="https://www.gstatic.com/charts/loader.js"></script>
  <style>
    .fakeimg {
      height: 200px;
      background: #dfdfdf;
    }
    .title-bg {
      background-color: #6f8469; /* Change to your desired color */
    }
    .nav-bg {
      background-color: #131313f4
    }
  </style>
</head>
            <body>
            <nav class="navbar navbar-expand-sm nav-bg navbar-dark">
    <div class="container-fluid">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" href="http://localhost:8010" id="profileLink">Profile</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-bs-toggle="dropdown">
            Professional
          </a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="http://localhost:8000/portfolio">Portfolio</a>
            <a class="dropdown-item" href="http://localhost:8000/article1">Article 1</a>
            <a class="dropdown-item" href="http://localhost:8010" id="article2">Article 2</a>
            <a class="dropdown-item" href="http://localhost:8010" id="article3">Article 3</a>
            <a class="dropdown-item" href="http://localhost:8010" id="articleCalculator">Article 4</a>
            <a class="dropdown-item" href="http://localhost:3010">Article 5</a>
            <a class="dropdown-item" href="http://localhost:8010" id="jobOrderLink">Services</a>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="http://localhost:8010" id="photoAlbumLink">Photo Album</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="http://localhost:8010" id="bankingInfoLink">Banking Info</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="http://localhost:8010" id="personalPicturesLink">Personal Pictures</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="http://localhost:8000/upload" >File Upload</a>
        </li>
      </ul>
    </div>
  </nav>
<div class="p-5 title-bg text-white text-center">
  <h1>Kenan Banal</h1>
  <p>Hello! I'm Kenan Banal, a 2024 Undergraduate Student at De La Salle University, Manila, Philippines</p>
</div>
<div class="container mt-5" id="contentContainer">
<div class="row">
      <div class="col-sm-6">
      
      <h2>UPLOAD A FILE</h2>
      <h5>Date: Feb 4, 2021</h5>
      <p>Here is a demonstration of uploading a file in Node.js which would also display the information of the uploaded file.
      </p>
      <p>The information that would be displayed includes
      The file name, file path, and file size in bytes
      </p>
      
      </div>
       <div class="col-sm-6">.
       
       
    <form action="/upload" method="post" enctype="multipart/form-data">
    <input type="file" name="uploadedFile" required>
    <button type="submit" class="btn btn-success">Upload</button>
</form>

       </div>
      </div>
</div>
<br><br><br><br><br><br>
       <br><br><br><br><br><br>
       <br><br><br><br>
<div class="mt-5 p-4 bg-dark text-white text-center">
  <p>This content is protected under international copyright laws. 
    No part of this publication may be reproduced, distributed, or transmitted in 
    any form or by any means, including photocopying, recording, or other electronic or
     mechanical methods, without the prior written permission of the publisher, except in
      the case of brief quotations embodied in critical reviews and certain other noncommercial uses permitted by copyright law.
    For permission requests, please contact kenanbanal@gmail.com</p>
</div>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script type="text/javascript">
      // Load the Google Charts library
      google.charts.load('current', { packages: ['corechart'] });

      // Callback to draw the charts once the Google Charts library is loaded
      google.charts.setOnLoadCallback(drawCharts);

      function drawCharts() {
        // Fetch the data using AJAX
        $.getJSON('data.json', function (data) {
          drawBarChart(data.barChart);
          drawPieChart(data.pieChart);
          drawLineChart(data.lineChart);
        });
      }

      function drawBarChart(data) {
        var dataTable = google.visualization.arrayToDataTable(data);
        var options = {
          title: 'Bar Chart Example',
          hAxis: { title: 'Year' },
          vAxis: { title: 'Sales' },
        };
        var chart = new google.visualization.ColumnChart(document.getElementById('bar_chart'));
        chart.draw(dataTable, options);
      }

      function drawPieChart(data) {
        var dataTable = google.visualization.arrayToDataTable(data);
        var options = {
          title: 'Pie Chart Example',
        };
        var chart = new google.visualization.PieChart(document.getElementById('pie_chart'));
        chart.draw(dataTable, options);
      }

      function drawLineChart(data) {
        var dataTable = google.visualization.arrayToDataTable(data);
        var options = {
          title: 'Line Chart Example',
          hAxis: { title: 'Year' },
          vAxis: { title: 'Sales' },
        };
        var chart = new google.visualization.LineChart(document.getElementById('line_chart'));
        chart.draw(dataTable, options);
      }
    </script>
            </body></html>`);
            handleFileUpload(req, res);
  res.end();
} else if (req.url === '/Kenan.jpg') {
  // Serve the Kenan.jpg image
  const imgPath = path.join(__dirname, 'Kenan.jpg');
  fs.readFile(imgPath, function (err, data) {
      if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.write('Not Found');
          res.end();
      } else {
          res.writeHead(200, { 'Content-Type': 'image/jpeg' });
          res.end(data);
      }
  });
}  else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Invalid Request!');
        res.end();
    }
});

// Server object listens on port 8000
server.listen(8000, () => console.log('Server running on http://localhost:8000'));
