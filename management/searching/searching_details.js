function btnUserNameSearchingDevice_Click() {
    var userName=document.getElementById("txtUsername").value;
    var password = document.getElementById("txtPassword").value;
    AlertWindow.Close();
    addDevideToDB(userName, password);
}