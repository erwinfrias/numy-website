<?php
  header("Content-Type:text/html; charset=UTF-8");
  $para = 'contacto@erwcode.com';
  $titulo = "🧲 New Organic Lead from Numy's website";

  $cabeceras = 'MIME-Version: 1.0' . "\r\n";
  $cabeceras .= 'Content-type: text/html; charset=utf-8' . "\r\n";
  $cabeceras .= 'From: '.$_POST["contactEmailAddress"];


  $mensaje =
      '<html>'.
          '<head>
              <title>Numy Website Contact Page/title>
          </head>'.
          '<body>
            <p>👋 Hi, Numy!</p>
            <p>I have been looking for a good property on your website and I am interested in the following features.</p>'.
            '<h2>Property Information</h2>'.
            '<p>Inquiry Type: <strong>'.$_POST["type"].'</strong></p>'.
            '<p>Min Bedrooms: <strong>'.$_POST["contactMinBedrooms"].'</strong></p>'.
            '<p>Max Price: <strong>'.$_POST["contactMaxPrice"].'</strong></p>'.
            '<p>Property Details: <strong>'.$_POST["details"].'</strong></p>'.
            '<br>'.
            '<h2>Customer Information</h2>'.
            '<p>First Name: <strong>'.$_POST["contactFirstName"].'</strong></p>'.
            '<p>Last Name: <strong>'.$_POST["contactLastName"].'</strong></p>'.
            '<p>Email Address: <strong>'.$_POST["contactEmailAddress"].'</strong></p>'.
            '<p>Phone Number: <strong>'.$_POST["contactPhoneNumber"].'</strong></p>'.
            '<p>Regards!</p>'.
        '</body>'.
      '</html>';


  if (mail($para, $titulo, $mensaje, $cabeceras)){
      echo json_encode("Correo enviado, muchas gracias por contactarnos.");
  }else{
      echo json_encode('Falló el envio');
  }
?>
