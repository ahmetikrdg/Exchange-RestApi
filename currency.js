class Currency{
    constructor(firstCurrency,secondCurrency){//usd try değerlerini göndereceğiz
        this.firstCurrency=firstCurrency;
        this.secondCurrency=secondCurrency;
        this.url="https://api.exchangeratesapi.io/latest?base=";//öz olarak ekledim artık birden fazla yerde kullanabirim ve sadece bir yerde tanımladım
        this.amount=null;
    }

    exchange(){//veri alışverişi için kullanacağımız metot
        return new Promise((resolve,reject)=>{ 
            fetch(this.url + this.firstCurrency)//veriyi response obje şeklinde verir.
            .then(response=>response.json())//içindeki veriyi jsonla dönüyorum
            .then(data=>{//burada yakalayıp işlem yapacağım
                //neden data rates.. olduğuna bu urlden bakarsan daha rahat anlarsın https://api.exchangeratesapi.io/latest?base
                const parity=data.rates[this.secondCurrency] //data["rates"][this.sec..] diyede yazılabilirdik bu arada parity = denklik,değişim oranı demek
                const amount2= Number(this.amount);//amountumu sayıya çevirip
    
                let total=parity*amount2;//Burada'da çarpıyorum
                // console.log(total);
    
                resolve(total);//promise döndürüyoruz ui'da yakalayacağız
            })//bu işlemlerle Try 'yi alacağız [] ki jsonun içinden bir anahtar sorguluyorum istiyorum anlamına getirdim
            .catch(err=>reject(err));
        });
    }

    changeAmount(amount){//anlık olarak amunt göndericem
        this.amount=amount;//daha önce null olan amountu gelenle değiştiriyorum
    }

    changeFirstCurrency(newfirstCurrency){//değiştiricez ne zaman burada event oluşunca
        this.firstCurrency=newfirstCurrency;
    }

    changeSecondCurrency(newsecondCurrency){//aynısı 2. içinde...
        this.secondCurrency=newsecondCurrency;
    }

}