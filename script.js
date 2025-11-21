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

    },{
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
function loadData() {
    let staff = getDataFromLocalStorageIfExist("unsignedstaff");
    renderCardes(staff);
    saveToLocalStorage("unsignedstaff", staff);

}



function saveToLocalStorage(keyName, dataList) {

    localStorage.setItem(keyName, JSON.stringify(dataList));
}
renderCardes(staff);
function renderCardes(staff) {
    document.getElementById('cardes').innerHTML += rederListView(staff);
    document.querySelectorAll(".details").forEach(element => {
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
    return `<div class="border-3 border-green-400 rounded flex flex-col p-3 gap-2 items-center bg-white shadow">
            <img class="w-20 md:w-24" src="${employee.photo}" alt="">
            <div class="text-center flex flex-col">
                <span class="font-semibold">${employee.nom}</span>
                <span class="text-gray-600 text-sm">${employee.role}</span>
                <div class="flex flex-row justify-center gap-2 mt-2">
                    <button type="button" command="show-modal"
                        commandfor="dialog-details" id="${employee.id}"
                        class="hover:animate-bounce details py-2 px-4 rounded text-white bg-red-500 hover:bg-red-600">
                        details
                    </button>
                    <button id="${employee.id}" class="hover:animate-bounce  py-2 px-4 rounded text-white bg-orange-500 hover:bg-orange-600">
                        edits
                    </button>
                </div>
            </div>
        </div>`;
}


document.getElementById('ajouterExperiences').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('experiences').innerHTML += `
                            <label for="experiencename">le nom :</label>
                            <input id="expNom" name="experiencename" class="py-3 border rounded-md px-2" placeholder="nom de entreprise" type="text">
                            <span id="expNomError" class="text-red-600 text-xs"></span>
                            <label for="experiencedure">dure(moi) :</label>
                            <input id="expDure" name="experiencedure" class="py-3 border rounded-md px-2" placeholder="dure d experiences" type="number">
                            <span id="expDureError" class="text-red-600 text-xs"></span>
                            <label for="experiencerole">le role :</label>
                            <input id="expRole" name="experiencerole" class="py-3 border rounded-md px-2" placeholder="le role" type="text">
                            <span id="expRoleError" class="text-red-600 text-xs"></span>` ;

})

function formValidation() {
    let nomRegex = /^[A-Za-z]+ [A-Za-z]+$/;
    let roleRegex = /^[A-Za-z]+$/;
    let phoneRegex = /^(06|07)[0-9]{8}$/;
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    let nom = document.getElementById("nom");
    let nomError = document.getElementById('nomError');

    let phone = document.getElementById('phone');
    let phoneError = document.getElementById('phoneError');

    let email = document.getElementById('email');
    let emailError = document.getElementById('emailError');





    // nom validation
    if (nom.value === "") {
        nom.style.border = "3px red solid"
        nomError.innerHTML = "le champ est vide"
        return false;

    } else if (!nomRegex.test(nom.value)) {
        nom.style.border = "3px red solid";
        nomError.innerHTML = "nom (prénom + nom)"

    }
    else {
        nom.style.border = "3px green solid";
        nomError.innerHTML = "";
    }

    // role validation

    if (role.value === "") {
        role.style.border = "3px red solid"
        roleError.innerHTML = "le champ est vide"
        return false;
    } else if (!roleRegex.test(role.value)) {
        role.style.border = "3px red solid";
        roleError.innerHTML = "le role pas valide";
    }
    else {
        role.style.border = "3px green solid";
        roleError.innerHTML = "";
    }

    // email validation

    if (email.value === "") {
        email.style.border = "3px red solid"
        emailError.innerHTML = "le champ est vide"
        return false;
    } else if (!emailRegex.test(email.value)) {
        email.style.border = "3px red solid";
        emailError.innerHTML = "l'email pas valide";
        return false;
    }
    else {
        email.style.border = "3px green solid";
        emailError.innerHTML = "";
    }
    // phone validation
    if (phone.value === "") {
        phone.style.border = "3px red solid"
        phoneError.innerHTML = "le champ est vide"
        return false;
    } else if (!phoneRegex.test(phone.value)) {
        phone.style.border = "3px red solid";
        phoneError.innerHTML = "phone (06/07 + 8 chiffres)";
        return false;
    }
    else {
        phone.style.border = "3px green solid";
        phoneError.innerHTML = "";
    }



    return true;

}




document.forms["AjouterOmployee"].addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(formValidation());
    if (formValidation()) {
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
        let expNom = document.getElementById('expNom');
        let expNomError = document.getElementById('expNomError');

        let expDure = document.getElementById('expDure');
        let expDureError = document.getElementById('expDureError');

        let expRole = document.getElementById('expRole');
        let expRoleError = document.getElementById('expRoleError');

        let expNomRegex = /^[A-Za-z]+ [A-Za-z]+$/;
        let expDureRegex = /^[1-9]/;
        let expRoleRegex = /^[A-Za-z]+ [A-Za-z]+$/;

        if (form.experiencename?.length) {
            // experience validation
            //nom
            if (expNom.value === "") {
                expNom.style.border = "3px red solid"
                expNomError.innerHTML = "le champ est vide"
                return false;
            } else if (!expNomRegex.test(expNom.value)) {
                expNom.style.border = "3px red solid";
                expNomError.innerHTML = "le nom pas valide";
                return false;
            }
            else {
                expNom.style.border = "3px green solid";
                expNomError.innerHTML = "";
            }
            //role
            if (expRole.value === "") {
                expRole.style.border = "3px red solid"
                expRoleError.innerHTML = "le champ est vide"
                return false;
            } else if (!expRoleRegex.test(expRole.value)) {
                expRole.style.border = "3px red solid";
                expNomError.innerHTML = "le nom pas valide";
                return false;
            }
            else {
                expRole.style.border = "3px green solid";
                expRoleError.innerHTML = "";
            }
            //dure
            if (expDure.value === "") {
                expDure.style.border = "3px red solid"
                expDureError.innerHTML = "le champ est vide"
                return false;
            } else if (!expDureRegex.test(expDure.value)) {
                expDure.style.border = "3px red solid";
                expDureError.innerHTML = "le nom pas valide";
                return false;
            }
            else {
                expDure.style.border = "3px green solid";
                expDureError.innerHTML = "";
            }


            return true;
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


            console.log(staff);
        } else {
            employee.experiences?.push({
                nom: form.experiencename?.value,
                dure: form.experiencedure?.value,
                role: form.experiencerole?.value
            });
        }
        console.log(employee);
        staff.push(employee);
        // saveToLocalStorage(staff);
        saveToLocalStorage("unsignedstaff", staff)
        renderCardes([employee]);

    }

    document.forms["AjouterOmployee"].reset();
})



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



