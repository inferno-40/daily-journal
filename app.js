const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const lodash = require('lodash');


const app =express();

app.use(express.static('public'));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

const homeData = 'Phasellus facilisis leo mollis, sollicitudin risus vitae, condimentum mi. Morbi ac odio rutrum, vulputate enim nec, scelerisque velit. Donec porta purus libero, scelerisque finibus mauris aliquet sit amet. Pellentesque et diam nisi. Morbi eu scelerisque turpis. Pellentesque congue tempus neque, vulputate tempus ex euismod eu. Fusce eu mi sit amet lorem tincidunt ullamcorper sed quis eros. Praesent faucibus quam nec quam consequat tempus. Vivamus et quam quis mi feugiat hendrerit porta vel nisi. Fusce eu pretium mi, at feugiat ipsum. Praesent nec turpis cursus, mattis ligula ac, vulputate odio. Nam sodales id felis vitae varius. Etiam ligula velit, porttitor quis diam non, ultricies volutpat ante. Nam vehicula ante nunc, a varius dui vehicula id. Sed a cursus erat.';
const aboutData = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque blandit massa et purus placerat, eget iaculis tellus fermentum. Suspendisse potenti. In hac habitasse platea dictumst. Integer suscipit tortor sit amet mi porttitor, ac sagittis neque gravida. Proin dapibus, ipsum et condimentum sollicitudin, nibh purus fermentum mi, ac pharetra lorem diam in enim. Duis id dictum mauris. In hac habitasse platea dictumst. Integer sit amet pharetra quam, id varius mauris. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.';
const contactData = 'Maecenas tempus risus quis neque elementum, ac vulputate leo luctus. Cras augue leo, sagittis eget felis et, ultrices luctus tellus. Sed pharetra leo ut enim ultrices, vitae eleifend ante porttitor. In non nibh auctor, tincidunt massa nec, gravida magna. Morbi et quam ac neque blandit mollis. Maecenas viverra ut tellus a lacinia. Sed dignissim lorem at enim tincidunt facilisis. Fusce quis lorem vulputate, eleifend augue ac, tempus mi. Mauris odio lorem, facilisis commodo magna vel, consequat rhoncus erat.';

let posts = [];
app.get('/',(req,res)=>{
    res.render('home',{data : homeData,posts: posts});
});

app.get('/about',(req,res)=>{
    res.render('about',{data: aboutData});
});

app.get('/contact',(req,res)=>{
    res.render('contact',{data: contactData});
});

app.get('/compose',(req,res)=>{
    res.render('compose');
});

app.post('/compose',(req,res)=>{
    let post = {
        title: req.body.newTitle,
        post : req.body.newPost
    }
    posts.push(post);
    res.redirect('/');
});

app.get('/posts/:postName',(req,res)=>{

    posts.forEach(element => {
        if(lodash.lowerCase(element.title) === lodash.lowerCase(req.params.postName)){
            res.render('post',{data: element});
        }
    })
});

app.listen(3000,()=>{
    console.log('started');
});