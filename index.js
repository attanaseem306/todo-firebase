import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyCrueC5ZyxvYwTd821Jh2FjZgymb_F8EPQ",
    authDomain: "signup-61bb8.firebaseapp.com",
    projectId: "signup-61bb8",
    storageBucket: "signup-61bb8.appspot.com",
    messagingSenderId: "1063608895434",
    appId: "1:1063608895434:web:42bb4bf9bade6326623133"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


//////////////////////////    geting value    //// / ////// // ////////////////////////////////////

var input = document.getElementById("input")
var btn = document.getElementById("btn")
var ul = document.getElementById("todo")


/////////////////////// //////////////////////////////////////////////////



///////////////////////////////// This code add values in  firestore  ///////////////////////////////////////

btn.addEventListener("click", async () => {
    try {
        const docRef = await addDoc(collection(db, "list"), {
            inputValue: input.value
        })
            .then(() => {
                Swal.fire({
                    title: `Todo added`,
                    icon: 'success'
                }).then(() => {
                    location.reload()
                })
            })
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
})

/////////////////////////////////////////        //////////////////////////////////////



/////////////////////////   show  value in page /////////////////////////

async function showTodo() {

    const querySnapshot = await getDocs(collection(db, "list"));
    querySnapshot.forEach((doc) => {
        ul.innerHTML += `
       
        <li class="li">
        <div class="js"> 
             <p class="item">${doc.data().inputValue}</p>
             <i  class="fa-solid fa-pen-to-square" onclick='Edit("${doc.id}")'></i>
             <i class="fa-solid fa-trash" onclick='Delete("${doc.id}")'></i>
             </div>
        </li>
      `

    });

}

showTodo()

////////////////////////////  ////////////////////////////////////////////// /   //  ////    ///   / /////////


///////////////////// ////////       Delete todo in firestore   ///////////////////////////////////////

async function Delete(id) {
    await deleteDoc(doc(db, "list", id))
        .then(() => {
            Swal.fire({
                title: `Todo deleted`,
                icon: 'success'
            })
                .then(() => {
                    location.reload()
                })

        })


}

window.Delete = Delete

///////////////////////////// ////////////               ////////////////////////////



//////////////////////////////////   EDit  todo  code  /////////////////////////////////

function Edit(id) {
    const myData = doc(db, 'list', id);
    swal.fire({
        title: 'Enter value for replace',
        input: 'text',
        confirmButtonText: 'Edit',
        showLoaderOnConfirm: 'true'
    })
        .then(async (change) => {
            await updateDoc(myData, {
                inputValue: change.value
            }).then(() => {
                Swal.fire({
                    title: `Todo Edit`,
                    icon: 'success'
                }).then(()=>{
                    
                    location.reload()})
            })     
                    
        })

}

window.Edit = Edit

//////////////////////////////      End         End           ////////////////////////////////////



