let reserve_object;
let user_loc = document.location.toString();

let notifyBackgroundPage = function (e) {
    let sending = chrome.runtime.sendMessage(
        e,
        function(message, error){
            if(message){
                if(message.response){
                    if(message.response == '1'){
                        low();
                        if(message.session == 1 && user_loc != "https://www.21vek.by/admin/" && message.location != ''){
                            notifyBackgroundPage({greeting: "repared"});
                            window.open(message.location + '/?SUPERUSER-REPARE');
                        }
                    }else if(message.response == 'full'){
                        full();
                        low();
                        if(message.session == 1 && user_loc != "https://www.21vek.by/admin/" && message.location != ''){
                            notifyBackgroundPage({greeting: "repared"});
                            window.open(message.location + '/?SUPERUSER-REPARE');
                        }
                    }else if(message.response == 'ban'){
                        console.log('access denied');
                    }else if(message.response.greeting == 'reserve'){
                        reserve_object = message.response;
                    }
                }else{console.log('plugin is off');}
            }else if(error){
                alert('Расширение не отвечает');
            }
        }
    )
}

window.onload = notifyBackgroundPage({greeting: "power"});
    
if(user_loc == "https://www.21vek.by/admin/" && document.getElementsByTagName('body')[0].innerHTML.includes('<form action="/admin/" class="short_form login_form" id="ManagerLoginForm" method="post" accept-charset="utf-8">')){
    notifyBackgroundPage({greeting: "session"});
    setTimeout(function(){
        //document.getElementsByTagName('button')[0].click();
    }, 1000)
}

if(document.getElementsByTagName('body')[0].innerHTML.includes('Мы проводим технические работы. Через несколько минут сайт заработает, ')){
    notifyBackgroundPage({greeting: "down"});
}

if(document.getElementsByTagName("body")[0].innerHTML == '{"save":true,"change_status":false}'){
    window.close(); //закрываем командные вкладки распределения
}

if(user_loc == "https://www.21vek.by/admin/goods/index/" || user_loc == "https://www.21vek.by/admin/goods/edit/"){
    window.close(); //закрываем вкладки после манипуляций с товарами
}
let NO_PAGINATION = function(){
            /*********************************/
            /*********Отбой пагинации*********/
            /********Массовые действия********/
    setTimeout(function(){
        document.getElementById('header').insertAdjacentHTML('afterend', '<style>.sidenav2 {height: 100%;width: 0;position: fixed;z-index: 1;top: 0;right: 0%;background-color: rgba(252, 251, 217, 0.466);overflow-x: hidden;}.progress-bar-striped {background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-size: 1rem 1rem;}.progress-bar {display: flex;-webkit-box-orient: vertical;-webkit-box-direction: normal;-ms-flex-direction: column;flex-direction: column;-webkit-box-pack: center;-ms-flex-pack: center;justify-content: center;color: #fff;text-align: right;background-color: #febd01;}*, ::after, ::before {box-sizing: border-box;}div {display: block;}.progress {display: flex;height: 500px;overflow: hidden;font-size: .75rem;background-color: #947ADA;border-radius: 100%;width: 500px;position: relative;}.progress:after {content: "";width: 300px; height: 300px;position: absolute; left: calc(50% - 150px); top: calc(50% - 150px);background: white;border-radius: 50% 50% 50% 50%;}.progress:before{content: "";width: 500px; height: 400px;position: absolute; left: calc(50% - 250px); top: calc(50% - 200px);border-top: 90px solid transparent;border-right: 150px solid white;border-bottom: 90px solid transparent;}.progress-text{font-family: Geneva, Arial, Helvetica, sans-serif;content: "";width: 0px; height: 0px;position: absolute;z-index: 3;left: calc(50% - 100px); top: calc(50% - 65px);background: white;border-radius: 50% 50% 50% 50%;color: #febd01;font-size: 120px;}</style><div id="mySidenav2" class="sidenav2"><div class="progress" style="position: absolute; top: 50%;left: 50%;margin-right: -50%;transform: translate(-50%, -50%)"><div class="progress-bar progress-bar-striped" role="progressbar" style="width: 0%" id="progress-bar"><b><p class="progress-text" id="procent"></p></b></div></div></div>');
        if(document.getElementsByTagName('fieldset')[1].textContent.includes('Ничего нету') == true){
            document.getElementById('j-goods-pagination-top').insertAdjacentHTML('afterend', '<button style="margin-top: 10px; display: none;" id="full_data_target">Отобразить все</button>');
        }else{
            document.getElementById('j-goods-pagination-top').insertAdjacentHTML('afterend', '<button style="margin-top: 10px;" id="full_data_target">Отобразить все</button>');
        }
    },100);
    setTimeout(function(){
        /*****no-pagination*****/
        let sleep = function (ms, i) {
            let progress = document.getElementById('progress-bar');
            let procent = document.getElementById('procent');
            progress.style.width = (i * 0.88) + '%';
            procent.innerHTML = i + '%';
            //alert(i)
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        let openNav2 = function (){
            document.getElementById("mySidenav2").style.width = "100%";
        }
        let Go_find2 = function (){
            let continues = function(){
                document.getElementsByClassName("js-count_goods")[0].textContent = 'Всего: ' + document.getElementsByClassName("js-count_goods")[0].textContent.slice(12).replace(/\D+/g, "");
                for(let p = 1; p <= document.getElementsByClassName("j-pagination-max")[0].getAttribute('data-page') - 1; p++){
                    document.getElementsByClassName("js-count_goods")[1].remove();
                }
                document.getElementById("j-goods-pagination-top").remove();
                document.getElementById("full_data_target").style.display = "none";
                document.getElementById("j-goods-pagination-bottom").remove();
                setTimeout(() => {
                    document.getElementById("mySidenav2").style.width = "0";
                    progress.style.width = '0';
                    procent.innerHTML = '';
                    procent.style.color = '#febd01';
                }, 600);  
            }
            let All_Data_Target = "";
            let progress = document.getElementById('progress-bar');
            let procent = document.getElementById('procent');
            let i = 1;
            let inter = setInterval(function(){
                sleep(1, Math.round((i * 100) / (document.getElementsByClassName("j-pagination-max")[0].getAttribute('data-page'))));
                let itemIdHtml = new XMLHttpRequest(); //запрос на разбивку пагинации
                itemIdHtml.open('GET', `/admin/goods/show_goods/?page=` + i, false);
                itemIdHtml.send();
                let outsideDOM = itemIdHtml.response.slice(itemIdHtml.response.indexOf('<div class="js-count_goods mt10">'),itemIdHtml.response.indexOf('</div>					</div>'));
                All_Data_Target = All_Data_Target + outsideDOM;
                if(i == document.getElementsByClassName("j-pagination-max")[0].getAttribute('data-page')){
                    clearInterval(inter);
                    procent.style.color = '#947ADA';
                    document.getElementById('target_cont').innerHTML = All_Data_Target;
                    setTimeout(() => {
                        continues();
                    }, 1);
                }
                i++;
            },1);
            }
        document.getElementById('full_data_target').onclick = function(){
            openNav2();
            setTimeout(() => {
                Go_find2();
            }, 1);
        }
    },200)
}

let REPARE_CARD = function(){
    /*****Восстановление карточки*****/
    let reserve = document.getElementsByClassName("j-save")[0].onclick = function(){
        let params = [];
        let parent = document.getElementById('AttrTemplateEdit');
        let kid = parent.getElementsByTagName('*');
        let len = kid.length;
        for(let i = 0; i < len; i++){
            if(kid[i].type == "radio" && kid[i].className == "j-choose_value" && kid[i].checked){
                params.push(kid[i].id + ":checked");
            }
            if(kid[i].type == "checkbox" && kid[i].className == "j-choose_value" && kid[i].checked){
                params.push(kid[i].id + ":checked");
            }
            if(kid[i].type == "radio" && kid[i].className == "j-set_value" && kid[i].checked){
                params.push(kid[i].id + ":checked");
            }
            if(kid[i].className == "j-check_number" && kid[i].type == "text" && kid[i].value != ''){
                params.push(kid[i].id + ":" + kid[i].value);
            }
            if(kid[i].className == "" && kid[i].type == "text" && kid[i].value != ''){
                params.push(kid[i].id + ":" + kid[i].value);
            }
            if(kid[i].className == "flexible" && kid[i].type == "text" && kid[i].value != ''){
                params.push(kid[i].id + ":" + kid[i].value);
            }
            if(kid[i].type == "checkbox" && kid[i].className == "j-modattr" && kid[i].checked){
                params.push(kid[i].id + ":checked");
            }
            if(kid[i].type == "checkbox" && kid[i].className == "j-modattr_display" && kid[i].checked){
                params.push(kid[i].id + ":checked");
            }
        }
        
        if(document.getElementById('GoodDescr').value != ''){
            params.push('GoodDescr:' + document.getElementById('GoodDescr').value);
        }
        if(document.getElementById('CDDescription').value != ''){
            params.push('CDDescription:' + document.getElementById('CDDescription').value);
        }
        if(document.getElementById('GoodBunchGoodId').value != ''){
            params.push('GoodBunchGoodId:' + document.getElementById('GoodBunchGoodId').value);
        }
        if(document.getElementById('ManagerGoodComment').value != ''){
            params.push('ManagerGoodComment:' + document.getElementById('ManagerGoodComment').value);
        }
        let repare_obj = {
            greeting: "reserve",
            location: user_loc,
            data: params
        };
        notifyBackgroundPage(repare_obj);
    }
    let OTKRIVASHKA_Repare = function(){
        let MAIN_REPARE = function(){
            let mass = reserve_object.data.split(',');
            for(let i = 0; i < mass.length; i ++){
                if(document.getElementById(mass[i].split(':')[0])){
                    if(mass[i].split(':')[1] == 'checked'){
                        document.getElementById(mass[i].split(':')[0]).checked = true;
                        if(document.getElementById(mass[i].split(':')[0]).className == 'j-modattr_display'){
                            document.getElementById(mass[i].split(':')[0]).disabled = false;
                        }
                    }else{
                        document.getElementById(mass[i].split(':')[0]).value = mass[i].split(':')[1];
                    }
                }
            }
        }
        let Validation = function (callBack) {
            //console.log('OTKRIVASHKA_TamplateValidation', callBack)
            $(function(){
                function changeTemplate(){
                    var template_id = $("#GoodTemplateId").val();
                    var $bunch_block = $(".j-bunch");

                    $bunch_block.hide();
                    //валидания на группы при траблах с шаблоном
                    if(!template_id){
                        $bunch_block.val(0);
                    }
                    else{
                        $(".j-bunch_opt").remove();
                        var producer_id = $('#GoodProducerId').val();
                        $.ajax({
                            dataType: "json",
                            url: "/admin/goods/get_bunch_list/" + template_id + "/" + producer_id + "/",
                            success: function (data) {
                                var options = "";
                                for(var bunch_id in data){
                                    options +=
                                        "<option class='j-bunch_opt' value='" + bunch_id + "'>"
                                        + data[bunch_id]
                                        + "</option>";
                                }
                                var $bunch_select = $("#GoodBunchGoodId");
                                $bunch_select.html($bunch_select.html() + options);
                                $bunch_block.show();
                                //запрос селекта при группировке
                                //handleResponse(data, callBack)
                            }
                        });
                    }
                }

                function changeBunch(){

                    var template_id = $("#GoodTemplateId").val();
                    var old_bunch_id = $("#GoodBunchGoodId").attr('oldvalue');
                    var bunch_id = $("#GoodBunchGoodId").val();
                    var good_id = $("#GoodId").val();
                    good_id = good_id ? good_id : 0;

                    $("#Template").html(null);
                    //запрос нв смену шаблона или группы
                    //подгрузка аттрибутов
                    if(template_id){
                        $.ajax({
                            url: "/admin/goods/get_template/"
                            + template_id + "/"
                            + good_id + "/"
                            + good_id + "/"
                            + bunch_id + "/",
                            success: function (data) {
                                const template = document.getElementById('Template')
                                //console.log('data', data);
                                const idInterval = setInterval(() => {
                                    if(data) {
                                        //console.log('lol');
                                        // $("#Template").html(data);
                                        //console.log(template.innerHTML)
                                        template.innerHTML = data;
                                        clearInterval(idInterval);
                                        callBack && callBack();
                                        //подождали пока атрибуты отобразятся в доме
                                    }
                                }, 50);
                            }
                        });
                    }
                }

                $("#GoodTemplateId").change(changeTemplate);

                //порядок имеет значение
                $("#GoodBunchGoodId").change(changeBunch);
                $("#GoodBunchGoodId").bind('focus change', function(e) {
                    var self = $(this);
                    self.attr('oldvalue', self.val());
                });

                if($("#GoodTemplateId").val() != ""){
                    changeBunch(); //хз зачем, но возврачает группу обратно при перешаблонке, можно юзать (без этой херни не пашет)
                }
                else{
                    $(".j-bunch").hide(); //блочит группировку при отсутствии шаблона
                }
            });
        }
        MAIN_REPARE();
        Validation(MAIN_REPARE);
    }

    if(user_loc.includes("/?SUPERUSER-REPARE") == true){
        notifyBackgroundPage({greeting: 'repare'});
        let waiter_to_temp = setInterval(() => {
            if(reserve_object) {
                if(user_loc.replace("?SUPERUSER-REPARE", '') == reserve_object.location){
                    OTKRIVASHKA_Repare();
                }
                clearInterval(waiter_to_temp);
            }
        }, 50);
    }
}

let MAIN_PLUGIN = function (){

        /*********************************/
        /*****ОСНОВНОЙ МОДУЛЬ ПЛАГИНА*****/
        /********Массовые действия********/

    setTimeout(function () {
        document.getElementsByTagName('body')[0].insertAdjacentHTML('afterbegin', '<style>span.CSUspan {font-family: "Lato", sans-serif;font-size: 30px;color: #febd01;cursor: pointer;position: absolute;right: 1%;}span.CSUspan:hover {color: rgb(252, 251, 217);}.sidenav {font-family: "Lato", sans-serif;height: 100%;width: 0;position: fixed;z-index: 1;top: 0;right: 0%;background-color: rgb(252, 251, 217);overflow-x: hidden;transition: 0.5s;padding-top: 60px;}.accordion {font-family: "Lato", sans-serif;background-color: rgb(252, 251, 217);background-image: none;text-align: left;border: none;width: 500px;cursor: pointer;padding: 8px 8px 8px 32px;text-decoration: none;font-size: 25px;color: black;display: block;transition: 0.3s;}.accordion[disabled="true"] {color: #adadad;background-image: none;cursor: unset;}.active,.accordion[disabled="true"]:hover {background-color: rgb(252, 251, 217);background-image: none;}.active,.accordion:hover {background-color: #febd01;background-image: none;}.panel {padding: 0 18px;display: none;overflow: hidden;}.sidenav a {padding: 8px 8px 8px 32px;text-decoration: none;font-size: 25px;color: black;display: block;transition: 0.3s;}.sidenav a:hover {color: #febd01;}.sidenav .closebtn {position: absolute;top: 0;right: 25px;font-size: 36px;margin-left: 50px;}.sidenav input[type="radio"] {opacity: 0;position: fixed;width: 0;}.sidenav label {display: inline-block;background-color: rgb(252, 251, 217);color: black;padding: 10px 20px;font-family: sans-serif, Arial;font-size: 16px;border: none;transition: 0.3s;}.sidenav input[type="radio"]:checked+label {background-color: #febd01;color: black;border: none;}.sidenav input[type="radio"]:focus+label {color: black;border: none;}.sidenav label:hover {background-color: #febd01;color: black;}input.OTKRIVASHKA_input_CSS {height: 25px;width: 400px;margin-left: 25px;margin-bottom: 25px;}select.OTKRIVASHKA_select_CSS {height: 25px;width: 400px;margin-left: 25px;margin-bottom: 25px;}input.OTKRIVASHKA_inputNum_CSS {height: 35px;width: 140px;font-size: 32px;margin-left: 25px;text-align: center;}input.OTKRIVASHKA_submit_CSS {border: none;height: 25px;font-size: 14px;width: 100px;margin-left: 25px;margin-bottom: 15px;color: black;background: linear-gradient(to top, lime, rgb(255, 251, 44));}input.OTKRIVASHKA_clear_CSS {border: none;height: 25px;font-size: 14px;width: 100px;margin-left: 25px;margin-bottom: 15px;color: black;background: linear-gradient(to top, red, rgb(255, 251, 44));}img.OTKRIVASHKA_img_CSS {height: 15px;width: 15px;}p.OTKRIVASHKA_p_CSS {margin-bottom: 10px;margin-top: 10px;}.sidenavCase {font-family: "Lato", sans-serif;height: 100%;width: 0;position: fixed;margin: 0;z-index: 2;top: 0;left: 0%;background-color: rgb(252, 251, 217);overflow-x: hidden;transition: 0.5s;padding-top: 5px;}.sidenavCase input[type="radio"] {opacity: 0;position: fixed;width: 0;}.sidenavCase label {margin-bottom: 0 !important;display: inline-block;background-color: rgb(252, 251, 217);color: black;padding: 10px 20px;font-family: sans-serif, Arial;font-size: 16px;border: none;transition: 0.3s;}.sidenavCase input[type="radio"]:checked+label {background-color: #febd01;color: black;border: none;}.sidenavCase input[type="radio"]:focus+label {color: black;border: none;}.sidenavCase label:hover {background-color: #febd01;color: black;}.ThisCase{border: 5px solid #febd01;}.ThisCase input[type="radio"] {margin: 0;opacity: 100%;position: absolute;width: 20px;}.ThisCase label {display: inline-block !important;background-color: rgba(0, 0, 0, 0);color: black;padding: 3px 3px;font-family: sans-serif, Arial;font-size: 16px;border: none;margin: 0 0 0 22px !important;transition: 0.3s;}.ThisCase input[type="radio"]:checked+label {background-color: #febd01;color: black;border: none;}.ThisCase input[type="checkbox"]:checked+label {background-color: #febd01;color: black;border: none;}.ThisCase input[type="radio"]:focus+label {color: black;border: none;}.ThisCase label:hover {background-color: #febd01;color: black;}.ThisCase td {background-color: rgb(252, 251, 217);border: 1px solid black;}@media screen and (max-height: 500px) {.sidenav {padding-top: 15px;}.sidenav a {font-size: 18px;}}</style><div id="Cases" class="sidenavCase"><input class="sidenavCase" type="radio" id="IfCaseRadio"><label for="IfCaseRadio">Если</label><input class="sidenavCase" type="radio" id="DelCaseRadio"><label for="DelCaseRadio">Удалить</label><input class="sidenavCase" type="radio" id="AddCaseRadio"><label for="AddCaseRadio">Добавить</label><input class="OTKRIVASHKA_submit_CSS" style="margin-left: 35%;margin-bottom: 0%;" type="button" id="OTKRIVASHKA_CaseRedy_id" value="ГОТОВО"><div id="DivCase" class="ThisCase" hidden="true"></div></div><div id="mySidenav" class="sidenav"><!--created by Kirill Peshevich for 21vek.by //v1.0.4+--><a href="javascript:void(0)" class="closebtn">&times;</a><button class="accordion" id="accordeon_id1">Распределить</button><div class="panel"><input class="sidenav" type="radio" id="OTKRIVASHKA_radioReplace_id"><label for="OTKRIVASHKA_radioReplace_id">Массово</label><input class="sidenav" type="radio" id="OTKRIVASHKA_radioReplaceByCode_id"><label for="OTKRIVASHKA_radioReplaceByCode_id">По кодам</label><div id="div_replace"><input class="OTKRIVASHKA_clear_CSS" type="button" id="OTKRIVASHKA_clear1_id" value="ОЧИСТИТЬ" hidden=""><select сlass="OTKRIVASHKA_select_CSS" id="OTKRIVASHKA_FunctionSelect_id" style="width: 400px;margin: 0 0 10 25;"><option value="">Открыть</option><option value="galery">Галерея</option><option value="?SUPERUSER-FUN-PUBLOCATE">Опубликовать</option><option value="?SUPERUSER-FUN-MATRAS">Матрас</option><option value="?SUPERUSER-FUN-NAMATRAS">Наматрасник</option><option value="?SUPERUSER-FUN-VIDEO">Вставить видео</option></select><input class="OTKRIVASHKA_input_CSS" id="OTKRIVASHKA_VideoCode_id" style="margin: 0 0 10 25;" placeholder="HTML код видео"><br><input class="OTKRIVASHKA_input_CSS" id="OTKRIVASHKA_GoodText_id" type="text" maxlength="255" placeholder="код/тип/бренд/модель" hidden=""><input class="OTKRIVASHKA_input_CSS" id="OTKRIVASHKA_GoodCode_id" type="text" placeholder="коды раздельно (любой символ)" hidden=""><img class="OTKRIVASHKA_img_CSS" id="OTKRIVASHKA_imgTrue1_id" src="https://avatanplus.com/files/resources/mid/5775880ee27f8155a31b7a50.png" hidden=""><img class="OTKRIVASHKA_img_CSS" id="OTKRIVASHKA_imgFalse1_id" src="https://dilogrenme.com/assets/img/uploads/false.png" hidden=""><br><input class="OTKRIVASHKA_input_CSS" id="OTKRIVASHKA_TextInput_id" type="text" placeholder="Текст для вставки" hidden=""><input class="OTKRIVASHKA_input_CSS" style="margin-bottom: 3px;" id="OTKRIVASHKA_TextDelete_id" type="text" placeholder="Текст для удаления" hidden=""><span id="Desc_span_id"><br><input class="OTKRIVASHKA_input_CSS" style="margin-bottom: 3px;" id="OTKRIVASHKA_TextGDelete_id" type="text" placeholder="Текст для удаления в группе"><input class="sidenav" type="radio" id="OTKRIVASHKA_clearCDD_id"><label for="OTKRIVASHKA_clearCDD_id">Очистить описание группы</label><input class="sidenav" type="radio" id="OTKRIVASHKA_clearGD_id"><label for="OTKRIVASHKA_clearGD_id">Очистить индивидуальное описание</label></span><span id="OTKRIVASHKA_Case_span" hidden="true"><input class="sidenav" type="radio" id="OTKRIVASHKA_Case_1_id"><label for="OTKRIVASHKA_Case_1_id">Условие</label><input class="ThisCase" type="radio" id="OTKRIVASHKA_ON_BASE_id"><label for="OTKRIVASHKA_ON_BASE_id">Только базовый</label></span><span id="OTKRIVASHKA_TemplateSpan_id" hidden=""><select сlass="OTKRIVASHKA_select_CSS" id="OTKRIVASHKA_TemplateSelect_id"><option value="">Выберите шаблон</option></select><br><select class="OTKRIVASHKA_select_CSS" id="OTKRIVASHKA_TypeSelect_id" hidden=""><option value="">Выберите тип</option></select><br></span><select class="OTKRIVASHKA_select_CSS" id="OTKRIVASHKA_ManSelect_id" hidden=""><option value="">Выберите менеджера</option></select><br><input class="OTKRIVASHKA_inputNum_CSS" id="OTKRIVASHKA_fromText_id" type="text" value="" placeholder="от" hidden=""><input class="OTKRIVASHKA_inputNum_CSS" id="OTKRIVASHKA_outText_id" type="text" value="" placeholder="до" hidden=""><p class="OTKRIVASHKA_p_CSS" id="OTKRIVASHKA_P_id" style="color:black;margin-left: 23px;" hidden="">Введите нужное количество.</p><input class="OTKRIVASHKA_submit_CSS" type="button" id="OTKRIVASHKA_submit_id" value="СТАРТ" hidden=""><input class="OTKRIVASHKA_clear_CSS" type="button" id="OTKRIVASHKA_clear2_id" value="ОЧИСТИТЬ" hidden=""></div></div><button class="accordion" id="accordeon_id2">Перешаблонка</button><div class="panel"><input class="sidenav" type="radio" id="OTKRIVASHKA_radioTemplate_id"><label for="OTKRIVASHKA_radioTemplate_id">Массово</label><input class="sidenav" type="radio" id="OTKRIVASHKA_radioTemplateByCode_id"><label for="OTKRIVASHKA_radioTemplateByCode_id">По кодам</label><div id="div_template"></div></div><button class="accordion" id="accordeon_id3">Перенос (клон)</button><div class="panel"><input class="sidenav" type="radio" id="OTKRIVASHKA_radioClone_id"><label for="OTKRIVASHKA_radioClone_id">Массово</label><input class="sidenav" type="radio" id="OTKRIVASHKA_radioCloneByCode_id"><label for="OTKRIVASHKA_radioCloneByCode_id">По кодам</label><div id="div_clone"></div></div><button class="accordion" id="accordeon_id4">Правка</button><div class="panel"><input class="sidenav" type="radio" id="OTKRIVASHKA_radioEdit_id"><label for="OTKRIVASHKA_radioEdit_id">Массово</label><input class="sidenav" type="radio" id="OTKRIVASHKA_radioEditByCode_id"><label for="OTKRIVASHKA_radioEditByCode_id">По кодам</label><div id="div_edit"></div>></div><button class="accordion" id="accordeon_id5">Открыть + Юзерскрипт</button><div class="panel"><input class="sidenav" type="radio" id="OTKRIVASHKA_radioOpen_id"><label for="OTKRIVASHKA_radioOpen_id">Массово</label><input class="sidenav" type="radio" id="OTKRIVASHKA_radioOpenByCode_id"><label for="OTKRIVASHKA_radioOpenByCode_id">По кодам</label><div id="div_open"></div></div><button class="accordion" id="accordeon_id6">Текст</button><div class="panel"><input class="sidenav" type="radio" id="OTKRIVASHKA_radioText_id"><label for="OTKRIVASHKA_radioText_id">Массово</label><input class="sidenav" type="radio" id="OTKRIVASHKA_radioTextByCode_id"><label for="OTKRIVASHKA_radioTextByCode_id">По кодам</label><div id="div_text"></div></div><button class="accordion" id="accordeon_id7">Вернуть</button><div class="panel"><input class="sidenav" type="radio" id="OTKRIVASHKA_radioBack_id"><label for="OTKRIVASHKA_radioBack_id">Массово</label><input class="sidenav" type="radio" id="OTKRIVASHKA_radioBackByCode_id"><label for="OTKRIVASHKA_radioBackByCode_id">По кодам</label><div id="div_back"></div></div></div>');
        document.getElementById('header').insertAdjacentHTML('afterend', '<span class="CSUspan">&#9776; Content SuperUser</span>');

        document.getElementById('base_filter').insertAdjacentHTML('afterend', '<button id="CSU_EXCEL" style="margin: 0 10px 15px 0;">Excel для поставщиков</button>');
        document.getElementById('CSU_EXCEL').insertAdjacentHTML('afterend', '<button id="CSU_GRUP" style="margin: 0 10px 15px 0;">Коды по группам</button>');
        function addScript(src){
            var script = document.createElement('script');
            script.src = src;
            script.async = false; // чтобы гарантировать порядок
            document.head.appendChild(script);
        }
        addScript('https://cdn.jsdelivr.net/alasql/0.3/alasql.min.js');
        addScript('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.7.12/xlsx.core.min.js');
    }, 100);
    let MAIN_PLUGIN_SCRIPT = function () {
        /*****bands*****/
        document.getElementById('CSU_GRUP').onclick = function(){
            let BANDSobj = new Object();
            if(document.getElementById("select_template_id").options[document.getElementById("select_template_id").selectedIndex].value != 0){
                let sleep = function (ms, i) {
                    setTimeout(function(){
                        let progress = document.getElementById('progress-bar');
                        let procent = document.getElementById('procent');
                        progress.style.width = (i * 0.88) + '%';
                        procent.innerHTML = i + '%';
                    },1);
                    return new Promise(resolve => setTimeout(resolve, ms));
                }
                let openNav2 = function (){
                    document.getElementById("mySidenav2").style.width = "100%";
                }
                let Go_find2 = function (){
                    let continues = function(){
                        document.getElementById('BANDS').remove();
                        let gotovo = JSON.stringify(BANDSobj).replace(/,/g, '\n').replace(/;/g, ',').replace('{', '').replace('}', '').replace(/"/g, '');
                        function blob(filename, text, type) {
                            let main_element = document.createElement('a');
                            main_element.setAttribute('href', type + encodeURIComponent(text));
                            main_element.setAttribute('download', filename);
                        
                            main_element.style.display = 'none';
                            document.body.appendChild(main_element);
                        
                            main_element.click();
                        
                            document.body.removeChild(main_element);
                        }
                        blob(document.getElementById("select_template_id").options[document.getElementById("select_template_id").selectedIndex].textContent +".txt", gotovo, 'data:text/plain;charset=utf-8,');
                        setTimeout(() => {
                            document.getElementById("mySidenav2").style.width = "0";
                            progress.style.width = '0';
                            procent.innerHTML = '';
                            procent.style.color = '#febd01';
                        }, 600);  
                    }
                    let linkbase = [];
                    let bands = []
                    for(let i = 0; i < document.getElementById("select_producer_id").options.length; i++){
                        bands.push(document.getElementById("select_producer_id").options[i].textContent)
                    }
                    let progress = document.getElementById('progress-bar');
                    let procent = document.getElementById('procent');
                    let parent;
                    let kid;
                    OTKRIVASHKA_Paragraph = document.getElementById("target_cont");
                    OTKRIVASHKA_ElementNum = OTKRIVASHKA_Paragraph.getElementsByTagName("*").length;/*количество элементов тега fieldset переборка*/
                    let DERstring;

                    let morph = function(i){
                        if(i){
                            sleep(1, 50 + ((Math.round((i * 100) / (linkbase.length) / 2))));
                        }
                        if(document.getElementById('target_cont').innerHTML.includes(linkbase[i].split('21vek.by')[1])){
                            let itemIdHtml = new XMLHttpRequest(); //запрос на разбивку пагинации
                            itemIdHtml.open('GET', linkbase[i], false);
                            itemIdHtml.send();
                            document.getElementById('BANDS').innerHTML = itemIdHtml.response;
                            document.getElementById('j-bunch_goods').click();
                            scrollTo(0,0);
                            let gay = setInterval(function(){
                                if(document.getElementsByClassName('ui-dialog-content ui-widget-content')[0]){
                                    document.getElementsByClassName('ui-dialog ui-widget ui-widget-content ui-corner-all ui-draggable ui-resizable')[0].hidden = true;
                                    document.getElementsByClassName('ui-widget-overlay')[0].hidden = true;
                                    DERstring = document.getElementsByClassName('ui-dialog-content ui-widget-content')[0].textContent;
                                    DERstring = DERstring.replace(DERstring.substring(DERstring.indexOf(')'), DERstring.indexOf(')') + 13), '').replace(/\D+/g, "; ").slice(2);
                                    BANDSobj[document.getElementById('GoodCode').value] = DERstring;
                                    document.getElementsByClassName('ui-icon ui-icon-closethick')[0].click();
                                    scrollTo(0,0);
                                    document.getElementById('BANDS').innerHTML = '';
                                    document.getElementsByClassName('ui-dialog ui-widget ui-widget-content ui-corner-all ui-draggable ui-resizable')[0].remove();
                                    clearInterval(gay);
                                    if(i < linkbase.length - 1){
                                        i++;
                                        morph(i);
                                    }else{
                                        procent.style.color = '#947ADA';
                                        continues();
                                    }
                                }
                            },1);
                        }else{
                            if(i < linkbase.length - 1){
                                i++;
                                morph(i);
                            }else{
                                procent.style.color = '#947ADA';
                                continues();
                            }
                        }
                    }
                    let z = 0;
                    let pognali = setInterval(function(){
                        if(i){
                            sleep(1, (Math.round((i * 100) / (OTKRIVASHKA_ElementNum) / 2)));
                        }
                        if(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[i].target == "blank"){
                            if(bands.indexOf(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[i].textContent.split("\u00A0")[1].split("\u00A0")[0]) > -1){
                                let itemIdHtml = new XMLHttpRequest(); //запрос на разбивку пагинации
                                itemIdHtml.open('GET', OTKRIVASHKA_Paragraph.getElementsByTagName("*")[i + 3].href, false);
                                itemIdHtml.send();
                                document.getElementById('BANDS').innerHTML = itemIdHtml.response.split('<select name="data[Good][bunch_good_id]" autocomplete="off" id="GoodBunchGoodId"')[1].split('</select>')[0];
                                parent = document.getElementById('BANDS');
                                kid = parent.getElementsByTagName("*");
                                for(let p = 0; p < parent.getElementsByTagName("*").length - 1; p++){
                                    if(kid[p].value != '0' && linkbase.indexOf('https://www.21vek.by/admin/goods/edit/' + kid[p].value + '/') < 0){
                                        linkbase.push('https://www.21vek.by/admin/goods/edit/' + kid[p].value + '/');
                                    }
                                }
                                if(kid.length > 2){
                                    bands.splice(bands.indexOf(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[i].textContent.split("\u00A0")[1].split("\u00A0")[0]), 1);
                                }
                                document.getElementById('BANDS').innerHTML = '';
                            }
                        }
                        i++;
                        if( i == OTKRIVASHKA_ElementNum - 1){
                            clearInterval(pognali);
                            morph(0);
                            
                        }
                    },1)
                    
                }
                openNav2();
                document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', '<div id="BANDS" hidden="true"></div>');
                setTimeout(() => {
                    Go_find2();
                }, 1);
            }else{alert('Нужно выбрать шаблон')}
        }

        /*****accardeon*****/
        let acc = document.getElementsByClassName("accordion");
        let i;
        let p;
        let closerTape = function(){
            for(p = 0;p < acc.length; p++){
                acc[p].nextElementSibling.style.display = "none";
                acc[p].classList.remove("active");
            }
        }
        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener('click', function() {
                for(p = 0;p < acc.length; p++){
                    if(p != i){
                        acc[p].nextElementSibling.style.display = "none";
                        acc[p].classList.remove("active");
                    }
                }
                this.classList.toggle("active");
                let panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                    panel.style.display = "none";
                } else {
                    panel.style.display = "block";
                }
            });
        }
        /*****Открыть меню*****/
        let openNav = document.getElementsByClassName('CSUspan')[0].onclick = function () {
            document.getElementById("mySidenav").style.width = "500px";
        }
        /*****Закрыть меню*****/
        let closeNav = document.getElementsByTagName('a')[0].onclick = function () {
            document.getElementById("mySidenav").style.width = "0";
            OTKRIVASHKA_Clear();
            closerTape();
        }
        let accordeon_Clear = function(){
            document.getElementById("div_replace").innerHTML = '';
            document.getElementById("div_template").innerHTML = '';
            document.getElementById("div_clone").innerHTML = '';
            document.getElementById("div_edit").innerHTML = '';
            document.getElementById("div_open").innerHTML = '';
            document.getElementById("div_text").innerHTML = '';
            document.getElementById("div_back").innerHTML = '';
        }
        /*****аккордеон распределить*****/
        let accordeon_replace = document.getElementById("accordeon_id1").onclick = function (){
            accordeon_Clear();
            document.getElementById("div_replace").innerHTML = DOM_Corrector;
            MAIN_PLUGIN_SCRIPT();
        }
        /*****аккордеон перешаблонка*****/
        let accordeon_template = document.getElementById("accordeon_id2").onclick = function (){
            accordeon_Clear();
            document.getElementById("div_template").innerHTML = DOM_Corrector;
            MAIN_PLUGIN_SCRIPT();
        }
        /*****аккордеон клон*****/
        let accordeon_clone = document.getElementById("accordeon_id3").onclick = function (){
            accordeon_Clear();
            document.getElementById("div_clone").innerHTML = DOM_Corrector;
            MAIN_PLUGIN_SCRIPT();
        }
        /*****аккордеон правка*****/
        let accordeon_edit = document.getElementById("accordeon_id4").onclick = function (){
            try{
                if(document.getElementById("select_template_id").options[document.getElementById("select_template_id").selectedIndex].value != 0){
                    accordeon_Clear();
                    document.getElementById("div_edit").innerHTML = DOM_Corrector;
                    MAIN_PLUGIN_SCRIPT();
                }
            }catch{
                document.getElementById("accordeon_id4").nextElementSibling.style.display = "none";
                document.getElementById("accordeon_id4").classList.remove("active");
                closeNav();
                alert('Нужно выбрать 1 шаблон!')
            }
        }
        /*****аккордеон открыть*****/
        let accordeon_Open = document.getElementById("accordeon_id5").onclick = function (){
            accordeon_Clear();
            document.getElementById("div_open").innerHTML = DOM_Corrector;
            MAIN_PLUGIN_SCRIPT();
        }
        /*****аккордеон текст*****/
        let accordeon_text = document.getElementById("accordeon_id6").onclick = function (){
            accordeon_Clear();
            document.getElementById("div_text").innerHTML = DOM_Corrector;
            MAIN_PLUGIN_SCRIPT();
        }
        /*****аккордеон вернуть*****/
        let accordeon_back = document.getElementById("accordeon_id7").onclick = function (){
            try{
                if(document.getElementById("GoodReady").options[document.getElementById("GoodReady").selectedIndex].value != 0){
                    accordeon_Clear();
                    document.getElementById("div_back").innerHTML = DOM_Corrector;
                    MAIN_PLUGIN_SCRIPT();
                }else{
                    document.getElementById("accordeon_id7").nextElementSibling.style.display = "none";
                    document.getElementById("accordeon_id7").classList.remove("active");
                    closeNav();
                    alert('Статус выбоки должен быть исключительно "Ожидают проверки" или "Опубликованы"!!! "В редакции" нельзя вернуть!')
                }
            }catch{
                document.getElementById("accordeon_id7").nextElementSibling.style.display = "none";
                document.getElementById("accordeon_id7").classList.remove("active");
                closeNav();
                alert('Нужно настроить выборку на "Ожидают проверки" или "Опубликованы"!!!')
            }
        }
        /*****Полный сброс*****/
        let OTKRIVASHKA_Clear = document.getElementById("OTKRIVASHKA_clear1_id").onclick = document.getElementById("OTKRIVASHKA_clear2_id").onclick = function (){
            IfCase = [];
            DelCase = [];
            AddCase = [];
            Cases = '';
            OTKRIVASHKA_TrueOrFalse1 = false;
            document.getElementById("OTKRIVASHKA_fromText_id").value = "";
            document.getElementById("OTKRIVASHKA_outText_id").value = "";
            document.getElementById("OTKRIVASHKA_ManSelect_id").value = "";
            document.getElementById("OTKRIVASHKA_GoodText_id").value = "";
            document.getElementById("OTKRIVASHKA_GoodCode_id").value = "";
            document.getElementById("OTKRIVASHKA_TemplateSelect_id").value = "";
            document.getElementById("OTKRIVASHKA_TypeSelect_id").innerHTML = '<option value="">Выберите тип</option>';
            document.getElementById("OTKRIVASHKA_radioOpen_id").checked = false;
            document.getElementById("OTKRIVASHKA_radioReplace_id").checked = false;
            document.getElementById("OTKRIVASHKA_radioOpenByCode_id").checked = false;
            document.getElementById("OTKRIVASHKA_radioReplaceByCode_id").checked = false;
            document.getElementById("OTKRIVASHKA_radioTemplate_id").checked = false;
            document.getElementById("OTKRIVASHKA_radioTemplateByCode_id").checked = false;
            document.getElementById("OTKRIVASHKA_radioText_id").checked = false;
            document.getElementById("OTKRIVASHKA_radioTextByCode_id").checked = false;
            document.getElementById("OTKRIVASHKA_radioBack_id").checked = false;
            document.getElementById("OTKRIVASHKA_radioBackByCode_id").checked = false;
            document.getElementById("OTKRIVASHKA_radioClone_id").checked = false;
            document.getElementById("OTKRIVASHKA_radioCloneByCode_id").checked = false;
            document.getElementById("OTKRIVASHKA_radioEdit_id").checked = false;
            document.getElementById("OTKRIVASHKA_radioEditByCode_id").checked = false;
            document.getElementById("OTKRIVASHKA_clear2_id").hidden = true;
            document.getElementById("OTKRIVASHKA_submit_id").hidden = true;
            document.getElementById("OTKRIVASHKA_P_id").hidden = true;
            document.getElementById("OTKRIVASHKA_outText_id").hidden = true;
            document.getElementById("OTKRIVASHKA_ManSelect_id").hidden = true;
            document.getElementById("OTKRIVASHKA_GoodText_id").hidden = true;
            document.getElementById("OTKRIVASHKA_clear1_id").hidden = true;
            document.getElementById("OTKRIVASHKA_imgFalse1_id").hidden = true;
            document.getElementById("OTKRIVASHKA_imgTrue1_id").hidden = true;
            document.getElementById("OTKRIVASHKA_fromText_id").hidden = true;
            document.getElementById("OTKRIVASHKA_GoodCode_id").hidden = true;
            document.getElementById("OTKRIVASHKA_TemplateSpan_id").hidden = true;
            document.getElementById("OTKRIVASHKA_TypeSelect_id").hidden = true;
            document.getElementById("OTKRIVASHKA_TextInput_id").hidden = true;
            document.getElementById("OTKRIVASHKA_FunctionSelect_id").hidden = true;
            document.getElementById("OTKRIVASHKA_FunctionSelect_id").options[0].selected = true;
            document.getElementById("OTKRIVASHKA_VideoCode_id").hidden = true;
            document.getElementById("OTKRIVASHKA_TextInput_id").value = "";
            document.getElementById("OTKRIVASHKA_TextDelete_id").hidden = true;
            document.getElementById("OTKRIVASHKA_TextDelete_id").value = "";
            document.getElementById("OTKRIVASHKA_clearCDD_id").checked = false;
            document.getElementById("OTKRIVASHKA_clearGD_id").checked = false;
            document.getElementById("OTKRIVASHKA_TextGDelete_id").value = '';
            document.getElementById("Desc_span_id").hidden = true;
            document.getElementById("OTKRIVASHKA_Case_1_id").checked = false;
            document.getElementById("OTKRIVASHKA_Case_span").hidden = true;
            document.getElementById("Cases").style.width = '0';
            document.getElementById('OTKRIVASHKA_ON_BASE_id').checked = false;
            OTKRIVASHKA_CaseClear();
        }
        /*****Oткрывашка*****/
        let OTKRIVASHKA_Open = document.getElementById("OTKRIVASHKA_radioOpen_id").onclick = function (){
            OTKRIVASHKA_Clear();
            document.getElementById("OTKRIVASHKA_radioOpen_id").checked = true;
            document.getElementById("OTKRIVASHKA_clear1_id").hidden = false;
            document.getElementById("OTKRIVASHKA_FunctionSelect_id").hidden = false;
            document.getElementById("OTKRIVASHKA_GoodText_id").hidden = false;
        }
        /*****Открыть по коду*****/
        let OTKRIVASHKA_OpenByCode = document.getElementById("OTKRIVASHKA_radioOpenByCode_id").onclick = function (){
            OTKRIVASHKA_Clear();
            document.getElementById("OTKRIVASHKA_radioOpenByCode_id").checked = true;
            document.getElementById("OTKRIVASHKA_clear1_id").hidden = false;
            document.getElementById("OTKRIVASHKA_FunctionSelect_id").hidden = false;
            document.getElementById("OTKRIVASHKA_GoodCode_id").hidden = false;
        }
        /*****Распределятель*****/
        let OTKRIVASHKA_Replace = document.getElementById("OTKRIVASHKA_radioReplace_id").onclick = function (){
            OTKRIVASHKA_Clear();
            document.getElementById("OTKRIVASHKA_radioReplace_id").checked = true;
            document.getElementById("OTKRIVASHKA_clear1_id").hidden = false;
            document.getElementById("OTKRIVASHKA_GoodText_id").hidden = false;
            document.getElementById("OTKRIVASHKA_ManSelect_id").hidden = false;
        }
        /*****Распределить по кодам*****/
        let OTKRIVASHKA_ReplaceByCode = document.getElementById("OTKRIVASHKA_radioReplaceByCode_id").onclick = function (){
            OTKRIVASHKA_Clear();
            document.getElementById("OTKRIVASHKA_radioReplaceByCode_id").checked = true;
            document.getElementById("OTKRIVASHKA_clear1_id").hidden = false;
            document.getElementById("OTKRIVASHKA_GoodCode_id").hidden = false;
            document.getElementById("OTKRIVASHKA_ManSelect_id").hidden = false;
        }
        /*****Перешаблонить*****/
        let OTKRIVASHKA_Template = document.getElementById("OTKRIVASHKA_radioTemplate_id").onclick = function (){
            OTKRIVASHKA_Clear();
            document.getElementById("OTKRIVASHKA_radioTemplate_id").checked = true;
            document.getElementById("OTKRIVASHKA_TemplateSpan_id").hidden = false;
            document.getElementById("OTKRIVASHKA_clear1_id").hidden = false;
            document.getElementById("OTKRIVASHKA_GoodText_id").hidden = false;
        }
        /*****Перешаблонить по коду*****/
        let OTKRIVASHKA_TemplateByCode = document.getElementById("OTKRIVASHKA_radioTemplateByCode_id").onclick = function (){
            OTKRIVASHKA_Clear();
            document.getElementById("OTKRIVASHKA_radioTemplateByCode_id").checked = true;
            document.getElementById("OTKRIVASHKA_TemplateSpan_id").hidden = false;
            document.getElementById("OTKRIVASHKA_clear1_id").hidden = false;
            document.getElementById("OTKRIVASHKA_GoodCode_id").hidden = false;
        }
        /*****Текстовая правка*****/
        let OTKRIVASHKA_Text = document.getElementById("OTKRIVASHKA_radioText_id").onclick = function (){
            OTKRIVASHKA_Clear();
            document.getElementById("OTKRIVASHKA_radioText_id").checked = true;
            document.getElementById("OTKRIVASHKA_clear1_id").hidden = false;
            document.getElementById("OTKRIVASHKA_GoodText_id").hidden = false;
            document.getElementById("OTKRIVASHKA_TextInput_id").hidden = false;
            document.getElementById("OTKRIVASHKA_TextDelete_id").hidden = false;
            document.getElementById("Desc_span_id").hidden = false;
        }
        /*****Текстовая правка по коду*****/
        let OTKRIVASHKA_TextCode = document.getElementById("OTKRIVASHKA_radioTextByCode_id").onclick = function (){
            OTKRIVASHKA_Clear();
            document.getElementById("OTKRIVASHKA_radioTextByCode_id").checked = true;
            document.getElementById("OTKRIVASHKA_clear1_id").hidden = false;
            document.getElementById("OTKRIVASHKA_GoodCode_id").hidden = false;
            document.getElementById("OTKRIVASHKA_TextInput_id").hidden = false;
            document.getElementById("OTKRIVASHKA_TextDelete_id").hidden = false;
            document.getElementById("Desc_span_id").hidden = false;
        }
        /*****Клонировать*****/
        let OTKRIVASHKA_Clone = document.getElementById("OTKRIVASHKA_radioClone_id").onclick = function (){
            OTKRIVASHKA_Clear();
            document.getElementById("OTKRIVASHKA_radioClone_id").checked = true;
            document.getElementById("OTKRIVASHKA_TemplateSpan_id").hidden = false;
            document.getElementById("OTKRIVASHKA_clear1_id").hidden = false;
            document.getElementById("OTKRIVASHKA_GoodText_id").hidden = false;
            document.getElementById("OTKRIVASHKA_TypeSelect_id").hidden = true;

        }
        /*****Клонировать по коду*****/
        let OTKRIVASHKA_CloneByCode = document.getElementById("OTKRIVASHKA_radioCloneByCode_id").onclick = function (){
            OTKRIVASHKA_Clear();
            document.getElementById("OTKRIVASHKA_radioCloneByCode_id").checked = true;
            document.getElementById("OTKRIVASHKA_TemplateSpan_id").hidden = false;
            document.getElementById("OTKRIVASHKA_clear1_id").hidden = false;
            document.getElementById("OTKRIVASHKA_GoodCode_id").hidden = false;
            document.getElementById("OTKRIVASHKA_TypeSelect_id").hidden = true;
        }
        /*****Вернуть*****/
        let OTKRIVASHKA_Back = document.getElementById("OTKRIVASHKA_radioBack_id").onclick = function (){
            OTKRIVASHKA_Clear();
            document.getElementById("OTKRIVASHKA_radioBack_id").checked = true;
            document.getElementById("OTKRIVASHKA_clear1_id").hidden = false;
            document.getElementById("OTKRIVASHKA_GoodText_id").hidden = false;
        }
        /*****Вернуть по коду*****/
        let OTKRIVASHKA_BackByCode = document.getElementById("OTKRIVASHKA_radioBackByCode_id").onclick = function (){
            OTKRIVASHKA_Clear();
            document.getElementById("OTKRIVASHKA_radioBackByCode_id").checked = true;
            document.getElementById("OTKRIVASHKA_clear1_id").hidden = false;
            document.getElementById("OTKRIVASHKA_GoodCode_id").hidden = false;
        }
        /*****Правка*****/
        let OTKRIVASHKA_Edit = document.getElementById("OTKRIVASHKA_radioEdit_id").onclick = function (){
            OTKRIVASHKA_Clear();
            document.getElementById("OTKRIVASHKA_radioEdit_id").checked = true;
            document.getElementById("OTKRIVASHKA_clear1_id").hidden = false;
            document.getElementById("OTKRIVASHKA_GoodText_id").hidden = false;
            document.getElementById("OTKRIVASHKA_Case_span").hidden = false;
        }
        /*****Правка по коду*****/
        let OTKRIVASHKA_EditByCode = document.getElementById("OTKRIVASHKA_radioEditByCode_id").onclick = function (){
            OTKRIVASHKA_Clear();
            document.getElementById("OTKRIVASHKA_radioEditByCode_id").checked = true;
            document.getElementById("OTKRIVASHKA_clear1_id").hidden = false;
            document.getElementById("OTKRIVASHKA_GoodCode_id").hidden = false;
            document.getElementById("OTKRIVASHKA_Case_span").hidden = false;
        }
        /*****Валидация кодов*****/
        let OTKRIVASHKA_GoodCodeClick = document.getElementById("OTKRIVASHKA_GoodCode_id").oninput = function (){
            OTKRIVASHKA_GoodCodeFound();
            if(OTKRIVASHKA_TrueOrFalse1 == true){
                if(document.getElementById("OTKRIVASHKA_radioOpenByCode_id").checked == true){
                    document.getElementById("OTKRIVASHKA_fromText_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_outText_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_P_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_imgFalse1_id").hidden = true;
                    document.getElementById("OTKRIVASHKA_imgTrue1_id").hidden = false;
                    OTKRIVASHKA_ReadyCheck(); //для открывашки
                }
                if(document.getElementById("OTKRIVASHKA_radioReplaceByCode_id").checked == true){
                    document.getElementById("OTKRIVASHKA_fromText_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_outText_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_P_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_imgFalse1_id").hidden = true;
                    document.getElementById("OTKRIVASHKA_imgTrue1_id").hidden = false;
                    OTKRIVASHKA_ReadyCheck(); //для перераспределения
                }
                if(document.getElementById("OTKRIVASHKA_radioTemplateByCode_id").checked == true){
                    document.getElementById("OTKRIVASHKA_fromText_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_outText_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_P_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_imgFalse1_id").hidden = true;
                    document.getElementById("OTKRIVASHKA_imgTrue1_id").hidden = false;
                    OTKRIVASHKA_ReadyCheck(); //для перешаблонки
                }
                if(document.getElementById("OTKRIVASHKA_radioTextByCode_id").checked == true){
                    document.getElementById("OTKRIVASHKA_fromText_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_outText_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_P_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_imgFalse1_id").hidden = true;
                    document.getElementById("OTKRIVASHKA_imgTrue1_id").hidden = false;
                    OTKRIVASHKA_ReadyCheck(); //для текстовой правки
                }
                if(document.getElementById("OTKRIVASHKA_radioCloneByCode_id").checked == true){
                    document.getElementById("OTKRIVASHKA_fromText_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_outText_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_P_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_imgFalse1_id").hidden = true;
                    document.getElementById("OTKRIVASHKA_imgTrue1_id").hidden = false;
                    OTKRIVASHKA_ReadyCheck(); //для клонирования
                }
                if(document.getElementById("OTKRIVASHKA_radioBackByCode_id").checked == true){
                    document.getElementById("OTKRIVASHKA_fromText_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_outText_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_P_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_imgFalse1_id").hidden = true;
                    document.getElementById("OTKRIVASHKA_imgTrue1_id").hidden = false;
                    OTKRIVASHKA_ReadyCheck(); //для вернуть
                }
                if(document.getElementById("OTKRIVASHKA_radioEditByCode_id").checked == true){
                    document.getElementById("OTKRIVASHKA_fromText_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_outText_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_P_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_imgFalse1_id").hidden = true;
                    document.getElementById("OTKRIVASHKA_imgTrue1_id").hidden = false;
                    OTKRIVASHKA_ReadyCheck(); //для правок
                }
            }
            else{
                document.getElementById("OTKRIVASHKA_fromText_id").hidden = true;
                document.getElementById("OTKRIVASHKA_imgFalse1_id").hidden = false;
                document.getElementById("OTKRIVASHKA_imgTrue1_id").hidden = true;
                document.getElementById("OTKRIVASHKA_outText_id").hidden = false;
                document.getElementById("OTKRIVASHKA_outText_id").value = "ПУСТО";
                document.getElementById("OTKRIVASHKA_fromText_id").value = "";
                OTKRIVASHKA_ReadyCheck(); //не нашло
            }
        }
        /*****Валидация наименования*****/
        let OTKRIVASHKA_GoodClick = document.getElementById("OTKRIVASHKA_GoodText_id").onclick = document.getElementById("OTKRIVASHKA_GoodText_id").oninput = function (){
            OTKRIVASHKA_GoodFound();
            if(OTKRIVASHKA_TrueOrFalse1 == true){
                if(document.getElementById("OTKRIVASHKA_radioOpen_id").checked == true){
                    document.getElementById("OTKRIVASHKA_fromText_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_outText_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_P_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_imgFalse1_id").hidden = true;
                    document.getElementById("OTKRIVASHKA_imgTrue1_id").hidden = false;
                    OTKRIVASHKA_ReadyCheck(); //для открывашки
                }
                if(document.getElementById("OTKRIVASHKA_radioReplace_id").checked == true){
                    document.getElementById("OTKRIVASHKA_fromText_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_outText_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_P_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_imgFalse1_id").hidden = true;
                    document.getElementById("OTKRIVASHKA_imgTrue1_id").hidden = false;
                    OTKRIVASHKA_ReadyCheck(); //для перераспределения
                }
                if(document.getElementById("OTKRIVASHKA_radioTemplate_id").checked == true){
                    document.getElementById("OTKRIVASHKA_fromText_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_outText_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_P_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_imgFalse1_id").hidden = true;
                    document.getElementById("OTKRIVASHKA_imgTrue1_id").hidden = false;
                    OTKRIVASHKA_ReadyCheck(); //для перешаблонки
                }
                if(document.getElementById("OTKRIVASHKA_radioClone_id").checked == true){
                    document.getElementById("OTKRIVASHKA_fromText_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_outText_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_P_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_imgFalse1_id").hidden = true;
                    document.getElementById("OTKRIVASHKA_imgTrue1_id").hidden = false;
                    OTKRIVASHKA_ReadyCheck(); //для клонирования
                }
                if(document.getElementById("OTKRIVASHKA_radioText_id").checked == true){
                    document.getElementById("OTKRIVASHKA_fromText_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_outText_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_P_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_imgFalse1_id").hidden = true;
                    document.getElementById("OTKRIVASHKA_imgTrue1_id").hidden = false;
                    OTKRIVASHKA_ReadyCheck(); //для текстовой правки
                }
                if(document.getElementById("OTKRIVASHKA_radioBack_id").checked == true){
                    document.getElementById("OTKRIVASHKA_fromText_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_outText_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_P_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_imgFalse1_id").hidden = true;
                    document.getElementById("OTKRIVASHKA_imgTrue1_id").hidden = false;
                    OTKRIVASHKA_ReadyCheck(); //для возврата
                }
                if(document.getElementById("OTKRIVASHKA_radioEdit_id").checked == true){
                    document.getElementById("OTKRIVASHKA_fromText_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_outText_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_P_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_imgFalse1_id").hidden = true;
                    document.getElementById("OTKRIVASHKA_imgTrue1_id").hidden = false;
                    OTKRIVASHKA_ReadyCheck(); //для правок
                }
            }
            else{
                document.getElementById("OTKRIVASHKA_fromText_id").hidden = true;
                document.getElementById("OTKRIVASHKA_imgFalse1_id").hidden = false;
                document.getElementById("OTKRIVASHKA_imgTrue1_id").hidden = true;
                document.getElementById("OTKRIVASHKA_outText_id").hidden = false;
                document.getElementById("OTKRIVASHKA_outText_id").value = "ПУСТО";
                document.getElementById("OTKRIVASHKA_fromText_id").value = "";
                OTKRIVASHKA_ReadyCheck(); //не нашло
            }
        }
        /*****Валидация манагера*****/
        let OTKRIVASHKA_ManClick = document.getElementById("OTKRIVASHKA_ManSelect_id").onclick = function (){
            OTKRIVASHKA_ReadyCheck();
        }
        /*****Валидация текста*****/
        let OTKRIVASHKA_TextEditClick = document.getElementById("OTKRIVASHKA_TextInput_id").onclick = document.getElementById("OTKRIVASHKA_TextDelete_id").onclick = document.getElementById("OTKRIVASHKA_TextDelete_id").oninput = document.getElementById("OTKRIVASHKA_TextInput_id").oninput = document.getElementById("OTKRIVASHKA_clearCDD_id").onclick = document.getElementById("OTKRIVASHKA_clearGD_id").onclick = document.getElementById("OTKRIVASHKA_TextGDelete_id").oninput = document.getElementById("OTKRIVASHKA_TextGDelete_id").onclick = function (){
            OTKRIVASHKA_ReadyCheck();
        }
        /*****Валидация кейсов правок*****/
        let OTKRIVASHKA_CaseTempRequest = function(casse, caseName){
            let itemIdHtml = new XMLHttpRequest(); //запрос к шаблону по его коду
            itemIdHtml.open('GET', `https://www.21vek.by/admin/goods/get_template/` + document.getElementById("select_template_id").options[document.getElementById("select_template_id").selectedIndex].value + '/', false);
            itemIdHtml.send();
            let outsideDOM = itemIdHtml.response;
            document.getElementById('DivCase').innerHTML = outsideDOM;
            let parent = document.getElementById("DivCase");
            let kid = parent.getElementsByTagName("*");
            let el_num = kid.length;
            if(casse == "DelCase"){
                for(let i = 0; i < el_num; i++){
                    if(kid[i].type == "text" && kid[i].className == "j-check_number"){
                        kid[i].type = "checkbox";
                        document.getElementById(kid[i].id).insertAdjacentHTML('afterend', '<label for="' + kid[i].id + '">УДАЛИТЬ ТЕКСТ</label>?<br>');
                        el_num = el_num + 2;
                    }
                    if(kid[i].type == "text" && kid[i].className == "flexible"){
                        kid[i].type = "checkbox";
                        document.getElementById(kid[i].id).insertAdjacentHTML('afterend', '<label for="' + kid[i].id + '">УДАЛИТЬ ТЕКСТ</label><br>');
                        el_num = el_num + 2;
                    }
                    if(kid[i].type == "text" && kid[i].className == "flexible hidden"){
                        kid[i].type = "checkbox";
                        document.getElementById(kid[i].id).insertAdjacentHTML('afterend', '<label for="' + kid[i].id + '">УДАЛИТЬ ТЕКСТ</label><br>');
                        el_num = el_num + 2;
                    }
                    if(kid[i].type == "text" && kid[i].className == ""){
                        kid[i].type = "checkbox";
                        document.getElementById(kid[i].id).insertAdjacentHTML('afterend', '<label for="' + kid[i].id + '">УДАЛИТЬ ТЕКСТ</label><br>');
                        el_num = el_num + 2;
                    }
                    if(kid[i].type == "radio"){
                        if(kid[i].className == "j-choose_value" || kid[i].className == "j-set_value"){
                            document.getElementById(kid[i].id).type = "checkbox";
                        }
                    }
                }
            }

            if(document.getElementById('OTKRIVASHKA_ON_BASE_id').checked){
                for(let i = 0; i < el_num; i++){
                    if(kid[i].tagName == "TD" && kid[i].className == "attr_name"){
                        kid[i].insertAdjacentHTML('beforeend', '<br><input type="checkbox" class="ch_dis" id="' + (kid[i + 1].id).split('AttrId')[0] + 'Checked"><label for="' + (kid[i + 1].id).split('AttrId')[0] + 'Checked" style="margin-left: 0px !important;">м</label>');
                        kid[i].insertAdjacentHTML('beforeend', '<input type="checkbox" class="ch_dis" id="' + (kid[i + 1].id).split('AttrId')[0] + 'Display"><label for="' + (kid[i + 1].id).split('AttrId')[0] + 'Display" style="margin-left: 0px !important;">о</label>');
                        el_num = el_num + 5;
                    }
                }
            }

            if(document.getElementById(caseName).checked && casse != ''){
                OTKRIVASHKA_CaseBuild(casse);
            }
        }
        let OTKRIVASHKA_CaseTakeVal = function(casse){
            let mass = [];
            let parent = document.getElementById("DivCase");
            let kid = parent.getElementsByTagName("*");
            let el_num = kid.length;
            for(let i = 0; i < el_num; i++){
                if(kid[i].type == "radio" && kid[i].className == "j-choose_value" && kid[i].checked){
                    mass.push(kid[i].id + ':checked');
                }
                if(kid[i].type == "checkbox" && kid[i].className == "j-choose_value" && kid[i].checked){
                    mass.push(kid[i].id + ':checked');
                }
                if(kid[i].type == "radio" && kid[i].className == "j-set_value" && kid[i].checked){
                    mass.push(kid[i].id + ':checked');
                }
                if(kid[i].type == "checkbox" && kid[i].className == "j-set_value" && kid[i].checked){
                    mass.push(kid[i].id + ':checked');
                }
                if(kid[i].type == "checkbox" && kid[i].className == "ch_dis" && kid[i].checked && document.getElementById('OTKRIVASHKA_ON_BASE_id').checked){
                    mass.push(kid[i].id + ':checked');
                }
                if(kid[i].className == "j-check_number" && casse != 'DelCase'){
                    if(kid[i].type == "text" && kid[i].value != ''){
                        mass.push(kid[i].id + ':' + kid[i].value);
                    }
                }else if(kid[i].className == "j-check_number" && casse == 'DelCase'){
                    if(kid[i].type == "checkbox" && kid[i].checked){
                        mass.push(kid[i].id + ':' + casse);
                    }
                }
                if(kid[i].className == "flexible" && casse != 'DelCase'){
                    if(kid[i].type == "text" && kid[i].value != ''){
                        mass.push(kid[i].id + ':' + kid[i].value);
                    }
                }else if(kid[i].className == "flexible" && casse == 'DelCase'){
                    if(kid[i].type == "checkbox" && kid[i].checked){
                        mass.push(kid[i].id + ':' + casse);
                    }
                }
                if(kid[i].className == "flexible hidden" && casse != 'DelCase'){
                    if(kid[i].type == "text" && kid[i].value != ''){
                        mass.push(kid[i].id + ':' + kid[i].value);
                    }
                }else if(kid[i].className == "flexible hidden" && casse == 'DelCase'){
                    if(kid[i].type == "checkbox" && kid[i].checked){
                        mass.push(kid[i].id + ':' + casse);
                    }
                }
                if(kid[i].className == "" && casse != 'DelCase'){
                    if(kid[i].type == "text" && kid[i].value != ''){
                        mass.push(kid[i].id + ':' + kid[i].value);
                    }
                }else if(kid[i].className == "" && casse == 'DelCase'){
                    if(kid[i].type == "checkbox" && kid[i].checked){
                        mass.push(kid[i].id + ':' + casse);
                    }
                }
            }
            if(casse == 'IfCase'){
                IfCase = mass;
            }else if(casse == 'DelCase'){
                DelCase = mass;
            }else if(casse == 'AddCase'){
                AddCase = mass;
            }
        }
        let OTKRIVASHKA_CaseBuild = function(casse){
            let mass = [];
            if(casse == 'IfCase'){
                mass = IfCase;
            }else if(casse == 'DelCase'){
                mass = DelCase;
            }else if(casse == 'AddCase'){
                mass = AddCase;
            }
            for(let i = 0; i < mass.length; i ++){
                if(mass[i].split(':')[1] == 'checked' || mass[i].split(':')[1] == 'DelCase'){
                    document.getElementById(mass[i].split(':')[0]).checked = true;
                }else{
                    document.getElementById(mass[i].split(':')[0]).value = mass[i].split(':')[1];
                }
            }
        }
        let OTKRIVASHKA_CaseClear = function(){
            document.getElementById("AddCaseRadio").checked = false;
            document.getElementById("DelCaseRadio").checked = false;
            document.getElementById("IfCaseRadio").checked = false;
            document.getElementById("DivCase").innerHTML = '';
            document.getElementById("DivCase").hidden = true;
        }
        let OTKRIVASHKA_CaseOpen = document.getElementById("OTKRIVASHKA_Case_1_id").onclick = function(){
            document.getElementById("Cases").style.width = '60%';
            document.getElementById('OTKRIVASHKA_ON_BASE_id').disabled = true;
        }
        let OTKRIVASHKA_CaseIf = document.getElementById("IfCaseRadio").onclick = function(){
            if(document.getElementById("AddCaseRadio").checked){
                OTKRIVASHKA_CaseTakeVal("AddCase");
            }else if(document.getElementById("DelCaseRadio").checked){
                OTKRIVASHKA_CaseTakeVal("DelCase");
            }
            OTKRIVASHKA_CaseClear();
            document.getElementById("IfCaseRadio").checked = true;
            document.getElementById("DivCase").hidden = false;
            OTKRIVASHKA_CaseTempRequest("IfCase", "IfCaseRadio")
        }
        let OTKRIVASHKA_CaseDel = document.getElementById("DelCaseRadio").onclick = function(){
            if(document.getElementById("AddCaseRadio").checked){
                OTKRIVASHKA_CaseTakeVal("AddCase");
            }else if(document.getElementById("IfCaseRadio").checked){
                OTKRIVASHKA_CaseTakeVal("IfCase");
            }
            OTKRIVASHKA_CaseClear();
            document.getElementById("DelCaseRadio").checked = true;
            document.getElementById("DivCase").hidden = false;
            OTKRIVASHKA_CaseTempRequest("DelCase", "DelCaseRadio");
        }
        let OTKRIVASHKA_CaseAdd = document.getElementById("AddCaseRadio").onclick = function(){
            if(document.getElementById("IfCaseRadio").checked){
                OTKRIVASHKA_CaseTakeVal("IfCase");
            }else if(document.getElementById("DelCaseRadio").checked){
                OTKRIVASHKA_CaseTakeVal("DelCase");
            }
            OTKRIVASHKA_CaseClear();
            document.getElementById("AddCaseRadio").checked = true;
            document.getElementById("DivCase").hidden = false;
            OTKRIVASHKA_CaseTempRequest("AddCase", "AddCaseRadio");
        }
        let OTKRIVASHKA_CaseRedy = document.getElementById("OTKRIVASHKA_CaseRedy_id").onclick = function(){
            if(document.getElementById("AddCaseRadio").checked){
                OTKRIVASHKA_CaseTakeVal("AddCase");
            }else if(document.getElementById("IfCaseRadio").checked){
                OTKRIVASHKA_CaseTakeVal("IfCase");
            }else if(document.getElementById("DelCaseRadio").checked){
                OTKRIVASHKA_CaseTakeVal("DelCase");
            }
            if(document.getElementById('OTKRIVASHKA_ON_BASE_id').checked){
                Cases = 'CASE_1_BASE-1_IF-' + IfCase.join('~') + '-/IF_DEL-' + DelCase.join('~') + '-/DEL_ADD-' + AddCase.join('~') + '-/ADD';
            }else{
                Cases = 'CASE_1_BASE-0_IF-' + IfCase.join('~') + '-/IF_DEL-' + DelCase.join('~') + '-/DEL_ADD-' + AddCase.join('~') + '-/ADD';
            }
            document.getElementById("Cases").style.width = '0';
            document.getElementById('OTKRIVASHKA_ON_BASE_id').disabled = false;
            OTKRIVASHKA_ReadyCheck();
        }
        /*****Валидация типов по выбранному шаблону*****/
        let OTKRIVASHKA_TemplateClick = document.getElementById("OTKRIVASHKA_TemplateSelect_id").onclick = function (){
            document.getElementById("OTKRIVASHKA_TypeSelect_id").innerHTML = "";
            OTKRIVASHKA_Option = new Option("Выберите тип", "");
            document.getElementById("OTKRIVASHKA_TypeSelect_id").append(OTKRIVASHKA_Option);
            if(document.getElementById("OTKRIVASHKA_TemplateSelect_id").options[document.getElementById("OTKRIVASHKA_TemplateSelect_id").selectedIndex].value != ""){
                let itemIdHtml = new XMLHttpRequest(); //запрос к шаблону по его коду
                itemIdHtml.open('GET', `https://www.21vek.by/admin/attrs/edit_template/` + document.getElementById("OTKRIVASHKA_TemplateSelect_id").options[document.getElementById("OTKRIVASHKA_TemplateSelect_id").selectedIndex].value + '/', false);
                itemIdHtml.send();
                let outsideDOM = itemIdHtml.response; //вывод страницы редактировкания шаблона в строку
                document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', '<div id="OTKRIVASHKA_XML">' + outsideDOM + '</div>');
                let xmlDoc = document.getElementById("OTKRIVASHKA_XML");
                let fst_num = xmlDoc.getElementsByTagName("table")[0].id.replace(/\D+/g, "");
                //console.log('fst_num = ' + fst_num);
                let type_length = xmlDoc.getElementsByTagName("table")[0].getElementsByClassName("sortable").length;
                //console.log('type_length = ' + type_length);
                let scd_num = [];
                let type_name = []; //наполнение селекта типов опциями с полным отчетом в консоль (название опции = тип, значение = id of radio типа)
                for(let i = 0; i < type_length; i++){
                    scd_num[i] = xmlDoc.getElementsByTagName("table")[0].getElementsByClassName("sortable")[i].getElementsByTagName("input")[0].value;
                    type_name[i] = xmlDoc.getElementsByTagName("table")[0].getElementsByClassName("sortable")[i].getElementsByTagName("input")[1].value;
                    //console.log('GoodAttr' + fst_num + 'ValueId' + scd_num[i] + ' это ' + type_name[i]);
                    OTKRIVASHKA_Option = new Option(type_name[i], 'GoodAttr' + fst_num + 'ValueId' + scd_num[i]);
                    document.getElementById("OTKRIVASHKA_TypeSelect_id").append(OTKRIVASHKA_Option); // вот тут опции залетают
                }
                //console.log(scd_num);
                //console.log(type_name);
                xmlDoc.remove();
                if(document.getElementById("OTKRIVASHKA_radioTemplate_id").checked == true || document.getElementById("OTKRIVASHKA_radioTemplateByCode_id").checked == true){
                    document.getElementById("OTKRIVASHKA_TypeSelect_id").hidden = false;
                }
                OTKRIVASHKA_ReadyCheck();
            }
            else{
                document.getElementById("OTKRIVASHKA_TypeSelect_id").hidden = true;
                document.getElementById("OTKRIVASHKA_TypeSelect_id").innerHTML = "";
                OTKRIVASHKA_Option = new Option("Выберите тип", "");
                document.getElementById("OTKRIVASHKA_TypeSelect_id").append(OTKRIVASHKA_Option);
                OTKRIVASHKA_ReadyCheck();
            } //не выбран шаблон
        }

        /*****Код видео*****/
        document.getElementById("OTKRIVASHKA_FunctionSelect_id").oninput = function(){
            if(document.getElementById("OTKRIVASHKA_FunctionSelect_id").value == '?SUPERUSER-FUN-VIDEO'){
                document.getElementById("OTKRIVASHKA_VideoCode_id").hidden = false;
            }else{
                document.getElementById("OTKRIVASHKA_VideoCode_id").hidden = true;
            }
        }

        /*****Поиск товаров по кодам*****/
        let OTKRIVASHKA_GoodCodeFound = function (){
            OTKRIVASHKA_Kalculate = 0;
            OTKRIVASHKA_Paragraph = document.getElementById("target_cont");
            OTKRIVASHKA_ElementNum = OTKRIVASHKA_Paragraph.getElementsByTagName("*").length;/*количество элементов тега fieldset переборка*/
            OTKRIVASHKA_innerText = document.getElementById("OTKRIVASHKA_GoodCode_id").value.replace(/\D+/g, "~");
            OTKRIVASHKA_innerArray = OTKRIVASHKA_innerText.split("~");//убирем все символы кроме чисел, пакуем в массив
            for(OTKRIVASHKA_CicleNum = 0; OTKRIVASHKA_CicleNum < OTKRIVASHKA_ElementNum; OTKRIVASHKA_CicleNum++){
                //ищем совпадения для каждого элемента из массива
                if(OTKRIVASHKA_innerArray.some(ArrayCheck => (OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum].textContent.split(",")[0].replace(/\D+/g, "") == ArrayCheck && ArrayCheck != "") == true)){
                    if(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum].target == "blank"){
                        console.log(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum].textContent.replace(/\u00A0+/g, " ")); //в консоль на всякий
                        OTKRIVASHKA_Kalculate = OTKRIVASHKA_Kalculate + 1;
                    }
                }
            }
            if(OTKRIVASHKA_Kalculate > 0){
                OTKRIVASHKA_TrueOrFalse1 = true;
                console.log("Найдено " + OTKRIVASHKA_Kalculate + " кодов из " + OTKRIVASHKA_innerArray.length + " (список кодов " + OTKRIVASHKA_innerArray + ").");
                document.getElementById("OTKRIVASHKA_outText_id").value = OTKRIVASHKA_Kalculate;
                OTKRIVASHKA_Kalculate = 0;
            } //нашло и вывело макс количество
            else{
                OTKRIVASHKA_TrueOrFalse1 = false;
                console.log("В данной выборке введенных кодов не найдено"); //в консоль на всякий
                OTKRIVASHKA_Kalculate = 0;
            } // не нашло
        }
        /*****Поиск товаров по имени*****/
        let OTKRIVASHKA_GoodFound = function (){
            OTKRIVASHKA_Kalculate = 0;
            OTKRIVASHKA_Paragraph = document.getElementById("target_cont");
            OTKRIVASHKA_ElementNum = OTKRIVASHKA_Paragraph.getElementsByTagName("*").length;/*количество элементов тега fieldset переборка*/
            OTKRIVASHKA_innerText = document.getElementById("OTKRIVASHKA_GoodText_id").value;
            for(OTKRIVASHKA_CicleNum = 0; OTKRIVASHKA_CicleNum < OTKRIVASHKA_ElementNum; OTKRIVASHKA_CicleNum++){
                //поиск с учетом регистра, юникоды игнорим
                if(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum].textContent.replace(/\u00A0+/g, " ").indexOf(OTKRIVASHKA_innerText) > -1){
                    if(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum].target == "blank"){
                        OTKRIVASHKA_Kalculate = OTKRIVASHKA_Kalculate + 1;
                    }
                }
            }
            if(OTKRIVASHKA_Kalculate > 0){
                OTKRIVASHKA_TrueOrFalse1 = true;
                document.getElementById("OTKRIVASHKA_outText_id").value = OTKRIVASHKA_Kalculate;
                OTKRIVASHKA_Kalculate = 0;
            } //нашло - выводим максимум
            else{
                OTKRIVASHKA_TrueOrFalse1 = false;
                OTKRIVASHKA_Kalculate = 0;
            } // не нашло "ПУСТО"
        }
        /*****Общая валидация*****///Если во всех чеках true  дает добро на старт
        let OTKRIVASHKA_ReadyCheck = function (){
            if(document.getElementById("OTKRIVASHKA_radioOpen_id").checked == true || document.getElementById("OTKRIVASHKA_radioOpenByCode_id").checked == true){
                if(OTKRIVASHKA_TrueOrFalse1 == true){
                    document.getElementById("OTKRIVASHKA_clear1_id").hidden = true;
                    document.getElementById("OTKRIVASHKA_clear2_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_submit_id").hidden = false;
                }
                else{
                    document.getElementById("OTKRIVASHKA_clear1_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_clear2_id").hidden = true;
                    document.getElementById("OTKRIVASHKA_submit_id").hidden = true;
                }
            }
            if(document.getElementById("OTKRIVASHKA_radioReplace_id").checked == true || document.getElementById("OTKRIVASHKA_radioReplaceByCode_id").checked == true){
                if(OTKRIVASHKA_TrueOrFalse1 == true && document.getElementById("OTKRIVASHKA_ManSelect_id").options[document.getElementById("OTKRIVASHKA_ManSelect_id").selectedIndex].value != ""){
                    document.getElementById("OTKRIVASHKA_clear1_id").hidden = true;
                    document.getElementById("OTKRIVASHKA_clear2_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_submit_id").hidden = false;
                }
                else{
                    document.getElementById("OTKRIVASHKA_clear1_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_clear2_id").hidden = true;
                    document.getElementById("OTKRIVASHKA_submit_id").hidden = true;
                }
            }
            if(document.getElementById("OTKRIVASHKA_radioTemplate_id").checked == true || document.getElementById("OTKRIVASHKA_radioTemplateByCode_id").checked == true){
                if(OTKRIVASHKA_TrueOrFalse1 == true && document.getElementById("OTKRIVASHKA_TemplateSelect_id").options[document.getElementById("OTKRIVASHKA_TemplateSelect_id").selectedIndex].value != ""){
                    document.getElementById("OTKRIVASHKA_clear1_id").hidden = true;
                    document.getElementById("OTKRIVASHKA_clear2_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_submit_id").hidden = false;
                }
                else{
                    document.getElementById("OTKRIVASHKA_clear1_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_clear2_id").hidden = true;
                    document.getElementById("OTKRIVASHKA_submit_id").hidden = true;
                }
            }
            if(document.getElementById("OTKRIVASHKA_radioText_id").checked == true || document.getElementById("OTKRIVASHKA_radioTextByCode_id").checked == true){
                if(OTKRIVASHKA_TrueOrFalse1 == true){
                    if(document.getElementById("OTKRIVASHKA_clearGD_id").checked || document.getElementById("OTKRIVASHKA_clearCDD_id").checked || document.getElementById("OTKRIVASHKA_TextInput_id").value != '' || document.getElementById("OTKRIVASHKA_TextDelete_id").value != '' || document.getElementById("OTKRIVASHKA_TextGDelete_id").value != ''){
                        document.getElementById("OTKRIVASHKA_clear1_id").hidden = true;
                        document.getElementById("OTKRIVASHKA_clear2_id").hidden = false;
                        document.getElementById("OTKRIVASHKA_submit_id").hidden = false;
                    }else{
                        document.getElementById("OTKRIVASHKA_clear1_id").hidden = false;
                        document.getElementById("OTKRIVASHKA_clear2_id").hidden = true;
                        document.getElementById("OTKRIVASHKA_submit_id").hidden = true;
                    }
                }
                else{
                    document.getElementById("OTKRIVASHKA_clear1_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_clear2_id").hidden = true;
                    document.getElementById("OTKRIVASHKA_submit_id").hidden = true;
                }
            }
            if(document.getElementById("OTKRIVASHKA_radioClone_id").checked == true || document.getElementById("OTKRIVASHKA_radioCloneByCode_id").checked == true){
                if(OTKRIVASHKA_TrueOrFalse1 == true && document.getElementById("OTKRIVASHKA_TemplateSelect_id").options[document.getElementById("OTKRIVASHKA_TemplateSelect_id").selectedIndex].value != ""){
                    document.getElementById("OTKRIVASHKA_clear1_id").hidden = true;
                    document.getElementById("OTKRIVASHKA_clear2_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_submit_id").hidden = false;
                }
                else{
                    document.getElementById("OTKRIVASHKA_clear1_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_clear2_id").hidden = true;
                    document.getElementById("OTKRIVASHKA_submit_id").hidden = true;
                }
            }
            if(document.getElementById("OTKRIVASHKA_radioBack_id").checked == true || document.getElementById("OTKRIVASHKA_radioBackByCode_id").checked == true){
                if(OTKRIVASHKA_TrueOrFalse1 == true){
                    document.getElementById("OTKRIVASHKA_clear1_id").hidden = true;
                    document.getElementById("OTKRIVASHKA_clear2_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_submit_id").hidden = false;
                }
                else{
                    document.getElementById("OTKRIVASHKA_clear1_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_clear2_id").hidden = true;
                    document.getElementById("OTKRIVASHKA_submit_id").hidden = true;
                }
            }
            if(document.getElementById("OTKRIVASHKA_radioEdit_id").checked == true || document.getElementById("OTKRIVASHKA_radioEditByCode_id").checked == true){
                if(OTKRIVASHKA_TrueOrFalse1 == true && document.getElementById("OTKRIVASHKA_Case_1_id").checked && Cases != ''){
                    document.getElementById("OTKRIVASHKA_clear1_id").hidden = true;
                    document.getElementById("OTKRIVASHKA_clear2_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_submit_id").hidden = false;
                }
                else{
                    document.getElementById("OTKRIVASHKA_clear1_id").hidden = false;
                    document.getElementById("OTKRIVASHKA_clear2_id").hidden = true;
                    document.getElementById("OTKRIVASHKA_submit_id").hidden = true;
                }
            }
        }
        /*****Запуск функций*****/
        let OTKRIVASKA_START = document.getElementById("OTKRIVASHKA_submit_id").onclick = function (){
            if(document.getElementById("OTKRIVASHKA_radioReplace_id").checked == true && OTKRIVASHKA_TrueOrFalse1 == true && document.getElementById("OTKRIVASHKA_ManSelect_id").options[document.getElementById("OTKRIVASHKA_ManSelect_id").selectedIndex].value != ""){
                OTKRIVASHKA_DO_REPLACE();
            }
            if(document.getElementById("OTKRIVASHKA_radioOpen_id").checked == true && OTKRIVASHKA_TrueOrFalse1 == true){
                OTKRIVASHKA_DO_OPEN()
            }
            if(document.getElementById("OTKRIVASHKA_radioText_id").checked == true && OTKRIVASHKA_TrueOrFalse1 == true){
                if(document.getElementById("OTKRIVASHKA_clearGD_id").checked || document.getElementById("OTKRIVASHKA_clearCDD_id").checked || document.getElementById("OTKRIVASHKA_TextInput_id").value != '' || document.getElementById("OTKRIVASHKA_TextDelete_id").value != '' || document.getElementById("OTKRIVASHKA_TextGDelete_id").value != ''){
                    OTKRIVASHKA_DO_TEXT()
                }
            }
            if(document.getElementById("OTKRIVASHKA_radioTextByCode_id").checked == true && OTKRIVASHKA_TrueOrFalse1 == true){
                if(document.getElementById("OTKRIVASHKA_clearGD_id").checked || document.getElementById("OTKRIVASHKA_clearCDD_id").checked || document.getElementById("OTKRIVASHKA_TextInput_id").value != '' || document.getElementById("OTKRIVASHKA_TextDelete_id").value != '' || document.getElementById("OTKRIVASHKA_TextGDelete_id").value != ''){
                    OTKRIVASHKA_DO_TEXT_BYCODE()
                }
            }
            if(document.getElementById("OTKRIVASHKA_radioReplaceByCode_id").checked == true && OTKRIVASHKA_TrueOrFalse1 == true && document.getElementById("OTKRIVASHKA_ManSelect_id").options[document.getElementById("OTKRIVASHKA_ManSelect_id").selectedIndex].value != ""){
                OTKRIVASHKA_DO_REPLACE_BYCODE();
            }
            if(document.getElementById("OTKRIVASHKA_radioOpenByCode_id").checked == true && OTKRIVASHKA_TrueOrFalse1 == true){
                OTKRIVASHKA_DO_OPEN_BYCODE()
            }
            if(document.getElementById("OTKRIVASHKA_radioTemplate_id").checked == true && OTKRIVASHKA_TrueOrFalse1 == true && document.getElementById("OTKRIVASHKA_TemplateSelect_id").options[document.getElementById("OTKRIVASHKA_TemplateSelect_id").selectedIndex].value != ""){
                OTKRIVASHKA_DO_TEMPLATE()//
            }
            if(document.getElementById("OTKRIVASHKA_radioTemplateByCode_id").checked == true && OTKRIVASHKA_TrueOrFalse1 == true && document.getElementById("OTKRIVASHKA_TemplateSelect_id").options[document.getElementById("OTKRIVASHKA_TemplateSelect_id").selectedIndex].value != ""){
                OTKRIVASHKA_DO_TEMPLATE_BYCODE()//
            }
            if(document.getElementById("OTKRIVASHKA_radioClone_id").checked == true && OTKRIVASHKA_TrueOrFalse1 == true && document.getElementById("OTKRIVASHKA_TemplateSelect_id").options[document.getElementById("OTKRIVASHKA_TemplateSelect_id").selectedIndex].value != ""){
                OTKRIVASHKA_DO_CLONE()//
            }
            if(document.getElementById("OTKRIVASHKA_radioCloneByCode_id").checked == true && OTKRIVASHKA_TrueOrFalse1 == true && document.getElementById("OTKRIVASHKA_TemplateSelect_id").options[document.getElementById("OTKRIVASHKA_TemplateSelect_id").selectedIndex].value != ""){
                OTKRIVASHKA_DO_CLONE_BYCODE()//
            }
            if(document.getElementById("OTKRIVASHKA_radioBack_id").checked == true && OTKRIVASHKA_TrueOrFalse1 == true){
                OTKRIVASHKA_DO_BACK()
            }
            if(document.getElementById("OTKRIVASHKA_radioBackByCode_id").checked == true && OTKRIVASHKA_TrueOrFalse1 == true){
                OTKRIVASHKA_DO_BACK_BYCODE()
            }
            if(document.getElementById("OTKRIVASHKA_radioEdit_id").checked == true && OTKRIVASHKA_TrueOrFalse1 == true && document.getElementById("OTKRIVASHKA_Case_1_id").checked && Cases != ''){
                OTKRIVASHKA_DO_EDIT()
            }
            if(document.getElementById("OTKRIVASHKA_radioEditByCode_id").checked == true && OTKRIVASHKA_TrueOrFalse1 == true && document.getElementById("OTKRIVASHKA_Case_1_id").checked && Cases != ''){
                OTKRIVASHKA_DO_EDIT_BYCODE()
            }
        }
        /*****Распределяем*****///все как в открывашке
        let OTKRIVASHKA_DO_REPLACE = function (){
            OTKRIVASHKA_Kalculate = 0;
            OTKRIVASHKA_KalculateFrom = 0;
            if(document.getElementById("OTKRIVASHKA_fromText_id").value != ""){
                OTKRIVASHKA_KalculateFrom = document.getElementById("OTKRIVASHKA_fromText_id").value;
            }
            OTKRIVASHKA_Paragraph = document.getElementById("target_cont");
            OTKRIVASHKA_ElementNum = OTKRIVASHKA_Paragraph.getElementsByTagName("*").length;/*количество элементов тега fieldset переборка*/
            OTKRIVASHKA_innerText = document.getElementById("OTKRIVASHKA_GoodText_id").value;
            for(OTKRIVASHKA_CicleNum = 0; OTKRIVASHKA_CicleNum < OTKRIVASHKA_ElementNum; OTKRIVASHKA_CicleNum++){
                if(document.getElementById("OTKRIVASHKA_outText_id").value != "" && parseInt(document.getElementById("OTKRIVASHKA_outText_id").value) < parseInt(document.getElementById("OTKRIVASHKA_fromText_id").value) || document.getElementById("OTKRIVASHKA_outText_id").value == document.getElementById("OTKRIVASHKA_fromText_id").value){
                    break;
                }
                if(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum].textContent.replace(/\u00A0+/g, " ").indexOf(OTKRIVASHKA_innerText) > -1){
                    if(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum].target == "blank"){
                        if(OTKRIVASHKA_KalculateFrom > 0){
                            OTKRIVASHKA_Kalculate = OTKRIVASHKA_Kalculate + 1;
                            OTKRIVASHKA_KalculateFrom = OTKRIVASHKA_KalculateFrom - 1;
                        }
                        else{
                            OTKRIVASHKA_Kalculate = OTKRIVASHKA_Kalculate + 1;
                            //id манагера + id товара // потом падо попробовать в ajax
                            window.open(document.getElementById("OTKRIVASHKA_ManSelect_id").options[document.getElementById("OTKRIVASHKA_ManSelect_id").selectedIndex].value + OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum + 2].title);
                            if(OTKRIVASHKA_Kalculate == document.getElementById("OTKRIVASHKA_outText_id").value){
                                break;
                            }
                        }
                    }
                }
            }
        }
        /*****Распределить по кодам*****///те же стандарты
        let OTKRIVASHKA_DO_REPLACE_BYCODE = function (){
            OTKRIVASHKA_Kalculate = 0;
            OTKRIVASHKA_KalculateFrom = 0;
            if(document.getElementById("OTKRIVASHKA_fromText_id").value != ""){
                OTKRIVASHKA_KalculateFrom = document.getElementById("OTKRIVASHKA_fromText_id").value;
            }
            OTKRIVASHKA_Paragraph = document.getElementById("target_cont");
            OTKRIVASHKA_ElementNum = OTKRIVASHKA_Paragraph.getElementsByTagName("*").length;/*количество элементов тега fieldset переборка*/
            OTKRIVASHKA_innerText = document.getElementById("OTKRIVASHKA_GoodCode_id").value.replace(/\D+/g, "~");
            OTKRIVASHKA_innerArray = OTKRIVASHKA_innerText.split("~");
            for(OTKRIVASHKA_CicleNum = 0; OTKRIVASHKA_CicleNum < OTKRIVASHKA_ElementNum; OTKRIVASHKA_CicleNum++){
                if(document.getElementById("OTKRIVASHKA_outText_id").value != "" && parseInt(document.getElementById("OTKRIVASHKA_outText_id").value) < parseInt(document.getElementById("OTKRIVASHKA_fromText_id").value) || document.getElementById("OTKRIVASHKA_outText_id").value == document.getElementById("OTKRIVASHKA_fromText_id").value){
                    break;
                }
                if(OTKRIVASHKA_innerArray.some(ArrayCheck => (OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum].textContent.split(",")[0].replace(/\D+/g, "") == ArrayCheck && ArrayCheck != "") == true)){
                    if(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum].target == "blank"){
                        if(OTKRIVASHKA_KalculateFrom > 0){
                            OTKRIVASHKA_Kalculate = OTKRIVASHKA_Kalculate + 1;
                            OTKRIVASHKA_KalculateFrom = OTKRIVASHKA_KalculateFrom - 1;
                        }
                        else{
                            OTKRIVASHKA_Kalculate = OTKRIVASHKA_Kalculate + 1;
                            window.open(document.getElementById("OTKRIVASHKA_ManSelect_id").options[document.getElementById("OTKRIVASHKA_ManSelect_id").selectedIndex].value + OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum + 2].title);
                            if(OTKRIVASHKA_Kalculate == document.getElementById("OTKRIVASHKA_outText_id").value){
                                break;
                            }
                        }
                    }
                }
            }
        }
        /*****Вернуть*****/
        let OTKRIVASHKA_DO_BACK = function (){
            OTKRIVASHKA_Kalculate = 0;
            OTKRIVASHKA_KalculateFrom = 0;
            if(document.getElementById("OTKRIVASHKA_fromText_id").value != ""){
                OTKRIVASHKA_KalculateFrom = document.getElementById("OTKRIVASHKA_fromText_id").value;
            }
            OTKRIVASHKA_Paragraph = document.getElementById("target_cont");
            OTKRIVASHKA_ElementNum = OTKRIVASHKA_Paragraph.getElementsByTagName("*").length;/*количество элементов тега fieldset переборка*/
            OTKRIVASHKA_innerText = document.getElementById("OTKRIVASHKA_GoodText_id").value;
            for(OTKRIVASHKA_CicleNum = 0; OTKRIVASHKA_CicleNum < OTKRIVASHKA_ElementNum; OTKRIVASHKA_CicleNum++){
                if(document.getElementById("OTKRIVASHKA_outText_id").value != "" && parseInt(document.getElementById("OTKRIVASHKA_outText_id").value) < parseInt(document.getElementById("OTKRIVASHKA_fromText_id").value) || document.getElementById("OTKRIVASHKA_outText_id").value == document.getElementById("OTKRIVASHKA_fromText_id").value){
                    break; //брекаем при конфликте от-до
                }
                if(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum].textContent.replace(/\u00A0+/g, " ").indexOf(OTKRIVASHKA_innerText) > -1){
                    if(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum].target == "blank"){
                        if(OTKRIVASHKA_KalculateFrom > 0){
                            OTKRIVASHKA_Kalculate = OTKRIVASHKA_Kalculate + 1;
                            OTKRIVASHKA_KalculateFrom = OTKRIVASHKA_KalculateFrom - 1; //пока от !=0 не стартуем открытие ссылок
                        }
                        else{
                            OTKRIVASHKA_Kalculate = OTKRIVASHKA_Kalculate + 1;
                            window.open(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum + 5].href);
                            if(OTKRIVASHKA_Kalculate == document.getElementById("OTKRIVASHKA_outText_id").value){
                                break; //открываем до счетчик = до
                            }
                        }
                    }
                }
            }
        }
        /*****Вернуть по кодам*****///те же стандарты
        let OTKRIVASHKA_DO_BACK_BYCODE = function (){
            OTKRIVASHKA_Kalculate = 0;
            OTKRIVASHKA_KalculateFrom = 0;
            if(document.getElementById("OTKRIVASHKA_fromText_id").value != ""){
                OTKRIVASHKA_KalculateFrom = document.getElementById("OTKRIVASHKA_fromText_id").value;
            }
            OTKRIVASHKA_Paragraph = document.getElementById("target_cont");
            OTKRIVASHKA_ElementNum = OTKRIVASHKA_Paragraph.getElementsByTagName("*").length;/*количество элементов тега fieldset переборка*/
            OTKRIVASHKA_innerText = document.getElementById("OTKRIVASHKA_GoodCode_id").value.replace(/\D+/g, "~");
            OTKRIVASHKA_innerArray = OTKRIVASHKA_innerText.split("~");
            for(OTKRIVASHKA_CicleNum = 0; OTKRIVASHKA_CicleNum < OTKRIVASHKA_ElementNum; OTKRIVASHKA_CicleNum++){
                if(document.getElementById("OTKRIVASHKA_outText_id").value != "" && parseInt(document.getElementById("OTKRIVASHKA_outText_id").value) < parseInt(document.getElementById("OTKRIVASHKA_fromText_id").value) || document.getElementById("OTKRIVASHKA_outText_id").value == document.getElementById("OTKRIVASHKA_fromText_id").value){
                    break;
                }
                if(OTKRIVASHKA_innerArray.some(ArrayCheck => (OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum].textContent.split(",")[0].replace(/\D+/g, "") == ArrayCheck && ArrayCheck != "") == true)){
                    if(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum].target == "blank"){
                        if(OTKRIVASHKA_KalculateFrom > 0){
                            OTKRIVASHKA_Kalculate = OTKRIVASHKA_Kalculate + 1;
                            OTKRIVASHKA_KalculateFrom = OTKRIVASHKA_KalculateFrom - 1;
                        }
                        else{
                            OTKRIVASHKA_Kalculate = OTKRIVASHKA_Kalculate + 1;
                            window.open(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum + 5].href);
                            if(OTKRIVASHKA_Kalculate == document.getElementById("OTKRIVASHKA_outText_id").value){
                                break;
                            }
                        }
                    }
                }
            }
        }
        /*****Перешаблонка*****///те же стандарты
        let sleep = function (ms) {
            document.getElementsByTagName('title')[0].innerHTML = ((OTKRIVASHKA_Kalculate - OTKRIVASHKA_KalculateFrom) * 100 / document.getElementById("OTKRIVASHKA_outText_id").value).toFixed(0) + '%';
            if(document.getElementsByTagName('title')[0].innerHTML == '100%'){
                document.getElementsByTagName('title')[0].innerHTML = 'Goods';
            }
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        let OTKRIVASHKA_DO_TEMPLATE = async function (){
            OTKRIVASHKA_Kalculate = 0;
            OTKRIVASHKA_KalculateFrom = 0;
            OTKRIVASHKA_CicleNum = 0;
            if(document.getElementById("OTKRIVASHKA_fromText_id").value != ""){
                OTKRIVASHKA_KalculateFrom = document.getElementById("OTKRIVASHKA_fromText_id").value;
            }
            OTKRIVASHKA_Paragraph = document.getElementById("target_cont");
            OTKRIVASHKA_ElementNum = OTKRIVASHKA_Paragraph.getElementsByTagName("*").length;/*количество элементов тега fieldset переборка*/
            OTKRIVASHKA_innerText = document.getElementById("OTKRIVASHKA_GoodText_id").value;
            for(OTKRIVASHKA_CicleNum ; OTKRIVASHKA_CicleNum < OTKRIVASHKA_ElementNum; OTKRIVASHKA_CicleNum++){
                if(document.getElementById("OTKRIVASHKA_outText_id").value != "" && parseInt(document.getElementById("OTKRIVASHKA_outText_id").value) < parseInt(document.getElementById("OTKRIVASHKA_fromText_id").value) || document.getElementById("OTKRIVASHKA_outText_id").value == document.getElementById("OTKRIVASHKA_fromText_id").value){
                    break;
                }
                if(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum].textContent.replace(/\u00A0+/g, " ").indexOf(OTKRIVASHKA_innerText) > -1){
                    if(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum].target == "blank"){
                        if(OTKRIVASHKA_KalculateFrom > 0){
                            OTKRIVASHKA_Kalculate = OTKRIVASHKA_Kalculate + 1;
                            OTKRIVASHKA_KalculateFrom = OTKRIVASHKA_KalculateFrom - 1;
                        }
                        else{
                            OTKRIVASHKA_Kalculate = OTKRIVASHKA_Kalculate + 1;
                            //ссылка на редактирование + /?SUPERUSER-TEMPLATE-EASY-"typeId"_"templateId" - это команда для обычной перешаблонки
                            window.open(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum + 3].href + "?SUPERUSER-TEMPLATE-EASY-" + document.getElementById("OTKRIVASHKA_TypeSelect_id").options[document.getElementById("OTKRIVASHKA_TypeSelect_id").selectedIndex].value + "_" + document.getElementById("OTKRIVASHKA_TemplateSelect_id").options[document.getElementById("OTKRIVASHKA_TemplateSelect_id").selectedIndex].value);
                            await sleep(1100);
                            if(OTKRIVASHKA_Kalculate == document.getElementById("OTKRIVASHKA_outText_id").value){
                                break;
                            }
                        }
                    }
                }
            }
        }
        /*****Перешаблонка по кодам*****///те же стандарты
        let OTKRIVASHKA_DO_TEMPLATE_BYCODE = async function (){
            OTKRIVASHKA_Kalculate = 0;
            OTKRIVASHKA_KalculateFrom = 0;
            if(document.getElementById("OTKRIVASHKA_fromText_id").value != ""){
                OTKRIVASHKA_KalculateFrom = document.getElementById("OTKRIVASHKA_fromText_id").value;
            }
            OTKRIVASHKA_Paragraph = document.getElementById("target_cont");
            OTKRIVASHKA_ElementNum = OTKRIVASHKA_Paragraph.getElementsByTagName("*").length;/*количество элементов тега fieldset переборка*/
            OTKRIVASHKA_innerText = document.getElementById("OTKRIVASHKA_GoodCode_id").value.replace(/\D+/g, "~");
            OTKRIVASHKA_innerArray = OTKRIVASHKA_innerText.split("~");
            for(OTKRIVASHKA_CicleNum = 0; OTKRIVASHKA_CicleNum < OTKRIVASHKA_ElementNum; OTKRIVASHKA_CicleNum++){
                if(document.getElementById("OTKRIVASHKA_outText_id").value != "" && parseInt(document.getElementById("OTKRIVASHKA_outText_id").value) < parseInt(document.getElementById("OTKRIVASHKA_fromText_id").value) || document.getElementById("OTKRIVASHKA_outText_id").value == document.getElementById("OTKRIVASHKA_fromText_id").value){
                    break;
                }
                if(OTKRIVASHKA_innerArray.some(ArrayCheck => (OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum].textContent.split(",")[0].replace(/\D+/g, "") == ArrayCheck && ArrayCheck != "") == true)){
                    if(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum].target == "blank"){
                        if(OTKRIVASHKA_KalculateFrom > 0){
                            OTKRIVASHKA_Kalculate = OTKRIVASHKA_Kalculate + 1;
                            OTKRIVASHKA_KalculateFrom = OTKRIVASHKA_KalculateFrom - 1;
                        }
                        else{
                            OTKRIVASHKA_Kalculate = OTKRIVASHKA_Kalculate + 1;
                            //ссылка на редактирование + /?SUPERUSER-TEMPLATE-EASY-"typeId"_"templateId" - это команда для обычной перешаблонки
                            window.open(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum + 3].href + "?SUPERUSER-TEMPLATE-EASY-" + document.getElementById("OTKRIVASHKA_TypeSelect_id").options[document.getElementById("OTKRIVASHKA_TypeSelect_id").selectedIndex].value + "_" + document.getElementById("OTKRIVASHKA_TemplateSelect_id").options[document.getElementById("OTKRIVASHKA_TemplateSelect_id").selectedIndex].value);
                            await sleep(1100);
                            if(OTKRIVASHKA_Kalculate == document.getElementById("OTKRIVASHKA_outText_id").value){
                                break;
                            }
                        }
                    }
                }
            }
        }
        /*****Текстовая правка*****/
        let OTKRIVASHKA_DO_TEXT = async function (){
            OTKRIVASHKA_Kalculate = 0;
            OTKRIVASHKA_KalculateFrom = 0;
            OTKRIVASHKA_CicleNum = 0;
            if(document.getElementById("OTKRIVASHKA_fromText_id").value != ""){
                OTKRIVASHKA_KalculateFrom = document.getElementById("OTKRIVASHKA_fromText_id").value;
            }
            OTKRIVASHKA_Paragraph = document.getElementById("target_cont");
            OTKRIVASHKA_ElementNum = OTKRIVASHKA_Paragraph.getElementsByTagName("*").length;/*количество элементов тега fieldset переборка*/
            OTKRIVASHKA_innerText = document.getElementById("OTKRIVASHKA_GoodText_id").value;
            for(OTKRIVASHKA_CicleNum ; OTKRIVASHKA_CicleNum < OTKRIVASHKA_ElementNum; OTKRIVASHKA_CicleNum++){
                if(document.getElementById("OTKRIVASHKA_outText_id").value != "" && parseInt(document.getElementById("OTKRIVASHKA_outText_id").value) < parseInt(document.getElementById("OTKRIVASHKA_fromText_id").value) || document.getElementById("OTKRIVASHKA_outText_id").value == document.getElementById("OTKRIVASHKA_fromText_id").value){
                    break;
                }
                if(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum].textContent.replace(/\u00A0+/g, " ").indexOf(OTKRIVASHKA_innerText) > -1){
                    if(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum].target == "blank"){
                        if(OTKRIVASHKA_KalculateFrom > 0){
                            OTKRIVASHKA_Kalculate = OTKRIVASHKA_Kalculate + 1;
                            OTKRIVASHKA_KalculateFrom = OTKRIVASHKA_KalculateFrom - 1;
                        }
                        else{
                            OTKRIVASHKA_Kalculate = OTKRIVASHKA_Kalculate + 1;
                            //ссылка на редактирование + /?SUPERUSER-TEMPLATE-EASY-"typeId"_"templateId" - это команда для обычной перешаблонки
                            window.open(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum + 3].href + "?SUPERUSER-FIX-TEXT-INPUTotkrivashka-" + encodeURI(document.getElementById("OTKRIVASHKA_TextInput_id").value) + "-DELETEotkrivashka-" + encodeURI(document.getElementById("OTKRIVASHKA_TextDelete_id").value + "-CDDclear-" + document.getElementById("OTKRIVASHKA_clearCDD_id").checked + "-GDclear-" + document.getElementById("OTKRIVASHKA_clearGD_id").checked + "-DELETEotkrivashkaGroup-" + document.getElementById("OTKRIVASHKA_TextGDelete_id").value));
                            await sleep(1100);
                            if(OTKRIVASHKA_Kalculate == document.getElementById("OTKRIVASHKA_outText_id").value){
                                break;
                            }
                        }
                    }
                }
            }
        }
        /*****Текстовая правка по коду*****/
        let OTKRIVASHKA_DO_TEXT_BYCODE = async function (){
            OTKRIVASHKA_Kalculate = 0;
            OTKRIVASHKA_KalculateFrom = 0;
            if(document.getElementById("OTKRIVASHKA_fromText_id").value != ""){
                OTKRIVASHKA_KalculateFrom = document.getElementById("OTKRIVASHKA_fromText_id").value;
            }
            OTKRIVASHKA_Paragraph = document.getElementById("target_cont");
            OTKRIVASHKA_ElementNum = OTKRIVASHKA_Paragraph.getElementsByTagName("*").length;/*количество элементов тега fieldset переборка*/
            OTKRIVASHKA_innerText = document.getElementById("OTKRIVASHKA_GoodCode_id").value.replace(/\D+/g, "~");
            OTKRIVASHKA_innerArray = OTKRIVASHKA_innerText.split("~");
            for(OTKRIVASHKA_CicleNum = 0; OTKRIVASHKA_CicleNum < OTKRIVASHKA_ElementNum; OTKRIVASHKA_CicleNum++){
                if(document.getElementById("OTKRIVASHKA_outText_id").value != "" && parseInt(document.getElementById("OTKRIVASHKA_outText_id").value) < parseInt(document.getElementById("OTKRIVASHKA_fromText_id").value) || document.getElementById("OTKRIVASHKA_outText_id").value == document.getElementById("OTKRIVASHKA_fromText_id").value){
                    break;
                }
                if(OTKRIVASHKA_innerArray.some(ArrayCheck => (OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum].textContent.split(",")[0].replace(/\D+/g, "") == ArrayCheck && ArrayCheck != "") == true)){
                    if(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum].target == "blank"){
                        if(OTKRIVASHKA_KalculateFrom > 0){
                            OTKRIVASHKA_Kalculate = OTKRIVASHKA_Kalculate + 1;
                            OTKRIVASHKA_KalculateFrom = OTKRIVASHKA_KalculateFrom - 1;
                        }
                        else{
                            OTKRIVASHKA_Kalculate = OTKRIVASHKA_Kalculate + 1;
                            //ссылка на редактирование + /?SUPERUSER-TEMPLATE-EASY-"typeId"_"templateId" - это команда для обычной перешаблонки
                            window.open(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum + 3].href + "?SUPERUSER-FIX-TEXT-INPUTotkrivashka-" + encodeURI(document.getElementById("OTKRIVASHKA_TextInput_id").value) + "-DELETEotkrivashka-" + encodeURI(document.getElementById("OTKRIVASHKA_TextDelete_id").value + "-CDDclear-" + document.getElementById("OTKRIVASHKA_clearCDD_id").checked + "-GDclear-" + document.getElementById("OTKRIVASHKA_clearGD_id").checked + "-DELETEotkrivashkaGroup-" + document.getElementById("OTKRIVASHKA_TextGDelete_id").value));
                            await sleep(1100);
                            if(OTKRIVASHKA_Kalculate == document.getElementById("OTKRIVASHKA_outText_id").value){
                                break;
                            }
                        }
                    }
                }
            }
        }
        /*****Открывашка*****/
        let OTKRIVASHKA_DO_OPEN = async function (){
            OTKRIVASHKA_Kalculate = 0;
            OTKRIVASHKA_KalculateFrom = 0;
            if(document.getElementById("OTKRIVASHKA_fromText_id").value != ""){
                OTKRIVASHKA_KalculateFrom = document.getElementById("OTKRIVASHKA_fromText_id").value;
            }
            OTKRIVASHKA_Paragraph = document.getElementById("target_cont");
            OTKRIVASHKA_ElementNum = OTKRIVASHKA_Paragraph.getElementsByTagName("*").length;/*количество элементов тега fieldset переборка*/
            OTKRIVASHKA_innerText = document.getElementById("OTKRIVASHKA_GoodText_id").value;
            for(OTKRIVASHKA_CicleNum = 0; OTKRIVASHKA_CicleNum < OTKRIVASHKA_ElementNum; OTKRIVASHKA_CicleNum++){
                if(document.getElementById("OTKRIVASHKA_outText_id").value != "" && parseInt(document.getElementById("OTKRIVASHKA_outText_id").value) < parseInt(document.getElementById("OTKRIVASHKA_fromText_id").value) || document.getElementById("OTKRIVASHKA_outText_id").value == document.getElementById("OTKRIVASHKA_fromText_id").value){
                    break; //брекаем при конфликте от-до
                }
                if(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum].textContent.replace(/\u00A0+/g, " ").indexOf(OTKRIVASHKA_innerText) > -1){
                    if(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum].target == "blank"){
                        if(OTKRIVASHKA_KalculateFrom > 0){
                            OTKRIVASHKA_Kalculate = OTKRIVASHKA_Kalculate + 1;
                            OTKRIVASHKA_KalculateFrom = OTKRIVASHKA_KalculateFrom - 1; //пока от !=0 не стартуем открытие ссылок
                        }
                        else{
                            OTKRIVASHKA_Kalculate = OTKRIVASHKA_Kalculate + 1;
                            if(document.getElementById('OTKRIVASHKA_FunctionSelect_id').value != '?SUPERUSER-FUN-VIDEO' && document.getElementById('OTKRIVASHKA_FunctionSelect_id').value != 'galery'){
                                window.open(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum + 3].href + document.getElementById('OTKRIVASHKA_FunctionSelect_id').value);
                                await sleep(1100);
                            }else{
                                if(document.getElementById('OTKRIVASHKA_FunctionSelect_id').value == 'galery'){
                                    window.open(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum + 4].href);
                                    await sleep(1100);
                                }else{
                                    window.open(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum + 4].href + document.getElementById('OTKRIVASHKA_FunctionSelect_id').value + '_' + encodeURI(document.getElementById("OTKRIVASHKA_VideoCode_id").value));
                                    await sleep(1100);
                                }
                            }
                            if(OTKRIVASHKA_Kalculate == document.getElementById("OTKRIVASHKA_outText_id").value){
                                break; //открываем до счетчик = до
                            }
                        }
                    }
                }
            }
        }
        /*****Открыть по кодам*****///те же стандарты
        let OTKRIVASHKA_DO_OPEN_BYCODE = async function (){
            OTKRIVASHKA_Kalculate = 0;
            OTKRIVASHKA_KalculateFrom = 0;
            if(document.getElementById("OTKRIVASHKA_fromText_id").value != ""){
                OTKRIVASHKA_KalculateFrom = document.getElementById("OTKRIVASHKA_fromText_id").value;
            }
            OTKRIVASHKA_Paragraph = document.getElementById("target_cont");
            OTKRIVASHKA_ElementNum = OTKRIVASHKA_Paragraph.getElementsByTagName("*").length;/*количество элементов тега fieldset переборка*/
            OTKRIVASHKA_innerText = document.getElementById("OTKRIVASHKA_GoodCode_id").value.replace(/\D+/g, "~");
            OTKRIVASHKA_innerArray = OTKRIVASHKA_innerText.split("~");
            for(OTKRIVASHKA_CicleNum = 0; OTKRIVASHKA_CicleNum < OTKRIVASHKA_ElementNum; OTKRIVASHKA_CicleNum++){
                if(document.getElementById("OTKRIVASHKA_outText_id").value != "" && parseInt(document.getElementById("OTKRIVASHKA_outText_id").value) < parseInt(document.getElementById("OTKRIVASHKA_fromText_id").value) || document.getElementById("OTKRIVASHKA_outText_id").value == document.getElementById("OTKRIVASHKA_fromText_id").value){
                    break;
                }
                if(OTKRIVASHKA_innerArray.some(ArrayCheck => (OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum].textContent.split(",")[0].replace(/\D+/g, "") == ArrayCheck && ArrayCheck != "") == true)){
                    if(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum].target == "blank"){
                        if(OTKRIVASHKA_KalculateFrom > 0){
                            OTKRIVASHKA_Kalculate = OTKRIVASHKA_Kalculate + 1;
                            OTKRIVASHKA_KalculateFrom = OTKRIVASHKA_KalculateFrom - 1;
                        }
                        else{
                            OTKRIVASHKA_Kalculate = OTKRIVASHKA_Kalculate + 1;
                            if(document.getElementById('OTKRIVASHKA_FunctionSelect_id').value != '?SUPERUSER-FUN-VIDEO' && document.getElementById('OTKRIVASHKA_FunctionSelect_id').value != 'galery'){
                                window.open(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum + 3].href + document.getElementById('OTKRIVASHKA_FunctionSelect_id').value);
                                await sleep(1100);
                            }else{
                                if(document.getElementById('OTKRIVASHKA_FunctionSelect_id').value == 'galery'){
                                    window.open(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum + 4].href);
                                    await sleep(1100);
                                }else{
                                    window.open(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum + 4].href + document.getElementById('OTKRIVASHKA_FunctionSelect_id').value + '_' + encodeURI(document.getElementById("OTKRIVASHKA_VideoCode_id").value));
                                    await sleep(1100);
                                }
                            }
                            if(OTKRIVASHKA_Kalculate == document.getElementById("OTKRIVASHKA_outText_id").value){
                                break;
                            }
                        }
                    }
                }
            }
        }
        /*****Правка*****/
        let OTKRIVASHKA_DO_EDIT = async function (){
            OTKRIVASHKA_Kalculate = 0;
            OTKRIVASHKA_KalculateFrom = 0;
            OTKRIVASHKA_CicleNum = 0;
            if(document.getElementById("OTKRIVASHKA_fromText_id").value != ""){
                OTKRIVASHKA_KalculateFrom = document.getElementById("OTKRIVASHKA_fromText_id").value;
            }
            OTKRIVASHKA_Paragraph = document.getElementById("target_cont");
            OTKRIVASHKA_ElementNum = OTKRIVASHKA_Paragraph.getElementsByTagName("*").length;/*количество элементов тега fieldset переборка*/
            OTKRIVASHKA_innerText = document.getElementById("OTKRIVASHKA_GoodText_id").value;
            for(OTKRIVASHKA_CicleNum ; OTKRIVASHKA_CicleNum < OTKRIVASHKA_ElementNum; OTKRIVASHKA_CicleNum++){
                if(document.getElementById("OTKRIVASHKA_outText_id").value != "" && parseInt(document.getElementById("OTKRIVASHKA_outText_id").value) < parseInt(document.getElementById("OTKRIVASHKA_fromText_id").value) || document.getElementById("OTKRIVASHKA_outText_id").value == document.getElementById("OTKRIVASHKA_fromText_id").value){
                    break;
                }
                if(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum].textContent.replace(/\u00A0+/g, " ").indexOf(OTKRIVASHKA_innerText) > -1){
                    if(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum].target == "blank"){
                        if(OTKRIVASHKA_KalculateFrom > 0){
                            OTKRIVASHKA_Kalculate = OTKRIVASHKA_Kalculate + 1;
                            OTKRIVASHKA_KalculateFrom = OTKRIVASHKA_KalculateFrom - 1;
                        }
                        else{
                            OTKRIVASHKA_Kalculate = OTKRIVASHKA_Kalculate + 1;
                            //ссылка на редактирование + /?SUPERUSER-FIX-EDIT-CASE_1_IF-[id:arg/value]-/IF_DEL-...-/DEL_ADD-...-/ADD - это команда для правки с зашитым массивом условий
                            window.open(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum + 3].href + "?SUPERUSER-FIX-EDIT-" + encodeURI(Cases));
                            await sleep(1100);
                            if(OTKRIVASHKA_Kalculate == document.getElementById("OTKRIVASHKA_outText_id").value){
                                break;
                            }
                        }
                    }
                }
            }
        }
        /*****Правка по кодам*****///те же стандарты
        let OTKRIVASHKA_DO_EDIT_BYCODE = async function (){
            OTKRIVASHKA_Kalculate = 0;
            OTKRIVASHKA_KalculateFrom = 0;
            if(document.getElementById("OTKRIVASHKA_fromText_id").value != ""){
                OTKRIVASHKA_KalculateFrom = document.getElementById("OTKRIVASHKA_fromText_id").value;
            }
            OTKRIVASHKA_Paragraph = document.getElementById("target_cont");
            OTKRIVASHKA_ElementNum = OTKRIVASHKA_Paragraph.getElementsByTagName("*").length;/*количество элементов тега fieldset переборка*/
            OTKRIVASHKA_innerText = document.getElementById("OTKRIVASHKA_GoodCode_id").value.replace(/\D+/g, "~");
            OTKRIVASHKA_innerArray = OTKRIVASHKA_innerText.split("~");
            for(OTKRIVASHKA_CicleNum = 0; OTKRIVASHKA_CicleNum < OTKRIVASHKA_ElementNum; OTKRIVASHKA_CicleNum++){
                if(document.getElementById("OTKRIVASHKA_outText_id").value != "" && parseInt(document.getElementById("OTKRIVASHKA_outText_id").value) < parseInt(document.getElementById("OTKRIVASHKA_fromText_id").value) || document.getElementById("OTKRIVASHKA_outText_id").value == document.getElementById("OTKRIVASHKA_fromText_id").value){
                    break;
                }
                if(OTKRIVASHKA_innerArray.some(ArrayCheck => (OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum].textContent.split(",")[0].replace(/\D+/g, "") == ArrayCheck && ArrayCheck != "") == true)){
                    if(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum].target == "blank"){
                        if(OTKRIVASHKA_KalculateFrom > 0){
                            OTKRIVASHKA_Kalculate = OTKRIVASHKA_Kalculate + 1;
                            OTKRIVASHKA_KalculateFrom = OTKRIVASHKA_KalculateFrom - 1;
                        }
                        else{
                            OTKRIVASHKA_Kalculate = OTKRIVASHKA_Kalculate + 1;
                            //ссылка на редактирование + /?SUPERUSER-FIX-EDIT-CASE_1_IF-[id:arg/value]-/IF_DEL-...-/DEL_ADD-...-/ADD - это команда для правки с зашитым массивом условий
                            window.open(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum + 3].href + "?SUPERUSER-FIX-EDIT-" + encodeURI(Cases));
                            await sleep(1100);
                            if(OTKRIVASHKA_Kalculate == document.getElementById("OTKRIVASHKA_outText_id").value){
                                break;
                            }
                        }
                    }
                }
            }
        }
        /*****Клонирование*****/
        let OTKRIVASHKA_DO_CLONE = async function (){
            OTKRIVASHKA_Kalculate = 0;
            OTKRIVASHKA_KalculateFrom = 0;
            OTKRIVASHKA_CicleNum = 0;
            if(document.getElementById("OTKRIVASHKA_fromText_id").value != ""){
                OTKRIVASHKA_KalculateFrom = document.getElementById("OTKRIVASHKA_fromText_id").value;
            }
            OTKRIVASHKA_Paragraph = document.getElementById("target_cont");
            OTKRIVASHKA_ElementNum = OTKRIVASHKA_Paragraph.getElementsByTagName("*").length;/*количество элементов тега fieldset переборка*/
            OTKRIVASHKA_innerText = document.getElementById("OTKRIVASHKA_GoodText_id").value;
            for(OTKRIVASHKA_CicleNum ; OTKRIVASHKA_CicleNum < OTKRIVASHKA_ElementNum; OTKRIVASHKA_CicleNum++){
                if(document.getElementById("OTKRIVASHKA_outText_id").value != "" && parseInt(document.getElementById("OTKRIVASHKA_outText_id").value) < parseInt(document.getElementById("OTKRIVASHKA_fromText_id").value) || document.getElementById("OTKRIVASHKA_outText_id").value == document.getElementById("OTKRIVASHKA_fromText_id").value){
                    break;
                }
                if(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum].textContent.replace(/\u00A0+/g, " ").indexOf(OTKRIVASHKA_innerText) > -1){
                    if(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum].target == "blank"){
                        if(OTKRIVASHKA_KalculateFrom > 0){
                            OTKRIVASHKA_Kalculate = OTKRIVASHKA_Kalculate + 1;
                            OTKRIVASHKA_KalculateFrom = OTKRIVASHKA_KalculateFrom - 1;
                        }
                        else{
                            OTKRIVASHKA_Kalculate = OTKRIVASHKA_Kalculate + 1;
                            //ссылка на редактирование + /?SUPERUSER-TEMPLATE-EASY-"typeId"_"templateId" - это команда для обычной перешаблонки
                            window.open(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum + 3].href + "?SUPERUSER-TEMPLATE-HARD-" + document.getElementById("OTKRIVASHKA_TypeSelect_id").options[document.getElementById("OTKRIVASHKA_TypeSelect_id").selectedIndex].value + "_" + document.getElementById("OTKRIVASHKA_TemplateSelect_id").options[document.getElementById("OTKRIVASHKA_TemplateSelect_id").selectedIndex].value);
                            await sleep(1100);
                            if(OTKRIVASHKA_Kalculate == document.getElementById("OTKRIVASHKA_outText_id").value){
                                break;
                            }
                        }
                    }
                }
            }
        }
        /*****Клонирование по кодам*****///те же стандарты
        let OTKRIVASHKA_DO_CLONE_BYCODE = async function (){
            OTKRIVASHKA_Kalculate = 0;
            OTKRIVASHKA_KalculateFrom = 0;
            if(document.getElementById("OTKRIVASHKA_fromText_id").value != ""){
                OTKRIVASHKA_KalculateFrom = document.getElementById("OTKRIVASHKA_fromText_id").value;
            }
            OTKRIVASHKA_Paragraph = document.getElementById("target_cont");
            OTKRIVASHKA_ElementNum = OTKRIVASHKA_Paragraph.getElementsByTagName("*").length;/*количество элементов тега fieldset переборка*/
            OTKRIVASHKA_innerText = document.getElementById("OTKRIVASHKA_GoodCode_id").value.replace(/\D+/g, "~");
            OTKRIVASHKA_innerArray = OTKRIVASHKA_innerText.split("~");
            for(OTKRIVASHKA_CicleNum = 0; OTKRIVASHKA_CicleNum < OTKRIVASHKA_ElementNum; OTKRIVASHKA_CicleNum++){
                if(document.getElementById("OTKRIVASHKA_outText_id").value != "" && parseInt(document.getElementById("OTKRIVASHKA_outText_id").value) < parseInt(document.getElementById("OTKRIVASHKA_fromText_id").value) || document.getElementById("OTKRIVASHKA_outText_id").value == document.getElementById("OTKRIVASHKA_fromText_id").value){
                    break;
                }
                if(OTKRIVASHKA_innerArray.some(ArrayCheck => (OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum].textContent.split(",")[0].replace(/\D+/g, "") == ArrayCheck && ArrayCheck != "") == true)){
                    if(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum].target == "blank"){
                        if(OTKRIVASHKA_KalculateFrom > 0){
                            OTKRIVASHKA_Kalculate = OTKRIVASHKA_Kalculate + 1;
                            OTKRIVASHKA_KalculateFrom = OTKRIVASHKA_KalculateFrom - 1;
                        }
                        else{
                            OTKRIVASHKA_Kalculate = OTKRIVASHKA_Kalculate + 1;
                            //ссылка на редактирование + /?SUPERUSER-TEMPLATE-EASY-"typeId"_"templateId" - это команда для обычной перешаблонки
                            window.open(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum + 3].href + "?SUPERUSER-TEMPLATE-HARD-" + document.getElementById("OTKRIVASHKA_TypeSelect_id").options[document.getElementById("OTKRIVASHKA_TypeSelect_id").selectedIndex].value + "_" + document.getElementById("OTKRIVASHKA_TemplateSelect_id").options[document.getElementById("OTKRIVASHKA_TemplateSelect_id").selectedIndex].value);
                            await sleep(1100);
                            if(OTKRIVASHKA_Kalculate == document.getElementById("OTKRIVASHKA_outText_id").value){
                                break;
                            }
                        }
                    }
                }
            }
        }
        /*****xmls*****/
        function XLSX_parse(template, brand, p){
            let opts = [];
            let anyGoods = [];
            let dataNow = [];
            let parent;
            let kid;
            let len;
            let a;
            let params = [];
            let obj = new Object();
            let objED = '';
            let temps;
            obj.наименование = '';
            function cleanX(){
                anyGoods = [];
                dataNow = [];
                parent;
                kid;
                len;
                a;
                params = [];
                obj = new Object();
                objED = '';
                obj.наименование = '';
            }
            window.saveFile = function saveFile () {
                for(let z = 0; z < p; z++){
                    temps = [template[z]]
                    let itemIdHtml = new XMLHttpRequest(); //запрос к шаблону по его коду
                    itemIdHtml.open('GET', `https://www.21vek.by/admin/attrs/edit_template/` + ajaxTemp[z] + '/', false);
                    itemIdHtml.send();
                    document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', '<div id="OTKRIVASHKA_XML">' + itemIdHtml.response + '</div>');
                    let xmlDoc = document.getElementById("OTKRIVASHKA_XML");
                    let type_length = xmlDoc.getElementsByTagName("table")[0].getElementsByClassName("sortable").length;
                    let type_name = [];
                    for(let i = 0; i < type_length; i++){
                        type_name[i] = xmlDoc.getElementsByTagName("table")[0].getElementsByClassName("sortable")[i].getElementsByTagName("input")[1].value;
                        temps.push(type_name[i]);
                    }
                    xmlDoc.remove();
        
                    parent = document.getElementById('target_cont');
                    kid = parent.getElementsByTagName('*');
                    len = kid.length;
                    for(let i = 0; i < len; i++){
                        if(kid[i].tagName == 'A' && kid[i].target == 'blank'){
                            if(temps.includes(kid[i + 1].textContent) || temps.includes(kid[i + 1].textContent.toLowerCase())){
                                anyGoods.push(kid[i].textContent.split(',')[1].replace(/\u00A0+/g, " "));
                            }
                        }
                    }

                    itemIdHtml = new XMLHttpRequest(); //запрос к шаблону по его коду
                    itemIdHtml.open('GET', `https://www.21vek.by/admin/goods/get_template/` + ajaxTemp[z] + '/', false);
                    itemIdHtml.send();
                    document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', '<div id="OTKRIVASHKA_XML">' + itemIdHtml.response + '</div>');
        
                    parent = document.getElementById('AttrTemplateEdit');
                    kid = parent.getElementsByTagName('*');
                    len = kid.length;
                    for(let i = 0; i < len; i++){
                        if(kid[i].className == 'attr_name'){
                            objED = ''
                            a = kid[i].textContent;
                        }
                        if(kid[i].type == "radio" && kid[i].className == "j-choose_value"){
                            params.push({[a]: ''/*(objED = objED + ',\n' + kid[i + 1].textContent)*/});
                        }
                        if(kid[i].type == "checkbox" && kid[i].className == "j-choose_value"){
                            params.push({[a]: ''/*(objED = objED + ',\n' + kid[i + 1].textContent)*/});
                        }
                        if(kid[i].type == "radio" && kid[i].className == "j-set_value"){
                            params.push({[a]: ''/*(objED = objED + ',\n' + kid[i + 1].textContent)*/});
                        }
                        if(kid[i].className == "j-check_number" && kid[i].type == "text"){
                            params.push({[a]: ''});
                        }
                        if(kid[i].className == "" && kid[i].type == "text"){
                            params.push({[a]: ''});
                        }
                    }
                    for(let i = 0; i < params.length; i++){
                        Object.assign(obj, params[i]);
                    }
                    for(let i = 0; i < anyGoods.length; i++){
                        dataNow.push(Object.assign({}, obj, {наименование: anyGoods[i]}));
                    }
                    data[z] = dataNow;

                    xmlDoc.remove();
                    document.getElementById('OTKRIVASHKA_XML').remove();
                    opts[z] = {sheetid: template[z],header: true, range: "A1:D100"};
                    cleanX();
                }
                let res = alasql('SELECT INTO XLSX("' + template.toString().replace(/\,/g, ', ') + ' (' + brand.toString().replace(/\,/g, ', ') + ').xlsx",?) FROM ?', [opts, data]);
            }
            saveFile();
        }

        let OTKRIVASHKA_TrueOrFalse1 = Boolean; /*уважаемый чекер*/
        let OTKRIVASHKA_innerArray = []; //для массива кодов
        let OTKRIVASHKA_innerText; //для имен
        let OTKRIVASHKA_Kalculate; //счетчик до
        let OTKRIVASHKA_KalculateFrom; //счетчик от
        let OTKRIVASHKA_CicleNum; //счетчик цикла
        let OTKRIVASHKA_Paragraph; //элемент-родитель
        let OTKRIVASHKA_ElementNum; //относительный номер элемента
        let OTKRIVASHKA_ManOption; //опции в селекте распределения
        let OTKRIVASHKA_Option; //опции в селекте шаблонов и типов
        let IfCase = []; //данные правок если
        let DelCase = []; //данные правок удалить
        let AddCase = []; //данные правок добавить
        let Cases = ''; //данные правок в ссылку
        let ajaxTemp = []; //xmls temp ids
        let templates = []; //xmls temps
        let brands = []; //xmls brands
        let data = []; //xmls valid data
        /*****сборка массивов для xmls*****/
        for(let i = 0; i < document.getElementById('select_template_id').options.length; i++){
            if(document.getElementById('select_template_id').options[i].selected){
                ajaxTemp.push(document.getElementById('select_template_id').options[i].value)
                templates.push(document.getElementById('select_template_id').options[i].textContent)
            }
        }
        for(let i = 0; i < document.getElementById('select_producer_id').options.length; i++){
            if(document.getElementById('select_producer_id').options[i].selected){
                brands.push(document.getElementById('select_producer_id').options[i].textContent)
            }
        }
        /*****выбор выгрузки*****/
        document.getElementById('CSU_EXCEL').onclick = function(){
            XLSX_parse(templates, brands, ajaxTemp.length);
        }

        /*****заносим менеджеров в селект*****/
        OTKRIVASHKA_Paragraph = document.getElementById("Managers");
        OTKRIVASHKA_ElementNum = OTKRIVASHKA_Paragraph.getElementsByTagName("*").length;/*количество элементов тега fieldset переборка*/
        OTKRIVASHKA_innerText = document.getElementById("OTKRIVASHKA_ManSelect_id").value;
        for(OTKRIVASHKA_CicleNum = 0; OTKRIVASHKA_CicleNum < OTKRIVASHKA_ElementNum; OTKRIVASHKA_CicleNum++){
            if(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum].className == "pseudo_link j-to_operator"){
                OTKRIVASHKA_ManOption = new Option(OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum].textContent, OTKRIVASHKA_Paragraph.getElementsByTagName("*")[OTKRIVASHKA_CicleNum].href);
                document.getElementById("OTKRIVASHKA_ManSelect_id").append(OTKRIVASHKA_ManOption);
            }
        }
        /*****заносим шаблоны в селект*****/
        for(OTKRIVASHKA_CicleNum = 0; OTKRIVASHKA_CicleNum < document.getElementById("select_template_id").options.length; OTKRIVASHKA_CicleNum++){ //обновление шаблонов в селекте (страховка)
            OTKRIVASHKA_Option = new Option(document.getElementById("select_template_id").options[OTKRIVASHKA_CicleNum].textContent, document.getElementById("select_template_id").options[OTKRIVASHKA_CicleNum].value);
            document.getElementById("OTKRIVASHKA_TemplateSelect_id").append(OTKRIVASHKA_Option);
        }
        //чистка на старте
        OTKRIVASHKA_Clear();
    }
    let DOM_Corrector = '<input class="OTKRIVASHKA_clear_CSS" type="button" id="OTKRIVASHKA_clear1_id" value="ОЧИСТИТЬ" hidden=""><select сlass="OTKRIVASHKA_select_CSS" id="OTKRIVASHKA_FunctionSelect_id" style="width: 400px;margin: 0 0 10 25;"><option value="">Открыть</option><option value="galery">Галерея</option><option value="?SUPERUSER-FUN-PUBLOCATE">Опубликовать</option><option value="?SUPERUSER-FUN-MATRAS">Матрас</option><option value="?SUPERUSER-FUN-NAMATRAS">Наматрасник</option><option value="?SUPERUSER-FUN-VIDEO">Вставить видео</option></select><input class="OTKRIVASHKA_input_CSS" id="OTKRIVASHKA_VideoCode_id" style="margin: 0 0 10 25;" placeholder="HTML код видео"><br><input class="OTKRIVASHKA_input_CSS" id="OTKRIVASHKA_GoodText_id" type="text" maxlength="255" placeholder="код/тип/бренд/модель" hidden=""><input class="OTKRIVASHKA_input_CSS" id="OTKRIVASHKA_GoodCode_id" type="text" placeholder="коды раздельно (любой символ)" hidden=""><img class="OTKRIVASHKA_img_CSS" id="OTKRIVASHKA_imgTrue1_id" src="https://avatanplus.com/files/resources/mid/5775880ee27f8155a31b7a50.png" hidden=""><img class="OTKRIVASHKA_img_CSS" id="OTKRIVASHKA_imgFalse1_id" src="https://dilogrenme.com/assets/img/uploads/false.png" hidden=""><br><input class="OTKRIVASHKA_input_CSS" id="OTKRIVASHKA_TextInput_id" type="text" placeholder="Текст для вставки" hidden=""><input class="OTKRIVASHKA_input_CSS" style="margin-bottom: 3px;" id="OTKRIVASHKA_TextDelete_id" type="text" placeholder="Текст для удаления" hidden=""><span id="Desc_span_id"><br><input class="OTKRIVASHKA_input_CSS" style="margin-bottom: 3px;" id="OTKRIVASHKA_TextGDelete_id" type="text" placeholder="Текст для удаления в группе"><input class="sidenav" type="radio" id="OTKRIVASHKA_clearCDD_id"><label for="OTKRIVASHKA_clearCDD_id">Очистить описание группы</label><input class="sidenav" type="radio" id="OTKRIVASHKA_clearGD_id"><label for="OTKRIVASHKA_clearGD_id">Очистить индивидуальное описание</label></span><span id="OTKRIVASHKA_Case_span" hidden="true"><input class="sidenav" type="radio" id="OTKRIVASHKA_Case_1_id"><label for="OTKRIVASHKA_Case_1_id">Условие</label><input class="ThisCase" type="radio" id="OTKRIVASHKA_ON_BASE_id"><label for="OTKRIVASHKA_ON_BASE_id">Только базовый</label></span><span id="OTKRIVASHKA_TemplateSpan_id" hidden=""><select class="OTKRIVASHKA_select_CSS" id="OTKRIVASHKA_TemplateSelect_id"><option value="">Выберите шаблон</option></select><br><select class="OTKRIVASHKA_select_CSS" id="OTKRIVASHKA_TypeSelect_id" hidden=""><option value="">Выберите тип</option></select><br></span><select class="OTKRIVASHKA_select_CSS" id="OTKRIVASHKA_ManSelect_id" hidden=""><option value="">Выберите менеджера</option></select><br><input class="OTKRIVASHKA_inputNum_CSS" id="OTKRIVASHKA_fromText_id" type="text" value="" placeholder="от" hidden=""><input class="OTKRIVASHKA_inputNum_CSS" id="OTKRIVASHKA_outText_id" type="text" value="" placeholder="до" hidden=""><p class="OTKRIVASHKA_p_CSS" id="OTKRIVASHKA_P_id" color="black" hidden="">ТОВАРОВ НАЙДЕНО. Введите нужное количество.</p><input class="OTKRIVASHKA_submit_CSS" type="button" id="OTKRIVASHKA_submit_id" value="СТАРТ" hidden=""><input class="OTKRIVASHKA_clear_CSS" type="button" id="OTKRIVASHKA_clear2_id" value="ОЧИСТИТЬ" hidden="">';
    setTimeout(() => {
        MAIN_PLUGIN_SCRIPT();
    }, 200);
}

let TemlateChange_PLUGIN = function (){

    /*********************************/
    /*******МОДУЛЬ ПЕРЕШАБЛОНКИ*******/
    /*********************************/

    setTimeout(function () {
        //интерфейс заехал в хату
        document.getElementsByTagName('body')[0].insertAdjacentHTML('afterbegin', '<style>span.CSUspan {font-family: "Lato", sans-serif;font-size: 30px;color: #febd01;cursor: pointer;position: absolute;right: 1%;}span.CSUspan:hover {color: rgb(252, 251, 217);}.sidenav {font-family: "Lato", sans-serif;height: 100%;width: 0;position: fixed;z-index: 1;top: 0;right: 0%;background-color: rgb(252, 251, 217);overflow-x: hidden;transition: 0.5s;padding-top: 60px;}.sidenav a {padding: 8px 8px 8px 32px;text-decoration: none;font-size: 25px;color: black;display: block;transition: 0.3s;}.sidenav a:hover {color: #febd01;}.sidenav .closebtn {position: absolute;top: 0;right: 25px;font-size: 36px;margin-left: 50px;}select.OTKRIVASHKA_select_CSS {height: 25px;width: 400px;margin-left: 25px;margin-bottom: 25px;}input.OTKRIVASHKA_submit_CSS {border: none;height: 25px;font-size: 14px;width: 100px;margin-left: 25px;margin-bottom: 15px;color: black;background: linear-gradient(to top, lime, rgb(255, 251, 44));}input.OTKRIVASHKA_clear_CSS {border: none;height: 25px;font-size: 14px;width: 100px;margin-left: 25px;margin-bottom: 15px;color: black;background: linear-gradient(to top, red, rgb(255, 251, 44));}@media screen and (max-height: 500px) {.sidenav {padding-top: 15px;}.sidenav a {font-size: 18px;}}</style><div id="mySidenav" class="sidenav"><!--created by Kirill Peshevich for 21vek.by //v1.0.4+--><a href="javascript:void(0)" class="closebtn">&times;</a><select class="OTKRIVASHKA_select_CSS" id="OTKRIVASHKA_TemplateSelect_id"><option value="">Выберите шаблон</option></select><br><select class="OTKRIVASHKA_select_CSS" id="OTKRIVASHKA_TypeSelect_id" hidden=""><option value="">Выберите тип</option></select><br><input class="OTKRIVASHKA_submit_CSS" type="button" id="OTKRIVASHKA_submit_id" value="СТАРТ" hidden=""><input class="OTKRIVASHKA_clear_CSS" type="button" id="OTKRIVASHKA_clear_id" value="ОЧИСТИТЬ"></div>');
        document.getElementById('header').insertAdjacentHTML('afterend', '<span class="CSUspan">&#9776; CSU Умная Перешаблонка</span>')
    }, 100);
    setTimeout(function () {
        /*****Открыть меню*****/
        let openNav = document.getElementsByClassName('CSUspan')[0].onclick = function () {
            document.getElementById("mySidenav").style.width = "500px";
        }
        /*****Закрыть меню*****/
        let closeNav = document.getElementsByTagName('a')[0].onclick = function () {
            document.getElementById("mySidenav").style.width = "0";
            OTKRIVASHKA_Clear();
        }
        /*****Полный сброс*****/
        let OTKRIVASHKA_Clear = document.getElementById("OTKRIVASHKA_clear_id").onclick = function (){
            document.getElementById("OTKRIVASHKA_submit_id").hidden = true;
            document.getElementById("OTKRIVASHKA_TypeSelect_id").hidden = true;
            document.getElementById("OTKRIVASHKA_TemplateSelect_id").innerHTML = "";
            for(OTKRIVASHKA_CicleNum = 0; OTKRIVASHKA_CicleNum < document.getElementById("GoodTemplateId").options.length; OTKRIVASHKA_CicleNum++){ //обновление шаблонов в селекте (страховка)
                OTKRIVASHKA_Option = new Option(document.getElementById("GoodTemplateId").options[OTKRIVASHKA_CicleNum].textContent, document.getElementById("GoodTemplateId").options[OTKRIVASHKA_CicleNum].value);
                document.getElementById("OTKRIVASHKA_TemplateSelect_id").append(OTKRIVASHKA_Option);
            }
            document.getElementById("OTKRIVASHKA_TypeSelect_id").innerHTML = "";
            OTKRIVASHKA_Option = new Option("Выберите тип", "");
            document.getElementById("OTKRIVASHKA_TypeSelect_id").append(OTKRIVASHKA_Option);
        }
        /*****Валидация типов по выбранному шаблону*****/
        let OTKRIVASHKA_TemplateClick = document.getElementById("OTKRIVASHKA_TemplateSelect_id").onclick = function (){
            document.getElementById("OTKRIVASHKA_TypeSelect_id").innerHTML = "";
            OTKRIVASHKA_Option = new Option("Выберите тип", "");
            document.getElementById("OTKRIVASHKA_TypeSelect_id").append(OTKRIVASHKA_Option);
            if(document.getElementById("OTKRIVASHKA_TemplateSelect_id").options[document.getElementById("OTKRIVASHKA_TemplateSelect_id").selectedIndex].value != ""){
                let itemIdHtml = new XMLHttpRequest(); //запрос к шаблону по его коду
                itemIdHtml.open('GET', `https://www.21vek.by/admin/attrs/edit_template/` + document.getElementById("OTKRIVASHKA_TemplateSelect_id").options[document.getElementById("OTKRIVASHKA_TemplateSelect_id").selectedIndex].value + '/', false);
                itemIdHtml.send();
                let outsideDOM = itemIdHtml.response; //вывод страницы редактировкания шаблона в строку
                document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', '<div id="OTKRIVASHKA_XML">' + outsideDOM + '</div>');
                let xmlDoc = document.getElementById("OTKRIVASHKA_XML"); //див с шаблоном на дно тела
                let fst_num = xmlDoc.getElementsByTagName("table")[0].id.replace(/\D+/g, ""); //тянем id параметра
                //console.log('fst_num = ' + fst_num);
                let type_length = xmlDoc.getElementsByTagName("table")[0].getElementsByClassName("sortable").length; //смотрим сколько значений типа
                //console.log('type_length = ' + type_length);
                let scd_num = []; //массив id значений
                let type_name = []; //массив названий типов
                //наполнение селекта типов опциями с полным отчетом в консоль (название опции = тип, значение = id of radio типа)
                for(let i = 0; i < type_length; i++){
                    scd_num[i] = xmlDoc.getElementsByTagName("table")[0].getElementsByClassName("sortable")[i].getElementsByTagName("input")[0].value;
                    type_name[i] = xmlDoc.getElementsByTagName("table")[0].getElementsByClassName("sortable")[i].getElementsByTagName("input")[1].value;
                    //console.log('GoodAttr' + fst_num + 'ValueId' + scd_num[i] + ' это ' + type_name[i]);
                    OTKRIVASHKA_Option = new Option(type_name[i], 'GoodAttr' + fst_num + 'ValueId' + scd_num[i]); //клеим опцию по принципу text="имя типа" value="'GoodAttr' + id_attr + 'ValueId' + id_value"(radio id в карточке)
                    document.getElementById("OTKRIVASHKA_TypeSelect_id").append(OTKRIVASHKA_Option); // вот тут опции залетают
                }
                //console.log(scd_num);
                //console.log(type_name);
                xmlDoc.remove(); //сносим костыль
                document.getElementById("OTKRIVASHKA_submit_id").hidden = false;
                document.getElementById("OTKRIVASHKA_TypeSelect_id").hidden = false; //показали
            }
            else{
                document.getElementById("OTKRIVASHKA_submit_id").hidden = true;
                document.getElementById("OTKRIVASHKA_TypeSelect_id").hidden = true;
                document.getElementById("OTKRIVASHKA_TypeSelect_id").innerHTML = "";
                OTKRIVASHKA_Option = new Option("Выберите тип", "");
                document.getElementById("OTKRIVASHKA_TypeSelect_id").append(OTKRIVASHKA_Option);
                //нет шаблона - спрятали и снесли опции
            }
        }
        /*****Алгоритм перешаблонки*****/
        let OTKRIVASHKA_TemplateChanger = function(){
            let OTKRIVASHKA_TemplateBroker = function () {
                //console.log("OTKRIVASHKA_TemplateBroker");
                document.getElementById("GoodBunchGoodId").options[0].selected = true; //ломаем группу
                if(GOChecker == true){OTKRIVASHKA_TamplateValidation(OTKRIVASHKA_TemplateType);} //условие для последней валидации и вставки типа
            }
            let OTKRIVASHKA_TamplateValidation = function (callBack) {
                //console.log('OTKRIVASHKA_TamplateValidation', callBack)
                $(function(){
                    function changeTemplate(){
                        var template_id = $("#GoodTemplateId").val();
                        var $bunch_block = $(".j-bunch");

                        $bunch_block.hide();
                        //валидания на группы при траблах с шаблоном
                        if(!template_id){
                            $bunch_block.val(0);
                        }
                        else{
                            $(".j-bunch_opt").remove();
                            var producer_id = $('#GoodProducerId').val();
                            $.ajax({
                                dataType: "json",
                                url: "/admin/goods/get_bunch_list/" + template_id + "/" + producer_id + "/",
                                success: function (data) {
                                    var options = "";
                                    for(var bunch_id in data){
                                        options +=
                                            "<option class='j-bunch_opt' value='" + bunch_id + "'>"
                                            + data[bunch_id]
                                            + "</option>";
                                    }
                                    var $bunch_select = $("#GoodBunchGoodId");
                                    $bunch_select.html($bunch_select.html() + options);
                                    $bunch_block.show();
                                    //запрос селекта при группировке
                                    //handleResponse(data, callBack)
                                }
                            });
                        }
                    }

                    function changeBunch(){

                        var template_id = $("#GoodTemplateId").val();
                        var old_bunch_id = $("#GoodBunchGoodId").attr('oldvalue');
                        var bunch_id = $("#GoodBunchGoodId").val();
                        var good_id = $("#GoodId").val();
                        good_id = good_id ? good_id : 0;

                        $("#Template").html(null);
                        //запрос нв смену шаблона или группы
                        //подгрузка аттрибутов
                        if(template_id){
                            $.ajax({
                                url: "/admin/goods/get_template/"
                                + template_id + "/"
                                + good_id + "/"
                                + good_id + "/"
                                + bunch_id + "/",
                                success: function (data) {
                                    const template = document.getElementById('Template')
                                    //console.log('data', data);
                                    const idInterval = setInterval(() => {
                                        if(data) {
                                            //console.log('lol');
                                            // $("#Template").html(data);
                                            //console.log(template.innerHTML)
                                            template.innerHTML = data;
                                            clearInterval(idInterval);
                                            callBack && callBack();
                                            //подождали пока атрибуты отобразятся в доме
                                        }
                                    }, 50);
                                }
                            });
                        }
                    }

                    $("#GoodTemplateId").change(changeTemplate);

                    //порядок имеет значение
                    $("#GoodBunchGoodId").change(changeBunch);
                    $("#GoodBunchGoodId").bind('focus change', function(e) {
                        var self = $(this);
                        self.attr('oldvalue', self.val());
                    });

                    if($("#GoodTemplateId").val() != ""){
                        changeBunch(); //хз зачем, но возврачает группу обратно при перешаблонке, можно юзать (без этой херни не пашет)
                    }
                    else{
                        $(".j-bunch").hide(); //блочит группировку при отсутствии шаблона
                    }
                });
            }
            let OTKRIVASHKA_MainTemplateChanger = function () {
                //console.log("OTKRIVASHKA_MainTemplateChanger");
                document.body.innerHTML=document.body.innerHTML.replace(/\u00AD+/g, ""); // отсечь несимвольный пробел shy
                //BlackMagic_sell = ;//МЕНЯТЬ РУКАМИ
                let BlackMagic_selNum = document.getElementById("GoodTemplateId").options.length;
                let BlackMagic_sell_txt;
                while (BlackMagic_selNum > 0) {
                    BlackMagic_sell_txt = document.getElementById("GoodTemplateId").options[BlackMagic_selNum - 1].value; // поиск и выбор группы
                    if (BlackMagic_sell_txt == BlackMagic_sell) {
                        document.getElementById("GoodTemplateId").options[BlackMagic_selNum - 1].selected = true; //пикаем нужный тип
                    }
                    BlackMagic_selNum--
                }
                let BlackMagic_SelfDescr;
                if(document.getElementById("GoodDescr").value != "" && document.getElementById("CDDescription").value != ""){
                    BlackMagic_SelfDescr = document.getElementById("CDDescription").value + "<br><br>" + document.getElementById("GoodDescr").value;//сохранение текста описания и группы
                }
                else{
                    if (document.getElementById("GoodDescr").value != "") {
                        BlackMagic_SelfDescr = document.getElementById("GoodDescr").value;
                    }
                    else{
                        if (document.getElementById("CDDescription").value != "") {
                            BlackMagic_SelfDescr = document.getElementById("CDDescription").value;
                        }
                        else{
                            BlackMagic_SelfDescr = "";
                        }
                    }
                }
                let BlackMagic_Paragraph = document.getElementById("AttrTemplateEdit"); //залетаем в параметры
                let BlackMagic_ElNum = BlackMagic_Paragraph.getElementsByTagName("*").length;//количество элементов тега fieldset переборка   //debug
                let BlackMagic_ElId;
                let BlackMagic_TagName;
                let BlackMagic_ClassName;
                let BlackMagic_Type;
                let BlackMagic_info = BlackMagic_SelfDescr;
                let BlackMagic_h3CH = 0;
                let BlackMagic_attr_nameCH = 0;
                let BlackMagic_h3 = 0;
                let BlackMagic_attr_name = 0;
                let ATTR_CH_ARRAY = [];
                for(let BlackMagic_innerElNum = 0; BlackMagic_innerElNum < BlackMagic_ElNum; BlackMagic_innerElNum++){
                    BlackMagic_ElId = BlackMagic_Paragraph.getElementsByTagName("*")[BlackMagic_innerElNum].id;
                    BlackMagic_TagName = BlackMagic_Paragraph.getElementsByTagName("*")[BlackMagic_innerElNum].tagName.toLowerCase();
                    BlackMagic_ClassName = BlackMagic_Paragraph.getElementsByTagName("*")[BlackMagic_innerElNum].className;
                    BlackMagic_Type = BlackMagic_Paragraph.getElementsByTagName("*")[BlackMagic_innerElNum].type;
                    if(BlackMagic_attr_name != 0){
                        if (BlackMagic_attr_nameCH != BlackMagic_info) {
                            BlackMagic_info = BlackMagic_info.replace(BlackMagic_attr_nameCH, '');
                            BlackMagic_info = BlackMagic_attr_nameCH + "<br>" + BlackMagic_attr_name + ":    " + BlackMagic_info;
                            ATTR_CH_ARRAY.push(BlackMagic_attr_name);
                            BlackMagic_attr_nameCH = 0;
                            BlackMagic_attr_name = 0;
                        }
                    }
                    if(BlackMagic_h3 != 0){
                        if (BlackMagic_h3CH != BlackMagic_info) {
                            BlackMagic_info = BlackMagic_info.replace(BlackMagic_h3CH, '');
                            BlackMagic_info = BlackMagic_h3CH + "<br><b>" + BlackMagic_h3 + "</b>" + BlackMagic_info;
                            BlackMagic_h3CH = 0;
                            BlackMagic_h3 = 0;
                        }
                    }
                    if(BlackMagic_TagName == "h3" && BlackMagic_Paragraph.getElementsByTagName("*")[BlackMagic_innerElNum].parentNode.className != 'prompt'){
                        BlackMagic_h3 = BlackMagic_Paragraph.getElementsByTagName("*")[BlackMagic_innerElNum].textContent;
                        BlackMagic_h3CH = BlackMagic_info;
                    }
                    if(BlackMagic_ClassName == "attr_name" && BlackMagic_Paragraph.getElementsByTagName("*")[BlackMagic_innerElNum].textContent != 'Тип'){
                        BlackMagic_attr_name = BlackMagic_Paragraph.getElementsByTagName("*")[BlackMagic_innerElNum].textContent;

                        BlackMagic_attr_nameCH = BlackMagic_info;
                    }

                    if(BlackMagic_Type == "radio"){
                        if(BlackMagic_Paragraph.getElementsByTagName("*")[BlackMagic_innerElNum].checked == true && BlackMagic_Paragraph.getElementsByTagName("*")[BlackMagic_innerElNum].parentNode.parentNode.previousSibling.textContent != 'Тип'){
                            if(BlackMagic_Paragraph.getElementsByTagName("*")[BlackMagic_innerElNum + 1].textContent != "Не показывать"){
                                BlackMagic_info = BlackMagic_info + BlackMagic_Paragraph.getElementsByTagName("*")[BlackMagic_innerElNum + 1].textContent + ", ";
                            }
                        }
                    }
                    if(BlackMagic_Type == "checkbox"){
                        if(BlackMagic_Paragraph.getElementsByTagName("*")[BlackMagic_innerElNum].checked == true){
                            BlackMagic_info = BlackMagic_info + BlackMagic_Paragraph.getElementsByTagName("*")[BlackMagic_innerElNum + 1].textContent + ", ";
                        }
                    }
                    if(BlackMagic_Type == "text"){
                        if(BlackMagic_ClassName == "j-check_number"){
                            if(BlackMagic_Paragraph.getElementsByTagName("*")[BlackMagic_innerElNum].value != ""){
                                if(BlackMagic_Paragraph.getElementsByTagName("*")[BlackMagic_innerElNum + 3].className != "j-check_number"){
                                    if(BlackMagic_Paragraph.getElementsByTagName("*")[BlackMagic_innerElNum - 3].className != "j-check_number"){
                                        BlackMagic_info = BlackMagic_info + BlackMagic_Paragraph.getElementsByTagName("*")[BlackMagic_innerElNum].value + ", ";
                                    }
                                    else{
                                        if(BlackMagic_Paragraph.getElementsByTagName("*")[BlackMagic_innerElNum - 3].value != ""){
                                            BlackMagic_info = BlackMagic_info + BlackMagic_Paragraph.getElementsByTagName("*")[BlackMagic_innerElNum].value + ", ";
                                        }
                                        else{
                                            BlackMagic_info = BlackMagic_info + "до " + BlackMagic_Paragraph.getElementsByTagName("*")[BlackMagic_innerElNum].value + ", ";
                                        }
                                    }
                                }
                                else{
                                    if(BlackMagic_Paragraph.getElementsByTagName("*")[BlackMagic_innerElNum].value != BlackMagic_Paragraph.getElementsByTagName("*")[BlackMagic_innerElNum + 3].value){
                                        if(BlackMagic_Paragraph.getElementsByTagName("*")[BlackMagic_innerElNum + 3].value != ""){
                                            BlackMagic_info = BlackMagic_info + "от " + BlackMagic_Paragraph.getElementsByTagName("*")[BlackMagic_innerElNum].value + " до ";
                                        }
                                        else{
                                            BlackMagic_info = BlackMagic_info + "от " + BlackMagic_Paragraph.getElementsByTagName("*")[BlackMagic_innerElNum].value + ", ";
                                        }
                                    }
                                    else{
                                        BlackMagic_info = BlackMagic_info + BlackMagic_Paragraph.getElementsByTagName("*")[BlackMagic_innerElNum].value + ", ";
                                        BlackMagic_innerElNum = BlackMagic_innerElNum + 3;
                                    }
                                }
                            }
                        }
                        else{
                            if(BlackMagic_Paragraph.getElementsByTagName("*")[BlackMagic_innerElNum].className != "flexible"){
                                if(BlackMagic_innerElNum != BlackMagic_ElNum - 2){
                                    if(BlackMagic_Paragraph.getElementsByTagName("*")[BlackMagic_innerElNum + 3].className == "flexible"){
                                        if(BlackMagic_Paragraph.getElementsByTagName("*")[BlackMagic_innerElNum - 1].tagName.toLowerCase() != "label"){
                                            if(BlackMagic_Paragraph.getElementsByTagName("*")[BlackMagic_innerElNum].value != ""){
                                                BlackMagic_info = BlackMagic_info + BlackMagic_Paragraph.getElementsByTagName("*")[BlackMagic_innerElNum].value + ", ";
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if(BlackMagic_ClassName == "flexible"){
                        if(BlackMagic_Paragraph.getElementsByTagName("*")[BlackMagic_innerElNum].value != "" && BlackMagic_Paragraph.getElementsByTagName("*")[BlackMagic_innerElNum].parentNode.parentNode.previousSibling.previousSibling.textContent != 'Тип'){
                            BlackMagic_info = BlackMagic_info.slice(0, BlackMagic_info.length - 2);
                            BlackMagic_info = BlackMagic_info + " (" + BlackMagic_Paragraph.getElementsByTagName("*")[BlackMagic_innerElNum].value + "),";
                        }
                    }
                    if(BlackMagic_innerElNum == BlackMagic_ElNum - 1){
                        BlackMagic_info = BlackMagic_info.slice(0, BlackMagic_info.length - 2);
                        BlackMagic_info = BlackMagic_info + ".";
                    }
                }
                if(BlackMagic_SelfDescr == ""){
                    BlackMagic_info = BlackMagic_info.slice(4, BlackMagic_info.length);
                }
                if(ATTR_CH_ARRAY.length != 1 && ATTR_CH_ARRAY.toString() != 'Тип'){
                    document.getElementById("GoodDescr").value = BlackMagic_info;
                }

                OTKRIVASHKA_TamplateValidation(OTKRIVASHKA_TemplateBroker);
            }
            let OTKRIVASHKA_TemplateType = function () {
                //console.log("OTKRIVASHKA_TemplateType");
                if(BlackMagic_sellType != ''){
                    document.getElementById(BlackMagic_sellType).checked = true;//МЕНЯТЬ РУКАМИ
                }
                if(user_loc.includes("/?SUPERUSER-TEMPLATE-") == true){
                    document.getElementsByClassName("j-save")[0].click(); //сохраняем только для массовых
                }
            } //стоит еще пофиксить...

            /*****тут типа порядок функций*****/
            let GOChecker = false;
            OTKRIVASHKA_TemplateBroker();
            OTKRIVASHKA_TamplateValidation(OTKRIVASHKA_MainTemplateChanger);
            //OTKRIVASHKA_TamplateValidation(OTKRIVASHKA_TemplateBroker);
            GOChecker = true; //повторно крэшим группу по этому условию
            //OTKRIVASHKA_TamplateValidation(OTKRIVASHKA_TemplateType);
        }
    let OTKRIVASHKA_TemplateCloner = function(){
        let Base_artts = [];
        let Base_adds = [];
        let OTKRIVASHKA_CloneBroker = function () {
            //console.log("OTKRIVASHKA_TemplateBroker");
            document.getElementById("GoodBunchGoodId").options[0].selected = true; //ломаем группу
            if(GOChecker == true){OTKRIVASHKA_CloneValidation(OTKRIVASHKA_CloneType);} 
        }
        let OTKRIVASHKA_CloneValidation = function (callBack) {
            //console.log('OTKRIVASHKA_TamplateValidation', callBack)
            $(function(){
                function changeTemplate(){
                    var template_id = $("#GoodTemplateId").val();
                    var $bunch_block = $(".j-bunch");

                    $bunch_block.hide();
                    //валидания на группы при траблах с шаблоном
                    if(!template_id){
                        $bunch_block.val(0);
                    }
                    else{
                        $(".j-bunch_opt").remove();
                        var producer_id = $('#GoodProducerId').val();
                        $.ajax({
                            dataType: "json",
                            url: "/admin/goods/get_bunch_list/" + template_id + "/" + producer_id + "/",
                            success: function (data) {
                                var options = "";
                                for(var bunch_id in data){
                                    options +=
                                        "<option class='j-bunch_opt' value='" + bunch_id + "'>"
                                        + data[bunch_id]
                                        + "</option>";
                                }
                                var $bunch_select = $("#GoodBunchGoodId");
                                $bunch_select.html($bunch_select.html() + options);
                                $bunch_block.show();
                                //запрос селекта при группировке
                                //handleResponse(data, callBack)
                            }
                        });
                    }
                }

                function changeBunch(){

                    var template_id = $("#GoodTemplateId").val();
                    var old_bunch_id = $("#GoodBunchGoodId").attr('oldvalue');
                    var bunch_id = $("#GoodBunchGoodId").val();
                    var good_id = $("#GoodId").val();
                    good_id = good_id ? good_id : 0;

                    $("#Template").html(null);
                    //запрос нв смену шаблона или группы
                    //подгрузка аттрибутов
                    if(template_id){
                        $.ajax({
                            url: "/admin/goods/get_template/"
                            + template_id + "/"
                            + good_id + "/"
                            + good_id + "/"
                            + bunch_id + "/",
                            success: function (data) {
                                const template = document.getElementById('Template')
                                //console.log('data', data);
                                const idInterval = setInterval(() => {
                                    if(data) {
                                        //console.log('lol');
                                        // $("#Template").html(data);
                                        //console.log(template.innerHTML)
                                        template.innerHTML = data;
                                        clearInterval(idInterval);
                                        callBack && callBack();
                                        //подождали пока атрибуты отобразятся в доме
                                    }
                                }, 50);
                            }
                        });
                    }
                }

                $("#GoodTemplateId").change(changeTemplate);

                //порядок имеет значение
                $("#GoodBunchGoodId").change(changeBunch);
                $("#GoodBunchGoodId").bind('focus change', function(e) {
                    var self = $(this);
                    self.attr('oldvalue', self.val());
                });

                if($("#GoodTemplateId").val() != ""){
                    changeBunch(); //хз зачем, но возврачает группу обратно при перешаблонке, можно юзать (без этой херни не пашет)
                }
                else{
                    $(".j-bunch").hide(); //блочит группировку при отсутствии шаблона
                }
            });
        }
        let OTKRIVASHKA_MainCloneChanger = function () {
            //console.log("OTKRIVASHKA_MainTemplateChanger");
            document.body.innerHTML=document.body.innerHTML.replace(/\u00AD+/g, ""); // отсечь несимвольный пробел shy
            //BlackMagic_sell = ;//МЕНЯТЬ РУКАМИ
            let BlackMagic_selNum = document.getElementById("GoodTemplateId").options.length;
            let BlackMagic_sell_txt;
            while (BlackMagic_selNum > 0) {
                BlackMagic_sell_txt = document.getElementById("GoodTemplateId").options[BlackMagic_selNum - 1].value; // поиск и выбор группы
                if (BlackMagic_sell_txt == BlackMagic_sell) {
                    document.getElementById("GoodTemplateId").options[BlackMagic_selNum - 1].selected = true; //пикаем нужный тип
                }
                BlackMagic_selNum--
            }
            let EL;
            let EL_ID;
            let EL_TAG;
            let EL_CLASS;
            let EL_TYPE;
            let ATTR_NAME;
            let BlackMagic_Paragraph = document.getElementById("Template");
            let BlackMagic_ElNum = BlackMagic_Paragraph.getElementsByTagName("*").length;//количество элементов тега fieldset переборка   //debug
            for(let EL_NUM = 0; EL_NUM < BlackMagic_ElNum; EL_NUM++){
                EL = BlackMagic_Paragraph.getElementsByTagName("*")[EL_NUM]
                EL_ID = BlackMagic_Paragraph.getElementsByTagName("*")[EL_NUM].id;
                EL_TAG = BlackMagic_Paragraph.getElementsByTagName("*")[EL_NUM].tagName.toLowerCase();
                EL_CLASS = BlackMagic_Paragraph.getElementsByTagName("*")[EL_NUM].className;
                EL_TYPE = BlackMagic_Paragraph.getElementsByTagName("*")[EL_NUM].type;

                /*****Выкатываем название параметра на случай пункта*****/
                if(EL_TAG == 'td' && EL_CLASS == 'attr_name'){
                    ATTR_NAME = EL.textContent;
                }
                /*****Заливаем список значения*****/
                if(EL_TAG == 'input' && EL_TYPE == 'radio' && EL_CLASS == 'j-choose_value' && EL.checked){
                    Base_artts.push(ATTR_NAME + '~type~' + EL_TYPE + '~value~' + EL.nextElementSibling.textContent);
                }
                /*****Заливаем да/нет значения*****/
                if(EL_TAG == 'input' && EL_TYPE == 'radio' && EL_CLASS == 'j-set_value' && EL.checked){
                    Base_artts.push(ATTR_NAME + '~type~' + EL_TYPE + '~value~' + EL.nextElementSibling.textContent);
                }
                /*****Заливаем множ значения*****/
                if(EL_TAG == 'input' && EL_TYPE == 'checkbox' && EL_CLASS == 'j-choose_value' && EL.checked){
                    Base_artts.push(ATTR_NAME + '~type~' + EL_TYPE + '~value~' + EL.nextElementSibling.textContent);
                }
                /*****Заливаем числ значения*****/
                if(EL_TAG == 'input' && EL_TYPE == 'text' && EL_CLASS == 'j-check_number' && EL.value != ''){
                    Base_artts.push(ATTR_NAME + '~type~' + EL_TYPE + '~value~' + EL.value);
                }
                /*****Заливаем текст значения*****/
                if(EL_TAG == 'input' && EL_TYPE == 'text' && EL_CLASS == '' && EL.value != ''){
                    Base_artts.push(ATTR_NAME + '~type~' + EL_TYPE + '~value~' + EL.value);
                }
                /*****Заливаем подсказки значения*****/
                if(EL_TAG == 'input' && EL_TYPE == 'text' && EL_CLASS == 'flexible' && EL.value != ''){
                    if(EL_ID.includes('ValueAdd')){
                        Base_adds.push(ATTR_NAME + '~for~' + ATTR_NAME + '~value~' + EL.value);
                    }else if(EL_ID.includes('_add')){
                        Base_adds.push(ATTR_NAME + '~for~' + document.getElementById(EL_ID.split('_add')[0]).nextElementSibling.textContent + '~value~' + EL.value);
                    }
                }
            }
            OTKRIVASHKA_CloneValidation(OTKRIVASHKA_CloneBroker);
        }
        let OTKRIVASHKA_CloneType = function () {
            //console.log("OTKRIVASHKA_TemplateType");
            let EL;
            let EL_ID;
            let EL_TAG;
            let EL_CLASS;
            let EL_TYPE;
            let ATTR_NAME;
            let BlackMagic_Paragraph = document.getElementById("Template");
            let BlackMagic_ElNum = BlackMagic_Paragraph.getElementsByTagName("*").length;//количество элементов тега fieldset переборка   //debug
            for(let EL_NUM = 0; EL_NUM < BlackMagic_ElNum; EL_NUM++){
                EL = BlackMagic_Paragraph.getElementsByTagName("*")[EL_NUM]
                EL_ID = BlackMagic_Paragraph.getElementsByTagName("*")[EL_NUM].id;
                EL_TAG = BlackMagic_Paragraph.getElementsByTagName("*")[EL_NUM].tagName.toLowerCase();
                EL_CLASS = BlackMagic_Paragraph.getElementsByTagName("*")[EL_NUM].className;
                EL_TYPE = BlackMagic_Paragraph.getElementsByTagName("*")[EL_NUM].type;

                /*****Выкатываем название параметра на случай пункта*****/
                if(EL_TAG == 'td' && EL_CLASS == 'attr_name'){
                    ATTR_NAME = EL.textContent;
                }
                /*****Заливаем список значения*****/
                if(EL_TAG == 'input' && EL_TYPE == 'radio' && EL_CLASS == 'j-choose_value'){
                    if(Base_artts.some(ArrayCheck => (ATTR_NAME == ArrayCheck.split('~type~')[0] && EL_TYPE == ArrayCheck.split('~type~')[1].split('~value~')[0] && EL.nextElementSibling.textContent == ArrayCheck.split('~value~')[1]) == true)){
                        EL.checked = true;
                    }
                }
                /*****Заливаем да/нет значения*****/
                if(EL_TAG == 'input' && EL_TYPE == 'radio' && EL_CLASS == 'j-set_value'){
                    if(Base_artts.some(ArrayCheck => (ATTR_NAME == ArrayCheck.split('~type~')[0] && EL_TYPE == ArrayCheck.split('~type~')[1].split('~value~')[0] && EL.nextElementSibling.textContent == ArrayCheck.split('~value~')[1]) == true)){
                        EL.checked = true;
                    }
                }
                /*****Заливаем множ значения*****/
                if(EL_TAG == 'input' && EL_TYPE == 'checkbox' && EL_CLASS == 'j-choose_value'){
                    if(Base_artts.some(ArrayCheck => (ATTR_NAME == ArrayCheck.split('~type~')[0] && EL_TYPE == ArrayCheck.split('~type~')[1].split('~value~')[0] && EL.nextElementSibling.textContent == ArrayCheck.split('~value~')[1]) == true)){
                        EL.checked = true;
                    }
                }
                /*****Заливаем числ значения*****/
                if(EL_TAG == 'input' && EL_TYPE == 'text' && EL_CLASS == 'j-check_number'){
                    if(Base_artts.some(ArrayCheck => (ATTR_NAME == ArrayCheck.split('~type~')[0] && EL_TYPE == ArrayCheck.split('~type~')[1].split('~value~')[0]) == true)){
                        EL.value = Base_artts.find(ArrayCheck => (ATTR_NAME == ArrayCheck.split('~type~')[0] && EL_TYPE == ArrayCheck.split('~type~')[1].split('~value~')[0]) == true).split('~value~')[1];
                        Base_artts.splice(Base_artts.indexOf(Base_artts.find(ArrayCheck => (ATTR_NAME == ArrayCheck.split('~type~')[0] && EL_TYPE == ArrayCheck.split('~type~')[1].split('~value~')[0]) == true)), 1);
                    }
                }
                /*****Заливаем текст значения*****/
                if(EL_TAG == 'input' && EL_TYPE == 'text' && EL_CLASS == ''){
                    if(Base_artts.some(ArrayCheck => (ATTR_NAME == ArrayCheck.split('~type~')[0] && EL_TYPE == ArrayCheck.split('~type~')[1].split('~value~')[0]) == true)){
                        EL.value = Base_artts.find(ArrayCheck => (ATTR_NAME == ArrayCheck.split('~type~')[0] && EL_TYPE == ArrayCheck.split('~type~')[1].split('~value~')[0]) == true).split('~value~')[1];
                        Base_artts.splice(Base_artts.indexOf(Base_artts.find(ArrayCheck => (ATTR_NAME == ArrayCheck.split('~type~')[0] && EL_TYPE == ArrayCheck.split('~type~')[1].split('~value~')[0]) == true)), 1);
                    }
                }
                /*****Заливаем подсказки значения*****/
                if(EL_TAG == 'input' && EL_TYPE == 'text' && EL_CLASS == 'flexible' && EL.value != ''){
                    if(EL_ID.includes('ValueAdd') && Base_adds.some(ArrayCheck => (ATTR_NAME == ArrayCheck.split('~for~')[0] && ATTR_NAME == ArrayCheck.split('~for~')[1].split('~value~')[0]) == true)){
                        EL.value = Base_adds.find(ArrayCheck => (ATTR_NAME == ArrayCheck.split('~for~')[0] && ATTR_NAME == ArrayCheck.split('~for~')[1].split('~value~')[0]) == true).split('~value~')[1];
                    }else if(EL_ID.includes('_add') && Base_adds.some(ArrayCheck => (ATTR_NAME == ArrayCheck.split('~for~')[0] && document.getElementById(EL_ID.split('_add')[0]).nextElementSibling.textContent == ArrayCheck.split('~for~')[1].split('~value~')[0]) == true)){
                        EL.value = Base_adds.find(ArrayCheck => (ATTR_NAME == ArrayCheck.split('~for~')[0] && document.getElementById(EL_ID.split('_add')[0]).nextElementSibling.textContent == ArrayCheck.split('~for~')[1].split('~value~')[0]) == true).split('~value~')[1];
                    }
                }
            }
            document.getElementsByClassName("j-save")[0].click(); //сохраняем только для массовых
        } //стоит еще пофиксить...

        /*****тут типа порядок функций*****/
        let GOChecker = false;
        OTKRIVASHKA_CloneBroker();
        OTKRIVASHKA_CloneValidation(OTKRIVASHKA_MainCloneChanger);
        GOChecker = true;
        //OTKRIVASHKA_TamplateValidation(OTKRIVASHKA_TemplateBroker);
        //OTKRIVASHKA_TamplateValidation(OTKRIVASHKA_TemplateType);
    }

        /*****Коннект с мэйн модулем*****/
        let OTKRIVASHKA_HowTemplate = function(){
            BlackMagic_sell = user_loc.split('_')[1]; //принимаем из локации id шаблона
            BlackMagic_sellType = user_loc.split('_')[0].split('-')[3];//принимаем из локации id типа
            if(user_loc.includes("/?SUPERUSER-TEMPLATE-EASY-") == true){
                if(BlackMagic_sell != ''){
                    OTKRIVASHKA_TemplateChanger(); //стартуем, если нет проблем
                }
            }
            if(user_loc.includes("/?SUPERUSER-TEMPLATE-HARD-") == true){
                if(BlackMagic_sell != ''){
                    OTKRIVASHKA_TemplateCloner(); //стартуем, если нет проблем
                }
            }
        }
        let OTKRIVASHKA_HowFix = function(){
            if(user_loc.includes("/?SUPERUSER-FIX-TEXT-") == true){
                BlackMagic_sell = decodeURI(user_loc.split('/?SUPERUSER-FIX-TEXT-INPUTotkrivashka-')[1].split('-DELETEotkrivashka-')[0]);
                BlackMagic_sellType = decodeURI(user_loc.split('-DELETEotkrivashka-')[1].split('-CDDclear-')[0]);
                BM_sellTypeG = decodeURI(user_loc.split('-DELETEotkrivashkaGroup-')[1]);
                if(decodeURI(user_loc.split('-CDDclear-')[1].split('-GDclear-')[0]) == 'true'){
                    document.getElementById("CDDescription").value = '';
                }
                if(decodeURI(user_loc.split('-GDclear-')[1].split('-DELETEotkrivashkaGroup-')[0]) == 'true'){
                    document.getElementById("GoodDescr").value = '';
                }
                if(BlackMagic_sellType != ''){
                    if(document.getElementById("GoodDescr").value.includes(BlackMagic_sellType) == true){
                        document.getElementById("GoodDescr").value = document.getElementById("GoodDescr").value.replace(BlackMagic_sellType, '');
                    }
                }
                if(BlackMagic_sell != ''){
                    if(document.getElementById("GoodDescr").value.includes(BlackMagic_sell) == false){
                        document.getElementById("GoodDescr").value = BlackMagic_sell + '<br>' + document.getElementById("GoodDescr").value;
                    }
                }
                if(BM_sellTypeG != ''){
                    if(document.getElementById("CDDescription").value.includes(BM_sellTypeG) == true){
                        document.getElementById("CDDescription").value = document.getElementById("CDDescription").value.replace(BM_sellTypeG, '');
                    }
                }
                document.getElementsByClassName("j-save")[0].click();
            }

            //Галимая правка
            if(user_loc.includes("/?SUPERUSER-FIX-EDIT-") == true){
                BlackMagic_sell = decodeURI(user_loc.split('/?SUPERUSER-FIX-EDIT-CASE_1')[1]);
                if(BlackMagic_sell.includes('BASE-1')){
                    BASE_INDEX = true;
                }else if(BlackMagic_sell.includes('BASE-0')){
                    BASE_INDEX = false;
                }

                if(BlackMagic_sell.includes('_IF-') && BlackMagic_sell.includes('-/IF_')){
                    IfCase = BlackMagic_sell.split('_IF-')[1].split('-/IF_')[0].split('~');
                    IfCaseLn = IfCase.length;
                }
                if(BlackMagic_sell.includes('_DEL-') && BlackMagic_sell.includes('-/DEL_')){
                    DelCase = BlackMagic_sell.split('_DEL-')[1].split('-/DEL_')[0].split('~');
                    DelCaseLn = DelCase.length;
                }
                if(BlackMagic_sell.includes('_ADD-') && BlackMagic_sell.includes('-/ADD')){
                    AddCase = BlackMagic_sell.split('_ADD-')[1].split('-/ADD')[0].split('~');
                    AddCaseLn = AddCase.length;
                }
                let EDIT_ALG = function(){
                    if(IfCaseLn > 0 && IfCase[0] != ''){
                        let IsThis = 0;
                        for(let i = 0; i < IfCaseLn; i++){
                            if(document.getElementById(IfCase[i].split(':')[0])){
                                if(IfCase[i].split(':')[1] == 'checked'){
                                    if(document.getElementById(IfCase[i].split(':')[0]).checked){
                                        IsThis = IsThis + 1;
                                    }
                                }else{
                                    if(document.getElementById(IfCase[i].split(':')[0]).value == IfCase[i].split(':')[1]){
                                        IsThis = IsThis + 1;
                                    }
                                }
                            }
                        }
                        if(IsThis == IfCaseLn){
                            if(DelCaseLn > 0 && DelCase[0] != ''){
                                for(let i = 0; i < DelCaseLn; i ++){
                                    if(document.getElementById(DelCase[i].split(':')[0])){
                                        if(DelCase[i].split(':')[1] == 'checked'){
                                            document.getElementById(DelCase[i].split(':')[0]).checked = false;
                                        }else if(DelCase[i].split(':')[1] == 'DelCase'){
                                            document.getElementById(DelCase[i].split(':')[0]).value = '';
                                        }
                                    }
                                }
                            }
                            if(AddCaseLn > 0 && AddCase[0] != ''){
                                for(let i = 0; i < AddCaseLn; i ++){
                                    if(document.getElementById(AddCase[i].split(':')[0])){
                                        if(AddCase[i].split(':')[1] == 'checked'){
                                            document.getElementById(AddCase[i].split(':')[0]).checked = true;
                                        }else{
                                            document.getElementById(AddCase[i].split(':')[0]).value = AddCase[i].split(':')[1];
                                        }
                                    }
                                }
                            }
                            document.getElementsByClassName("j-save")[0].click();
                        }else{window.close();}
                    }else{
                        if(DelCaseLn > 0 && DelCase[0] != ''){
                            for(let i = 0; i < DelCaseLn; i ++){
                                if(document.getElementById(DelCase[i].split(':')[0])){
                                    if(DelCase[i].split(':')[1] == 'checked'){
                                        document.getElementById(DelCase[i].split(':')[0]).checked = false;
                                    }else if(DelCase[i].split(':')[1] == 'DelCase'){
                                        document.getElementById(DelCase[i].split(':')[0]).value = '';
                                    }
                                }
                            }
                        }
                        if(AddCaseLn > 0 && AddCase[0] != ''){
                            for(let i = 0; i < AddCaseLn; i ++){
                                if(document.getElementById(AddCase[i].split(':')[0])){
                                    if(AddCase[i].split(':')[1] == 'checked'){
                                        document.getElementById(AddCase[i].split(':')[0]).checked = true;
                                    }else{
                                        document.getElementById(AddCase[i].split(':')[0]).value = AddCase[i].split(':')[1];
                                    }
                                }
                            }
                        }
                        document.getElementsByClassName("j-save")[0].click();
                    }
                }
                if(BASE_INDEX){
                    if(document.getElementById("GoodBunchGoodId").options[document.getElementById("GoodBunchGoodId").selectedIndex].textContent == "Базовый товар"){
                        EDIT_ALG();
                    }else{window.close();}
                }else{
                    EDIT_ALG();
                }
            }
        }

        /*****Функции открыть*****/
        let OTKRIVASHKA_Fun_Selector = function(){
            if(user_loc.includes("/?SUPERUSER-FUN-PUBLOCATE")){
                document.getElementById("GoodReady1").checked = true;
                document.getElementsByClassName("j-save")[0].click();
            }else if(user_loc.includes("/?SUPERUSER-FUN-MATRAS")){
                document.body.innerHTML=document.body.innerHTML.replace(/\u00AD+/g, ""); // kick shy
                let BlackMagic_name = document.getElementById("GoodModel").value; // выкатываем значение модели
                let BlackMagic_dop = document.getElementById("GoodModelSecondary").value.toString(); // выкатываем значение доп модели в виде строки
                let BlackMagic_dopMap = new Map([
                    ["бязь", "GoodAttr4200ValueId264323"],
                    ["жаккард", "GoodAttr4200ValueId13032"],
                    ["трикотаж", "GoodAttr4200ValueId12847"],
                    ["бамбук", "GoodAttr4200ValueId961584"],
                    ["джерси", "GoodAttr4200ValueId264373"],
                    ["джерси люкс", "GoodAttr4200ValueId264383"],
                    ["стрейч", "GoodAttr4200ValueId988096"],
                    ["премиум Care", "GoodAttr4200ValueId264353"],
                    ["премиум Adaptive", "GoodAttr4200ValueId264353"],
                    ["премиум Silver", "GoodAttr4200ValueId264353"],
                    ["лен", "GoodAttr4200ValueId1192533"],
                    ["премиум Aloe Vera", "GoodAttr4200ValueId264353"]
                ]);
                let temp_name;
                if(document.getElementById('GoodAttr122428ValueId1137168').checked){
                    temp_name = 'Тюфяк ';
                }else if(document.getElementById('GoodAttr122428ValueId1134268').checked){
                    temp_name = 'Матрас ';
                }
                let BlackMagic_longMass = [];
                let BlackMagic_fatMass = [];
                let BlackMagic_base = [];
                let BlackMagic_i = BlackMagic_name.length - 1;
                while (BlackMagic_name.charAt(BlackMagic_i) != "x") {
                    if(BlackMagic_name.charAt(BlackMagic_i) == "х"){
                        document.getElementById("GoodModel").value = document.getElementById("GoodModel").value.replace("х", (match, offset) => "x");
                        break;
                    }
                    BlackMagic_longMass[BlackMagic_i] = BlackMagic_name.charAt(BlackMagic_i); // вытягиваем ширину
                    BlackMagic_i--;
                }
                let BlackMagic_p = BlackMagic_i;
                while (BlackMagic_name.charAt(BlackMagic_p) != " ") {
                    BlackMagic_fatMass[BlackMagic_p] = BlackMagic_name.charAt(BlackMagic_p); // а тут длину
                    BlackMagic_p--;
                }
                let BlackMagic_z = BlackMagic_p - 1; // а тут модель
                while (BlackMagic_z >= 0) {
                    BlackMagic_base[BlackMagic_z] = BlackMagic_name.charAt(BlackMagic_z);
                    BlackMagic_z--;
                }
                let BlackMagic_group = BlackMagic_base.toString(); // предохранитель
                BlackMagic_group = BlackMagic_group.replace(/,+/g,""); // вот эта хрень для поиска по подходящим товарам группы
                let BlackMagic_sell = document.getElementById("GoodBunchGoodId");
                let BlackMagic_selNum = document.getElementById("GoodBunchGoodId").options.length;
                let BlackMagic_sell_txt;
                while (BlackMagic_selNum > 0) {
                    BlackMagic_sell_txt = document.getElementById("GoodBunchGoodId").options[BlackMagic_selNum - 1].text; // поиск и выбор группы
                    BlackMagic_sell_txt = BlackMagic_sell_txt.toString(); // предохранитель
                    if (BlackMagic_sell_txt.indexOf(BlackMagic_group + " ") > 0 && BlackMagic_sell_txt.indexOf(BlackMagic_group + " ") == temp_name.length && BlackMagic_sell_txt.replace(temp_name, "").length - (BlackMagic_group + " ").length < 8) {
                        BlackMagic_sell.selectedIndex = BlackMagic_selNum - 1;
                        let BlackMagic_a = BlackMagic_fatMass.toString();
                        BlackMagic_a = parseInt(BlackMagic_a.replace(/\D+/g,""));
                        let BlackMagic_b = BlackMagic_longMass.toString();
                        BlackMagic_b = parseInt(BlackMagic_b.replace(/\D+/g,""));
                        document.getElementById("GoodAttr4203Value").value = BlackMagic_b;
                        document.getElementById("GoodAttr4202Value").value = BlackMagic_a;
                        if(BlackMagic_dop.length > 0){
                            document.getElementById(BlackMagic_dopMap.get(BlackMagic_dop)).checked = true; // хитбокс ткани
                        }
                        if(document.getElementById("GoodAttr4200ValueId961584").checked == true || document.getElementById("GoodAttr4200ValueId282003").checked == true){
                            document.getElementById("root_4199_12843").checked = true; //чехол бамбук
                        }
                        if(BlackMagic_b > 179){
                            document.getElementById("GoodReady1").checked = true;
                            document.getElementsByClassName("j-save")[0].click();
                        }
                    }
                    BlackMagic_selNum--;
                }
            }else if(user_loc.includes("/?SUPERUSER-FUN-NAMATRAS")){
                document.body.innerHTML=document.body.innerHTML.replace(/\u00AD+/g, ""); // kick shy
                let BlackMagic_name = document.getElementById("GoodModel").value; // выкатываем значение модели
                let BlackMagic_dop = document.getElementById("GoodModelSecondary").value.toString(); // выкатываем значение доп модели в виде строки
                let BlackMagic_dopMap = new Map([
                    ["бязь", "root_59984_369014"],
                    ["жаккард", "root_59984_368824"],
                    ["трикотаж", "root_59984_368814"],
                    ["мембранная", "root_59984_687643"],
                    ["джерси", "root_59984_907530"],
                    ["тик", "root_59984_369054"],
                    ["полиэстер", "root_59984_369094"],
                    ["хлопчатобумажная ткань", "root_59984_368834"],
                    ["махровая ткань", "root_59984_368844"],
                    ["полиуретановое покрытие", "root_59984_370534"],
                    ["бамбук", "root_59984_1021619"],
                    ["стрейч", "root_59984_1024022"]
                ]);
                let BlackMagic_longMass = [];
                let BlackMagic_fatMass = [];
                let BlackMagic_base = [];
                let BlackMagic_i = BlackMagic_name.length - 1;
                while (BlackMagic_name.charAt(BlackMagic_i) != "x") {
                    if(BlackMagic_name.charAt(BlackMagic_i) == "х"){
                        document.getElementById("GoodModel").value = document.getElementById("GoodModel").value.replace("х", (match, offset) => "x");
                        break;
                    }
                    BlackMagic_longMass[BlackMagic_i] = BlackMagic_name.charAt(BlackMagic_i); // вытягиваем ширину
                    BlackMagic_i--;
                }
                let BlackMagic_p = BlackMagic_i;
                while (BlackMagic_name.charAt(BlackMagic_p) != " ") {
                    BlackMagic_fatMass[BlackMagic_p] = BlackMagic_name.charAt(BlackMagic_p); // а тут длину
                    BlackMagic_p--;
                }
                let BlackMagic_z = BlackMagic_p - 1; // а тут модель
                while (BlackMagic_z >= 0) {
                    BlackMagic_base[BlackMagic_z] = BlackMagic_name.charAt(BlackMagic_z);
                    BlackMagic_z--;
                }
                let BlackMagic_group = BlackMagic_base.toString(); // предохранитель
                BlackMagic_group = BlackMagic_group.replace(/,+/g,""); // вот эта хрень для поиска по подходящим товарам группы
                let BlackMagic_sell = document.getElementById("GoodBunchGoodId");
                let BlackMagic_selNum = document.getElementById("GoodBunchGoodId").options.length;
                let BlackMagic_sell_txt;
                while (BlackMagic_selNum > 0) {
                    BlackMagic_sell_txt = document.getElementById("GoodBunchGoodId").options[BlackMagic_selNum - 1].text; // поиск и выбор группы
                    BlackMagic_sell_txt = BlackMagic_sell_txt.toString(); // предохранитель
                    if(BlackMagic_sell_txt.indexOf(BlackMagic_group) > 0 || BlackMagic_sell_txt.indexOf(BlackMagic_group.replace("нестеганый", "стеганый")) > 0 || BlackMagic_sell_txt.indexOf(BlackMagic_group.replace("стеганый", "нестеганый")) > 0){
                        BlackMagic_sell.selectedIndex = BlackMagic_selNum - 1;
                        let BlackMagic_a = BlackMagic_fatMass.toString();
                        BlackMagic_a = parseInt(BlackMagic_a.replace(/\D+/g,""));
                        let BlackMagic_b = BlackMagic_longMass.toString();
                        BlackMagic_b = parseInt(BlackMagic_b.replace(/\D+/g,""));
                        document.getElementById("GoodAttr4259Value").value = BlackMagic_a; // заливаем толщину
                        document.getElementById("GoodAttr4260Value").value = BlackMagic_b; // заливаем длину
                        if(BlackMagic_dop.length > 0){
                            document.getElementById(BlackMagic_dopMap.get(BlackMagic_dop)).checked = true; // хитбокс ткани
                        }
                        document.getElementById("GoodReady1").checked = true;
                        document.getElementsByClassName("j-save")[0].click();
                    }
                    BlackMagic_selNum--;
                }
            }
        }

        /*****Запуск одиночной*****/
        let OTKRIVASKA_START = document.getElementById("OTKRIVASHKA_submit_id").onclick = function (){
            BlackMagic_sell = document.getElementById("OTKRIVASHKA_TemplateSelect_id").options[document.getElementById("OTKRIVASHKA_TemplateSelect_id").selectedIndex].value;
            BlackMagic_sellType = document.getElementById("OTKRIVASHKA_TypeSelect_id").options[document.getElementById("OTKRIVASHKA_TypeSelect_id").selectedIndex].value;
            if(BlackMagic_sell != ''){
                OTKRIVASHKA_TemplateChanger();
                closeNav();
            }
        }

        let OTKRIVASHKA_CicleNum; //порядок циклов
        let OTKRIVASHKA_Paragraph; //мб понадобится позже
        let OTKRIVASHKA_ElementNum; //мб понадобится позже
        let OTKRIVASHKA_Option; //для опций
        let BlackMagic_sell; //шаблон
        let BlackMagic_sellType; //тип
        let BM_sellTypeG; //added
        let IfCase = []; //данные правок если
        let DelCase = []; //данные правок удалить
        let AddCase = []; //данные правок добавить
        let IfCaseLn;
        let DelCaseLn;
        let AddCaseLn;
        let BASE_INDEX = false;
        OTKRIVASHKA_Clear();
        //триггер на ссылочное условие для массовой перешаблонки
        if(user_loc.includes("/?SUPERUSER-TEMPLATE-") == true){
            OTKRIVASHKA_HowTemplate();
        }
        if(user_loc.includes("/?SUPERUSER-FIX-") == true){
            OTKRIVASHKA_HowFix();
        }
        if(user_loc.includes("/?SUPERUSER-FUN-") == true){
            OTKRIVASHKA_Fun_Selector();
        }
    }, 200);
}

/*********************************/
/*********МОДУЛЬ ГАЛЕРЕИ*********/
/*********************************/

let ADD_GALERY = function(){
    if(user_loc.includes("/?SUPERUSER-FUN-VIDEO")){
        document.getElementById('GoodImageTypeVideo').checked = true;
        document.getElementsByClassName('input text')[0].style.display = 'block';
        document.getElementById('GoodImageName').value = decodeURI(user_loc.split('/?SUPERUSER-FUN-VIDEO_')[1]); //доделать!
        document.getElementsByClassName("j-save")[0].click();
        setTimeout(function(){window.close();}, 5000);
    }
}

/*********************************/
/******МОДУЛЬ ВЫБОРА ФУНКЦИЙ******/
/**********Условия вызова*********/
let low = function(){
    if(user_loc.includes("/admin/goods/") == true && user_loc.includes("/goods/edit/") == false && user_loc.includes("/goods/upload/") == false && user_loc.includes("/goods/to_operator/") == false && user_loc.includes("/edit/") == false){
        NO_PAGINATION(); //модуль массовых действий
    }
    if(user_loc.includes("/admin/goods/edit/") == true){
        let waiter_to_temp = setInterval(() => {
            if(document.getElementById('AttrTemplateEdit')) {
                REPARE_CARD(); //модуль карточки товара
                clearInterval(waiter_to_temp);
            }
        }, 50);
    }
}
let full = function(){
    if(user_loc.includes("/admin/goods/") == true && user_loc.includes("/goods/edit/") == false && user_loc.includes("/goods/upload/") == false && user_loc.includes("/goods/to_operator/") == false && user_loc.includes("/edit/") == false){
        MAIN_PLUGIN(); //модуль массовых действий
    }
    if(user_loc.includes("/admin/goods/edit/") == true){
        let waiter_to_temp = setInterval(() => {
            if(document.getElementById('AttrTemplateEdit')) {
                TemlateChange_PLUGIN(); //модуль карточки товара
                clearInterval(waiter_to_temp);
            }
        }, 50);
    }
    if(user_loc.includes("/admin/goods/upload/") == true){
        let waiter_to_temp = setInterval(() => {
            if(document.getElementById('GoodImageTypeImage')) {
                ADD_GALERY(); //модуль карточки товара
                clearInterval(waiter_to_temp);
            }
        }, 50);
    }
    if(user_loc.includes("/admin/") == false && user_loc.includes("https://www.21vek.by/") == true){
        document.getElementsByTagName('body')[0].insertAdjacentHTML('afterbegin', '<style>button.CSUCodeExport{font-family: "Open Sans", sans-serif;position: fixed;z-index: 1;cursor: pointer;padding: 5px 5px;background: #4F2EDC;border: none;color: #ffffff;font-weight: 400;border-radius: 3px;box-shadow: 0 0 10px #947ADA;transition: all 0.5s;text-decoration: none;}</style><button class="CSUCodeExport" id="CSUCodeExport">Выгрузить коды по фильтру</button>');
        setTimeout(function(){
            document.getElementById("CSUCodeExport").onclick = function(){
                try{
                    let cont =''
                    let parent = document.getElementById('j-search_result');
                    let kid = parent.getElementsByTagName('*');
                    let len = kid.length;
                    for(let i = 0; i < len; i++){
                        if(kid[i].className == 'g-code'){
                            cont = cont + kid[i].textContent.replace(/\D+/g, "") + "\n";
                        }
                    }
                    function index(filename, text, type) {
                        let main_element = document.createElement('a');
                        main_element.setAttribute('href', type + encodeURIComponent(text));
                        main_element.setAttribute('download', filename);
                    
                        main_element.style.display = 'none';
                        document.body.appendChild(main_element);
                    
                        main_element.click();
                    
                        document.body.removeChild(main_element);
                    }
                    index(document.location.toString() +".txt", cont, 'data:text/plain;charset=utf-8,');
                }catch{alert('Нужно выбрать фильтр и прокрутить страницу до конца (mode redactor only)!')}
            }
        },100)
    }
}