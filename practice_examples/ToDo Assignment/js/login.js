function Validity() 
{   
    //fetching the data from the form
    let emailId = document.getElementById("email").value;
    let passwd = document.getElementById("password").value;

    let RegexEmailId = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    let RegexPasswd = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    //applying email validation
    if((emailId.match(RegexEmailId)) &&
       (passwd.match(RegexPasswd)))
    {  
        let bRet = FetchItems(emailId,passwd)

        if(bRet == true)
        {
            window.location = '../html/todo_page.html';
        }
        else
        {
            return;
        }
    }   
    else if(!emailId.match(RegexEmailId))   //email validations are false
    {
        alert("Invalid Email");
    }
    else if(!passwd.match(RegexPasswd))    //password validations are false
    {
        alert("Password must be 8-15 characters which contains at least a capital letter, a small letter, a number and a special symbol");
    }
}

function FetchItems(emailId,passwd)
{   
    let CodeArray = JSON.parse(localStorage.getItem('localStorageArray'));

    if(CodeArray == null)
    {
        alert("No records found");
        return false;
    }
    else
    {
        let flag = true;
        let index = 0;

        for(index=0; index<CodeArray.length; index++)   //checking for valid email and password for that email
        {
            //email and password both matches
            if((CodeArray[index].emailUser) === emailId) /* && ((CodeArray[index].password_user) == passwd) */
            {
                let decryptedPassword = atob(CodeArray[index].passwordUser);

                if(decryptedPassword == passwd)
                {
                    sessionStorage.setItem("loggedInUser",index);     //create session here and break
                    flag = true;
                    break;
                }
                else if(decryptedPassword != passwd)   //email found but matching password is not found
                {
                    alert("Wrong Password");
                    flag = false;
                    break;
                }        
            }
            else
            {
                flag == false;
            }
        }

        if((index == CodeArray.length) && (flag == false)) //no records found
        {   
            alert("No records found!!!");
            return false;
        }
        else if(flag == false)  //email found but wrong password
        {
            return false;
        }
        else    //email id and password both found and matches
        {
            return true;
        }
    }
}

(function (){
    document.addEventListener('keypress',function(event){
        if(event.keyCode == 13)
        {
            Validity();
        }
    })
})();
