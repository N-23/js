function Validations()
{
    // fetching the fields from the form 
    let firstName = document.getElementById("fName").value;
    let lastName = document.getElementById("lName").value;
    let address = document.getElementById("address").value;
    let emailId = document.getElementById("email").value;
    let passwd = document.getElementById("password").value;
    let confPasswd = document.getElementById("confirmPassword").value;
    let genderType = document.querySelector('input[name="gender"]:checked').value;

    // Here, regular expression for every field is written 
    let regexFirstName = /^([a-zA-Z]{3,})$/;
    let regexLastName = /^[a-zA-Z]{3,}$/;
    let regexEmailid = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    let regexPasswd = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    // condition to check whether each field is valid or not
    if((firstName.match(regexFirstName)) &&
       (lastName.match(regexLastName)) &&
       (emailId.match(regexEmailid)) &&
       (passwd.match(regexPasswd)) &&
       (confPasswd.match(passwd)))
    {   
        let bRet = StoreItems(firstName,lastName,address,emailId,passwd,genderType)

        if(bRet == true)
        {
            alert("Registered successfully");
            sessionStorage.removeItem("displayPicture");
            window.location = '../html/login.html';
        }
        /* else
        {
        } */
    }
    else if(!firstName.match(regexFirstName))
    {
        alert("First Name should contain only alphabets");
    }
    else if(!lastName.match(regexLastName))
    {
        alert("Last Name should contain only alphabets");
    }
    else if(!emailId.match(regexEmailid))
    {
        alert("Please enter the proper email");
    }
    else if(!passwd.match(regexPasswd))
    {
        alert("Password must be 8-15 characters which contains at least a capital letter, a small letter, a number and a special symbol");
    }
    else if(!confPasswd.match(passwd))
    {
        alert("Confirm password should be same as the entered password");
    }
}

function StoreItems(firstName,lastName,address,emailId,passwd,genderType)
{   
    let ToDoList = new Array();
    
    if(sessionStorage.getItem('displayPicture') === null)
    {
        alert("Please upload your profile picture");
        return false;
    }
    
    let encryptedPassword = btoa(passwd);

    let profilePicture = sessionStorage.displayPicture;

    let userInfo = {
        'firstNameUser' : firstName,
        'lastNameUser' : lastName,
        'addressUser' : address,
        'emailUser' : emailId,
        'passwordUser' : encryptedPassword,
        'genderUser': genderType,
        'toDoUser' : ToDoList,
        'displayPicture' : profilePicture
    }

    let codeArray = JSON.parse(localStorage.getItem('localStorageArray'));

    if(codeArray == null)
    {
        codeArray = [];

        codeArray.push(userInfo);
        localStorage.setItem("localStorageArray",JSON.stringify(codeArray));
        return true;
    }
    else
    {
        let i=0;
        
        for(i=0; i<codeArray.length;i++)
        {
            if((codeArray[i].emailUser) == emailId)
            {
                break;
            }
        }

        if(i == codeArray.length)
        {   
            codeArray.push(userInfo);
            localStorage.setItem("localStorageArray",JSON.stringify(codeArray));
            return true;
        }
        else
        {
            alert("Email ID already exists");
            return false;
        }
    }
}

function UploadProfilePicture()
{
    let Image = document.getElementById("profilePicture").files[0];

    let imagereader = new FileReader();
    imagereader.readAsDataURL(Image);

    imagereader.onload = function()
    {
        let imgdata = imagereader.result;
        sessionStorage.setItem("displayPicture",imgdata);
        document.getElementById("userPic").src = sessionStorage.displayPicture;
    };

    imagereader.onerror = function (error) {
    };
}
