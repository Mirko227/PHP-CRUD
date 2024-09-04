const formCreate = document.getElementById('create-user');
const formNome = document.getElementById('Nome');
const formCognome = document.getElementById('Cognome');
const formEmail = document.getElementById('Email');
let alert;
let alertbool;

formCreate.addEventListener('submit',(e)=>
{
    e.preventDefault();
    const formData = new FormData(formCreate);
    
    fetch('./create.php',{
        method:'POST',
        header: {
        'Content-Type':'application/json'
         },
        body: formData
        })
        .then(response => response.json())
        .then(data => {
           if(data.status === "Success")
            {         
             newAlert=`<div class="text-center alert alert-success alert-dismissible fade show " role="alert" id="alert">
                                    <strong>${data.status}:</strong> ${data.msg}. <a href="./"> Torna alla home</a>
                                    <button onclick="resetAlert()" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>`;
            
            }
            else{

                newAlert=`<div class="text-center alert alert-danger alert-dismissible fade show" role="alert" id="alert">
                                    <strong>${data.status}:</strong> ${data.msg}.
                                    <button onclick="resetAlert()" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>`;

            }    

            clearForm();
            checkAlert();
            
        })
        .catch((error) => {
        
            newAlert=`<div class="text-center alert alert-danger alert-dismissible fade show" role="alert" id="alert">
                                    <strong>Errore:</strong> ${error}.
                                    <button onclick="resetAlert()" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>`;
        
            clearForm();
            checkAlert();

        });


        function clearForm(){
            formNome.value="";
            formCognome.value="";
            formEmail.value="";
        }
})

function resetAlert(){
    alertbool = false;
}

function checkAlert()
{
    if(alertbool==true){

        oldAlert = document.getElementById('alert');
        document.body.removeChild(oldAlert);
        document.body.insertAdjacentHTML('afterbegin',newAlert);

        }
        else{

        document.body.insertAdjacentHTML('afterbegin',newAlert)
        alertbool = true;

        }
}