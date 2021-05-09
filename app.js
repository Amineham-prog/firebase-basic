
const form = document.querySelector('#ajouter'); //selectionné l'élément form du HTML

const ul = document.querySelector('#list'); // Seléctionner l'élément list sur le document HTML


//---------------------------Fonction Affficher les données -------------------------------------------------
function affiche(doc){
  let li = document.createElement('li'); // Créer une balise li
  let supprimer = document.createElement('div'); // créer une balise div

  li.setAttribute('data-id', doc.id) // donner l'identifiant de la personne comme attribut a la liste
  li.textContent=doc.data().Nom + ' ' + doc.data().prenom + ' ' +doc.data().age + ' , id=  ' + doc.id //mettre les données dans la liste
  supprimer.textContent='X' // Ecrite dans la balise supprimer
  
  li.appendChild(supprimer) // intégrer le 'x' dans la balise li

  ul.appendChild(li);//intégrer la balise li dans la balise ul présente sur le html
  

}
//----------------------------------------------------------------------------------------------------

//--------------------------fonction GET DATA ----------------------------------
const personnes =db.collection('personnes').get().then(
  (mydata)=>{
   mydata.docs.forEach(doc=>{
      affiche(doc)
   })
     
   });
//--------------------------------------------------------------------------------




//--------------------------------------function ADD DATA --------------------------------------
form.addEventListener('submit', (e) => { //Actionner l'évenement submit de la form ajouter
  e.preventDefault(); // Empécher l'éxécution de submmit pour laisser la fonction firebase s'éxécuter
  db.collection('personnes').add({
    Nom: form.nom.value,
    prenom: form.prenom.value,
    age: form.age.value
  });
  form.nom.value="";
  form.prenom.value="";
  form.age.value="";
});
//--------------------------------------------------------------------------------------------------