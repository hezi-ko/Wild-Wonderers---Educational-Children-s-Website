// Get the modal
var modal = document.getElementById("myModal_1");
var modal = document.getElementById("myModal_2");


// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("modal_1");
var modalImg = document.getElementById("img01");
var captionText = document.getElementsByClassName("caption");
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}

var img = document.getElementById("modal_2");
var modalImg = document.getElementById("img02");
var captionText = document.getElementsByClassName("caption");
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}