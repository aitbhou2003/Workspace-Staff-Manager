id = 0;
let staff = [
    {
        "id": id++,
        "nom": "abdellah bhou",
        "role": "reception",
        "photo": "1.png",
        "email": "abdellahbaou@gmail.com",
        "telephone": "0735273782",
        "experiences": [
            {
                "nom": "khdma",
                "dure": "4",
                "role": "devlopeure"
            },
            {
                "nom": "makhdmach",
                "dure": "5",
                "role": "plombi"
            }
        ]

    },
    {
        'id': id++,
        "nom": "abderrahim bhou",
        "role": "sécurité",
        "photo": "2.png",
        "email": "abderrahimbhou@gmail.com",
        "telephone": "063872037",
        "experiences": [
            {
                "nom": "khdmo",
                "dure": "6",
                "role": "securite d lbab"
            }
        ]

    }

]


function saveToLocalStorage(keyName, dataList) {
    dataList = JSON.stringify(dataList);
    localStorage.setItem(keyName, dataList);
}
renderCardes(staff);
function renderCardes(staff) {
    document.getElementById('cardes').innerHTML += rederListView(staff);
    document.querySelectorAll(".edite").forEach(element => {
        element.addEventListener("click", event => {

            afficheDetailOfCarde(event.target.getAttribute("id"));
        })
    })
}

function rederListView(staff) {
    let cardList = "";
    staff.forEach(employee => {
        cardList += renderCarde(employee);
    });
    return cardList;
}

function renderCarde(employee) {
    return `<div class="w-4/5 border mx-auto rounded flex flex-col p-1 gap-2 justify-center">
                    <img class="mx-auto w-1/5" src="${employee.photo}" alt="">
                    <div class="mx-auto text-center flex flex-col">
                        <span>${employee.nom}</span>
                        <span>${employee.role}</span>
                        <div class="flex flex-row justify-between gap-2">
                            <button type="button" command="show-modal" commandfor="dialog-details" id="${employee.id}" class="edite py-2 px-5 rounded text-white bg-red-500 hover:bg-red-600">details</button>
                            <button id="${employee.id}"
                                class="py-2 px-5 rounded text-white bg-orange-500 hover:bg-orange-600">edits</button>
                        </div>
                    </div>
                </div>`
}


document.getElementById('ajouterExperiences').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('experiences').innerHTML += `
                            <label for="experiencename">le nom :</label>
                            <input name="experiencename" class="py-3 border rounded-md px-2" placeholder="nom de entreprise" type="text">
                            <label for="experiencedure">dure(moi) :</label>
                            <input name="experiencedure" class="py-3 border rounded-md px-2" placeholder="dure d experiences" type="number">
                            <label for="experiencerole">le role :</label>
                            <input name="experiencerole" class="py-3 border rounded-md px-2" placeholder="le role" type="text">` ;

})

document.forms["AjouterOmployee"].addEventListener("submit", (e) => {
    e.preventDefault();
    let form = e.target;

    let employee = {
        id: id++,
        photo: "1.png",
        nom: form.nom.value,
        role: form.role.value,
        telephone: form.phone.value,
        email: form.email.value,
        experiences: []
    }

    if (form.experiencename?.length) {
        for (let i = 0; i < form.experiencename.length; i++) {
            employee.experiences.push({
                nom: form.experiencename[i].value,
                dure: form.experiencedure[i].value,
                role: form.experiencerole[i].value
            }
            );

        }
    } else {
        employee.experiences?.push({
            nom: form.experiencename?.value,
            dure: form.experiencedure?.value,
            role: form.experiencerole?.value
        });
    }

    formValidation(employee);





    staff.push(employee);
    saveToLocalStorage(staff);
    saveToLocalStorage("unsignedstaff", staff)
    renderCardes([employee]);
    console.log(staff);




    document.forms["AjouterOmployee"].reset();
})

function formValidation(employee) {
    let nomRegex = /^[A-Za-z]+ [A-Za-z]+$/;
    let roleRegex = /^[A-Za-z]+ [A-Za-z]+$/;
    let phoneRegex = /^(06|07)[0-9]{8}$/;
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    if (!nomRegex.test(employee.nom)) {
        document.getElementById('nomError').innerHTML = 'le chmape est vide'
    }
}









function afficheDetailOfCarde(id) {
    let employee = staff.find(employeeT => employeeT.id == id);
    document.getElementById('dialog-details').innerHTML = `<el-dialog-backdrop
                class="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"></el-dialog-backdrop>

            <div tabindex="0"
                class="flex min-h-full items-end justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0">
                <el-dialog-panel
                    class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95">
                    <!-- mon contenu -->
                    <div name="AjouterOmployee" class="flex flex-col gap-1 p-4" action="">
                        <img class="mx-auto w-32 h-32 rounded-lg object-cover" src="${employee.photo}">
                        
                            <div class="space-y-2">
                                <div class="flex gap-2">
                                    <span class="w-16 text-gray-600 font-medium">Nom:</span>
                                    <span>${employee.nom}</span>
                                </div>
                                <div class="flex gap-2">
                                    <span class="w-16 text-gray-600 font-medium">Role:</span>
                                    <span>${employee.role}</span>
                                </div>
                                <div class="flex gap-2">
                                    <span class="w-16 text-gray-600 font-medium">Phone:</span>
                                    <span>${employee.telephone}</span>
                                </div>
                                <div class="flex gap-2">
                                    <span class="w-16 text-gray-600 font-medium">Email:</span>
                                    <span>${employee.email}</span>
                                </div>
                                <div class="flex flex-col p-1 gap-1 bg-gray-300 rounded">
                                    <h4 class="text-lg font-semibold text-gray-800 mb-3">Experiences :</h4>
                                    <div id="modal-experience" class="flex flex-col gap-1">
                                        ${renderExperience(employee.experiences)}
                                    </div>
                                    
                                </div>
                            </div>
                    </div>
                </el-dialog-panel>
            </div>`;
}
function renderExperience(experiences) {
    let experiencesHTML = "";
    experiences.forEach(experience => {
        experiencesHTML += `<div class="w-4/5 bg-green-300 rounded mx-auto p-2">
                                            <div class="flex gap-2">
                                                <span class="w-16 text-gray-600 font-medium">Nom:</span>
                                                <span>${experience.nom}</span>
                                            </div>
                                            <div class="flex gap-2">
                                                <span class="w-16 text-gray-600 font-medium">Role:</span>
                                                <span>${experience.role}</span>
                                            </div>
                                            <div class="flex gap-2">
                                                <span class="w-16 text-gray-600 font-medium">Dure:</span>
                                                <span>${experience.dure} moi</span>
                                            </div>
                                        </div>`;
    });
    return experiencesHTML;
}



