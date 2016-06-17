<?php
include_once "./interpreter/functions.php";

$files_to_load = array(
    "1_Introduction.md",
    "2_parcours.md",
    "3_terrain.md",
    "4_1_lexique_terrain.md",
    "4_2_lexique_recherche.md",
    "4_3_lexique_d_ethnomethodologie.md",
    "5_etat_de_l_art.md",
    "6_methodologie.md",
    "7_plan.md",
    "7_1_metaphore_et_abstraction.md",
    "8_annexes.md",
);
?>

<!DOCTYPE html>
<html>
<!--
This document is used by html2print and loaded into the html page structure.

jQuery uses the browser's .innerHTML property to parse the document and insert it into the new document. During this process, browsers often filter elements from the document such as <html>, <title>, or <head> elements. As a result, the elements retrieved by .load() may not be exactly the same as if the document were retrieved directly by the browser.
-->
<head>
    <meta charset="utf-8"/>
</head>
<body>
<h1>Sommaire</h1>
<div id="summary">
    <!-- Ici le plugins summary js va mettre le sommaire -->
</div>
<div class="region-break"></div>
<?php
foreach ($files_to_load as $file) {
    parse_file($file);
}
?>
<h1>Bibliographie</h1>
<ul id="bibliography">
    <!-- Ici le plugins summary js va mettre la bibliographie -->
</ul>
<div class="region-break"></div>
<script src="./assets/js/summary.js"></script>
<script src="./assets/js/zoteroLoadBib.js"></script>
<script type="text/javascript">
        loadSummary();
        loadZoteroLib();</script>
</body>
</html>
