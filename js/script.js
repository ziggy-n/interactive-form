


const nameBox = $("input[name='user_name']");
const emailBox = $("input[name='user_email']");

const jobSelect = $("#title");
const othTitleBox = $("#other-title");

const tshirtSizeSelect = $("#size");
const tshirtDesignSelect = $("#design");
const tshirtColorSelect = $("#color");

const cornflowerblue = $("option[value='cornflowerblue']");
const darkslategrey = $("option[value='darkslategrey']");
const gold = $("option[value='gold']");
const tomato = $("option[value='tomato']");
const steelblue = $("option[value='steelblue']");
const dimgrey = $("option[value='dimgrey']");

const activitiesFSet = $("fieldset.activities")[0];
const all = $("input[name='all']");
const jsFrameworks = $("input[name='js-frameworks']");
const jsLibs = $("input[name='js-libs']");
const express = $("input[name='express']");
const node = $("input[name='node']");
const buildTools= $("input[name='build-tools']");
const npm = $("input[name='npm']");

const summation = $("#summation");

const paymentSelect = $("#payment");
const cCard = $("#credit-card");
const ccNumberBox = $("#cc-num");
const zCodeBox = $("#zip");
const cvvBox = $("#cvv");
const expMBox = $("#exp-month");
const expYBox = $("#exp-year");
const paypal = $("#paypal");
const bitcoin = $("#bitcoin");


const regBttn = $("button")[0];

// put cursor in nameBox when loading page
nameBox.focus();

// hide other-title input text box
othTitleBox.hide();

// adds text field if others is selcted in Job Role Selection contextmenu
jobSelect.change(function(){
  if(jobSelect.val() === 'other'){
    othTitleBox.show();
    othTitleBox.val("Your Job Role");
  } else {
    othTitleBox.hide();
  }
});

// hide color selection
tshirtColorSelect.hide();

// change tshirt color selection based on design selected
tshirtDesignSelect.change(function(){
  if(tshirtDesignSelect.val() === 'js puns'){
    tshirtColorSelect.show();
    cornflowerblue.show();
    darkslategrey.show();
    gold.show();
    tomato.hide();
    steelblue.hide();
    dimgrey.hide();

  } else if(tshirtDesignSelect.val() === 'heart js'){
    tshirtColorSelect.show();
    cornflowerblue.hide();
    darkslategrey.hide();
    gold.hide();
    tomato.show();
    steelblue.show();
    dimgrey.show();
    tomato.attr("selected", true);
  } else {
    tshirtColorSelect.hide();
    cornflowerblue.show();
    darkslategrey.show();
    gold.show();
    tomato.show();
    steelblue.show();
    dimgrey.show();
  }
});

// hide summation by default
summation.hide();


let totalSum = 0;

//calculate and display/hide total sum of activities
function updateSum(val){
  totalSum += val;
  if(totalSum === 0){
    summation.hide();
    summation.empty();
  } else {
    summation.empty();
    summation.append(`Total: ${totalSum}`);
    summation.show();
  }
}


// make checkboxes uncheckable if time conflict ensues
all.change(function(){
  if(this.checked){
    updateSum(200);
  } else {
    updateSum(-200);
  }
});

jsFrameworks.change(function(){
  if(this.checked){
    express.attr('disabled', 'disabled');
    updateSum(100);
  } else {
    express.removeAttr('disabled');
    updateSum(-100);
  }
});

jsLibs.change(function(){
  if(this.checked){
    node.attr('disabled', 'disabled');
    updateSum(100);
  } else {
    node.removeAttr('disabled');
    updateSum(-100);
  }
});

express.change(function(){
  if(this.checked){
    jsFrameworks.attr('disabled', 'disabled');
    updateSum(100);
  } else {
    jsFrameworks.removeAttr('disabled');
    updateSum(-100);
  }
});

node.change(function(){
  if(this.checked){
    jsLibs.attr('disabled', 'disabled');
    updateSum(100);
  } else {
    jsLibs.removeAttr('disabled');
    updateSum(-100);
  }
});

buildTools.change(function(){
  if(this.checked){
    updateSum(100);
  } else {
    updateSum(-100);
  }
});


npm.change(function(){
  if(this.checked){
    updateSum(100);
  } else {
    updateSum(-100);
  }
});


// select credit card by default
$('select option[value="credit card"]').attr("selected", true);

// hide paypal and bitcoin paragraphs by default
paypal.hide();
bitcoin.hide();

// paymentSelect handler
paymentSelect.change(function(){
  if(paymentSelect.val() === 'paypal'){
    paypal.show();
    bitcoin.hide();
    cCard.hide();
  } else if(paymentSelect.val() === 'bitcoin'){
    paypal.hide();
    bitcoin.show();
    cCard.hide();
  } else {
    paypal.hide();
    bitcoin.hide();
    cCard.show();
  }
});


// form validation at submission

// displays error message and makes box border red if nameBox is left blank,
function nameBoxValidation(){
  if(nameBox.val() === ''){
    nameBox.css('border-color', 'red');
    $("#err-nameBox").show();
    return false;
  } else {
    nameBox.css('border-color', '#c1deeb');
    $("#err-nameBox").hide();
    return true;
  }
}

// displays error message and makes box border red if invalid email format is entered
function emailValidation(){
  const regEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+[.][a-zA-Z]+$/gi;
  if(emailBox.val() === ''){
    emailBox.css('border-color', 'red');
    $("#err-emailBox1").show();
    $("#err-emailBox2").hide();
    return false;
  } else if(!regEmail.test(emailBox.val())){
    emailBox.css('border-color', 'red');
    $("#err-emailBox1").hide();
    $("#err-emailBox2").show();
    return false;
  } else {
    emailBox.css('border-color', '#c1deeb');
    $("#err-emailBox1").hide();
    $("#err-emailBox2").hide();
    return true;
  }
}

// displays error message if no activity has been chosen
function activitiesValidation(){
  if(totalSum === 0){
    $("#err-activities").show();
    return false;
  } else {
    $("#err-activities").hide();
    return true;
  }
}

/*** displays error message and makes box border red if credit card number entry is not a 13-16 digit number
or if zip code entry is not a 5 digit Number
or if cvv is not a 3 digit number
***/

function ccNumberValidation(){
  const regCCNumb = /^[0-9]{13,16}$/g;
  if(!regCCNumb.test(ccNumberBox.val())){
    ccNumberBox.css('border-color', 'red');
    $("#err-ccNumber").show();
    return false;
  } else {
    ccNumberBox.css('border-color', '#c1deeb');
    $("#err-ccNumber").hide();
    return true;
  }
}

function zipValidation(){
  const regZip = /^[0-9]{5}$/g;
  if(!regZip.test(zCodeBox.val())){
    zCodeBox.css('border-color', 'red');
    $("#err-zip").show();
    return false;
  } else {
    zCodeBox.css('border-color', '#c1deeb');
    $("#err-zip").hide();
    return true;
  }
}

function cvvValidation(){
  const regCvv = /^[0-9]{3}$/g;
  if(!regCvv.test(cvvBox.val())){
    cvvBox.css('border-color', 'red');
    $("#err-cvv").show();
    return false;
  } else {
    cvvBox.css('border-color', '#c1deeb');
    $("#err-cvv").hide();
    return true;
  }
}


function creditCardValidation(){
  const a = ccNumberValidation();
  const b = zipValidation();
  const c = cvvValidation();
  return a && b && c;
}

// real time verification

nameBox.keypress(function(){
  nameBoxValidation();
});

emailBox.keypress(function(){
  emailValidation();
});

ccNumberBox.keypress(function(){
  ccNumberValidation();
});

zCodeBox.keypress(function(){
  zipValidation();
});

cvvBox.keypress(function(){
  cvvValidation();
});



///////////

const bttn = document.getElementsByTagName("button")[0];

bttn.addEventListener("click", function(event){
  event.preventDefault();
  const a = nameBoxValidation();
  const b = emailValidation();
  const c = activitiesValidation();
  const d = creditCardValidation();
  if(a && b && c && d){
    window.location.reload();
  }
});
