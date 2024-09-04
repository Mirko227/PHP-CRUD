// array dei record restituito durante la creazione della tabella
let persone;
let tableContainer;
const viewportHeight = window.innerHeight;
const viewportWidth = window.innerWidth;

//variabili per la cancellazione dei record
const modalDeleteBtn = document.getElementById('modal-delete-btn');
const modalUpdateForm = document.getElementById('update-user');
const modalUpdate = document.getElementById('modal-update');

//variabili per l'aggiornamento dei record
const nomeUpdate = document.getElementById('Nome');
const cognomeUpdate = document.getElementById('Cognome');
const emailUpdate = document.getElementById('Email');
let idBtnDelete;
let idBtnUpdate;

// variabili per gli alert
let newAlert;
let alertbool= false;

//variabile per la paginazione 
let currentPage = 1;
const responsiveHeight = 880;
const row_per_page = viewportHeight>responsiveHeight? 6 : 4;
let inizioCiclo = 1;
let firstBtn;
let lastBtn;    
const pagine_per_paginazione = viewportWidth<=320? 3: viewportWidth<=375? 4 : viewportWidth<=425? 5 : 6;
let totpage;

//ricerca
const searchBar =  document.getElementById('searchBar');


generaTabella();

function generaRighe(persone){
    let righe='';
    persone.forEach( persona => {

    let riga = `
            <tr>
                <th scope="row">${persona.id_persona}</th>
                <td>${persona.nome}</td>
                <td>${persona.cognome}</td>
                <td>${persona.email}</td>
                <td class="d-flex flex-column d-sm-table-cell">
                    <button onclick="ottieniDatiModifica(event)" type="button"  class="btn btn-primary my-2" data-val="${persona.id_persona}" data-bs-toggle="modal" data-bs-target="#modal-update"><i class="bi bi-pencil-square" data-val=${persona.id_persona}></i></button>
                    <button onclick="eliminaPersonaid(event)" type="button" class="btn btn-danger btn-delete" data-bs-toggle="modal" data-bs-target="#modal-delete" data-val="${persona.id_persona}"><i class="bi bi-trash-fill" data-val=${persona.id_persona}></i></button>
                </td>
            
            </tr>
            `;

            righe+=riga;
    });
            return righe;
}



function generaTabella(){
    fetch('./select.php',{
        method:'GET',
        header: {
            'Content-Type':'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {     

        persone=data.data;

        if(data.status=="Success"){      

            if(persone.length > row_per_page){
                creaTabellaPerPagine(persone);
            }
            else{
                creaTabella(persone);
            }

        }else{
        
            console.error(data.status,": ",data.data);

        }

        })
        .catch((error) => {
            console.error('Error: ',error);
        });  
}



function eliminaTabella(){ 
    tableContainer = document.getElementById("table-container");
    const recordCount = document.getElementById("rows-count");
    const tabellaResponsive = document.querySelector('.table-responsive-sm');
    tableContainer.removeChild(tabellaResponsive);
    tableContainer.removeChild(recordCount);
    let paginazione;
    if(paginazione = document.getElementById("paginazione")){ 
        tableContainer.removeChild(paginazione);
    }
    
};



function eliminaPersonaid(e)
{
    idBtnDelete = e.target.getAttribute('data-val');
};



modalDeleteBtn.addEventListener('click', ()=>{

        const formData = new FormData();
        formData.append('id_persona', idBtnDelete);

        fetch('./delete.php',{
            method:'POST',
            header: {
                'Content-Type':'application/json'
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {      
            
            if(data.status == "Success"){

                eliminaTabella();
                generaTabella(persone);
                eliminaContenutoSearchBar();

                newAlert = `<div class="text-center alert alert-success alert-dismissible fade show " role="alert" id="alert">
                <strong>${data.status}: </strong>${data.msg}
                <button onclick="resetAlert()" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;

                }
                
            else{

                newAlert = `<div class="text-center alert alert-danger alert-dismissible fade show " role="alert" id="alert">
                <strong>${data.status}: </strong>${data.msg}
                <button onclick="resetAlert()" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;

            }
            
            checkAlert();

        })
        .catch((error) => {
            console.error('Errore: ',error);

            newAlert=`<div class="text-center alert alert-danger alert-dismissible fade show" role="alert">
                                <strong>Error:</strong> ${error}.
                                <button onclick="resetAlert()" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>`;

            checkAlert();
            
        });
        
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


function ottieniDatiModifica(e)
{
    idBtnUpdate = e.target.getAttribute('data-val');

    formData = new FormData();
    formData.append('id_persona', idBtnUpdate);

    fetch('./get-update-data.php',{
        method:'POST',
        header: {
            'Content-Type':'application/json'
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {     

        const persona = data.data[0];
        nomeUpdate.value = persona.nome;
        cognomeUpdate.value = persona.cognome;
        emailUpdate.value = persona.email;

    })
    .catch((error) => {
        console.error('Errore: ',error);
        
    });
};


modalUpdateForm.addEventListener('submit', (e)=>{

    e.preventDefault();
    const modal = bootstrap.Modal.getOrCreateInstance('#modal-update');
    modal.hide();


    const nome = document.getElementById('Nome').value;
    const cognome = document.getElementById('Cognome').value;
    const email = document.getElementById('Email').value;
    
    const formData = new FormData();
    formData.append('id_persona', idBtnUpdate);
    formData.append('nome', nome);
    formData.append('cognome', cognome);
    formData.append('email', email);

    fetch('./update.php',{
        method:'POST',
        header: {
            'Content-Type':'application/json'
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {    


            if(data.status == "Success"){

                eliminaTabella();
                generaTabella();
                eliminaContenutoSearchBar();

                newAlert = `<div class="text-center alert alert-warning alert-dismissible fade show " role="alert" id="alert">
                <strong>${data.status}: </strong>${data.msg}
                <button onclick="resetAlert()" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;

                }
                
            else{

                newAlert = `<div class="text-center alert alert-danger alert-dismissible fade show " role="alert" id="alert">
                <strong>${data.status}: </strong>${data.msg}
                <button onclick="resetAlert()" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;

            }
            
            checkAlert();

    }) 
    .catch((error) => {
        console.error('Errore: ',error);

        newAlert=`<div class="text-center alert alert-danger alert-dismissible fade show" role="alert" id="alert">
                                <strong>Errore:</strong> ${error}.
                                <button onclick="resetAlert()" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>`;

        checkAlert();                   
    });  
});




function generaBtn(data,currentPage,inizioCiclo,row_per_page,totpage){

    let btnList = '';
    let btn;
  
  
    for(let i=inizioCiclo; i<(inizioCiclo+pagine_per_paginazione) && i<=totpage; i++)
    {   
        const disabled = currentPage==i? "disabled": "";

        if (i==inizioCiclo){
         btn = `<button onclick="clickpagina(event)" class="btn pagina ${disabled}"  data-value="${i}" id="first">${i}</button>`;
        }
        else if(i==(inizioCiclo+pagine_per_paginazione-1) || i==totpage)
        {
         btn = `<button onclick="clickpagina(event)" class="btn pagina ${disabled}"  data-value="${i}" id="last">${i}</button>`;
        }
        else{
         btn = `<button onclick="clickpagina(event)" class="btn pagina ${disabled}" data-value="${i}">${i}</button>`;
        }

        btnList += btn;

    }

    return btnList;
} 



function creaPaginazione(data,row_per_page,currentPage){
    
    totpage = Math.ceil(data.length/row_per_page);
    const disablePrev = currentPage==1? "disabled": "";
    const disableNext = currentPage==totpage? "disabled": "";
    const previousValue = currentPage>1? currentPage-1: 1;
    const nextValue = currentPage<totpage? currentPage+1: totpage;

    const paginazione = `<div class="paginazione d-flex justify-content-center justify-content-sm-start mt-4 gap-3" id="paginazione">
      <button onclick="clickpagina(event)" class="btn ${disablePrev}" data-value="${previousValue}"> << </button>
        ${generaBtn(data,currentPage,inizioCiclo,row_per_page,totpage)}
      <button onclick="clickpagina(event)" class="btn ${disableNext}" data-value="${nextValue}"> >> </button>
    </div>`;

    tableContainer.insertAdjacentHTML('beforeend', paginazione);


    return paginazione;
    
}


function creaTabella(persone){
let recordCount = `<p class="rows-count mb-3 text-muted" id="rows-count">Record trovati: ${persone.length}</p>`;

let tabella = `
    <div class="table-responsive-sm">
    <table class="table align-middle table-hover">
        <thead class="table-dark">
        <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Cognome</th>
            <th scope="col">Email</th>
            <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>
            ${generaRighe(persone)}
        </tbody>
    </table>
    </div>
`; 
    
tableContainer = document.getElementById("table-container");
tableContainer.insertAdjacentHTML('beforeend', recordCount);
tableContainer.insertAdjacentHTML('beforeend', tabella);
}


function creaTabellaPerPagine(persone)
{

let arraypersone = persone;

let recordCount = `<p class="rows-count mb-3 text-muted" id="rows-count">Record trovati: ${persone.length}</p>`;

let tabella = `
    <div class="table-responsive-sm">
    <table class="table align-middle table-hover">
        <thead class="table-dark">
        <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Cognome</th>
            <th scope="col">Email</th>
            <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>
            ${generaRighePerPagina(arraypersone)}
        </tbody>
    </table>
    </div>
`; 
    
tableContainer = document.getElementById("table-container");
tableContainer.insertAdjacentHTML('beforeend', recordCount);
tableContainer.insertAdjacentHTML('beforeend', tabella);

creaPaginazione(persone,row_per_page,currentPage);
firstBtn = document.getElementById('first').getAttribute('data-value');
lastBtn = document.getElementById('last').getAttribute('data-value');

}


function generaRighePerPagina(persone){
    
    let righe='';
    const lx = currentPage*row_per_page-row_per_page;
    const dx = currentPage*row_per_page;

    let personeslicing = persone.slice(lx,dx);

    if(personeslicing.length == 0)
    {
        currentPage--;
        const lx = currentPage*row_per_page-row_per_page;
        const dx = currentPage*row_per_page;
    
        personeslicing = persone.slice(lx,dx);
    };

    personeslicing.forEach( persona => {


    let riga = `
            <tr>
                <th scope="row">${persona.id_persona}</th>
                <td>${persona.nome}</td>
                <td>${persona.cognome}</td>
                <td>${persona.email}</td>
                <td class="d-flex flex-column d-sm-table-cell">
                    <button onclick="ottieniDatiModifica(event)" type="button"  class="btn btn-primary my-2" data-val="${persona.id_persona}" data-bs-toggle="modal" data-bs-target="#modal-update"><i class="bi bi-pencil-square" data-val=${persona.id_persona}></i></button>
                    <button onclick="eliminaPersonaid(event)" type="button" class="btn btn-danger btn-delete" data-bs-toggle="modal" data-bs-target="#modal-delete" data-val="${persona.id_persona}"><i class="bi bi-trash-fill" data-val=${persona.id_persona}></i></button>
                </td>
            
            </tr>
            `;

            righe+=riga;
    });
            return righe;

}


function clickpagina(e)
{
    currentPage = parseInt(e.target.getAttribute('data-value'));

    if(currentPage == firstBtn && currentPage!=1){
        inizioCiclo--;
    }
    else if(currentPage == lastBtn && currentPage!=totpage){
        inizioCiclo++;
    };
  
    eliminaTabella();
    creaTabellaPerPagine(persone);
    window.scrollTo(0, document.body.scrollHeight);
}


function filtraTabella(e)
{   
    const ricerca = e.target.value.toLowerCase();
    let personeFiltrate = [];
    let riga;

      
    if (ricerca !=="")
    {
        
        for(let i=0;i<persone.length;i++)
        {   
            riga =  persone[i].id_persona + ' ' + persone[i].nome + ' ' + persone[i].cognome + ' ' + persone[i].email;

            if(riga.indexOf(ricerca)!== -1)
            {
                personeFiltrate.push(persone[i]);
            }
        };

        eliminaTabella();
        creaTabella(personeFiltrate)

    }
    else
    {
        eliminaTabella();

        if (persone.length > row_per_page){

            creaTabellaPerPagine(persone);

        }
        else{

            creaTabella(persone);

        }
    }
    
}

function eliminaContenutoSearchBar()
{
    searchBar.value = "";
}