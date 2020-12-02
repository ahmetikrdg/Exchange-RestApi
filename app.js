//Elemetnleri seçme
const amounthElement=document.querySelector("#amount");//idleri seçiyorum. Miktarı gireceğimiz yer.
const firstSelect=document.querySelector("#firstCurrency");//ilk select
const secondSelect=document.querySelector("#secondCurrency");//ikinci select
const currency=new Currency("USD","TRY");
const ui=new UI(firstSelect,secondSelect);

evenentListeners();

function evenentListeners(){
    amounthElement.addEventListener("input",exchangeCurrency);//inputa değer girildiğinde exchangeCurrency olayını oluşturucam.Yani veri girdiğinde değer anında değişir o anki cuurency bilgilerine göre.
    
    firstSelect.onchange=function(){ //onChange olayı (event), ilgili elementin değeri değiştiği zaman tetiklenir.
        currency.changeFirstCurrency(firstSelect.options[firstSelect.selectedIndex].textContent);
        ui.changeFirst();
    };
    
    secondSelect.onchange=function(){
        currency.changeSecondCurrency(secondSelect.options[secondSelect.selectedIndex].textContent);
        ui.changeSecond();
    };//iki select listime ayrı ayrı onchange atadım çünkü selectboxlar değiştiğinde aşağıdaki yazılarda anında değişmesi gerekiyor
}

function exchangeCurrency(){
    currency.changeAmount(amounthElement.value);
    currency.exchange()
    .then(result=>ui.displayResult(result))
    .catch(err=>console.log(err));
}