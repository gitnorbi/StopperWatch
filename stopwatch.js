"use strict";


(function(){ // this is the First Main Cloaser's start.


 let mainInterval; // azért van itt kint mert több function is igénybe veszi44
// pl a stop, start, save, load és a new function is használja, hogy le állítsa a mainfunction
//folyamatos végrehajtását, a start meg elindítja


//!!
 /* !! itt kezdődik az a function ami leellenőrzi, hogy a Start már elkezdődött volna e és beállítja
 //az original timeot*/


// ezeket egy másik functionból vettem át!!
    let ifStarted=false;
    /*az originalTime functionnál az iffes részhez lesz fonto ez a variable,ahol azt határozza meg, hogy
    a startra már rámyontam egyszer akkor true-ra válik, így amikor rá nyomok még egyszer arra a gombra ami egyebként már
    continue lesz a szövege addigra, nem fogja a elölről kezdeni a számítást az  stratTimeInMilliseconds-hoz
    
    a newnál ezt vissza állítjuk alapértelmezetre

    és a strartra nyomva ugye ez true lesz, míg a stopra falseá válik (lejebbi dolgok)
    azáltal, hogy stopra ujra fals lesz az originalTime functionnal ujra veszi az alap értéket
    de itt már a continuousAndOriginalTimedifference- nek lesz értéke ami kivonodik ebbol az ujbol így adva az alapot

    -a savenel is használom ez az IsStarted-ott

    -plus a start, stop functional is lényege lesz
   */


    
    

    //különbség
    let continuousAndOriginalTimedifference=0;/* ez az original time és a folyamatos uj time közötti különbséget 
    tárolja milisecundsba, pluszz az original time számításába is részt vesz, amikor még csak elkezdem
    elösször a stoppert akkor ennek az értéke nulla ígí az original functionbe semmit nem változtatt
    de utanna, ha stoppolom ifStarted  ujra flase lesz, a strarttal az originalTime function életbe lép
    és addigre a continuousAndOriginalTimedifference tárolja az előző már lemért ídőt, és az uj original timeból
    ezt kivonjuk, pl 2 másodpercet vagy 6 ot, hogy amit már eddig lemért az is megmaradjon amikor ujra kéri
    az original timeot, azért kell ujra kérni, hogy az original time a stop uttán n ormalis időt mérjen, mert
    ha az marad eredetiben akkor mér tovább a gép mögött akkir is amikor a stopra nyomunk(nem mér tovább
      de amikor ujra kezdősik a strarttal olyan mintha mért volna)
     */
     let stratTimeInMilliseconds; /*ezeket a variabeleket több helyen is használom majd egyszer az
     originalTime-nál, ez az eredeti kezdeti idő millisecundba és egyszer használom a mainFunctionnál, hogy
       a continuousAndOriginalTimedifference-t megadja, az uj folyamatos idő milisecundból kivonom a kezdeti milisecund
       időt, hogy ezzel megkapjam a kettőjük közti különbséget a valódi eltelt időt a stopper lenyomása óta
       milisecundba, amit majd később átkell alakítanom a megfelelő formátumba
     */

       let didWeClickOnSaved=false; // ez a variaable dönti el, hogy a start vagy a continue előtt savedre nyomtam e

 

    function originalTime(){ 
      let startTimeDate;
     // itt az iffes rész azért kell amit felül leírok
     if ( ifStarted==false) {
       startTimeDate= new Date(); 
       stratTimeInMilliseconds=startTimeDate.getTime()-continuousAndOriginalTimedifference;
       //startedState=1; // ha már elkezdődött akkor megváltozik erre.
     } 
   }
   document.querySelector("#start").addEventListener("click",originalTime); 
// !! itt végződik az a function ami leellenőrzi, hogy a Start már elkezdődött volna e







 // !! New 1, // there Volt is an other new functtion a strat-stopnál
      function newTimerClearMainInterval(){clearInterval(mainInterval);}
      document.querySelector("#new").addEventListener("click",newTimerClearMainInterval);

      function newTimerMakeifStartedVariableFalse(){ifStarted=false;}
      document.querySelector("#new").addEventListener("click",newTimerMakeifStartedVariableFalse);

      function MakecontinuousAndOriginalTimedifferenceVariableToZero(){continuousAndOriginalTimedifference=0;}
      document.querySelector("#new").addEventListener("click",MakecontinuousAndOriginalTimedifferenceVariableToZero);
      
      function NewTimerChangeIdoIdsTextContent(){
        document.querySelector(".ido").textContent=`Press Start for a new timer`;
        document.querySelector(".ido").style.backgroundColor= "coral";
      }
        
      document.querySelector("#new").addEventListener("click",NewTimerChangeIdoIdsTextContent);

      function newTimerChaneStartIdsTextContent(){
        document.querySelector("#start").textContent="Start";
        }
      document.querySelector("#new").addEventListener("click",newTimerChaneStartIdsTextContent);



      // new gombra a lapok törlése!!!
      function newButtonFunctionRemove(){
    
      let lapsForNewFunction;
      lapsForNewFunction=document.querySelectorAll(".parentContainerDiv")
      console.log(lapsForNewFunction);
      
      for (let i = 0; i < lapsForNewFunction.length; i++) {
        lapsForNewFunction[i].parentElement.removeChild(lapsForNewFunction[i]);
      }
      
      }
    
      document.getElementById("new").addEventListener('click',newButtonFunctionRemove); 
      //!!!  new gombra a lapok törlésének a vége

       /* így csináltam elösször összevonva, a lapok törlése nincs benne

       let newTimerFirstFunction=function(){
            
            clearInterval(mainInterval); // leállítom az lőzőlegesen elindított mainFunction 
            //folyamatos végrehajtását

            ifStarted=false;

            continuousAndOriginalTimedifference=0; // ezt a számot vonjuk ki az elején az original time-ból
            // azért kell lenullázni, hogy a new időkor, ne a régi megmaradt értéket vonja ki

            document.querySelector(".ido").textContent=`Press Start for a new timer`;
            document.querySelector("#start").textContent="Start";
          }
          document.querySelector("#new").addEventListener("click",newTimerFirstFunction);
          */

      // !! New 1 vege

    


 // !! mainFunction kezdete
    const mainFunction = (function () {
        /* mainFunction elösször önmagát hívja életre, ezzel egyrészt cloaser lesz, plusz a végén majd van 
        benne egy return function, és az lesz az új mainFunctin, amit majd a Strartra rányomva
        a start function egy set intervallal folyamatosan ujra fog hívni */
          
          //ezzel számol
          let continuousDate;
          let continuousDateInMilliseconds;
         
         
          //idó
          let hours;
          let onlyHours;
          let minutes;
          let onlyMinutes;
          let seconds;
          let onlySeconds;
          let milliseconds;
          let onlyMilliseconds;
          
        return ()=> {  
          
          
        function continuousDateGetNewDateValue(){continuousDate=new Date();}
        continuousDateGetNewDateValue();
        /*everytime when the mainFunction is being called with internalval so like every other seconds
        this continuousDate variable get a new Date value which gone be converted into milliseconds
        and from this Continous value gonna be subtract the original time value in every second
         and this new value gonna be the real time in milliseconds, ez a function callingolva van
         ebben a mainFunctionbe, szóval akarhanyszor a mainfunction callingolva van, callingolva
         van ez is!!*/
         
       
         function continuousDateInMillisecondsFunction (){ continuousDateInMilliseconds=continuousDate.getTime();}
         continuousDateInMillisecondsFunction();
         
         function continuousAndOriginalTimedifferenceFunction (){continuousAndOriginalTimedifference=continuousDateInMilliseconds-stratTimeInMilliseconds;}
         continuousAndOriginalTimedifferenceFunction();
         
         //idő

         function hoursWithoutFlooring(){hours=continuousAndOriginalTimedifference/3600000;}
         hoursWithoutFlooring();

         /*Azértz kell floorolni mert ha pl a 2 óra 15 perc van, akkor már az óra az kettő, de a amradég számra
         nincs szükségünk, azért lefele kerekítünk, mert ha mar elerte az órat akkor mar kiírja az ujszámot
         míg ha 1 óra 59 perc akkor pl az óra az meg nem lépte át és meg mindig csak 1 */
         function hoursWithFlooringFunction(){onlyHours=Math.floor(hours);}
         hoursWithFlooringFunction();

         /* ugy kapom meg, hogy a hoursból kivonom az onlyhourst ami már csak egy egész szám és
         maradék lesz a hátrahagyott idő amiből minutes-et lehet számolni */
         function minutesWithoutFlooringFunction(){minutes=(hours-onlyHours)*60;}
         minutesWithoutFlooringFunction();

         function minutesWithFlooringFunction(){onlyMinutes=Math.floor(minutes);}
         minutesWithFlooringFunction();
         
         function secondsWithoutFlooringFunction(){seconds=(minutes-onlyMinutes)*60;}
         secondsWithoutFlooringFunction();

         function secondsWithFlooringFunction(){onlySeconds=Math.floor(seconds);}
         secondsWithFlooringFunction();
         
         
         function millisecondsWithoutFloorFunction (){milliseconds=(seconds-onlySeconds)*1000;}
         millisecondsWithoutFloorFunction();

         function millisecondsWithFloorFunction(){onlyMilliseconds=Math.floor(milliseconds);}
         millisecondsWithFloorFunction();

        function writingTheTimeToITsPlaceFunction(){
          document.querySelector(".ido").textContent=`Time: Hours:${onlyHours} minutes: ${onlyMinutes} 
          seconds: ${onlySeconds} milliseconds:${onlyMilliseconds}`;
          };
          writingTheTimeToITsPlaceFunction();
      }
          })();
// !! Main Fuction vége

// ez a rész azért van, hogy ha épp belenyomtam a savedbe, hogy betöltse őket, akkor onnan a stratra 
//kattintva ne kezdgyje el folytatni a stoppert mert addgra a saved function törölte az előző laptimokat
// használni ujra a  a stoppert a New-ra kell kattintani


// vége ami ellenörzi, hogy a start előtt belenyomtam e a saved-be, a variable-t a start
document.querySelector("#saved").addEventListener("click",()=>{didWeClickOnSaved=true;

document.querySelector("#start").textContent="Start";}

); 

document.querySelector("#new").addEventListener("click",()=>{didWeClickOnSaved=false;}); 

// vége ami ellenörzi, hogy a start előtt belenyomtam e a saved-be, a variable-t a start
// function is használja

// a start function hívja életre a MainFunctiont
// !start kezdete
    function start (){
      
      if (ifStarted==false && didWeClickOnSaved==false) {
      mainInterval=setInterval(mainFunction,1);
      document.querySelector("#start").textContent="Continue";
      document.querySelector(".ido").style.backgroundColor= "#00FFFF";
    } /*else if(didWeClickOnSaved==true)*/ else{
      document.querySelector("#ido").textContent="Before start press New";
      document.querySelector(".ido").style.backgroundColor= "Blue";
    }
    ifStarted=true /* ez a rész azért kellett, mert amikor nem volt benne
    akkor ha kétszer rákattintottam a strart gombra akkor a stop gom utánna már nem működött
    a stop functionnál vissza állítom falsra, hogy újra kattintható legyen a start gomb*/
  
  }
  document.querySelector("#start").addEventListener("click",start); 
  // !start vége



  
  // !! stop kezdete
    function stop () {
      
    ifStarted=false; // ezzel az ifstartedott vissza állítom falsra
    clearInterval(mainInterval);}
    document.querySelector("#stop").addEventListener("click",stop);
    //!Stop vége
   
  
  

  
 //!! lap function
  
  let lapAdd=(function (){
    /* ez egy cloaser amiben van a lapadd rész és ez a function akar hányszor a lap gombra kattintok 
    meghívásra kerül a lapAddCaller functionon keresztül ami a meghívás előtt csekkolja, hoyg vajon
    már elindult e a stopper és ha igen akkor meghívja a lapAdd funtiont, de ha meg nem idult el 
    egyszer sem a stopper, akkor kiírja, hogy elösször elkell inddítani, ahozz, hogy ezt a funkciót
    használni lehessen */

    let counterForLap=1; /* itt tartom számon, hogy hány lapet hozzok létre, amikor egy ujjat létre hozok, a c
    hez hozzá adok egyett */

    let getTheMainTimeInTextForLapsFunction=function(){
      let lapTime=document.querySelector(".ido").textContent;
    return lapTime;
    } /* a lap function új neven:  getTheMainTimeInTextForLapsFunction eddig a (lapAdd Function) cloaseren kívül volt, 
    azt csinálja, hogy akar hanyszor rákattintok a lap gombra ez a function is meghívásra kerül
    és veszi az mainIdőt nek a tartalmát és azt elmenti ebbe a variabelbe, szóval amikor kattintok
    az aktuális idő lesz az új lap tartalma eventualy
     átnevezhettem majd tartalmasabra is ha akarom*
     a lapAdd function return részében lesz callingolva autómatikusan amikor a lapAdd is callingolva van/

    let c=1;
    /*return function (){
      let parent = 'parent'+[c];
      window[parent] = document.createElement('p');
      window[parent].textContent=`Laptime${c}: ${getTheMainTimeInTextForLapsFunction}`;
      window[parent].id="p"+[c];
      document.querySelector(".stopwatchUpperScreen").append( window[parent]);
      c+=1;
  }*/
  // a felsőt megprobálom látrehozni csak arrayel
  //  ez az arrayes megoldás szerintem jobb
  
  /* ez a lapAddhez tartozik, ez az igazi return része ahol a lap add ténylegesen megtörténik  
  itt adom hozzá a dives törlési szekciót is
  */

/* old
  return function (){
    let parentContainer=[];
    let child=[];
    let childDivSettings=[];
  
    // hozzá adás itt történik, a p melett a settings dibje is itt kap helyet
    function CreateChildTagFunction(){child[c] = document.createElement('p');}
    CreateChildTagFunction();
    child[c].textContent=`Laptime${c}: ${getTheMainTimeInTextForLapsFunction()}`;
    child[c].id="p"+[c];
    child[c].className+="childLapPTag";
  
    parentContainer[c] = document.createElement('div');
    parentContainer[c].id="parentDiv"+[c];
    parentContainer[c].className="parentContainerDiv";
    parentContainer[c].append(child[c]);
  
    childDivSettings[c] = document.createElement('div');
    childDivSettings[c].id="settingsDiv"+[c];
    childDivSettings[c].className +="settingsDivClassName";
    childDivSettings[c].textContent=`settings`;
    parentContainer[c].append(childDivSettings[c]);

    document.querySelector(".stopwatchUpperScreen").append( parentContainer[c]);
  // hozzá adás vége
  
    //settings function kezdete,azért ide raktam, hogy elérjem
    //setting törlés
   document.getElementById("settingsDiv"+c).addEventListener('click',removeLaps); 
   function removeLaps(e){
    let settingsElement= e.target;
    let siblingElement=e.target.previousElementSibling;
    let settingsParentElement=e.target.parentElement;
    siblingElement.parentElement.removeChild(siblingElement);
    settingsElement.parentElement.removeChild(settingsElement);
    settingsParentElement.parentElement.removeChild(settingsParentElement); //lehet elég csak ezt az egy 
   // parentett törölni 
    }
   //settings function vége
   c+=1;
  }
  */


  return function (){
    let parentContainer;
    let child;
    let childDivSettings;
  // ha nem kkell a uniq id akkor akár a c variable az törölhető is!!, de inkább tartsam meg
    

    //function CreateChildTagFunction(){child = document.createElement('p');}
    //CreateChildTagFunction();

   child = document.createElement('li');
   child.textContent=`Lap${getTheMainTimeInTextForLapsFunction()}`;
   child.id="p"+[counterForLap];
   child.className+="childLapPTag";
  
    parentContainer = document.createElement('div');
    parentContainer.id="parentDiv"+[counterForLap];
    parentContainer.className="parentContainerDiv";
    parentContainer.append(child);
  
    childDivSettings = document.createElement('div');
    childDivSettings.id="settingsDiv"+[counterForLap];
    childDivSettings.className +="settingsDivClassName";
    childDivSettings.textContent=`Delete`;
    parentContainer.append(childDivSettings);

    document.querySelector(".stopwatchUpperScreen").append( parentContainer);
  // hozzá adás vége
  
    //settings function kezdete,azért ide raktam, hogy elérjem

    //setting törlés
  /* document.getElementById("settingsDiv"+c).addEventListener('click',removeLaps); 
   function removeLaps(e){
    let settingsElement= e.target;
    let siblingElement=e.target.previousElementSibling;
    let settingsParentElement=e.target.parentElement;
    siblingElement.parentElement.removeChild(siblingElement);
    settingsElement.parentElement.removeChild(settingsElement);
    settingsParentElement.parentElement.removeChild(settingsParentElement); //lehet elég csak ezt az egy 
   // parentett törölni 
   
    }
    */
   //settings function vége
   counterForLap+=1;
  }
  
  })();

/*// cloaser és igazaból ez itt alul a lap function hívó része, csak mielőtt hívja, elbírálja, hogy 
 hívhatja e egyaltalan azáltal, hogy vajon a stopper már elkezdődött e már*/
//!! cloaser a laphez ami ellenörzi, hogy a stopper elkezdődött e már
/* három fugvényt tartalmaz 1 ha rányomok a startra akkor atalíta a variablet hogy elkezdődött már 
egy ha a newra, hogy meg nem kezdődött el, vissza álítja akkor a stopnál nem kell vissza állítani
ezrt nem is egyeztethető össze azzal a variabellel ami stopra is vissza áll, mert lehet olyankor is
akkarok menteni, es van a harmadik ami ezek alapján ellenörzi, hogy elkezdődött e már
és ha igen akkor hívja a lapAdd functiont ha nem akkor kiírja, hogy elösször elkell kezdeni*/



// ez a lapAddCaller ahol egyszerübb az alapból használt variablet használom fel, hogy eldöntsem
//hogy vajon a stopper elindult e mar, de itt ha stoppon van akkor nem lehet hozzá adni uj lapot
//!! lapAddCaller start
(function(){

function lapAddCaller(){


  if ( ifStarted==true && didWeClickOnSaved==false) { // ez megakadájoz egy buggot!!didWeClickOnSaved==false
// amikor a saveden belül a startra kattintok és utánna a lapsra, akkor lapakat add hozz, ha ez nincs itt!!
    lapAdd();

  } else {
    document.querySelector(".ido").textContent="Before adding a Lap you must have the stopper going";
    document.querySelector(".ido").style.backgroundColor= "#A9A9A9";
  }


}
document.querySelector("#lap").addEventListener("click",lapAddCaller); 

})();
//!! lapAddCaller finsih


// it ha stoppon van, akkor is lehet akarhany lapott hozzá adni, mert egy uj variablelt vesz a számításának 
//alapul
/*
//!! lapAddCaller Start ahol lehet akarhany lapom stopp alatt is
  (function(){ //cloaser ami a lapnak azt a részér ellenörzi, hogy valyon a stoppert elindítottuk- e már
   // mert ha igen, akkor lehet lappet hozzá adni, ha nem akkor nem engedélyezi!! 

  let didItStartedLap=false; // ebbe a variabelbe tároljuk, hogy valyon elkezdődött e már a stopper


  function didItStarted(){
    didItStartedLap=true;
  } // ha rányomok a startra akkor a didItStartedLap-et megváltoztatjuk true-ra, ami akkor kell majd
  //amikor rányomok a lapra, mert ha arra nyomok és a  didItStartedLap variable true akkor lesz a lapAdd 
  //function meghívva, ha meg nem akkor egy kiírás történik
  


  // ha newra nyomok leáll 
  //azért nem a  ifStarted variablelel bírálom el, mint ahogy feljebb mert az ifStarted variablel a stop
 // gomb lenyomásával is false lesz, én viszont azt szeretném, hogy a stop lenyomásakor is lehesen lap
  //időt nezni, később lehet átváltoztatom  ifStartedra de akkor más lesz a szöveg pl?
  //Before adding a Lap you must have the stopper going
  
  function newFunctionForLap(){
    didItStartedLap=false;
  
  }
  
  function lapAddCaller(){
    if (didItStartedLap==true) {
      lapAdd();
    } else {
      document.querySelector(".ido").textContent=`Before adding a lap you must first start the timer with "Start"`;
    }
  }
  
  document.querySelector("#new").addEventListener("click",newFunctionForLap);
  document.querySelector("#start").addEventListener("click",didItStarted);
  document.querySelector("#lap").addEventListener("click",lapAddCaller); 

  })();
//Vége cloaser a laphez ami ellenörzi, hogy a stopper elkezdődött e már

//!! lapAddCaller finish ahol lehet akarhany lapom stopp alatt is
*/


 
  /* 
  a lap rész működése:
  1. a Lap function működése:
  1.a a Lap function veszi egy dom teknikával a jelenleg kiírt időt és azt elmenti a Laptime variablebe és
  returnolja azt
  
  a LapAdd működse:
  elösször egy self invokeing functionnal létrehozz egy cloasert, hogy a vareablet(c) ami majd a számzásra
  szolgál dekralálja safen, majd egy functiont returnol, hogy a lapAddre hivatkozva később már a return
  function legyen
  .a function amit returnolt: egyrészt egy tekniikával dinamikus variable neveket hozz létre a:
      (let parent = 'parent'+[c];
      window[parent] = ) teknikával, a function végén a chez majd mindig hozzá ad egyett így érve el, hogy a
      szám az növekedjen
      majd ehhez a létre hozott dinamikus variablhez létre hozz egy új p elementet
      majd ennek ad egy dinamikus id-t
      majd ennek az elementnek ad egy tartalmat, az előző Lap functiont- így annak a lapTime return tartalmát
      adja hozzá ehez a dinamikus variablhez
      majd egy appendel, hozzá adja ezt az új elementet a html dokumnetumhoz
      vegul a számláló variablhez, hozzá adok egyet, mert a következő lap gomra kattintásnál ahol
      a quoary selectorral hívom majd ezt az LapAdd functiont ennek a számláló variable-nek a
      segítségével tudom majd létrehozni az uj dinamikus variable elementett
  
  */

  //!! lap function vége




//!!Setting fuction kezdete

/* //a Törlés rész az a része amikor hozzá adom a térlés funcion eventlistenert az uj laphoz ami keletkezett
// ez az a megoldás amikor ezt a function is kissebb darabokra szedem
function AddingremoveLapsFunction() {

let setttingDivs;

function selectingTheLastLapElementWhenClickingToLapButton(){
  setttingDivs=document.querySelector(".parentContainerDiv:last-child");
  }

  selectingTheLastLapElementWhenClickingToLapButton();

function WhenClickingToLapButtonAddingremoveLapsFunctionToItWithEventListener(){
  setttingDivs.addEventListener("click",removeLaps);
  }

  WhenClickingToLapButtonAddingremoveLapsFunctionToItWithEventListener();
}

  document.querySelector("#lap").addEventListener("click", AddingremoveLapsFunction);
*/


//ez ha egy functionba teszem bele
//!!! a törlés functiont hozzá adja az ujjonan keletkezett laphez
function selectingTheLastLapElementWhenClickingToLapButtonAndAddingremoveLapsFunctionWithEventListener(){
let setttingDivs=document.querySelector(".parentContainerDiv:last-child");
if(setttingDivs!=undefined){
setttingDivs.addEventListener("click",removeLaps);
}
}

document.querySelector("#lap").addEventListener("click",
selectingTheLastLapElementWhenClickingToLapButtonAndAddingremoveLapsFunctionWithEventListener);
//!!! a törlés functiont hozzá adja az ujjonan keletkezett laphez vége

      // Maga setting törlés function kezdete
      
      function removeLaps(e){
        function areYouSureDeletingFunction() {
          
          if (confirm("Are you sure about deleting this lap?")) {
            let settingsElement= e.target;
            let siblingElement=e.target.previousElementSibling;
            let settingsParentElement=e.target.parentElement;
            siblingElement.parentElement.removeChild(siblingElement);
            settingsElement.parentElement.removeChild(settingsElement);
            settingsParentElement.parentElement.removeChild(settingsParentElement); //lehet elég csak ezt az egy 
           // parentett törölni 
          } 
          /*else {
            console.log("Nem törli");
          }*/
         
        }
        areYouSureDeletingFunction()

      
       }
        //Maga setting törlés function kezdete


//!!Setting fuction vége









   //!! Save function
  // (function (){  // itt ezt a cloasert azért commenteltem ki, mert egyrészt a loadott is magaba foglalta
  //masrészt ha itt cloaser volt akkor a megfelelő load functiont nem tudtam ujra hívni a rename után
  //ami azert kell, hogy a renam után ha rákattintok egy savedre akkor elösször üresen hozza be enelkul a
  // több informaciot, de ha nincs cloaser es ott ujra hívom azokat a funkciokat akkor ugy mar jó
    /* ezzel a savre kattintva leállítom a mainFunction folyamatos végrehajtását és az ifStartedet
    vissza állítom falsra, hogy a többi function működjön */
    document.querySelector("#save").addEventListener("click",()=>{
      ifStarted=false; // ezzel az ifstartedott vissza állítom falsra, ez kell mert ha kiveszem, valami
      //nem fog működni, mar elfelejtettem, és nincs kedvem kideríteni
      clearInterval(mainInterval);
     }); 

     let didWeclickSavedForSaveFunction=false;

  //let whichSave="a ";
  let alreadystarted=false; /* ez azért kell, hogy csak akkor működhessen a save gomb ha már elkezdődött a
  a stopper
  */

  let mainSave=[]; // ezt azért tettem ide ki, hogy amikor a save gomb clickre ebbe pushingolom az arrayt ez 
  //ne kezdődjön mindig elölről(ne írodjon felül mindig), de még lehet mashová kell tenni, de egyenlőre ide
  //tettem
let dateInTimeOfSaving;
let dateInTimeOfSavingToString;
  let savingName;
  let timerInnerText=[];

  let didHeSaved; /* ez azért kell, mert ezzel a variable.el döntöm el, hogy a mentésnél az ok
  gobra kattintott e, hogy mentett e, mert csak ha mentett akkor kell a whichSave variable-t növelni
  eggyel, szóval ez annak az eldöntésére lett gyártva */
  
let haveTheSameSavingName=false; // alapból kell neki false értéket adni, mert ha nem adok 
// akkor amikor ujjat kezdek ugy hogy törlöm az összes addigi mentettett akkor nem fog
//engedni az ifek miatt egyetlen további mentest se, ha itt nem adog neki értéket


  //efelett minden a cloaserben functionnon kívüli
  function saveFunction() {
//saveFunctionCaller () fogja hívni ezt a functiont meg

    //get current date when saving and altering it a format, in which it can be saved
   dateInTimeOfSaving=new Date();
   dateInTimeOfSavingToString=dateInTimeOfSaving.toUTCString().toString();
  // let replaceWhiteSpaceindateInTimeOfSavingToString = dateInTimeOfSavingToString;//.replace(/\s/g, " ");
   let replaceCommaindateInTimeOfSavingToString=dateInTimeOfSavingToString.replace(/,/g, " ");
   let replaceColonindateInTimeOfSavingToString=replaceCommaindateInTimeOfSavingToString.replace(/:/g, " ");
  let replaceMoreThanOneSpaceIntoOneInTimeOfSavingToString=replaceColonindateInTimeOfSavingToString.replace(/\s\s+/g, ' ');
   //end get current date when saving and altering it a format, in which it can be saved
  
    



    //Prompt
        savingName = prompt("Please enter a name for your saving: \n \n "+
        "(Do not use any special characters)", "Save "+replaceMoreThanOneSpaceIntoOneInTimeOfSavingToString);
        didHeSaved=false;
        if (savingName == null || savingName == "") {
      console.log(`user didnt choose a name`);
      didHeSaved=false;
    } else {
      didHeSaved=true;
      console.log(`user choosed "${savingName}" for name`);
      
    }
  //Promt End
  

  
   
  }// saveFunction Vége saveFunctionCaller () fogja hívni


  function didAlreadyStarted(){
    alreadystarted=true;
  }

  function whenStartANew(){ //amikor newra kattintok
    alreadystarted=false;
  }/*ez azért kell, mert ha ujjat kezdek akkor ne lehessen a save functiont
  elindítani csak h már az uj timingnál is elkezdtem egyszez */
  
  // ez ha azt akarom, hogy saved menuből ne lehessen uj savet indítani!!, még teszt alatt
  document.querySelector("#saved").addEventListener("click",()=>{didWeclickSavedForSaveFunction=true;});
  document.querySelector("#new").addEventListener("click",()=>{didWeclickSavedForSaveFunction=false;});
  // ez ha azt akarom, hogy saved menuből ne lehessen uj savet indítani!!, még teszt alatt
  //document.querySelector("#saved").addEventListener("click",()=>{alreadystarted=false;});
  // akar ez is lehetne, csak akkor a saveFunctionCaller() iffes részéből, ki kell venni a
  // && didWeclickStarted==true feltételt;

  // saveFunctionCaller() kezdete
  function saveFunctionCaller(){
    if (alreadystarted==true && didWeclickSavedForSaveFunction==false) {
      saveFunction();
    } else {
      document.querySelector(".ido").textContent=`Before saving you must first start the timer with "Start"`;
      document.querySelector(".ido").style.backgroundColor= "#7FFFD4";
    }
  
  }
  //saveFunctionCaller() vége


 // console.log("timerInnerText for each előtt");
 // console.log(timerInnerText); //azért kell ide ki rakni, mert itt van ezalatt a function
  // hívója ahol változni fog
  
  document.querySelector("#new").addEventListener("click",whenStartANew);
  document.querySelector("#start").addEventListener("click",didAlreadyStarted);
  document.querySelector("#save").addEventListener("click",saveFunctionCaller);
  
let validationMessage;
// itt elenörzöm, hogy _ van e a savingnamben
let isThereUnderscoreInSavingName;
function isThereUnderscoreInSavingNameFunction(){
  isThereUnderscoreInSavingName = savingName.search(/_/g);
}
//document.querySelector("#save").addEventListener("click",isThereUnderscoreInSavingNameFunction);
// itt vége elenörzöm, hogy _ van e a savingnamben
//Validation massage for isThereUnderscoreInSavingNameFunction
function validationMessageForIsThereUnderscoreInSavingNameFunction(){
  if(isThereUnderscoreInSavingName!=-1){
    validationMessage="Pls: \n Do not use underscore!";
  } else (validationMessage="Pls:")
}
//document.querySelector("#save").addEventListener("click",validationMessageForIsThereUnderscoreInSavingNameFunction);
// Vége Validation massage for isThereUnderscoreInSavingNameFunction

//itt jön a rész ami ellenörzi, hogy a mentés neve tartalmaz e white spacet-t
/*let isThereWhiteSpaceInSavingName;
function isThereWhiteSpaceInSavingNameFunction(){
  isThereWhiteSpaceInSavingName = savingName.search(/\s/g);
}
document.querySelector("#save").addEventListener("click",isThereWhiteSpaceInSavingNameFunction);
*/
//if there is not than the value will be -1 !!!!
//vége itt jön a rész ami ellenörzi, hogy a mentés neve tartalmaz e white spacet-t

//itt jön a rész ami ellenörzi, hogy a mentés neve tartalmaz e spacial charactert
let isThereSpecialCharInSavingName;
let proba;
function isThereSpecialCharInSavingNameFunction(){
  proba=savingName.replace(/\s/g, "_");
  isThereSpecialCharInSavingName = proba.search(/[\W]/g);
}
//document.querySelector("#save").addEventListener("click",isThereSpecialCharInSavingNameFunction);
//if there is not than the value will be -1 !!!!
//vége itt jön a rész ami ellenörzi, hogy a mentés neve tartalmaz e spacial charactert
//Validation massage for isThereUnderscoreInSavingNameFunction
function validationMessageForisThereSpecialCharInSavingNameFunction(){
  if(isThereSpecialCharInSavingName!=-1){
    validationMessage+="\n Do not use special character!";
  }
}
//document.querySelector("#save").addEventListener("click",validationMessageForisThereSpecialCharInSavingNameFunction);
// Vége Validation massage for isThereUnderscoreInSavingNameFunction

//is there multiple space in the saving name
let isThereMoreThanOneSpaceInSavingName;
function isThereMoreThanOneSpaceInSavingNameFunction(){
  isThereMoreThanOneSpaceInSavingName = savingName.search(/\s\s/g);
}
//document.querySelector("#save").addEventListener("click",isThereMoreThanOneSpaceInSavingNameFunction);
//is vége there multiple space in the saving name 

//Validation massage for isThereUnderscoreInSavingNameFunction
function validationMessageForisThereMoreThanOneSpaceInSavingNameFunction(){
  if(isThereMoreThanOneSpaceInSavingName!=-1){
    validationMessage+="\n Do not use more than one space in a row!";
  }
}
//document.querySelector("#save").addEventListener("click",validationMessageForisThereMoreThanOneSpaceInSavingNameFunction);
// Vége Validation massage for isThereUnderscoreInSavingNameFunction 




 // itt jön az a rész ami ellenörzi, hogy a mentett név volt e már mentve
 //itt elösször betölti a már elmentett elemeket, hogy aztán a kövi részben leelenőrize
 
function loadForAreThereASameNameSavedFunction(){
 let savedArrays = JSON.parse(localStorage.getItem( "mainSave"));
 //savedArrays.forEach(lapLoadfunctionn);
 areThereASameNameSavedFunction();
// Vége itt elösször betölti a már elmentett elemeket, hogy aztán a kövi részben leelenőrize

// a betöltöttből, ugyan ebben a functionbe egy uj functionba, azéert, hogy let savedArrays
//igenybe klehessen venni, de átalakítható, de a lényeg, hogy itt kezdődik a function ahol 
//leellenőrzi
function areThereASameNameSavedFunction(){
let savingNameWithUnderscore=savingName.replace(/\s/g, "_"); // a nevet amire ujjonnan probálok
//menteni átkell elösször convertálni, mert a mar elmentett nevek ebben a formátumban vannak
// hogy ahol white space volt ott már underscore van!!!
if(savedArrays!=null){
 for (let d = 0; d < savedArrays.length; d++) {
  //storedNamesForForLoop=storedNames[i];
  let currentArreyForUse=savedArrays[d];
  
  if (savingNameWithUnderscore==savedArrays[d][currentArreyForUse.length-1]){
    haveTheSameSavingName=true; // ahool felhasználjuk ott visssza tesszük falsra a mentés végén
console.log("Egyforma!!!!!!!");
} else {
  console.log("Nem egyforma!!!!!!!");
  
}
} 
} 

}
}

//document.querySelector("#save").addEventListener("click",loadForAreThereASameNameSavedFunction);
  // itt vége jön az a rész ami ellenörzi, hogy a mentett név volt e már mentve
  function validationMessageForareThereASameNameSavedFunction(){
    if(haveTheSameSavingName==1){
      validationMessage+="\n This Name is already been used!";
    }
  }
 // document.querySelector("#save").addEventListener("click",validationMessageForareThereASameNameSavedFunction);
  // Vége Validation massage for isThereUnderscoreInSavingNameFunction

  //itt elenőrzöm, hogy az utolsó betű az space-e
let isTheLastCharISSpaceInSavingName;
function isTheLastCharISSpaceInSavingNameFunction(){
  isTheLastCharISSpaceInSavingName = savingName.search(/\s$/g);
}
//document.querySelector("#save").addEventListener("click",isTheLastCharISSpaceInSavingNameFunction);
  //Vége itt elenőrzöm, hogy az utolsó betű az space-e
  //validation Message validationMessageForareThereASameNameSavedFunction()
  function validationMessageForisTheLastCharISSpaceInSavingNameFunction(){
    if(isTheLastCharISSpaceInSavingName!=-1){
      validationMessage+="\n The last  character shouldn't be space!";
    }
  }
  //document.querySelector("#save").addEventListener("click",validationMessageForisTheLastCharISSpaceInSavingNameFunction);
  // Vége Validation massage for validationMessageForareThereASameNameSavedFunction()


// itt elenörzöm, hogy az első betű space e

 let isTheFirstCharacterrISpaceInSavingName;
 function isTheFirstCharacterrISpaceInSavingNameFunction(){
   let FirstCharInSaingName=savingName.charAt(0);
  isTheFirstCharacterrISpaceInSavingName = FirstCharInSaingName.search(/\s/);
 }
// document.querySelector("#save").addEventListener("click",isTheFirstCharacterrISpaceInSavingNameFunction);
   //Vége itt elenőrzöm, hogy az első betű az space-e
   //validation Message validationMessageForareThereASameNameSavedFunction()
   function validationMessageForisTheFirstCharacterISpaceInSavingNameFunction(){
     if(isTheFirstCharacterrISpaceInSavingName!=-1){
       validationMessage+="\n The first  character shouldn't be space!";
     }
   }
  // document.querySelector("#save").addEventListener("click",validationMessageForisTheFirstCharacterISpaceInSavingNameFunction);
   // Vége Validation massage for validationMessageForareThereASameNameSavedFunction()


//Vége itt elenörzőm, hogy az első betű space e

//adding eventlisteners for save
document.querySelector("#save").addEventListener("click",validationForSaveEventlistenerFunction);
function validationForSaveEventlistenerFunction() {
  if(didHeSaved==true){
isThereUnderscoreInSavingNameFunction();
validationMessageForIsThereUnderscoreInSavingNameFunction();
isThereSpecialCharInSavingNameFunction();
validationMessageForisThereSpecialCharInSavingNameFunction();
isThereMoreThanOneSpaceInSavingNameFunction();
validationMessageForisThereMoreThanOneSpaceInSavingNameFunction();
loadForAreThereASameNameSavedFunction();
validationMessageForareThereASameNameSavedFunction();
isTheLastCharISSpaceInSavingNameFunction();
validationMessageForisTheLastCharISSpaceInSavingNameFunction();
isTheFirstCharacterrISpaceInSavingNameFunction();
validationMessageForisTheFirstCharacterISpaceInSavingNameFunction();

  }
}
//end edding eventlisteners for save


  // save function
  
  // ezt a részt majd beállítani, hogy csak akkor működjön ha tényleg el is mentem, ha az okra kattintok
  function SaveTimer() {
    //  timerInnerText első tagjának berakjuk direktbe az éppeni időt, majd a lapSavePTag be belerakjuk
    // az összes lap időt sorba, majd az értékeit egy forEachel sorba pushingolom timerInnerText-be
// azért nem lehet közvetlenül ebbe, hogy az addig hozzá adott értéket ne írja felül, azert csak a Push
//majd  végül a savingNamet is bele pushingolom a végére
//

if(didHeSaved==true){ // ez az if rész azt dönti el, hogy miután rányomtam a save gombra és a promt
  //feljön, hogy végül mentettem e vagy kiléptem, csak ha mentettem akkor menti el, ha kilépek
  // akkor nem, ezelőtt akkor is mentett és hagyott egy üres lyukat!!!!
if (isTheLastCharISSpaceInSavingName==-1){
if (isTheFirstCharacterrISpaceInSavingName==-1){    
if(isThereUnderscoreInSavingName==-1/*1==1 isThereWhiteSpaceInSavingName==-1*/){
if(isThereSpecialCharInSavingName==-1){
if(isThereMoreThanOneSpaceInSavingName==-1){

if(haveTheSameSavingName==false){

  let lapSavePTag;
 // console.log("1 ahol sima aray");
 // console.dir(lapSavePTag);
  // let timerInnerText=[];
  timerInnerText[0]=document.querySelector("#ido").textContent;
  lapSavePTag=document.querySelectorAll(".childLapPTag");  
  //console.log(lapSavePTag[2]);
  //console.dir(lapSavePTag);
  //foreachhez tartozzik
  lapSavePTag.forEach(timerInnerTextPushFunction);
  
  
  
  function timerInnerTextPushFunction(value,index,itself){
    timerInnerText.push(lapSavePTag[index].textContent); //value.textContent is jó
    //console.log(timerInnerText);
  };
  
 // console.log("timerInnerText for each után");
  //console.log(timerInnerText);
  //console.log(timerInnerText[3]); // cant acces ok!
  //foreachhez tartozzó 
  
  //actual savehez tartozó
  
  //var names = [];
  //names[0] = prompt("New member name?");
  let savingNameWithUndeerscoreForSave=savingName.replace(/\s/g, "_");
  console.log(savingNameWithUndeerscoreForSave+"ezt keressük!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  timerInnerText.push(savingNameWithUndeerscoreForSave);
 // console.log("timerInnerText push save name utan");
 // console.log(timerInnerText);
 // console.log(timerInnerText[3]);
  
  //:!%
  //:!%ű
  //:!%ű
  //:!%ű
  //:!%ű
  //:!%ű
  
  //:!%ű
  //:!%ű
  //:!%ű
  /* // ez kész amit itt írtam, elv
  let haha = JSON.parse(localStorage.getItem( "mainSave"));
  //let mainSave=haha;  ez kell majd azért, hogy becsukas utáni ujranyitasnal a mentés ne írja felül
  az addigi mentéseket, de egy if conditionnal ami arról fog szolni, ha van már mentve ezzel a név alatt akkor 
  az történik ami felül van, de ha nincs, tehat pl nem ad vissza arrayt akkor a mainSave= egy üres
  arrayerl, ez azért fontos, hogy a mainsave akkor is aray legyen ha meg nincs mentésünk előtte*/
  
  /*ez ami tii van felette ez fontos!!! a commentben!! */
  
  /*
  készz!! megvan timerInnerTexttel van a problema, save után nullázódnia kell neki is!!
  */
  /*console.log("timerInnerText");
  console.log(timerInnerText);
  console.log("timerInnerText vége");
  mainSave.push(timerInnerText);
  console.log("mainSave");
  console.log(mainSave);
  console.log("tmainSave vége");
  console.log("mainSave[0]");
  console.log(mainSave[0]);
  console.log("mainSave[0][1]");
  console.log(mainSave[0][4]);
  // nem értem teljesen 
  */
  
  /* ez itt azért kell, hogyha ujra töltöm pl a lapot és volt már mentes akkor ne írja felül az addigiakat*/
  let beforeSave= JSON.parse(localStorage.getItem( "mainSave"));
  console.log(beforeSave+ "beforsave");
  if(beforeSave!=null){
    mainSave=beforeSave;
  }// ez az iff condition checkely, hogy volt e már mentés előzőleg, a beforeSavebe meg teszem bele az addigit
  //Ha volt
  
  mainSave.push(timerInnerText);
  timerInnerText=[];
  
  /*probaas.push(cc);
  console.log("probaas");
  console.log(probaas);
  console.log("probaas vége");
  cc.push(2);
  */
  
  
  //localStorage.setItem( whichSave, JSON.stringify(timerInnerText));
  localStorage.setItem( "mainSave", JSON.stringify(mainSave)); // majd átírhatom
  // ez  itt allatta debugolas, nézem, hogy a mentés után egyből mit mentettem el!!!

  /*let hah = JSON.parse(localStorage.getItem( "mainSave"));
  console.log("hah");
  console.dir(hah);
  */
  // debugolas vége
  // a save function egyenlőre jól működik
  //itt leljebb ez majd a loadhoz fog tartozni
  
  /* Majd kell egy functiont írnom, ami nem engedi, hogy mentsek olyan névre ami volt már
  even a betöltöttekben */ //!!!!!!!!!!!!!!!!!!!!!!!!!
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
  //actual savehez tartozó
 // console.log(whichSave);


    //didHeSavedet vissza állítom falsra,de egyenlőre nem hasznalom sehol
      // didHeSaved=false;
          //ez volt eredetileg, de már nem kell ennyire komplexre
    //if (didHeSaved===true) {
      // // whichSave+=1; //ez azért, hogy a következőnél nöjjön a szám;
     //  didHeSaved=false;
    // } 
     //ez volt eredetileg, de már nem kell ennyire komplexre
     
  } else {
    console.log("egyfoma nevű, így ne ments!!!");
    alert(validationMessage);
    haveTheSameSavingName=false;
  }
} else{alert(validationMessage);}
} else{alert(validationMessage);}
} else{alert(validationMessage);}
} else{alert(validationMessage);}
} else{alert(validationMessage);}
  }
validationMessage="";
   }
  document.getElementById("save").addEventListener('click',SaveTimer);
  // !! save function 1 vége





  




  //load function

// Delete all
//itt adjuk hozzá a delete all divet a sor elejére!! itt csak a divet magat adjuk hozzá
document.querySelector("#saved").addEventListener("click",addDeleteAllDivFunction)
function addDeleteAllDivFunction(){
  let isThereADeleteAllDiv=document.querySelector("#deleteAllDiv");
  let isthereASavingAlready = localStorage.getItem( "mainSave");
  // ez az alatta lévő ifes részhez kell!!!


if(isThereADeleteAllDiv==undefined && isthereASavingAlready!=undefined){ // ez az if azert kell, mert ez dönti el, ha van mar deleteAll 
  //divunk akkor nem hozz létre még egyett amikor a savedre kattintok!!
  let deleteAllDiv = document.createElement('p');
  deleteAllDiv.textContent=`Delete All`;
  deleteAllDiv.id="deleteAllDiv";
 // deleteAllDiv.className="deleteAllDiv";
 let parentFordeleteEverything=document.querySelector(".stopwatchUpperScreen");

 parentFordeleteEverything.append( deleteAllDiv);

 document.querySelector("#ido").textContent="Savedes";
} else{document.querySelector("#ido").textContent="There is no saved yet";
      document.querySelector(".ido").style.backgroundColor= "#FFE4C4";}
}

// end Delete all

    /* ezzel a savre kattintva leállítom a mainFunction folyamatos végrehajtását és az ifStartedet
    vissza állítom falsra, hogy a többi function működjön */
    document.querySelector("#saved").addEventListener("click",()=>{
      ifStarted=false; // ezzel az ifstartedott vissza állítom falsra
      clearInterval(mainInterval);
     }); 

  /*elösször, elkell távolítani az összes lapat, es az első fö timert is megváltoztatni
  egy más szövegre hogy utánna majd ujra építsük!!
  csinálhatunk majd később olyan extrát, hogy ilyenkor amikor a loadra megyünk meg strartra, vagy newra
  akkor megkérdezi, hogy akarjuk e menteni vagy figyelmeztett, hogy nem lesz elmente az eredményünk, de ezt
  majd csak később
  
  ez után, hogy lesz load lehetőség, valőszínüleg megkell azt is csinálni, hogy amikor a load van
  betöltve akkor ne lehessen a lapokat elmenteni, mert arra nincs szükség,
  illetve amikor ezek után nyomok a startra akkor szintén kezdje úgy, hogy az addig betöltött loadokat 
  (lapokat) törölje, talán a new gomb már így müködik already,
  
  és a load function maga úgy fog működni, hogy amikor elösször rákattíntok a loadra vagy savedre attól
  függ, hogy nevezem akkor csak a neveket tölti be a lapokra ahogy elmentettem, majd ha rákattintok egy mentett
  névre, akkor megint azt csinálja, hogy az addigi lapokat eltávolítja, és betölti ahhozz a mentéshez szánt 
  lapokat, eredményeket, ez így jó  lesz
  
  
  lehetséges bugok: amikor ujra töltjük a lapot akkor a whichsave elölről kezd majd számolni és újra bedobhat
  olyan neveket, hogy úgy mentsük mint save1 or save2, eé ez felöl írná az addigi mentéseket
  ezt pl úgy lehetne elkerülni, hogy a mentés nevéhez hozzá adni az akkor a mentés pillanatában
  történő dátumot is, de majd a lekérdezesnel lesznek gondok, hogy kérdezünk le egy ilyet
  illetve  ha hozzé adok olyan funciót, hogy ezt át is lehet nevezni, akkor meg pláne kell, hogy valami
  validálja, hogy ne legyen az, hogy olyanra nevezem át ami már foglalt,
  ezt pl úgy is csinálhattnám, hogy lenne egy arrayem amibe belementem az összes addigi mentésnek a nevét,
  ahonnan persze szintén módosítani és törölni kell, ha egy mentést módosítok, törlök,
  de mielőtt mentek, innen átnézi, hogy ebben a listában szerepel e már ugyan ez a név, ez az egyik
  a masik mivel az arrayek végére eszem a nevet, lehet az is akár, hogy a meglévő arrayek utolsó eleménl nézi
  át, hogy szerepelt-e már
  */
  
  // Load első rész ahol eltávolítjuk az addig betöltött lapokat!!
  document.querySelector("#saved").addEventListener('click',LapsRemoveLoadFunction);
  
  function LapsRemoveLoadFunction() { // a renamefunkcional is hívva van a loadsavedssel együtt
    let removeParentLapsForLoad=document.querySelectorAll(".parentContainerDiv");
  removeParentLapsForLoad.forEach(removeLapsForLoadFunction);
  
  function removeLapsForLoadFunction(value,index,itself) {
    removeParentLapsForLoad[index].parentElement.removeChild(removeParentLapsForLoad[index]);
  }
  
  }
  
  // load első rész vége
  
  //load második rész, 
  //betölteni a neveket és nekik létrehozni a lapokat!!!
  /*ugy lehetne talán könnyen hozzá férni, hogy mindig egy llistát módosítok es abba listában lennének a
   beágyazott arayek amiket kezelek majd 
   tehat, mar a timer betöltésénél betöltöm ezt a load arayt is, amit ha módosítok a savel, vagy a törléssel
   akkor egyből lementi nekem és újra is töli, hogy használható legyen, és akkor tudnám módosítani könnyebben
   ez egy jó megoldás lehet!!!
  
   Ha később módosítom a sorrendet, akkor ebben alistában is módosítani kell, hogy ilyen sorrendbe töltse
   majd vissza, vagy egyszerüen hozzá adok egy adatott megint csak a vége elöttre ami azt fogja jelezni, 
   hogy milyen sorrendbe kell őket rakni, azért ezt ne a végére rakjam, mert akkor az elötte lévő kódott
   elronthatja
   */
  
   document.getElementById("saved").addEventListener('click',loadSaveds);
  
   function loadSaveds(){ // a renamefunkcional is hívva van
   let storedNames = JSON.parse(localStorage.getItem( "mainSave"));
   console.log(storedNames);
   
  
  // document.querySelector("#ido").textContent="Savedes"; // itt adom meg a pirosnak mi lesz a neve
  if (storedNames!=undefined){
  storedNames.forEach(lapLoadfunction)
  console.log(storedNames[0][timerInnerText.length-1])
  }
  
  
   function lapLoadfunction(value,c,itself){
  
    let parentContainer;
    let child;
    let childDivSettings;
    let childDivSettingsInside;
    
    let firstArray=storedNames[c];
  
   child = document.createElement('li');
   child.textContent= firstArray[firstArray.length-1].replace(/_/g, " ");// ez arra jó
    // hogy itt adja hozza az elemthez a mentet araynek a menttet nevét , itt meg valami jön, nem fontos `${c}.  ${firstArray[firstArray.length-1]}`;
   child.id="pId"+firstArray[firstArray.length-1]; // az id hosszának ugyan anyinak kell lenie
   // min a parentContainer.id hosszának, mert később amikor kattintok rájuk, hiában van a child
   // a parentcontenerben, amikor az írasra kattintok akkor a childnak veszi az id já és 
   //én ezzel az idval dolgozok később a moreDataSavingsnél
   child.className+="childLapPTagForSaved";
  
    parentContainer = document.createElement('div');
    parentContainer.id="div"+firstArray[firstArray.length-1];
    parentContainer.className="parentContainerDiv";
    parentContainer.append(child);
  
    childDivSettings = document.createElement('div');
    childDivSettings.id="settingsDiv"+[c];
    childDivSettings.className +="settingsDivClassName";
    //childDivSettings.textContent=`settings`;
    

    childDivSettingsInside = document.createElement('div');
    childDivSettingsInside.id="settingsIsnsideDiv"+[c];
    childDivSettingsInside.className ="settingsInsideDivClassName";
    childDivSettingsInside.textContent=`settings`;
    childDivSettings.append(childDivSettingsInside);

    parentContainer.append(childDivSettings);
  
    document.querySelector(".stopwatchUpperScreen").append( parentContainer);
   
   /* document.querySelector("#div"+firstArray[firstArray.length-1]).addEventListener('click',
    deleteLapsForMore);
    document.querySelector("#div"+firstArray[firstArray.length-1]).addEventListener('click',
    moreDataSaving);
*/

    document.querySelector("#pId"+firstArray[firstArray.length-1]).addEventListener('click',
    deleteLapsForMore);
    document.querySelector("#pId"+firstArray[firstArray.length-1]).addEventListener('click',
    moreDataSaving); // ez feleslegesnek tűnik

   }
  }
  
  //function arra, hogy amikor kattintok egy elemntre akkor lenyissa
  function deleteLapsForMore(){
    let lapsForNewFunction=[];
  lapsForNewFunction=document.querySelectorAll(".parentContainerDiv")
  console.log(lapsForNewFunction);
  
  for (let i = 0; i < lapsForNewFunction.length; i++) {
    lapsForNewFunction[i].parentElement.removeChild(lapsForNewFunction[i]);
  }
    
  }
  
  /* CSak megkellet oldani, hogy a hívás egyből a functionból jöjjön és már is jó lett, értem, hogy
  amikor mentke
  egyből nézhető is a mentés */

  let storedNamesMoreData;
  function moreDataSaving(e){
     storedNamesMoreData = JSON.parse(localStorage.getItem( "mainSave"));
    console.log(storedNamesMoreData);
    let storedNamesForForLoop="g";
  
    let targetId=e.target.id;
    let SavingNameOfId=targetId.slice(3);
    console.log(SavingNameOfId);
    
    for (let d = 0; d < storedNamesMoreData.length; d++) {
      //storedNamesForForLoop=storedNames[i];
      let currentSavedArrey=storedNamesMoreData[d];
      if (SavingNameOfId==storedNamesMoreData[d][currentSavedArrey.length-1]){
        document.querySelector("#ido").textContent=storedNamesMoreData[d][currentSavedArrey.length-1].replace(/_/g, " ");; /*
        ezt azért ide raktam, hogy ne keljen megismételni minden eggyes iterációba */

// itt hozom létre a p elementett, ami nem tartozik a listhez, es a mentett main timját ide írom majd ki
        let savedMainIdo= document.createElement('p');
        savedMainIdo.textContent= storedNamesMoreData[d][0];
        savedMainIdo.id="placeForMainTimeForLoading";
        savedMainIdo.className="parentContainerDiv";
        document.querySelector(".stopwatchUpperScreen").append( savedMainIdo);
// itt vége hozom létre a p elementett, ami nem tartozik a listhez, es a mentett main timját ide írom majd ki

        for (let i = 1; i < storedNamesMoreData[d].length-1; i++) {  // az i azért indul egyről, mert a legelső
          // a mainTime már nem kell és, hogy az legyen kihagyva!!!
        let parentContainer;
        let child;
        let childDivSettings;
        
        let textContentForSaving=storedNamesMoreData[d][i]; // má nem aktuális!! a commentitt azért adok hozzá egyett, mert már, hogy a
        // legelsőt ami a mentes fő ideje, ne rakja be listbe, mert annak mar egy külön p taget létre
        //hoztam, hogy ne kerüljön bele a számításba, ezert megkellett emelni, és ezert kell
        
        //let firstArray=storedNames[i];
        
        child= document.createElement('li');
        child.textContent= textContentForSaving; //firstArray[firstArray.length-1];// ez arra jó
        // hogy itt adja hozza az elemthez a mentet araynek a menttet nevét , itt meg valami jön, nem fontos `${c}.  ${firstArray[firstArray.length-1]}`;
        child.id="p"+[i];
        child.className+="childLapPTagForSaved";
        parentContainer = document.createElement('div');
        parentContainer.id="div";//+firstArray[firstArray.length-1];
        parentContainer.className="parentContainerDiv";
        parentContainer.append(child);
      
       /* childDivSettings = document.createElement('div');
        childDivSettings.id="settingsDiv"+[i];
        childDivSettings.className +="settingsDivClassName";
        childDivSettings.textContent=`settings`;
        parentContainer.append(childDivSettings);
        */
      
        document.querySelector(".stopwatchUpperScreen").append( parentContainer);
        console.log("l");
        }
        console.log(2);
  
    } 
  }
  }


 
  //load másodiik rész vége
  
  // load harmadik része
  
  
  
  /*addEventListener('click', function ( e ) {
    console.log(e.target.id);
  });*/
  
  /* ha rákatintokk egy elmentett névre, akkoz addig a ésmi a lapokba van ki kell törölni mint maskor is
   akkor a hozzá tartozó adatokat kell, hogy  betöltse a lapokba, amik ahhozz a menteshez tartoznak!!*/
  
  
  //load harmadik részének a vége
  
  
  
  /*document.getElementById("saved").addEventListener('click',loadSaveds);
  
  function loadSaveds(){
  let storedNames = JSON.parse(localStorage.getItem( "StopperSave"));
  console.log(storedNames[0]);
  }
  */
  //load function vége
  
  
  
 // })();
  
  //csak akkor mentsen ha asz okra kattintok, ezt majd nézd meg biztosabbra
  //!! Save function vége
  
  
  //ez működik, csak át kell alakítani:
  /* document.querySelector("#save").addEventListener('click', function(e){
    e.target.remove();
  });
  ez nem kell csak próbálgattam */ 
  
  
  
  
  /*document.querySelector(".settingsDivClassName").addEventListener('click',function(e){
    if(e.target && e.target.id== 'brnPrepend'){
          e.remove();
     }
  }); */
  
  
  /*function torlesfunction(elem) {
    elem.parentNode.removeChild(elem);
  }*/
  
  



    






(function deleteFromSavedMainCloaser(){// Ezt akar lehetne SettingsFunctionMenufeleépítés nevű is,talán
  //jobban találó

  // itt döntöm el, hogy a saveden belül vagyok e
  let areWeInsideSavedWhereOnlyTheSavedNAmesAreShown=false;
  let didWeClickOnSettings=false;
  let settingsDivVariable;


  document.querySelector("#saved").addEventListener("click", ()=>{
    areWeInsideSavedWhereOnlyTheSavedNAmesAreShown=true;});

  document.querySelector("#new").addEventListener("click", ()=>{
    areWeInsideSavedWhereOnlyTheSavedNAmesAreShown=false;});
    // vége itt döntöm el, hogy a saveden belül vagyok e






// a function ami egy variablebe teszi az összes settings divet
function getAllSettingDivForSaveds(){
  settingsDivVariable=document.querySelectorAll(".settingsInsideDivClassName");
}
// a function ami egy variablebe teszi az összes settings divet

//Ha rányomok a savre, akkor a fenti function hívja
document.querySelector("#saved").addEventListener("click",getAllSettingDivForSaveds);
//Ha rányomok a savre, akkor


//change setting textContent from back To settings 
function changeSettingsTextConntentFromBackToSettings(){
  settingsDivVariable.forEach((value)=>{
    value.addEventListener("click",()=>{settingsDivVariable.
      forEach((value)=>{value.textContent="settings"});});
  });
}

document.querySelector("#saved").addEventListener("click",
changeSettingsTextConntentFromBackToSettings);
// end change setting textContent from back To settings 




//delete all proba
//ennek előrébb kell lennie mint annak ami megcsinálja ezeket az innerdiveket, hogy előre 
//törölje ami van és ne már az ujjonnan megcsináltat törölje
function deleteAlldivForSettings(){
  let settingsMenus=document.querySelectorAll(".divForSettings")
  settingsMenus.forEach((value)=>{
    value.parentElement.removeChild(value);
  });
}

//itt adom hozzá delete all
function addDeleteingEventListenerToSettings(){
  settingsDivVariable.forEach((value)=>{value.addEventListener("click",
  deleteAlldivForSettings); 
});
}
document.querySelector("#saved").addEventListener("click",addDeleteingEventListenerToSettings);
//itt adom hozzá vége
//delete vége all proba


//Settingsre kattintva megjelenik a rename buttun a settingsen belül
function addEventlistenerToSetting(){
  settingsDivVariable.forEach(forForEachfunctionForRenaminginSaveds);
}
function forForEachfunctionForRenaminginSaveds(value,index,itself){

  value.addEventListener("click",()=>{console.log(2);
    //if(didWeClickOnSettings==false){
    let probaDivFordocument=document.createElement('div');
        probaDivFordocument.textContent="Rename";
        //probaDivFordocument.className="renameInsideSettings";
        //value..append(probaDivFordocument);
        //probaDivFordocument.classList.add("first");
        //probaDivFordocument.classList.add("second");
        probaDivFordocument.classList.add("renameInsideSettings","divForSettings");
        value.parentElement.append(probaDivFordocument);
    //}
  }
  );
};
document.querySelector("#saved").addEventListener("click",addEventlistenerToSetting);
// vége Settingsre kattintva megjelenik a rename buttun a settingsen belül


//Settingsre kattintva megjelenik a delete buttun a settingsen belül
function addDeleteEventlistenerToSetting(){
  settingsDivVariable.forEach(forForEachfunctionForDeleting);
}

function forForEachfunctionForDeleting(value,index,itself){
  value.addEventListener("click",()=>{console.log(2);
    //if(didWeClickOnSettings==false){

    let probaDivFordocument=document.createElement('div');
        probaDivFordocument.textContent="Delete";
        probaDivFordocument.classList.add("deleteInSettings","divForSettings");
        //probaDivFordocument.className="deleteInSettings";
        //value.append(probaDivFordocument);
        value.parentElement.append(probaDivFordocument);
    }
 // }
  );
};
document.querySelector("#saved").addEventListener("click",addDeleteEventlistenerToSetting);
// vége Settingsre kattintva megjelenik a delete buttun a settingsen belül

// itt oda adom az eventlistenereket a settings divhez, a vege az össz ilyen function vége lesz ami itt benne van
/*function addEventlistenersToSettingDivToHaveFunctions(){
// rgégi név: addEventlistenerToSettingWhichDecidesIfWeAllreadyClickedToSettings
  settingsDivVariable.forEach(forForEachfunctionForRenaminginSaveds);

  function forForEachfunctionForRenaminginSaveds(value,index,itself){
   //value.addEventListener("click",callBackToEventlistenerChangedidWeClickOnSettingsTrue);
  // value.addEventListener("click",deleteAlldivForSettings);
  // value.addEventListener("click",deleteSiblingElementsIsnsideSettingsAndClickBack);
  // value.addEventListener("click",callBackToEventlistenerChangeTextContent);
  // value.addEventListener("click",callBackToEventlistenerChangeTextContenttt);
   


  }
}
    */
     //A rész ami eldönti, hogy rányomtam e már egyszer a settingsre
      //Mert ha igen, akkor ha ujra rányomok akkor nem kell, hogy ujra létre hozzon egy delete es rename divet és duplikalja
      //megkell akadályozni, ez a rész ennek a megoldására fog szolgálni
/*  // change didWeClickOnSettings true
      function callBackToEventlistenerChangedidWeClickOnSettingsTrue(){
        didWeClickOnSettings=true;
      }
      */
    // change vége didWeClickOnSettings true

    //delete sibling elements when we are inside settings and clicking to go back
    // az if condition miatt ami checkeli az e.target.texcontent tartalmát emiatt ennek előrébb kell lennie
    // mink a functionnek ami beckről vissza változtatja az írást settingsre
  /*  function deleteSiblingElementsIsnsideSettingsAndClickBack(e){
      if(didWeClickOnSettings==true && e.target.textContent=="back"){
//!!!!
        let settingsMenus=document.querySelectorAll(".divForSettings")
        settingsMenus.forEach((value)=>{
          value.parentElement.removeChild(value);
        });
        console.log(5555555555555555);
      }
      
    }*/
    // end delete sibling elements when we are inside settings and clicking to go back
    //delete all proba


    
      // change settings textcontent to "back" //ennek előrebb kell lenni mint a functionek ami átírja backre
    /*  function callBackToEventlistenerChangeTextContenttt(e){
        if(didWeClickOnSettings==true /&& e.target.textContent=="back"/){
          //this.textContent="settings";
          didWeClickOnSettings=false;
          //ha ezeket külön szedjuk akkor nem fog jol mukodni a jelenlegi kondiciokkal
         
        }
        
      }
    */
     // change settings textcontent to "back"  
     
     
      // change settings textcontent to "back" // hátrébb kell lennie mint a résznek ahol ifben chackeljuk
      //, hogy az e.target.texcontetnt egyenlő e a backkel, mert ha ez van előrébb akor az akkor is elsül
      //amikor eredileg meg nem kéne!!!!!!!!!!!
     /* function callBackToEventlistenerChangeTextContent(){
        if(didWeClickOnSettings==true){
        this.textContent="back";
        console.log("ééééééééééééééé");
        }
      }
    */
     // change settings textcontent to "back"   
     
     //delete settings menu when click on back
     let cLickOnSettings=false;
     function cLickOnSettingsFunction(){
       cLickOnSettings=false; //ez kell ide, hogy pl amikor ugy kikattintunk belole, hogy egy 
       //masik gombra ami miatt bezárul, attol meg ha ujra töltöm akkor ne befolyásolja a számítást
       //ne csuszzon el, mert ha ez nincs benne, akkor amikor vissza terunk, elosszor, ketszer kell
       //majd kattintani a settingsre mire ujra mukodni fog ugy mint eddig
      settingsDivVariable.forEach(AddClickEventListenerToSettings);
     }
function AddClickEventListenerToSettings(value){
value.addEventListener("click",ifWeClickedSettngs);
}
function ifWeClickedSettngs(e){
  if(cLickOnSettings==false){
    cLickOnSettings=true;
    this.textContent="back";
  } else{
    let settingsMenus=document.querySelectorAll(".divForSettings")
    settingsMenus.forEach((value)=>{
      value.parentElement.removeChild(value);
      this.textContent="settings";
    });
    cLickOnSettings=false;
  }
}
document.querySelector("#saved").addEventListener("click",cLickOnSettingsFunction);


     //End delete settings menu when click on back
   

  //settings

//document.querySelector("#saved").addEventListener("click",addEventlistenersToSettingDivToHaveFunctions);
// Vége itt oda adom az eventlistenereket a settings divhez, a vege az össz ilyen function vége lesz ami itt benne van














// Itt adom hozzá a rename lehetőséget, plusz a hozzá tartozó functionoket
//Promt box, ha a renammere kattintok
let rename;
let renameValidation;
let renameHasSpecialCharacter;
let renameWithoutSpace;
let renameUnderscoreCharacter;
let isThereMoreThanOneSpaceInRename;
let isTheLastCharISSpaceInRename;
let ForRenamehaveTheSameSavingName=false; // kell, hogy legyen kezdeti false eredmeny
let renameForSave;

function popupFunctionForRename(e) {
   renameForSave = prompt("Please rename here", e.target.parentElement.previousElementSibling.textContent);
  if (renameForSave == null || renameForSave == "") {
    rename = "";
  } else {
    rename = renameForSave;

     afterRenamePromtValidationVariablesFunction();
    if(ForRenamehaveTheSameSavingName==false){
    if(isTheLastCharISSpaceInRename==-1){
    if(isTheFirstCharacterISpaceInRename==-1){ 
    if(renameUnderscoreCharacter==-1){
    if(renameHasSpecialCharacter==-1){
    if(isThereMoreThanOneSpaceInRename==-1){ 
    //probaloadSaveds()
    getNameForRenammingFunction(e); //im not sure if this cloasure is needed?
    loadSavedsIntoAnArrayForRenamingFunction();
    findTheSameNameInThaSavedArrayForRename();
    renameSavedArrayForRenameFunction();
    SaveToLocalStorageTheRenamedArray();
    tectContentChangeForRenamingFunction(e);
    LapsRemoveLoadFunction(); // ez es a loadSaveds() azért kell
    loadSaveds();// ez es a loadSaveds() kell, mert ha nincs itt, akkor rename után ha rákattintok
    //relodeSavedsIntoVariable();
    //LapsRemoveLoadFunction(); // ez es a loadSaveds() azért kell
    //function probaloadSaveds(){storedNames = JSON.parse(localStorage.getItem( "mainSave"))};// ez es a loadSaveds() kell, mert ha nincs itt, akkor rename után ha rákattintok
    //loadSaveds();
    //egyre akkor nem hozza be aa részletesebb adatokat róla!!! csak miután ujra rányomok a saved gombra!!
    //de így ezzel megvan oldvaa

/*getAllSettingDivForSaveds();
changeSettingsTextConntentFromBackToSettings();
addDeleteingEventListenerToSettings();
addEventlistenerToSetting();
addDeleteEventlistenerToSetting();
cLickOnSettingsFunction();
*/
    
    } else{alert(renameValidation);}
    } else{alert(renameValidation);}
    } else{alert(renameValidation);}
    } else{alert(renameValidation);}
    } else{alert(renameValidation);}
    } else{alert(renameValidation);}
//  } else if(renameHasSpecialCharacter!=null){window.
   //   alert("Do not use special character including underscore");}
  // } else if(renameUnderscoreCharacter!=null){window.
   //   alert("Do not use underscore character  including underscore");}
    ForRenamehaveTheSameSavingName=false;
    renameValidation="";
   
  }
 // document.getElementById("demo").innerHTML = text;
}

function afterRenamePromtValidationVariablesFunction(){   
  isThereMoreThanOneSpaceInRenameFunction();
  validationMessageForisThereMoreThanOneSpaceInRenameFunction();
  renameUnderscoreValidationFunction();
  renameSpecialCharacterValidationFunction();
  validationMessageForRenameSpecialCharacterValidationFunction();
  validationMessageForrenameUnderscoreValidationFunction();

  isTheFirstCharacterISpaceInRenameFunction();
  validationMessageForisTheFirstCharacterISpaceInRenameFunction();
  isTheLastCharISSpaceInRenameFunction();
  validationMessageForisTheLastCharISSpaceInRenameFunction();
  loadForAreThereASameNameRenameFunction();
  validationMessageForareThereASameNameSavedForRename();
}



//
function addEventlistenerToRename(e){
  if(e.target.textContent=="back"){//ez kell, különben hiba üzenet lesz amikor törlöm
  // a rename divet, azért back, mert eddigre erre megváltozik amire ide érünk!!!
  document.querySelector(".renameInsideSettings").addEventListener("click",popupFunctionForRename);
  }
}
//
//prompt hozzá adása a renamehez
function addPopupAlertToRenameDiv(){
  settingsDivVariable.forEach((value,index,itself)=>{
  value.addEventListener("click",addEventlistenerToRename);
  });
}
document.querySelector("#saved").addEventListener("click",addPopupAlertToRenameDiv);
//prompt hozzá adása a renamehez
//Promt vége box, ha a renammere kattintok
// raname validation

//Does it have any special character

function renameSpecialCharacterValidationFunction(){
  renameWithoutSpace=rename.replace(/\s/g, "_");
  renameHasSpecialCharacter=renameWithoutSpace.search(/[\W]/g);

}
//vége Does it have any special character
//Validation massage for renameSpecialCharacterValidationFunction
function validationMessageForRenameSpecialCharacterValidationFunction(){
  if(renameHasSpecialCharacter!=-1){
    renameValidation+="\n Do not use special character!";
  }
}
// Vége Validation massage for renameSpecialCharacterValidationFunction


  //itt elenőrzöm, hogy az utolsó betű az space-e
 
  function isTheLastCharISSpaceInRenameFunction(){
    isTheLastCharISSpaceInRename = rename.search(/\s$/g);
  }
    //Vége itt elenőrzöm, hogy az utolsó betű az space-e

   //Validation massage for isTheLastCharISSpaceInRenameFunction
function validationMessageForisTheLastCharISSpaceInRenameFunction(){
  if(isTheLastCharISSpaceInRename!=-1){
    renameValidation+="\n Do not use space as a last character";
  }
}
// Vége Validation massage for isTheLastCharISSpaceInRenameFunction


//reanem is there more than one space in rename
function isThereMoreThanOneSpaceInRenameFunction(){
  isThereMoreThanOneSpaceInRename = rename.search(/\s\s/g);
}
// vége reanem is there more than one space in Rename
//Validation massage for isThereMoreThanOneSpaceInRenameFunction
function validationMessageForisThereMoreThanOneSpaceInRenameFunction(){
  if(isThereMoreThanOneSpaceInRename!=-1){
    renameValidation="Pls: \n Do not use more than one space in a row!";
  } else{renameValidation="Pls:";}
}
// Vége Validation massage for isThereMoreThanOneSpaceInRenameFunction

// does it has a same name
function loadForAreThereASameNameRenameFunction(){
  let alreadysavedsForRename = JSON.parse(localStorage.getItem( "mainSave"));
  //savedArrays.forEach(lapLoadfunctionn);
  areThereASameNameSavedForRenameFunction();
 // Vége itt elösször betölti a már elmentett elemeket, hogy aztán a kövi részben leelenőrize
 
 // a betöltöttből, ugyan ebben a functionbe egy uj functionba, azéert, hogy let savedArrays
 //igenybe klehessen venni, de átalakítható, de a lényeg, hogy itt kezdődik a function ahol 
 //leellenőrzi
 function areThereASameNameSavedForRenameFunction(){
 let alreadysavedsForRenameWithUnderscore=rename.replace(/\s/g, "_"); // a nevet amire ujjonnan probálok
 //menteni átkell elösször convertálni, mert a mar elmentett nevek ebben a formátumban vannak
 // hogy ahol white space volt ott már underscore van!!!
  for (let d = 0; d < alreadysavedsForRename.length; d++) {
   //storedNamesForForLoop=storedNames[i];
   let currentArreyForRename=alreadysavedsForRename[d];
   
   if (alreadysavedsForRenameWithUnderscore==alreadysavedsForRename[d][currentArreyForRename.length-1]){
   ForRenamehaveTheSameSavingName=true; // ahool felhasználjuk ott visssza tesszük falsra a mentés végén
 console.log("Egyformabbbbb");
 } else {
   console.log("Nem egyformabbbbbb");
   
 }
 }
 }
 }



// does vége it has a same name
//Validation massage for does vége it has a same name
function validationMessageForareThereASameNameSavedForRename(){
  if(ForRenamehaveTheSameSavingName==true){
    renameValidation+="\n There is alreay a saving with this name";
  }
}
// Vége Validation massage for does vége it has a same name

//Does it have underscore character
function renameUnderscoreValidationFunction(){
renameUnderscoreCharacter=rename.search(/_/g);
}
//vége Does it have underscore character
//Validation massage for renameUnderscoreCharacter
function validationMessageForrenameUnderscoreValidationFunction(){
  if(renameUnderscoreCharacter!=-1){
    renameValidation+="\n Do not use special character!";
  }
}
// Vége Validation massage for renameUnderscoreCharacter


// raname  vége validation

// itt elenörzöm, hogy az első betű space e

let isTheFirstCharacterISpaceInRename;
function isTheFirstCharacterISpaceInRenameFunction(){
  let firstCharInRename=rename.charAt(0);
  isTheFirstCharacterISpaceInRename = firstCharInRename.search(/\s/);
}

  //Vége itt elenőrzöm, hogy az első betű az space-e
  //validation Message validationMessageForareThereASameNameSavedFunction()
  function validationMessageForisTheFirstCharacterISpaceInRenameFunction(){
    if(isTheFirstCharacterISpaceInRename!=-1){
      renameValidation+="\n The first  character shouldn't be space!";
    }
  }
 // document.querySelector("#save").addEventListener("click",validationMessageForisTheFirstCharacterISpaceInSavingNameFunction);
  // Vége Validation massage for validationMessageForareThereASameNameSavedFunction()


//Vége itt elenörzőm, hogy az első betű space e




//  relodeSavedsIntoVariable ez azért jó és kell, mert a név változtatás után, ujra tölti
// storedNamesMoreData variablet- hogy az új adatokkal müködjön mostantól
//function relodeSavedsIntoVariable (){storedNamesMoreData = JSON.parse(localStorage.getItem( "mainSave"));}
// vége  relodeSavedsIntoVariable
// getting savingnamees into a variable for renaming rossz?
let savedNameForRenaming;
function getNameForRenammingFunction(passed){
savedNameForRenaming=passed.target.parentElement.previousElementSibling.textContent;
console.log(savedNameForRenaming);
}
/*document.querySelector(".renameInsideSettings").
addEventListener("click",getNameForRenammingFunction);*/
// vége getting savingnamees into a variable for renaming

// load the saveds into an array
let loadSavedsIntoAnArrayVariable;
function loadSavedsIntoAnArrayForRenamingFunction(){
  loadSavedsIntoAnArrayVariable=JSON.parse(localStorage.getItem( "mainSave"));
  console.log(loadSavedsIntoAnArrayVariable);
}

// load vége the saveds into an array

//find the same array in the saveds array
let ArrayForRename;
let arrayForDelete;
function findTheSameNameInThaSavedArrayForRename(){
  for (let d = 0; d < loadSavedsIntoAnArrayVariable.length; d++) {
   //storedNamesForForLoop=storedNames[i];
   let currentArreyForRenameSaved=loadSavedsIntoAnArrayVariable[d];
   let pastSavingName=loadSavedsIntoAnArrayVariable[d][currentArreyForRenameSaved.length-1];
   let pastSavingNameWithouthUnderscore=pastSavingName.replace(/_/g, " ");
   if (savedNameForRenaming==pastSavingNameWithouthUnderscore){
    ArrayForRename=d; // ahool felhasználjuk ott visssza tesszük falsra a mentés végén
    arrayForDelete=d;
 console.log(d)
 console.log("Egyforma!!!!!!!Í!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
 } else {
   console.log("Nem egyforma!!!!!!!Í!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
   
 }
 }
 }
//Vége find the same array in the saveds array

// rename savedAray
let arrayForRenameSaving;
function renameSavedArrayForRenameFunction(){
  arrayForRenameSaving=loadSavedsIntoAnArrayVariable;
  arrayForRenameSaving[ArrayForRename][arrayForRenameSaving[ArrayForRename].length-1]=rename;
  console.log(arrayForRenameSaving);
}
//end rename savedAray

// SaveTo LocalSotargeTheNewRenamedVariable
function SaveToLocalStorageTheRenamedArray(){
localStorage.setItem( "mainSave", JSON.stringify(arrayForRenameSaving));
}
//End SaveTo LocalSotargeTheNewRenamedVariable

//change the textcontect to the new name, so without reload it can show the actual name
function tectContentChangeForRenamingFunction(eFromAbove){
eFromAbove.target.parentElement.previousElementSibling.textContent=rename;
}
//change end the textcontect to the new name, so with


// Itt vége adom hozzá a rename lehetőséget plusz a hozzá tartozó functionoket

// eldönti, hogy settingset hasznaltuk e mar

//eldönti vége, hogy settingset hasznaltuk e mar







//Delete for settings //after rename


//prompt hozzá adása a a saved delete div
//
let deletingFromLoadSavedsIntoAnArrayVariable;
function addPopupAlertToDeletingDiv(){
  settingsDivVariable.forEach((value,index,itself)=>{
  value.addEventListener("click",addEventlistenerToDeleteFunction);
  });
}
document.querySelector("#saved").addEventListener("click",addPopupAlertToDeletingDiv);
//


//
function addEventlistenerToDeleteFunction(e){
  if(e.target.textContent=="back"){//ez kell, különben hiba üzenet lesz amikor törlöm
  // a rename divet, azért back, mert eddigre erre megváltozik amire ide érünk!!!
  document.querySelector(".deleteInSettings").addEventListener("click",popupFunctionForDelete);
  }
}
//
//elösször a setingekhez ad hozzá egy eventlistenert ami a settingre kattintva hozzá ad egy másikat!!

//prompt hozzá adása a a saved delete div



//pop up for saved delete
function popupFunctionForDelete(e) {
  var txt;
  if (confirm("Are you sure about deleting this saved item?")) {
    getNameForRenammingFunction(e); //im not sure if this cloasure is needed?
    loadSavedsIntoAnArrayForRenamingFunction();
    findTheSameNameInThaSavedArrayForRename();
    deletingASavedFromLoadSavedsIntoAnArrayVariableFunction();
    SaveToLocalStorageTheNewDeletedArray();
    deleteTheDeletedRowSOThereIsNoNeedForReloadingFunction(e);
    cLickOnSettings=false; // ez itt azért kell, mert különben, ha a saveden belül törlök akkor utánna
    //double klikk kell a következő settingsre, hogy működjön, mert enelkul az csak a masik klikre jó
  } /*else {
    txt = "You pressed Cancel!";
  }*/
 
}
//pop up vége for saved delete

// deleting from loadSavedsIntoAnArrayVariable for saved delete
 
function deletingASavedFromLoadSavedsIntoAnArrayVariableFunction(){
  deletingFromLoadSavedsIntoAnArrayVariable=loadSavedsIntoAnArrayVariable;
  deletingFromLoadSavedsIntoAnArrayVariable.splice(arrayForDelete, 1);
}

// deleting vége from loadSavedsIntoAnArrayVariable for saved delete

//save new array after deleting
// SaveTo LocalSotargeTheNewRenamedVariable
function SaveToLocalStorageTheNewDeletedArray(){
  localStorage.setItem( "mainSave", JSON.stringify(deletingFromLoadSavedsIntoAnArrayVariable));
  }
  //End SaveTo LocalSotargeTheNewRenamedVariable  

//vége save new array after deleting

let elementForDeletingFromHtml;
// delete the row so i dont need to relode
function deleteTheDeletedRowSOThereIsNoNeedForReloadingFunction(eFromAbove){
  elementForDeletingFromHtml=eFromAbove.target.parentElement.parentElement;
  elementForDeletingFromHtml.parentElement.removeChild(elementForDeletingFromHtml);
  }
// delete end the row so i dont need to relode


// vége Delete for settings after reanem




//



// Delete all hívas
document.querySelector("#saved").addEventListener("click",addEventListenerToDeleteAllDivFunction);
function addEventListenerToDeleteAllDivFunction(){
  let isThereADeleteAllDivAlready=document.querySelector("#deleteAllDiv");
  if(isThereADeleteAllDivAlready!=undefined){
document.querySelector("#deleteAllDiv").addEventListener("click",addConfirmToDeleteAll);
}
}
// Delete all hívas end


//confirmbox for delete all
function addConfirmToDeleteAll() {
  var txt;
  if (confirm("Are You sure you want to delete all the saved ones?")) {
    deleteSavedLapsForDeleteAll();
    deleteAllFromMemory();
    deleteTheRemainingDeleteAllFunction();

  } else {
    console.log("you pressed cancel for delete");
  }
}

// end confirm box for Delete all

//delete all laps
function deleteSavedLapsForDeleteAll(){

  let lapsForDeleteAll;
  lapsForDeleteAll=document.querySelectorAll(".parentContainerDiv");
  console.log(lapsForDeleteAll);
  
  for (let i = 0; i < lapsForDeleteAll.length; i++) {
    lapsForDeleteAll[i].parentElement.removeChild(lapsForDeleteAll[i]);
  }
 
}
// end Delete all laps

//deleteAll from memory
//document.querySelector("#saved").addEventListener("click",addEventListenerDeleteAllFromMemoryToDeleteAll);
//function addEventListenerDeleteAllFromMemoryToDeleteAll(){
//document.querySelector("#deleteAllDiv").addEventListener("click",deleteAllFromMemory);
//}
function deleteAllFromMemory() { window.localStorage.removeItem('mainSave');}
//end DeleteAll Form memory

//delete delete all div too
//document.querySelector("#saved").addEventListener("click",eventListenerForDeleteTheRemainingDeleteAllFunction);

//function eventListenerForDeleteTheRemainingDeleteAllFunction(){
//document.querySelector("#deleteAllDiv").addEventListener("click",deleteTheRemainingDeleteAllFunction);
//}
function deleteTheRemainingDeleteAllFunction() {
  let getDeleteAllDivForDelete=document.querySelector("#deleteAllDiv");
  if(getDeleteAllDivForDelete!=undefined){
  getDeleteAllDivForDelete.parentElement.removeChild(getDeleteAllDivForDelete);
}
}
//delete delete end all div too


//delete deleteAllDiv when for new
document.querySelector("#new").addEventListener("click",deleteTheRemainingDeleteAllFunction);
//delete end deleteAllDiv when for new








})(); // ez nem biztos, hogy kell, lehet félre ment és törölhető
// bezárás deleteFromSavedMainCloaser() function








})(); // This is the first main Cloaser's end.
