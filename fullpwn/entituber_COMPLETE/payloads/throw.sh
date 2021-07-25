#!/bin/bash

curl -s -X POST -F 'fileToUpload=@invoice.xml' -F 'submit=Upload Invoice' 'http://10.129.1.3/invoices.php' | grep invoice
