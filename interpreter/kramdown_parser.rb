require 'kramdown'

file = File.open('./contents/'+ARGV[0])
content = file.read

print Kramdown::Document.new(content).to_html
