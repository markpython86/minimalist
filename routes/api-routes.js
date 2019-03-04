const User = require('../models').User;
const Daily = require('../models').Daily;
const Monthly = require('../models').Monthly;
const Weekly = require('../models').Weekly;
const Moment = require('moment')


module.exports = function (app) {
    app.post('/signup', (req, res) => {
        User.create(req.body)
            .then(()=> res.redirect('/daily'))
    })
    app.post('/daily/:user_id', (req, res) => {

        //get user birthdate
        //maybe adding a globale variable within the post request so we can assign the birthdate to it so we can call it later?
        User.findAll({
            where: {
                id: req.params.user_id
            }
        }).then(userInfo => {
            console.log('================get user birthdate==============')
            console.log(userInfo[0].dataValues.birthday)
            console.log('================userinfo==============')
            // res.render('daily', { daily: dailies })

        })
        //get user birthdate ends
        var wakeupToString = (req.body.wakeup).toString()
        var wakeupReformatted = Moment(wakeupToString, 'hh:mm A').format('hh:mm');
        var sleepToString = (req.body.sleep).toString()
        var sleepReformatted = Moment(sleepToString, 'hh:mm A').format('hh:mm');
        console.log(res.User)
        console.log('=========wake=======')
        console.log(wakeupReformatted)
        console.log('=========wake=======')

        console.log('=========sleep=======')
        console.log(sleepReformatted)
        console.log('=========sleep=======')
         Daily.create({...req.body,
         userId: req.params.user_id,
         wakeup: wakeupReformatted,
         sleep: sleepReformatted
         })
            .then(() => res.redirect('/daily'))
    });
    app.post('/monthly/:user_id', (req, res) => {
         Monthly.create({...req.body, userId: req.params.user_id})
            .then(() => res.redirect('/monthly'))
    })
    app.post('/weekly/:user_id', (req, res) => {
         Weekly.create({
             ...req.body,
             userId: req.params.user_id
             })
            .then(() => res.redirect('/weekly'))
    })
};
