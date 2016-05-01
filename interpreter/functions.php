<?php
/**
 * Created by IntelliJ IDEA.
 * User: maxim
 * Date: 01/05/2016
 * Time: 09:55
 */

function parse_file($file_name){
    // Le chemin absolu de ruby doit être utilisé, à voir après inclusion dans les variables d'environnement et redemarrage
    $cmd = "C:/Ruby23-x64/bin/ruby.exe ./interpreter/kramdown_parser.rb ".$file_name;
    system($cmd);
}

function show_directory(){
    echo getcwd();
}