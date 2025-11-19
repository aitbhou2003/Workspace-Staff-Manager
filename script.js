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
                            <button id="${employee.id}" class="py-2 px-5 rounded text-white bg-red-500 hover:bg-red-600">details</button>
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

document.forms["AouterOmployee"].addEventListener("submit", (e) => {
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

    if (form.experiencename.length) {
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

    // console.log(employee);



    // let nomRegex = /^[A-Za-z]+ [A-Za-z]+$/;
    // let roleRegex = /^[A-Za-z]+ [A-Za-z]+$/;
    // let phoneRegex = /^(06|07)[0-9]{8}$/;
    // let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    // if (!nomRegex.test(employee.nom)) {
    //     document.getElementById('nomError').innerHTML = 'le chmape est vide'
    // }

    staff.push(employee);
    saveToLocalStorage(staff);
    saveToLocalStorage("unsignedstaff", staff)
    renderCardes([employee]);
    console.log(staff);




    document.forms["AouterOmployee"].reset();
})


