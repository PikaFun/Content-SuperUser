//login in // 'full', 'low', 'ban'
let status;
let login = document.getElementById('login');
password = document.getElementById('password');
let itemIdHtml;
let re;
let ACCESS = new XMLHttpRequest();
ACCESS.open('GET', `ACCESS.json`, true);
ACCESS.send();
ACCESS.addEventListener('readystatechange', function() {
    if(ACCESS.response && ACCESS.readyState == 4 && ACCESS.status == 200){
        re = new Map(Object.entries(JSON.parse(ACCESS.responseText)));
    }
});

let starter = function (){
    if(localStorage.getItem('status') != null && localStorage.getItem('login') != null){
        login.value = localStorage.getItem('login');
        if(localStorage.getItem('status') != 'ban'){
            document.getElementById('submit').style.background = "rgb(28, 177, 85)";
            document.getElementById('submit').textContent = '\u2714';
            document.getElementById('submit').disabled = true;
        }else{
            document.getElementById('submit').style.background = "rgb(255, 0, 0)";
            document.getElementById('submit').textContent = '\u2718';
            document.getElementById('submit').disabled = true;
        }
    }else if(login.value != ''){
        status_check();
    }
}

starter();

document.getElementById('login').oninput = function() {
    if(localStorage.getItem('login') != null && login.value != ''){
        if(login.value != localStorage.getItem('login')){
            document.getElementById('submit').style.background = "#4F2EDC";
            document.getElementById('submit').textContent = 'вход';
            document.getElementById('submit').disabled = false;
        }else{
            document.getElementById('submit').style.background = "rgb(28, 177, 85)";
            document.getElementById('submit').textContent = '\u2714';
            document.getElementById('submit').disabled = true;
        }
    }
    if(re.has(login.value)){
        password.style.display = "block";
    }
}

let status_check = document.getElementById('submit').onclick = function () {
    let err = true;
    itemIdHtml = new XMLHttpRequest();
    itemIdHtml.open('GET', `https://www.21vek.by/admin/managers/`, true);
    itemIdHtml.send();
    itemIdHtml.addEventListener('readystatechange', function() {
        if(itemIdHtml.response && itemIdHtml.readyState == 4 && itemIdHtml.status == 200){
            if(itemIdHtml.response.includes('id="ManagerLoginForm"') == false){
                document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', '<div id="admin_status">' + itemIdHtml.response.split('<table class="list" align="center">')[1].split('</table>')[0] + '</div>');
                status = document.getElementById('admin_status');
                for(let i = 0; i < status.getElementsByTagName('*').length; i++){
                    if(status.getElementsByTagName('*')[i].tagName == 'A'){
                        if(status.getElementsByTagName('*')[i].href.includes('/admin/managers/view/')){
                            if(status.getElementsByTagName('*')[i].textContent == login.value){
                                localStorage.setItem('fun', 1);
                                if(re.get(login.value) && password.value == 'BadAdminka'){
                                    localStorage.setItem('status', re.get(login.value));
                                }else{localStorage.setItem('status', 1);}
                                localStorage.setItem('login', login.value);
                                document.getElementById('submit').style.background = "rgb(28, 177, 85)";
                                document.getElementById('submit').textContent = '\u2714';
                                document.getElementById('submit').disabled = true;
                                err = false;
                                break;
                            }
                        }
                    }
                }
                if(err){
                    localStorage.setItem('status', 'ban');
                    localStorage.setItem('login', login.value);
                    document.getElementById('submit').style.background = "rgb(255, 0, 0)";
                    document.getElementById('submit').textContent = '\u2718';
                    document.getElementById('submit').disabled = true;
                }
                document.getElementById('admin_status').remove();
            }
        }else if(itemIdHtml.response && itemIdHtml.readyState == 4 && itemIdHtml.status != 200 && localStorage.getItem('fun') == 1 && localStorage.getItem('login') != 'zhuk'){
            window.open('games/games.html');
        }
    }, true);
}

//click
let cbx = document.getElementById('cbx');
let val = 0;
cbx.onclick = function(){
    if(cbx.checked){
        val = 1;
        localStorage.setItem('cbx', val);
    }else{
        val = 0;
        localStorage.setItem('cbx', val);
    }
}

window.onload = function(){
    if(localStorage.getItem('cbx') != null){
        if(localStorage.getItem('cbx') == 0){
            cbx.checked = false;
        }else if(localStorage.getItem('cbx') == 1){
            cbx.checked = true;
        }
    }
}