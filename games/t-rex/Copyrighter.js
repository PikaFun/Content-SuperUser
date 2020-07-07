window.fbAsyncInit = function() {
FB.init({
    appId      : '576553495813787',
    xfbml      : true,
    version    : 'v2.2'
});
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));