a = "cruel world"
a.scan(/\w+/){
  |w| print w
}