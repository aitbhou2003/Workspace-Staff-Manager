let staff = [];

function loadFromLocalStorage(keyName) {
    const data = localStorage.getItem(keyName);
    return data ? JSON.parse(data) : [];
}

function saveToLocalStorage(keyName, dataList) {
    localStorage.setItem(keyName, JSON.stringify(dataList));
}

function renderCardes(staff) {
    let container = document.getElementById('cardes');
    container.innerHTML = "";
    rederListView(container, staff);
    document.querySelectorAll(".details").forEach(element => {
        element.addEventListener("click", event => {
            afficheDetailOfCarde(event.target.getAttribute("id"));
        });
    });
}

function rederListView(container, staff) {
    staff.forEach(employee => {
        container.innerHTML += renderCarde(employee);
    });
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

// Add event listener for adding experiences
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
                            <span id="expRoleError" class="text-red-600 text-xs"></span>`;
});

document.forms["AjouterOmployee"].addEventListener("submit", (e) => {
    e.preventDefault();
    let form = e.target;
    let employee = {
        id: Date.now(),
        photo: form.photo.value,
        nom: form.nom.value,
        role: form.role.value,
        telephone: form.phone.value,
        email: form.email.value,
        experiences: []
    };

    if (form.experiencename?.length) {
        for (let i = 0; i < form.experiencename.length; i++) {
            employee.experiences.push({
                nom: form.experiencename[i].value,
                dure: form.experiencedure[i].value,
                role: form.experiencerole[i].value
            });
        }
    } else if (form.experiencename?.value) {
        employee.experiences.push({
            nom: form.experiencename.value,
            dure: form.experiencedure.value,
            role: form.experiencerole.value
        });
    }

    staff.push(employee);
    saveToLocalStorage("unassignedstaff", staff);
    renderCardes(staff);

    document.forms["AjouterOmployee"].reset();
});



function afficheDetailOfCarde(id) {
    let data = localStorage.getItem("unassignedstaff")
    let employee = JSON.parse(data).find(emp => emp.id == id);
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
    if (!experiences || experiences.length === 0) {
        return '<p class="text-gray-600">No experiences available.</p>';
    }

    return experiences.map(exp => `
        <div class="flex flex-col gap-1 p-2 border rounded bg-white">
            <div class="flex gap-2">
                <span class="font-medium">Nom:</span>
                <span>${exp.nom}</span>
            </div>
            <div class="flex gap-2">
                <span class="font-medium">Durée:</span>
                <span>${exp.dure} mois</span>
            </div>
            <div class="flex gap-2">
                <span class="font-medium">Rôle:</span>
                <span>${exp.role}</span>
            </div>
        </div>
    `).join('');
}

let reception = [];
let server = [];
let securite = [];
let personal = [];
let archive = [];
let meeting = [];

function putRoomsInLocalStorageIfTheyNotExist(key, list) {
    let search = getRoomsFromLocalIfExist(key);
    if (!search) {
        localStorage.setItem(key, JSON.stringify(list));
    }
}

putRoomsInLocalStorageIfTheyNotExist("reception", reception);
putRoomsInLocalStorageIfTheyNotExist("server", server);
putRoomsInLocalStorageIfTheyNotExist("securite", securite);
putRoomsInLocalStorageIfTheyNotExist("personal", personal);
putRoomsInLocalStorageIfTheyNotExist("archive", archive);
putRoomsInLocalStorageIfTheyNotExist("meeting", meeting);

function getRoomsFromLocalIfExist(key) {
    return JSON.parse(localStorage.getItem(key));
}

function renderCardesFilters(list) {
    let container = document.getElementById('cardesFilters');
    rederListViewInRoomsModal(container, list);
}

function rederListViewInRoomsModal(container, list) {
    container.innerHTML = '';
    list.forEach(employee => {
        container.innerHTML += renderCardeForAddToRoom(employee);
    });
    attachAddButtonListeners();
}

function renderCardeForAddToRoom(employee) {
    return `<div class="flex w-4/5 mx-auto gap-2 border-2 border-red-500 rounded px-2 items-center justify-between">
        <div class="flex gap-2 items-center">
            <img class="w-10 h-10 rounded-lg object-cover" src="${employee.photo}">
            <div class="flex flex-col">
                <span>${employee.nom}</span>
                <span class="font-bold">${employee.role}</span>
            </div>
        </div>
        <button id="${employee.id}" class="cardes-filtres bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 text-sm">
            +
        </button>
    </div>`;
}

function showEmployerModal() {
    const modal = document.getElementById('employer-filtrer');
    if (modal) {
        modal.showModal();
    }
}

let zones = document.querySelectorAll(".zones");
let zoneTargeted;

zones.forEach(zone => {
    zone.addEventListener('click', (ev) => {
        zoneTargeted = ev.target.getAttribute("id");
        showEmployerModal();
        switch (zoneTargeted) {
            case "reception":
                renderCardesFilters(staff.filter(ab => ab.role === "Réceptionnistes" || ab.role === "Manager" || ab.role === "Nettoyage"));
                break;
            case "server":
                renderCardesFilters(staff.filter(ab => ab.role === "Techniciens IT" || ab.role === "Manager"));
                break;
            case "personal":
                renderCardesFilters(staff);
                break;
            case "meeting":
                renderCardesFilters(staff);
                break;
            case "archive":
                renderCardesFilters(staff.filter(ab => ab.role === "Manager" || ab.role === "Autres rôles"));
                break;
            case "securite":
                renderCardesFilters(staff.filter(ab => ab.role === "Agents de sécurité" || ab.role === "Manager"));
                break;
            default:
                break;
        }
    });
});

function attachAddButtonListeners() {
    let cardesFiltres = document.querySelectorAll(".cardes-filtres");
    cardesFiltres.forEach(carde => {
        carde.addEventListener("click", () => {
            let crdId = carde.getAttribute("id");
            // Use the global staff array instead of getting from localStorage
            let CardeAllInfo = staff.find(emp => emp.id == crdId);

            if (CardeAllInfo) {
                let roomList = getRoomsFromLocalIfExist(zoneTargeted) || [];

                if (roomList.length >= 4) {
                    alert(`Le maximum dans la zone "${zoneTargeted}" est de 4 employés`);
                    return;
                }

                // Add to the room
                roomList.push(CardeAllInfo);
                localStorage.setItem(zoneTargeted, JSON.stringify(roomList));

                // Update the staff array and save to localStorage
                staff = staff.filter(emp => emp.id != crdId);
                saveToLocalStorage("unassignedstaff", staff);

                // Update the UI
                const roomContainer = document.getElementById(zoneTargeted);
                if (roomContainer) {
                    roomContainer.innerHTML += renderCardeInRoom(CardeAllInfo);
                }

                // Close the modal and re-render the staff list
                const modal = document.getElementById('employer-filtrer');
                if (modal) {
                    modal.close();
                }

                // Re-render the filters to update the list
                renderCardesFilters(staff);
            }
        });
    });
}

function rederListViewForRooms(container, list) {
    container.innerHTML = "";
    if (!list) return;
    list.forEach(employee => {
        container.innerHTML += renderCardeInRoom(employee);
    });
}

function renderCardeInRoom(employee) {
    return `<div class="flex w-4/5 mx-auto gap-2 border-2 border-green-500 rounded px-2 py-1 items-center bg-white shadow-sm">
        <img class="w-8 h-8 rounded-full object-cover" src="${employee.photo}" alt="${employee.nom}">
        <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">${employee.nom}</p>
            <p class="text-xs text-gray-500 truncate">${employee.role}</p>
        </div>
    </div>`;
}

// Render cards from localStorage when the page loads
document.addEventListener("DOMContentLoaded", () => {
    // Get unassigned staff from localStorage
    staff = JSON.parse(localStorage.getItem("unassignedstaff")) || [];
    renderCardes(staff);

    // Get and render cards for each zone
    const zoneIds = ["reception", "server", "securite", "personal", "archive", "meeting"];
    zoneIds.forEach(zoneId => {
        const zoneData = JSON.parse(localStorage.getItem(zoneId)) || [];
        const zoneElement = document.getElementById(zoneId);
        if (zoneElement) {
            zoneElement.innerHTML = ""; // Clear existing content
            zoneData.forEach(employee => {
                zoneElement.innerHTML += renderCardeInRoom(employee);
            });
        }
    });
});
;