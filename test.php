<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>attributeContainsWord demo</title>
  <script src="https://code.jquery.com/jquery-3.5.0.js"></script>
</head>
<body>
 
<input name="man-news">
<input name="milk man">
<input name="letterman2">
<input name="newmilk">
<input name="man">
 
<script>
$( "input[name~='man']" ).val( "mr. man is in it!" );
</script>
 
</body>
</html>