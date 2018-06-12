const express = require('express')


const app = new express();
const PORT = 3000;

app.use('/public',express.static('public')) // la méthode use permet d'utiliser des middleware ici 
//la méthode static on déclare que le fichier static se trouve dans public

app.set('views','./views'); // on declare les vues dans le dossier views
app.set('view engine', 'ejs');// le type de view engine utilisé c'est ejs

app.get('/', (req,res)=>{ // route à la racine
    //res.send('hello <b>word!!!!!!</b>'); //peut interpreter du html
    res.render('index.ejs') //Lorsque l'on veut utiliser un template on utilise la méthode render
}) // localhost 

app.get ('/movies', (req, res)=>{

    const title = 'films français des trente dernières années';

const frenchMovies = [
    {title: 'le fabuleux destin d\'Amélie Poulain', year: 2001},
    {title: 'buffet froid', year: 1979},
    {title: 'De rouille et d\'os', year: 2012},
];
   res.render('movies.ejs', {filmFrancais: frenchMovies, frenchTitle: title} )
})

//app.get ('/movies-details', (req, res)=>{
  //  res.render('movies-details.ejs')
//})

app.get('/movies/add',(req, res)=>{ 
    res.send(`Porchainement, un formulaire d'ajout ici`)
})

app.get('/movies/:idMovie',(req, res) =>{ //route idMovie 
    const idMovie = req.params.idMovie;
    
    res.render('movies-details',{movieId :idMovie})
    
})

// ecoute sur le port 3000
app.listen(PORT, () =>{
    console.log(`listening on port ${3000}`);
})