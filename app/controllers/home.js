var homeController = function(server){
    console.log("home controller listo");

    server.route('/')
    .get(function(req,res){
        if(req.user){
            if(req.user.provider == 'facebook'){
                var name = req.user._json.first_name;
                var url_foto = "http://graph.facebook.com/"+ req.user.id + "/picture"
            }
            if(req.user.provider == 'twitter'){
                var name = req.user.username;
                var url_foto = req.user.photos[0].value;
            }
            console.log(url_foto);
            res.render("home/index",{
                name : name,
                url_foto : url_foto
            });
        }
        else{
            res.render('home/index');
        }
       
    });
};

module.exports = homeController;