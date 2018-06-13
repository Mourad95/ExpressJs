const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const app = new express();
const PORT = 3000;
let frenchMovies = [];

app.use('/public',express.static('public')) // la méthode use permet d'utiliser des middleware ici 
//la méthode static on déclare que le fichier static se trouve dans public
//app.use(bodyParser.urlencoded({extended: false})); //middleware


app.set('views','./views'); // on declare les vues dans le dossier views
app.set('view engine', 'ejs');// le type de view engine utilisé c'est ejs

app.get('/', (req,res)=>{ // route à la racine
    //res.send('hello <b>word!!!!!!</b>'); //peut interpreter du html
    res.render('index.ejs') //Lorsque l'on veut utiliser un template on utilise la méthode render
}) // localhost 

app.get ('/movies', (req, res)=>{

    const title = 'Films français des trente dernières années';

frenchMovies = [
    {title: 'le fabuleux destin d\'Amélie Poulain', year: 2001},
    {title: 'buffet froid', year: 1979},
    {title: 'De rouille et d\'os', year: 2012},
];
   res.render('movies.ejs', {filmFrancais: frenchMovies, frenchTitle: title} )
})

var urlencodedParser = bodyParser.urlencoded({extended:false}) //on recupère dans une variable le bodyparser

// methode post sert à recupérer les donnés entré par le user
// app.post('/movies',urlencodedParser,(req,res)=>{
//    //console.log(req.body.movieTitle); //on peut récupérer plus précisement via l'id ou name
//    //console.log(req.body.movieYear); //on peut récupérer plus précisement via l'id ou name
//    const newMovie = {   title: req.body.movieTitle, // permet une nouvelle entrée du user sur le titre
//                         year: req.body.movieYear // permet une nouvelle entrée du user sur le year
//                     }
//     frenchMovies = [...frenchMovies, newMovie]; //spread opérator (...) equivaux à l'éclatement du tableau et la création d'un nouveau
//     //console.log(frenchMovies);
//    res.sendStatus(201);
// })

//app.get ('/movies-details', (req, res)=>{
  //  res.render('movies-details.ejs')
//})

app.post('/movies', upload.fields([]),(req,res)=>{ // utilisation de multer
    if (!req.body){
        return res.sendStatus(500)
    }
    else{
        const formData = req.body;
        console.log('formData:', formData);
        const newMovie = {   title: req.body.movieTitle, // permet une nouvelle entrée du user sur le titre
                             year: req.body.movieYear // permet une nouvelle entrée du user sur le year
                                 }
        frenchMovies = [...frenchMovies, newMovie]
        res.sendStatus(201);
    }
} )

app.get('/movies/add',(req, res)=>{ 
    res.send(`Porchainement, un formulaire d'ajout ici`)
})

app.get('/movies/:idMovie',(req, res) =>{ //route idMovie 
    const idMovie = req.params.idMovie;
    
    res.render('movies-details',{movieId :idMovie})
    
})

app.get('/movies-search',(req,res)=>{
    const movieSearched= req.params.movieSearched
    res.render('movies-search', {searchedMovie: movieSearched})
})



// ecoute sur le port 3000
app.listen(PORT, () =>{
    console.log(`listening on port ${3000}`);
})

