function AjaxZahtev(options, callback) {
  var req = new XMLHttpRequest();
  req.open(options.metod, options.putanja, true);
  req.addEventListener("load", function() {
    if (req.status < 400) {
      callback(req.responseText);
    }
    else {
    callback(new Error("Request failed: " + req.statusText));
    }
  });
  req.addEventListener("error", function() {
    callback(new Error("Network error"));
  });
  req.send(options.ime || null);
}

function AjaxZahtev(options, callback) {
  var req = new XMLHttpRequest();
  req.open(options.metod, options.putanja, true);
  req.addEventListener("load", function() {
    if (req.status < 400) {
      callback(req.responseText);
    }
    else {
      callback(new Error("Request failed: " + req.statusText));
    }
  });
  req.addEventListener("error", function() {
    callback(new Error("Network error"));
  });
  req.send(options.sadrzaj || null);
}


function ProcesirajOdgovor(odgovor){
  document.getElementById("odgovor").innerHTML = "<h1>Odgovor servera</h1><pre>"+odgovor+"</pre>"
}

function SopingLista() {
  var options = {}
  options.metod = "POST"
  options.putanja = "Nova lista"
  spisak = document.getElementById("spisak").value
  kolicina  = document.getElementById("kolicina").value
  prodavnica = document.getElementById("prodavnica").value
  var SopingLista = {"spisak":spisak, "kolicina":kolicina, "prodavnica":prodavnica}
  options.sadrzaj = JSON.stringify(SopingLista)
  AjaxZahtev(options, ProcesirajOdgovor)
}