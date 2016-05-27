require 'kramdown'

filesName = [
    "1_Introduction.md",
    "2_parcours.md",
    "3_terrain.md",
    "4_1_lexique_terrain.md",
    "4_2_lexique_recherche.md",
    "4_3_lexique_d_ethnomethodologie.md",
    "5_etat_de_l_art.md",
    "6_methodologie.md",
    "7_plan.md",
    "8_annexes.md"
]

str = ""

for fileName in filesName
  file = File.open('../contents/'+fileName)
  str += file.read
end

out_file = File.new("out.html", "w")
out_file.puts(Kramdown::Document.new(str).to_html)
out_file.close

