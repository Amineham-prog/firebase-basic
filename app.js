
const form = document.querySelector('#ajouter'); //selectionné l'élément form du HTML

const ul = document.querySelector('#list'); // Seléctionner l'élément list sur le document HTML


//---------------------------Fonction Affficher les données -------------------------------------------------
function affiche(doc){
  let li = document.createElement('li'); // Créer une balise li
  let supprimer = document.createElement('div'); // créer une balise div

let modifier = document.createElement('BUTTON'); // créer une balise pour modifier 

  li.setAttribute('data-id', doc.id) // donner l'identifiant de la personne comme attribut a la liste
  li.textContent=doc.data().Nom + ' ' + doc.data().prenom + ' ' +doc.data().age + ' , id=  ' + doc.id //mettre les données dans la liste
  supprimer.textContent='X' // Ecrite dans la balise supprimer
  modifier.textContent='Update' // Ecrite dans la balise modifier
  li.appendChild(supprimer) // intégrer le 'x' dans la balise li
  li.appendChild(modifier)
  ul.appendChild(li);//intégrer la balise li dans la balise ul présente sur le html
  
  //-------------function delete data ---------------------------------
  supprimer.addEventListener('click',(e)=>{
    let id = e.target.parentElement.getAttribute('data-id');//Obtenir l'identifiant
    db.collection('personnes').doc(id).delete();//Supprimer cette identifiant de la base de données
    alert("element " + id + ' a été supprimé')

  })
  //---------------------------------------------------------------------------------------



  //--------------------------------function UPDATE ---------------------------
  modifier.addEventListener('click',(e)=>{
    let newnom= prompt("Donner le nom") // lire le nouveau nom 
    let id = e.target.parentElement.getAttribute('data-id');//Obtenir l'identifiant
   //Modifier le nom sur la base de données -
    db.collection('personnes').doc(id).update({
      Nom:newnom
    }

  
    );
    alert("Le nom de l'element " + id + ' a ete modifier')

  })}
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
   //----mettre les données de la forme dans les variable a ajouté------
    Nom: form.nom.value, 
    prenom: form.prenom.value,
    age: form.age.value
  });
  //------Vider les formes ------
  form.nom.value="";
  form.prenom.value="";
  form.age.value="";
});
//--------------------------------------------------------------------------------------------------







//-----------------------Real-time --------------------------------------------
// db.collection('personnes').onSnapshot(snapshot => {
//   let changes = snapshot.docChanges();
//   changes.forEach(change => {
//       console.log(change.doc.data());
//       if(change.type == 'added'){
//           affiche(change.doc);
//       } else if (change.type == 'removed'){
//           let li = ul.querySelector('[data-id=' + change.doc.id + ']');
//           ul.removeChild(li);
//       }
//   });
// });