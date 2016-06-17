require 'kramdown'


file = File.open('../contents/0_memoire.md')
content = file.read

def loadRequired(text)
  # On cherche les expressions régulières pour avoir le nom de fichier
  text.scan(/require '(.+)'/).each do |fileName|
    fileName = fileName[0]

    # On l'ouvre et on lit le contenu
    subFile = File.open('../contents/'+fileName)
    subContent = loadRequired(subFile.read)

    #On trouve l'index
    index = text.index(fileName)  - ("require '".length)

    #On trouve la taille du retrait
    length = ("require ''".length) + (fileName.length)

    #On retire des caractères à l'index jusqu'à ce qu'il ne reste rien
    while length > 0 do
      text.slice! index
      length -= 1
    end

    # On l'insert  à l'index  désiré
    text.insert(index, ("\r\n"*2) + subContent)
  end


  return text
end

out_file = File.new("out.md", "w")
out_file.puts(loadRequired(content));
out_file.close