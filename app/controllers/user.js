var User = require('../models/user');

var userController = function(server){

    server.route('/logout')
    
    .get(function(req,res){
        req.logout();
        res.redirect('/')
    });

    server.route('/extra-data')

        .get(function(req,res){
            User.findOne({id_network : req.user.id},function(err,user){
                if(user){
                    res.redirect('/');
                    return;
                }
                else{
                    res.render('user/extra_data');
                }
            });
           
        })
        .post(function(req,res){
            var username = req.body.username;
            var email = req.body.email;
            if(req.user.provider == 'facebook'){
                console.log(req.user);
            var user=new User({
                id_network : req.user.id,
                username : username,
                email : email,
                firt_name : req.user.name.givenName,
                last_name : req.user.name.familyName
            });
            console.log(req.body);
            user.save(function(err){
                if(err){
                    return;
                }
            });
            res.redirect('/');
            }
            if(req.user.provider == 'twitter'){
                console.log(req.user);
                var user=new User({
                    id_network : req.user.id,
                    username : username,
                    email : email,
                    firt_name : req.user.displayName
                });
                console.log(req.body);
                user.save(function(err){
                    if(err){
                        return;
                    }
                });
                res.redirect('/');
            }
            
        });

};

module.exports = userController;