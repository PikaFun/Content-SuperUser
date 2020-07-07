//omnibox
chrome.omnibox.OnInputEnteredDisposition = 'currentTab';
chrome.omnibox.SuggestResult = {
    info: "info",
    version: "version",
    fun: "fun",
    fun_true: "fun on",
    fun_false: "fun off",
    on: "on",
    off: "off",
    status: "status",
    help: 'help'
    //license: "license"
}

chrome.omnibox.onInputEntered.addListener(function (sup){
    if(sup.toLowerCase() == chrome.omnibox.SuggestResult.fun){
        window.open('games/games.html');
    }else if(sup.toLowerCase() == chrome.omnibox.SuggestResult.info){
        window.open('https://aggregator.atlassian.net/servicedesk/customer/article/1550712866');
    }else if(sup.toLowerCase() == chrome.omnibox.SuggestResult.version){
        alert('Информация о версии расширения: v1.0.4+, 15.05.2020');
    }else if(sup.toLowerCase() == chrome.omnibox.SuggestResult.fun_true){
        localStorage.setItem('fun', 1);
        window.open('games/games.html');
    }else if(sup.toLowerCase() == chrome.omnibox.SuggestResult.fun_false){
        localStorage.setItem('fun', 0);
    }else if(sup.toLowerCase() == chrome.omnibox.SuggestResult.on){
        localStorage.setItem('cbx', 1);
    }else if(sup.toLowerCase() == chrome.omnibox.SuggestResult.off){
        localStorage.setItem('cbx', 0);
    }else if(sup.toLowerCase() == chrome.omnibox.SuggestResult.status){
        alert(
            'Положение выключателя: ' + localStorage.getItem('cbx') + ';\n' +
            'Имя пользователя: ' + localStorage.getItem('login') + ';\n' +
            'Уровень доступа: ' + localStorage.getItem('status') + ';\n' +
            'Разрешение на игры: ' + localStorage.getItem('fun') + ';\n' +
            'Резервная копия: ' + localStorage.getItem('location') + ';\n' +
            'Сохраненные данные: ' + localStorage.getItem('data') + '.'
        );
    }else if(sup.toLowerCase() == chrome.omnibox.SuggestResult.help){
        alert(
            'Пользовательская инструкция: ' + chrome.omnibox.SuggestResult.info + '\n' +
            'Версия установленного расширения: ' + chrome.omnibox.SuggestResult.version + '\n' +
            'Статус использования: ' + chrome.omnibox.SuggestResult.status + '\n' +
            'Принудительное включение: ' + chrome.omnibox.SuggestResult.on + '\n' +
            'Принудительное отключение: ' + chrome.omnibox.SuggestResult.off + '\n' +
            'Запуск игр: ' + chrome.omnibox.SuggestResult.fun + '\n' +
            'Вкл запуск игр: ' + chrome.omnibox.SuggestResult.fun_true + '\n' +
            'Выкл запуск игр: ' + chrome.omnibox.SuggestResult.fun_false + '\n' +
            'Доступные команды: ' + chrome.omnibox.SuggestResult.help
        )
    }/*else if(sup == 'license'){
        let EN = ''
        let RU = '';
        function index(filename, text, type) {
            let main_element = document.createElement('a');
            main_element.setAttribute('href', type + encodeURIComponent(text));
            main_element.setAttribute('download', filename);
          
            main_element.style.display = 'none';
            document.body.appendChild(main_element);
          
            main_element.click();
          
            document.body.removeChild(main_element);
        }
        index("Content SuperUser License (EN).txt", EN, 'data:text/plain;charset=utf-8,');
        index("Content SuperUser License (RU).txt", RU, 'data:text/plain;charset=utf-8,');
    }*/
});

//message
localStorage.setItem('session', 0)
localStorage.setItem('location', '');
function handleMessage(request, sender, sendResponse) {
    if(`${request.greeting}` == 'power'){
        if(localStorage.getItem('cbx') == 0){
            sendResponse({response: 0});
        }else if(localStorage.getItem('cbx') == 1){
            if(localStorage.getItem('status') == 1){
                sendResponse({
                    response: 1,
                    session: localStorage.getItem('session'),
                    location: localStorage.getItem('location')
                });
            }else if(localStorage.getItem('status') == 'full'){
                sendResponse({
                    response: 'full',
                    session: localStorage.getItem('session'),
                    location: localStorage.getItem('location')
                });
            }else if(localStorage.getItem('status') == 'ban'){
                sendResponse({response: 'ban'});
            }
        }
    }else if(`${request.greeting}` == 'down' && localStorage.getItem('fun') == 1 && localStorage.getItem('login') != 'zhuk'){
        window.open('games/games.html');
    }else if(`${request.greeting}` == 'repare'){
        if(localStorage.getItem('greeting') == 'reserve'){
            sendResponse({response: {
                greeting: localStorage.getItem('greeting'),
                location: localStorage.getItem('location'),
                data: localStorage.getItem('data'),
            }});
        }
    }else if(`${request.greeting}` == 'session'){
        localStorage.setItem('session', 1);
    }else if(`${request.greeting}` == 'repared'){
        localStorage.setItem('session', 0);
    }else if(`${request.greeting}` == 'reserve'){
        localStorage.setItem('greeting', `${request.greeting}`);
        localStorage.setItem('location', `${request.location}`);
        localStorage.setItem('data', `${request.data}`);
    }
}

chrome.runtime.onMessage.addListener(handleMessage);