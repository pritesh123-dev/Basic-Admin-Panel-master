
// $(document).ready(() => {
  const url =
    "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";
  
    let tableBody = document.getElementById("table-body");
    let infoContent = document.getElementById("info-content");
    let searchBox = document.getElementById("search-box");

  fetch(url).then((response) => {
    return response.json();
  }).then((user) => {
    userInput(user);
    searchBox.addEventListener("keyup", () => {
      searchByType(searchBox.value, user)
      
    });
  })

  // $.get(url, (user) => {
  //   userInput(user);

    
    function userInput(users) {
      tableBody.innerHTML = "";
      users.forEach(user => {
        let row = document.createElement("tr");
        row.classList.add("data-row");
        row.appendChild(createColumn(user.id, 1));
        row.appendChild(createColumn(user.firstName, 2));
        row.appendChild(createColumn(user.lastName, 3));
        row.appendChild(createColumn(user.email, 4));
        row.appendChild(createColumn(user.phone, 5));
  
        tableBody.appendChild(row);
  
        row.addEventListener("click", () => {
          addSideDetails(user)
          let removeActive = document.getElementsByClassName("active")[0];
          
          if(removeActive !== undefined) {
            removeActive.classList.remove("active");
          }
  
          row.classList.add("active")
        })
      });
    }
  
    function createColumn(input, index) {
      let column = document.createElement("td");
      column.classList.add(`column${index}`);
      column.textContent = input;
      return column;
    }
  
    function addSideDetails(user) {
      infoContent.innerHTML = `<div><b>User selected:</b>${user.firstName} ${user.lastName}</div>
      <div>
        <b>Description: </b>
        <textarea cols="50" rows="5" readonly>
                   ${user.description}
                </textarea
        >
      </div>
      <div><b>Address:</b>${user.address.streetAddress}</div>
      <div><b>City:</b>${user.address.city}</div>
      <div><b>State:</b>${user.address.state}</div>
      <div><b>Zip:</b>${user.address.zip}</div>`;
      return infoContent
    }
  
    function searchByType(input, user) {
      let searchInput = input.toLowerCase();
      let returnUserData = user.filter((userdata) => {
        let userFirstName = userdata.firstName.toLowerCase();
        return userFirstName.includes(searchInput);
      });
      userInput(returnUserData);
    }
  // });
  // });

