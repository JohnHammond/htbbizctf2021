<html>
<head><title>XSD Management</title></head>
<body>
<?php
  if($_SERVER['REMOTE_ADDR'] !== '127.0.0.1')
  {
      echo "<p>IP address not allowed.</p>";
      die();
  }
  if(isset($_REQUEST['filename']) && isset($_REQUEST['url']))
  {
      if(preg_match('/^[\w\-]+\.xsd/', $_REQUEST['filename']) && filter_var($_REQUEST['url'], FILTER_VALIDATE_URL))
      {
        file_put_contents("xsd/common/".$_REQUEST['filename'], file_get_contents($_REQUEST['url']));
      } 
  }
?>
<h3>XSD Downloader</h3>

<form method="post">
  <label for="filename">File name</label>
  <input type="text" name="filename">
  <br>
  <label for="url">Download URL</label>
  <input type="text" name="url">
  <br>
  <button type="submit">Download XSD</button>
</form>
<body>
