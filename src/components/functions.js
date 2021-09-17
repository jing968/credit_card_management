// This file contains functions used in Card_Form.js


/*
Functions that updates card display according to user input
*/
function updateCardNumber(){
    updateCardBrand();
    var input = document.getElementById('card_number').value;
    document.getElementById('card-number#1').innerHTML= input.substring(0,4);
    document.getElementById('card-number#2').innerHTML= input.substring(4,8);
    document.getElementById('card-number#3').innerHTML= input.substring(8,12);
    document.getElementById('card-number#4').innerHTML= input.substring(12,16);

}

function updateCardName(){
    document.getElementById('card-name-display').innerHTML= document.getElementById('card_name').value;
}

function updateCardExp(){
    var month_selector = document.getElementById('exp_month');
    var month = month_selector.options[month_selector.selectedIndex].value;
    var year_selector = document.getElementById('exp_year');
    var year = year_selector.options[year_selector.selectedIndex].value;
    var display_month;
    switch (month){
        case 'MM':
            display_month = 'MM';
            break;
        case 'Jan':
            display_month = '01';
            break;
        case 'Feb':
            display_month = '02';
            break;
        case 'Mar':
            display_month = '03';
            break;   
        case 'Apr':
            display_month = '04';
            break;
        case 'May':
            display_month = '05';
            break; 
        case 'Jun':
            display_month = '06';
            break;
        case 'Jul':
            display_month = '07';
            break;
        case 'Aug':
            display_month = '08';
            break; 
        case 'Sep':
            display_month = '09';
            break; 
        case 'Oct':
            display_month = '10';
            break; 
        case 'Nov':
            display_month = '11';
            break;
        case 'Dec': 
            display_month = '12';
            break; 
    }

    var new_expires_date = display_month + ' / ' + year;
    document.getElementById('card-exp-display').innerHTML = new_expires_date;
}

function updateCVV(){
    triggerFlip();
    document.getElementById('card-cvv-display').innerHTML= document.getElementById('card_cvv').value;
}

function updateCardBrand(){
    var brand = checkAuthority();
    if(brand !== 'unkown'){
        var nodes = document.getElementsByClassName('brand')
        var img = document.createElement("img");
        var img_dup = document.createElement("img");
        switch (brand){
            case 'discover':
                img.src = require('../imgs/card_brand/discover.png').default;
                img_dup.src = require('../imgs/card_brand/discover.png').default;
                break;
            case 'mastercard':
                img.src = require('../imgs/card_brand/mastercard.png').default;
                img_dup.src = require('../imgs/card_brand/mastercard.png').default;
                break;
            case 'diners-club':
                img.src = require('../imgs/card_brand/diner.png').default;
                img_dup.src = require('../imgs/card_brand/diner.png').default;
                break;
            case 'visa':
                img.src = require('../imgs/card_brand/visa.png').default;
                img_dup.src = require('../imgs/card_brand/visa.png').default;
                break;
            case 'JCB':
                img.src = require('../imgs/card_brand/jcb.png').default;
                img_dup.src = require('../imgs/card_brand/jcb.png').default;
                break;
            case 'american-express':
                img.src = require('../imgs/card_brand/american-express.png').default;
                img_dup.src = require('../imgs/card_brand/american-express.png').default;
                break;
            case 'bc':
                img.src = require('../imgs/card_brand/bc.png').default;
                img_dup.src = require('../imgs/card_brand/bc.png').default;
                break;
            case 'laser':
                img.src = require('../imgs/card_brand/laser.png').default;
                img_dup.src = require('../imgs/card_brand/laser.png').default;
                break;
            case 'maestro':
                img.src = require('../imgs/card_brand/maestro.png').default;
                img_dup.src = require('../imgs/card_brand/maestro.png').default;
                break;
            case 'solo':
                img.src = require('../imgs/card_brand/solo.png').default;
                img_dup.src = require('../imgs/card_brand/solo.png').default;
                break;
            case 'switch':
                img.src = require('../imgs/card_brand/switch.png').default;
                img_dup.src = require('../imgs/card_brand/switch.png').default;
                break;
            case 'union':
                img.src = require('../imgs/card_brand/union.png').default;
                img_dup.src = require('../imgs/card_brand/union.png').default;
                break; 
            default:
                break;             
        }

        img_dup.style = 'margin-top: -30px; margin-left: 10px; width: 80px; height 25px';
        img.style = 'margin-left: 10px; width: 80px; height 25px';
        // front
        while(nodes[0].firstChild){
            nodes[0].removeChild(nodes[0].firstChild);
        }
        nodes[0].appendChild(img);
        
        // back
        while(nodes[1].firstChild){
            nodes[1].removeChild(nodes[1].firstChild);
        }
        nodes[1].appendChild(img_dup);
    }
}

/*
Credit card number validator 
    Checks if a given credit card number is valid by adding (2* odd digit numbers) and (1* even digit numbers) (P.S double digits numbers are treated as two single digits e.g. 11 will be treated as 1 + 1) 
    Stat counting from the right hand side
    If the calculated sum have no remainders after diving by 10 then it is VALID
    return TRUE if valid, FALSE othewised
*/

function checkValidNumber(input){
    if(input === '') console.log('empty');
    var sum = 0;
    for(let i = input.length-1; i >= 0; i --){
        if(i%2 !== 0){
            sum += parseInt(input.charAt(i));
        }else{
            var doubled = 2* parseInt(input.charAt(i));
            if(doubled >= 10){
                sum += parseInt(doubled / 10);
                sum += parseInt(doubled % 10); 
            }else{
                sum += doubled;
            }
            
        }

    }
    if(sum%10 === 0) return true;
    return false;


}

/*
Credit card authority checker
*/
function checkAuthority(){
    var input = document.getElementById('card_number').value;
    var authority = 'unknown';
    const amx = new RegExp('^3[47][0-9]{13}$');
    const BCGlobal = new RegExp('^(6541|6556)[0-9]{12}$');
    const Diners = new RegExp('^3(?:0[0-5]|[68][0-9])[0-9]{11}$');
    const Discover = new RegExp('^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$');
    const JCB = new RegExp('^(?:2131|1800|35\d{3})\d{11}$');
    const Laser = new RegExp('^(6304|6706|6709|6771)[0-9]{12,15}$');
    const Maestro = new RegExp('^(5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}$');
    const Master = new RegExp('^5[1-5][0-9]{14}$');
    const Solo = new RegExp('^(6334|6767)[0-9]{12}|(6334|6767)[0-9]{14}|(6334|6767)[0-9]{15}$');
    const Switch = new RegExp('^(4903|4905|4911|4936|6333|6759)[0-9]{12}|(4903|4905|4911|4936|6333|6759)[0-9]{14}|(4903|4905|4911|4936|6333|6759)[0-9]{15}|564182[0-9]{10}|564182[0-9]{12}|564182[0-9]{13}|633110[0-9]{10}|633110[0-9]{12}|633110[0-9]{13}$');
    const Union = new RegExp('^(62[0-9]{14,17})$');
    const Visa = new RegExp('^4[0-9]{12}(?:[0-9]{3})?$');

    if(amx.test(input)) authority = 'american-express';
    else if(BCGlobal.test(input)) authority = 'bc';
    else if(Diners.test(input)) authority = 'diners-club'; 
    else if(Discover.test(input)) authority = 'discover';
    else if(JCB.test(input)) authority = 'JCB';
    else if(Laser.test(input)) authority ='laser';
    else if(Maestro.test(input)) authority = 'maestro';
    else if(Master.test(input)) authority = 'mastercard';
    else if(Solo.test(input)) authority = 'solo';
    else if(Switch.test(input)) authority = 'switch';
    else if(Union.test(input)) authority = 'union';
    else if(Visa.test(input)) authority = 'visa';

    return authority;
}

/*
Toggle & untoggle flip event without hovering the card display - when user is changing CVV
*/
function triggerFlip(){
   document.getElementById('flip').classList.add('hover');
}

function restoreFlip(){
    document.getElementById('flip').classList.remove('hover');
}

export {updateCardNumber,
    updateCVV,
    updateCardExp,
    updateCardName,
    updateCardBrand,
    triggerFlip,
    restoreFlip,
    checkAuthority,
    checkValidNumber
}
