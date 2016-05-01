<?php
/**
 * Created by IntelliJ IDEA.
 * User: maxim
 * Date: 01/05/2016
 * Time: 09:55
 */

function parse_file($file_name){
    $cmd = "ruby kramdown_parser.rb --args";
    echo system($cmd);
}