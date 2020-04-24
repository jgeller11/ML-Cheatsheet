characters=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','á','é','í','ó','ú','ñ']

// function scrub(str) {
//     var lower = str.toLowerCase();
//     var upper = str.toUpperCase();
//
//     var res = "";
//     for(var i=0; i<lower.length; ++i) {
//         if(lower[i] != upper[i] || lower[i] === ' ')
//             res += str[i];
//     }
//
//     return res;
// }

function scrub(str) {
    var s = str.toLowerCase();
    var res = [];
    var word = "";
    for(var i=0; i<s.length; ++i) {
        if(characters.includes(s[i])){
            word += s[i];
        } else if (s[i] === " ") {
            res.push(word);
            word='';
        }
    }
    if(word!=""){
      res.push(word);
    }
    return res;
    // return str;
}

function weights(data, characters){
  var weights1=[];
  for(var i=0; i<characters.length; i++) {
    weights1.push(0);
  }
  var weights2=[]
  for(var i=0; i<characters.length; i++) {
    var x=[];
    for(var j=0; j<characters.length; j++) {
      x.push(0);
    }
    weights2.push(x);
  }
  for(var i=0; i<data.length; i++) {
    for(var j=0; j<data[i].length; j++) {
      var val2=characters.indexOf(data[i][j]);
      if(val2!=-1){
        weights1[val2]=weights1[val2] + 1;
        if(j>0){
          var val1=characters.indexOf(data[i][j-1])
          if(val1!=-1){
            weights2[val1][val2]=weights2[val1][val2]+1
          }
        }
      }
    }
  }
  output=[weights1, weights2]
  return output
  // return weights1
}

function train(english, spanish, characters) {

  engdata=scrub(english);
  espdata=scrub(spanish);

  weightsEng=weights(engdata, characters)
  // console.log(weightsEng)
  weights1=weightsEng[0]
  weights2=weightsEng[1]

  weightsEsp=weights(espdata, characters)
  pesos1=weightsEsp[0]
  pesos2=weightsEsp[1]

  var pesosNorm = 0;
  var weightsNorm = 0;
  for(var i=0; i<characters.length; i++) {
    pesosNorm+=pesos1[i] * pesos1[i]
    weightsNorm+=weights1[i] * weights1[i]
  }
  pesosNorm=pesosNorm**0.5
  weightsNorm=weightsNorm**0.5
  comp=[]
  for(var i=0; i<characters.length; i++) {
    pesos1[i]=pesos1[i]/pesosNorm
    weights1[i]=weights1[i]/weightsNorm
    comp.push((100*weights1[i]+pesos1[i])/(100*pesos1[i]+weights1[i])-(weights1[i]+100*pesos1[i])/(pesos1[i]+100*weights1[i]))
  }

  var pesos2Norm = 0;
  var weights2Norm = 0;
  for(var i=0; i<pesos2.length; i++) {
    for(var j=0; j<pesos2[i].length; j++) {
      pesos2Norm+=pesos2[i][j] * pesos2[i][j]
      weights2Norm+=weights2[i][j] * weights2[i][j]
    }
  }
  pesos2Norm=pesos2Norm**0.5


  weights2Norm=weights2Norm**0.5


  comp2=[]
  for(var i=0; i<pesos2.length; i++) {
    y=[]
    for(var j=0; j<pesos2[i].length; j++){
      pesos2[i][j]=pesos2[i][j]/pesos2Norm
      // console.log(weights2[i][j])

      weights2[i][j]=weights2[i][j]/weights2Norm
      // console.log(weights2[i][j])
      if(weights2[i][j]+pesos2[i][j]!=0){
        y.push((100*weights2[i][j]+pesos2[i][j])/(weights2[i][j]+100*pesos2[i][j])-(weights2[i][j]+100*pesos2[i][j])/(100*weights2[i][j]+pesos2[i][j]))
      } else {y.push(0)}
      // console.log(weights2[i][j])
    }
    comp2.push(y)

  }

  // console.log(comp2)
  // console.log(weights1)
  return [comp, comp2]
}



function check(compweights, test, characters){
  score=0
  lengthOfMessage=test.length
  // console.log(compweights[1])
  // console.log(test)
  // console.log(characters)
  cleantest=scrub(test)
  for(var i=0; i<cleantest.length; i++) {
    for(var j=0; j<cleantest[i].length; j++) {
      score+=compweights[0][characters.indexOf(cleantest[i][j])]
      if(j>0){
        score+=compweights[1][characters.indexOf(cleantest[i][j-1])][characters.indexOf(cleantest[i][j])]
        // console.log(compweights[1][characters.indexOf(cleantest[i][j-1])][characters.indexOf(cleantest[i][j])])
      }
    }
  }
  return score/lengthOfMessage
}



// function test() {
//   max=(check(train(exampleEng,exampleEsp,characters),exampleEng, characters)-check(train(exampleEng,exampleEsp,characters),exampleEsp, characters))/10
//   console.log(max)
//   document.getElementById("outputtest").innerHTML=check(train(exampleEng,exampleEsp,characters),testmsg, characters)
//   // document.getElementById("outputtest").innerHTML=train("pqowieurtqpowieuryqoiweyuroqiweuyrqoiweuyrtqowiuryqpowieruyqtpowieruyqopwiruypqoiwruytqpowieryqpowieruytpqowiureypoiquwyrt","laskjdfhlaksjdhflaksjdhflkjasdhflkjahsdlfkjahslkdfjahsdlkfjhaslkjfhalskjdhflaksjhflkasjhdflakjshflkjahslkdjfhalksjdhflkasjdhflkasjdhflaksjdhf",characters)
// }
function test() {
  lang1text=document.getElementById('lang1sample').value
  lang1name=document.getElementById('lang1name').value
  lang2text=document.getElementById('lang2sample').value
  lang2name=document.getElementById('lang2name').value
  max=(check(train(lang1text,lang2text,characters),lang1text, characters)-check(train(lang1text,lang2text,characters),lang2text, characters))/2
  console.log(max)
  msg=document.getElementById("inputField").value
  console.log(msg)
  var score = check(train(lang1text,lang2text,characters),msg, characters)/max
  score=Math.round(score*1000)/1000
  if(score>0){
    outputMessage=lang1name+", confidence score of "+(score).toString();
  }
  if(score<0) {
    outputMessage=lang2name+", confidence score of "+(-score).toString();
  }
  if (score=0){
    outputMessage="I think you submitted an empty string or something."
  }

  document.getElementById("outputtest").innerHTML=outputMessage
  // document.getElementById("outputtest").innerHTML=train("pqowieurtqpowieuryqoiweyuroqiweuyrqoiweuyrtqowiuryqpowieruyqtpowieruyqopwiruypqoiwruytqpowieryqpowieruytpqowiureypoiquwyrt","laskjdfhlaksjdhflaksjdhflkjasdhflkjahsdlfkjahslkdfjahsdlkfjhaslkjfhalskjdhflaksjhflkasjhdflakjshflkjahslkdjfhalksjdhflkasjdhflkasjdhflaksjdhf",characters)
}
