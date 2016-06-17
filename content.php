<?php
    include_once "./interpreter/functions.php";

    $export = isset($_GET["export"]);

    $file = "0_memoire.md"
?>

<!DOCTYPE html>
<html>
    <!-- 
    This document is used by html2print and loaded into the html page structure.

    jQuery uses the browser's .innerHTML property to parse the document and insert it into the new document. During this process, browsers often filter elements from the document such as <html>, <title>, or <head> elements. As a result, the elements retrieved by .load() may not be exactly the same as if the document were retrieved directly by the browser.
    -->
    <head>
        <meta charset="utf-8" />
    </head>
    <body>
        <h1>Sommaire</h1>
        <div id="summary">
            <!-- Ici le plugins summary js va mettre le sommaire -->
        </div>
        <div class="region-break"></div>
        <?php
                parse_file($file);
                echo "<div class='region-break'></div>";
        ?>
        <h1>Bibliographie</h1>
        <ul id="bibliography">
            <!-- Ici le plugins summary js va mettre la bibliographie -->
        </ul>
        <div class="region-break"></div>
    <?php
        if($export):
    ?>
        <script src="assets/js/summary_export.js"></script>
    <?php
        endif;
    ?>
    </body>
</html>
