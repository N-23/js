function enableFields()
{
    document.getElementById("fName").disabled = false;
    document.getElementById("lName").disabled = false;
    document.getElementById("address").disabled = false;
    document.getElementById("password").disabled = false;
    document.getElementById("submit").disabled = false;
    document.getElementById("profilePicture").disabled = false;

    for(let i=0;i<(document.getElementsByName("gender").length);i++)
    {
        document.getElementsByName("gender")[i].disabled = false;
    }
}

function Validations()
{
    // fetching the fields from the form
    let firstName = document.getElementById("fName").value;
    let lastName = document.getElementById("lName").value;
    let address = document.getElementById("address").value;
    let emailId = document.getElementById("email").value;
    let passwd = document.getElementById("password").value;
    let genderType = document.querySelector('input[name="gender"]:checked').value;
    
    // Here, regular expression for every field is written 
    let regexFirstName = /^([a-zA-Z]{3,})$/;
    let regexLastName = /^[a-zA-Z]{3,}$/;
    let regexPasswd = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    // condition to check whether each field is valid or not
    if((firstName.match(regexFirstName)) &&
       (lastName.match(regexLastName)) &&
       (passwd.match(regexPasswd)))
    {   
        StoreItems(firstName,lastName,address,emailId,passwd,genderType)
        alert("Your changes has been saved successfully");
        sessionStorage.removeItem("displayPicture");
        window.location.reload();
    }
    else if(!firstName.match(regexFirstName))
    {
        alert("First Name should contain only alphabets");
    }
    else if(!lastName.match(regexLastName))
    {
        alert("Last Name should contain only alphabets");
    }
    else if(!passwd.match(regexPasswd))
    {
        alert("Password must be 8-15 characters which contains at least a capital letter, a small letter, a number and a special symbol");
    }
    else
    {
        alert("Invalid Credentials");
        sessionStorage.removeItem("displayPicture");
    }
}

function StoreItems(firstName,lastName,address,emailId,passwd,genderType)
{   
    let codeArray = JSON.parse(localStorage.getItem("localStorageArray"));
    let userId = sessionStorage.getItem("loggedInUser");
    let codeToDoArray = codeArray[userId].toDoUser;

    codeArray[userId].firstNameUser = firstName;
    codeArray[userId].lastNameUser = lastName;
    codeArray[userId].addressUser = address;
    codeArray[userId].emailUser = emailId;
    codeArray[userId].passwordUser = btoa(passwd);
    codeArray[userId].toDoUser = codeToDoArray;
    codeArray[userId].genderUser = genderType;

    if(sessionStorage.getItem('displayPicture') === null)
    {
        //donothing
    }
    else
    {
        codeArray[userId].displayPicture = sessionStorage.displayPicture;
    }

    localStorage.setItem("localStorageArray",JSON.stringify(codeArray));
}

function setLoggedInUserValues()
{
    if((localStorage.getItem('localStorageArray') === null) || (sessionStorage.getItem('loggedInUser') === null))
	{
		window.location = "../html/home.html"
		return;
	}
    
    let codeArray = JSON.parse(localStorage.getItem("localStorageArray"));
    let userId =  sessionStorage.getItem("loggedInUser");
    document.getElementById("welcomeUser").innerHTML = "Hello, " + codeArray[userId].firstNameUser;
    
    document.getElementById("fName").value = codeArray[userId].firstNameUser;
    document.getElementById("lName").value = codeArray[userId].lastNameUser;
    document.getElementById("address").value = codeArray[userId].addressUser;
    document.getElementById("email").value = codeArray[userId].emailUser;
    document.getElementById("password").value = atob(codeArray[userId].passwordUser);
    document.getElementById("userPic").src = codeArray[userId].displayPicture;

    if(codeArray[userId].genderUser == "male")
    {
        document.getElementsByName("gender")[0].checked = true;
    }
    else if(codeArray[userId].genderUser == "female")
    {
        document.getElementsByName("gender")[1].checked = true;
    }
    else
    {
        document.getElementsByName("gender")[2].checked = true;
    }
}

function uploadProfilePicture()
{
    let Image = document.getElementById("profilePicture").files[0];

    let imageReader = new FileReader();
    imageReader.readAsDataURL(Image);

    imageReader.onload = function () {
        let imgData = imageReader.result;
        sessionStorage.setItem("displayPicture",imgData);
        document.getElementById("userPic").src = sessionStorage.displayPicture;
    };

    imageReader.onerror = function (error) {
    };
}

(function (){
    document.addEventListener('keypress',function(event){
        if((event.keyCode == 13) && (document.getElementById("submit").disabled == false))
        {
            Validations();
        }
    })
})();
