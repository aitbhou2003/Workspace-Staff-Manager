let id = 0
let users = [
    {
        "id": id++,
        "nom": "Tayeb SOUINI",
        "email": "TayebSOUINI.2@email.com",
        "age": 30
    },
    {
        "id": id++,
        "nom": "abde bhou",
        "email": "bhou.2@email.com",
        "age": 22
    }
]

function showMessageIfTableEmpty() {
    if (users.length == 0) {
        document.getElementById("emptyMessage").innerHTML = "Aucun utilisateur pour le moment. Ajoutez-en un via le formulaire ci-dessus.";
    }
    else {
        document.getElementById("emptyMessage").style.display = "none";
    }

}
showMessageIfTableEmpty();


renderElementOfTableuser(users);
function renderElementOfTableuser(users) {
    let tableContainer = document.getElementById('tableContainer')
    users.forEach(user => {
        tableContainer.innerHTML += rederUsersInTable(user);
    });

    console.log(tableContainer.innerHTML);

}

function rederUsersInTable(user) {
    return `
        <tr>
            <td>
                <span id="tablename" class="user-name" data-bs-toggle="modal"
                    data-bs-target="#userDetailModal">
                ${user.nom}
                </span>
            </td>
            <!-- TayebSOUINI.2@email.com -->
            <td>${user.age}</td>
            <!-- 30 -->
            <td>${user.email} </td>
            <td>
                <button class="btn btn-sm btn-danger w-100">Supprimer</button>
            </td>
        </tr>
    `;

}


document.forms["userForm"].addEventListener("submit", (E)=>{
    
})



let t = `<table class="table table-striped table-hover text-center">
                    <thead class="table-dark">
                        <tr>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Âge</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="userTableBody">
                        <tr>
                            <td>
                                <span id="tablename" class="user-name" data-bs-toggle="modal"
                                    data-bs-target="#userDetailModal">

                                </span>
                            </td>
                            <!-- TayebSOUINI.2@email.com -->
                            <td></td>
                            <!-- 30 -->
                            <td> </td>
                            <td>
                                <button class="btn btn-sm btn-danger w-100">Supprimer</button>
                            </td>
                        </tr>
                    </tbody>
                </table>`