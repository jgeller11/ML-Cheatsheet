function hide(num){
  if(document.getElementById('box'+num.toString()).style.display==='none'){
    document.getElementById('box'+num.toString()).style.display='inline'
    document.getElementById('button'+num.toString()).style.background='lightgrey'
  } else {
    document.getElementById('box'+num.toString()).style.display='none'
    document.getElementById('button'+num.toString()).style.background='grey'
  }
}
